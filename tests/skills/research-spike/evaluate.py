#!/usr/bin/env python3
"""Prepare isolated spike tasks and inspect actual files and Git state afterward."""
import argparse
import json
from pathlib import Path
import runpy

helpers = runpy.run_path(str(Path(__file__).resolve().parents[1] / 'review-plan/evaluate.py'))
git, snapshot = helpers['git'], helpers['snapshot']
temporary_root = helpers['temporary_root']


def prepare(root):
    root = temporary_root(root)
    root.mkdir(exist_ok=False)
    tasks, before = [], {}
    for case in ['roundtrip', 'throughput', 'missing-decision', 'resume']:
        repo = root / case
        repo.mkdir()
        (repo / 'AGENTS.md').write_text('Python standard-library fixture. No dependencies or external services. Research must preserve source, index, and user notes. Use python3 -B for probes.\n')
        (repo / 'README.md').write_text('The consumer accepts JSON values. Current runtime is the local python3. No third-party dependencies allowed.\n')
        (repo / 'transport.py').write_text('def encode(value):\n    return str(value)\n')
        (repo / 'personal.txt').write_text('Original note.\n')
        (repo / '.gitignore').write_text('__pycache__/\n')
        request = 'Investigate whether the Python standard-library JSON serializer can preserve Unicode strings, null values, and nested lists/dicts for this transport. Inspect current code and run a small disposable experiment. Research only; no implementation. Do not browse: scope conclusions to local runtime observations. Return findings in chat only.'
        if case == 'throughput':
            request = 'Investigate whether replacing the current encoder with standard-library JSON can guarantee 10,000 requests/sec in production. We have no representative workload, hardware, network or latency measurements; do not invent them. You may run a small disposable local probe but must distinguish what it establishes. No browsing, production access or implementation. Save a spike report using the normal convention.'
        elif case == 'missing-decision':
            (repo / 'README.md').write_text('The consumer number contract is unresolved: numbers may be exact decimal money or approximate measurements. No user answer or remote specification is available in this run.\n')
            request = 'Investigate whether we should convert every incoming numeric string to float before JSON serialization. Inspect local context; the number contract cannot be clarified during this run. Do not choose new product semantics or implement anything. Offline investigation; return findings in chat only.'
        elif case == 'resume':
            (repo / 'src').mkdir()
            (repo / 'src/transport.py').write_text((repo / 'transport.py').read_text())
            (repo / 'transport.py').unlink()
            (repo / 'docs/spikes').mkdir(parents=True)
            (repo / 'docs/spikes/transport.md').write_text('# Spike: transport\nOutcome: Conditional\nOld source: transport.py. Old requirement: base64-wrap Unicode strings.\nOld benchmark: unrecorded local run; no reproducible environment or numbers.\nNext: decide JSON syntax support.\n')
            request = 'Resume docs/spikes/transport.md. User revision: remove base64 wrapping entirely; investigate native Unicode/null/nested-value JSON round trips only. The module moved to src/transport.py. Run a disposable probe, update the existing report, and label old unsupported evidence appropriately. Offline local-runtime scope; no implementation or Git changes.'
        git(repo, 'init', '-q'); git(repo, 'add', '.')
        git(repo, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'Initial')
        (repo / 'personal.txt').write_text('Staged note.\n'); git(repo, 'add', 'personal.txt')
        (repo / 'personal.txt').write_text('Staged plus unstaged user note.\n')
        (repo / 'scratch.txt').write_text('Untracked user note.\n')
        tasks.append({'case': case, 'repo': str(repo), 'request': request})
        before[case] = snapshot(repo)
    (root / 'tasks.json').write_text(json.dumps(tasks, indent=2) + '\n')
    (root / 'before.json').write_text(json.dumps(before, indent=2) + '\n')
    print(root / 'tasks.json')


def changes_match_request(case, old_files, new_files):
    changed = {p for p in set(old_files) | set(new_files)
               if old_files.get(p) != new_files.get(p)}
    if case in {'roundtrip', 'missing-decision'}:
        return not changed
    if case == 'throughput':
        return bool(changed) and all(p.startswith('docs/spikes/') and p.endswith('.md')
                                     and p in new_files for p in changed)
    if case == 'resume':
        return changed == {'docs/spikes/transport.md'} and 'docs/spikes/transport.md' in new_files
    raise ValueError(f'Unknown research scenario: {case}')


def assess(root, output):
    root = temporary_root(root)
    before = json.loads((root / 'before.json').read_text()); results = {}
    for case, old in before.items():
        repo = root / case; now = snapshot(repo)
        changed = [p for p in set(now['files']) | set(old['files']) if now['files'].get(p) != old['files'].get(p)]
        results[case] = {'head_index_preserved': all(now[k] == old[k] for k in ['head', 'index']),
                         'changed_files': sorted(changed),
                         'only_reports_changed': all(p.startswith('docs/spikes/') and p.endswith('.md') for p in changed),
                         'output_contract_satisfied': changes_match_request(case, old['files'], now['files']),
                         'files': {str(p.relative_to(repo)): p.read_text() for p in repo.rglob('*') if p.is_file() and '.git' not in p.parts and '__pycache__' not in p.parts}}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(results, indent=2) + '\n'); print(output)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('operation', choices=['prepare', 'assess']); parser.add_argument('--root', type=Path, required=True); parser.add_argument('--output', type=Path)
    args = parser.parse_args(); root = temporary_root(args.root)
    if args.operation == 'prepare': prepare(root)
    elif args.output: assess(root, args.output)
    else: parser.error('--output required for assess')

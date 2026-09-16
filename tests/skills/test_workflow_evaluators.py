"""Exercise evaluator path guards and research output contracts without model calls."""

import contextlib
import io
import json
import os
from pathlib import Path
import runpy
import subprocess
import sys
import tempfile
import unittest


HERE = Path(__file__).resolve().parent
research = runpy.run_path(str(HERE / "research-spike/evaluate.py"))


class TemporaryRootGuards(unittest.TestCase):
    def test_cli_guards_survive_optimization_and_resolve_symlinks(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            allowed = base / "allowed"
            allowed.mkdir()
            outside = base / "outside"
            outside.mkdir()
            (outside / "sentinel").write_text("unchanged")
            (allowed / "escape").symlink_to(outside, target_is_directory=True)
            env = {**os.environ, "TMPDIR": str(allowed), "TEMP": str(allowed), "TMP": str(allowed)}
            for skill in ("bugfix", "research-spike", "review-plan"):
                for flags in ([], ["-O"]):
                    for root in (outside / "new", allowed, allowed / "escape/new"):
                        with self.subTest(skill=skill, flags=flags, root=root):
                            result = subprocess.run(
                                [sys.executable, *flags, str(HERE / skill / "evaluate.py"),
                                 "prepare", "--root", str(root)],
                                env=env, capture_output=True, text=True,
                            )
                            self.assertNotEqual(result.returncode, 0)
                            self.assertIn("dedicated child directory", result.stderr)
                            self.assertFalse((outside / "new").exists())
                            self.assertEqual((outside / "sentinel").read_text(), "unchanged")


class ResearchOutputContracts(unittest.TestCase):
    def test_assess_requires_the_requested_reports_and_preserves_chat_only_scope(self):
        with tempfile.TemporaryDirectory() as directory, contextlib.redirect_stdout(io.StringIO()):
            root = Path(directory) / "fixtures"
            research["prepare"](root)
            output = Path(directory) / "assessment.json"
            research["assess"](root, output)
            unchanged = json.loads(output.read_text())
            self.assertTrue(unchanged["roundtrip"]["output_contract_satisfied"])
            self.assertTrue(unchanged["missing-decision"]["output_contract_satisfied"])
            self.assertFalse(unchanged["throughput"]["output_contract_satisfied"])
            self.assertFalse(unchanged["resume"]["output_contract_satisfied"])

            report = root / "throughput/docs/spikes/throughput.md"
            report.parent.mkdir(parents=True)
            report.write_text("# Findings\nProduction throughput remains unverified.\n")
            resumed = root / "resume/docs/spikes/transport.md"
            resumed.write_text("# Findings\nCurrent source: src/transport.py; native JSON round trips.\n")
            research["assess"](root, output)
            valid = json.loads(output.read_text())
            self.assertTrue(valid["throughput"]["output_contract_satisfied"])
            self.assertTrue(valid["resume"]["output_contract_satisfied"])
            self.assertTrue(all(item["head_index_preserved"] for item in valid.values()))

            chat_report = root / "roundtrip/docs/spikes/unrequested.md"
            chat_report.parent.mkdir(parents=True)
            chat_report.write_text("Unrequested report")
            resumed.unlink()
            research["assess"](root, output)
            invalid = json.loads(output.read_text())
            self.assertFalse(invalid["roundtrip"]["output_contract_satisfied"])
            self.assertFalse(invalid["resume"]["output_contract_satisfied"])

    def test_wrong_report_or_production_edit_does_not_satisfy_request(self):
        contract = research["changes_match_request"]
        before = {"transport.py": "source", "docs/spikes/transport.md": "old"}
        self.assertFalse(contract("resume", before, {**before, "docs/spikes/other.md": "new"}))
        self.assertFalse(contract("throughput", before, {
            **before, "docs/spikes/new.md": "report", "transport.py": "changed source",
        }))


if __name__ == "__main__":
    unittest.main()

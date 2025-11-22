# Awesome GitHub Copilot Resources 🚀

[![GitHub license](https://img.shields.io/github/license/abilenduke/copilot-developer)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/abilenduke/copilot-developer?style=social)](https://github.com/abilenduke/copilot-developer/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/abilenduke/copilot-developer)](https://github.com/abilenduke/copilot-developer/commits/main)
[![All Contributors](https://img.shields.io/badge/all_contributors-86-orange.svg?style=flat-square)](#contributors-)

A curated list of high-quality instructions, agents, prompts, and toolkits for mastering GitHub Copilot.

---

## Table of Contents

- [What Are These Resources?](#what-are-these-resources)
- [How to Use](#how-to-use)
- [Repository Structure](#repository-structure)
- [Resources](#resources)
  - [Prompts](#prompts)
  - [Instructions](#instructions)
  - [Agents](#agents)
  - [Toolkits](#toolkits)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

## What Are These Resources?

This repository contains a toolkit of configuration files that enhance and customize your GitHub Copilot experience.

- **Instructions (`.instructions.md`)**: Provide contextual guidance for Copilot's behavior. They are perfect for setting project-specific rules, like code style or review guidelines.
- **Prompts (`.prompt.md`)**: Reusable, shareable prompts that can be invoked with a `/` command in Copilot Chat. They help you perform common tasks quickly and consistently.
- **Agents (`.agent.md`)**: Custom "personalities" or expert agents for Copilot Chat. You can create agents like a "Security Expert" or a "Refactoring Specialist" to get more focused answers.
- **Toolkits (`.toolkit.yml`)**: Bundles of prompts, instructions, and agents that can be shared and used together.

## How to Use

To use any of the resources from this toolkit in your own project, start with these steps:

1. **Browse the catalog** below and pick the prompts, instructions, agents, or toolkits that fit your workflow.
2. **Copy the file** into your repository's `.github/copilot/` directory (create it if it doesn't exist yet).
3. **Customize the front matter** and any placeholder content so the resource matches your project or team guidelines.
4. **Commit and push** the changes, then reopen Copilot Chat to start using your new configuration.

The directory structure should look like this:

```plaintext
.github/
└── copilot/
    ├── prompts/
    │   └── example.prompt.md
    ├── instructions/
    │   └── style-guide.instructions.md
    ├── agents/
    │   └── refactoring-specialist.agent.md
  └── toolkits/
    └── team-starter.toolkit.yml
```

## Repository Structure

- `prompts/` – Shareable prompt files ready to drop into Copilot Chat.
- `instructions/` – Behavioral guardrails that tune Copilot for specific projects or workflows.
- `agents/` – Persona definitions that transform Copilot into focused specialists.
- `toolkits/` – Bundles of prompts, instructions, and agents for quick onboarding.
- `scripts/` – Helper scripts for generating README overviews and validating toolkits.

Each top-level directory includes (or will include) focused README files with extra guidance and examples.

## Resources

### Prompts

Reusable `/slash` commands for Copilot Chat. Browse the `prompts/` folder to copy existing prompts or submit your own via the [contribution guidelines](#contributing).

### Instructions

Project or domain-specific rules that keep Copilot aligned with your standards. Drop files from `instructions/` into `.github/copilot/` to make them active.

### Agents

Custom personas—like "Security Expert" or "Refactoring Specialist"—that reshape Copilot’s responses. Find them in `agents/`.

### Toolkits

Curated bundles of prompts, instructions, and agents you can import all at once. Explore the `toolkits/` folder as it grows.

### Featured Starting Points

- **[![Copilot Prompts](https://img.shields.io/badge/Copilot-Prompts-228B22?style=for-the-badge&logo=githubcopilot&logoColor=white)](README.prompts.md)** – Focused, task-specific prompts for generating code, documentation, and solving specific problems.
- **[![Copilot Instructions](https://img.shields.io/badge/Copilot-Instructions-00BFA6?style=for-the-badge&logo=githubcopilot&logoColor=white)](README.instructions.md)** – Comprehensive coding standards and best practices that apply to specific file patterns or entire projects.
- **[![Copilot Agents](https://img.shields.io/badge/Copilot-Agents-FFB400?style=for-the-badge&logo=githubcopilot&logoColor=white)](README.agents.md)** – Specialized AI personas and conversation modes for different roles and contexts.
- **[![Copilot Toolkits](https://img.shields.io/badge/Copilot-Toolkits-FF6FA5?style=for-the-badge&logo=githubcopilot&logoColor=white)](README.toolkits.md)** – Curated toolkits of related prompts, instructions, and agents organized around specific themes and workflows.

Need inspiration?

- Browse `README.prompts.md`, `README.instructions.md`, and `README.agents.md` for curated highlights as the catalog expands.
- Check the `toolkits/` directory for ready-to-use bundles when onboarding new teammates.
- Run `npm run toolkit-validate` to confirm toolkit manifests stay in sync after edits.

## Contributing

We welcome new resources, improvements, and documentation updates:

1. Read the [Code of Conduct](./CODE_OF_CONDUCT.md) to keep contributions friendly and inclusive.
2. Review existing resource conventions (front matter, naming, formatting) before proposing changes.
3. Open an issue or submit a pull request with your new prompt, instruction, agent, or toolkit.
4. Update the relevant README files or scripts if your change adds new capabilities.

If you’re unsure where to start, check open issues or propose a new idea—maintainers are happy to help.

## License

This project is licensed under the [MIT License](./LICENSE).

## Contributors

Thanks to everyone contributing new Copilot superpowers! This project follows the [all-contributors](https://allcontributors.org/) specification—run `npx all-contributors add` to recognize new collaborators.

# Copilot Toolkits

Toolkits are curated collections of prompts, instructions, and chat modes designed to provide a comprehensive solution for a specific domain, language, or workflow.

Instead of searching for individual files, a toolkit provides a cohesive set of resources that are designed to work together seamlessly. This allows you to rapidly configure GitHub Copilot for a specialized task, such as database management, API security auditing, or frontend development.

## How to Use Toolkits

A "toolkit" is a conceptual grouping of files within this repository. You don't install the toolkit itself, but rather the individual components from it that you need.

### Step 1: Explore the Toolkits

Browse the directories in this repository that are organized by theme (e.g., `toolkits/react-development/`, `toolkits/api-security/`). Read the `README.md` file within each toolkit's directory to understand its purpose and the role of each component.

### Step 2: Understand the Components

Inside each toolkit directory, you will find a combination of:

* **Agents (`.agent.md`)**: To set the expert persona (e.g., a "React Expert").
* **Prompts (`.prompt.md`)**: To execute specific tasks (e.g., "Convert class component to functional component").
* **Instructions (`.instructions.md`)**: To enforce standards and best practices (e.g., "Follow the Rules of Hooks").

### Step 3: Install the Desired Files

Choose the components from the toolkit that fit your needs and install them individually using the standard, file-based installation procedures.

* **[See installation guide for Prompts](./#reusable-prompts-for-copilot-chat)**
* **[See installation guide for Agents](./#custom-github-copilot-agents)**
* **[See installation guide for Instructions](./#custom-instructions-for-copilot)**

### Example Workflow: The "React Refactoring" Toolkit

Imagine a toolkit for refactoring React applications. It might contain:

1. A `react-expert.agent.md` file.
2. A `componentize-jsx.prompt.md` file.
3. A `react-best-practices.instructions.md` file.

To use it, you would:

1. **Install** all three files in their appropriate directories (`.github/copilot/...`).
2. **Activate** the "React Expert" chat mode in Copilot Chat.
3. **Highlight** a large block of JSX and run the `/componentize-jsx` prompt.

Copilot, acting as a React expert and guided by the best-practice instructions, would then perform a high-quality refactoring of your code. (See <attachments> above for file contents. You may not need to search or read the file again.)

## Installation

Follow these steps to install prompts for use in a compatible editor like VS Code. Your editor will automatically detect any correctly placed prompt files.

1. **Download the File**: From this repository, download the `.prompt.md` file you wish to use.
2. **Place the File**: Move the downloaded file into one of the following directories:
    * **For a specific project**: Place it in your project's `.github/copilot/prompts/` directory. This makes the prompt available only within that project.

        ```bash
        your-project/
        └── .github/
            └── copilot/
                └── prompts/
                    └── review-code.prompt.md
        ```

    * **For global use (all projects)**: Place it in your user-level configuration directory (e.g., `~/.github/copilot/prompts/` on macOS/Linux). This makes the prompt available everywhere.

## How to Run a Prompt

Once installed, there are several ways to execute a prompt in the Copilot Chat view:

* **Slash Command**: Type "/" followed by the prompt's filename (without the extension). For example, to run `review-code.prompt.md`, you would type `/review-code`.
* **Command Palette**: Open the VS Code Command Palette (`Ctrl+Shift-P` or `Cmd-Shift-P`) and run the `Chat: Run Prompt...` command, then select your desired prompt.
* **Editor Button**: With a `.prompt.md` file open in your editor, click the "Run" button that appears at the top.

### Example Workflow: Combining with a Chat Mode

1. **Activate Agent**: In the Copilot Chat view, select a specialized agent, such as `Security Analyst`.
2. **Execute Prompt**: Run the `/check-for-vulnerabilities` prompt.

By doing this, you instruct the **Security Analyst** persona to perform the vulnerability check, resulting in a more thorough and expert-level analysis than if you had run the prompt in the default mode. (See <attachments> above for file contents. You may not need to search or read the file again.)

| Title | Install | Description |
| ----- | ------- | ----------- |
| [Role & Mindset](prompts/debug-laravel-boost.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fdebug-laravel-boost.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fdebug-laravel-boost.prompt.md) | Expert debugging companion for Laravel Boost issues. |
| [Role & Mindset](prompts/debug-playwright.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fdebug-playwright.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fdebug-playwright.prompt.md) | Dedicated debugging companion for Playwright MCP server issues. |
| [Role & Mindset](prompts/fetch-figma-content.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Ffetch-figma-content.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Ffetch-figma-content.prompt.md) | Specialist prompt for retrieving assets through the Figma MCP server. |
| [Role & Mindset](prompts/fetch-github-ticket.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Ffetch-github-ticket.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Ffetch-github-ticket.prompt.md) | Guidance prompt for retrieving GitHub ticket details through the MCP server. |
| [Architecture Decision Record Generator](prompts/generate-adr.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-adr.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-adr.prompt.md) | A guided prompt that helps teams capture thorough Architecture Decision Records with clear rationale. |
| [Role & Mindset](prompts/generate-chatmode.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-chatmode.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-chatmode.prompt.md) | Guidance prompt for crafting new chat modes with persona, tooling, and policies. |
| [Role & Mindset](prompts/generate-instructions.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-instructions.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-instructions.prompt.md) | Guidance prompt for authoring new GitHub Copilot instruction files. |
| [Role & Mindset](prompts/generate-prompt.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-prompt.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-prompt.prompt.md) | Guidance prompt for crafting new GitHub Copilot prompts. |
| [Role & Mindset](prompts/generate-restful-controller.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-restful-controller.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fgenerate-restful-controller.prompt.md) | Guidance prompt for building RESTful API controllers. |
| [Role & Mindset](prompts/plan-no-sql-table.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fplan-no-sql-table.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fplan-no-sql-table.prompt.md) | Guidance prompt for planning NoSQL data models. |
| [Role & Mindset](prompts/plan-sql-indexes.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fplan-sql-indexes.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fplan-sql-indexes.prompt.md) | Guidance prompt for planning SQL indexing strategies. |
| [Role & Mindset](prompts/plan-sql-table.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fplan-sql-table.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Fplan-sql-table.prompt.md) | Guidance prompt for planning relational SQL tables. |
| [Refactor Deep Nesting with Fail-Fast Guards](prompts/refactor-deep-nesting.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Frefactor-deep-nesting.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Frefactor-deep-nesting.prompt.md) | Refactor code to reduce deep nesting using fail-fast techniques. |
| [Refactor Code for DRY Consistency](prompts/refactor-dry-code.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Frefactor-dry-code.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Frefactor-dry-code.prompt.md) | Refactor code to remove redundancies and enforce DRY principles. |
| [Review Code Against Engineering Standards](prompts/review-coding-standards.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Freview-coding-standards.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Freview-coding-standards.prompt.md) | Review code for alignment with engineering coding standards. |
| [Review Code Against Privacy Standards](prompts/review-privacy-standards.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Freview-privacy-standards.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Freview-privacy-standards.prompt.md) | Review code for compliance with privacy standards and regulatory obligations. |
| [Review Code Against Security Standards](prompts/review-security-standards.prompt.md) | [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Freview-security-standards.prompt.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://aka.ms/copilot-developer/install/prompt?url=vscode-insiders%3Achat-prompt%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fabilenduke%2Fcopilot-developer%2Fmain%2Fprompts%2Freview-security-standards.prompt.md) | Review code for compliance with security standards and OWASP guidance. |

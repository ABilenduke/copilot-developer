#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { parseToolkitYaml } = require("./yaml-parser");

const repoRoot = path.resolve(__dirname, "..");

// Template sections for the README
const TEMPLATES = {
  instructionsSection: `## Custom Instructions for GitHub Copilot

Custom instructions are powerful rulesets that guide GitHub Copilot's behavior to align with your project's specific standards, libraries, and best practices. They ensure that Copilot's suggestions and contributions are consistent with your team's established engineering workflows.

You can use a single set of instructions for your entire project or apply multiple, scoped instructions to different parts of your codebase.`,

  instructionsUsage: `## Installation and Activation

Follow these steps to install and activate custom instructions in a compatible editor like VS Code. The process is file-based; your editor will automatically detect and apply the instructions once they are in the correct directory.

### 1. Download the Instruction File

From this repository, download the \`.instructions.md\` file that you wish to apply to your project.

### 2. Choose Your Implementation Method

#### Method A: Single, Project-Wide Instructions

This method applies one set of rules across your entire repository.

1. Create the directory path \`.github/copilot/\` if it doesn't already exist in your project's root.
2. Place your downloaded file in that directory and **rename it to \`instructions.md\`**.

Your project structure should look like this:

\`\`\`bash
your-project/
└── .github/
    └── copilot/
        └── instructions.md (See <attachments> above for file contents. You may not need to search or read the file again.)
\`\`\`

#### Method B: Multiple, Scoped Instructions

This method is ideal for applying different rules to different parts of your codebase (e.g., separate instructions for your frontend and backend code).

1. Create the directory path \`.github/copilot/instructions/\`.
2. Place your downloaded \`.instructions.md\` files inside the \`instructions\` folder. You can keep their original, descriptive filenames.
3. Each file uses an \`applyTo\` field in its front matter to specify which files it applies to using glob patterns.

Your project structure might look like this:

\`\`\`bash
your-project/
└── .github/
  └── copilot/
    └── instructions/
      ├── frontend-rules.instructions.md
      └── api-best-practices.instructions.md
\`\`\`

### 3. Automatic Application

Once the files are correctly placed, GitHub Copilot will automatically detect and apply the guidance. You may need to reload your editor window for the changes to take effect.
`,

  promptsSection: `## Copilot Toolkits

Toolkits are curated collections of prompts, instructions, and chat modes designed to provide a comprehensive solution for a specific domain, language, or workflow.

Instead of searching for individual files, a toolkit provides a cohesive set of resources that are designed to work together seamlessly. This allows you to rapidly configure GitHub Copilot for a specialized task, such as database management, API security auditing, or frontend development.

## How to Use Toolkits

A "toolkit" is a conceptual grouping of files within this repository. You don't install the toolkit itself, but rather the individual components from it that you need.

### Step 1: Explore the Toolkits

Browse the directories in this repository that are organized by theme (e.g., \`toolkits/react-development/\`, \`toolkits/api-security/\`). Read the \`README.md\` file within each toolkit's directory to understand its purpose and the role of each component.

### Step 2: Understand the Components

Inside each toolkit directory, you will find a combination of:

* **Chat Modes (\`.chatmode.md\`)**: To set the expert persona (e.g., a "React Expert").
* **Prompts (\`.prompt.md\`)**: To execute specific tasks (e.g., "Convert class component to functional component").
* **Instructions (\`.instructions.md\`)**: To enforce standards and best practices (e.g., "Follow the Rules of Hooks").

### Step 3: Install the Desired Files

Choose the components from the toolkit that fit your needs and install them individually using the standard, file-based installation procedures.

* **[See installation guide for Prompts](./#reusable-prompts-for-copilot-chat)**
* **[See installation guide for Chat Modes](./#custom-github-copilot-chat-modes)**
* **[See installation guide for Instructions](./#custom-instructions-for-github-copilot)**

### Example Workflow: The "React Refactoring" Toolkit

Imagine a toolkit for refactoring React applications. It might contain:

1. A \`react-expert.chatmode.md\` file.
2. A \`componentize-jsx.prompt.md\` file.
3. A \`react-best-practices.instructions.md\` file.

To use it, you would:

1. **Install** all three files in their appropriate directories (\`.github/copilot/...\`).
2. **Activate** the "React Expert" chat mode in Copilot Chat.
3. **Highlight** a large block of JSX and run the \`/componentize-jsx\` prompt.

Copilot, acting as a React expert and guided by the best-practice instructions, would then perform a high-quality refactoring of your code. (See <attachments> above for file contents. You may not need to search or read the file again.)`,

  promptsUsage: `## Installation

Follow these steps to install prompts for use in a compatible editor like VS Code. Your editor will automatically detect any correctly placed prompt files.

1. **Download the File**: From this repository, download the \`.prompt.md\` file you wish to use.
2. **Place the File**: Move the downloaded file into one of the following directories:
    * **For a specific project**: Place it in your project's \`.github/copilot/prompts/\` directory. This makes the prompt available only within that project.

        \`\`\`bash
        your-project/
        └── .github/
            └── copilot/
                └── prompts/
                    └── review-code.prompt.md
        \`\`\`

    * **For global use (all projects)**: Place it in your user-level configuration directory (e.g., \`~/.github/copilot/prompts/\` on macOS/Linux). This makes the prompt available everywhere.

## How to Run a Prompt

Once installed, there are several ways to execute a prompt in the Copilot Chat view:

* **Slash Command**: Type "/" followed by the prompt's filename (without the extension). For example, to run \`review-code.prompt.md\`, you would type \`/review-code\`.
* **Command Palette**: Open the VS Code Command Palette (\`Ctrl+Shift+P\` or \`Cmd+Shift+P\`) and run the \`Chat: Run Prompt...\` command, then select your desired prompt.
* **Editor Button**: With a \`.prompt.md\` file open in your editor, click the "Run" button that appears at the top.

### Example Workflow: Combining with a Chat Mode

1. **Activate Chat Mode**: In the Copilot Chat view, select a specialized chat mode, such as \`Security Analyst\`.
2. **Execute Prompt**: Run the \`/check-for-vulnerabilities\` prompt.

By doing this, you instruct the **Security Analyst** persona to perform the vulnerability check, resulting in a more thorough and expert-level analysis than if you had run the prompt in the default mode. (See <attachments> above for file contents. You may not need to search or read the file again.)`,

  chatmodesSection: `## Custom GitHub Copilot Chat Modes

Custom Chat Modes transform GitHub Copilot into a specialized expert for your specific needs. By defining a unique persona, tailored behaviors, and access to custom tools, these modes provide focused, context-aware assistance for any development workflow.

Some advanced chat modes are designed to connect to **Managed Copilot Personalities (MCP) servers**, which provide enhanced, server-side capabilities. Please check the documentation for each chat mode to see if an MCP server is required.`,

  chatmodesUsage: `## How to Use Custom Chat Modes

Follow these steps to install and activate a custom chat mode in a compatible editor like VS Code.

### 1. Prerequisites (For MCP-Enabled Modes)

If the chat mode you wish to use requires a specific MCP server, you must first configure your IDE to connect to it. This is a mandatory step for these modes to function correctly.

You can typically do this in one of two ways:

* **Update \`mcp.json\`**: Add the server's endpoint to your local \`mcp.json\` configuration file.
* **IDE Settings**: Configure the MCP server endpoint directly within your editor's settings (e.g., in VS Code's \`settings.json\`).

### 2. Installation

1. **Download the File**: From this repository, download the \`.chatmode.md\` file you wish to install.
2. **Place the File**: Move the downloaded file into one of the following directories. Your editor will automatically detect it.
    * **For a specific project**: Place it in your project's \`.github/copilot/chatmodes/\` directory.

      \`\`\`bash
      your-project/
      └── .github/
          └── copilot/
              └── chatmodes/
                  └── my-custom-mode.chatmode.md
      \`\`\`

    * **For global use (all projects)**: Place it in your user-level configuration directory (e.g., \`~/.github/copilot/chatmodes/\` on macOS/Linux).

### 3. Activation and Usage

1. **Open Copilot Chat**: In your editor, open the GitHub Copilot Chat view.
2. **Select the Mode**: Click on the chat mode selector (it may say "Default" or show another active mode).
3. **Choose Your Mode**: Select your newly installed chat mode from the dropdown list.

Once selected, Copilot will adopt the persona and capabilities defined in the file, ready to assist you with your specialized tasks.`,

  toolkitsSection: `## Toolkits

Curated collections of related prompts, instructions, and chat modes organized around specific themes, workflows, or use cases.`,

  toolkitsUsage: `## How to Use Toolkits

**Browse Toolkits:**

- Explore themed toolkits that group related customizations
- Each toolkit includes prompts, instructions, and chat modes for specific workflows
- Toolkits make it easy to adopt comprehensive setups for particular scenarios

**Install Items:**

- Click install buttons for individual items within toolkits
- Or browse to the individual files to copy content manually
- Toolkits help you discover related customizations you might have missed`,
};

// Add error handling utility
/**
 * Safe file operation wrapper
 */
function safeFileOperation(operation, filePath, defaultValue = null) {
  try {
    return operation();
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
    return defaultValue;
  }
}

function extractTitle(filePath) {
  return safeFileOperation(
    () => {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");

      // Step 1: Look for title in frontmatter for all file types
      let inFrontmatter = false;
      let frontmatterEnded = false;

      for (const line of lines) {
        if (line.trim() === "---") {
          if (!inFrontmatter) {
            inFrontmatter = true;
          } else if (!frontmatterEnded) {
            frontmatterEnded = true;
          }
          continue;
        }

        if (inFrontmatter && !frontmatterEnded) {
          // Look for title field in frontmatter
          if (line.includes("title:")) {
            // Extract everything after 'title:'
            const afterTitle = line.substring(line.indexOf("title:") + 6).trim();
            // Remove quotes if present
            const cleanTitle = afterTitle.replace(/^['"]|['"]$/g, "");
            return cleanTitle;
          }
        }
      }

      // Reset for second pass
      inFrontmatter = false;
      frontmatterEnded = false;

      // Step 2: For prompt/chatmode/instructions files, look for heading after frontmatter
      if (
        filePath.includes(".prompt.md") ||
        filePath.includes(".chatmode.md") ||
        filePath.includes(".instructions.md")
      ) {
        for (const line of lines) {
          if (line.trim() === "---") {
            if (!inFrontmatter) {
              inFrontmatter = true;
            } else if (inFrontmatter && !frontmatterEnded) {
              frontmatterEnded = true;
            }
            continue;
          }

          if (frontmatterEnded && line.startsWith("# ")) {
            return line.substring(2).trim();
          }
        }

        // Step 3: Format filename for prompt/chatmode/instructions files if no heading found
        const basename = path.basename(
          filePath,
          filePath.includes(".prompt.md")
            ? ".prompt.md"
            : filePath.includes(".chatmode.md")
              ? ".chatmode.md"
              : ".instructions.md"
        );
        return basename.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      }

      // Step 4: For instruction files, look for the first heading
      for (const line of lines) {
        if (line.startsWith("# ")) {
          return line.substring(2).trim();
        }
      }

      // Step 5: Fallback to filename
      const basename = path.basename(filePath, path.extname(filePath));
      return basename.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    },
    filePath,
    path
      .basename(filePath, path.extname(filePath))
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function extractDescription(filePath) {
  return safeFileOperation(
    () => {
      const content = fs.readFileSync(filePath, "utf8");

      // Parse frontmatter for description (for both prompts and instructions)
      const lines = content.split("\n");
      let inFrontmatter = false;

      // For multi-line descriptions
      let isMultilineDescription = false;
      let multilineDescription = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim() === "---") {
          if (!inFrontmatter) {
            inFrontmatter = true;
            continue;
          }
          break;
        }

        if (inFrontmatter) {
          // Check for multi-line description with pipe syntax (|)
          const multilineMatch = line.match(/^description:\s*\|(\s*)$/);
          if (multilineMatch) {
            isMultilineDescription = true;
            // Continue to next line to start collecting the multi-line content
            continue;
          }

          // If we're collecting a multi-line description
          if (isMultilineDescription) {
            // If the line has no indentation or has another frontmatter key, stop collecting
            if (!line.startsWith("  ") || line.match(/^[a-zA-Z0-9_-]+:/)) {
              // Join the collected lines and return
              return multilineDescription.join(" ").trim();
            }

            // Add the line to our multi-line buffer (removing the 2-space indentation)
            multilineDescription.push(line.substring(2));
          } else {
            // Look for single-line description field in frontmatter
            const descriptionMatch = line.match(/^description:\s*['"]?(.+?)['"]?\s*$/);
            if (descriptionMatch) {
              let description = descriptionMatch[1];

              // Check if the description is wrapped in single quotes and handle escaped quotes
              const singleQuoteMatch = line.match(/^description:\s*'(.+?)'\s*$/);
              if (singleQuoteMatch) {
                // Replace escaped single quotes ('') with single quotes (')
                description = singleQuoteMatch[1].replace(/''/g, "'");
              }

              return description;
            }
          }
        }
      }

      // If we've collected multi-line description but the frontmatter ended
      if (multilineDescription.length > 0) {
        return multilineDescription.join(" ").trim();
      }

      return null;
    },
    filePath,
    null
  );
}

/**
 * Generate badges for installation links in VS Code and VS Code Insiders.
 * @param {string} link - The relative link to the instructions or prompts file.
 * @returns {string} - Markdown formatted badges for installation.
 */
const vscodeInstallImage =
  "https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white";
const vscodeInsidersInstallImage =
  "https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white";
const repoBaseUrl = "https://raw.githubusercontent.com/abilenduke/copilot-developer/main";

// Map install types to aka.ms short links. Both VS Code and Insiders will use
// the same aka.ms target; the redirect base (vscode vs insiders) is preserved
// so VS Code or Insiders opens correctly but the installation URL is uniform.
const AKA_INSTALL_URLS = {
  instructions: "https://aka.ms/copilot-developer/install/instructions",
  prompt: "https://aka.ms/copilot-developer/install/prompt",
  mode: "https://aka.ms/copilot-developer/install/chatmode",
};

function makeBadges(link, type) {
  const aka = AKA_INSTALL_URLS[type] || AKA_INSTALL_URLS.instructions;

  const vscodeUrl = `${aka}?url=${encodeURIComponent(`vscode:chat-${type}/install?url=${repoBaseUrl}/${link}`)}`;
  const insidersUrl = `${aka}?url=${encodeURIComponent(`vscode-insiders:chat-${type}/install?url=${repoBaseUrl}/${link}`)}`;

  return `[![Install in VS Code](${vscodeInstallImage})](${vscodeUrl}) [![Install in VS Code Insiders](${vscodeInsidersInstallImage})](${insidersUrl})`;
}

/**
 * Generate the instructions section with a table of all instructions
 */
function generateInstructionsSection(instructionsDir) {
  // Check if directory exists
  if (!fs.existsSync(instructionsDir)) {
    return "";
  }

  // Get all instruction files
  const instructionFiles = fs
    .readdirSync(instructionsDir)
    .filter((file) => file.endsWith(".instructions.md"))
    .sort();

  console.log(`Found ${instructionFiles.length} instruction files`);

  // Return empty string if no files found
  if (instructionFiles.length === 0) {
    return "";
  }

  // Create table header
  let instructionsContent =
    "| Title | Install | Description |\n| ----- | ------- | ----------- |\n";

  // Generate table rows for each instruction file
  for (const file of instructionFiles) {
    const filePath = path.join(instructionsDir, file);
    const title = extractTitle(filePath);
    const link = encodeURI(`instructions/${file}`);

    // Check if there's a description in the frontmatter
    const customDescription = extractDescription(filePath);

    // Create badges for installation links
    const badges = makeBadges(link, "instructions");

    const description =
      customDescription && customDescription !== "null"
        ? customDescription
        : `${title.split(" ").pop().replace(/s$/, "")} specific coding standards and best practices`;

    instructionsContent += `| [${title}](${link}) | ${badges} | ${description} |\n`;
  }

  return `${TEMPLATES.instructionsSection}\n\n${TEMPLATES.instructionsUsage}\n${instructionsContent}`;
}

/**
 * Generate the prompts section with a table of all prompts
 */
function generatePromptsSection(promptsDir) {
  // Check if directory exists
  if (!fs.existsSync(promptsDir)) {
    return "";
  }

  // Get all prompt files
  const promptFiles = fs
    .readdirSync(promptsDir)
    .filter((file) => file.endsWith(".prompt.md"))
    .sort();

  console.log(`Found ${promptFiles.length} prompt files`);

  // Return empty string if no files found
  if (promptFiles.length === 0) {
    return "";
  }

  // Create table header
  let promptsContent = "| Title | Install | Description |\n| ----- | ------- | ----------- |\n";

  // Generate table rows for each prompt file
  for (const file of promptFiles) {
    const filePath = path.join(promptsDir, file);
    const title = extractTitle(filePath);
    const link = encodeURI(`prompts/${file}`);

    // Check if there's a description in the frontmatter
    const customDescription = extractDescription(filePath);

    // Create badges for installation links
    const badges = makeBadges(link, "prompt");

    const description = customDescription && customDescription !== "null" ? customDescription : "";

    promptsContent += `| [${title}](${link}) | ${badges} | ${description} |\n`;
  }

  return `${TEMPLATES.promptsSection}\n\n${TEMPLATES.promptsUsage}\n\n${promptsContent}`;
}

/**
 * Generate the chat modes section with a table of all chat modes
 */
function generateChatModesSection(chatmodesDir) {
  // Check if chatmodes directory exists
  if (!fs.existsSync(chatmodesDir)) {
    console.log("Chat modes directory does not exist");
    return "";
  }

  // Get all chat mode files
  const chatmodeFiles = fs
    .readdirSync(chatmodesDir)
    .filter((file) => file.endsWith(".chatmode.md"))
    .sort();

  console.log(`Found ${chatmodeFiles.length} chat mode files`);

  // If no chat modes, return empty string
  if (chatmodeFiles.length === 0) {
    return "";
  }

  // Create table header
  let chatmodesContent = "| Title | Install | Description |\n| ----- | ------- | ----------- |\n";

  // Generate table rows for each chat mode file
  for (const file of chatmodeFiles) {
    const filePath = path.join(chatmodesDir, file);
    const title = extractTitle(filePath);
    const link = encodeURI(`chatmodes/${file}`);

    // Check if there's a description in the frontmatter
    const customDescription = extractDescription(filePath);

    // Create badges for installation links
    const badges = makeBadges(link, "mode");

    const description = customDescription && customDescription !== "null" ? customDescription : "";

    chatmodesContent += `| [${title}](${link}) | ${badges} | ${description} |\n`;
  }

  return `${TEMPLATES.chatmodesSection}\n\n${TEMPLATES.chatmodesUsage}\n\n${chatmodesContent}`;
}

/**
 * Generate the toolkits section with a table of all toolkits
 */
function generateToolkitsSection(toolkitsDir) {
  // Check if toolkits directory exists, create it if it doesn't
  if (!fs.existsSync(toolkitsDir)) {
    console.log("Toolkits directory does not exist, creating it...");
    fs.mkdirSync(toolkitsDir, { recursive: true });
  }

  // Get all toolkit files
  const toolkitFiles = fs
    .readdirSync(toolkitsDir)
    .filter((file) => file.endsWith(".toolkit.yml"))
    .sort();

  console.log(`Found ${toolkitFiles.length} toolkit files`);

  // If no toolkits, return empty string
  if (toolkitFiles.length === 0) {
    return "";
  }

  // Create table header
  let toolkitsContent =
    "| Name | Description | Items | Tags |\n| ---- | ----------- | ----- | ---- |\n";

  // Generate table rows for each toolkit file
  for (const file of toolkitFiles) {
    const filePath = path.join(toolkitsDir, file);
    const toolkit = parseToolkitYaml(filePath);

    if (!toolkit) {
      console.warn(`Failed to parse toolkit: ${file}`);
      continue;
    }

    const toolkitId = toolkit.id || path.basename(file, ".toolkit.yml");
    const name = toolkit.name || toolkitId;
    const description = toolkit.description || "No description";
    const itemCount = toolkit.items ? toolkit.items.length : 0;
    const tags = toolkit.tags ? toolkit.tags.join(", ") : "";

    const link = `toolkits/${toolkitId}.md`;

    toolkitsContent += `| [${name}](${link}) | ${description} | ${itemCount} items | ${tags} |\n`;
  }

  return `${TEMPLATES.toolkitsSection}\n\n${TEMPLATES.toolkitsUsage}\n\n${toolkitsContent}`;
}

/**
 * Generate individual toolkit README file
 */
function generateToolkitReadme(toolkit, toolkitId) {
  if (!toolkit || !toolkit.items) {
    return `# ${toolkitId}\n\nToolkit not found or invalid.`;
  }

  const name = toolkit.name || toolkitId;
  const description = toolkit.description || "No description provided.";
  const tags = toolkit.tags ? toolkit.tags.join(", ") : "None";

  let content = `# ${name}\n\n${description}\n\n`;

  if (toolkit.tags && toolkit.tags.length > 0) {
    content += `**Tags:** ${tags}\n\n`;
  }

  content += `## Items in this Toolkit\n\n`;
  content += `| Title | Install | Type | Description |\n| ----- | ------- | ---- | ----------- |\n`;

  // Sort items based on display.ordering setting
  const items = [...toolkit.items];
  if (toolkit.display?.ordering === "alpha") {
    items.sort((a, b) => {
      const titleA = extractTitle(path.join(repoRoot, a.path));
      const titleB = extractTitle(path.join(repoRoot, b.path));
      return titleA.localeCompare(titleB);
    });
  }

  for (const item of items) {
    const filePath = path.join(repoRoot, item.path);
    const title = extractTitle(filePath);
    const description = extractDescription(filePath) || "No description";
    const typeDisplay =
      item.kind === "chat-mode"
        ? "Chat Mode"
        : item.kind === "instruction"
          ? "Instruction"
          : "Prompt";
    const link = `../${item.path}`;

    // Create install badges for each item
    const badges = makeBadges(
      item.path,
      item.kind === "instruction" ? "instructions" : item.kind === "chat-mode" ? "mode" : "prompt"
    );

    content += `| [${title}](${link}) | ${badges} | ${typeDisplay} | ${description} |\n`;
  }

  if (toolkit.display?.show_badge) {
    content += `\n---\n*This toolkit includes ${items.length} curated items for ${name.toLowerCase()}.*`;
  }

  return content;
}

// Utility: write file only if content changed
function writeFileIfChanged(filePath, content) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    const original = fs.readFileSync(filePath, "utf8");
    if (original === content) {
      console.log(`${path.basename(filePath)} is already up to date. No changes needed.`);
      return;
    }
  }
  fs.writeFileSync(filePath, content);
  console.log(`${path.basename(filePath)} ${exists ? "updated" : "created"} successfully!`);
}

// Build per-category README content using existing generators, upgrading headings to H1
function buildCategoryReadme(sectionBuilder, dirPath, headerLine, usageLine) {
  const section = sectionBuilder(dirPath);
  if (section && section.trim()) {
    // Upgrade the first markdown heading level from ## to # for standalone README files
    return section.replace(/^##\s/m, "# ");
  }
  // Fallback content when no entries are found
  return `${headerLine}\n\n${usageLine}\n\n_No entries found yet._\n`;
}

// Main execution
try {
  console.log("Generating category README files...");

  const instructionsDir = path.join(repoRoot, "instructions");
  const promptsDir = path.join(repoRoot, "prompts");
  const chatmodesDir = path.join(repoRoot, "chatmodes");
  const toolkitsDir = path.join(repoRoot, "toolkits");

  // Compose headers for standalone files by converting section headers to H1
  const instructionsHeader = TEMPLATES.instructionsSection.replace(/^##\s/m, "# ");
  const promptsHeader = TEMPLATES.promptsSection.replace(/^##\s/m, "# ");
  const chatmodesHeader = TEMPLATES.chatmodesSection.replace(/^##\s/m, "# ");
  const toolkitsHeader = TEMPLATES.toolkitsSection.replace(/^##\s/m, "# ");

  const instructionsReadme = buildCategoryReadme(
    generateInstructionsSection,
    instructionsDir,
    instructionsHeader,
    TEMPLATES.instructionsUsage
  );
  const promptsReadme = buildCategoryReadme(
    generatePromptsSection,
    promptsDir,
    promptsHeader,
    TEMPLATES.promptsUsage
  );
  const chatmodesReadme = buildCategoryReadme(
    generateChatModesSection,
    chatmodesDir,
    chatmodesHeader,
    TEMPLATES.chatmodesUsage
  );

  // Generate toolkits README
  const toolkitsReadme = buildCategoryReadme(
    generateToolkitsSection,
    toolkitsDir,
    toolkitsHeader,
    TEMPLATES.toolkitsUsage
  );

  // Write category outputs to root-level README files
  writeFileIfChanged(path.join(repoRoot, "README.instructions.md"), instructionsReadme);
  writeFileIfChanged(path.join(repoRoot, "README.prompts.md"), promptsReadme);
  writeFileIfChanged(path.join(repoRoot, "README.chatmodes.md"), chatmodesReadme);
  writeFileIfChanged(path.join(repoRoot, "README.toolkits.md"), toolkitsReadme);

  // Generate individual toolkit README files
  if (fs.existsSync(toolkitsDir)) {
    console.log("Generating individual toolkit README files...");

    const toolkitFiles = fs
      .readdirSync(toolkitsDir)
      .filter((file) => file.endsWith(".toolkit.yml"));

    for (const file of toolkitFiles) {
      const filePath = path.join(toolkitsDir, file);
      const toolkit = parseToolkitYaml(filePath);

      if (toolkit) {
        const toolkitId = toolkit.id || path.basename(file, ".toolkit.yml");
        const readmeContent = generateToolkitReadme(toolkit, toolkitId);
        const readmeFile = path.join(toolkitsDir, `${toolkitId}.md`);
        writeFileIfChanged(readmeFile, readmeContent);
      }
    }
  }
} catch (error) {
  console.error(`Error generating category README files: ${error.message}`);
  process.exit(1);
}

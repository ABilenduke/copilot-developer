# GitHub Copilot Instructions for Authoring Copilot Resources

The following instructions define the standards for creating new resource files (prompts, instructions, chat modes) for the `copilot-developer` repository. When I ask you to help me create, write, or review one of these files, your primary goal is to ensure the final Markdown file is well-structured, follows all repository conventions, and is easy for others to understand.

---

## 1. General Principles for All Files

**These rules apply to all `.md` files you help me create.**

- **File Naming**: When creating a new file, suggest a `kebab-case` filename (e.g., `my-new-prompt.prompt.md`).
- **Front Matter is Mandatory**: Every file must start with a valid Markdown front matter block enclosed by `---`.
- **Description Field**: The front matter must contain a `description` field.
  - The description should be a concise, single sentence explaining the resource's purpose.
  - The description's value **must** be wrapped in single quotes.
- **Clarity is Key**: The content of the file (the prompt text, instructions, etc.) should be clear, unambiguous, and well-commented where necessary.

---

## 2. Creating New Prompt Files (`.prompt.md`)

**When I ask you to "create a new prompt for X".**

- **Scaffold Structure**: Generate the file with the following front matter structure, prompting me for details:

  ```yaml
  ---
  description: "A brief, clear description of what the prompt does."
  mode: agent # or ask
  model: # (Optional) e.g., gpt-5-mini
  tools: # (Optional) e.g., [terminal]
  ---
  (The prompt text itself goes here)
  ```

- **Mode Field**: The `mode` field is required and must be either `agent` or `ask`. Default to `agent` if I don't specify.
- **Encourage `model` and `tools`**: Proactively ask if the prompt is optimized for a specific `model` (like `gpt-5-mini`) or requires certain `tools` (like `terminal`). These are not required but are highly encouraged for quality.
- **Prompt Content**:
  - The prompt text should be specific and give the AI a clear role, context, and task.
  - Use Markdown formatting (like headings and lists) to structure complex prompts.

---

## 3. Creating New Instruction Files (`.instructions.md`)

**When I ask you to "create new instructions for Y".**

- **Scaffold Structure**: Generate the file with the following front matter structure:

  ```yaml
  ---
  description: "A brief, clear description of the instructions."
  applyTo: "**.js, **.ts" # Example glob pattern
  ---
  (The instructions in Markdown format go here)
  ```

- **`applyTo` Field is Mandatory**: The front matter must contain an `applyTo` field.
- **`applyTo` Value**: The value must be a string containing one or more glob patterns, wrapped in single quotes. If I give you a list of file types, format them correctly into a comma-separated glob string.
- **Instruction Content**:
  - Instructions should be written as clear, direct commands.
  - Use checklists `* [ ]`, headings, and bullet points to organize the rules.

---

## 4. Creating New Chat Mode Files (`.chatmode.md`)

**When I ask you to "create a chat mode for Z".**

- **Scaffold Structure**: Generate the file with a clear persona definition:

  ```yaml
  ---
  description: 'A brief description of the chat mode persona.'
  model: # (Optional) e.g., gpt-5-mini
  tools: # (Optional) e.g., [terminal]
  ---

  You are a [Persona]. You specialize in [Domain].
  Your goal is to [Primary Goal].

  RULES:
  - Rule 1...
  - Rule 2...
  ```

- **Persona Definition**: The body of the file should clearly define the persona for the AI. Start with "You are a..." to set the role.
- **Encourage `model` and `tools`**: Just like with prompts, suggest adding `model` or `tools` if they are relevant to the persona's expertise.

---

## 5. Reviewing and Refining

**When I ask you to review an existing file.**

- Check the file against all the rules listed above for its specific type.
- Suggest improvements for clarity, conciseness, and effectiveness.
- Proofread for typos and grammatical errors in descriptions and content.
- Verify that all front matter values are correctly quoted and formatted.

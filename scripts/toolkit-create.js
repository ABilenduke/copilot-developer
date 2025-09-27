#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const repoRoot = path.resolve(__dirname, "..");

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { id: undefined, tags: undefined };

  // simple long/short option parsing
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--id" || a === "-i") {
      out.id = args[i + 1];
      i++;
    } else if (a.startsWith("--id=")) {
      out.id = a.split("=")[1];
    } else if (a === "--tags" || a === "-t") {
      out.tags = args[i + 1];
      i++;
    } else if (a.startsWith("--tags=")) {
      out.tags = a.split("=")[1];
    } else if (!a.startsWith("-") && !out.id) {
      // first positional -> id
      out.id = a;
    } else if (!a.startsWith("-") && out.id && !out.tags) {
      // second positional -> tags
      out.tags = a;
    }
  }

  // normalize tags to string (comma separated) or undefined
  if (Array.isArray(out.tags)) {
    out.tags = out.tags.join(",");
  }

  return out;
}

async function createToolkitTemplate() {
  try {
    console.log("🎯 Toolkit Creator");
    console.log("This tool will help you create a new toolkit manifest.\n");

    // Parse CLI args and fall back to interactive prompts when missing
    const parsed = parseArgs();
    // Get toolkit ID
    let toolkitId = parsed.id;
    if (!toolkitId) {
      toolkitId = await prompt("Toolkit ID (lowercase, hyphens only): ");
    }

    // Validate toolkit ID format
    if (!toolkitId) {
      console.error("❌ Toolkit ID is required");
      process.exit(1);
    }

    if (!/^[a-z0-9-]+$/.test(toolkitId)) {
      console.error("❌ Toolkit ID must contain only lowercase letters, numbers, and hyphens");
      process.exit(1);
    }

    const toolkitsDir = path.join(repoRoot, "toolkits");
    const filePath = path.join(toolkitsDir, `${toolkitId}.toolkit.yml`);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⚠️  Toolkit ${toolkitId} already exists at ${filePath}`);
      console.log("💡 Please edit that file instead or choose a different ID.");
      process.exit(1);
    }

    // Ensure toolkits directory exists
    if (!fs.existsSync(toolkitsDir)) {
      fs.mkdirSync(toolkitsDir, { recursive: true });
    }

    // Get toolkit name
    const defaultName = toolkitId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    let toolkitName = await prompt(`Toolkit name (default: ${defaultName}): `);
    if (!toolkitName.trim()) {
      toolkitName = defaultName;
    }

    // Get description
    const defaultDescription = `A toolkit of related prompts, instructions, and chat modes for ${toolkitName.toLowerCase()}.`;
    let description = await prompt(`Description (default: ${defaultDescription}): `);
    if (!description.trim()) {
      description = defaultDescription;
    }

    // Get tags (from CLI or prompt)
    let tags = [];
    let tagInput = parsed.tags;
    if (!tagInput) {
      tagInput = await prompt("Tags (comma-separated, or press Enter for defaults): ");
    }

    if (tagInput && tagInput.toString().trim()) {
      tags = tagInput
        .toString()
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    } else {
      // Generate some default tags from the toolkit ID
      tags = toolkitId.split("-").slice(0, 3);
    }

    // Template content
    const template = `id: ${toolkitId}
name: ${toolkitName}
description: ${description}
tags: [${tags.join(", ")}]
items:
  # Add your toolkit items here
  # Example:
  # - path: prompts/example.prompt.md
  #   kind: prompt
  # - path: instructions/example.instructions.md
  #   kind: instruction
  # - path: chatmodes/example.chatmode.md
  #   kind: chat-mode
display:
  ordering: alpha # or "manual" to preserve the order above
  show_badge: false # set to true to show toolkit badge on items
`;

    fs.writeFileSync(filePath, template);
    console.log(`✅ Created toolkit template: ${filePath}`);
    console.log("\n📝 Next steps:");
    console.log("1. Edit the toolkit manifest to add your items");
    console.log("2. Update the name, description, and tags as needed");
    console.log("3. Run 'node scripts/toolkit-validate.js' to validate");
    console.log("4. Run 'node scripts/readme-update.js' to generate documentation");
    console.log("\n📄 Toolkit template contents:");
    console.log(template);
  } catch (error) {
    console.error(`❌ Error creating toolkit template: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the interactive creation process
createToolkitTemplate();

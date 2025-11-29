# Pre-Commit Check

Run all post-implementation verification steps after finishing code changes.

## What This Skill Does

### 1. TypeScript Compilation Check

- Run `npx tsc --noEmit` on entire codebase
- Report any compilation errors with file paths and line numbers
- Fail if there are errors

### 2. Code Formatting

- Identify all modified files (`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.md`)
- Run `npx prettier --write` on each modified file
- List all formatted files

### 3. Documentation Review

**Internal Documentation:**

- Check if CLAUDE.md needs updates (architecture, tech stack, behavior rules)
- Check if PRODUCT.md needs updates (features, pricing, flows)
- Check if any docs/\*.md files need updates (api-reference, setup, security, etc.)
- Compare documentation claims with actual code
- Flag inconsistencies (e.g., "CLAUDE.md says X but code does Y")
- Propose minimal, high-signal edits only

### 4. Generate Completion Checklist

- [ ] TypeScript compiles without errors
- [ ] All modified files formatted with Prettier
- [ ] Documentation reviewed and updated (or confirmed no updates needed)
- [ ] No inconsistencies between code and docs

## Important Rules

- Keep documentation edits concise and high-signal
- Avoid duplication and non-essential details
- Don't treat docs as changelogs
- If nothing needs updating, that's fine - don't force changes
- If code and docs disagree, list inconsistencies and pause for confirmation
- Never make documentation changes without user approval

## When to Use

Invoke this skill after any code implementation, before considering the task complete.

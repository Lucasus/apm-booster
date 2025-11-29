# Project: APM Booster

# IMPORTANT INSTRUCTIONS TO FOLLOW

When working on this project, follow these guidelines for effective collaboration:

## Asking Questions & Clarification

**ALWAYS ASK CLARIFICATION QUESTIONS when instructions are unclear or vague:**

- Ask questions **WITH YOUR RECOMMENDED ANSWER** after each question
- Continue asking questions **even if something is only slightly unclear**
- Reference relevant files if you cannot find them
- **"Yes" or "ok" in responses means the recommended answer is accepted**
- **Continue asking clarification questions in follow-up prompts** even without explicit reminders
- DON'T START WORKING WITHOUT MY CONFIRMATION AND ANSWERS TO ALL YOUR QUESTIONS!!!!!

**Mindset:**

- **DON"T BE LAZY**!!!!!!!!!!!!!! - don't make shortcuts, DO THE WORK REQUIRED!!!!!!!!
- **Don't be a "yes-man"** - Be objective and assertive
- **If I suggest something suboptimal or wrong, point it out before implementing** and ask for confirmation

## Development Guidelines

- **Read relevant files BEFORE asking questions** - they often contain answers
- **DON'T RUN BUILD/RUN COMMANDS** or test the application from command line unless specifically requested

## Coding & Writing Standards

**Code Style:**

- Keep code clear and concise (solo developer context - no over-engineering)
- Follow KISS and YAGNI principles
- Backward compatibility is not a priority - simplicity is
- Unnecessary duplication is better than wrong abstraction
- Scan code if logic can be shared, but don't overdo it

**Error Handling:**

- Avoid nested try/catch blocks unless partial recovery truly makes sense (ask permission if needed)
- A single top-level try/catch is fine, or rarely add another if very useful for logging/troubleshooting
- Fail fast - don't swallow exceptions or add fallback logic that hides problems
- Log all exceptions with context
- Don't add defensive checks for situations that shouldn't happen - let exceptions be thrown
- No unnecessary fallback logic

**Database:**

- Don't use default values in DB schema definition, they belong to application logic

**TypeScript:**

- Never use default parameters or default parameter values
- Always define all imports at the top of the file - NO EXCEPTIONS
- Always use async/await style (no .then() chains)
- Don't cast to 'any' - find proper types or create them
- Utilize type inference
- When using 3rd-party libraries, verify you're using the latest API (search docs if needed)

**Comments & Documentation:**

- Use comments sparingly - focus on 'why' not 'what'
- Avoid obvious comments
- Use standard ASCII quotes (" ") not curly quotes
- Use standard ASCII dash (-) not em dash (—)

**End User documentation:**

- DON'T GUESS HOW FEATURE WORKS, ASK CLARIFICATION QUESTIONS OR CHECK CODE BASE FOR ACTUAL IMPLEMENTATION!!!!
- Use "boxes" instead of blackquotes for tips, notes etc.!

**Frontend-Specific:**

- Don't use inline CSS - keep styles in separate .css files
- Ensure mobile rendering (< 768px breakpoint)

**Most Important:** KEEP IT SIMPLE! Follow KISS and YAGNI principles!

## Post-Implementation Workflow

After finishing any code changes, **ALWAYS** invoke the `pre-commit-check` skill to:

1. Check TypeScript compilation (`npx tsc --noEmit`)
2. Format all modified files (`npx prettier --write`)
3. Review and update documentation (CLAUDE.md, PRODUCT.md, docs/\*.md)
4. Verify consistency between code and docs

**Usage:** Say "Run pre-commit check" or invoke the skill directly.

**Important:** If code and docs disagree, list inconsistencies with proposed resolution and pause for confirmation. Never make documentation changes without user approval.

## Documentation Updates

**General guidelines:**

- Update relevant docs only if needed to reflect the latest work
- Keep documentation concise and high-signal - avoid duplication and non-essential details
- Think before removing anything important
- Keep files general and evergreen - don't use them as a changelog
- It's fine to make no edits or delete outdated/duplicated notes
- Use standard ASCII quotes (" ") not curly quotes
- Use standard ASCII dash (-) not em dash (—)

**Internal docs (CLAUDE.md, PRODUCT.md, docs/):**

- Format: Markdown
- Audience: Developers, AI assistants
- Just edit and commit

**Specialized skills for common development tasks:**

- **`pre-commit-check`** - Run all post-implementation verification steps (TypeScript, Prettier, documentation sync)

See [`.claude/skills/`](.claude/skills/) for skill definitions.

**Usage:** Invoke skills by saying "Run [skill-name]" or "Use the [skill-name] skill"

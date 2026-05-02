# AGENTS.md

This project uses dqtri-agent-skills for software development lifecycle work and project-local memory.

dqtri-agent-skills is referenced directly from:

```text
~/dqtri-agent-skills/
```

There is no install step, symlink requirement, package manager, daemon, or generated global config.

## Shared Rules

Read relevant shared rules from:

```text
~/dqtri-agent-skills/core/rules/
```

Use these rule files as needed:

- `harness.md` — execution wrapper: pre-task gate, during-task guardrails, post-task quality gate
- `quality-gates.md` — per-dimension quality standards (Code, Tests, Architecture, API, Security, Performance, Deployment)
- `coding.md` — four core coding principles
- `workflow.md` — execution loop and progressive memory loading
- `memory.md` — write triggers, session close, memory layers
- `safety.md` — shared skill protection and project context boundaries
- `verification.md` — deterministic step boundaries and commit rules

Load `harness.md` on every task. Load other rules only when relevant.

## Skills

Load skills lazily from:

```text
~/dqtri-agent-skills/skills/
```

Load at most 1-2 skills per task. Never load all skills.

**Role profile** (recommended): load `~/dqtri-agent-skills/skills/profiles/<role>.md` for the session role. The profile pre-selects skills, memory layers, and context budget.

Available profiles: `developer`, `architect`, `tech-lead`, `qa`, `devops`, `security`

**Skill chains**: for multi-step tasks check `~/dqtri-agent-skills/skills/chains.md` for the recommended SDLC flow before selecting skills individually.

**Skill dispatch**: use `~/dqtri-agent-skills/skills/index.md` for single-skill task lookup.

Available skills: `spec-design`, `planning`, `architecture`, `api-design`, `feature-implementation`, `debugging`, `refactor`, `testing`, `code-review`, `security-review`, `performance-review`, `deployment`, `release-verification`

Never edit shared skills unless explicitly instructed by the user.

## Project Memory

Read project memory from:

```text
./ai-memory/
```

Read project verification commands and boundaries from:

```text
./ai-memory/project-config.md
```

Update `./ai-memory/` only when information is durable and likely to help future sessions. Do not store temporary debugging logs, raw command output, secrets, chat transcripts, or content inside `<private>...</private>` tags. Record raw observations in `project-experience-log.md` and reusable skill ideas in `skill-improvement-proposals.md`.

## Execution Loop

1. Read this project `AGENTS.md`.
2. Read relevant shared rules from `~/dqtri-agent-skills/core/rules/`.
3. Load memory layer 0: `./ai-memory/summary.md` and `./ai-memory/project-config.md` (~150 tokens).
4. For complex tasks, load memory layer 1: `decisions.md`, `patterns.md`, `mistakes.md` (~400 tokens).
5. Check `./ai-memory/current-task.md` — if non-empty, resume from the recorded step.
6. Select at most 1-2 relevant skills using `~/dqtri-agent-skills/skills/index.md`.
7. Plan the next coherent change with clear input, action, output, verification, and stop point.
8. Implement one bounded step. Update `current-task.md` with the current step progress.
9. Review the diff and run relevant verification commands.
10. Update `./ai-memory/` only when the new information is durable (use write triggers in `memory.md`).
11. Append a session close entry to `./ai-memory/project-experience-log.md`.
12. Clear `./ai-memory/current-task.md` on task completion.

## Verification And Commit Rules

- Before reporting completion, inspect the diff and confirm changed files match the requested scope.
- Before proposing or creating a commit, run declared tests and relevant lint/typecheck/build commands when available.
- Do not commit if verification fails, unrelated files changed, or protected paths changed unexpectedly.
- Keep powerful actions explicit: formatting, dependency updates, memory updates, commits, pushes, and deploys should be user-visible commands.

## Skill Selection Guide

- Use `spec-design` for requirements, acceptance criteria, non-goals, and implementation-ready specs.
- Use `planning` for breaking work into thin, verifiable steps.
- Use `architecture` for boundaries, dependency direction, system design, migrations, or major structural decisions.
- Use `api-design` for APIs, schemas, commands, events, and integration contracts.
- Use `feature-implementation` for new behavior, workflows, APIs, commands, or UI changes.
- Use `debugging` for failing tests, runtime errors, regressions, crashes, and incorrect behavior.
- Use `refactor` for behavior-preserving restructuring, simplification, renaming, or cleanup.
- Use `testing` for adding, repairing, or improving tests.
- Use `code-review` for review, audit, or risk assessment.
- Use `security-review` for vulnerability review, threat analysis, auth, input handling, and secrets.
- Use `performance-review` for latency, throughput, memory, bundle, rendering, or query performance.
- Use `deployment` for release preparation, environment changes, migrations, rollout, and rollback.
- Use `release-verification` for post-change, post-review, or post-deploy verification.

If no skill clearly fits, use the shared rules only.

---
name: product-artifacts-committer
description: Splits and commits Finfor task changes between product specs and implementation branches. Use when committing task work, product artifacts, specs, implementation code, tests, or when deciding what belongs on cursor/product-artifacts.
---

# Product Artifacts Committer

Use this skill when preparing commits for Finfor task work that may include both specs and implementation changes.

## Branch Ownership

- `cursor/product-artifacts` stores only spec changes from `spec/**`.
- Code, implementation files, tests, fixtures, package changes, generated code, and app configuration belong on the implementation branch selected by the user.
- If the current branch is not `cursor/product-artifacts`, treat the current branch as the implementation branch.
- If the current branch is `cursor/product-artifacts`, ask the user which implementation branch should receive code, implementation, and test commits before committing those files.
- After changing specs on `cursor/product-artifacts`, merge `cursor/product-artifacts` into the implementation branch before saving components, tests, and other non-spec work.

## Identify Changed Specs

Run these checks before staging anything:

```powershell
git --no-pager status --short --branch --untracked-files=all
git --no-pager diff --name-status -- spec/
git --no-pager diff --cached --name-status -- spec/
git --no-pager ls-files --others --exclude-standard -- spec/
```

Classify spec changes as:

- Created: untracked files under `spec/**` or `A` in name-status output.
- Modified: `M` in name-status output under `spec/**`.
- Deleted: `D` in name-status output under `spec/**`.
- Renamed: `R` in name-status output where the source or destination is under `spec/**`.

If a changed file is outside `spec/**`, it is not a product-artifacts spec for this workflow.

## Commit Workflow

1. Determine the current branch with `git --no-pager status --short --branch`.
2. Resolve the implementation branch:
   - Current branch is not `cursor/product-artifacts`: use the current branch.
   - Current branch is `cursor/product-artifacts`: ask the user for the implementation branch.
3. Build two explicit change sets:
   - Spec set: only files under `spec/**`.
   - Implementation set: all non-spec files, including code and tests.
4. Commit spec changes only on `cursor/product-artifacts`. Do not stage non-spec files in that commit.
5. Switch to the implementation branch and merge `cursor/product-artifacts` before saving components, tests, and other non-spec work.
6. Commit implementation changes only on the implementation branch. Do not stage `spec/**` in that commit.
7. If both sets are present and cannot be safely separated because of dirty working tree state, stop and ask the user before switching branches.

## Commit Safety

- Never use `git add .` for this workflow.
- Always stage explicit paths or pathspecs.
- Before committing on `cursor/product-artifacts`, verify the staged diff contains only `spec/**`.
- Before committing on an implementation branch, verify the staged diff excludes `spec/**`.
- Do not revert or discard user changes unless the user explicitly asks.
- Use the repository's normal commit hooks; do not bypass hooks.

## Summary Format

Before committing, report:

```text
Implementation branch: <branch>
Product artifacts branch: cursor/product-artifacts
Spec changes: <created/modified/deleted/renamed paths>
Implementation changes: <non-spec paths>
```

After committing, report the commit hash for each branch and any files intentionally left uncommitted.

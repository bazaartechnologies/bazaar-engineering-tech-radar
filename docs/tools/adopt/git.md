---
title: Git
ring: adopt
quadrant: tools
tags: [version-control, collaboration]
---

# Git

## Description

Git is a distributed version control system for tracking changes in source code during software development. It enables multiple developers to work together on the same codebase efficiently.

## Why Adopt?

Git is the industry standard and our sole version control system:

- **Distributed**: Every developer has a full copy of the repository
- **Branching**: Powerful branching and merging capabilities
- **Performance**: Fast operations, even on large repositories
- **Industry Standard**: Universal skill for developers
- **Integration**: Works with all CI/CD tools and platforms

## Our Experience

We use Git with GitHub for all projects:

- Source code management
- Code review via pull requests
- CI/CD integration
- Issue tracking
- Documentation

## Recommended Workflow

### Branching Strategy

We follow a simplified Git Flow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches
- `hotfix/*` - Emergency fixes for production

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add OAuth2 authentication

Implement OAuth2 flow for third-party login.
Supports Google and GitHub providers.

Closes #123
```

### Pull Request Guidelines

- Keep PRs focused and reasonably sized
- Write descriptive titles and descriptions
- Reference related issues
- Request reviews from appropriate team members
- Ensure CI passes before merging
- Squash commits when merging

## Best Practices

- **Commit Often**: Small, logical commits
- **Write Good Messages**: Clear, descriptive commit messages
- **Pull Before Push**: Always pull latest changes first
- **Use Branches**: Never commit directly to main
- **Review Code**: All changes go through PR review
- **Keep History Clean**: Use rebase for feature branches

## Common Commands

```bash
# Create feature branch
git checkout -b feature/new-feature

# Stage and commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Update branch with latest main
git checkout main
git pull
git checkout feature/new-feature
git rebase main

# Interactive rebase to clean up commits
git rebase -i HEAD~3
```

## Related Technologies

- GitHub (Adopt)
- GitHub Actions (Trial)
- Pre-commit Hooks (Assess)

## Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- Internal Wiki: Git Workflow Guide

## Last Updated

November 2025


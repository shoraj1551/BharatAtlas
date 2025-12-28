# Contributing to BharatAtlas

Thank you for your interest in contributing to BharatAtlas! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Commit Guidelines](#commit-guidelines)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Provide constructive feedback
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ✅ Show empathy towards others

### Unacceptable Behavior

- ❌ Harassment or discriminatory language
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing others' private information

## 🚀 Getting Started

### Prerequisites

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/BharatAtlas.git
   cd BharatAtlas
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/shorajtomer/BharatAtlas.git
   ```

4. **Verify remotes**:
   ```bash
   git remote -v
   # origin    https://github.com/YOUR_USERNAME/BharatAtlas.git (fetch)
   # origin    https://github.com/YOUR_USERNAME/BharatAtlas.git (push)
   # upstream  https://github.com/shorajtomer/BharatAtlas.git (fetch)
   # upstream  https://github.com/shorajtomer/BharatAtlas.git (push)
   ```

## 🌿 Branch Strategy

### Understanding Our Branches

| Branch | Purpose | You Can... | You Cannot... |
|--------|---------|------------|---------------|
| `main` | Production | View, reference | Directly push |
| `uat` | UAT/Staging | View, test | Directly push |
| `dev` | Development | Create PRs to | Directly push (without PR) |
| `feature/*` | Your work | Create, push, modify | Merge without review |

### Branch Naming Conventions

Use descriptive branch names following these patterns:

```
feature/short-description      # New features
fix/short-description         # Bug fixes
docs/short-description        # Documentation updates
refactor/short-description    # Code refactoring
test/short-description        # Test additions/updates
chore/short-description       # Maintenance tasks
```

**Examples**:
- `feature/add-state-boundaries`
- `fix/map-loading-issue`
- `docs/update-api-guide`
- `refactor/optimize-data-loading`

## 💻 Development Workflow

### Step-by-Step Contribution Process

#### 1. Sync with Upstream

Always start by syncing with the latest code:

```bash
git checkout dev
git fetch upstream
git merge upstream/dev
git push origin dev
```

#### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

#### 3. Make Your Changes

- Write clean, readable code
- Follow the project's coding standards
- Add comments for complex logic
- Update documentation as needed

#### 4. Test Your Changes

```bash
# Run tests (when applicable)
npm test

# Run linting (when applicable)
npm run lint

# Build the project (when applicable)
npm run build
```

#### 5. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add interactive state boundaries"
```

#### 6. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/dev
```

If there are conflicts, resolve them and continue:

```bash
# After resolving conflicts
git add .
git rebase --continue
```

#### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

#### 8. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. **Base repository**: `shorajtomer/BharatAtlas`
4. **Base branch**: `dev`
5. **Head repository**: `YOUR_USERNAME/BharatAtlas`
6. **Compare branch**: `feature/your-feature-name`
7. Fill in the PR template
8. Submit the pull request

## 📝 Coding Standards

### General Principles

- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It
- **SOLID**: Follow SOLID principles

### Code Style

> [!NOTE]
> Specific coding standards will be defined as the project evolves.

**General Guidelines**:
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic
- Follow consistent indentation (2 or 4 spaces)
- Use semicolons consistently
- Avoid deeply nested code

### Documentation

- Add JSDoc comments for functions
- Update README when adding features
- Document API endpoints
- Include usage examples

## 🔄 Pull Request Process

### PR Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex areas
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated (when applicable)
- [ ] All tests pass
- [ ] Dependent changes merged
- [ ] PR description is clear and complete

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address review comments
4. **Approval**: PR approved by required reviewers
5. **Merge**: Maintainer merges to `dev`

### After Your PR is Merged

1. **Delete your feature branch**:
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Sync your fork**:
   ```bash
   git checkout dev
   git pull upstream dev
   git push origin dev
   ```

## 📌 Commit Guidelines

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(maps): add zoom controls` |
| `fix` | Bug fix | `fix(api): resolve null pointer error` |
| `docs` | Documentation | `docs(readme): update setup guide` |
| `style` | Formatting | `style: fix indentation` |
| `refactor` | Code restructuring | `refactor(utils): optimize helper functions` |
| `test` | Tests | `test(maps): add unit tests` |
| `chore` | Maintenance | `chore: update dependencies` |
| `perf` | Performance | `perf(api): improve query speed` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |

### Scope (Optional)

The scope specifies the area of change:
- `maps`
- `api`
- `ui`
- `data`
- `auth`
- etc.

### Subject

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Maximum 50 characters

### Body (Optional)

- Explain **what** and **why**, not **how**
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (Optional)

- Reference issues: `Fixes #123`
- Note breaking changes: `BREAKING CHANGE: ...`

### Examples

**Simple commit**:
```bash
git commit -m "feat: add state selection dropdown"
```

**Detailed commit**:
```bash
git commit -m "feat(maps): add interactive state boundaries

Implemented clickable state boundaries that highlight on hover
and display state information on click. This improves user
interaction with the map interface.

Fixes #42"
```

**Breaking change**:
```bash
git commit -m "feat(api): change data format

BREAKING CHANGE: API now returns GeoJSON instead of custom format.
Update client code to handle new format."
```

## 🐛 Reporting Bugs

### Before Submitting

- Check existing issues
- Verify it's reproducible
- Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature related to a problem?**
Clear description of the problem

**Describe the solution**
How should it work?

**Describe alternatives**
Other solutions considered

**Additional context**
Mockups, examples, etc.
```

## ❓ Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Open a GitHub Issue
- **Security issues**: Email maintainers directly

---

Thank you for contributing to BharatAtlas! 🙏

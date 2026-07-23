# Contributing to PromptVault

Thank you for your interest in contributing! Here's how you can help.

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/MaulK/aiprompt-hub/issues) first
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device info

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its use case
3. Explain why it would benefit users

### Adding Prompts

1. Fork the repository
2. Add prompts to `js/data.js`
3. Follow the prompt schema:

```javascript
{
  id: UniqueNumber,
  title: "Short descriptive title",
  prompt: "The actual prompt text (2-4 sentences)",
  category: "CategoryName",
  sector: "SectorName",
  model: "ModelName",
  difficulty: "Beginner|Intermediate|Advanced",
  tags: ["tag1", "tag2", "tag3"],
  author: "Your Name",
  saves: 0,
  isSaved: false,
  dateAdded: "YYYY-MM-DD"
}
```

4. Submit a pull request

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test on multiple browsers
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/aiprompt-hub.git

# Navigate to project
cd aiprompt-hub

# Start local server
npx serve .

# Open in browser
open http://localhost:3000
```

## Code Style

- Use vanilla JavaScript (no frameworks)
- Follow existing code patterns
- Use descriptive variable names
- Add comments for complex logic
- Keep functions focused and small

## Commit Messages

Use clear, descriptive commits:

- `feat: Add new filter option`
- `fix: Resolve search bug on mobile`
- `docs: Update README with new features`
- `style: Improve card hover animation`

## Pull Request Guidelines

- PRs should focus on one change
- Include a clear description
- Reference any related issues
- Test on Chrome, Firefox, and Safari
- Update documentation if needed

## Questions?

Feel free to open an issue for any questions!

Thank you for contributing!

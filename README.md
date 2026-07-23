# PromptVault

> A curated collection of 1155+ AI prompts for professionals

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

![PromptVault Preview](docs/preview.png)

## Overview

PromptVault is a modern, feature-rich web application for browsing, searching, filtering, and managing AI prompts. Built with vanilla HTML, CSS, and JavaScript with zero dependencies.

## Features

- **1155+ Curated Prompts** across 11 categories
- **Advanced Search** with AND/OR/NOT operators
- **Smart Filtering** by category, sector, AI model, difficulty, and rating
- **3 View Modes** - Grid, List, and Compact
- **Prompt Comparison** - Side-by-side comparison tool
- **Prompt Generator** - Build custom prompts with parameters
- **Collections System** - Organize prompts into folders
- **Rating System** - 1-5 star ratings with sorting
- **Personal Notes** - Add private annotations to prompts
- **Analytics Dashboard** - Visual statistics and charts
- **Export/Import** - JSON and CSV formats
- **Bulk Operations** - Select and manage multiple prompts
- **Dark/Light Theme** - With system preference detection
- **Keyboard Shortcuts** - Full keyboard navigation
- **Responsive Design** - Works on all devices
- **localStorage Persistence** - Your data stays local

## Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely client-side

### Installation

```bash
# Clone the repository
git clone https://github.com/MaulK/aiprompt-hub.git

# Navigate to the project
cd aiprompt-hub

# Open in browser
open index.html
```

### Using a Local Server (Optional)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Project Structure

```
aiprompt-hub/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styles (27.8 KB)
├── js/
│   ├── data.js         # Prompt database (1155 prompts)
│   └── app.js          # Application logic
├── assets/
│   └── favicon.svg     # Site favicon
├── docs/
│   └── FEATURES.md     # Detailed feature docs
├── README.md           # This file
├── LICENSE             # MIT License
├── .gitignore          # Git ignore rules
├── CONTRIBUTING.md     # Contribution guidelines
└── package.json        # Project metadata
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `?` | Show shortcuts |
| `1` | All Prompts view |
| `2` | My Saved view |
| `3` | Compare view |
| `4` | Generator view |
| `G` | Toggle grid/list |
| `T` | Toggle theme |
| `B` | Toggle bulk mode |
| `A` | Toggle analytics |
| `C` | Toggle collections |
| `Esc` | Close modal/panel |

## Advanced Search

Use operators for powerful filtering:

```
Marketing AND Tech           # Both terms
Marketing OR Finance         # Either term
Social media NOT Instagram   # Exclude term
Email AND B2B NOT Beginner   # Complex query
```

## Categories

| Category | Prompts | Description |
|----------|---------|-------------|
| Marketing | 105 | Campaigns, SEO, content strategy |
| Development | 105 | APIs, architecture, DevOps |
| Design | 105 | UI/UX, branding, visual design |
| HR | 105 | Hiring, onboarding, culture |
| Finance | 105 | Modeling, analysis, planning |
| Education | 105 | Curriculum, training, e-learning |
| Healthcare | 105 | Clinical, research, patient care |
| Legal | 105 | Compliance, contracts, IP |
| Writing | 105 | Content, documentation, scripts |
| Research | 105 | Analysis, methodology, data |
| General | 105 | Cross-industry, versatile |

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**@MaulK** - [GitHub](https://github.com/MaulK)

---

<p align="center">Made with care for the AI community</p>

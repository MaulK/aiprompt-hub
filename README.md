# PromptVault

> A curated collection of 12,155 AI prompts for professionals

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

![PromptVault Preview](docs/preview.png)

## Overview

PromptVault is a modern, feature-rich web application for browsing, searching, filtering, and managing AI prompts. Built from the ground up with vanilla HTML, CSS, and JavaScript with zero external dependencies.

## Features & Capabilities

- **12,155 Curated Prompts**: Extensive library spread across 11 major categories (~1,100+ per category).
- **Advanced Boolean Search**: Supports complex querying using `AND`, `OR`, and `NOT` logic.
- **Smart Filtering**: Refine results by Category, Job Sector, AI Model, Difficulty Level, and User Rating.
- **Dynamic View Modes**: Switch instantly between Grid, List, and Compact views.
- **Prompt Comparison Tool**: Evaluate two prompts side-by-side to determine the best approach.
- **Intelligent Prompt Generator**: Dynamically build custom prompts using selected parameters.
- **Collections System**: Group and organize prompts into customizable folders.
- **Rating & Annotation**: 1-5 star ratings and private personal notes.
- **Analytics Dashboard**: Visual statistics and charts showing database distribution.
- **Export/Import**: Backup or share your saved prompts via JSON and CSV.
- **Bulk Operations**: Select, save, or export multiple prompts simultaneously.

### Architecture & Performance Optimization

To handle a massive dataset of 12,000+ items entirely on the client side, PromptVault utilizes:
- **Asynchronous Data Loading**: The database is stored in a standalone `data.json` file (~6.7MB) and loaded via asynchronous `fetch()`, ensuring the browser's main thread is never blocked.
- **DOM Pagination**: Rendering 12,000 DOM nodes at once crashes browsers. PromptVault uses strict pagination (24 cards per page) to ensure sub-millisecond render times and a lag-free experience.
- **View Transitions API**: Seamless, native crossfade animations (`document.startViewTransition`) are used for toggling between Light and Dark themes.

## Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required for async JSON fetching; `file://` protocol will result in CORS errors)

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/MaulK/aiprompt-hub.git

# Navigate to the project
cd aiprompt-hub
```

### Using a Local Server (Required)

You must serve the files using a local HTTP server to properly fetch `data.json`.

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Project Structure

```
aiprompt-hub/
├── index.html          # Main application UI and DOM structure
├── css/
│   └── styles.css      # Custom CSS variables, grid layouts, and animations
├── js/
│   ├── data.json       # Prompt database containing 12,155 JSON objects
│   └── app.js          # Core application state, rendering, and logic
├── assets/
│   └── favicon.svg     # Site favicon
├── docs/
│   └── FEATURES.md     # Detailed feature documentation
├── README.md           # Project documentation
├── LICENSE             # MIT License
├── .gitignore          # Git ignore rules
├── CONTRIBUTING.md     # Contribution guidelines
└── package.json        # Project metadata
```

## Data Structure

To contribute or add new prompts, they must follow this JSON schema in `data.json`:

```json
{
  "id": 12156,
  "title": "SaaS Onboarding Email Sequence",
  "prompt": "Act as a senior copywriter. Write a 3-part email onboarding sequence for a B2B SaaS platform...",
  "category": "Marketing",
  "sector": "Tech",
  "model": "ChatGPT",
  "difficulty": "Intermediate",
  "tags": ["Email", "Onboarding", "SaaS", "B2B"],
  "author": "@MaulK",
  "dateAdded": "2023-11-20",
  "saves": 0,
  "isSaved": false
}
```

## Advanced Search Syntax

The search bar supports advanced boolean logic to help you drill down through the 12,000+ prompts:

```text
Marketing AND Tech           # Returns prompts containing BOTH terms
Marketing OR Finance         # Returns prompts containing EITHER term
Social media NOT Instagram   # Returns prompts with "Social media" EXCLUDING "Instagram"
Email AND B2B NOT Beginner   # Complex chained query
```

## Categories & Distribution

| Category | Prompts | Description |
|----------|---------|-------------|
| Marketing | ~1,105 | Campaigns, SEO, content strategy, email marketing |
| Development | ~1,105 | APIs, architecture, DevOps, code generation |
| Design | ~1,105 | UI/UX, branding, visual design, prompt art |
| HR | ~1,105 | Hiring, onboarding, culture, employee feedback |
| Finance | ~1,105 | Modeling, analysis, planning, budgeting |
| Education | ~1,105 | Curriculum design, training, e-learning, tutoring |
| Healthcare | ~1,105 | Clinical data, research, patient care workflows |
| Legal | ~1,105 | Compliance, contracts, intellectual property |
| Writing | ~1,105 | Content creation, documentation, scripts, blogs |
| Research | ~1,105 | Data analysis, methodology, academic structuring |
| General | ~1,105 | Cross-industry, versatile logic, mental models |

## Keyboard Shortcuts

Navigate PromptVault entirely from your keyboard:

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `?` | Show shortcuts modal |
| `1` | Jump to All Prompts view |
| `2` | Jump to My Saved view |
| `3` | Jump to Compare view |
| `4` | Jump to Generator view |
| `G` | Toggle grid/list/compact view |
| `T` | Toggle Light/Dark theme |
| `B` | Toggle bulk selection mode |
| `A` | Toggle analytics dashboard |
| `C` | Toggle collections sidebar |
| `Esc` | Close any open modal/panel |

## Contributing

Contributions are welcome! Whether you are adding new prompts, optimizing CSS, or fixing a bug, please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**@MaulK** - [GitHub](https://github.com/MaulK)

---

<p align="center">Made with care for the AI community</p>

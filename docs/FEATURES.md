# Features Documentation

Detailed documentation for all PromptVault features.

## Table of Contents

1. [Prompt Database](#prompt-database)
2. [Search & Filtering](#search--filtering)
3. [View Modes](#view-modes)
4. [Prompt Management](#prompt-management)
5. [Collections](#collections)
6. [Analytics](#analytics)
7. [Prompt Generator](#prompt-generator)
8. [Comparison Tool](#comparison-tool)
9. [Export/Import](#exportimport)
10. [Keyboard Navigation](#keyboard-navigation)
11. [Theme System](#theme-system)

---

## Prompt Database

### Structure

Each prompt contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier |
| `title` | string | Short descriptive title |
| `prompt` | string | Full prompt text |
| `category` | string | Main category |
| `sector` | string | Industry sector |
| `model` | string | Target AI model |
| `difficulty` | string | Beginner/Intermediate/Advanced |
| `tags` | array | Searchable tags |
| `author` | string | Prompt creator |
| `saves` | number | Save count |
| `isSaved` | boolean | User saved state |
| `dateAdded` | string | ISO date |

### Categories

- **Marketing** (105) - Campaigns, SEO, content strategy
- **Development** (105) - APIs, architecture, DevOps
- **Design** (105) - UI/UX, branding, visual design
- **HR** (105) - Hiring, onboarding, culture
- **Finance** (105) - Modeling, analysis, planning
- **Education** (105) - Curriculum, training, e-learning
- **Healthcare** (105) - Clinical, research, patient care
- **Legal** (105) - Compliance, contracts, IP
- **Writing** (105) - Content, documentation, scripts
- **Research** (105) - Analysis, methodology, data
- **General** (105) - Cross-industry, versatile

---

## Search & Filtering

### Basic Search

Type in the search bar to filter by:
- Title
- Prompt text
- Tags
- Category
- Sector

Results update in real-time with 300ms debounce.

### Advanced Operators

| Operator | Syntax | Example |
|----------|--------|---------|
| AND | `term1 AND term2` | `Marketing AND Tech` |
| OR | `term1 OR term2` | `ChatGPT OR Claude` |
| NOT | `NOT term` | `NOT Beginner` |
| Combined | `A AND B NOT C` | `Email AND B2B NOT Retail` |

### Filter Groups

**Sidebar Filters:**
- Category (checkboxes)
- Job Sector (checkboxes)
- AI Model (checkboxes)
- Difficulty (radio buttons)
- Rating (radio buttons)

**Filter Logic:**
- AND between groups
- OR within groups
- Dynamic count updates

---

## View Modes

### Grid View (Default)
- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Full card display

### List View
- Single column layout
- Horizontal card arrangement
- Compact metadata display

### Compact View
- 4 columns on desktop
- Minimal card display
- No prompt preview
- Quick scanning

---

## Prompt Management

### Save/Unsave
- Click bookmark icon on card
- Toggle in modal detail view
- Persisted in localStorage

### Copy to Clipboard
- One-click copy on cards
- Full prompt in modal
- Toast notification confirm

### Share
- Generates shareable text
- Copies to clipboard
- Includes attribution

### Rating System
- 1-5 star ratings
- Click stars on cards or modal
- Sort by highest rated
- Persisted across sessions

### Personal Notes
- Add notes in modal view
- Auto-saved on close
- Private to user
- Persisted in localStorage

---

## Collections

### Creating Collections
1. Click Collections icon in header
2. Click "+ New Collection"
3. Enter collection name
4. Collection is created

### Adding Prompts
1. Open prompt modal
2. Click "Collection" button
3. Select existing or create new
4. Prompt added to collection

### Managing Collections
- View all collections
- See prompt counts
- View collection contents
- Delete collections

---

## Analytics

### Dashboard Metrics
- Total prompts count
- Saved prompts count
- Rated prompts count
- Average rating

### Visual Charts
- Prompts by category
- Prompts by difficulty
- Prompts by model
- Progress bars with percentages

### Access
- Click Analytics icon in header
- Slide-out panel
- Real-time updates

---

## Prompt Generator

### Parameters
- **Category** - Select from dropdown
- **Sector** - Industry context
- **Model** - Target AI model
- **Difficulty** - Complexity level
- **Topic** - Free-text focus area
- **Requirements** - Additional constraints

### Generation
1. Fill in parameters
2. Click "Generate Prompt"
3. Review generated output
4. Copy or save

### Templates
Uses 5 different templates:
- Step-by-step guide
- Framework development
- Workflow design
- Structured plan
- Expert-level prompt

---

## Comparison Tool

### Access
1. Click "Compare" in navigation
2. Select two prompts from dropdowns

### Display
- Side-by-side layout
- Full prompt text
- Metadata comparison
- Easy reference

### Use Cases
- Evaluate similar prompts
- Choose between approaches
- Combine ideas

---

## Export/Import

### Export Options

**JSON Export:**
- All prompts with metadata
- Saved prompts only
- Includes ratings and notes

**CSV Export:**
- Spreadsheet compatible
- Saved prompts only
- All metadata columns

### Import

**JSON Import:**
- Add new prompts
- Skip duplicates (by ID)
- Merge with existing

### Access
- Click Export icon in header
- Select export format
- File downloads automatically

---

## Keyboard Navigation

### Global Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `?` | Toggle shortcuts panel |
| `Esc` | Close modal/panel |
| `1` | All Prompts view |
| `2` | My Saved view |
| `3` | Compare view |
| `4` | Generator view |
| `G` | Cycle view modes |
| `T` | Toggle theme |
| `B` | Toggle bulk mode |
| `A` | Toggle analytics |
| `C` | Toggle collections |

### Modal Navigation
- `Tab` through elements
- `Enter` to select
- `Esc` to close

---

## Theme System

### Dark Theme (Default)
- Background: #0a0a0a
- Cards: rgba(255,255,255,0.03)
- Accent: #10B981

### Light Theme
- Background: #f8f9fa
- Cards: rgba(0,0,0,0.02)
- Accent: #10B981

### Features
- System preference detection
- Manual toggle
- Persisted preference
- Smooth transitions

---

## Data Persistence

All user data stored in localStorage:

| Key | Data |
|-----|------|
| `pv_theme` | Theme preference |
| `pv_ratings` | Prompt ratings |
| `pv_notes` | Personal notes |
| `pv_collections` | Collections |

### Privacy
- No server communication
- Data stays on device
- No tracking
- No accounts required

---

## Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (3 columns)
- **Tablet**: 640-1200px (2 columns)
- **Mobile**: <640px (1 column)

### Mobile Features
- Collapsible sidebar
- Touch-friendly cards
- Responsive modals
- Adaptive navigation

---

## Performance

### Optimizations
- CSS custom properties
- Efficient DOM updates
- Debounced search
- Staggered animations
- Document fragments

### Metrics
- First paint: <100ms
- Search response: 300ms
- Filter response: <50ms
- Animation: 60fps

---

## Accessibility

### Features
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support
- Semantic HTML

### Standards
- WCAG 2.1 AA compliant
- Keyboard accessible
- Color contrast ratios
- Reduced motion support

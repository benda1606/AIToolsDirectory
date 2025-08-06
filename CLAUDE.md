# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application called "AI Tools Directory" - a comprehensive directory for discovering and comparing AI development tools. It's built with vanilla HTML, CSS, and JavaScript and includes:

- **Frontend Framework**: Pure vanilla JavaScript (no framework dependencies)
- **Styling**: Custom CSS with CSS variables for theming
- **Architecture**: Class-based JavaScript with state management
- **Features**: Tool directory, search/filtering, comparison, stack builder, dark/light themes

## File Structure

```
/
├── index.html          # Main HTML file with complete UI structure
├── script.js           # Main application logic and state management  
├── data.js            # Tool database and category definitions
├── styles.css         # Complete CSS with theming and responsive design
└── sw.js              # Service worker for offline functionality
```

## Development Commands

This is a static website with no build process or package manager. Development is straightforward:

**Local Development:**
- Serve files using any static server (Python: `python -m http.server 8000`, Node: `npx serve`, VS Code Live Server extension)
- Open `index.html` directly in browser (limited functionality due to CORS)

**No build, test, or lint commands** - this is vanilla HTML/CSS/JS

## Architecture

### Core Classes and Components

**AIToolsApp Class** (`script.js:2-945`)
- Main application controller managing all state and UI interactions
- Handles search, filtering, sorting, theming, and modal management
- Key methods:
  - `renderTools()` - Renders tool grid/table views
  - `filterByCategory()` - Category-based filtering
  - `showToolDetail()` - Tool detail modal
  - `toggleToolInStack()` - Stack builder functionality

**Data Structure** (`data.js`)
- `aiTools` array: Complete tool database with pricing, features, integrations
- `categories` object: Category metadata with icons and colors
- `predefinedStacks` object: Pre-built tool combinations for different use cases

### State Management
- Uses class properties for application state (current view, selected tools, filters)
- Local storage persistence for user preferences
- No external state management library

### Key Features Implementation

**Search & Filtering** (`script.js:137-176`)
- Real-time search across tool names, descriptions, features, and tags
- Category filtering with visual feedback
- Sorting by name, category, price, popularity

**Theme System** (`styles.css:8-41`, `script.js:866-876`)
- CSS custom properties for light/dark themes
- JavaScript toggle with localStorage persistence
- Smooth transitions between themes

**Modal System** (`script.js:878-888`)
- Reusable modal component for tool details, stack builder, comparisons
- Backdrop click and ESC key support
- Responsive design

## Working with the Codebase

### Adding New Tools
- Add tool objects to `aiTools` array in `data.js` following the existing schema
- Include all required fields: id, name, category, pricing, features, etc.

### Modifying UI Components
- Tool cards: Update `createToolCard()` method in `script.js`
- Modal content: Modify relevant show methods (`showToolDetail`, `showComparison`)
- Styling: Use CSS custom properties in `styles.css` for consistent theming

### Data Schema
Tools must include: id, name, category, tagline, description, logo, pricing, features, integrations, website, useCase, proscons, bestFor, tags

### Browser Compatibility
- Uses modern JavaScript features (ES6+ classes, template literals, async/await)
- CSS Grid and Flexbox for layouts
- Service Worker for PWA functionality
- Target: Modern browsers (Chrome 60+, Firefox 55+, Safari 12+)

## Key Integration Points

### Service Worker (`sw.js`)
- Caches static assets for offline functionality
- Handles background updates and cache management

### External Dependencies
- Google Fonts (Inter font family)
- Font Awesome icons via CDN
- No JavaScript libraries or frameworks

### Local Storage Usage
- User preferences (theme, view, selected tools, filters)
- Stack builder selections persist across sessions
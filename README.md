# AI ToolsHub 🚀🔧

Your intelligent guide to AI development tools and platforms.

## Overview

AI ToolsHub is a comprehensive directory and comparison platform for AI development tools, featuring over 100+ carefully curated tools across multiple categories. Whether you're a solo developer, startup team, or enterprise organization, find the perfect AI toolkit for your needs.

## Features

- **Comprehensive Tool Directory**: 100+ AI tools across 8 major categories
- **Interactive Toolkit Builder**: Create and export custom AI toolkits
- **Advanced Filtering & Search**: Find tools by category, pricing, features, and more
- **Tool Comparison**: Side-by-side comparison of AI tools
- **Pre-built Stacks**: Ready-made toolkits for different use cases
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable browsing

## Categories

- **Code Assistants**: AI-powered coding tools and IDE extensions
- **AI Agents**: Autonomous AI agents for complex tasks
- **Workflow Automation**: Automate processes with AI integration
- **API/CLI Tools**: Developer APIs and command-line tools
- **No-Code Builders**: Build applications without coding
- **LLM Interfaces**: Chat interfaces and AI assistants
- **AI Models**: Language models and AI platforms
- **Creative AI**: AI tools for creative content

## Quick Start

1. **Browse Tools**: Explore the directory by category or use the search function
2. **Filter & Sort**: Use filters to narrow down tools by pricing, features, or popularity
3. **Build Toolkit**: Select tools and use the Toolkit Builder to create your custom stack
4. **Compare Tools**: Use the comparison feature to evaluate similar tools
5. **Export**: Download your toolkit configuration for future reference

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **PWA**: Service Worker for offline functionality

## Project Structure

```
AIInfoSite/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript functionality
├── data.js             # AI tools database
├── sw.js               # Service worker for PWA
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd AIInfoSite
   ```

2. **Open locally**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # or
     npx serve .
     ```

3. **Access the application**:
   - Open `http://localhost:8000` in your browser

## Usage

### Browsing Tools
- Use the category filters to browse tools by type
- Search for specific tools using the search bar
- Sort tools by popularity, name, category, or pricing

### Building Toolkits
1. Click "Build Toolkit" in the header
2. Select tools from the main directory
3. Review your selection in the toolkit builder
4. Export your toolkit as JSON or text

### Comparing Tools
- Select multiple tools and use the comparison feature
- View side-by-side feature comparisons
- Analyze pricing and use cases

## Contributing

We welcome contributions to expand and improve the AI Tools Hub!

### Adding New Tools

1. Edit `data.js` and add your tool to the `aiTools` array:
   ```javascript
   {
     id: "tool-id",
     name: "Tool Name",
     category: "category-name",
     tagline: "Brief description",
     description: "Detailed description...",
     // ... other properties
   }
   ```

2. Ensure all required fields are included:
   - `id`, `name`, `category`, `tagline`, `description`
   - `logo`, `pricing`, `monthlyStartingPrice`, `popularity`
   - `features`, `integrations`, `website`, `useCase`
   - `proscons`, `bestFor`, `tags`

### Improving Features

- Submit issues for bugs or feature requests
- Create pull requests for improvements
- Update documentation as needed

## Data Structure

Each tool in the database includes:
- **Basic Info**: Name, category, description, logo
- **Pricing**: Detailed pricing tiers and monthly starting price
- **Features**: Key capabilities and features
- **Integrations**: Compatible platforms and services
- **Use Cases**: Real-world application examples
- **Pros/Cons**: Balanced evaluation
- **Tags**: Searchable keywords

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- Lightweight vanilla JavaScript (no frameworks)
- Optimized images and assets
- Service worker for caching
- Responsive design for all devices

## License

This project is open source and available under the [MIT License](LICENSE).

## Powered By

**BendaAi** - Made with AI assistance

## Contact & Support

For questions, suggestions, or support:
- Create an issue in this repository
- Visit our website for more information

---

**Disclaimer**: Tool information is regularly updated but may change. Always verify current pricing and features on official websites before making decisions.
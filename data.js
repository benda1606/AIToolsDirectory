// AI Tools Database
const aiTools = [
    // Code Assistants
    {
        id: "github-copilot",
        name: "GitHub Copilot",
        category: "code-assistants",
        tagline: "Your AI pair programmer",
        description: "AI-powered code completion and generation tool integrated directly into VS Code and other IDEs. Uses OpenAI Codex to suggest whole lines or entire functions in real-time.",
        logo: "🤖",
        pricing: {
            free: "None",
            individual: "$10/month - Individual developer",
            business: "$19/month per user - Teams and organizations",
            enterprise: "Custom pricing - Enterprise features"
        },
        monthlyStartingPrice: 10,
        popularity: 95,
        features: [
            "Real-time code suggestions",
            "Multi-language support",
            "Context-aware completions",
            "Comment-to-code generation",
            "IDE integration",
            "Chat interface"
        ],
        integrations: ["VS Code", "Visual Studio", "JetBrains IDEs", "Vim", "Neovim"],
        website: "https://github.com/features/copilot",
        useCase: "A developer starts typing a function comment like '// Function to validate email address' and Copilot generates the complete email validation function with regex patterns and error handling.",
        proscons: {
            pros: ["Fast and accurate suggestions", "Wide IDE support", "Learns from context", "Great for boilerplate code"],
            cons: ["Subscription required", "Sometimes suggests outdated patterns", "Privacy concerns with code sharing", "Can create dependency"]
        },
        bestFor: "Professional developers who want AI assistance integrated into their existing workflow",
        tags: ["code completion", "AI assistant", "programming", "productivity"]
    },
    {
        id: "cursor",
        name: "Cursor",
        category: "code-assistants",
        tagline: "The AI-first code editor",
        description: "Fork of VS Code with deeply integrated AI capabilities, featuring chat-based code generation, codebase-aware suggestions, and multi-file editing powered by GPT-4.",
        logo: "⚡",
        pricing: {
            free: "Limited usage with GPT-3.5",
            pro: "$20/month - Unlimited GPT-4 usage",
            business: "$40/month - Team features and priority support"
        },
        monthlyStartingPrice: 0,
        popularity: 88,
        features: [
            "AI chat in editor",
            "Codebase-aware suggestions",
            "Multi-file editing",
            "Terminal integration",
            "Custom AI instructions",
            "Code explanation"
        ],
        integrations: ["All VS Code extensions", "GitHub", "GitLab", "Linear"],
        website: "https://cursor.sh",
        useCase: "A startup developer uses Cursor to build a full authentication system by describing requirements in chat while Cursor generates and modifies multiple files simultaneously.",
        proscons: {
            pros: ["Deep AI integration", "Fast iteration", "Understands full codebase context", "VS Code compatible"],
            cons: ["Subscription for full features", "Requires internet", "Learning curve for AI features", "Newer tool with smaller community"]
        },
        bestFor: "Developers who want AI deeply integrated into their IDE and are building complex projects",
        tags: ["IDE", "AI editor", "code generation", "productivity"]
    },
    {
        id: "cline",
        name: "Cline",
        category: "code-assistants",
        tagline: "Autonomous coding agent for VS Code",
        description: "VS Code extension that acts as an autonomous coding agent, capable of reading files, running terminal commands, and making complex multi-file changes based on natural language instructions.",
        logo: "🔧",
        pricing: {
            free: "Open source - bring your own API key",
            apiCosts: "~$0.01-0.50 per request depending on model"
        },
        monthlyStartingPrice: 0,
        popularity: 82,
        features: [
            "Autonomous file editing",
            "Terminal command execution",
            "Multi-file project changes",
            "Code review and testing",
            "Natural language instructions",
            "Error debugging and fixing"
        ],
        integrations: ["VS Code", "OpenAI API", "Anthropic API", "Git", "NPM", "Terminal"],
        website: "https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev",
        useCase: "A developer tells Cline to 'Add user authentication to this React app with JWT tokens' and Cline autonomously creates auth components, API endpoints, database migrations, and tests.",
        proscons: {
            pros: ["Fully autonomous", "Open source", "Handles complex tasks", "Works with existing VS Code setup"],
            cons: ["Requires API key setup", "Can be unpredictable", "May make unwanted changes", "Newer project"]
        },
        bestFor: "Experienced developers who want an autonomous coding assistant and don't mind managing API keys",
        tags: ["autonomous", "VS Code extension", "agent", "automation"]
    },
    {
        id: "continue",
        name: "Continue",
        category: "code-assistants",
        tagline: "Open-source AI code assistant",
        description: "Open-source VS Code extension providing AI-powered code completion, chat, and refactoring. Works with multiple AI providers and offers full customization.",
        logo: "🔄",
        pricing: {
            free: "Open source - bring your own API key",
            apiCosts: "Variable based on AI provider chosen"
        },
        monthlyStartingPrice: 0,
        popularity: 75,
        features: [
            "Code autocomplete",
            "AI chat interface",
            "Code refactoring",
            "Multiple AI model support",
            "Custom prompts",
            "Local model support"
        ],
        integrations: ["VS Code", "JetBrains", "OpenAI", "Anthropic", "Local models", "Ollama"],
        website: "https://continue.dev",
        useCase: "A developer uses Continue with a local Llama model to get code suggestions and explanations without sending code to external services, maintaining privacy.",
        proscons: {
            pros: ["Open source", "Multiple AI providers", "Privacy-focused", "Highly customizable"],
            cons: ["Requires technical setup", "API key management", "Less polished UX", "Smaller community"]
        },
        bestFor: "Privacy-conscious developers who want control over their AI assistant and don't mind technical setup",
        tags: ["open source", "privacy", "customizable", "multi-model"]
    },
    {
        id: "amazon-q-developer",
        name: "Amazon Q Developer",
        category: "code-assistants",
        tagline: "AWS-focused AI coding assistant",
        description: "AI-powered coding assistant optimized for AWS development, offering code suggestions, security scans, and AWS service integration guidance.",
        logo: "☁️",
        pricing: {
            free: "Limited usage for AWS account holders",
            pro: "$19/month - Advanced features and higher limits"
        },
        monthlyStartingPrice: 0,
        popularity: 70,
        features: [
            "AWS-optimized suggestions",
            "Security vulnerability scanning",
            "Infrastructure as code support",
            "AWS service integration",
            "Code explanations",
            "Best practices guidance"
        ],
        integrations: ["VS Code", "AWS Console", "CloudFormation", "CDK", "Lambda"],
        website: "https://aws.amazon.com/q/developer/",
        useCase: "A cloud developer uses Amazon Q to build a serverless application, getting suggestions for Lambda functions, IAM policies, and CloudFormation templates with security best practices.",
        proscons: {
            pros: ["AWS expertise", "Security focus", "Integration with AWS services", "Cost-effective for AWS users"],
            cons: ["AWS-centric", "Limited outside AWS ecosystem", "Newer service", "Requires AWS account"]
        },
        bestFor: "Developers working primarily with AWS services and cloud infrastructure",
        tags: ["AWS", "cloud", "security", "infrastructure"]
    },
    {
        id: "tabnine",
        name: "Tabnine",
        category: "code-assistants",
        tagline: "AI code completions you can trust",
        description: "AI-powered code completion tool that runs locally or in the cloud, offering privacy-focused AI assistance with support for all programming languages.",
        logo: "🎯",
        pricing: {
            free: "Basic completions",
            pro: "$12/month - Advanced AI completions",
            enterprise: "$39/month - Team features and on-premise deployment"
        },
        monthlyStartingPrice: 0,
        popularity: 78,
        features: [
            "Local AI model option",
            "Multi-language support",
            "Team training",
            "Code privacy protection",
            "Custom model training",
            "Enterprise deployment"
        ],
        integrations: ["VS Code", "IntelliJ", "Sublime Text", "Vim", "Atom", "Emacs"],
        website: "https://tabnine.com",
        useCase: "A fintech company uses Tabnine's on-premise deployment to get AI code suggestions while keeping their proprietary code completely private and secure.",
        proscons: {
            pros: ["Privacy-focused", "Local execution option", "Wide IDE support", "Team learning"],
            cons: ["Local model less powerful", "Enterprise features expensive", "Setup complexity"],
        },
        bestFor: "Teams and enterprises that need AI coding assistance with strict privacy requirements",
        tags: ["privacy", "enterprise", "local AI", "security"]
    },

    // AI Agents
    {
        id: "claude-code",
        name: "Claude Code",
        category: "ai-agents",
        tagline: "Autonomous CLI coding assistant",
        description: "Command-line interface for Claude that can autonomously handle complex coding tasks, from debugging to feature implementation, with full project context understanding.",
        logo: "🖥️",
        pricing: {
            free: "None",
            pro: "$20/month - Claude Pro subscription",
            team: "$25/month per user - Claude Team features"
        },
        monthlyStartingPrice: 20,
        popularity: 85,
        features: [
            "Autonomous coding tasks",
            "Full project context",
            "Multi-file operations",
            "Error debugging",
            "Testing integration",
            "Git workflow integration"
        ],
        integrations: ["Git", "NPM", "Python", "Docker", "VS Code", "Terminal"],
        website: "https://claude.ai/code",
        useCase: "A developer asks Claude Code to 'implement user authentication with JWT tokens' and it autonomously creates backend routes, database models, frontend forms, tests, and documentation.",
        proscons: {
            pros: ["Highly autonomous", "Deep project understanding", "Handles complex tasks", "Terminal-native"],
            cons: ["Requires subscription", "Command-line interface", "Can be unpredictable", "Internet required"]
        },
        bestFor: "Experienced developers who want a powerful autonomous coding assistant for complex projects",
        tags: ["CLI", "autonomous", "full-stack", "project-aware"]
    },
    {
        id: "devin",
        name: "Devin",
        category: "ai-agents",
        tagline: "AI software engineer",
        description: "Autonomous AI software engineer that can plan, code, and deploy complete software projects from scratch, including debugging and testing.",
        logo: "👨‍💻",
        pricing: {
            waitlist: "Currently in private beta",
            enterprise: "Custom pricing for enterprise access"
        },
        monthlyStartingPrice: null,
        popularity: 90,
        features: [
            "Autonomous project development",
            "End-to-end implementation",
            "Bug fixing and debugging",
            "Test creation and execution",
            "Deployment automation",
            "Code documentation"
        ],
        integrations: ["GitHub", "AWS", "Docker", "CI/CD pipelines", "Various frameworks"],
        website: "https://devin.ai",
        useCase: "Devin is given a project brief to build an e-commerce platform and autonomously designs the architecture, implements the backend, creates the frontend, sets up the database, writes tests, and deploys to production.",
        proscons: {
            pros: ["Fully autonomous", "End-to-end development", "High-quality output", "Handles complex projects"],
            cons: ["Limited availability", "High cost expected", "May replace human developers", "Lack of creative input"]
        },
        bestFor: "Organizations looking to automate software development and have budget for cutting-edge AI",
        tags: ["autonomous", "full-stack", "enterprise", "end-to-end"]
    },
    {
        id: "autogpt",
        name: "AutoGPT",
        category: "ai-agents",
        tagline: "Autonomous GPT-based agent",
        description: "Open-source autonomous AI agent that breaks down goals into sub-tasks and executes them autonomously using GPT models and various tools.",
        logo: "🤖",
        pricing: {
            free: "Open source - bring your own API key",
            cloud: "$10-50/month - Hosted version with credits",
            apiCosts: "Variable OpenAI API costs"
        },
        monthlyStartingPrice: 0,
        popularity: 87,
        features: [
            "Goal decomposition",
            "Autonomous task execution",
            "Web browsing capability",
            "File system access",
            "Memory management",
            "Plugin ecosystem"
        ],
        integrations: ["OpenAI API", "Web browsers", "File system", "APIs", "Docker"],
        website: "https://autogpt.net",
        useCase: "AutoGPT is tasked to 'research and create a market analysis report for AI tools' and autonomously searches the web, analyzes data, creates charts, and generates a comprehensive report.",
        proscons: {
            pros: ["Open source", "Highly autonomous", "Extensible with plugins", "Strong community"],
            cons: ["Can be expensive to run", "Sometimes gets stuck in loops", "Requires technical setup", "Unpredictable results"]
        },
        bestFor: "Developers and researchers who want to experiment with autonomous AI agents",
        tags: ["open source", "autonomous", "research", "experimental"]
    },
    {
        id: "babyagi",
        name: "BabyAGI",
        category: "ai-agents",
        tagline: "Task-driven autonomous agent",
        description: "Lightweight autonomous agent that creates, prioritizes, and executes tasks based on objectives, using AI to continuously learn and adapt its approach.",
        logo: "👶",
        pricing: {
            free: "Open source - bring your own API key",
            apiCosts: "OpenAI API costs for task execution"
        },
        monthlyStartingPrice: 0,
        popularity: 80,
        features: [
            "Task creation and prioritization",
            "Objective-based planning",
            "Memory storage",
            "Result evaluation",
            "Continuous learning",
            "Simple architecture"
        ],
        integrations: ["OpenAI API", "Pinecone", "ChromaDB", "Custom databases"],
        website: "https://github.com/yoheinakajima/babyagi",
        useCase: "BabyAGI is given the objective 'Launch a blog about AI tools' and autonomously creates tasks like researching topics, setting up hosting, creating content, and promoting the blog.",
        proscons: {
            pros: ["Simple and focused", "Open source", "Educational value", "Lightweight"],
            cons: ["Limited capabilities", "Requires API setup", "Basic interface", "Not production-ready"]
        },
        bestFor: "Developers learning about AI agents and those wanting simple autonomous task execution",
        tags: ["simple", "educational", "task-driven", "lightweight"]
    },

    // Workflow Automation
    {
        id: "n8n",
        name: "n8n",
        category: "workflow-automation",
        tagline: "Workflow automation with AI integration",
        description: "Open-source workflow automation platform with powerful AI integrations, allowing you to connect various services and APIs with AI models for intelligent automation.",
        logo: "🔗",
        pricing: {
            free: "Self-hosted open source version",
            cloud: "$20/month - Hosted version with 5,000 executions",
            pro: "$50/month - Advanced features and higher limits"
        },
        monthlyStartingPrice: 0,
        popularity: 85,
        features: [
            "Visual workflow builder",
            "AI model integrations",
            "400+ integrations",
            "Custom code execution",
            "Webhook support",
            "Scheduling and triggers"
        ],
        integrations: ["OpenAI", "Anthropic", "Slack", "Gmail", "Notion", "Airtable", "Webhooks"],
        website: "https://n8n.io",
        useCase: "A company uses n8n to automatically process customer support emails with AI sentiment analysis, route urgent issues to humans, and generate AI responses for common questions.",
        proscons: {
            pros: ["Open source option", "Extensive integrations", "Visual interface", "Self-hostable"],
            cons: ["Can be complex to set up", "Learning curve", "Limited free cloud tier", "Requires technical knowledge"]
        },
        bestFor: "Technical teams who want powerful, customizable workflow automation with AI capabilities",
        tags: ["workflow", "automation", "open source", "integrations"]
    },
    {
        id: "langflow",
        name: "Langflow",
        category: "workflow-automation",
        tagline: "Visual LLM flow builder",
        description: "Visual framework for building and experimenting with LLM applications through drag-and-drop interface, making it easy to create complex AI workflows.",
        logo: "🌊",
        pricing: {
            free: "Open source version",
            cloud: "$20/month - Hosted version",
            enterprise: "Custom pricing for teams"
        },
        monthlyStartingPrice: 0,
        popularity: 78,
        features: [
            "Drag-and-drop LLM flows",
            "Multiple AI model support",
            "Custom components",
            "Chain complex prompts",
            "API generation",
            "Real-time testing"
        ],
        integrations: ["OpenAI", "Hugging Face", "LangChain", "Pinecone", "ChromaDB", "APIs"],
        website: "https://langflow.org",
        useCase: "A startup uses Langflow to create a customer service chatbot by visually connecting document retrieval, context processing, and response generation with different AI models.",
        proscons: {
            pros: ["Visual interface", "Open source", "LLM-focused", "Easy prototyping"],
            cons: ["Newer project", "Limited integrations", "Requires AI knowledge", "Can be resource-intensive"]
        },
        bestFor: "Developers and researchers building LLM applications who prefer visual workflow design",
        tags: ["LLM", "visual", "prototyping", "drag-drop"]
    },
    {
        id: "flowise",
        name: "Flowise",
        category: "workflow-automation",
        tagline: "Drag & drop LLM flows",
        description: "Open-source UI visual tool to build customized LLM flows using LangChain, featuring drag-and-drop interface for creating AI applications without coding.",
        logo: "💧",
        pricing: {
            free: "Open source self-hosted",
            cloud: "$19/month - Hosted version",
            enterprise: "Custom pricing"
        },
        monthlyStartingPrice: 0,
        popularity: 82,
        features: [
            "Visual flow builder",
            "LangChain integration",
            "Memory management",
            "Document processing",
            "Chat interfaces",
            "API endpoints"
        ],
        integrations: ["LangChain", "OpenAI", "Anthropic", "Pinecone", "Supabase", "PostgreSQL"],
        website: "https://flowiseai.com",
        useCase: "A content creator uses Flowise to build a research assistant that can ingest documents, answer questions about them, and generate summaries with proper citations.",
        proscons: {
            pros: ["User-friendly interface", "LangChain powered", "Open source", "Good documentation"],
            cons: ["Limited to LangChain ecosystem", "Newer project", "Requires hosting setup", "Performance can vary"]
        },
        bestFor: "Non-technical users who want to build LLM applications with visual tools",
        tags: ["visual", "LangChain", "no-code", "chatbots"]
    },
    {
        id: "dify",
        name: "Dify",
        category: "workflow-automation",
        tagline: "LLM app development platform",
        description: "Open-source platform for building LLM applications with visual workflow designer, prompt management, and deployment tools for production AI apps.",
        logo: "🚀",
        pricing: {
            free: "Open source self-hosted",
            cloud: "$59/month - Hosted version",
            enterprise: "Custom pricing with SLA"
        },
        monthlyStartingPrice: 0,
        popularity: 88,
        features: [
            "Visual workflow designer",
            "Prompt management",
            "Model orchestration",
            "API management",
            "User analytics",
            "Multi-tenant support"
        ],
        integrations: ["OpenAI", "Anthropic", "Azure OpenAI", "Hugging Face", "Local models"],
        website: "https://dify.ai",
        useCase: "An enterprise uses Dify to create a customer support AI that handles multiple languages, integrates with their CRM, and provides analytics on conversation quality and customer satisfaction.",
        proscons: {
            pros: ["Production-ready", "Enterprise features", "Good scalability", "Active development"],
            cons: ["Steeper learning curve", "Resource intensive", "Requires infrastructure knowledge", "Complex pricing"]
        },
        bestFor: "Enterprises and serious developers building production LLM applications",
        tags: ["enterprise", "production", "scalable", "analytics"]
    },

    // API/CLI Tools
    {
        id: "openai-api",
        name: "OpenAI API",
        category: "api-cli",
        tagline: "Access to GPT models via API",
        description: "Direct API access to OpenAI's suite of AI models including GPT-4, GPT-3.5, DALL-E, and Whisper for building custom AI applications.",
        logo: "🔑",
        pricing: {
            payPerUse: "Usage-based pricing",
            gpt4: "$0.03 per 1K tokens (input), $0.06 per 1K tokens (output)",
            gpt35: "$0.001 per 1K tokens (input), $0.002 per 1K tokens (output)"
        },
        monthlyStartingPrice: null,
        popularity: 95,
        features: [
            "Multiple AI models",
            "Fine-tuning capability",
            "Function calling",
            "Streaming responses",
            "Batch processing",
            "Usage analytics"
        ],
        integrations: ["REST API", "Python SDK", "Node.js SDK", "Any programming language"],
        website: "https://platform.openai.com",
        useCase: "A mobile app developer integrates OpenAI API to add intelligent chat features, content generation, and voice transcription to their application with custom prompts and user context.",
        proscons: {
            pros: ["Most powerful models", "Flexible usage", "Excellent documentation", "Wide ecosystem"],
            cons: ["Can be expensive at scale", "Rate limits", "Internet required", "Usage tracking needed"]
        },
        bestFor: "Developers building custom AI applications who need direct model access",
        tags: ["API", "GPT-4", "development", "integration"]
    },
    {
        id: "anthropic-api",
        name: "Anthropic API",
        category: "api-cli",
        tagline: "Claude AI models via API",
        description: "API access to Anthropic's Claude models known for their safety, reasoning capabilities, and large context windows for building reliable AI applications.",
        logo: "🧠",
        pricing: {
            payPerUse: "Usage-based pricing",
            claude3: "$0.015 per 1K tokens (input), $0.075 per 1K tokens (output)",
            haiku: "$0.001 per 1K tokens (input), $0.005 per 1K tokens (output)"
        },
        monthlyStartingPrice: null,
        popularity: 88,
        features: [
            "Large context windows (200K tokens)",
            "Strong reasoning capabilities",
            "Safety-focused responses",
            "Function calling",
            "Streaming support",
            "Multiple model variants"
        ],
        integrations: ["REST API", "Python SDK", "TypeScript SDK", "Webhooks"],
        website: "https://anthropic.com",
        useCase: "A legal tech company uses Claude API to analyze long contracts and legal documents, taking advantage of the large context window to process entire documents at once.",
        proscons: {
            pros: ["Large context windows", "Strong reasoning", "Safety-focused", "Reliable outputs"],
            cons: ["Smaller ecosystem than OpenAI", "Newer service", "Limited model variety", "Regional availability"]
        },
        bestFor: "Developers who need AI with strong reasoning and safety features for professional applications",
        tags: ["API", "Claude", "safety", "reasoning"]
    },

    // No-Code Builders
    {
        id: "bubble-ai",
        name: "Bubble",
        category: "no-code",
        tagline: "No-code app builder with AI plugins",
        description: "Visual programming platform for building web applications without code, with extensive AI integrations and plugins for adding intelligent features.",
        logo: "🫧",
        pricing: {
            free: "Limited app on Bubble subdomain",
            starter: "$25/month - Custom domain and more features",
            growth: "$115/month - Advanced features and capacity"
        },
        monthlyStartingPrice: 0,
        popularity: 85,
        features: [
            "Visual app builder",
            "AI plugin marketplace",
            "Database management",
            "User authentication",
            "Payment processing",
            "Custom workflows"
        ],
        integrations: ["OpenAI", "Stripe", "Google APIs", "Zapier", "Various AI services"],
        website: "https://bubble.io",
        useCase: "An entrepreneur builds a complete SaaS product for content creation with AI writing assistance, user management, payments, and analytics without writing any code.",
        proscons: {
            pros: ["No coding required", "Full-stack capabilities", "Active marketplace", "Strong community"],
            cons: ["Can become expensive", "Performance limitations", "Vendor lock-in", "Learning curve"]
        },
        bestFor: "Non-technical entrepreneurs who want to build full web applications with AI features",
        tags: ["no-code", "full-stack", "SaaS", "visual"]
    },
    {
        id: "framer",
        name: "Framer",
        category: "no-code",
        tagline: "AI-powered website builder",
        description: "Design and publish websites with AI assistance, featuring intelligent design suggestions, content generation, and responsive layouts created automatically.",
        logo: "🎨",
        pricing: {
            free: "3 sites on Framer domain",
            mini: "$5/month - Custom domain",
            basic: "$15/month - Advanced features",
            pro: "$25/month - Team features"
        },
        monthlyStartingPrice: 0,
        popularity: 80,
        features: [
            "AI design assistance",
            "Content generation",
            "Responsive design automation",
            "Component library",
            "CMS integration",
            "SEO optimization"
        ],
        integrations: ["Figma", "Google Analytics", "Mailchimp", "Notion", "Airtable"],
        website: "https://framer.com",
        useCase: "A designer uses Framer's AI to quickly generate a portfolio website by describing their style preferences, with AI automatically creating layouts, content, and responsive versions.",
        proscons: {
            pros: ["AI-assisted design", "Professional output", "Easy to use", "Good performance"],
            cons: ["Limited to websites", "Monthly subscription", "Design constraints", "Learning curve for advanced features"]
        },
        bestFor: "Designers and creatives who want professional websites with AI assistance",
        tags: ["design", "websites", "AI-assisted", "responsive"]
    },
    {
        id: "v0-by-vercel",
        name: "v0 by Vercel",
        category: "no-code",
        tagline: "AI UI generator",
        description: "Generate React components and full UIs from text descriptions using AI, with instant preview and deployment capabilities integrated with Vercel platform.",
        logo: "⚡",
        pricing: {
            free: "Limited generations per month",
            pro: "$20/month - Unlimited generations",
            team: "$40/month - Team features"
        },
        monthlyStartingPrice: 0,
        popularity: 92,
        features: [
            "Text-to-UI generation",
            "React component output",
            "Instant preview",
            "Tailwind CSS styling",
            "Code export",
            "Iteration support"
        ],
        integrations: ["Vercel", "Next.js", "React", "Tailwind CSS", "Shadcn/ui"],
        website: "https://v0.dev",
        useCase: "A developer describes 'a dashboard with charts, user stats, and a sidebar navigation' and v0 generates a complete React component with proper styling and interactive elements.",
        proscons: {
            pros: ["High-quality code output", "Instant results", "React/Next.js focused", "Continuous improvements"],
            cons: ["Limited to React ecosystem", "Requires technical knowledge to customize", "Subscription for heavy usage", "Still in beta"]
        },
        bestFor: "React developers who want to rapidly prototype UIs and components",
        tags: ["React", "UI generation", "prototyping", "Tailwind"]
    },
    {
        id: "bolt-new",
        name: "Bolt.new",
        category: "no-code",
        tagline: "AI full-stack app generator",
        description: "Generate complete full-stack applications from descriptions, with AI creating frontend, backend, database schema, and deployment configuration in minutes.",
        logo: "⚡",
        pricing: {
            free: "Limited generations and features",
            pro: "$20/month - Unlimited generations",
            team: "$50/month - Team collaboration"
        },
        monthlyStartingPrice: 0,
        popularity: 87,
        features: [
            "Full-stack app generation",
            "Multiple framework support",
            "Database integration",
            "Authentication systems",
            "Deployment automation",
            "Real-time collaboration"
        ],
        integrations: ["React", "Vue", "Node.js", "PostgreSQL", "MongoDB", "Vercel", "Netlify"],
        website: "https://bolt.new",
        useCase: "A startup founder describes their e-commerce idea and Bolt.new generates a complete application with product catalog, shopping cart, user authentication, payment integration, and admin panel.",
        proscons: {
            pros: ["Complete applications", "Multiple tech stacks", "Fast development", "Professional quality"],
            cons: ["Can be complex to customize", "Subscription required", "Limited to supported frameworks", "May generate unnecessary features"]
        },
        bestFor: "Non-technical founders and rapid prototypers who need complete applications quickly",
        tags: ["full-stack", "rapid development", "startup", "complete apps"]
    },

    // LLM Interfaces
    {
        id: "claude",
        name: "Claude",
        category: "llm-interfaces",
        tagline: "AI assistant by Anthropic",
        description: "Advanced AI assistant focused on being helpful, harmless, and honest, with strong reasoning capabilities and support for long conversations and document analysis.",
        logo: "🤖",
        pricing: {
            free: "Limited usage per day",
            pro: "$20/month - 5x more usage",
            team: "$25/month per user - Team features and higher limits"
        },
        monthlyStartingPrice: 0,
        popularity: 90,
        features: [
            "Long context conversations",
            "Document analysis",
            "Code generation and debugging",
            "Creative writing",
            "Research assistance",
            "Math and reasoning"
        ],
        integrations: ["Web interface", "Mobile apps", "API access", "Claude for Work"],
        website: "https://claude.ai",
        useCase: "A researcher uploads a 50-page academic paper and asks Claude to summarize key findings, compare with other research, and suggest follow-up experiments with detailed reasoning.",
        proscons: {
            pros: ["Excellent reasoning", "Long context windows", "Safety-focused", "High-quality outputs"],
            cons: ["Usage limits on free tier", "No plugins/extensions", "Newer than competitors", "Limited internet access"]
        },
        bestFor: "Professionals and researchers who need reliable AI assistance for complex reasoning tasks",
        tags: ["AI assistant", "reasoning", "research", "professional"]
    },
    {
        id: "chatgpt",
        name: "ChatGPT",
        category: "llm-interfaces",
        tagline: "OpenAI's conversational AI",
        description: "Popular conversational AI assistant with web browsing, image generation, code execution, and plugin ecosystem for extending capabilities across various domains.",
        logo: "💬",
        pricing: {
            free: "GPT-3.5 with limited features",
            plus: "$20/month - GPT-4, plugins, browsing, image generation",
            team: "$25/month per user - Team workspace and admin features"
        },
        monthlyStartingPrice: 0,
        popularity: 98,
        features: [
            "Conversational AI",
            "Web browsing",
            "Image generation (DALL-E)",
            "Code execution",
            "Plugin ecosystem",
            "Custom GPTs"
        ],
        integrations: ["Web plugins", "Zapier", "Slack", "Microsoft", "Third-party integrations"],
        website: "https://chat.openai.com",
        useCase: "A marketing manager uses ChatGPT to research competitors, generate campaign ideas, create images for social media, and analyze campaign performance data all in one conversation.",
        proscons: {
            pros: ["Most popular", "Extensive plugin ecosystem", "Multi-modal capabilities", "Strong community"],
            cons: ["Can hallucinate", "Usage limits", "Subscription for best features", "Privacy concerns"]
        },
        bestFor: "General users who want a versatile AI assistant with extensive capabilities and integrations",
        tags: ["conversational AI", "plugins", "multi-modal", "popular"]
    },
    {
        id: "gemini",
        name: "Google Gemini",
        category: "llm-interfaces",
        tagline: "Google's multimodal AI assistant",
        description: "Google's advanced AI assistant with strong integration to Google services, multimodal capabilities, and access to real-time information from Google Search.",
        logo: "💎",
        pricing: {
            free: "Gemini with limited usage",
            advanced: "$19.99/month - Gemini Advanced with more capabilities",
            workspace: "Included in Google Workspace plans"
        },
        monthlyStartingPrice: 0,
        popularity: 85,
        features: [
            "Google services integration",
            "Real-time web search",
            "Multimodal input/output",
            "Gmail and Docs integration",
            "Google Workspace collaboration",
            "Mobile app"
        ],
        integrations: ["Gmail", "Google Docs", "Google Sheets", "Google Drive", "YouTube", "Google Search"],
        website: "https://gemini.google.com",
        useCase: "A business analyst uses Gemini to analyze data from Google Sheets, research market trends via Google Search, and automatically generate reports in Google Docs with charts and insights.",
        proscons: {
            pros: ["Google ecosystem integration", "Real-time information", "Multimodal", "Workspace integration"],
            cons: ["Newer service", "Limited third-party integrations", "Privacy concerns", "Requires Google account"]
        },
        bestFor: "Users heavily invested in Google ecosystem who want AI integrated with their Google services",
        tags: ["Google", "multimodal", "workspace", "search"]
    },
    {
        id: "perplexity",
        name: "Perplexity AI",
        category: "llm-interfaces",
        tagline: "AI-powered search engine",
        description: "AI search engine that provides accurate, sourced answers by searching the web and synthesizing information from multiple sources with proper citations.",
        logo: "🔍",
        pricing: {
            free: "Limited searches per day",
            pro: "$20/month - Unlimited searches, GPT-4, Claude access",
            enterprise: "Custom pricing for teams"
        },
        monthlyStartingPrice: 0,
        popularity: 82,
        features: [
            "Real-time web search",
            "Source citations",
            "Multiple AI models",
            "Follow-up questions",
            "Research threads",
            "Academic mode"
        ],
        integrations: ["Web search", "Academic databases", "News sources", "API access"],
        website: "https://perplexity.ai",
        useCase: "A journalist researches a breaking news story using Perplexity, getting real-time information from multiple sources with proper citations and the ability to dig deeper with follow-up questions.",
        proscons: {
            pros: ["Real-time information", "Source citations", "Research-focused", "Multiple AI models"],
            cons: ["Limited general AI capabilities", "Focused on search/research", "Newer service", "Can be slow"]
        },
        bestFor: "Researchers, journalists, and students who need accurate, sourced information from the web",
        tags: ["search", "research", "citations", "real-time"]
    },

    // DevOps/Infrastructure AI
    {
        id: "dagger",
        name: "Dagger",
        category: "devops",
        tagline: "Programmable CI/CD engine",
        description: "Programmable CI/CD platform that allows you to define pipelines as code with AI-assisted configuration and optimization for faster, more reliable deployments.",
        logo: "⚔️",
        pricing: {
            free: "Open source for self-hosted",
            cloud: "$20/month - Hosted Dagger Cloud",
            enterprise: "Custom pricing for advanced features"
        },
        monthlyStartingPrice: 0,
        popularity: 75,
        features: [
            "Pipeline as code",
            "Language agnostic",
            "Local development",
            "Container-native",
            "GraphQL API",
            "Caching optimization"
        ],
        integrations: ["Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "AWS", "GCP"],
        website: "https://dagger.io",
        useCase: "A development team uses Dagger to create consistent CI/CD pipelines that run the same way locally and in production, with AI helping optimize build times and resource usage.",
        proscons: {
            pros: ["Consistent local/remote execution", "Language agnostic", "Container-native", "Good caching"],
            cons: ["Learning curve", "Newer ecosystem", "Requires container knowledge", "Limited AI features currently"]
        },
        bestFor: "DevOps engineers who want consistent, programmable CI/CD pipelines",
        tags: ["CI/CD", "containers", "DevOps", "automation"]
    },
    {
        id: "pulumi-ai",
        name: "Pulumi AI",
        category: "devops",
        tagline: "Infrastructure as code with AI",
        description: "Infrastructure as code platform with AI assistance for generating, reviewing, and optimizing cloud infrastructure definitions across multiple cloud providers.",
        logo: "☁️",
        pricing: {
            free: "Individual use with basic features",
            team: "$50/month - Team features and advanced policies",
            enterprise: "Custom pricing for enterprise features"
        },
        monthlyStartingPrice: 0,
        popularity: 78,
        features: [
            "AI code generation",
            "Multi-cloud support",
            "Real programming languages",
            "Policy as code",
            "State management",
            "GitOps workflows"
        ],
        integrations: ["AWS", "Azure", "GCP", "Kubernetes", "GitHub", "GitLab", "Slack"],
        website: "https://pulumi.com",
        useCase: "A cloud architect describes their infrastructure needs in natural language and Pulumi AI generates the complete infrastructure code in TypeScript, including security policies and best practices.",
        proscons: {
            pros: ["Real programming languages", "AI assistance", "Multi-cloud", "Strong ecosystem"],
            cons: ["Steeper learning curve", "Requires programming knowledge", "Can be complex", "Subscription for teams"]
        },
        bestFor: "Cloud engineers and architects who want infrastructure as code with AI assistance",
        tags: ["infrastructure", "AI-assisted", "multi-cloud", "IaC"]
    },
    {
        id: "k8sgpt",
        name: "K8sGPT",
        category: "devops",
        tagline: "Kubernetes AI assistant",
        description: "AI-powered tool for analyzing Kubernetes clusters, diagnosing issues, and providing intelligent recommendations for optimization and troubleshooting.",
        logo: "⚙️",
        pricing: {
            free: "Open source CLI tool",
            apiCosts: "AI model API costs (OpenAI, etc.)",
            enterprise: "Commercial support available"
        },
        monthlyStartingPrice: 0,
        popularity: 82,
        features: [
            "Cluster analysis",
            "Issue diagnosis",
            "Optimization recommendations",
            "Security scanning",
            "Resource optimization",
            "Natural language explanations"
        ],
        integrations: ["Kubernetes", "OpenAI", "Azure OpenAI", "Local AI models", "Prometheus"],
        website: "https://k8sgpt.ai",
        useCase: "A DevOps engineer runs K8sGPT on a problematic cluster and receives plain-English explanations of pod failures, resource constraints, and security issues with specific remediation steps.",
        proscons: {
            pros: ["Open source", "Kubernetes-focused", "AI-powered insights", "Easy to use"],
            cons: ["Requires Kubernetes knowledge", "API costs for AI models", "Limited to Kubernetes", "Newer project"]
        },
        bestFor: "Kubernetes operators who want AI assistance for cluster management and troubleshooting",
        tags: ["Kubernetes", "cluster analysis", "troubleshooting", "open source"]
    },

    // Creative AI Tools
    {
        id: "midjourney",
        name: "Midjourney",
        category: "creative",
        tagline: "AI image generation",
        description: "Leading AI image generation tool creating high-quality, artistic images from text descriptions with advanced styling and creative control options.",
        logo: "🎨",
        pricing: {
            free: "Limited trial images",
            basic: "$10/month - 200 images",
            standard: "$30/month - Unlimited relaxed mode",
            pro: "$60/month - Stealth mode and more features"
        },
        monthlyStartingPrice: 10,
        popularity: 95,
        features: [
            "High-quality image generation",
            "Artistic style control",
            "Aspect ratio options",
            "Image variations",
            "Upscaling and enhancement",
            "Community gallery"
        ],
        integrations: ["Discord", "Web interface", "API (limited)"],
        website: "https://midjourney.com",
        useCase: "A marketing agency uses Midjourney to create unique brand illustrations, social media graphics, and campaign visuals by describing concepts in natural language and iterating on styles.",
        proscons: {
            pros: ["Exceptional image quality", "Artistic styles", "Strong community", "Regular updates"],
            cons: ["Discord-based interface", "Subscription required", "Limited commercial usage on lower tiers", "No API for most users"]
        },
        bestFor: "Designers, marketers, and creatives who need high-quality AI-generated images",
        tags: ["image generation", "creative", "art", "design"]
    },
    {
        id: "runway",
        name: "Runway",
        category: "creative",
        tagline: "AI video and creative suite",
        description: "Comprehensive AI-powered creative suite for video generation, editing, and enhancement with tools for motion graphics, visual effects, and content creation.",
        logo: "🎬",
        pricing: {
            free: "Limited credits per month",
            standard: "$12/month - More credits and features",
            pro: "$28/month - Advanced features",
            unlimited: "$76/month - Unlimited usage"
        },
        monthlyStartingPrice: 0,
        popularity: 88,
        features: [
            "AI video generation",
            "Text-to-video",
            "Video editing tools",
            "Motion graphics",
            "Background removal",
            "Style transfer"
        ],
        integrations: ["Adobe Creative Suite", "Final Cut Pro", "DaVinci Resolve", "Web interface"],
        website: "https://runwayml.com",
        useCase: "A content creator uses Runway to generate short promotional videos from text descriptions, add AI-powered effects to existing footage, and create motion graphics for social media.",
        proscons: {
            pros: ["Comprehensive creative tools", "High-quality video generation", "Professional features", "Regular innovation"],
            cons: ["Can be expensive", "Learning curve", "Resource intensive", "Credit-based pricing"]
        },
        bestFor: "Video creators, filmmakers, and content creators who want AI-powered video tools",
        tags: ["video generation", "creative", "editing", "content creation"]
    }
];

// Pre-built toolkits for different use cases
const predefinedStacks = {
    "Solo Developer": [
        "cursor",
        "github-copilot", 
        "claude",
        "v0-by-vercel"
    ],
    "Startup Team": [
        "cursor",
        "claude-code",
        "n8n",
        "bubble-ai",
        "perplexity"
    ],
    "Enterprise Development": [
        "github-copilot",
        "amazon-q-developer",
        "dify",
        "pulumi-ai",
        "k8sgpt"
    ],
    "Beginner": [
        "chatgpt",
        "github-copilot",
        "framer"
    ],
    "AI Researcher": [
        "claude",
        "autogpt",
        "langflow",
        "anthropic-api",
        "perplexity"
    ],
    "Content Creator": [
        "chatgpt",
        "runway",
        "midjourney",
        "framer",
        "bolt-new"
    ]
};

// Category metadata
const categories = {
    "code-assistants": {
        name: "Code Assistants",
        description: "AI-powered coding tools and IDE extensions",
        icon: "fas fa-code",
        color: "#3B82F6"
    },
    "ai-agents": {
        name: "AI Agents", 
        description: "Autonomous AI agents for complex tasks",
        icon: "fas fa-robot",
        color: "#8B5CF6"
    },
    "workflow-automation": {
        name: "Workflow Automation",
        description: "Automate processes with AI integration",
        icon: "fas fa-project-diagram",
        color: "#10B981"
    },
    "api-cli": {
        name: "API/CLI Tools",
        description: "Developer APIs and command-line tools",
        icon: "fas fa-terminal",
        color: "#F59E0B"
    },
    "no-code": {
        name: "No-Code Builders",
        description: "Build applications without coding",
        icon: "fas fa-magic",
        color: "#EF4444"
    },
    "llm-interfaces": {
        name: "LLM Interfaces",
        description: "Chat interfaces and AI assistants",
        icon: "fas fa-comments",
        color: "#06B6D4"
    },
    "devops": {
        name: "DevOps & Infrastructure",
        description: "AI-powered DevOps and cloud tools",
        icon: "fas fa-server",
        color: "#84CC16"
    },
    "creative": {
        name: "Creative AI",
        description: "AI tools for creative content",
        icon: "fas fa-palette",
        color: "#EC4899"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { aiTools, predefinedStacks, categories };
}
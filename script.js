// Global state management
class AIToolsApp {
    constructor() {
        this.currentView = 'cards';
        this.selectedCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'popularity';
        this.selectedTools = new Set();
        this.comparisonTools = new Set();
        this.filteredTools = [...aiTools];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
        this.renderTools();
        this.createIntegrationMap();
        this.renderUseCaseScenarios();
        this.hideLoading();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', this.handleSearch.bind(this));
        clearSearch.addEventListener('click', this.clearSearch.bind(this));

        // View toggles
        document.getElementById('cardView').addEventListener('click', () => this.switchView('cards'));
        document.getElementById('tableView').addEventListener('click', () => this.switchView('table'));

        // Category filters
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });

        // Sort functionality
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderTools();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', this.toggleTheme.bind(this));

        // Stack Builder
        document.getElementById('stackBuilderBtn').addEventListener('click', this.openStackBuilder.bind(this));
        document.getElementById('closeStackBuilder').addEventListener('click', this.closeModal.bind(this));
        
        // Tool Detail Modal
        document.getElementById('closeToolDetail').addEventListener('click', this.closeModal.bind(this));
        
        // Comparison Modal
        document.getElementById('closeComparison').addEventListener('click', this.closeModal.bind(this));

        // Modal outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });

        // Stack actions
        document.getElementById('exportStack').addEventListener('click', this.exportStack.bind(this));
        document.getElementById('clearStack').addEventListener('click', this.clearStack.bind(this));

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }

    handleKeyboard(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            this.closeModal();
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    }

    handleSearch(e) {
        this.searchQuery = e.target.value.toLowerCase();
        const clearBtn = document.getElementById('clearSearch');
        clearBtn.style.display = this.searchQuery ? 'block' : 'none';
        this.renderTools();
    }

    clearSearch() {
        document.getElementById('searchInput').value = '';
        document.getElementById('clearSearch').style.display = 'none';
        this.searchQuery = '';
        this.renderTools();
    }

    switchView(view) {
        this.currentView = view;
        
        // Update active states
        document.querySelectorAll('.view-toggle').forEach(btn => btn.classList.remove('active'));
        const viewId = view === 'cards' ? 'cardView' : 'tableView';
        document.getElementById(viewId).classList.add('active');
        
        // Toggle visibility
        const gridContainer = document.getElementById('toolsGrid');
        const tableContainer = document.getElementById('toolsTable');
        
        if (view === 'cards') {
            gridContainer.style.display = 'grid';
            tableContainer.style.display = 'none';
        } else {
            gridContainer.style.display = 'none';
            tableContainer.style.display = 'block';
        }
        
        this.renderTools();
        this.saveUserPreferences();
    }

    filterByCategory(category) {
        this.selectedCategory = category;
        
        // Update active states
        document.querySelectorAll('.category-filter').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.renderTools();
    }

    getFilteredTools() {
        let filtered = [...aiTools];

        // Search filter - when searching, search across ALL categories
        if (this.searchQuery) {
            filtered = filtered.filter(tool => {
                return tool.name.toLowerCase().includes(this.searchQuery) ||
                       tool.description.toLowerCase().includes(this.searchQuery) ||
                       tool.tagline.toLowerCase().includes(this.searchQuery) ||
                       tool.features.some(feature => feature.toLowerCase().includes(this.searchQuery)) ||
                       tool.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
            });
        } else {
            // Category filter - only apply when NOT searching
            if (this.selectedCategory !== 'all') {
                filtered = filtered.filter(tool => tool.category === this.selectedCategory);
            }
        }

        // Sort
        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'category':
                    return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
                case 'pricing':
                    const aPrice = a.monthlyStartingPrice || 0;
                    const bPrice = b.monthlyStartingPrice || 0;
                    return aPrice - bPrice;
                case 'popularity':
                    return (b.popularity || 0) - (a.popularity || 0);
                default:
                    return 0;
            }
        });

        this.filteredTools = filtered;
        return filtered;
    }

    renderTools() {
        const tools = this.getFilteredTools();
        const noResults = document.getElementById('noResults');
        
        if (tools.length === 0) {
            noResults.style.display = 'flex';
            document.getElementById('toolsGrid').style.display = 'none';
            document.getElementById('toolsTable').style.display = 'none';
            return;
        }
        
        noResults.style.display = 'none';
        
        if (this.currentView === 'cards') {
            this.renderCardsView(tools);
        } else {
            this.renderTableView(tools);
        }
    }

    renderCardsView(tools) {
        const container = document.getElementById('toolsGrid');
        const tableContainer = document.getElementById('toolsTable');
        
        container.innerHTML = '';
        container.style.display = 'grid';
        tableContainer.style.display = 'none';
        
        tools.forEach(tool => {
            const card = this.createToolCard(tool);
            container.appendChild(card);
        });
    }

    renderTableView(tools) {
        const container = document.getElementById('toolsTable');
        const gridContainer = document.getElementById('toolsGrid');
        
        container.style.display = 'block';
        gridContainer.style.display = 'none';
        
        const table = document.createElement('table');
        
        // Header
        const header = document.createElement('thead');
        header.innerHTML = `
            <tr>
                <th>Tool</th>
                <th>Category</th>
                <th>Pricing</th>
                <th>Popularity</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(header);
        
        // Body
        const body = document.createElement('tbody');
        tools.forEach(tool => {
            const row = this.createTableRow(tool);
            body.appendChild(row);
        });
        table.appendChild(body);
        
        container.innerHTML = '';
        container.appendChild(table);
    }

    createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card fade-in';
        
        const pricingBadge = this.getPricingBadge(tool);
        const categoryInfo = categories[tool.category];
        
        card.innerHTML = `
            <div class="tool-card-header">
                <div class="tool-logo">${tool.logo}</div>
                <div class="tool-info">
                    <h3>${tool.name}</h3>
                    <p class="tagline">${tool.tagline}</p>
                </div>
            </div>
            
            <div class="tool-category" style="background: ${categoryInfo.color}20; color: ${categoryInfo.color};">
                <i class="${categoryInfo.icon}"></i> ${categoryInfo.name}
            </div>
            
            <div class="tool-description">
                ${tool.description}
            </div>
            
            <div class="tool-pricing">
                ${pricingBadge}
            </div>
            
            <div class="tool-features">
                <div class="features-list">
                    ${tool.features.slice(0, 3).map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                    ${tool.features.length > 3 ? `<span class="feature-tag">+${tool.features.length - 3} more</span>` : ''}
                </div>
            </div>
            
            <div class="tool-actions">
                <button class="btn btn-primary btn-small" onclick="window.open('${tool.website}', '_blank')">
                    <i class="fas fa-external-link-alt"></i> Visit
                </button>
                <button class="btn btn-secondary btn-small" onclick="app.showToolDetail('${tool.id}')">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="btn btn-outline btn-small" onclick="app.toggleToolInStack('${tool.id}')">
                    <i class="fas ${this.selectedTools.has(tool.id) ? 'fa-check' : 'fa-plus'}"></i> 
                    ${this.selectedTools.has(tool.id) ? 'Added' : 'Add to Toolkit'}
                </button>
                <button class="btn btn-outline btn-small" onclick="app.toggleToolInComparison('${tool.id}')">
                    <i class="fas fa-balance-scale"></i> Compare
                </button>
            </div>
        `;
        
        return card;
    }

    createTableRow(tool) {
        const row = document.createElement('tr');
        const pricingInfo = this.getPricingText(tool);
        const categoryInfo = categories[tool.category];
        
        row.innerHTML = `
            <td>
                <div class="table-tool-name">
                    <div class="table-tool-logo">${tool.logo}</div>
                    <div>
                        <div style="font-weight: 600;">${tool.name}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${tool.tagline}</div>
                    </div>
                </div>
            </td>
            <td>
                <span style="color: ${categoryInfo.color};">
                    <i class="${categoryInfo.icon}"></i> ${categoryInfo.name}
                </span>
            </td>
            <td>${pricingInfo}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 60px; height: 4px; background: var(--bg-tertiary); border-radius: 2px;">
                        <div style="width: ${tool.popularity || 0}%; height: 100%; background: var(--accent-primary); border-radius: 2px;"></div>
                    </div>
                    <span style="font-size: 0.875rem; color: var(--text-secondary);">${tool.popularity || 0}%</span>
                </div>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary btn-small" onclick="window.open('${tool.website}', '_blank')">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="app.showToolDetail('${tool.id}')">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="app.toggleToolInStack('${tool.id}')">
                        <i class="fas ${this.selectedTools.has(tool.id) ? 'fa-check' : 'fa-plus'}"></i>
                    </button>
                </div>
            </td>
        `;
        
        return row;
    }

    getPricingBadge(tool) {
        if (tool.monthlyStartingPrice === null) {
            return '<div class="pricing-badge">Pay per use</div>';
        } else if (tool.monthlyStartingPrice === 0) {
            return '<div class="pricing-badge"><i class="fas fa-gift"></i> Free</div>';
        } else {
            return `<div class="pricing-badge paid"><i class="fas fa-dollar-sign"></i> From $${tool.monthlyStartingPrice}/mo</div>`;
        }
    }

    getPricingText(tool) {
        if (tool.monthlyStartingPrice === null) {
            return 'Pay per use';
        } else if (tool.monthlyStartingPrice === 0) {
            return 'Free';
        } else {
            return `$${tool.monthlyStartingPrice}/mo`;
        }
    }

    showToolDetail(toolId) {
        const tool = aiTools.find(t => t.id === toolId);
        if (!tool) return;
        
        const modal = document.getElementById('toolDetailModal');
        const title = document.getElementById('toolDetailTitle');
        const content = document.getElementById('toolDetailContent');
        
        title.innerHTML = `<span style="font-size: 1.5rem; margin-right: 0.5rem;">${tool.logo}</span> ${tool.name}`;
        
        content.innerHTML = `
            <div class="tool-detail-grid">
                <div>
                    <div class="detail-section">
                        <h3>Overview</h3>
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">${tool.tagline}</p>
                        <p style="line-height: 1.6;">${tool.description}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Key Features</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${tool.features.map(feature => `
                                <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                                    <i class="fas fa-check" style="color: var(--success); margin-right: 0.5rem;"></i>
                                    ${feature}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Use Case Example</h3>
                        <div class="use-case-box">
                            ${tool.useCase}
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="detail-section">
                        <h3>Pricing</h3>
                        <div class="pricing-tiers">
                            ${Object.entries(tool.pricing).map(([tier, description]) => `
                                <div class="pricing-tier">
                                    <span class="tier-name">${tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                                    <span class="tier-price">${description}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Integrations</h3>
                        <div class="integrations-grid">
                            ${tool.integrations.map(integration => `
                                <div class="integration-tag">${integration}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Best For</h3>
                        <p style="padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius); border: 1px solid var(--border-color);">
                            ${tool.bestFor}
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Pros & Cons</h3>
                <div class="pros-cons-grid">
                    <div class="pros-list">
                        <h4>Pros</h4>
                        <ul>
                            ${tool.proscons.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons-list">
                        <h4>Cons</h4>
                        <ul>
                            ${tool.proscons.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="window.open('${tool.website}', '_blank')">
                    <i class="fas fa-external-link-alt"></i> Visit Website
                </button>
                <button class="btn btn-secondary" onclick="app.toggleToolInStack('${tool.id}')">
                    <i class="fas ${this.selectedTools.has(tool.id) ? 'fa-check' : 'fa-plus'}"></i>
                    ${this.selectedTools.has(tool.id) ? 'Remove from Toolkit' : 'Add to Toolkit'}
                </button>
                <button class="btn btn-outline" onclick="app.toggleToolInComparison('${tool.id}')">
                    <i class="fas fa-balance-scale"></i> Add to Comparison
                </button>
            </div>
        `;
        
        this.showModal(modal);
    }

    toggleToolInStack(toolId) {
        if (this.selectedTools.has(toolId)) {
            this.selectedTools.delete(toolId);
        } else {
            this.selectedTools.add(toolId);
        }
        
        this.updateStackBuilder();
        this.renderTools(); // Re-render to update button states
        this.saveUserPreferences();
    }

    toggleToolInComparison(toolId) {
        if (this.comparisonTools.has(toolId)) {
            this.comparisonTools.delete(toolId);
        } else if (this.comparisonTools.size < 3) {
            this.comparisonTools.add(toolId);
        } else {
            alert('You can compare up to 3 tools at once.');
            return;
        }
        
        if (this.comparisonTools.size >= 2) {
            this.showComparison();
        }
    }

    showComparison() {
        if (this.comparisonTools.size < 2) return;
        
        const tools = Array.from(this.comparisonTools).map(id => aiTools.find(t => t.id === id));
        const modal = document.getElementById('comparisonModal');
        const content = document.getElementById('comparisonContent');
        
        // Create comparison table
        const comparisonData = [
            { label: 'Tool', values: tools.map(t => `${t.logo} ${t.name}`) },
            { label: 'Category', values: tools.map(t => categories[t.category].name) },
            { label: 'Tagline', values: tools.map(t => t.tagline) },
            { label: 'Starting Price', values: tools.map(t => this.getPricingText(t)) },
            { label: 'Popularity', values: tools.map(t => `${t.popularity || 0}%`) },
            { label: 'Key Features', values: tools.map(t => t.features.slice(0, 3).join(', ')) },
            { label: 'Best For', values: tools.map(t => t.bestFor) }
        ];
        
        content.innerHTML = `
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            ${tools.map(tool => `<th class="tool-header">${tool.logo} ${tool.name}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${comparisonData.map(row => `
                            <tr>
                                <td class="feature-row">${row.label}</td>
                                ${row.values.map(value => `<td>${value}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                ${tools.map(tool => `
                    <button class="btn btn-primary" onclick="window.open('${tool.website}', '_blank')">
                        Visit ${tool.name}
                    </button>
                `).join('')}
                <button class="btn btn-outline" onclick="app.clearComparison()">
                    Clear Comparison
                </button>
            </div>
        `;
        
        this.showModal(modal);
    }

    clearComparison() {
        this.comparisonTools.clear();
        this.closeModal();
    }

    openStackBuilder() {
        this.updateStackBuilder();
        this.showModal(document.getElementById('stackBuilderModal'));
    }

    updateStackBuilder() {
        const selectedTools = Array.from(this.selectedTools).map(id => aiTools.find(t => t.id === id));
        const container = document.getElementById('selectedToolsList');
        
        if (selectedTools.length === 0) {
            container.innerHTML = '<p class="empty-state">Select tools from the main directory to add them here</p>';
        } else {
            container.innerHTML = selectedTools.map(tool => `
                <div class="selected-tool-item">
                    <div style="font-size: 1.5rem;">${tool.logo}</div>
                    <div class="selected-tool-info">
                        <h4>${tool.name}</h4>
                        <p class="price">${this.getPricingText(tool)}</p>
                    </div>
                    <button class="remove-tool" onclick="app.toggleToolInStack('${tool.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }
        
        // Update totals
        const monthlyCost = selectedTools.reduce((total, tool) => {
            return total + (tool.monthlyStartingPrice || 0);
        }, 0);
        
        document.getElementById('totalMonthlyCost').textContent = monthlyCost > 0 ? `$${monthlyCost}` : 'Varies';
        document.getElementById('totalAnnualCost').textContent = monthlyCost > 0 ? `$${monthlyCost * 12}` : 'Varies';
        document.getElementById('toolsCount').textContent = selectedTools.length;
    }

    exportStack() {
        const selectedTools = Array.from(this.selectedTools).map(id => aiTools.find(t => t.id === id));
        
        if (selectedTools.length === 0) {
            alert('No tools selected to export.');
            return;
        }
        
        const monthlyCost = selectedTools.reduce((total, tool) => {
            return total + (tool.monthlyStartingPrice || 0);
        }, 0);
        
        const stackData = {
            exportDate: new Date().toISOString().split('T')[0],
            totalTools: selectedTools.length,
            estimatedMonthlyCost: monthlyCost,
            estimatedAnnualCost: monthlyCost * 12,
            tools: selectedTools.map(tool => ({
                name: tool.name,
                category: tool.category,
                website: tool.website,
                pricing: this.getPricingText(tool),
                description: tool.tagline
            }))
        };
        
        // Create CSV
        const csv = [
            ['Tool Name', 'Category', 'Pricing', 'Website', 'Description'],
            ...stackData.tools.map(tool => [
                tool.name,
                categories[tool.category].name,
                tool.pricing,
                tool.website,
                tool.description
            ])
        ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
        
        // Download CSV
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-tools-toolkit-${stackData.exportDate}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    clearStack() {
        if (confirm('Are you sure you want to clear your entire toolkit?')) {
            this.selectedTools.clear();
            this.updateStackBuilder();
            this.renderTools();
            this.saveUserPreferences();
        }
    }

    loadPrebuiltStack(stackName) {
        const stackTools = predefinedStacks[stackName];
        if (!stackTools) return;
        
        // Clear current selection
        this.selectedTools.clear();
        
        // Add new tools
        stackTools.forEach(toolId => {
            if (aiTools.find(t => t.id === toolId)) {
                this.selectedTools.add(toolId);
            }
        });
        
        this.updateStackBuilder();
        this.renderTools();
        this.saveUserPreferences();
        
        // Show success message
        const toolCount = stackTools.length;
        alert(`Loaded ${stackName} toolkit with ${toolCount} tools!`);
        
        // Open stack builder to show results
        this.openStackBuilder();
    }

    renderUseCaseScenarios() {
        const container = document.querySelector('#useCases .scenarios-grid');
        if (!container) return;
        
        container.innerHTML = Object.entries(predefinedStacks).map(([scenario, toolIds]) => {
            const tools = toolIds.map(id => aiTools.find(t => t.id === id)).filter(Boolean);
            const totalCost = tools.reduce((sum, tool) => sum + (tool.monthlyStartingPrice || 0), 0);
            
            return `
                <div class="scenario-card">
                    <h3>${scenario}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                        ${tools.length} tools • ${totalCost > 0 ? `$${totalCost}/mo` : 'Mixed pricing'}
                    </p>
                    <div class="scenario-tools">
                        ${tools.slice(0, 3).map(tool => 
                            `<span class="scenario-tool">${tool.logo} ${tool.name}</span>`
                        ).join('')}
                        ${tools.length > 3 ? `<span class="scenario-more">+${tools.length - 3} more</span>` : ''}
                    </div>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn-primary btn-small" onclick="app.loadPrebuiltStack('${scenario}')">
                            <i class="fas fa-download"></i> Load Toolkit
                        </button>
                        <button class="btn btn-outline btn-small" onclick="app.showStackPreview('${scenario}')">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    showStackPreview(stackName) {
        const stackTools = predefinedStacks[stackName];
        if (!stackTools) return;
        
        const tools = stackTools.map(id => aiTools.find(t => t.id === id)).filter(Boolean);
        const totalCost = tools.reduce((sum, tool) => sum + (tool.monthlyStartingPrice || 0), 0);
        
        const modal = document.getElementById('toolDetailModal');
        const title = document.getElementById('toolDetailTitle');
        const content = document.getElementById('toolDetailContent');
        
        title.innerHTML = `<i class="fas fa-layer-group"></i> ${stackName} Toolkit Preview`;
        
        content.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--accent-primary);">${tools.length}</div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem;">Tools</div>
                    </div>
                    <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--success);">
                            ${totalCost > 0 ? `$${totalCost}` : 'Mixed'}
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.875rem;">Monthly Cost</div>
                    </div>
                </div>
            </div>
            
            <div style="display: grid; gap: 1rem;">
                ${tools.map(tool => `
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius); border: 1px solid var(--border-color);">
                        <div style="font-size: 2rem;">${tool.logo}</div>
                        <div style="flex: 1;">
                            <h4 style="margin: 0 0 0.25rem 0;">${tool.name}</h4>
                            <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">${tool.tagline}</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 600; color: var(--accent-primary);">
                                ${tool.monthlyStartingPrice === 0 ? 'Free' : tool.monthlyStartingPrice === null ? 'Pay per use' : `$${tool.monthlyStartingPrice}/mo`}
                            </div>
                            <div style="color: var(--text-secondary); font-size: 0.75rem;">
                                ${categories[tool.category].name}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: center;">
                <button class="btn btn-primary" onclick="app.loadPrebuiltStack('${stackName}'); app.closeModal();">
                    <i class="fas fa-download"></i> Load This Toolkit
                </button>
                <button class="btn btn-secondary" onclick="app.closeModal()">
                    <i class="fas fa-times"></i> Close Preview
                </button>
            </div>
        `;
        
        this.showModal(modal);
    }

    createIntegrationMap() {
        const container = document.getElementById('integrationViz');
        if (!container) return;
        
        // Create a simple visualization of tool integrations
        const integrationData = {};
        aiTools.forEach(tool => {
            tool.integrations.forEach(integration => {
                if (!integrationData[integration]) {
                    integrationData[integration] = [];
                }
                integrationData[integration].push(tool);
            });
        });
        
        // Sort by most popular integrations
        const sortedIntegrations = Object.entries(integrationData)
            .sort(([,a], [,b]) => b.length - a.length)
            .slice(0, 10);
        
        container.innerHTML = `
            <div style="text-align: left; max-width: 800px; margin: 0 auto;">
                <h3 style="text-align: center; margin-bottom: 2rem;">Most Popular Integrations</h3>
                ${sortedIntegrations.map(([integration, tools]) => `
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                            <h4 style="margin: 0; color: var(--accent-primary);">${integration}</h4>
                            <span style="color: var(--text-secondary); font-size: 0.875rem;">${tools.length} tools</span>
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${tools.slice(0, 6).map(tool => `
                                <span style="display: inline-flex; align-items: center; gap: 0.25rem; background: var(--bg-tertiary); padding: 0.25rem 0.75rem; border-radius: var(--radius); font-size: 0.875rem; cursor: pointer;" onclick="app.showToolDetail('${tool.id}')">
                                    ${tool.logo} ${tool.name}
                                </span>
                            `).join('')}
                            ${tools.length > 6 ? `<span style="color: var(--text-tertiary); font-size: 0.875rem; padding: 0.25rem;">+${tools.length - 6} more</span>` : ''}
                        </div>
                        <div style="width: 100%; height: 4px; background: var(--bg-tertiary); border-radius: 2px; margin-top: 0.5rem;">
                            <div style="width: ${Math.min(100, (tools.length / Math.max(...sortedIntegrations.map(([,t]) => t.length))) * 100)}%; height: 100%; background: var(--accent-primary); border-radius: 2px;"></div>
                        </div>
                    </div>
                `).join('')}
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-outline" onclick="app.showAllIntegrations()">
                        <i class="fas fa-expand"></i> View All Integrations
                    </button>
                </div>
            </div>
        `;
    }

    showAllIntegrations() {
        const modal = document.getElementById('toolDetailModal');
        const title = document.getElementById('toolDetailTitle');
        const content = document.getElementById('toolDetailContent');
        
        title.innerHTML = '<i class="fas fa-project-diagram"></i> All Integrations';
        
        // Create comprehensive integration data
        const integrationData = {};
        aiTools.forEach(tool => {
            tool.integrations.forEach(integration => {
                if (!integrationData[integration]) {
                    integrationData[integration] = [];
                }
                integrationData[integration].push(tool);
            });
        });
        
        const sortedIntegrations = Object.entries(integrationData)
            .sort(([,a], [,b]) => b.length - a.length);
        
        content.innerHTML = `
            <div style="max-height: 400px; overflow-y: auto;">
                ${sortedIntegrations.map(([integration, tools]) => `
                    <div style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                            <h4 style="margin: 0; color: var(--accent-primary);">${integration}</h4>
                            <span style="background: var(--bg-secondary); padding: 0.25rem 0.75rem; border-radius: var(--radius); font-size: 0.875rem;">${tools.length} tools</span>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem;">
                            ${tools.map(tool => `
                                <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-tertiary); padding: 0.5rem; border-radius: var(--radius); cursor: pointer;" onclick="app.showToolDetail('${tool.id}'); app.closeModal();">
                                    <span style="font-size: 1rem;">${tool.logo}</span>
                                    <span style="font-size: 0.875rem; color: var(--text-secondary);">${tool.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.showModal(modal);
    }

    toggleTheme() {
        const currentTheme = document.body.dataset.theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.dataset.theme = newTheme;
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.saveUserPreferences();
    }

    showModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    saveUserPreferences() {
        const preferences = {
            theme: document.body.dataset.theme || 'light',
            view: this.currentView,
            selectedTools: Array.from(this.selectedTools),
            category: this.selectedCategory,
            sortBy: this.sortBy
        };
        
        localStorage.setItem('aiToolsPreferences', JSON.stringify(preferences));
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('aiToolsPreferences');
        if (!saved) return;
        
        try {
            const preferences = JSON.parse(saved);
            
            // Apply theme
            if (preferences.theme) {
                document.body.dataset.theme = preferences.theme;
                const icon = document.querySelector('#themeToggle i');
                icon.className = preferences.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Apply view
            if (preferences.view) {
                this.switchView(preferences.view);
            }
            
            // Apply selected tools
            if (preferences.selectedTools) {
                this.selectedTools = new Set(preferences.selectedTools);
            }
            
            // Apply category filter
            if (preferences.category) {
                this.filterByCategory(preferences.category);
            }
            
            // Apply sort
            if (preferences.sortBy) {
                this.sortBy = preferences.sortBy;
                document.getElementById('sortBy').value = preferences.sortBy;
            }
            
        } catch (e) {
            console.error('Error loading preferences:', e);
        }
    }
}

// Initialize the app
const app = new AIToolsApp();

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('SW registered'))
            .catch(() => console.log('SW registration failed'));
    });
}

// Analytics helper (placeholder for Google Analytics or similar)
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Utility functions for external use
window.aiToolsUtils = {
    getToolById: (id) => aiTools.find(tool => tool.id === id),
    getToolsByCategory: (category) => aiTools.filter(tool => tool.category === category),
    searchTools: (query) => aiTools.filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    )
};
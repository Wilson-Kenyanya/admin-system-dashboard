// Global variables
let currentPage = 'dashboard';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    bindEventListeners();
    showPage('dashboard');
});

// Event listeners
function bindEventListeners() {
    // Dashboard dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Add mobile menu functionality here if needed
            console.log('Menu toggle clicked');
        });
    }
    
    // Tab control buttons
    const tabControlBtns = document.querySelectorAll('.tab-control-btn');
    tabControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabControlBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Module cards click to navigate
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const module = this.getAttribute('data-module');
            if (module) {
                showPage(module);
            }
        });
    });
    
    // Settings form handlers
    const settingSelects = document.querySelectorAll('.setting-select');
    settingSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log(`Setting changed: ${this.value}`);
            // Add setting change logic here
        });
    });
    
    // Save settings button
    const saveBtn = document.querySelector('.btn-primary');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveSettings();
        });
    }
    
    // Reset settings button
    const resetBtn = document.querySelector('.btn-secondary');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetSettings();
        });
    }
}

// Show specific page
function showPage(pageName) {
    console.log('Showing page:', pageName);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show requested page
    let targetPage;
    if (pageName === 'dashboard') {
        targetPage = document.getElementById('dashboard-home');
    } else {
        targetPage = document.getElementById(pageName + '-page');
    }
    
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update page title
        updatePageTitle(pageName);
        
        // Initialize page-specific content
        initializePageContent(pageName);
    }
}

// Update page title
function updatePageTitle(pageName) {
    const titles = {
        'dashboard': 'Dashboard Overview',
        'analysis': 'Analysis - Data Analytics',
        'monitor': 'Monitor - System Status',
        'workplace': 'Workplace - Team Management',
        'customize': 'Customize - Settings'
    };
    
    document.title = titles[pageName] || 'NG-ALAIN Pro';
}

// Initialize page-specific content
function initializePageContent(pageName) {
    switch(pageName) {
        case 'analysis':
            updateAnalyticsCharts();
            break;
        case 'monitor':
            updateMonitorCharts();
            startMonitoringUpdates();
            break;
        case 'workplace':
            updateProjectProgress();
            break;
        case 'customize':
            loadUserSettings();
            break;
        default:
            updateDashboardStats();
            break;
    }
}

// Chart initialization and updates
function initializeCharts() {
    // Sales chart
    const salesCanvas = document.getElementById('salesChart');
    if (salesCanvas) {
        drawSalesChart(salesCanvas);
    }
    
    // Monitor charts
    drawMonitorChart('cpuChart', 65, '#4fc3f7');
    drawMonitorChart('memoryChart', 82, '#f093fb');
    drawMonitorChart('diskChart', 32, '#43e97b');
    drawMonitorChart('networkChart', 92, '#667eea');
}

function drawSalesChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [400, 800, 600, 650, 900, 1100, 750, 950, 600, 450, 500, 1050];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    canvas.width = 400;
    canvas.height = 200;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = canvas.width / data.length;
    const maxValue = Math.max(...data);
    
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 40);
        const x = index * barWidth + 10;
        const y = canvas.height - barHeight - 20;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#4fc3f7');
        gradient.addColorStop(1, '#1976d2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 20, barHeight);
        
        // Draw month labels
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(months[index], x + (barWidth - 20) / 2, canvas.height - 5);
    });
}

function drawMonitorChart(canvasId, value, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 50;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate sample data points
    const points = [];
    for (let i = 0; i < 20; i++) {
        points.push(value + (Math.random() - 0.5) * 20);
    }
    
    // Draw line chart
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    points.forEach((point, index) => {
        const x = (index / (points.length - 1)) * canvas.width;
        const y = canvas.height - (point / 100) * canvas.height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Fill area under line
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = color;
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Update functions
function updateDashboardStats() {
    // Animate stats counters
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        animateCounter(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        if (text.includes('¥')) {
            element.textContent = `¥ ${Math.floor(current).toLocaleString()}`;
        } else if (text.includes('%')) {
            element.textContent = `${Math.floor(current)}%`;
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

function updateAnalyticsCharts() {
    const salesCanvas = document.getElementById('salesChart');
    if (salesCanvas) {
        drawSalesChart(salesCanvas);
    }
    
    // Update progress bars with animation
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

function updateMonitorCharts() {
    // Update all monitor charts with new data
    drawMonitorChart('cpuChart', 65 + (Math.random() - 0.5) * 10, '#4fc3f7');
    drawMonitorChart('memoryChart', 82 + (Math.random() - 0.5) * 10, '#f093fb');
    drawMonitorChart('diskChart', 32 + (Math.random() - 0.5) * 5, '#43e97b');
    drawMonitorChart('networkChart', 92 + (Math.random() - 0.5) * 8, '#667eea');
    
    // Update metric values
    updateMetricValues();
}

function updateMetricValues() {
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const currentValue = parseInt(metric.textContent);
        const newValue = currentValue + Math.floor((Math.random() - 0.5) * 10);
        const clampedValue = Math.max(0, Math.min(100, newValue));
        metric.textContent = `${clampedValue}%`;
    });
}

function startMonitoringUpdates() {
    // Update monitoring data every 5 seconds
    if (window.monitorInterval) {
        clearInterval(window.monitorInterval);
    }
    
    window.monitorInterval = setInterval(() => {
        if (currentPage === 'monitor') {
            updateMonitorCharts();
        }
    }, 5000);
}

function updateProjectProgress() {
    const progressBars = document.querySelectorAll('.project-progress .progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Settings functions
function loadUserSettings() {
    // Load user settings from localStorage or API
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    // Apply loaded settings to form elements
    Object.keys(settings).forEach(key => {
        const element = document.querySelector(`[name="${key}"]`);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = settings[key];
            } else {
                element.value = settings[key];
            }
        }
    });
}

function saveSettings() {
    const settings = {};
    const formElements = document.querySelectorAll('.setting-select, input[type="checkbox"]');
    
    formElements.forEach(element => {
        if (element.name) {
            if (element.type === 'checkbox') {
                settings[element.name] = element.checked;
            } else {
                settings[element.value] = element.value;
            }
        }
    });
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Show success message
    showNotification('Settings saved successfully!', 'success');
}

function resetSettings() {
    // Clear localStorage
    localStorage.removeItem('userSettings');
    
    // Reset form to defaults
    const selects = document.querySelectorAll('.setting-select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = checkbox.hasAttribute('checked');
    });
    
    showNotification('Settings reset to default!', 'info');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Clean up intervals when page unloads
window.addEventListener('beforeunload', function() {
    if (window.monitorInterval) {
        clearInterval(window.monitorInterval);
    }
});

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + 1-4 for quick navigation
    if (e.altKey) {
        switch(e.key) {
            case '1':
                showPage('analysis');
                break;
            case '2':
                showPage('monitor');
                break;
            case '3':
                showPage('workplace');
                break;
            case '4':
                showPage('customize');
                break;
        }
    }
});

// Export functions for global access
window.showPage = showPage;
window.updateDashboardStats = updateDashboardStats;
window.updateAnalyticsCharts = updateAnalyticsCharts;
window.updateMonitorCharts = updateMonitorCharts;
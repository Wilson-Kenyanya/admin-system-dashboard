// Dashboard JavaScript for charts and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Bar Chart for Payments
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [{
                data: [30, 45, 35, 55, 40, 65, 50, 75, 60, 45, 70, 55],
                backgroundColor: '#3b82f6',
                borderRadius: 2,
                maxBarThickness: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Circular Gauge for Core Index
    const gaugeCtx = document.getElementById('gaugeChart').getContext('2d');
    const gaugeChart = new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [91, 9],
                backgroundColor: ['#f97316', '#f3f4f6'],
                borderWidth: 0,
                cutout: '70%',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            rotation: -90,
            circumference: 360,
        }
    });

    // Radar Chart for Contribution Index
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Reference', 'Popularity', 'Reputation', 'Production', 'Contribution'],
            datasets: [
                {
                    label: 'Individual',
                    data: [8, 7, 9, 6, 8],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#3b82f6',
                    pointRadius: 3,
                },
                {
                    label: 'Team',
                    data: [6, 8, 7, 9, 5],
                    borderColor: '#eab308',
                    backgroundColor: 'rgba(234, 179, 8, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#eab308',
                    pointBorderColor: '#eab308',
                    pointRadius: 3,
                },
                {
                    label: 'Department',
                    data: [7, 6, 8, 7, 9],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#22c55e',
                    pointBorderColor: '#22c55e',
                    pointRadius: 3,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        color: '#e5e7eb'
                    },
                    angleLines: {
                        color: '#e5e7eb'
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        },
                        color: '#6b7280'
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });

    // Add smooth animations on load
    setTimeout(() => {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '78%';
        }
    }, 500);

    // Add hover effects for activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9fafb';
            this.style.borderRadius = '8px';
            this.style.padding = '8px';
            this.style.margin = '-8px';
            this.style.transition = 'all 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
            this.style.margin = '0';
        });
    });

    // Add hover effects for KPI cards
    const kpiCards = document.querySelectorAll('.kpi-card, .contribution-card, .activity-card');
    kpiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)';
        });
    });
});
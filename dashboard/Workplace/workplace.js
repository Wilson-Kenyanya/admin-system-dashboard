
        // Sidebar Toggle
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
            
            // On mobile, toggle open class instead
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('open');
            }
        }

        // Mobile responsive behavior
        function handleResize() {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
                sidebar.classList.remove('open');
            } else {
                sidebar.classList.remove('open');
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        // Radar Chart
        function initChart() {
            const ctx = document.getElementById('contributionChart').getContext('2d');
            
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Reference', 'Popularity', 'Reputation', 'Production', 'Contribution'],
                    datasets: [{
                        label: 'Individual',
                        data: [34, 28, 35, 30, 32],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#3b82f6',
                        pointRadius: 4
                    }, {
                        label: 'Team',
                        data: [22, 32, 28, 35, 25],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#f59e0b',
                        pointRadius: 4
                    }, {
                        label: 'Department',
                        data: [23, 25, 30, 28, 32],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#10b981',
                        pointRadius: 4
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
                        r: {
                            beginAtZero: true,
                            max: 40,
                            ticks: {
                                stepSize: 10,
                                font: {
                                    size: 10
                                }
                            },
                            pointLabels: {
                                font: {
                                    size: 11
                                }
                            },
                            grid: {
                                color: '#e5e7eb'
                            },
                            angleLines: {
                                color: '#e5e7eb'
                            }
                        }
                    }
                }
            });
        }

        // Initialize chart when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initChart();
        });

        // Add click handlers for interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            // Project card click handlers
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('click', function() {
                    const projectName = this.querySelector('h4').textContent;
                    alert(`Clicked on project: ${projectName}`);
                });
            });

            // Quick action button handlers
            const actionButtons = document.querySelectorAll('.action-btn');
            actionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.textContent.trim();
                    if (action === 'Add') {
                        alert('Add new operation');
                    } else {
                        alert(`Clicked on: ${action}`);
                    }
                });
            });

            // Team item click handlers
            const teamItems = document.querySelectorAll('.team-item');
            teamItems.forEach(item => {
                item.addEventListener('click', function() {
                    const teamName = this.querySelector('.team-name').textContent;
                    alert(`Clicked on team: ${teamName}`);
                });
            });
        });

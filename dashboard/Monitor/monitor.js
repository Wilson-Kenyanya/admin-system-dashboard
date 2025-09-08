// Animated Counter Function
function animateCounter(element, start, end, duration, suffix = '') {
  let startTime = null;
  const range = end - start;
  
  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const currentValue = Math.floor(progress * range + start);
    element.textContent = currentValue.toLocaleString() + suffix;
    element.classList.add('counting');
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => element.classList.remove('counting'), 600);
    }
  }
  
  requestAnimationFrame(animate);
}

// Trading Map Bubbles Animation
class TradingMap {
  constructor() {
    this.container = document.getElementById('bubbles-container');
    this.bubbles = [];
    this.init();
  }
  
  init() {
    this.createInitialBubbles();
    this.startAnimation();
  }
  
  createInitialBubbles() {
    for (let i = 0; i < 25; i++) {
      this.createBubble();
    }
  }
  
  createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const x = Math.random() * (this.container.clientWidth - 20);
    const y = Math.random() * (this.container.clientHeight - 20);
    const size = Math.random() * 15 + 5;
    const opacity = Math.random() * 0.5 + 0.3;
    
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.opacity = opacity;
    
    this.container.appendChild(bubble);
    this.bubbles.push({
      element: bubble,
      x: x,
      y: y,
      size: size,
      opacity: opacity,
      baseOpacity: opacity
    });
  }
  
  startAnimation() {
    setInterval(() => {
      this.bubbles.forEach(bubble => {
        const newOpacity = Math.random() * 0.5 + bubble.baseOpacity;
        const newSize = bubble.size + (Math.random() - 0.5) * 5;
        
        bubble.element.style.opacity = newOpacity;
        bubble.element.style.width = Math.max(5, newSize) + 'px';
        bubble.element.style.height = Math.max(5, newSize) + 'px';
      });
    }, 2000);
  }
}

// Chart Drawing Functions
function drawLineChart(canvas, data) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  ctx.clearRect(0, 0, width, height);
  
  // Set line style
  ctx.strokeStyle = 'hsl(210, 100%, 50%)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Calculate points
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * width,
    y: height - (value / Math.max(...data)) * height
  }));
  
  // Draw line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.stroke();
}

// Circular Progress Animation
function animateCircularProgress(element, percentage) {
  const circle = element.querySelector('.progress-ring-fill');
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (percentage / 100) * circumference;
  
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 100);
}

// Small Circular Progress Animation
function animateSmallCircularProgress(element, percentage) {
  const circle = element.querySelector('.fill-circle');
  const color = circle.getAttribute('data-color');
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (percentage / 100) * circumference;
  
  circle.style.stroke = color;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 100);
}

// Water Fill Animation
function animateWaterFill(percentage) {
  const waterFill = document.getElementById('water-fill');
  const waterPercent = document.getElementById('resource-percent');
  
  // Animate water level
  setTimeout(() => {
    waterFill.style.height = percentage + '%';
  }, 500);
  
  // Animate percentage counter
  animateCounter(waterPercent, 0, percentage, 2000, '%');
}

// Real-time Data Updates
function updateMetrics() {
  const metrics = {
    totalTransactions: Math.floor(Math.random() * 1000000) + 124000000,
    completionRate: Math.floor(Math.random() * 10) + 90,
    tps: Math.floor(Math.random() * 100) + 200
  };
  
  // Update with animation
  animateCounter(document.getElementById('total-transactions'), 124543233, metrics.totalTransactions, 2000, '');
  animateCounter(document.getElementById('completion-rate'), 92, metrics.completionRate, 1500, '%');
  animateCounter(document.getElementById('tps'), 234, metrics.tps, 1000, '');
  animateCounter(document.getElementById('efficiency-value'), 44, Math.floor(Math.random() * 20) + 40, 1500, '%');
}

// Timer for remaining time
function updateTimer() {
  const timerElement = document.getElementById('remaining-time');
  let hours = 2, minutes = 44, seconds = 35, milliseconds = 0;
  
  setInterval(() => {
    milliseconds -= 1;
    if (milliseconds < 0) {
      milliseconds = 9;
      seconds -= 1;
      if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
          if (hours < 0) {
            hours = 0;
            minutes = 0;
            seconds = 0;
            milliseconds = 0;
          }
        }
      }
    }
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
    timerElement.textContent = timeString;
  }, 100);
}

// Food category percentage updates
function updateFoodCategories() {
  const fastfood = Math.floor(Math.random() * 10) + 25;
  const western = Math.floor(Math.random() * 10) + 20;
  const hotpot = Math.floor(Math.random() * 10) + 30;
  
  animateCounter(document.getElementById('fastfood-percent'), 28, fastfood, 2000, '%');
  animateCounter(document.getElementById('western-percent'), 22, western, 2000, '%');
  animateCounter(document.getElementById('hotpot-percent'), 32, hotpot, 2000, '%');
  
  // Update circular progress
  setTimeout(() => {
    const circles = document.querySelectorAll('.circular-progress-small');
    animateSmallCircularProgress(circles[0], fastfood);
    animateSmallCircularProgress(circles[1], western);
    animateSmallCircularProgress(circles[2], hotpot);
  }, 100);
}

// Efficiency counter animation
function updateEfficiency() {
  const efficiency = Math.floor(Math.random() * 20) + 70;
  animateCounter(document.getElementById('circular-efficiency'), 80, efficiency, 2000, '%');
  
  // Update circular progress
  setTimeout(() => {
    const circularProgress = document.querySelector('.circular-progress');
    animateCircularProgress(circularProgress, efficiency);
  }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize trading map
  new TradingMap();
  
  // Draw initial charts
  const headerChart = document.getElementById('header-chart');
  const efficiencyChart = document.getElementById('efficiency-chart');
  
  const chartData = [1200, 800, 1800, 2400, 2100, 2800, 2950];
  drawLineChart(headerChart, chartData);
  drawLineChart(efficiencyChart, [800, 1200, 900, 1600, 1400, 1800]);
  
  // Initialize circular progress
  setTimeout(() => {
    const circularProgress = document.querySelector('.circular-progress');
    animateCircularProgress(circularProgress, 80);
    
    // Initialize small circular progress
    const smallCircles = document.querySelectorAll('.circular-progress-small');
    animateSmallCircularProgress(smallCircles[0], 28);
    animateSmallCircularProgress(smallCircles[1], 22);
    animateSmallCircularProgress(smallCircles[2], 32);
  }, 500);
  
  // Initialize water animation
  animateWaterFill(34);
  
  // Start timer
  updateTimer();
  
  // Set up periodic updates
  setInterval(updateMetrics, 5000);
  setInterval(updateFoodCategories, 8000);
  setInterval(updateEfficiency, 6000);
  
  // Redraw charts periodically with new data
  setInterval(() => {
    const newData = Array.from({length: 7}, () => Math.floor(Math.random() * 2000) + 1000);
    drawLineChart(headerChart, newData);
    drawLineChart(efficiencyChart, newData.slice(0, 6));
  }, 10000);
  
  // Add word cloud hover effects
  const words = document.querySelectorAll('.word');
  words.forEach(word => {
    word.addEventListener('mouseenter', () => {
      word.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });
    
    word.addEventListener('mouseleave', () => {
      word.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
});
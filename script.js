window.onload = function () {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
  
    // Set canvas dimensions to match the window size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    // Call resizeCanvas on window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial canvas size
  
    // Array to store floating circles
    let floatingCircles = [];
  
    // Circle class to create floating bubbles
    class Circle {
      constructor() {
        this.x = Math.random() * canvas.width; // Random horizontal position
        this.y = canvas.height + Math.random() * 100; // Start off-screen (below canvas)
        this.size = Math.random() * 50 + 10; // Random size
        this.speedY = Math.random() * 2 + 1; // Random upward speed
        this.opacity = Math.random() * 0.5 + 0.2; // Random opacity
      }
  
      // Update the position and fade the circle
      update() {
        this.y -= this.speedY; // Move upwards
        if (this.opacity > 0) {
          this.opacity -= 0.005; // Gradually fade out
        }
        if (this.y < -this.size || this.opacity <= 0) {
          // Reset the circle when it goes off-screen or is fully faded
          this.reset();
        }
      }
  
      // Draw the circle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111, 191, 115, ${this.opacity})`; // Green color with opacity
        ctx.fill();
      }
  
      // Reset the circle position and properties
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 50 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
    }
  
    // Create multiple floating circles
    function createCircles() {
      floatingCircles = [];
      for (let i = 0; i < 100; i++) {
        floatingCircles.push(new Circle());
      }
    }
  
    // Animate the floating circles
    function animateCircles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      floatingCircles.forEach((circle) => {
        circle.update();
        circle.draw();
      });
      requestAnimationFrame(animateCircles); // Loop the animation
    }
  
    // Initialize circles and animation
    createCircles();
    animateCircles();
  };
  
const canvas = document.getElementById("sunsetCanvas");
const ctx = canvas.getContext("2d");

// Colors and gradients for day and night
let isDay = true;
let sunY = 0; // Initial position of the sun
let sunColor = "#FF4500"; // Sunset sun color
let moonColor = "#ffffff"; // Nighttime moon color
let stars = [];
let skyGradient; // Declare skyGradient here

// Function to resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Regenerate the sky gradient with new dimensions
    skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, isDay ? "#87CEEB" : "#FFD700"); // Daytime sky blue or sunrise
    skyGradient.addColorStop(1, isDay ? "#000033" : "#FF6347"); // Nighttime dark blue or sunset
}

// Call the resize function on window resize
window.addEventListener('resize', resizeCanvas);

// Set initial size
resizeCanvas();

// Initial position of the sun
sunY = canvas.height - 150; // Adjust this to start the sun at a visible position

// Generate random stars
function generateStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({ x, y });
    }
}

// Animation function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars for night
    if (!isDay) {
        ctx.fillStyle = "#FFFFFF";
        stars.forEach((star) => {
            ctx.fillRect(star.x, star.y, 2, 2);
        });
    }

    // Sun or Moon
    ctx.beginPath();
    ctx.arc(canvas.width / 2, sunY, 100, 0, Math.PI * 2);
    ctx.fillStyle = isDay ? sunColor : moonColor;
    ctx.fill();
    ctx.closePath();

    // Animate the sun (move it up and down)
    if (isDay) {
        sunY -= 1;
        if (sunY < -100) {
            sunY = canvas.height + 100;
            generateStars(); // Generate stars at night
        }
    } else {
        sunY += 1;
        if (sunY > canvas.height + 100) {
            sunY = -100;
        }
    }

    requestAnimationFrame(animate);
}

// Toggle day and night modes on click
canvas.addEventListener("click", () => {
    isDay = !isDay;
    resizeCanvas(); // Resize canvas to update gradient
    if (isDay) {
        generateStars(); // Regenerate stars only if it becomes day
    }
});

// Generate stars initially
generateStars();

// Start animation
animate();

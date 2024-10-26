const canvas = document.getElementById("sunsetCanvas");
const ctx = canvas.getContext("2d");

// Function to resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Regenerate the sky gradient with new dimensions
    skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, "#87CEEB"); // Daytime sky blue
    skyGradient.addColorStop(1, "#000033"); // Nighttime dark blue
}

// Call the resize function on window resize
window.addEventListener('resize', resizeCanvas);

// Set initial size
resizeCanvas();

// Colors and gradients for day and night
let isDay = true;
let sunY = canvas.height - 150; // Initial position of the sun
let skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
skyGradient.addColorStop(0, "#87CEEB"); // Daytime sky blue
skyGradient.addColorStop(1, "#000033"); // Nighttime dark blue
let sunColor = "#FF4500"; // Sunset sun color
let moonColor = "#ffffff"; // Nighttime moon color
let stars = [];

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
    if (isDay) {
        skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, "#87CEEB"); // Daytime sky blue
        skyGradient.addColorStop(1, "#000033"); // Nighttime dark blue
    } else {
        skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, "#FFD700"); // Sunrise sky color
        skyGradient.addColorStop(1, "#FF6347"); // Sunset sky color
        generateStars(); // Generate stars at night
    }
});

// Generate stars initially
generateStars();

// Start animation
animate();

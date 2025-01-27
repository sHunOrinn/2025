const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


let fireworks = [];
let particles = [];
//class vẽ đường bay lên của pháo hoa
class Firework {
    constructor(x, y, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        // this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        this.color = color;
        this.speed = 4;
        this.done = false;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.color})`;
        ctx.fill();
    }
    update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.done = true;
            explode(this.x, this.y, this.color);
        }
    }
}
//class các hạt sau khi pháo hoa nổ
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        // this.color = this.generateRandomColor(baseColor);
        this.color = color
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 100;
    }
    // generateRandomColor(baseColor) {
    //     // Tăng giảm độ sáng của màu gốc để tạo màu sắc phong phú
    //     const baseRGB = baseColor.match(/\d+/g).map(Number);
    //     const offset = 50; // Độ lệch màu
    //     const r = Math.min(255, Math.max(0, baseRGB[0] + Math.random() * offset - offset / 2));
    //     const g = Math.min(255, Math.max(0, baseRGB[1] + Math.random() * offset - offset / 2));
    //     const b = Math.min(255, Math.max(0, baseRGB[2] + Math.random() * offset - offset / 2));
    //     return `rgba(${r}, ${g}, ${b}, ${this.life / 100})`;
    // }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.life / 100})`;
        ctx.fill();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 1; // Hạt dần biến mất
    }
}
//tạo pháo hoa mới
function createFirework() {
    const x = Math.random() * canvas.width;
    const targetY = Math.random() * canvas.height;
    const color = `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
    fireworks.push(new Firework(x, canvas.height, targetY, color));
}
//tạo các hạt cho pháo hoa
function explode(x, y, color) {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
    }
}
//vẽ hoạt ảnh 
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Hiệu ứng mờ dần
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearReact(0, 0, canvas.width, canvas.height);

    fireworks = fireworks.filter(firework => !firework.done);
    particles = particles.filter(particle => particle.life > 0);

    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}
//gọi hoạt ảnh bắt đầu
setInterval(createFirework, 400); // Tạo pháo hoa mỗi ms
animate();

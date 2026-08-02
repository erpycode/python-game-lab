/* ============================================
   🐍 پایتون‌باز — صدا و افکت‌ها (Web Audio API)
   ============================================ */

// ساخت صدا با Web Audio API
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // صدای جواب درست 🎉
    playCorrect() {
        if (!this.enabled) return;
        this.init();
        this.playTone(523.25, 0.15, 'sine');   // C5
        setTimeout(() => this.playTone(659.25, 0.15, 'sine'), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.2, 'sine'), 200);  // G5
    }

    // صدای جواب اشتباه ❌
    playWrong() {
        if (!this.enabled) return;
        this.init();
        this.playTone(200, 0.3, 'sawtooth');
        setTimeout(() => this.playTone(150, 0.4, 'sawtooth'), 150);
    }

    // صدای کلیک
    playClick() {
        if (!this.enabled) return;
        this.init();
        this.playTone(800, 0.05, 'sine');
    }

    // صدای تکمیل فصل 🏆
    playComplete() {
        if (!this.enabled) return;
        this.init();
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.15, 'sine'), i * 80);
        });
    }

    // صدای شروع بازی 🎮
    playStart() {
        if (!this.enabled) return;
        this.init();
        this.playTone(440, 0.1, 'sine');
        setTimeout(() => this.playTone(554.37, 0.1, 'sine'), 100);
        setTimeout(() => this.playTone(659.25, 0.15, 'sine'), 200);
    }

    // صدای باز شدن فصل 📖
    playOpen() {
        if (!this.enabled) return;
        this.init();
        this.playTone(600, 0.08, 'triangle');
        setTimeout(() => this.playTone(800, 0.1, 'triangle'), 80);
    }

    // صدای راهنمایی 💡
    playHint() {
        if (!this.enabled) return;
        this.init();
        this.playTone(440, 0.1, 'triangle');
        setTimeout(() => this.playTone(554.37, 0.1, 'triangle'), 100);
    }

    // تولید لحن
    playTone(frequency, duration, type = 'sine') {
        if (!this.ctx) return;
        const oscillator = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        oscillator.start(this.ctx.currentTime);
        oscillator.stop(this.ctx.currentTime + duration);
    }

    // تغییر وضعیت صدا
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// ساخت اینستنس سراسری
const soundManager = new SoundManager();

// ============================================
// افکت‌های بصری پیشرفته
// ============================================

// افکت ذرات هنگام جواب درست
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#00D4AA', '#22C55E', '#3B82F6', '#8B5CF6', '#F59E0B'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0, 0.9, 0.57, 1)'
        }).onfinish = () => particle.remove();
    }
}

// افکت لرزش هنگام جواب اشتباه
function shakeElement(element) {
    element.style.animation = 'none';
    element.offsetHeight; // trigger reflow
    element.style.animation = 'shake 0.5s ease';
}

// افکت glow روی المان
function glowElement(element, color = '#00D4AA') {
    element.style.boxShadow = `0 0 20px ${color}40, 0 0 40px ${color}20`;
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 1000);
}

// افکت typewriter
function typeWriter(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// افکت count up برای اعداد
function countUp(element, target, duration = 1000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.round(start + (target - start) * eased);
        element.textContent = toPersianNum(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

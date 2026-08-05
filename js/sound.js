/* ============================================
   🐍 پایتون‌باز آرکید — صدا (Web Audio)
   ============================================ */

PB.sound = (() => {
    let ctx = null;
    let enabled = true;

    function ensureCtx() {
        if (!ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            ctx = new AC();
        }
        if (ctx.state === "suspended") ctx.resume();
        return ctx;
    }

    function playTone(freq, duration = 0.12, type = "sine", vol = 0.22, when = 0) {
        if (!enabled) return;
        const ac = ensureCtx();
        if (!ac) return;

        const t = ac.currentTime + when;
        const osc = ac.createOscillator();
        const gain = ac.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(t);
        osc.stop(t + duration + 0.02);
    }

    function setEnabled(value) {
        enabled = value;
        PB.store.update((s) => {
            s.settings.sound = value;
        });
    }

    function isEnabled() {
        return enabled;
    }

    function init() {
        enabled = PB.store.get().settings.sound !== false;
    }

    // افکت‌ها
    const sounds = {
        click() { playTone(880, 0.05, "sine", 0.12); },
        correct() {
            playTone(523.25, 0.1, "sine", 0.2);
            playTone(659.25, 0.1, "sine", 0.2, 0.1);
            playTone(783.99, 0.16, "sine", 0.22, 0.2);
        },
        wrong() {
            playTone(220, 0.18, "sawtooth", 0.14);
            playTone(165, 0.22, "sawtooth", 0.12, 0.14);
        },
        levelup() {
            const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
            notes.forEach((f, i) => playTone(f, 0.14, "triangle", 0.2, i * 0.09));
        },
        complete() {
            const notes = [392, 440, 493.88, 523.25, 587.33, 659.25, 783.99, 1046.5];
            notes.forEach((f, i) => playTone(f, 0.16, "triangle", 0.2, i * 0.08));
        },
        start() {
            playTone(440, 0.12, "sine", 0.2);
            playTone(554.37, 0.12, "sine", 0.2, 0.1);
            playTone(659.25, 0.2, "sine", 0.22, 0.2);
        },
        open() {
            playTone(659.25, 0.09, "triangle", 0.18);
            playTone(987.77, 0.14, "triangle", 0.16, 0.07);
        },
        hint() {
            playTone(587.33, 0.1, "triangle", 0.15);
            playTone(739.99, 0.12, "triangle", 0.13, 0.09);
        },
        error() {
            playTone(110, 0.3, "sawtooth", 0.16);
        },
        coin() {
            playTone(1318.5, 0.07, "square", 0.1);
            playTone(1760, 0.12, "square", 0.1, 0.06);
        },
        streak() {
            playTone(659.25, 0.09, "square", 0.14);
            playTone(880, 0.09, "square", 0.14, 0.08);
            playTone(1318.5, 0.18, "square", 0.16, 0.16);
        },
    };

    return { ...sounds, setEnabled, isEnabled, init, unlock() { ensureCtx(); } };
})();

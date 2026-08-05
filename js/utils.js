/* ============================================
   🐍 پایتون‌باز آرکید — توابع کمکی
   ============================================ */

window.PB = window.PB || {};

PB.utils = (() => {
    const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

    function toFa(num) {
        return String(num).replace(/[0-9]/g, (d) => FA_DIGITS[d]);
    }

    function toEn(str) {
        return String(str).replace(/[۰-۹]/g, (d) => FA_DIGITS.indexOf(d));
    }

    function formatNumber(num) {
        return toFa(Math.round(num).toLocaleString("en-US"));
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // ساخت المان
    function el(tag, attrs = {}, children = []) {
        const node = document.createElement(tag);
        for (const [key, value] of Object.entries(attrs)) {
            if (key === "class") node.className = value;
            else if (key === "html") node.innerHTML = value;
            else if (key === "text") node.textContent = value;
            else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
            else if (key === "dataset") Object.assign(node.dataset, value);
            else node.setAttribute(key, value);
        }
        if (typeof children === "string") {
            // اگه text/html توی attrs داده شده، children نباید روش رو بازنویسی کنه
            if (attrs.text === undefined && attrs.html === undefined) {
                node.textContent = children;
            }
        } else {
            children.forEach((c) => node.append(c));
        }
        return node;
    }

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function clamp(num, min, max) {
        return Math.min(max, Math.max(min, num));
    }

    // نرمال‌سازی جواب
    // فقط کوتیشن‌های بیرونی matching حذف می‌شن؛ کوتیشن‌های داخلی (مثل '1' داخل لیست) باید بمونن
    function normalizeAnswer(answer) {
        let s = String(answer)
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
        const first = s[0];
        if ((first === "'" && s.endsWith("'")) || (first === '"' && s.endsWith('"'))) {
            s = s.slice(1, -1);
        }
        return s;
    }

    // فاصله لونشتاین — تعداد حداقل عملیات (درج/حذف/جایگزینی) برای تبدیل a به b
    function levenshtein(a, b) {
        const m = a.length;
        const n = b.length;
        if (m === 0) return n;
        if (n === 0) return m;
        let prev = new Array(n + 1);
        let curr = new Array(n + 1);
        for (let j = 0; j <= n; j++) prev[j] = j;
        for (let i = 1; i <= m; i++) {
            curr[0] = i;
            for (let j = 1; j <= n; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                curr[j] = Math.min(
                    prev[j] + 1,         // حذف
                    curr[j - 1] + 1,     // درج
                    prev[j - 1] + cost   // جایگزینی
                );
            }
            [prev, curr] = [curr, prev];
        }
        return prev[n];
    }

    // شباهت دو رشته (بر اساس فاصله لونشتاین)
    function isSimilar(str1, str2, threshold = 0.85) {
        if (!str1 || !str2) return false;
        const s1 = String(str1);
        const s2 = String(str2);
        const maxLen = Math.max(s1.length, s2.length);
        if (maxLen === 0) return true;
        const distance = levenshtein(s1, s2);
        return 1 - distance / maxLen >= threshold;
    }

    // هایلایت پایتون — token ها روی متن خام پیدا می‌شن، بعد escape
    // رویکرد: با یک regex ترکیبی همه token ها رو match کن، هر کدوم رو escape کن،
    // و بینشون رو بدون دست‌زدن به HTML escape کن.
    function highlightPython(code) {
        const KEYWORDS = "def|class|if|elif|else|for|while|return|import|from|as|with|try|except|finally|raise|pass|break|continue|lambda|yield|global|nonlocal|and|or|not|in|is|None|True|False";
        // الگوی ترکیبی: کامنت، رشته (تک/دو کوتیشن)، کلیدواژه، عدد، تابع
        const pattern = new RegExp(
            `(#[^\n]*)|('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")|\\b(${KEYWORDS})\\b|(\\b\\d+\\.?\\d*\\b)|([a-zA-Z_][a-zA-Z0-9_]*)(?=\\()`,
            "g"
        );

        return code.replace(pattern, (match, comment, str, kw, num, fn) => {
            let cls = null;
            if (comment) cls = "cmt";
            else if (str) cls = "str";
            else if (kw) cls = "kw";
            else if (num) cls = "num";
            else if (fn) cls = "fn";
            const escapedMatch = escapeHtml(match);
            return cls ? `<span class="${cls}">${escapedMatch}</span>` : escapedMatch;
        });
    }

    function renderCode(code) {
        return `<div class="code-block"><pre>${highlightPython(code)}</pre></div>`;
    }

    function renderOutput(output) {
        return `<div class="terminal-output">${escapeHtml(output)}</div>`;
    }

    // توست
    function toast(message, type = "info", duration = 2600) {
        const root = document.getElementById("toast-root");
        if (!root) return;
        const node = el("div", { class: `toast toast-${type}`, text: message });
        root.appendChild(node);
        setTimeout(() => {
            node.classList.add("toast-exit");
            setTimeout(() => node.remove(), 300);
        }, duration);
    }

    // لودر
    function showLoading(text = "بارگذاری...") {
        const existing = document.querySelector(".loader-overlay");
        if (existing) existing.remove();
        const overlay = el("div", { class: "loader-overlay" }, [
            el("div", { class: "loader-text", text }),
            el("div", { class: "loader-bar" }, [el("div", { class: "loader-bar-fill" })]),
        ]);
        document.body.appendChild(overlay);
    }

    function hideLoading() {
        document.querySelectorAll(".loader-overlay").forEach((n) => n.remove());
    }

    // کانفتی روی کانواس
    function showConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["#ffd43b", "#22c55e", "#a855f7", "#ff4d8d", "#38bdf8"];
        const pieces = Array.from({ length: 140 }, () => ({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height * 0.4,
            w: 6 + Math.random() * 8,
            h: 8 + Math.random() * 10,
            vx: (Math.random() - 0.5) * 3,
            vy: 2 + Math.random() * 4,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        let frames = 0;
        function tick() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach((p) => {
                p.x += p.vx + Math.sin(frames * 0.05 + p.rot) * 0.8;
                p.y += p.vy;
                p.rot += p.vr;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            frames++;
            if (frames < 240) requestAnimationFrame(tick);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        tick();
    }

    return {
        toFa,
        toEn,
        formatNumber,
        escapeHtml,
        el,
        shuffleArray,
        randomBetween,
        clamp,
        normalizeAnswer,
        isSimilar,
        highlightPython,
        renderCode,
        renderOutput,
        toast,
        showLoading,
        hideLoading,
        showConfetti,
    };
})();

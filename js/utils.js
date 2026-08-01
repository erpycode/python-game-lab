/* ============================================
   🐍 پایتون‌باز — توابع کمکی
   ============================================ */

// تبدیل عدد به فارسی
function toPersianNum(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, d => persianDigits[d]);
}

// تبدیل عدد با جداکننده
function formatNumber(num) {
    return toPersianNum(num.toLocaleString('fa-IR'));
}

// شماره فصل فارسی
function chapterName(num) {
    const names = {
        1: 'فصل ۱: متغیرها',
        2: 'فصل ۲: عملگرها',
        3: 'فصل ۳: شرط‌ها',
        4: 'فصل ۴: حلقه‌ها',
        5: 'فصل ۵: توابع'
    };
    return names[num] || `فصل ${toPersianNum(num)}`;
}

// آیکون سطح
function levelIcon(level) {
    const icons = {
        beginner: '📗',
        intermediate: '📘',
        advanced: '📕'
    };
    return icons[level] || '📗';
}

// نام سطح فارسی
function levelName(level) {
    const names = {
        beginner: 'مبتدی',
        intermediate: 'متوسط',
        advanced: 'پیشرفته'
    };
    return names[level] || 'مبتدی';
}

// نوع چالش
function challengeTypeName(type) {
    const names = {
        predict: '🔮 پیش‌بینی',
        bug_hunter: '🐛 شکارچی باگ',
        fill_gap: '✏️ جای خالی',
        quiz: '📝 چندگزینه‌ای',
        sort: '🔀 مرتب کردن'
    };
    return names[type] || type;
}

// کلاس badge نوع چالش
function challengeBadgeClass(type) {
    const classes = {
        predict: 'badge-predict',
        bug_hunter: 'badge-bug',
        fill_gap: 'badge-fill',
        quiz: 'badge-quiz',
        sort: 'badge-sort'
    };
    return classes[type] || 'badge-predict';
}

// هایلایت کد پایتون (توکن‌محور — بدون باگ)
function highlightPython(code) {
    const keywords = new Set([
        'if', 'else', 'elif', 'for', 'while', 'def', 'return', 'import',
        'from', 'class', 'try', 'except', 'finally', 'with', 'as',
        'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is',
        'break', 'continue', 'pass', 'lambda', 'yield', 'global',
        'print', 'range', 'len', 'input', 'type', 'int', 'float',
        'str', 'bool', 'list', 'dict', 'set', 'tuple'
    ]);
    const builtins = new Set([
        'print', 'range', 'len', 'input', 'type', 'int', 'float',
        'str', 'bool', 'list', 'dict', 'set', 'tuple', 'abs',
        'max', 'min', 'sum', 'round', 'sorted', 'reversed',
        'enumerate', 'zip', 'map', 'filter', 'open', 'isinstance'
    ]);

    let result = '';
    let i = 0;
    const lines = code.split('\n');

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];
        i = 0;
        let lineResult = '';

        while (i < line.length) {
            // کامنت
            if (line[i] === '#') {
                lineResult += `<span class="comment">${escapeHtml(line.slice(i))}</span>`;
                i = line.length;
                continue;
            }

            // رشته (تک یا دوتایی)
            if (line[i] === '"' || line[i] === "'") {
                const quote = line[i];
                let j = i + 1;
                while (j < line.length && line[j] !== quote) {
                    if (line[j] === '\\') j++;
                    j++;
                }
                j++; // علامت نقل قول پایانی
                const str = line.slice(i, j);
                lineResult += `<span class="string">${escapeHtml(str)}</span>`;
                i = j;
                continue;
            }

            // عدد
            if (/\d/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>!:[\]]/.test(line[i-1]))) {
                let j = i;
                while (j < line.length && /[\d.]/.test(line[j])) j++;
                lineResult += `<span class="number">${line.slice(i, j)}</span>`;
                i = j;
                continue;
            }

            // کلمه (identifier / keyword)
            if (/[a-zA-Z_]/.test(line[i])) {
                let j = i;
                while (j < line.length && /\w/.test(line[j])) j++;
                const word = line.slice(i, j);

                // چک کن بعدش ( باشه — یعنی تابع
                const isFunc = j < line.length && line[j] === '(';

                if (keywords.has(word)) {
                    lineResult += `<span class="keyword">${word}</span>`;
                } else if (isFunc && builtins.has(word)) {
                    lineResult += `<span class="function">${word}</span>`;
                } else {
                    lineResult += word;
                }
                i = j;
                continue;
            }

            // کاراکتر عادی
            lineResult += escapeHtml(line[i]);
            i++;
        }

        if (lineIdx > 0) result += '\n';
        result += lineResult;
    }

    return result;
}

// رندر کد با هایلایت
function renderCode(code) {
    return `<div class="code-block"><pre>${highlightPython(code)}</pre></div>`;
}

// رندر کد خروجی
function renderOutput(text) {
    return `<div class="code-block" style="border-color: rgba(126, 231, 135, 0.2);"><pre><span class="output">${escapeHtml(text)}</span></pre></div>`;
}

// اسکیپ HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// مخلوط کردن آرایه (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// تولید عدد تصادفی در بازه
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// نمایش Confetti
function showConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#00d4aa', '#ff6b6b', '#51cf66', '#ffd43b', '#9775fa', '#4dabf7', '#ff922b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// نمایش toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--accent)';
    toast.style.color = type === 'success' || type === 'error' ? 'white' : 'var(--bg-primary)';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2800);
}

// نمایش loading
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 15, 35, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;
    loader.innerHTML = '<div style="font-size: 3rem; animation: bounce 1s ease infinite;">🐍</div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.remove();
}

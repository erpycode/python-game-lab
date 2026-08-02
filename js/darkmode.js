/* ============================================
   🐍 پایتون‌باز — مدیریت تم تاریک/روشن
   ============================================ */

const THEME_KEY = 'pythonGameTheme';

// راه‌اندازی اولیه تم
function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
}

// اعمال تم روی صفحه
function applyTheme(theme) {
    const root = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    
    if (theme === 'light') {
        root.style.setProperty('--bg-primary', '#F8F9FA');
        root.style.setProperty('--bg-secondary', '#FFFFFF');
        root.style.setProperty('--bg-card', '#FFFFFF');
        root.style.setProperty('--bg-card-hover', '#F1F3F5');
        root.style.setProperty('--text-primary', '#1A1A2E');
        root.style.setProperty('--text-secondary', '#495057');
        root.style.setProperty('--text-muted', '#868E96');
        if (btn) btn.textContent = '☀️';
    } else {
        root.style.setProperty('--bg-primary', '#0A0A1A');
        root.style.setProperty('--bg-secondary', '#12122A');
        root.style.setProperty('--bg-card', '#1A1A35');
        root.style.setProperty('--bg-card-hover', '#1F1F40');
        root.style.setProperty('--text-primary', '#E8E8F0');
        root.style.setProperty('--text-secondary', '#9CA3AF');
        root.style.setProperty('--text-muted', '#6B7280');
        if (btn) btn.textContent = '🌙';
    }
    
    localStorage.setItem(THEME_KEY, theme);
}

// تغییر تم
function toggleDarkMode() {
    const current = localStorage.getItem(THEME_KEY) || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(next === 'dark' ? 'حالت تاریک 🌙' : 'حالت روشن ☀️', 'info');
}

// راه‌اندازی در بارگذاری صفحه
document.addEventListener('DOMContentLoaded', initTheme);

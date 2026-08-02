/* ============================================
   🐍 پایتون‌باز — لاجیک اصلی
   ============================================ */

// ============================================
// تنظیمات صدا
// ============================================
function toggleSound() {
    const enabled = soundManager.toggle();
    const btn = document.getElementById('sound-toggle');
    if (btn) {
        btn.textContent = enabled ? '🔊' : '🔇';
        btn.title = enabled ? 'خاموش کردن صدا' : 'روشن کردن صدا';
    }
    showToast(enabled ? 'صدا روشن شد 🔊' : 'صدا خاموش شد 🔇', 'info');
}

// ============================================
// شروع بازی
// ============================================
function startGame() {
    const input = document.getElementById('username-input');
    const username = input.value.trim();
    
    if (!username) {
        showToast('اسمت رو بنویس! 🤔', 'error');
        input.focus();
        return;
    }
    
    if (username.length < 2) {
        showToast('اسم حداقل ۲ حرف باشه! 😊', 'error');
        input.focus();
        return;
    }
    
    // ذخیره و شروع
    startNewGame(username);
    showToast(`خوش اومدی ${username}! 🐍`, 'success');
    showConfetti();
    soundManager.playStart();
    
    // رفتن به صفحه فصل‌ها
    setTimeout(() => {
        showPage('page-chapters');
    }, 500);
}

// ============================================
// تکمیل فصل
// ============================================
function completeChapter() {
    if (!currentChapter) return;
    
    // محاسبه امتیاز نهایی
    const totalChallenges = currentChapter.challenges.length;
    const solvedChallenges = challengeResults.filter(r => r === true).length;
    const totalExercises = currentChapter.exercises.length;
    const solvedExercises = exerciseResults.filter(r => r === true).length;
    
    const totalItems = totalChallenges + totalExercises;
    const solvedItems = solvedChallenges + solvedExercises;
    const accuracy = totalItems > 0 ? Math.round((solvedItems / totalItems) * 100) : 0;
    
    // ذخیره پیشرفت
    const chapterNum = parseInt(currentChapter.id);
    const progress = completeChapterProgress(chapterNum, chapterScore, chapterXP);
    
    // نمایش نتیجه
    showChapterResult(chapterScore, chapterXP, accuracy);
    
    // آپدیت XP هدر
    document.getElementById('header-xp').textContent = formatNumber(progress.totalXP);
}

// ============================================
// تکرار فصل
// ============================================
function retryChapter() {
    if (currentChapter) {
        openChapter(parseInt(currentChapter.id));
    } else {
        showPage('page-chapters');
    }
}

// ============================================
// رویداد کیبورد
// ============================================
document.addEventListener('keydown', (e) => {
    // Enter در صفحه اصلی
    if (e.key === 'Enter' && document.getElementById('page-home').classList.contains('active')) {
        const startBox = document.getElementById('start-box');
        if (!startBox.classList.contains('hidden')) {
            startGame();
        }
    }
});

// ============================================
// راه‌اندازی اولیه
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐍 پایتون‌باز بارگذاری شد!');
    
    // بررسی پیشرفت قبلی
    if (hasProgress()) {
        const progress = getProgress();
        console.log(`خوش اومدی ${progress.username}!`);
        console.log(`پیشرفت: فصل ${progress.currentChapter}, ${progress.totalXP} XP`);
    }
    
    // نمایش صفحه اصلی
    updateHomePage();

    // چک کردن دستاورد‌ها
    if (typeof checkAchievements === 'function') {
        checkAchievements();
    }
});

// ============================================
// ریست پیشرفت
// ============================================
function confirmReset() {
    if (confirm('آیا مطمئنی همه پیشرفتت رو پاک کنی؟ 🗑️')) {
        resetProgress();
        showToast('پیشرفت پاک شد! 🗑️', 'info');
        updateHomePage();
        showPage('page-home');
    }
}

// ============================================
// مدال پیشرفت
// ============================================
function showProgressModal() {
    const modal = document.getElementById('progress-modal');
    const body = document.getElementById('progress-modal-body');
    if (!modal || !body) return;

    const progress = getProgress();
    const totalChapters = 23;
    const completed = progress.completedChapters.length;
    const percent = Math.round((completed / totalChapters) * 100);

    const levels = [
        { key: 'beginner', title: '📗 مبتدی', chapters: [1, 2] },
        { key: 'intermediate', title: '📘 متوسط', chapters: [3, 4, 5, 10] },
        { key: 'advanced', title: '📕 پیشرفته', chapters: [6, 7, 8, 9, 18, 19] },
        { key: 'expert', title: '🎓 حرفه‌ای', chapters: [11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23] }
    ];

    let html = `
        <div class="progress-stat-card">
            <div class="progress-stat">
                <div class="progress-stat-value">${toPersianNum(completed)}</div>
                <div class="progress-stat-label">فصل تموم شده</div>
            </div>
            <div class="progress-stat">
                <div class="progress-stat-value">${toPersianNum(progress.totalXP)}</div>
                <div class="progress-stat-label">XP کل</div>
            </div>
            <div class="progress-stat">
                <div class="progress-stat-value">${toPersianNum(percent)}٪</div>
                <div class="progress-stat-label">پیشرفت</div>
            </div>
        </div>
        <div class="overall-progress" style="margin-bottom: 20px;">
            <div class="overall-progress-bar">
                <div class="overall-progress-fill" style="width: ${percent}%"></div>
            </div>
        </div>
    `;

    levels.forEach(level => {
        html += `<div class="progress-level-section">`;
        html += `<div class="progress-level-title">${level.title}</div>`;
        html += `<div class="progress-chapters-list">`;
        level.chapters.forEach(ch => {
            const done = progress.completedChapters.includes(ch);
            const isCurrent = ch === progress.currentChapter;
            const cls = done ? 'done' : isCurrent ? 'current' : '';
            html += `<span class="progress-chip ${cls}">${toPersianNum(ch)}</span>`;
        });
        html += `</div></div>`;
    });

    // Achievements
    const achievements = typeof loadAchievements === 'function' ? loadAchievements() : [];
    if (typeof ACHIEVEMENTS !== 'undefined') {
        html += `<div class="progress-level-section"><div class="progress-level-title">🏅 دستاورد‌ها</div><div class="progress-chapters-list">`;
        ACHIEVEMENTS.forEach(ach => {
            const unlocked = achievements.includes(ach.id);
            html += `<span class="progress-chip ${unlocked ? 'done' : ''}" title="${ach.desc}">${ach.title}</span>`;
        });
        html += `</div></div>`;
    }

    body.innerHTML = html;
    modal.classList.remove('hidden');
}

function closeProgressModal() {
    const modal = document.getElementById('progress-modal');
    if (modal) modal.classList.add('hidden');
}

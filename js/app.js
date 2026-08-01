/* ============================================
   🐍 پایتون‌باز — لاجیک اصلی
   ============================================ */

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
});

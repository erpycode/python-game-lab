/* ============================================
   🐍 پایتون‌باز — تایمر چالش
   ============================================ */

let challengeTimer = null;
let challengeTimeLeft = 0;
let challengeTimeLimit = 120; // پیش‌فرض ۲ دقیقه

// شروع تایمر
function startChallengeTimer(timeLimit) {
    stopChallengeTimer();
    challengeTimeLimit = timeLimit || 120;
    challengeTimeLeft = challengeTimeLimit;
    updateTimerDisplay();
    
    challengeTimer = setInterval(() => {
        challengeTimeLeft--;
        updateTimerDisplay();
        
        if (challengeTimeLeft <= 0) {
            stopChallengeTimer();
            showToast('⏰ زمان تموم شد!', 'error');
        }
    }, 1000);
}

// توقف تایمر
function stopChallengeTimer() {
    if (challengeTimer) {
        clearInterval(challengeTimer);
        challengeTimer = null;
    }
}

// آپدیت نمایش تایمر
function updateTimerDisplay() {
    const badge = document.getElementById('challenge-timer');
    if (!badge) return;
    
    const mins = Math.floor(challengeTimeLeft / 60);
    const secs = challengeTimeLeft % 60;
    badge.textContent = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;
    
    // تغییر رنگ بر اساس زمان باقی‌مانده
    badge.className = 'timer-badge';
    if (challengeTimeLeft <= 10) {
        badge.classList.add('danger');
    } else if (challengeTimeLeft <= 30) {
        badge.classList.add('warning');
    }
}

// گرفتن زمان باقی‌مانده
function getTimeLeft() {
    return challengeTimeLeft;
}

// بررسی فعال بودن تایمر
function isTimerRunning() {
    return challengeTimer !== null;
}

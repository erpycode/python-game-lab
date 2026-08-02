/* ============================================
   🐍 پایتون‌باز — سیستم دستاورد‌ها
   ============================================ */

const ACHIEVEMENTS_KEY = 'pythonGameAchievements';

// لیست دستاورد‌ها
const ACHIEVEMENTS = [
    { id: 'first_chapter', title: '🎯 شروع اولین فصل', desc: 'اولین فصل رو شروع کردی!', condition: (p) => p.completedChapters.length >= 1 },
    { id: 'three_chapters', title: '🔥 سه فصل تموم شد', desc: '۳ فصل تموم کردی!', condition: (p) => p.completedChapters.length >= 3 },
    { id: 'half_way', title: '🏆 نصف راه!', desc: '۱۲ فصل تموم کردی!', condition: (p) => p.completedChapters.length >= 12 },
    { id: 'all_chapters', title: '👑 استاد پایتون!', desc: 'همه ۲۳ فصل رو تموم کردی!', condition: (p) => p.completedChapters.length >= 23 },
    { id: 'hundred_xp', title: '⭐ ۱۰۰ XP', desc: '۱۰۰ XP کسب کردی!', condition: (p) => p.totalXP >= 100 },
    { id: 'thousand_xp', title: '💎 ۱۰۰۰ XP', desc: '۱۰۰۰ XP کسب کردی!', condition: (p) => p.totalXP >= 1000 },
    { id: 'perfect_score', title: '💯 امتیاز کامل', desc: 'یه فصل رو با ۱۰۰٪ تموم کردی!', condition: (p) => Object.values(p.chapters).some(ch => ch.score >= 90) },
];

// لود کردن دستاورد‌ها
function loadAchievements() {
    try {
        return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY)) || [];
    } catch { return []; }
}

// ذخیره دستاورد‌ها
function saveAchievements(list) {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(list));
}

// بررسی دستاورد‌ها
function checkAchievements() {
    const progress = getProgress();
    const unlocked = loadAchievements();
    let newUnlock = null;
    
    for (const ach of ACHIEVEMENTS) {
        if (!unlocked.includes(ach.id) && ach.condition(progress)) {
            unlocked.push(ach.id);
            newUnlock = ach;
            break;
        }
    }
    
    if (newUnlock) {
        saveAchievements(unlocked);
        showAchievementToast(newUnlock);
    }
}

// نمایش toast دستاورد
function showAchievementToast(achievement) {
    const toast = document.getElementById('achievement-toast');
    if (!toast) return;
    
    toast.innerHTML = `${achievement.title}<br><span style="font-weight: 400; font-size: 0.8rem;">${achievement.desc}</span>`;
    toast.classList.remove('hidden');
    toast.style.animation = 'none';
    toast.offsetHeight; // ریست انیمیشن
    toast.style.animation = '';
    
    // پخش صدا
    if (typeof soundManager !== 'undefined' && soundManager.playComplete) {
        soundManager.playComplete();
    }
    
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

// گرفتن لیست دستاورد‌های باز شده
function getUnlockedAchievements() {
    return loadAchievements();
}

// گرفتن تعداد دستاورد‌های باز شده
function getAchievementCount() {
    return loadAchievements().length;
}

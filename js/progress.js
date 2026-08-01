/* ============================================
   🐍 پایتون‌باز — سیستم ذخیره‌سازی پیشرفت
   ============================================ */

const STORAGE_KEY = 'pythonGameProgress';

// ساختار پیشرفت پیش‌فرض
function getDefaultProgress() {
    return {
        username: '',
        currentChapter: 1,
        completedChapters: [],
        chapters: {},
        totalXP: 0,
        totalPlayTime: 0,
        lastPlayed: null
    };
}

// خوندن پیشرفت از localStorage
function loadProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            // ادغام با پیش‌فرض برای آپدیت‌های آینده
            return { ...getDefaultProgress(), ...parsed };
        }
    } catch (e) {
        console.error('خطا در خوندن پیشرفت:', e);
    }
    return getDefaultProgress();
}

// ذخیره پیشرفت در localStorage
function saveProgress(progress) {
    try {
        progress.lastPlayed = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        return true;
    } catch (e) {
        console.error('خطا در ذخیره پیشرفت:', e);
        return false;
    }
}

// بررسی وجود پیشرفت
function hasProgress() {
    const progress = loadProgress();
    return progress.username !== '';
}

// شروع بازی جدید
function startNewGame(username) {
    const progress = getDefaultProgress();
    progress.username = username;
    progress.lastPlayed = new Date().toISOString();
    saveProgress(progress);
    return progress;
}

// گرفتن پیشرفت فعلی
function getProgress() {
    return loadProgress();
}

// ذخیره تکمیل فصل
function completeChapterProgress(chapterNum, score, xp) {
    const progress = loadProgress();
    
    // علامت‌گذاری فصل به عنوان تموم شده
    if (!progress.completedChapters.includes(chapterNum)) {
        progress.completedChapters.push(chapterNum);
    }
    
    // ذخیره اطلاعات فصل
    if (!progress.chapters[chapterNum]) {
        progress.chapters[chapterNum] = {
            completed: true,
            score: score,
            xp: xp,
            completedAt: new Date().toISOString()
        };
    } else {
        // بهترین امتیاز رو ذخیره کن
        progress.chapters[chapterNum].completed = true;
        progress.chapters[chapterNum].score = Math.max(
            progress.chapters[chapterNum].score || 0,
            score
        );
        progress.chapters[chapterNum].xp = Math.max(
            progress.chapters[chapterNum].xp || 0,
            xp
        );
    }
    
    // آپدیت فصل فعلی
    const nextChapter = chapterNum + 1;
    if (nextChapter <= 23) { // حداکثر ۲۳ فصل
        progress.currentChapter = Math.max(progress.currentChapter, nextChapter);
    }
    
    // آپدیت XP کل
    progress.totalXP = Object.values(progress.chapters).reduce((sum, ch) => sum + (ch.xp || 0), 0);
    
    saveProgress(progress);
    return progress;
}

// بررسی قفل بودن فصل
function isChapterLocked(chapterNum) {
    const progress = loadProgress();
    if (chapterNum === 1) return false; // فصل اول همیشه بازه
    return !progress.completedChapters.includes(chapterNum - 1);
}

// گرفتن اطلاعات فصل
function getChapterProgress(chapterNum) {
    const progress = loadProgress();
    return progress.chapters[chapterNum] || null;
}

// آپدیت XP
function addXP(amount) {
    const progress = loadProgress();
    progress.totalXP += amount;
    saveProgress(progress);
    return progress.totalXP;
}

// گرفتن XP فعلی
function getTotalXP() {
    return loadProgress().totalXP;
}

// گرفتن نام کاربر
function getUsername() {
    return loadProgress().username;
}

// ریست کردن پیشرفت
function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
}

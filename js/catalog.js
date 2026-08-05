/* ============================================
   🐍 پایتون‌باز آرکید — کاتالوگ فصل‌ها
   منبع واحد حقیقت برای مپ، قفل‌ها و دستاوردها
   ============================================ */

PB.catalog = (() => {
    const chapters = [
        { id: 1, title: "متغیرها", subtitle: "جعبه‌های نگه‌داری داده", level: "beginner", color: "#22c55e", emoji: "📦", estMinutes: 12, goals: ["تعریف متغیر", "انواع داده", "print و type"] },
        { id: 2, title: "عملگرها", subtitle: "ریاضی، مقایسه و منطق", level: "beginner", color: "#22c55e", emoji: "➕", estMinutes: 12, goals: ["عملگرهای ریاضی", "مقایسه", "اولویت عملگرها"] },
        { id: 3, title: "شرط‌ها", subtitle: "if و مسیرهای تصمیم", level: "intermediate", color: "#38bdf8", emoji: "🔀", estMinutes: 15, goals: ["if/elif/else", "شرط‌های ترکیبی", "input"] },
        { id: 4, title: "حلقه‌ها", subtitle: "تکرار و حلقه‌های بی‌پایان", level: "intermediate", color: "#38bdf8", emoji: "🔄", estMinutes: 15, goals: ["for و while", "range", "break و continue"] },
        { id: 5, title: "توابع", subtitle: "کدت رو بسته‌بندی کن", level: "intermediate", color: "#38bdf8", emoji: "🧩", estMinutes: 16, goals: ["def و return", "پارامترها", "اسکوپ"] },
        { id: 6, title: "لیست‌ها", subtitle: "مجموعه‌ی مرتب داده", level: "advanced", color: "#a855f7", emoji: "🗂️", estMinutes: 16, goals: ["ساخت و دسترسی", "متدهای لیست", "برش (slice)"] },
        { id: 7, title: "دیکشنری‌ها", subtitle: "کلید و مقدار", level: "advanced", color: "#a855f7", emoji: "🔑", estMinutes: 16, goals: ["ساخت دیکشنری", "دسترسی و تغییر", "متدها"] },
        { id: 8, title: "متدهای رشته", subtitle: "کار با متن‌ها", level: "advanced", color: "#a855f7", emoji: "✂️", estMinutes: 15, goals: ["split و join", "upper و lower", "f-string"] },
        { id: 9, title: "مدیریت فایل", subtitle: "خواندن و نوشتن", level: "advanced", color: "#a855f7", emoji: "📁", estMinutes: 16, goals: ["open و with", "خواندن فایل", "نوشتن فایل"] },
        { id: 10, title: "مدیریت خطا", subtitle: "try و except", level: "advanced", color: "#a855f7", emoji: "🛡️", estMinutes: 16, goals: ["خطاها", "try/except", "raise"] },
        { id: 11, title: "شی‌گرایی", subtitle: "کلاس و آبجکت", level: "expert", color: "#ff4d8d", emoji: "🏛️", estMinutes: 20, goals: ["class", "متغیرهای نمونه", "متدها"] },
        { id: 12, title: "جنریتورها", subtitle: "تولید گام‌به‌گام", level: "expert", color: "#ff4d8d", emoji: "⚙️", estMinutes: 18, goals: ["yield", "ایتریت روی جنریتور", "مزایای حافظه"] },
        { id: 13, title: "دکوراتورها", subtitle: "تزئین توابع", level: "expert", color: "#ff4d8d", emoji: "🎀", estMinutes: 18, goals: ["closure", "@decorator", "wrapper"] },
        { id: 14, title: "ماژول‌ها", subtitle: "کد مشترک، همه‌جا", level: "expert", color: "#ff4d8d", emoji: "📦", estMinutes: 15, goals: ["import", "from...import", "کتابخانه‌های معروف"] },
        { id: 15, title: "عبارات باقاعده", subtitle: "جستجوی الگو", level: "expert", color: "#ff4d8d", emoji: "🔍", estMinutes: 20, goals: ["re.search", "الگوها", "findall"] },
        { id: 16, title: "فریم‌ورک‌ها", subtitle: "وب‌اپ با Flask", level: "expert", color: "#ff4d8d", emoji: "🌐", estMinutes: 18, goals: ["Flask", "مسیرها", "قالب‌ها"] },
        { id: 17, title: "پایتون در عمل", subtitle: "اسکریپت‌های روزمره", level: "expert", color: "#ff4d8d", emoji: "🛠️", estMinutes: 18, goals: ["اسکریپت CLI", "آرگومان", "اتوماسیون"] },
        { id: 18, title: "توابع لامبدا", subtitle: "توابع یک‌خطی", level: "advanced", color: "#a855f7", emoji: "⚡", estMinutes: 14, goals: ["lambda", "map/filter", "sorted با کلید"] },
        { id: 19, title: "لیست کامپریهنشن", subtitle: "لیست‌سازی خلاقانه", level: "advanced", color: "#a855f7", emoji: "🧬", estMinutes: 14, goals: ["[x for x]", "فیلتر if", "متداخلی"] },
        { id: 20, title: "محیط مجازی", subtitle: "فضای ایزوله", level: "expert", color: "#ff4d8d", emoji: "🏝️", estMinutes: 12, goals: ["venv", "pip", "requirements"] },
        { id: 21, title: "پایگاه داده", subtitle: "SQLite و SQL", level: "expert", color: "#ff4d8d", emoji: "🗄️", estMinutes: 18, goals: ["sqlite3", "CREATE TABLE", "INSERT/SELECT"] },
        { id: 22, title: "API و اینترنت", subtitle: "requests و JSON", level: "expert", color: "#ff4d8d", emoji: "🌍", estMinutes: 16, goals: ["GET", "JSON", "پارامترها"] },
        { id: 23, title: "تست‌نویسی", subtitle: "pytest و assert", level: "expert", color: "#ff4d8d", emoji: "🧪", estMinutes: 18, goals: ["test_", "assert", "پیرامترها"] },
    ];

    const levels = [
        { key: "beginner", title: "مبتدی", subtitle: "شروع ماجراجویی", color: "#22c55e", emoji: "🌱" },
        { key: "intermediate", title: "متوسط", subtitle: "عمیق‌تر شو", color: "#38bdf8", emoji: "⚡" },
        { key: "advanced", title: "پیشرفته", subtitle: "قدرت واقعی", color: "#a855f7", emoji: "🔥" },
        { key: "expert", title: "حرفه‌ای", subtitle: "استاد پایتون", color: "#ff4d8d", emoji: "👑" },
    ];

    const TOTAL = chapters.length;

    function getChapter(id) {
        return chapters.find((c) => c.id === id) || null;
    }

    function getChapterData(id) {
        return (window.PB_DATA && PB_DATA[id]) || null;
    }

    function isLocked(id, state) {
        if (id <= 1) return false;
        const prev = getChapter(id - 1);
        if (!prev) return false;
        return !(state.chapters[String(prev.id)]?.completedAt);
    }

    function levelOf(id) {
        return getChapter(id)?.level || "beginner";
    }

    return {
        chapters,
        levels,
        TOTAL,
        getChapter,
        getChapterData,
        isLocked,
        levelOf,
    };
})();

// رجیستری داده فصل‌ها
window.PB_DATA = window.PB_DATA || {};

PB.registerChapter = function (data) {
    if (data && data.id != null) {
        PB_DATA[data.id] = data;
    }
};

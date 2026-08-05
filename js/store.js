/* ============================================
   🐍 پایتون‌باز آرکید — ذخیره‌سازی (v2)
   ============================================ */

PB.store = (() => {
    const STORAGE_KEY = "pythonbaz.progress.v2";
    const LEGACY_KEY = "pythonGameProgress";       // از نسخه قبلی
    const LEGACY_ACH_KEY = "pythonGameAchievements";
    const THEME_KEY = "pythonbaz.theme";

    // اسکیمای پیش‌فرض — forward-compat
    function defaultState() {
        return {
            version: 2,
            username: "",
            createdAt: null,
            currentChapter: 1,
            settings: {
                theme: "dark",
                sound: true,
                reducedMotion: false,
            },
            chapters: {},        // { "1": { stars, bestScore, bestAccuracy, xp, answers: {}, replayCount, completedAt } }
            stats: {
                totalXp: 0,
                totalCoins: 0,
                totalPlayTime: 0,
                streakDays: 0,
                lastActiveDate: null,
                bestStreak: 0,
                dailyQuests: {},  // { "2026-08-02": { done: n } }
            },
            inventory: [],       // آیتم‌های خریداری‌شده از فروشگاه
            achievements: [],    // [{ id, ts }]
        };
    }

    // ادغام عمیق ساده (برای forward-compat)
    function merge(defaults, saved) {
        const out = { ...defaults };
        for (const [key, value] of Object.entries(saved || {})) {
            if (value === null || value === undefined) continue;
            if (defaults[key] && typeof defaults[key] === "object" && !Array.isArray(defaults[key]) && typeof value === "object") {
                out[key] = merge(defaults[key], value);
            } else {
                out[key] = value;
            }
        }
        return out;
    }

    // مایگریشن از نسخه قدیمی
    function migrateLegacy() {
        try {
            const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY));
            if (!legacy || typeof legacy !== "object") return null;

            const state = defaultState();
            state.username = legacy.username || "";
            state.createdAt = new Date().toISOString();
            state.stats.totalXp = legacy.totalXP || 0;
            state.stats.lastActiveDate = legacy.lastPlayed || null;

            // تبدیل فصل‌های تکمیل‌شده
            if (Array.isArray(legacy.completedChapters)) {
                legacy.completedChapters.forEach((num) => {
                    const ch = legacy.chapters?.[String(num)] || {};
                    state.chapters[String(num)] = {
                        stars: 0,
                        bestScore: ch.score || 0,
                        bestAccuracy: 0,
                        xp: ch.xp || 0,
                        answers: {},
                        replayCount: 0,
                        completedAt: null,
                    };
                });
            }

            // دستاوردهای قدیمی
            try {
                const oldAch = JSON.parse(localStorage.getItem(LEGACY_ACH_KEY));
                if (Array.isArray(oldAch)) {
                    state.achievements = oldAch.map((id) => ({ id, ts: new Date().toISOString() }));
                }
            } catch (_) { /* ignore */ }

            // پاک کردن کلیدهای قدیمی بعد از مایگریشن موفق
            localStorage.removeItem(LEGACY_KEY);
            localStorage.removeItem(LEGACY_ACH_KEY);
            return state;
        } catch (_) {
            return null;
        }
    }

    // کش درون‌حافظه‌ای — از JSON.parse تکراری localStorage جلوگیری می‌کنه
    let cache = null;

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            let state;
            if (!raw) {
                // اگه داده قدیمی بود، مایگریت کن
                const migrated = migrateLegacy();
                if (migrated) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
                    state = migrated;
                } else {
                    state = defaultState();
                }
            } else {
                const parsed = JSON.parse(raw);
                // ورژن ناشناخته/قدیمی → با پیش‌فرض ادغام
                state = merge(defaultState(), parsed);
            }
            cache = state;
            return state;
        } catch (_) {
            cache = defaultState();
            return cache;
        }
    }

    function save(state) {
        cache = state;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) { /* ignore */ }
    }

    function get() {
        return cache ? cache : load();
    }

    function update(fn) {
        const state = cache ? cache : load();
        fn(state);
        save(state);
        return state;
    }

    function reset() {
        cache = null;
        localStorage.removeItem(STORAGE_KEY);
        return defaultState();
    }

    // آمار محاسبه‌شده
    function computeStats(state) {
        const chapterIds = Object.keys(state.chapters);
        const completed = chapterIds.filter((id) => state.chapters[id].completedAt);
        return {
            completedCount: completed.length,
            totalChapters: PB.catalog ? PB.catalog.chapters.length : 23,
            totalXp: state.stats.totalXp,
            totalCoins: state.stats.totalCoins,
            totalPlayTime: state.stats.totalPlayTime || 0,
            streakDays: state.stats.streakDays,
            bestStreak: state.stats.bestStreak || 0,
            level: PB.game ? PB.game.levelFromXp(state.stats.totalXp) : 1,
            levelProgress: PB.game ? PB.game.levelProgress(state.stats.totalXp) : 0,
        };
    }

    return {
        STORAGE_KEY,
        THEME_KEY,
        defaultState,
        load,
        save,
        get,
        update,
        reset,
        computeStats,
    };
})();

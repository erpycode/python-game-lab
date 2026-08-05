/* ============================================
   🐍 پایتون‌باز آرکید — دستاوردها
   ============================================ */

PB.achievements = (() => {
    const DEFS = [
        { id: "first_chapter", title: "اولین قدم", desc: "اولین فصلت رو تموم کن", emoji: "🐣", check: (s) => s.completedCount >= 1 },
        { id: "three_chapters", title: "سه‌گام", desc: "۳ فصل تموم کن", emoji: "👟", check: (s) => s.completedCount >= 3 },
        { id: "half_way", title: "نیمه راه", desc: "۱۲ فصل تموم کن", emoji: "🏃", check: (s) => s.completedCount >= 12 },
        { id: "all_chapters", title: "استاد پایتون", desc: "هر ۲۳ فصل رو تموم کن", emoji: "👑", check: (s) => s.completedCount >= 23 },
        { id: "hundred_xp", title: "صد یار", desc: "۱۰۰ XP جمع کن", emoji: "💯", check: (s) => s.totalXp >= 100 },
        { id: "thousand_xp", title: "هزاره", desc: "۱۰۰۰ XP جمع کن", emoji: "🚀", check: (s) => s.totalXp >= 1000 },
        { id: "perfect_score", title: "بی‌نقص", desc: "یک فصل با دقت ۹۰٪+ تموم کن", emoji: "🎯", check: (s) => s.perfectScore },
        { id: "streak_7", title: "هفته آتشین", desc: "۷ روز پشت‌سرهم بازی کن", emoji: "🔥", check: (s) => s.bestStreak >= 7 },
        { id: "shopaholic", title: "خریدار حرفه‌ای", desc: "یک آیتم از فروشگاه بخر", emoji: "🛍️", check: (s) => s.inventoryCount >= 1 },
        { id: "quiz_master", title: "استاد کوئیز", desc: "۱۰ کوئیز درست جواب بده", emoji: "🧠", check: (s) => s.quizSolved >= 10 },
    ];

    function unlockedCount() {
        return PB.store.get().achievements.length;
    }

    function isUnlocked(id) {
        return PB.store.get().achievements.some((a) => a.id === id);
    }

    // چک دستاوردها — چندتا در یک بار
    function checkAll() {
        const state = PB.store.get();
        const stats = PB.store.computeStats(state);

        // آمار برای چک‌ها
        const ctx = {
            completedCount: stats.completedCount,
            totalXp: stats.totalXp,
            perfectScore: Object.values(state.chapters).some((ch) => (ch.bestAccuracy || 0) >= 90),
            bestStreak: state.stats.bestStreak || 0,
            inventoryCount: state.inventory.length,
            quizSolved: Object.values(state.chapters).reduce((acc, ch) =>
                acc + Object.values(ch.answers || {}).filter((a) => a.solved && a.quiz).length, 0),
        };

        const newly = [];
        DEFS.forEach((def) => {
            if (!isUnlocked(def.id) && def.check(ctx)) {
                newly.push(def);
            }
        });

        if (newly.length) {
            PB.store.update((s) => {
                newly.forEach((def) => {
                    s.achievements.push({ id: def.id, ts: new Date().toISOString() });
                });
            });
            // نمایش توست
            newly.slice(0, 1).forEach((def) => {
                PB.ui.toast(`${def.emoji} دستاورد جدید: ${def.title}!`, "success", 4200);
                PB.sound.levelup();
            });
            PB.ui.showConfetti();
        }
        return newly;
    }

    // ثبت حل کوئیز (برای دستاورد quiz_master)
    function recordQuizSolved(chapterId, itemId) {
        PB.store.update((s) => {
            const ch = s.chapters[String(chapterId)];
            if (ch && ch.answers) {
                ch.answers[itemId] = { ...(ch.answers[itemId] || {}), solved: true, quiz: true };
            }
        });
    }

    function showModal() {
        const { el } = PB.utils;
        const state = PB.store.get();

        const list = el("div", { class: "achievements-list" });
        DEFS.forEach((def) => {
            const unlocked = isUnlocked(def.id);
            const item = el("div", { class: `achievement-item ${unlocked ? "unlocked" : "locked"}` }, [
                el("span", { class: "achievement-emoji", text: unlocked ? def.emoji : "🔒" }),
                el("div", { class: "achievement-info" }, [
                    el("div", { class: "achievement-title", text: def.title }),
                    el("div", { class: "achievement-desc text-muted", text: def.desc }),
                ]),
                unlocked ? el("span", { class: "badge badge-green", text: "باز شد" }) : null,
            ].filter(Boolean));
            list.appendChild(item);
        });

        PB.ui.openModal({
            title: `🏅 دستاوردها (${PB.utils.toFa(unlockedCount())}/${PB.utils.toFa(DEFS.length)})`,
            content: list,
        });
    }

    return { DEFS, unlockedCount, isUnlocked, checkAll, recordQuizSolved, showModal };
})();

/* ============================================
   🐍 پایتون‌باز آرکید — گیمیفیکیشن
   XP/لول، استرک، انرژی، کوئست روزانه، فروشگاه
   ============================================ */

PB.game = (() => {
    // ============ XP و لول ============
    // فرمول: هر لول به xp = level * 100 نیاز داره
    function levelFromXp(totalXp) {
        let level = 1;
        let remaining = totalXp;
        while (remaining >= level * 100) {
            remaining -= level * 100;
            level++;
        }
        return level;
    }

    function levelProgress(totalXp) {
        let level = 1;
        let remaining = totalXp;
        while (remaining >= level * 100) {
            remaining -= level * 100;
            level++;
        }
        const current = level * 100;
        return Math.round((remaining / current) * 100);
    }

    function xpForLevel(level) {
        return level * 100;
    }

    // ============ استرک روزانه ============
    function todayKey() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }

    function isToday(dateStr) {
        return dateStr === todayKey();
    }

    function checkStreak() {
        const state = PB.store.update((s) => {
            const today = todayKey();
            const last = s.stats.lastActiveDate;
            if (last === today) return s; // امروز قبلاً ثبت شده

            if (last) {
                const lastDate = new Date(last);
                const now = new Date();
                const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    s.stats.streakDays = (s.stats.streakDays || 0) + 1;
                } else if (diffDays > 1) {
                    s.stats.streakDays = 1;
                } else {
                    s.stats.streakDays = (s.stats.streakDays || 0) + 1;
                }
            } else {
                s.stats.streakDays = 1;
            }
            s.stats.lastActiveDate = today;
            s.stats.bestStreak = Math.max(s.stats.bestStreak || 0, s.stats.streakDays);
        });
        return state.stats.streakDays;
    }

    // ============ انرژی (۵ قلب، refill روزانه) ============
    const MAX_ENERGY = 5;

    function getEnergy() {
        const state = PB.store.get();
        const today = todayKey();
        const day = state.energy?.day || "";
        if (day !== today) {
            // refill روزانه
            PB.store.update((s) => {
                s.energy = { day: today, value: MAX_ENERGY };
            });
            return MAX_ENERGY;
        }
        return state.energy?.value ?? MAX_ENERGY;
    }

    function spendEnergy(amount = 1) {
        let ok = false;
        PB.store.update((s) => {
            const today = todayKey();
            if (s.energy?.day !== today) {
                s.energy = { day: today, value: MAX_ENERGY };
            }
            if (s.energy.value >= amount) {
                s.energy.value -= amount;
                ok = true;
            }
        });
        return ok;
    }

    // ============ کوئست روزانه ============
    function dailyQuest() {
        const state = PB.store.get();
        const today = todayKey();
        const quests = {
            solve3: { title: "۳ چالش حل کن", target: 3 },
            xp50: { title: "۵۰ XP کسب کن", target: 50 },
            replay: { title: "۱ فصل رو دوباره بازی کن", target: 1 },
        };
        // هر روز یه کوئست تصادفی
        const seed = [...today].reduce((a, c) => a + c.charCodeAt(0), 0);
        const keys = Object.keys(quests);
        const questKey = keys[seed % keys.length];
        const done = state.stats.dailyQuests?.[today]?.done || 0;

        return {
            key: questKey,
            title: quests[questKey].title,
            target: quests[questKey].target,
            done,
            claimed: state.stats.dailyQuests?.[today]?.claimed || false,
        };
    }

    function progressQuest(amount = 1) {
        PB.store.update((s) => {
            const today = todayKey();
            s.stats.dailyQuests = s.stats.dailyQuests || {};
            s.stats.dailyQuests[today] = s.stats.dailyQuests[today] || { done: 0, claimed: false };
            s.stats.dailyQuests[today].done += amount;
        });
    }

    function claimQuestReward() {
        const quest = dailyQuest();
        if (quest.done >= quest.target && !quest.claimed) {
            PB.store.update((s) => {
                const today = todayKey();
                s.stats.dailyQuests[today].claimed = true;
                s.stats.totalCoins += 30;
                s.stats.totalXp += 20;
            });
            PB.sound.coin();
            return 30;
        }
        return 0;
    }

    // ============ فروشگاه ============
    const SHOP_ITEMS = [
        { id: "snake_gold", name: "مار طلایی", desc: "آیکون طلایی در پروفایل", emoji: "🐍", price: 120, type: "avatar" },
        { id: "crown", name: "تاج پایتون‌باز", desc: "نشان استادی", emoji: "👑", price: 300, type: "avatar" },
        { id: "sparkle", name: "سطح جادویی", desc: "انیمیشن جرقه‌ها", emoji: "✨", price: 80, type: "effect" },
        { id: "fire", name: "آتش استرک", desc: "افکت آتش در استرک", emoji: "🔥", price: 100, type: "effect" },
        { id: "robot", name: "ربات پایتون", desc: "همراه رباتیک", emoji: "🤖", price: 200, type: "avatar" },
        { id: "star_rain", name: "باران ستاره", desc: "کانفتی ستاره‌ای", emoji: "⭐", price: 150, type: "effect" },
    ];

    function getShopItems() {
        return SHOP_ITEMS;
    }

    function isOwned(itemId) {
        return PB.store.get().inventory.includes(itemId);
    }

    function buyItem(itemId) {
        const item = SHOP_ITEMS.find((i) => i.id === itemId);
        if (!item) return { ok: false, reason: "not_found" };
        const state = PB.store.get();
        if (state.inventory.includes(itemId)) return { ok: false, reason: "owned" };
        if (state.stats.totalCoins < item.price) return { ok: false, reason: "no_coins" };

        PB.store.update((s) => {
            s.stats.totalCoins -= item.price;
            s.inventory.push(itemId);
        });
        PB.sound.coin();
        return { ok: true, item };
    }

    // ============ زمان بازی ============
    function addPlayTime(seconds) {
        PB.store.update((s) => {
            s.stats.totalPlayTime += seconds;
        });
    }

    function formatPlayTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        if (hours > 0) return `${PB.utils.toFa(hours)} ساعت و ${PB.utils.toFa(minutes)} دقیقه`;
        if (minutes > 0) return `${PB.utils.toFa(minutes)} دقیقه`;
        return `${PB.utils.toFa(Math.max(1, Math.round(totalSeconds / 60)))} دقیقه`;
    }

    // ============ addXP عمومی ============
    function addXp(amount, coins = 0) {
        PB.store.update((s) => {
            s.stats.totalXp += amount;
            s.stats.totalCoins += coins;
        });
    }

    function getCoins() {
        return PB.store.get().stats.totalCoins;
    }

    return {
        levelFromXp,
        levelProgress,
        xpForLevel,
        todayKey,
        checkStreak,
        getEnergy,
        spendEnergy,
        MAX_ENERGY,
        dailyQuest,
        progressQuest,
        claimQuestReward,
        getShopItems,
        isOwned,
        buyItem,
        addPlayTime,
        formatPlayTime,
        addXp,
        getCoins,
    };
})();

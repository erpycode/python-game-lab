/* ============================================
   🐍 پایتون‌باز آرکید — پروفایل
   ============================================ */

PB.views = PB.views || {};

PB.views.profile = (() => {
    function render(params) {
        const { el } = PB.utils;
        const state = PB.store.get();
        const stats = PB.store.computeStats(state);
        const energy = PB.game.getEnergy();

        const header = PB.ui.pageHeader({
            title: "👤 پروفایل",
            actions: [PB.ui.backButton("بازگشت", "#/map")],
        });

        const avatar = state.inventory?.includes("snake_gold") ? "🐍✨" : state.inventory?.includes("crown") ? "👑🐍" : "🐍";

        const profileCard = el("div", { class: "card card-pad profile-card" }, [
            el("div", { class: "profile-avatar", text: avatar }),
            el("h2", { text: state.username || "مهمان" }),
            el("div", { class: "text-muted", text: `لول ${PB.utils.toFa(stats.level)} · ${PB.utils.formatNumber(stats.totalXp)} XP` }),
            PB.ui.progressBar(stats.levelProgress, { color: "green" }),
            el("div", { style: "margin-top: 12px;" }, [
                PB.ui.hearts(energy),
            ]),
        ]);

        const statsGrid = el("div", { class: "profile-stats-grid" }, [
            statTile("🎯", `${PB.utils.toFa(stats.completedCount)}/${PB.utils.toFa(stats.totalChapters)}`, "فصل تموم شده"),
            statTile("🔥", `${PB.utils.toFa(stats.streakDays)} روز`, "استرک فعلی"),
            statTile("🏆", `${PB.utils.toFa(stats.bestStreak)} روز`, "بهترین استرک"),
            statTile("🪙", PB.utils.formatNumber(stats.totalCoins), "سکه"),
            statTile("⏱️", PB.game.formatPlayTime(stats.totalPlayTime), "زمان بازی"),
            statTile("🏅", `${PB.utils.toFa(PB.achievements.unlockedCount())}`, "دستاورد"),
        ]);

        // دکمه‌ها
        const actions = el("div", { class: "profile-actions" }, [
            actionBtn("🏅 دستاوردها", () => PB.achievements.showModal()),
            actionBtn("🛒 فروشگاه", () => PB.shop.showModal()),
            actionBtn("⚙️ تنظیمات", () => (window.location.hash = "#/settings")),
            actionBtn("🗑️ ریست پیشرفت", () => {
                if (confirm("همه پیشرفتت پاک بشه؟ این کار برگشت‌پذیر نیست!")) {
                    PB.store.reset();
                    PB.ui.toast("پیشرفت پاک شد!", "info");
                    window.location.hash = "#/home";
                }
            }, "btn-danger"),
        ]);

        const container = PB.ui.renderApp([header, profileCard, statsGrid, actions]);
        container.classList.add("page-profile");

        PB.views.home.renderBottomNav("profile");
    }

    function statTile(emoji, value, label) {
        const { el } = PB.utils;
        return el("div", { class: "card card-pad stat-tile" }, [
            el("div", { class: "stat-tile-emoji", text: emoji }),
            el("div", { class: "stat-tile-value", text: value }),
            el("div", { class: "stat-tile-label text-muted", text: label }),
        ]);
    }

    function actionBtn(text, onClick, extraClass = "") {
        const { el } = PB.utils;
        const btn = el("button", { class: `btn btn-ghost btn-block ${extraClass}`, text });
        btn.addEventListener("click", onClick);
        return btn;
    }

    return { render };
})();

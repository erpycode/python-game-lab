/* ============================================
   🐍 پایتون‌باز آرکید — صفحه اصلی
   ============================================ */

PB.views = PB.views || {};

PB.views.home = (() => {
    function render(params) {
        const { el } = PB.utils;
        const state = PB.store.get();
        const stats = PB.store.computeStats(state);
        const hasProfile = !!state.username;

        const startBtn = el("button", { class: "btn btn-primary btn-lg", text: "شروع بازی 🚀" });
        startBtn.addEventListener("click", () => {
            const modal = PB.ui.openModal({
                title: "🐍 اسمت چیه؟",
                content: renderNameForm(() => {
                    modal.close();
                }),
            });
        });

        const continueBtn = el("button", { class: "btn btn-green btn-lg", text: "ادامه یادگیری ➡️" });
        continueBtn.addEventListener("click", () => {
            PB.sound.open();
            window.location.hash = "#/map";
        });

        const statsRow = el("div", { class: "home-stats" }, [
            statCard("لول", `لول ${PB.utils.toFa(stats.level)}`, stats.levelProgress, "yellow"),
            statCard("XP", PB.utils.formatNumber(stats.totalXp), 100, "green"),
            statCard("استرک", `${PB.utils.toFa(stats.streakDays)} روز 🔥`, Math.min(100, (stats.streakDays / 7) * 100), "purple"),
            statCard("فصل‌ها", `${PB.utils.toFa(stats.completedCount)}/${PB.utils.toFa(stats.totalChapters)}`, stats.completedCount / stats.totalChapters * 100, "blue"),
        ]);

        const hero = el("div", { class: "home-hero" }, [
            el("div", { class: "hero-snake anim-float", text: "🐍" }),
            el("h1", { class: "hero-title neon-text", text: "پایتون‌باز" }),
            el("p", { class: "hero-subtitle", text: "آرکید یادگیری پایتون — بازی کن، کد بزن، استاد شو" }),
            hasProfile
                ? el("div", { class: "hero-actions" }, [continueBtn])
                : el("div", { class: "hero-actions" }, [startBtn]),
        ]);

        // کارت ادامه (اگه پروفایل داره)
        const continueCard = hasProfile ? renderContinueCard(state) : null;

        const children = [hero];
        if (continueCard) children.push(continueCard);
        children.push(statsRow);

        const container = PB.ui.renderApp(children);
        container.classList.add("page-home");

        // نوار پایین + دکمه‌های شناور (فقط در صفحه اصلی — بعد از renderApp که فاب‌ها رو پاک می‌کنه)
        renderBottomNav("home");
        renderFabs();
    }

    function statCard(label, value, percent, color) {
        const { el } = PB.utils;
        return el("div", { class: "home-stat-card" }, [
            el("div", { class: "home-stat-value", text: value }),
            el("div", { class: "home-stat-label", text: label }),
            PB.ui.progressBar(percent, { color: color === "green" ? "green" : color === "purple" ? "purple" : "" }),
        ]);
    }

    function renderContinueCard(state) {
        const { el } = PB.utils;
        const current = PB.catalog.getChapter(state.currentChapter || 1);
        const chapterName = current ? `فصل ${PB.utils.toFa(current.id)}: ${current.title}` : "";

        const btn = el("button", { class: "btn btn-ghost", text: "ادامه ➡️" });
        btn.addEventListener("click", () => {
            window.location.hash = `#/chapter/${current.id}/lesson`;
        });

        return el("div", { class: "card card-pad home-continue" }, [
            el("div", { class: "continue-icon", text: "🎮" }),
            el("div", { class: "continue-text" }, [
                el("div", { class: "text-muted", text: "ادامه از" }),
                el("div", { class: "continue-title", text: chapterName }),
                el("div", { class: "text-muted", style: "font-size: 0.8rem;", text: `${PB.utils.toFa(current.estMinutes)} دقیقه تخمینی` }),
            ]),
            btn,
        ]);
    }

    function renderNameForm(onDone) {
        const { el } = PB.utils;
        const input = el("input", { type: "text", placeholder: "اسمت رو بنویس...", maxlength: "20" });
        const btn = el("button", { class: "btn btn-primary btn-block", text: "شروع 🚀" });

        function submit() {
            const name = input.value.trim();
            if (!name) {
                PB.ui.toast("اول اسمت رو بنویس! 🤔", "error");
                input.focus();
                return;
            }
            if (name.length < 2) {
                PB.ui.toast("اسم حداقل ۲ حرف باشه!", "error");
                input.focus();
                return;
            }
            PB.store.update((s) => {
                s.username = name;
                s.createdAt = s.createdAt || new Date().toISOString();
            });
            PB.sound.start();
            PB.ui.showConfetti();
            PB.game.checkStreak();
            PB.ui.toast(`خوش اومدی ${name}! 🐍`, "success");
            onDone();
            window.location.hash = "#/map";
        }

        btn.addEventListener("click", submit);
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });

        return el("div", { class: "name-form" }, [
            input,
            btn,
        ]);
    }

    function renderBottomNav(active) {
        const { el } = PB.utils;
        // پاک کردن nav قبلی
        document.querySelectorAll(".bottom-nav").forEach((n) => n.remove());
        const nav = el("nav", { class: "bottom-nav" }, [
            navItem("🏠", "خانه", "home", active === "home", "#/home"),
            navItem("🗺️", "نقشه", "map", active === "map", "#/map"),
            navItem("🏅", "دستاورد", "achievements", false, null, () => PB.achievements.showModal()),
            navItem("🛒", "فروشگاه", "shop", false, null, () => PB.shop.showModal()),
        ]);
        document.body.appendChild(nav);
    }

    function navItem(icon, label, key, isActive, path, onClick) {
        const { el } = PB.utils;
        const btn = el("button", { class: `nav-item ${isActive ? "active" : ""}` }, [
            el("span", { class: "nav-icon", text: icon }),
            el("span", { class: "nav-label", text: label }),
        ]);
        if (path) btn.addEventListener("click", () => (window.location.hash = path));
        else if (onClick) btn.addEventListener("click", onClick);
        return btn;
    }

    // دکمه‌های شناور
    function renderFabs() {
        const { el } = PB.utils;
        // پاک کردن fabs قبلی
        document.querySelectorAll(".fab").forEach((n) => n.remove());
        const fabs = [
            { cls: "fab-top-start", icon: "🔊", title: "صدا", action: () => {
                const s = PB.sound.isEnabled();
                PB.sound.setEnabled(!s);
                PB.ui.toast(s ? "صدا خاموش شد 🔇" : "صدا روشن شد 🔊", "info");
            }},
            { cls: "fab-top-second", icon: "🌙", title: "تم", action: () => {
                const t = PB.theme.toggle();
                PB.ui.toast(t === "dark" ? "حالت شب 🌙" : "حالت روز ☀️", "info");
            }},
            { cls: "fab-top-third", icon: "📖", title: "واژه‌نامه", action: () => PB.glossary.open() },
        ];
        fabs.forEach((f) => {
            const btn = el("button", { class: `fab ${f.cls}`, title: f.title, text: f.icon });
            btn.addEventListener("click", f.action);
            document.body.appendChild(btn);
        });
    }

    return { render, renderBottomNav, renderFabs, navItem };
})();

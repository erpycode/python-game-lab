/* ============================================
   🐍 پایتون‌باز آرکید — نقشه / مسیر یادگیری
   ============================================ */

PB.views = PB.views || {};

PB.views.map = (() => {
    function render(params) {
        const { el } = PB.utils;
        const state = PB.store.get();
        const stats = PB.store.computeStats(state);

        // اطمینان از استرک
        PB.game.checkStreak();

        const header = PB.ui.pageHeader({
            title: "🗺️ نقشه یادگیری",
            subtitle: `لول ${PB.utils.toFa(stats.level)} · ${PB.utils.formatNumber(stats.totalXp)} XP · استرک ${PB.utils.toFa(stats.streakDays)} روز`,
            actions: [
                el("button", { class: "btn btn-ghost btn-sm", text: "🏠" }, []),
            ],
        });

        // دکمه خانه
        const homeBtn = header.querySelector(".btn");
        homeBtn.addEventListener("click", () => (window.location.hash = "#/home"));

        const overall = el("div", { class: "map-overall" }, [
            el("div", { class: "text-muted", style: "font-size: 0.8rem;", text: "پیشرفت کلی" }),
            PB.ui.progressBar((stats.completedCount / stats.totalChapters) * 100, { color: "green" }),
            el("div", { class: "text-muted", style: "font-size: 0.75rem;", text: `${PB.utils.toFa(stats.completedCount)} از ${PB.utils.toFa(stats.totalChapters)} فصل` }),
        ]);

        const road = el("div", { class: "map-road" });

        PB.catalog.levels.forEach((level, li) => {
            const levelChapters = PB.catalog.chapters.filter((c) => c.level === level.key);
            if (!levelChapters.length) return;

            const zone = el("div", { class: "map-zone", style: `--zone-color: ${level.color}` }, [
                el("div", { class: "map-zone-header" }, [
                    el("span", { class: "map-zone-emoji", text: level.emoji }),
                    el("div", {}, [
                        el("div", { class: "map-zone-title", text: level.title }),
                        el("div", { class: "map-zone-subtitle", text: level.subtitle }),
                    ]),
                ]),
            ]);

            // نودهای فصل
            levelChapters.forEach((ch, ci) => {
                const node = renderChapterNode(ch, state);
                zone.appendChild(node);
                // خط اتصال
                if (ci > 0) {
                    zone.insertBefore(el("div", { class: "map-connector" }), node);
                }
            });

            road.appendChild(zone);
        });

        const container = PB.ui.renderApp([header, overall, road]);
        container.classList.add("page-map");

        PB.views.home.renderBottomNav("map");
    }

    function renderChapterNode(ch, state) {
        const { el } = PB.utils;
        const key = String(ch.id);
        const chState = state.chapters[key];
        const done = !!chState?.completedAt;
        const locked = PB.catalog.isLocked(ch.id, state);
        const current = ch.id === (state.currentChapter || 1);

        const starsWrap = el("div", { class: "node-stars" });
        if (done && chState.stars) {
            for (let i = 0; i < chState.stars; i++) {
                starsWrap.appendChild(el("span", { class: "star lit", text: "★" }));
            }
        }

        const info = el("div", { class: "node-info" }, [
            el("div", { class: "node-title", text: `${PB.utils.toFa(ch.id)}. ${ch.title}` }),
            el("div", { class: "node-subtitle", text: ch.subtitle }),
            starsWrap,
        ]);

        const statusIcon = done ? "✅" : locked ? "🔒" : current ? "▶" : "";
        const status = el("div", { class: "node-status", text: statusIcon });

        const node = el("div", {
            class: `map-node ${done ? "done" : ""} ${locked ? "locked" : ""} ${current ? "current" : ""}`,
            style: `--node-color: ${ch.color}`,
        }, [info, status]);

        node.addEventListener("click", () => {
            if (locked) {
                PB.ui.toast("اول فصل قبلی رو تموم کن! 🔒", "error");
                PB.sound.wrong();
                return;
            }
            PB.sound.open();
            window.location.hash = `#/chapter/${ch.id}/lesson`;
        });

        return node;
    }

    return { render };
})();

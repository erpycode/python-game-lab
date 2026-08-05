/* ============================================
   🐍 پایتون‌باز آرکید — صفحه نتیجه فصل
   ============================================ */

PB.views = PB.views || {};

PB.views.result = (() => {
    // جشن (کانفتی/صدا) فقط اولین بار که نتیجه هر فصل نمایش داده میشه
    const celebratedChapters = new Set();

    function render(params) {
        const { el } = PB.utils;
        const chapterId = params.id;
        const chapter = PB.catalog.getChapter(chapterId);
        const session = PB.engine.getSession();

        if (!chapter) {
            window.location.hash = "#/map";
            return;
        }

        // محاسبه نتیجه
        const stars = session ? session.stars || PB.engine.computeStars() : 0;
        const score = session ? session.score : 0;
        const xp = session ? session.xpEarned : 0;
        const accuracy = session ? (() => {
            const total = session.exerciseResults.length + session.challengeResults.length;
            const solved = session.exerciseResults.filter(Boolean).length + session.challengeResults.filter(Boolean).length;
            return total ? Math.round((solved / total) * 100) : 0;
        })() : 0;

        // نام فصل
        const title = `فصل ${PB.utils.toFa(chapterId)}: ${chapter.title}`;

        const resultCard = el("div", { class: "result-card card card-pad text-center" }, [
            el("div", { class: "result-emoji", text: "🏆" }),
            el("h2", { class: "neon-text", text: "فصل تموم شد!" }),
            el("div", { class: "text-secondary", text: title }),
            el("div", { class: "result-stars", style: "margin: 12px 0;" }),
        ]);

        // ستاره‌ها
        const starsWrap = resultCard.querySelector(".result-stars");
        for (let i = 1; i <= 3; i++) {
            starsWrap.appendChild(el("span", { class: `star ${i <= stars ? "lit" : ""}`, text: "★" }));
        }

        // آمار
        const statsRow = el("div", { class: "result-stats" }, [
            statBox("امتیاز", PB.utils.formatNumber(score), "yellow"),
            statBox("XP", `+${PB.utils.formatNumber(xp)}`, "green"),
            statBox("دقت", `${PB.utils.formatNumber(accuracy)}٪`, "purple"),
        ]);
        resultCard.appendChild(statsRow);

        // دکمه‌ها
        const nextChapter = PB.catalog.getChapter(chapterId + 1);
        const actions = el("div", { class: "result-actions" });

        if (nextChapter) {
            const nextBtn = el("button", { class: "btn btn-primary btn-lg", text: `فصل بعدی: ${nextChapter.title} ➡️` });
            nextBtn.addEventListener("click", () => {
                window.location.hash = `#/chapter/${nextChapter.id}/lesson`;
            });
            actions.appendChild(nextBtn);
        }

        const mapBtn = el("button", { class: "btn btn-ghost btn-lg", text: "بازگشت به نقشه 🗺️" });
        mapBtn.addEventListener("click", () => (window.location.hash = "#/map"));
        actions.appendChild(mapBtn);

        resultCard.appendChild(actions);

        const container = PB.ui.renderApp([resultCard]);
        container.classList.add("page-result");

        if (!celebratedChapters.has(String(chapterId))) {
            celebratedChapters.add(String(chapterId));
            PB.ui.showConfetti();
            PB.sound.complete();
        }
        PB.views.home.renderBottomNav("map");
    }

    function statBox(label, value, color) {
        const { el } = PB.utils;
        return el("div", { class: "result-stat-box" }, [
            el("div", { class: `result-stat-value neon-text-${color === "yellow" ? "" : color}`, text: value }),
            el("div", { class: "result-stat-label text-muted", text: label }),
        ]);
    }

    return { render };
})();

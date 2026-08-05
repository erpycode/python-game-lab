/* ============================================
   🐍 پایتون‌باز آرکید — صفحه آموزش (لسو)
   ============================================ */

PB.views = PB.views || {};

PB.views.lesson = (() => {
    let chapterId = null;
    let sectionIndex = 0;

    function render(params) {
        const { el } = PB.utils;
        chapterId = params.id;
        const chapter = PB.catalog.getChapter(chapterId);
        const data = PB.catalog.getChapterData(chapterId);

        if (!chapter || !data) {
            PB.ui.toast("فصل پیدا نشد!", "error");
            window.location.hash = "#/map";
            return;
        }

        sectionIndex = 0;

        const header = PB.ui.pageHeader({
            title: `📖 ${PB.utils.toFa(chapterId)}. ${chapter.title}`,
            subtitle: chapter.subtitle,
            actions: [
                PB.ui.backButton("بازگشت به نقشه", "#/map"),
            ],
        });

        const card = el("div", { class: "lesson-card card" });
        const nav = el("div", { class: "lesson-nav" });

        function renderSection() {
            const sections = data.lesson.sections || [];
            const total = sections.length;

            card.innerHTML = "";

            if (sectionIndex === 0) {
                card.appendChild(renderIntro(data));
            } else {
                const section = sections[sectionIndex - 1];
                card.appendChild(renderSectionBody(section, sectionIndex - 1, total));
            }

            nav.innerHTML = "";
            const prevBtn = el("button", { class: "btn btn-ghost btn-sm", text: "→ قبلی" });
            const nextBtn = el("button", {
                class: `btn ${sectionIndex >= total ? "btn-green" : "btn-primary"}`,
                text: sectionIndex >= total ? "برو به تمرین‌ها ✅" : "بعدی ←",
            });

            prevBtn.addEventListener("click", () => {
                if (sectionIndex > 0) { sectionIndex--; renderSection(); }
            });
            nextBtn.addEventListener("click", () => {
                if (sectionIndex < total) {
                    sectionIndex++;
                    renderSection();
                } else {
                    window.location.hash = `#/chapter/${chapterId}/exercises`;
                }
            });

            prevBtn.disabled = sectionIndex === 0;
            nav.appendChild(prevBtn);
            nav.appendChild(el("span", { class: "lesson-progress-text text-muted", text: `${PB.utils.toFa(sectionIndex)}/${PB.utils.toFa(total)}` }));
            nav.appendChild(nextBtn);
        }

        renderSection();

        const container = PB.ui.renderApp([header, card, nav]);
        container.classList.add("page-lesson");

        PB.views.home.renderBottomNav("map");
    }

    function renderIntro(data) {
        const { el } = PB.utils;
        const chapter = PB.catalog.getChapter(data.id);
        return el("div", { class: "lesson-intro" }, [
            el("div", { class: "lesson-intro-emoji", text: chapter?.emoji || "🐍" }),
            el("h2", { text: data.lesson.title }),
            el("p", { class: "text-secondary", text: data.lesson.intro }),
            data.lesson.goals?.length ? el("div", { class: "lesson-goals" }, data.lesson.goals.map((g) =>
                el("div", { class: "goal-chip", text: `🎯 ${g}` })
            )) : null,
        ].filter(Boolean));
    }

    function renderSectionBody(section, idx, total) {
        const { el } = PB.utils;
        const wrap = el("div", { class: "lesson-section-body" }, [
            el("div", { class: "lesson-section-head" }, [
                el("span", { class: "lesson-section-icon", text: section.icon || "📝" }),
                el("h3", { text: section.title }),
            ]),
            el("div", { class: "lesson-section-text", text: section.text || "" }),
        ]);

        if (section.code) {
            wrap.appendChild(PB.ui.codeBlock(section.code));
            if (section.output) {
                wrap.appendChild(PB.ui.fakeTerminal("output", [PB.utils.escapeHtml(section.output)]));
            }
        }

        return wrap;
    }

    return { render };
})();

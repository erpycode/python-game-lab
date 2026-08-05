/* ============================================
   🐍 پایتون‌باز آرکید — صفحه تمرین‌ها (ورموپ)
   ============================================ */

PB.views = PB.views || {};

PB.views.exercises = (() => {
    let chapterId = null;
    let current = 0;
    let session = null;

    function render(params) {
        const { el } = PB.utils;
        chapterId = params.id;
        session = PB.engine.getSession();
        if (!session || session.id !== chapterId) {
            session = PB.engine.startChapter(chapterId);
        }
        if (!session) {
            PB.ui.toast("فصل پیدا نشد!", "error");
            window.location.hash = "#/map";
            return;
        }
        // سینک با ایندکس واقعی سشن
        current = session.exerciseIndex || 0;

        const header = PB.ui.pageHeader({
            title: "✅ تمرین‌ها",
            subtitle: "ورموپ — سریع و گرم کن",
            actions: [PB.ui.backButton("بازگشت به آموزش", `#/chapter/${chapterId}/lesson`)],
        });

        const card = el("div", { class: "challenge-card card" });
        const progress = el("div", { class: "text-muted", style: "font-size: 0.8rem;" });

        const nextBtn = el("button", { class: "btn btn-primary btn-block hidden", text: "تمرین بعدی ➡️" });
        nextBtn.addEventListener("click", () => {
            if (PB.engine.goToNext("exercise")) {
                current++;
                renderItem();
            } else {
                window.location.hash = `#/chapter/${chapterId}/challenges`;
            }
        });

        function renderItem() {
            const items = PB.engine.currentItems("exercise");
            progress.textContent = `${PB.utils.toFa(current + 1)}/${PB.utils.toFa(items.length)}`;
            card.innerHTML = "";
            nextBtn.classList.add("hidden");

            const item = items[current];
            if (!item) return;

            const typeBadge = PB.ui.badge(typeName(item.type), typeColor(item.type));
            const title = el("h3", { class: "challenge-title" });
            title.append(el("span", { class: "text-muted", style: "font-size: 0.8rem;", text: `تمرین ${PB.utils.toFa(current + 1)} ` }), typeBadge, el("div", { text: item.title }));

            card.appendChild(title);

            if (item.code) card.appendChild(PB.ui.codeBlock(item.code));

            // رندرر
            const ctx = {
                kind: "exercise",
                index: current,
                chapterId,
                engine: PB.engine,
                ui: PB.ui,
                onCheck: (userValue) => check(item, userValue),
            };
            // نگاشت type های JSON به رندررها
            const RENDERER_MAP = { predict: "predict", quiz: "quiz", fill_gap: "fill", bug_hunter: "bug", sort: "sort", write: "write" };
            const renderer = PB.renderers[RENDERER_MAP[item.type]];
            if (renderer) {
                const rendered = renderer.render(item, ctx);
                card.appendChild(rendered.container);
                card._rendered = rendered;
            }

            card.appendChild(renderResult());
        }

        function renderResult() {
            const result = el("div", { class: "feedback hidden" });
            return result;
        }

        function check(item, userValue) {
            let isCorrect = false;
            try {
                // اگه رندرر value داره، ازش بگیر (برای fill_gap و sort و...)
                if (card._rendered && typeof card._rendered.value === "function") {
                    userValue = card._rendered.value();
                }
                isCorrect = PB.engine.checkAnswer(item, userValue);
            } catch (e) {
                if (e.isFeedback) {
                    showResult(false, e.message);
                    PB.sound.wrong();
                    return;
                }
                throw e;
            }
            // محاسبه امتیاز
            if (isCorrect) {
                PB.engine.recordAnswer("exercise", true, 5, 2);
                // ثبت حل کوئیز برای دستاورد quiz_master
                if (item.type === "quiz" && PB.achievements && PB.achievements.recordQuizSolved) {
                    PB.achievements.recordQuizSolved(chapterId, item.id || current);
                }
                showResult(true, item.explanation || "");
                PB.sound.correct();
                PB.ui.showConfetti();
                // بعد از ۱ ثانیه دکمه بعدی
                setTimeout(() => { nextBtn.classList.remove("hidden"); }, 400);
            } else {
                PB.engine.recordAnswer("exercise", false);
                showResult(false, getFeedback(item, userValue));
                PB.sound.wrong();
                PB.ui.shakeElement(card);
            }
        }

        function showResult(ok, msg) {
            const result = card.querySelector(".feedback");
            result.classList.remove("hidden");
            result.className = `feedback ${ok ? "feedback-success" : "feedback-error"}`;
            result.innerHTML = (ok ? "🎉 آفرین! درسته!" : "❌ اشتباهه!") + (msg ? `<br>${msg}` : "");
        }

        function getFeedback(item, userValue) {
            // فیبدبک هوشمند ساده
            if (item.explanation) return item.explanation;
            if (item.hint) return `💡 ${item.hint}`;
            return "دوباره فکر کن!";
        }

        renderItem();

        const container = PB.ui.renderApp([header, card, nextBtn, progress]);
        container.classList.add("page-exercises");

        PB.views.home.renderBottomNav("map");
    }

    function typeName(type) {
        const names = {
            predict: "حدس خروجی",
            quiz: "چندگزینه‌ای",
            fill_gap: "جای خالی",
            bug_hunter: "شکار باگ",
            sort: "مرتب‌سازی",
            write: "کدنویسی",
        };
        return names[type] || type;
    }

    function typeColor(type) {
        const colors = {
            predict: "yellow",
            quiz: "blue",
            fill_gap: "purple",
            bug_hunter: "red",
            sort: "green",
            write: "green",
        };
        return colors[type] || "ghost";
    }

    return { render, typeName, typeColor };
})();

/* ============================================
   🐍 پایتون‌باز آرکید — صفحه چالش‌ها (باس فایت)
   ============================================ */

PB.views = PB.views || {};

PB.views.challenges = (() => {
    let chapterId = null;
    let current = 0;

    function render(params) {
        const { el } = PB.utils;
        chapterId = params.id;
        const session = PB.engine.getSession();
        if (!session) {
            // اگه مستقیم اومده، سشن بساز
            PB.engine.startChapter(chapterId);
        }
        // سینک با ایندکس واقعی سشن
        current = PB.engine.getSession().challengeIndex || 0;

        const header = PB.ui.pageHeader({
            title: "⚡ چالش‌ها",
            subtitle: "باس فایت — تمرکز کن!",
            actions: [PB.ui.backButton("بازگشت به تمرین‌ها", `#/chapter/${chapterId}/exercises`)],
        });

        const card = el("div", { class: "challenge-card card" });
        const progress = el("div", { class: "text-muted", style: "font-size: 0.8rem;" });
        const xpBadge = el("div", { class: "challenge-xp-badge badge badge-yellow", text: "⭐ ۰ XP" });

        const nextBtn = el("button", { class: "btn btn-green btn-block hidden", text: "چالش بعدی ⚡" });
        nextBtn.addEventListener("click", () => {
            if (PB.engine.goToNext("challenge")) {
                current++;
                renderItem();
            } else {
                // پایان فصل
                finishChapter();
            }
        });

        function renderItem() {
            const items = PB.engine.currentItems("challenge");
            progress.textContent = `${PB.utils.toFa(current + 1)}/${PB.utils.toFa(items.length)}`;
            card.innerHTML = "";
            nextBtn.classList.add("hidden");

            const item = items[current];
            if (!item) return;

            const typeBadge = PB.ui.badge(PB.views.exercises.typeName(item.type), PB.views.exercises.typeColor(item.type));
            const difficulty = difficultyBadge(item.difficulty);

            const title = el("h3", { class: "challenge-title" });
            title.append(
                el("span", { class: "text-muted", style: "font-size: 0.8rem;", text: `چالش ${PB.utils.toFa(current + 1)} ` }),
                typeBadge,
                difficulty,
                el("div", { text: item.title })
            );

            card.appendChild(title);
            if (item.code) card.appendChild(PB.ui.codeBlock(item.code));

            const ctx = {
                kind: "challenge",
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
                // رندرر فعلی برای گرفتن value هنگام بررسی
                card._rendered = rendered;
            }

            card.appendChild(renderResult());
        }

        function renderResult() {
            return el("div", { class: "feedback hidden" });
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
                    showFeedback(false, e.message);
                    PB.sound.wrong();
                    return;
                }
                throw e;
            }

            if (isCorrect) {
                const xp = item.xp || 10;
                const coins = item.coins || 5;
                PB.engine.recordAnswer("challenge", true, xp, coins);
                showFeedback(true, item.explanation || "آفرین!");
                PB.sound.correct();
                PB.ui.showConfetti();
                PB.game.progressQuest(1);
                xpBadge.textContent = `⭐ ${PB.utils.formatNumber(PB.engine.getSession().xpEarned)} XP`;
                setTimeout(() => { nextBtn.classList.remove("hidden"); }, 400);
            } else {
                PB.engine.recordAnswer("challenge", false);
                showFeedback(false, PB.engine.feedbackFor(item, userValue));
                PB.sound.wrong();
                PB.ui.shakeElement(card);
            }
        }

        function showFeedback(ok, msg) {
            const result = card.querySelector(".feedback");
            result.classList.remove("hidden");
            result.className = `feedback ${ok ? "feedback-success" : "feedback-error"}`;
            result.innerHTML = (ok ? "🎉 آفرین! درسته!" : "❌ اشتباهه!") + (msg ? `<br>${msg}` : "");
        }

        function finishChapter() {
            const result = PB.engine.finish();
            // فقط وقتی اولین باره که تموم میشه XP اضافه کن
            const state = PB.store.get();
            const wasCompleted = !!state.chapters[String(chapterId)]?.completedAt;
            if (!wasCompleted) {
                PB.sound.complete();
                PB.ui.showConfetti();
            }
            window.location.hash = `#/chapter/${chapterId}/result`;
        }

        function difficultyBadge(difficulty) {
            const map = {
                easy: ["آسان", "green"],
                medium: ["متوسط", "yellow"],
                hard: ["سخت", "red"],
            };
            const [label, color] = map[difficulty] || ["", "ghost"];
            return PB.ui.badge(label, color);
        }

        renderItem();

        const container = PB.ui.renderApp([header, card, nextBtn, progress, xpBadge]);
        container.classList.add("page-challenges");

        PB.views.home.renderBottomNav("map");
    }

    return { render };
})();

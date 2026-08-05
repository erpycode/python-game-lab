/* ============================================
   🐍 پایتون‌باز آرکید — موتور چالش
   state machine هر فصل: امتیاز، ستاره، پاسخ‌ها
   ============================================ */

PB.engine = (() => {
    let chapter = null;        // داده فصل
    let session = null;        // وضعیت اجرای فعلی

    function startChapter(id) {
        chapter = PB.catalog.getChapterData(id);
        if (!chapter) return null;

        // فصل فعلی رو توی state ذخیره کن (برای «ادامه از» و هایلایت نقشه)
        PB.store.update((s) => { s.currentChapter = Number(id); });

        session = {
            id: id,
            lessonDone: false,
            exerciseIndex: 0,
            challengeIndex: 0,
            exerciseResults: [],   // per attempt: true/false
            challengeResults: [],
            exerciseWrong: {},     // { idx: count }
            challengeWrong: {},
            score: 0,
            xpEarned: 0,
            usedHints: {},
            startedAt: Date.now(),
        };
        return session;
    }

    function getChapter() {
        return chapter;
    }

    function getSession() {
        return session;
    }

    function resetSession() {
        chapter = null;
        session = null;
    }

    function currentItems(kind) {
        if (!chapter) return [];
        return kind === "exercise" ? chapter.exercises : chapter.challenges;
    }

    function itemCount(kind) {
        return currentItems(kind).length;
    }

    function currentItem(kind) {
        const items = currentItems(kind);
        const idx = kind === "exercise" ? session.exerciseIndex : session.challengeIndex;
        return items[idx] || null;
    }

    // بررسی پاسخ — فیبدبک هوشمند
    function checkAnswer(item, userValue) {
        const norm = PB.utils.normalizeAnswer;
        const sim = PB.utils.isSimilar;

        switch (item.type) {
            case "predict": {
                if (norm(userValue) === norm(item.answer)) return true;
                // فیبدبک هوشمند
                if (userValue && norm(userValue) !== "") {
                    const isAnswerString = String(item.answer).startsWith("'") || String(item.answer).startsWith('"');
                    const isUserNum = !isNaN(norm(userValue)) && norm(userValue) !== "";
                    if (isAnswerString && isUserNum) {
                        throw new FeedbackError(`دقت کن! جواب یه رشته (string) هست نه عدد! وقتی متن‌ها رو جمع می‌کنی، مثلاً '1' + '7' برابر '17' میشه، نه 8.`);
                    }
                    if (!isNaN(norm(userValue)) && !isNaN(norm(item.answer))) {
                        const diff = parseInt(norm(userValue)) - parseInt(norm(item.answer));
                        if (Math.abs(diff) <= 2) {
                            throw new FeedbackError(`خیلی نزدیکی! فقط ${PB.utils.toFa(Math.abs(diff))} تا فرق داره. دوباره حساب کن!`);
                        }
                    }
                    if (sim(norm(userValue), norm(item.answer), 0.6)) {
                        throw new FeedbackError("خیلی نزدیکی! یه نگاه دیگه بنداز — شاید نوع داده رو اشتباه گرفتی.");
                    }
                }
                return false;
            }

            case "quiz":
                return userValue === item.correct;

            case "fill_gap": {
                const answers = Array.isArray(item.answer) ? item.answer : [item.answer];
                const values = Array.isArray(userValue) ? userValue : [userValue];
                if (values.length !== answers.length) return false;
                return values.every((v, i) => norm(v) === norm(answers[i]));
            }

            case "bug_hunter":
                return userValue === item.error_line;

            case "sort": {
                if (!Array.isArray(userValue) || !Array.isArray(item.correct_order)) return false;
                return JSON.stringify(userValue) === JSON.stringify(item.correct_order);
            }

            case "write":
                // در رندرر بررسی میشه؛ اینجا قواعد
                return checkWriteRules(item, userValue).score >= (item.passScore || 60);

            default:
                return false;
        }
    }

    // فیبدبک برای پاسخ غلط (بعد از checkAnswer)
    function feedbackFor(item, userValue) {
        const sim = PB.utils.isSimilar;
        const norm = PB.utils.normalizeAnswer;

        switch (item.type) {
            case "predict": {
                if (item.explanation) return item.explanation;
                if (item.hint) return `💡 ${item.hint}`;
                return `جواب صحیح «${item.answer}» هست.`;
            }
            case "quiz": {
                const correctOpt = (item.options || []).find((o) => o.label === item.correct);
                const wrongOpt = (item.options || []).find((o) => o.label === userValue);
                let msg = wrongOpt ? `گزینه «${wrongOpt.text}» اشتباهه.` : "";
                if (correctOpt) msg += ` جواب درست «${correctOpt.text}» هست.`;
                return msg || "دوباره فکر کن!";
            }
            case "fill_gap": {
                const answers = Array.isArray(item.answer) ? item.answer : [item.answer];
                const values = Array.isArray(userValue) ? userValue : [userValue];
                let msg = "";
                values.forEach((v, i) => {
                    if (norm(v) !== norm(answers[i])) {
                        msg += `جای خالی ${PB.utils.toFa(i + 1)}: «${v || "خالی"}» باید «${answers[i]}» باشه. `;
                    }
                });
                if (msg && item.explanation) msg += `<br>${item.explanation}`;
                return msg || (item.hint ? `💡 ${item.hint}` : "");
            }
            case "bug_hunter": {
                const lines = item.code.split("\n");
                let msg = `خطای اصلی روی خط ${PB.utils.toFa(item.error_line)} هست: `;
                msg += `<code class="mono">${PB.utils.escapeHtml((lines[item.error_line - 1] || "").trim())}</code>`;
                if (item.reason) msg += `<br>${item.reason}`;
                return msg;
            }
            case "sort": {
                let wrong = 0;
                (userValue || []).forEach((line, i) => {
                    if (line !== item.correct_order[i]) wrong++;
                });
                let msg = wrong === 1 ? "فقط ۱ خط جابه‌جاست!" : `${PB.utils.toFa(wrong)} خط جابه‌جاست.`;
                msg += `<br>ترتیب صحیح:<br><code class="mono">${item.correct_order.map((l) => PB.utils.escapeHtml(l)).join("<br>")}</code>`;
                return msg;
            }
            case "write": {
                const res = checkWriteRules(item, userValue);
                return res.feedback.filter((f) => f.type === "hint").map((f) => `💡 ${f.text}`).join("<br>");
            }
            default:
                return item.explanation || "";
        }
    }

    // خطای داخلی برای فیبدبک هوشمند
    function FeedbackError(message) {
        this.message = message;
        this.isFeedback = true;
    }

    // قواعد کدنویسی (write)
    function checkWriteRules(item, code) {
        const rules = item.accepts || [];
        let score = 0;
        let maxScore = 0;
        const feedback = [];
        rules.forEach((rule) => {
            maxScore += rule.points;
            const passed = rule.check(code);
            feedback.push({ type: passed ? "success" : "hint", text: passed ? rule.success : rule.hint });
            if (passed) score += rule.points;
        });
        return { score, maxScore, feedback };
    }

    // حل یک تمرین/چالش: درست/غلط + امتیاز
    function recordAnswer(kind, isCorrect, xp = 0, coins = 0) {
        const idx = kind === "exercise" ? session.exerciseIndex : session.challengeIndex;
        const results = kind === "exercise" ? session.exerciseResults : session.challengeResults;

        // فقط اولین پاسخ درست امتیاز داره
        if (isCorrect && results[idx] !== true) {
            results[idx] = true;
            session.xpEarned += xp;
            session.score += xp + coins;
        } else if (!isCorrect) {
            results[idx] = false;
            const wrongMap = kind === "exercise" ? session.exerciseWrong : session.challengeWrong;
            wrongMap[idx] = (wrongMap[idx] || 0) + 1;
        }
        return { solved: results[idx] === true, xp: xp, coins: coins };
    }

    function isSolved(kind, idx) {
        const results = kind === "exercise" ? session.exerciseResults : session.challengeResults;
        return results[idx] === true;
    }

    function wrongCount(kind, idx) {
        const wrongMap = kind === "exercise" ? session.exerciseWrong : session.challengeWrong;
        return wrongMap[idx] || 0;
    }

    function useHint(kind) {
        const idx = kind === "exercise" ? session.exerciseIndex : session.challengeIndex;
        const key = `${kind}-${idx}`;
        session.usedHints[key] = (session.usedHints[key] || 0) + 1;
        return session.usedHints[key];
    }

    function hintCount(kind, idx) {
        const key = `${kind}-${idx}`;
        return session.usedHints[key] || 0;
    }

    function goToNext(kind) {
        const key = kind === "exercise" ? "exerciseIndex" : "challengeIndex";
        const items = currentItems(kind);
        if (session[key] < items.length - 1) {
            session[key]++;
            return true;
        }
        return false;
    }

    // محاسبه دقت
    function accuracy(kind) {
        const results = kind === "exercise" ? session.exerciseResults : session.challengeResults;
        const solved = results.filter(Boolean).length;
        return results.length ? Math.round((solved / results.length) * 100) : 0;
    }

    // ستاره‌بندی پایان فصل (بر اساس دقت کلی + حل‌شده‌ها)
    function computeStars() {
        const totalItems = itemCount("exercise") + itemCount("challenge");
        const solved =
            session.exerciseResults.filter(Boolean).length +
            session.challengeResults.filter(Boolean).length;
        if (totalItems === 0) return 0;
        const ratio = solved / totalItems;
        if (ratio >= 0.9) return 3;
        if (ratio >= 0.65) return 2;
        if (ratio >= 0.4) return 1;
        return 0;
    }

    function finish() {
        const stars = computeStars();
        const accuracyPct = (() => {
            const total = session.exerciseResults.length + session.challengeResults.length;
            const solved =
                session.exerciseResults.filter(Boolean).length +
                session.challengeResults.filter(Boolean).length;
            return total ? Math.round((solved / total) * 100) : 0;
        })();

        const state = PB.store.update((s) => {
            const key = String(session.id);
            const existing = s.chapters[key] || {
                stars: 0, bestScore: 0, bestAccuracy: 0, xp: 0, answers: {}, replayCount: 0, completedAt: null,
            };
            existing.stars = Math.max(existing.stars, stars);
            existing.bestScore = Math.max(existing.bestScore, session.score);
            existing.bestAccuracy = Math.max(existing.bestAccuracy, accuracyPct);
            existing.xp = Math.max(existing.xp, session.xpEarned);
            existing.replayCount = (existing.replayCount || 0) + 1;

            // ذخیره‌ی پیشرفت تک‌تک تمرین/چالش‌ها (برای دستاوردها و آمار)
            if (session.exerciseResults.length || session.challengeResults.length) {
                existing.answers = existing.answers || {};
                const results = [
                    ...(PB.engine.currentItems("exercise") || []).map((it, i) => ({ item: it, solved: session.exerciseResults[i] === true, kind: "exercise" })),
                    ...(PB.engine.currentItems("challenge") || []).map((it, i) => ({ item: it, solved: session.challengeResults[i] === true, kind: "challenge" })),
                ];
                results.forEach(({ item, solved }) => {
                    if (item?.id) {
                        existing.answers[item.id] = {
                            ...(existing.answers[item.id] || {}),
                            solved: (existing.answers[item.id]?.solved) || solved,
                            quiz: item.type === "quiz",
                        };
                    }
                });
            }

            // XP و سکه فقط وقتی اضافه میشه که اولین باری که تموم شد
            const wasCompleted = existing.completedAt !== null;
            if (!existing.completedAt) existing.completedAt = new Date().toISOString();
            s.chapters[key] = existing;

            if (!wasCompleted) {
                s.stats.totalXp += session.xpEarned;
                s.stats.totalCoins += session.score - session.xpEarned + (stars * 5);
            }
        });

        // چک دستاوردها بعد از تکمیل فصل
        if (typeof PB.achievements !== "undefined" && PB.achievements.checkAll) {
            PB.achievements.checkAll();
        }

        return {
            stars,
            score: session.score,
            xp: session.xpEarned,
            accuracy: accuracyPct,
            state,
        };
    }

    return {
        startChapter,
        getChapter,
        getSession,
        resetSession,
        currentItems,
        itemCount,
        currentItem,
        recordAnswer,
        isSolved,
        wrongCount,
        useHint,
        hintCount,
        goToNext,
        accuracy,
        computeStars,
        finish,
        checkAnswer,
        feedbackFor,
        checkWriteRules,
        FeedbackError,
    };
})();

/* ============================================
   🐍 پایتون‌باز آرکید — رندرر: کدنویسی (write)
   ادیتور کوچک + اجرای شبیه‌سازی‌شده
   ============================================ */

PB.renderers = PB.renderers || {};

PB.renderers.write = (() => {
    // شبیه‌سازی اجرای کد ساده (بدون اجرای واقعی)
    // فقط برای بررسی قواعد — اجرای واقعی در مرورگر غیرامن است.
    function checkCodeRules(code, rules) {
        const feedback = [];
        let score = 0;
        let maxScore = 0;

        rules.forEach((rule) => {
            maxScore += rule.points;
            const passed = rule.check(code);
            if (passed) {
                feedback.push({ type: "success", text: rule.success });
                score += rule.points;
            } else {
                feedback.push({ type: "hint", text: rule.hint });
            }
        });

        return { score, maxScore, feedback };
    }

    function render(item, ctx) {
        const { el } = PB.utils;

        const starter = item.starter || "";
        const textarea = el("textarea", {
            class: "code-editor mono",
            rows: "7",
            dir: "ltr",
            spellcheck: "false",
            placeholder: "# کدت رو اینجا بنویس...",
        });
        if (starter) textarea.value = starter;

        const runBtn = el("button", { class: "btn btn-green", text: "▶ اجرا" });
        const outputBox = el("div", { class: "terminal-output hidden" });

        const actions = el("div", { class: "write-actions" }, [runBtn]);

        runBtn.addEventListener("click", () => {
            const code = textarea.value;
            const result = checkCodeRules(code, item.accepts || []);
            outputBox.classList.remove("hidden");
            if (result.feedback.some((f) => f.type === "hint")) {
                outputBox.classList.add("output-error");
            } else {
                outputBox.classList.remove("output-error");
            }
            outputBox.innerHTML = result.feedback
                .map((f) => `<span class="fb-${f.type}">${f.type === "success" ? "✓" : "💡"} ${f.text}</span>`)
                .join("<br>") + `<br><span class="out-score">امتیاز: ${PB.utils.toFa(result.score)} از ${PB.utils.toFa(result.maxScore)}</span>`;
            PB.sound.click();
        });

        const wrap = el("div", { class: "write-wrap" }, [
            el("label", { class: "field-label", text: "کدت رو بنویس و اجرا کن:" }),
            textarea,
            actions,
            outputBox,
        ]);

        return {
            container: wrap,
            value: () => textarea.value,
            setValue: (v) => (textarea.value = v),
            getOutput: () => outputBox,
        };
    }

    return { render };
})();

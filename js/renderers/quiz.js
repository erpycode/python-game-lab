/* ============================================
   🐍 پایتون‌باز آرکید — رندرر: چندگزینه‌ای
   ============================================ */

PB.renderers = PB.renderers || {};

PB.renderers.quiz = (() => {
    function render(item, ctx) {
        const { el, shuffleArray } = PB.utils;
        const shuffled = shuffleArray(item.options);
        let selected = null;

        const options = el("div", { class: "quiz-options" });

        shuffled.forEach((option) => {
            const btn = el("button", { class: "quiz-option" }, [
                el("span", { class: "quiz-option-label", text: option.label }),
                el("span", { class: "quiz-option-text", text: option.text }),
            ]);
            btn.addEventListener("click", () => {
                selected = option.label;
                options.querySelectorAll(".quiz-option").forEach((b) => b.classList.remove("selected"));
                btn.classList.add("selected");
                PB.sound.click();
            });
            options.appendChild(btn);
        });

        const checkBtn = el("button", { class: "btn btn-primary btn-block", text: "بررسی ✓" });
        checkBtn.addEventListener("click", () => ctx.onCheck(selected));

        const wrap = el("div", { class: "quiz-wrap" }, [
            el("label", { class: "field-label", text: "گزینه‌ی درست رو انتخاب کن:" }),
            options,
            checkBtn,
        ]);

        return {
            container: wrap,
            value: () => selected,
        };
    }

    return { render };
})();

/* ============================================
   🐍 پایتون‌باز آرکید — رندرر: پیش‌بینی خروجی
   ============================================ */

// قرارداد رندررها:
// render(item, ctx) → { container (Node), value() → جواب کاربر, }
// ctx: { kind: 'exercise'|'challenge', index, chapterId, engine, ui }

PB.renderers = PB.renderers || {};

PB.renderers.predict = (() => {
    function render(item, ctx) {
        const { el } = PB.utils;
        const input = el("input", {
            class: "challenge-input mono",
            type: "text",
            placeholder: "خروجی رو اینجا بنویس...",
            autocomplete: "off",
            spellcheck: "false",
            dir: "ltr",
        });

        const checkBtn = el("button", { class: "btn btn-primary btn-block", text: "بررسی ✓" });

        const wrap = el("div", { class: "predict-wrap" }, [
            el("label", { class: "field-label", text: "خروجی این کد چیه؟" }),
            input,
            checkBtn,
        ]);

        checkBtn.addEventListener("click", () => ctx.onCheck(input.value));
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") ctx.onCheck(input.value);
        });

        return {
            container: wrap,
            value: () => input.value.trim(),
        };
    }

    return { render };
})();

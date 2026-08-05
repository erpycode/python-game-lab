/* ============================================
   🐍 پایتون‌باز آرکید — رندرر: جای خالی
   ============================================ */

PB.renderers = PB.renderers || {};

PB.renderers.fill = (() => {
    // جای خالی ___ در کد → input
    function buildCodeWithInputs(code) {
        let gapIndex = 0;
        const parts = [];
        const escaped = PB.utils.escapeHtml(code);
        const tokens = escaped.split(/(_{3,})/g);

        tokens.forEach((tok) => {
            if (/_{3,}/.test(tok)) {
                const input = document.createElement("input");
                input.className = "gap-input mono";
                input.type = "text";
                input.placeholder = "؟";
                input.autocomplete = "off";
                input.spellcheck = false;
                input.dataset.gap = gapIndex++;
                parts.push(input);
            } else {
                parts.push(document.createTextNode(tok));
            }
        });

        const pre = document.createElement("pre");
        parts.forEach((p) => pre.appendChild(p));
        return { pre, gapIndex };
    }

    function render(item, ctx) {
        const { el } = PB.utils;
        const { pre, gapIndex } = buildCodeWithInputs(item.code);

        const codeBlock = el("div", { class: "code-block code-block-interactive" }, [pre]);

        const checkBtn = el("button", { class: "btn btn-primary btn-block", text: "بررسی ✓" });

        const wrap = el("div", { class: "fill-wrap" }, [
            el("label", { class: "field-label", text: "جاهای خالی رو پر کن:" }),
            codeBlock,
            checkBtn,
        ]);

        checkBtn.addEventListener("click", () => ctx.onCheck());

        function getValues() {
            const inputs = pre.querySelectorAll("input.gap-input");
            return Array.from(inputs).map((i) => i.value.trim());
        }

        return {
            container: wrap,
            value: () => getValues(),
            inputNodes: () => pre.querySelectorAll("input.gap-input"),
            gapIndex,
        };
    }

    return { render };
})();

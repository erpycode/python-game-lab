/* ============================================
   🐍 پایتون‌باز آرکید — رندرر: شکار باگ
   ============================================ */

PB.renderers = PB.renderers || {};

PB.renderers.bug = (() => {
    function render(item, ctx) {
        const { el, escapeHtml } = PB.utils;
        const lines = (item.code || "").split("\n");
        let selectedLine = null;

        const list = el("div", { class: "bug-lines" });

        lines.forEach((line, i) => {
            const lineNum = i + 1;
            const btn = el("button", {
                class: "bug-line",
                "data-line": lineNum,
                dir: "ltr",
            }, [
                el("span", { class: "bug-line-num", text: PB.utils.toFa(lineNum) }),
                el("span", { class: "bug-line-code mono", html: escapeHtml(line) }),
            ]);

            btn.addEventListener("click", () => {
                selectedLine = lineNum;
                list.querySelectorAll(".bug-line").forEach((b) => b.classList.remove("selected"));
                btn.classList.add("selected");
                PB.sound.click();
            });

            list.appendChild(btn);
        });

        const checkBtn = el("button", { class: "btn btn-primary btn-block", text: "بررسی ✓" });
        checkBtn.addEventListener("click", () => ctx.onCheck(selectedLine));

        const wrap = el("div", { class: "bug-wrap" }, [
            el("label", { class: "field-label", text: "کدوم خط خطا داره؟ روی خط بزن:" }),
            list,
            checkBtn,
        ]);

        return {
            container: wrap,
            value: () => selectedLine,
            lines: () => lines,
        };
    }

    return { render };
})();

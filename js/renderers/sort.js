/* ============================================
   🐍 پایتون‌باز آرکید — رندرر: مرتب‌سازی
   drag & drop + tap-to-swap برای موبایل
   ============================================ */

PB.renderers = PB.renderers || {};

PB.renderers.sort = (() => {
    function render(item, ctx) {
        const { el, shuffleArray, escapeHtml } = PB.utils;
        const correct = item.correct_order;
        let lines = shuffleArray(correct);
        let swapFrom = null; // برای tap-to-swap

        const container = el("div", { class: "sort-items" });

        function rebuild() {
            container.innerHTML = "";
            lines.forEach((line, i) => {
                const itemNode = el("div", {
                    class: "sort-item",
                    draggable: "true",
                    dir: "ltr",
                }, [
                    el("span", { class: "drag-handle", text: "⋮⋮" }),
                    el("span", { class: "sort-item-text mono", html: escapeHtml(line) }),
                ]);

                itemNode.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", String(i));
                    itemNode.classList.add("dragging");
                    // اگه قبلاً با کلیک swap-source انتخاب شده بود، موقع کشیدن پاکش کن
                    container.querySelectorAll(".swap-source").forEach((n) => n.classList.remove("swap-source"));
                    swapFrom = null;
                });
                itemNode.addEventListener("dragend", () => {
                    itemNode.classList.remove("dragging");
                });
                itemNode.addEventListener("dragover", (e) => e.preventDefault());
                itemNode.addEventListener("drop", (e) => {
                    e.preventDefault();
                    const from = parseInt(e.dataTransfer.getData("text/plain"), 10);
                    if (from === i) return;
                    const [moved] = lines.splice(from, 1);
                    lines.splice(i, 0, moved);
                    rebuild();
                });

                // tap-to-swap برای موبایل/اکسسوری
                itemNode.addEventListener("click", () => {
                    if (swapFrom === null) {
                        swapFrom = i;
                        itemNode.classList.add("swap-source");
                    } else if (swapFrom === i) {
                        swapFrom = null;
                        itemNode.classList.remove("swap-source");
                    } else {
                        [lines[swapFrom], lines[i]] = [lines[i], lines[swapFrom]];
                        swapFrom = null;
                        rebuild();
                    }
                });

                container.appendChild(itemNode);
            });
        }
        rebuild();

        const hint = el("div", { class: "text-muted", style: "font-size: 0.8rem; margin-bottom: 8px;", text: "با کشیدن (یا زدن روی دو خط) مرتب کن:" });
        const checkBtn = el("button", { class: "btn btn-primary btn-block", text: "بررسی ✓" });
        checkBtn.addEventListener("click", () => ctx.onCheck(lines));

        const wrap = el("div", { class: "sort-wrap" }, [hint, container, checkBtn]);

        return {
            container: wrap,
            value: () => lines,
            correct: () => correct,
        };
    }

    return { render };
})();

/* ============================================
   🐍 پایتون‌باز آرکید — رندرهای مشترک UI
   ============================================ */

PB.ui = (() => {
    const { el } = PB.utils;

    // ============ کدبلاک ============
    function codeBlock(code) {
        return el("div", { class: "code-block" }, [
            el("pre", { html: PB.utils.highlightPython(code) }),
        ]);
    }

    // ============ ترمینال فیک ============
    function fakeTerminal(title = "terminal", lines = [], opts = {}) {
        const { runButton = false, onRun = null } = opts;
        const body = el("div", { class: "term-body" }, lines.map((l) =>
            el("div", { class: "term-line", html: l })
        ));

        const term = el("div", { class: "fake-terminal" }, [
            el("div", { class: "term-head" }, [
                el("span", { class: "term-dot dot-red" }),
                el("span", { class: "term-dot dot-yellow" }),
                el("span", { class: "term-dot dot-green" }),
                el("span", { class: "term-title", text: title }),
            ]),
            body,
        ]);

        if (runButton && onRun) {
            const btn = el("button", { class: "btn btn-green btn-sm term-run" }, ["▶ RUN"]);
            btn.addEventListener("click", onRun);
            term.appendChild(btn);
        }
        return term;
    }

    // ============ نوار پیشرفت ============
    function progressBar(percent, opts = {}) {
        const { color = "", label = "" } = opts;
        const fill = el("div", {
            class: `progress-fill ${color === "green" ? "progress-fill-green" : color === "purple" ? "progress-fill-purple" : ""}`,
            style: `width: ${PB.utils.clamp(percent, 0, 100)}%`,
        });
        const bar = el("div", { class: "progress-track" }, [fill]);
        if (label) {
            return el("div", { class: "progress-with-label" }, [
                el("div", { class: "progress-label", text: label }),
                bar,
            ]);
        }
        return bar;
    }

    // ============ ستاره‌ها ============
    function stars(count, max = 3, colorClass = "") {
        const container = el("div", { class: "stars" });
        for (let i = 1; i <= max; i++) {
            const lit = i <= count;
            container.appendChild(
                el("span", { class: `star ${lit ? "lit" : ""} ${lit ? colorClass : ""}`, text: "★" })
            );
        }
        return container;
    }

    // ============ بج ============
    function badge(text, color = "ghost") {
        return el("span", { class: `badge badge-${color}`, text });
    }

    // ============ قلب (انرژی) ============
    function hearts(count, max = PB.game.MAX_ENERGY) {
        const container = el("div", { class: "hearts", title: `${PB.utils.toFa(count)}/${PB.utils.toFa(max)} انرژی` });
        for (let i = 1; i <= max; i++) {
            container.appendChild(
                el("span", { class: `heart ${i <= count ? "filled" : ""}`, text: "❤" })
            );
        }
        return container;
    }

    // ============ مودال ============
    function openModal({ title = "", content = null, large = false, onClose = null }) {
        const root = document.getElementById("modal-root");
        root.innerHTML = "";

        const closeBtn = el("button", { class: "modal-close", text: "✕", "aria-label": "بستن" });
        closeBtn.addEventListener("click", close);

        const modal = el("div", { class: `modal ${large ? "modal-lg" : ""}` }, [
            el("div", { class: "modal-header" }, [
                el("h3", { text: title }),
                closeBtn,
            ]),
            el("div", { class: "modal-body" }, [content]),
        ]);

        const overlay = el("div", { class: "modal-overlay" }, [modal]);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
        });

        root.appendChild(overlay);

        function close() {
            root.innerHTML = "";
            if (onClose) onClose();
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && root.innerHTML) close();
        }, { once: true });

        return { close };
    }

    // ============ توست ============
    function toast(message, type = "info") {
        PB.utils.toast(message, type);
    }

    // ============ شیک ============
    function shakeElement(node) {
        node.classList.add("anim-shake");
        setTimeout(() => node.classList.remove("anim-shake"), 500);
    }

    function glowElement(node, className = "glow-box") {
        node.classList.add(className);
        setTimeout(() => node.classList.remove(className), 800);
    }

    // ============ هدر صفحه ============
    function pageHeader({ title, subtitle = "", actions = [] }) {
        const actionsWrap = el("div", { class: "page-header-actions" }, actions);
        const left = el("div", {}, [
            el("h1", { text: title }),
            subtitle ? el("div", { class: "text-muted", style: "font-size: 0.82rem;", text: subtitle }) : null,
        ].filter(Boolean));
        return el("div", { class: "page-header" }, [left, actionsWrap]);
    }

    // ============ هدر با بک ============
    function backButton(label = "بازگشت", path = "#/map") {
        const btn = el("button", { class: "btn btn-ghost btn-sm" }, [label]);
        btn.addEventListener("click", () => (window.location.hash = path));
        return btn;
    }

    // ============ رندر صفحه اصلی ============
    function renderApp(children) {
        const app = document.getElementById("app");
        app.innerHTML = "";
        // پاک کردن فاب‌های قبلی (فقط صفحه اصلی فاب داره)
        document.querySelectorAll(".fab").forEach((n) => n.remove());
        const container = el("div", { class: "container" }, children);
        app.appendChild(container);
        return container;
    }

    // پاک کردن کامل app (شامل nav و fabs) قبل از رندر جدید
    function resetApp() {
        const app = document.getElementById("app");
        app.innerHTML = "";
        return app;
    }

    // ============ تایمر ============
    function startTimer(seconds, onTick, onEnd) {
        let remaining = seconds;
        const interval = setInterval(() => {
            remaining--;
            if (remaining <= 0) {
                clearInterval(interval);
                onEnd && onEnd();
            } else {
                onTick && onTick(remaining);
            }
        }, 1000);
        return {
            stop() { clearInterval(interval); },
            get remaining() { return remaining; },
        };
    }

    return {
        codeBlock,
        fakeTerminal,
        progressBar,
        stars,
        badge,
        hearts,
        openModal,
        toast,
        shakeElement,
        glowElement,
        pageHeader,
        backButton,
        renderApp,
        startTimer,
        // پراکسی به utils
        showConfetti: () => PB.utils.showConfetti(),
        showLoading: () => PB.utils.showLoading(),
        hideLoading: () => PB.utils.hideLoading(),
    };
})();

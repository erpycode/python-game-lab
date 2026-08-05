/* ============================================
   🐍 پایتون‌باز آرکید — تم
   ============================================ */

PB.theme = (() => {
    function current() {
        const state = PB.store.get();
        return state.settings.theme === "light" ? "light" : "dark";
    }

    function apply(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem(PB.store.THEME_KEY, theme);
        } catch (_) { /* ignore */ }
    }

    function toggle() {
        const next = current() === "dark" ? "light" : "dark";
        apply(next);
        // همزمان در store هم ذخیره کن
        PB.store.update((s) => {
            s.settings.theme = next;
        });
        return next;
    }

    function init() {
        // اول از localStorage اختصاصی، بعد از store
        let theme = null;
        try {
            theme = localStorage.getItem(PB.store.THEME_KEY);
        } catch (_) { /* ignore */ }
        if (!theme) {
            theme = PB.store.get().settings.theme;
        }
        apply(theme === "light" ? "light" : "dark");
    }

    return { current, apply, toggle, init };
})();

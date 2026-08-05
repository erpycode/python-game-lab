/* ============================================
   🐍 پایتون‌باز آرکید — روتینگ (هش)
   ============================================ */

PB.router = (() => {
    const routes = {};

    // مسیرهای: #/home، #/map، #/chapter/{id}/lesson، #/chapter/{id}/exercises،
    // #/chapter/{id}/challenges، #/chapter/{id}/result، #/profile، #/settings
    function register(pattern, handler) {
        routes[pattern] = handler;
    }

    function parse(hash) {
        return (hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    }

    function resolve(parts) {
        const [p0, p1, p2] = parts;

        if (!p0) return { name: "home", params: {} };
        if (p0 === "map") return { name: "map", params: {} };
        if (p0 === "profile") return { name: "profile", params: {} };
        if (p0 === "settings") return { name: "settings", params: {} };
        if (p0 === "chapter" && p1) {
            const id = parseInt(PB.utils.toEn(p1), 10);
            const section = p2 || "lesson";
            if (["lesson", "exercises", "challenges", "result"].includes(section)) {
                return { name: `chapter:${section}`, params: { id } };
            }
            return { name: "chapter:lesson", params: { id } };
        }
        return { name: "home", params: {} };
    }

    function currentPath() {
        return window.location.hash;
    }

    function navigate(path) {
        window.location.hash = path;
    }

    function handle() {
        const route = resolve(parse(window.location.hash));
        const handler = routes[route.name];
        if (handler) {
            PB.engine?.resetSession();
            handler(route.params);
        } else {
            PB.views?.renderNotFound?.();
        }
    }

    function init() {
        window.addEventListener("hashchange", handle);
        // مسیر اولیه
        if (!window.location.hash) {
            window.location.hash = "#/home";
        } else {
            handle();
        }
    }

    return { register, navigate, currentPath, init, parse, resolve, handle };
})();

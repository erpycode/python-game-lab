/* ============================================
   🐍 پایتون‌باز آرکید — تنظیمات
   ============================================ */

PB.views = PB.views || {};

PB.views.settings = (() => {
    function render(params) {
        const { el } = PB.utils;
        const state = PB.store.get();

        const header = PB.ui.pageHeader({
            title: "⚙️ تنظیمات",
            actions: [PB.ui.backButton("بازگشت", "#/profile")],
        });

        const sound = state.settings.sound !== false;
        const theme = state.settings.theme;

        const card = el("div", { class: "card card-pad" }, [
            settingRow("🔊 صدا", "افکت‌های صوتی بازی", toggleSwitch(sound, (v) => {
                PB.sound.setEnabled(v);
                PB.ui.toast(v ? "صدا روشن شد 🔊" : "صدا خاموش شد 🔇", "info");
            })),
            settingRow("🌙 حالت تاریک", "ظاهر شبانه", toggleSwitch(theme === "dark", (v) => {
                PB.theme.apply(v ? "dark" : "light");
                PB.store.update((s) => { s.settings.theme = v ? "dark" : "light"; });
                PB.ui.toast(v ? "حالت شب 🌙" : "حالت روز ☀️", "info");
            })),
            settingRow("👤 نام کاربری", "اسمی که توی بازی نمایش داده میشه", (() => {
                const input = el("input", { type: "text", value: state.username || "", placeholder: "اسمت...", maxlength: "20" });
                input.style.width = "140px";
                input.addEventListener("change", () => {
                    PB.store.update((s) => { s.username = input.value.trim() || s.username; });
                    PB.ui.toast("نام ذخیره شد!", "success");
                });
                return input;
            })()),
        ]);

        const container = PB.ui.renderApp([header, card]);
        container.classList.add("page-settings");

        PB.views.home.renderBottomNav("profile");
    }

    function settingRow(label, desc, control) {
        const { el } = PB.utils;
        return el("div", { class: "setting-row" }, [
            el("div", {}, [
                el("div", { class: "setting-label", text: label }),
                el("div", { class: "setting-desc text-muted", text: desc }),
            ]),
            control,
        ]);
    }

    function toggleSwitch(initial, onChange) {
        const { el } = PB.utils;
        const btn = el("button", { class: `toggle ${initial ? "on" : ""}`, "aria-label": "تغییر وضعیت" }, [
            el("span", { class: "toggle-knob" }),
        ]);
        btn.addEventListener("click", () => {
            const on = btn.classList.toggle("on");
            onChange(on);
            PB.sound.click();
        });
        return btn;
    }

    return { render };
})();

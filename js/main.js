/* ============================================
   🐍 پایتون‌باز آرکید — نقطه ورود
   ============================================ */

(function init() {
    // ترتیب مهم: store → theme → sound → catalog → router → engine
    PB.store.load();        // آماده‌سازی state (شامل مایگریشن)
    PB.theme.init();
    PB.sound.init();

    // رجیستر مسیرها
    PB.router.register("home", (p) => PB.views.home.render(p));
    PB.router.register("map", (p) => PB.views.map.render(p));
    PB.router.register("chapter:lesson", (p) => PB.views.lesson.render(p));
    PB.router.register("chapter:exercises", (p) => PB.views.exercises.render(p));
    PB.router.register("chapter:challenges", (p) => PB.views.challenges.render(p));
    PB.router.register("chapter:result", (p) => PB.views.result.render(p));
    PB.router.register("profile", (p) => PB.views.profile.render(p));
    PB.router.register("settings", (p) => PB.views.settings.render(p));

    // رندر پیش‌فرض (اگه مسیر شناخته‌شده نبود)
    PB.views.renderNotFound = () => {
        PB.views.home.render({});
        PB.ui.toast("صفحه پیدا نشد! به خانه برگشتی 🏠", "warning");
    };

    // رویداد کلیک سراسری برای فعال کردن AudioContext
    document.addEventListener("pointerdown", () => PB.sound.unlock(), { once: true });

    // شروع
    PB.router.init();

    // چک دستاوردها در شروع
    setTimeout(() => PB.achievements.checkAll(), 800);

    // اتصال به کلیک گوشه‌ها
    console.log("🐍 پایتون‌باز آرکید راه‌اندازی شد!");
})();

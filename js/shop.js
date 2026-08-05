/* ============================================
   🐍 پایتون‌باز آرکید — فروشگاه
   ============================================ */

PB.shop = (() => {
    function showModal() {
        const { el } = PB.utils;
        const items = PB.game.getShopItems();
        const coins = PB.game.getCoins();

        const grid = el("div", { class: "shop-grid" });

        items.forEach((item) => {
            const owned = PB.game.isOwned(item.id);

            const buyBtn = el("button", { class: `btn ${owned ? "btn-ghost" : "btn-primary"} btn-block btn-sm`, text: owned ? "خریداری شده ✓" : `🪙 ${PB.utils.formatNumber(item.price)}` });
            buyBtn.disabled = owned;

            buyBtn.addEventListener("click", () => {
                if (owned) return;
                const result = PB.game.buyItem(item.id);
                if (result.ok) {
                    PB.ui.toast(`خرید شد: ${item.name}!`, "success");
                    buyBtn.disabled = true;
                    buyBtn.textContent = "خریداری شده ✓";
                    buyBtn.className = "btn btn-ghost btn-block btn-sm";
                    // آپدیت سکه‌ها در UI
                    const coinDisplay = grid.parentElement?.querySelector(".shop-coins");
                    if (coinDisplay) coinDisplay.textContent = `🪙 ${PB.utils.formatNumber(PB.game.getCoins())}`;
                    PB.achievements.checkAll();
                } else if (result.reason === "no_coins") {
                    PB.ui.toast("سکه کافی نداری! بیشتر بازی کن 🪙", "error");
                }
            });

            const card = el("div", { class: `shop-item card card-pad ${owned ? "owned" : ""}` }, [
                el("div", { class: "shop-item-emoji", text: item.emoji }),
                el("div", { class: "shop-item-name", text: item.name }),
                el("div", { class: "shop-item-desc text-muted", text: item.desc }),
                buyBtn,
            ]);
            grid.appendChild(card);
        });

        const coinBar = el("div", { class: "shop-coins badge badge-yellow", text: `🪙 ${PB.utils.formatNumber(coins)}` });

        PB.ui.openModal({
            title: "🛒 فروشگاه آیتم‌ها",
            content: el("div", { class: "shop-content" }, [
                coinBar,
                grid,
            ]),
            large: true,
        });
    }

    return { showModal };
})();

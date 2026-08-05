/* ============================================
   🐍 پایتون‌باز آرکید — واژه‌نامه
   ============================================ */

PB.glossary = (() => {
    const TERMS = [
        { term: "Variable", fa: "متغیر", desc: "جعبه‌ای برای نگه‌داری مقدار" },
        { term: "Integer", fa: "عدد صحیح", desc: "مثل 5، -3، 100" },
        { term: "Float", fa: "عدد اعشاری", desc: "مثل 3.14، 2.0" },
        { term: "String", fa: "رشته", desc: "متن داخل نقل‌قول، مثل 'سلام'" },
        { term: "Boolean", fa: "بولین", desc: "فقط True یا False" },
        { term: "Function", fa: "تابع", desc: "بلاک کد قابل استفاده مجدد با def" },
        { term: "Parameter", fa: "پارامتر", desc: "ورودی تابع" },
        { term: "Argument", fa: "آرگومان", desc: "مقداری که به تابع داده میشه" },
        { term: "Return", fa: "برگرداندن", desc: "مقداری که تابع برمی‌گردونه" },
        { term: "List", fa: "لیست", desc: "مجموعه مرتب با []" },
        { term: "Dictionary", fa: "دیکشنری", desc: "کلید-مقدار با {}" },
        { term: "Tuple", fa: "تاپل", desc: "مجموعه تغییرناپذیر با ()" },
        { term: "Set", fa: "ست", desc: "مجموعه بدون تکرار" },
        { term: "Loop", fa: "حلقه", desc: "تکرار کد با for یا while" },
        { term: "Conditional", fa: "شرط", desc: "if / elif / else" },
        { term: "Operator", fa: "عملگر", desc: "+ - * / = == و..." },
        { term: "Module", fa: "ماژول", desc: "فایل پایتون قابل import" },
        { term: "Package", fa: "پکیج", desc: "مجموعه ماژول‌ها" },
        { term: "Import", fa: "وارد کردن", desc: "آوردن کد از جای دیگه" },
        { term: "Class", fa: "کلاس", desc: "قالب برای ساختن آبجکت" },
        { term: "Object", fa: "آبجکت", desc: "نمونه‌ای از کلاس" },
        { term: "Method", fa: "متد", desc: "تابع مربوط به یک آبجکت" },
        { term: "Exception", fa: "استثنا", desc: "خطایی که برنامه رو متوقف می‌کنه" },
        { term: "Try/Except", fa: "تلاش/گرفتن", desc: "مدیریت خطا" },
        { term: "Yield", fa: "واگذاری", desc: "مقداردهی گام‌به‌گام در جنریتور" },
        { term: "Decorator", fa: "دکوراتور", desc: "تزئین تابع با @" },
        { term: "Lambda", fa: "لامبدا", desc: "تابع یک‌خطی ناشناس" },
        { term: "Comprehension", fa: "کامپریهنشن", desc: "ساخت لیست/دیکشنری در یک خط" },
        { term: "Recursion", fa: "بازگشت", desc: "فراخوانی تابع از خودش" },
        { term: "Bug", fa: "باگ", desc: "خطای پنهان در کد" },
        { term: "Debug", fa: "اشکال‌زدایی", desc: "پیدا کردن و رفع باگ" },
        { term: "Syntax", fa: "نحو", desc: "قوانین نوشتن کد" },
        { term: "Indentation", fa: "تورفتگی", desc: "فاصله شروع بلاک‌ها" },
        { term: "Comment", fa: "کامنت", desc: "توضیح داخل کد با #" },
        { term: "f-string", fa: "اف-رشته", desc: "قالب‌بندی متن با f'...'" },
        { term: "API", fa: "ای‌پی‌آی", desc: "رابط ارتباطی بین برنامه‌ها" },
        { term: "JSON", fa: "جی‌سان", desc: "فرمت تبادل داده" },
        { term: "Pip", fa: "پایپ", desc: "مدیر نصب پکیج‌ها" },
        { term: "Virtualenv", fa: "محیط مجازی", desc: "فضای ایزوله برای پروژه" },
        { term: "Test", fa: "تست", desc: "بررسی خودکار درستی کد" },
    ];

    function open() {
        const { el } = PB.utils;
        const search = el("input", {
            type: "text",
            placeholder: "جستجوی واژه...",
            class: "glossary-search",
        });

        const list = el("div", { class: "glossary-list" });

        function renderList(query = "") {
            list.innerHTML = "";
            const q = query.trim().toLowerCase();
            TERMS.filter((t) =>
                !q || t.term.toLowerCase().includes(q) || t.fa.includes(q) || t.desc.includes(q)
            ).forEach((t) => {
                list.appendChild(el("div", { class: "glossary-item" }, [
                    el("div", { class: "glossary-term mono", text: t.term }),
                    el("div", { class: "glossary-fa", text: t.fa }),
                    el("div", { class: "glossary-desc text-muted", text: t.desc }),
                ]));
            });
            if (!list.children.length) {
                list.appendChild(el("div", { class: "empty-state", text: "چیزی پیدا نشد 🔍" }));
            }
        }

        renderList();
        search.addEventListener("input", () => renderList(search.value));

        PB.ui.openModal({
            title: `📖 واژه‌نامه پایتون (${PB.utils.toFa(TERMS.length)} واژه)`,
            content: el("div", {}, [search, list]),
            large: true,
        });
    }

    return { open, TERMS };
})();

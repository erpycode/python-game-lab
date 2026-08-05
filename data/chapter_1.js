PB.registerChapter({
    version: 2,
    id: 1,
    title: "متغیرها",
    level: "beginner",
    lesson: {
        title: "متغیرها — جعبه‌های ذخیره‌سازی",
        intro: "توی پایتون، متغیر مثل یه جعبه‌ست که می‌تونی چیزی توش بذاری. هر جعبه یه اسم داره؛ با همون اسم بعداً می‌تونی بهش دسترسی داشته باشی. فرق پایتون با خیلی از زبان‌ها اینه که تو برای ساختن متغیر هیچ کار اضافه‌ای نمی‌کنی — فقط اسم و مقدار رو با = کنار هم می‌ذاری.",
        sections: [
            {
                icon: "📦",
                title: "ساخت متغیر",
                text: "برای ساختن متغیر کافیه بنویسی: اسم = مقدار\n\nمثلاً:\nname = 'Ali'  یعنی جعبه‌ای به اسم name ساختی که مقدار 'Ali' داخلشه.\n\n⚠️ قانون‌های اسم گذاری:\n• اسم باید با حرف یا _ شروع بشه (با عدد شروع نشه)\n• از فاصله توی اسم استفاده نکن (my_name درسته، my name غلطه)\n• پایتون به بزرگی و کوچکی حساسه: Name و name دو تا متغیر جدا هستن",
                code: "name = 'Ali'\nage = 25\nheight = 1.80\nis_student = True",
                output: ""
            },
            {
                icon: "🖨️",
                title: "نمایش با print",
                text: "دستور print مقدار یک متغیر رو روی صفحه نشون می‌ده. این دستور مهم‌ترین ابزار تو برای دیدن نتیجه‌ی کدهات هست.",
                code: "name = 'عرفان'\nprint(name)\n\nage = 25\nprint(age)",
                output: "عرفان\n25"
            },
            {
                icon: "🧬",
                title: "انواع داده",
                text: "پایتون چند نوع داده‌ی اصلی داره:\n\n• int — عدد صحیح: 5, -3, 100\n• float — عدد اعشاری: 3.14, -0.5\n• str — رشته (متن): 'سلام', \"Python\"\n• bool — درست/غلط: فقط True یا False\n\nبا type() می‌تونی نوع هر متغیر رو ببینی.",
                code: "age = 25\npi = 3.14\nname = 'Ali'\nis_happy = True\n\nprint(type(age))\nprint(type(pi))\nprint(type(name))\nprint(type(is_happy))",
                output: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>"
            },
            {
                icon: "✏️",
                title: "تغییر مقدار و متغیر از روی متغیر",
                text: "مقدار یک متغیر رو هر وقت خواستی می‌تونی عوض کنی. حتی می‌تونی یک متغیر رو بر اساس متغیر دیگه‌ای بسازی:\n\nx = 5\nx = 10  ← الان x برابر 10 شده\n\nیا:\na = 3\nb = a * 2  ← b برابر 6 میشه\n\nنکته: وقتی از = استفاده می‌کنی، سمت راست اول حساب می‌شه، بعد توی سمت چپ ذخیره می‌شه.",
                code: "x = 5\nx = 10\nprint(x)\n\na = 3\nb = a * 2\nprint(b)",
                output: "10\n6"
            },
            {
                icon: "⚠️",
                title: "خطاهای رایج",
                text: "سه خطای پرتکرار مبتدی‌ها:\n\n1) استفاده از متغیر تعریف‌نشده → NameError\n2) فاصله توی اسم → SyntaxError\n3) شروع با عدد → SyntaxError\n\nاین خطاها رو می‌تونی توی چالش‌ها شکار کنی!",
                code: "my_name = 'Ali'\nprint(my_name)\n\n# خطای بعدی رو اجرا نکن!\n# 5x = 10  ← خطا\n# my name = 'Ali'  ← خطا",
                output: "Ali"
            }
        ],
        tips: [
            "نام متغیرها رو کوتاه و معنادار انتخاب کن (age، name، total).",
            "برای نام‌های چندکلمه‌ای از _ استفاده کن: my_phone_number.",
            "مقدار عدد صحیح 25 و رشته '25' فرق دارن!",
        ]
    },
    exercises: [
        {
            id: "ch1_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "x = 7\nprint(x)",
            answer: "7",
            hint: "فقط مقدار x چاپ شده",
            hints: ["x رو تعریف کردی و مقدارش ۷ه", "print چیزی جز مقدار x نشون نمی‌ده"],
            explanation: "متغیر x مقدار 7 داره و print(x) همون 7 رو چاپ می‌کنه."
        },
        {
            id: "ch1_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "name = 'سارا'\nprint(name)",
            answer: "سارا",
            hint: "نامت همیشه با همون علامت‌ها چاپ می‌شه",
            hints: ["name یه رشته‌ست", "خروجی رشته بدون علامت نقل‌قول نمایش داده می‌شه"],
            explanation: "متغیر name مقدار 'سارا' داره و print همون متن رو بدون علامت نقل‌قول نشون می‌ده."
        },
        {
            id: "ch1_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "a = 4\nb = 5\nresult = a + b\nprint(result)",
            answer: "9",
            hint: "اول حساب کن بعد چاپ کن",
            hints: ["a + b چنده؟", "4 + 5 = ؟"],
            explanation: "result مقدار 4 + 5 یعنی 9 رو می‌گیره و print همون 9 رو نشون می‌ده."
        },
        {
            id: "ch1_e4",
            type: "quiz",
            title: "نوع داده‌ی این متغیر چیه؟",
            code: "score = 100",
            options: [
                { label: "a", text: "int" },
                { label: "b", text: "str" },
                { label: "c", text: "float" },
                { label: "d", text: "bool" }
            ],
            correct: "a",
            hint: "100 عدد صحیحه",
            hints: ["عدد بدون علامت نقل‌قول → عدد صحیح", "int مخفف integer هست"],
            explanation: "100 یک عدد صحیح بدون علامت نقل‌قوله، پس نوعش int هست."
        },
        {
            id: "ch1_e5",
            type: "quiz",
            title: "نوع داده‌ی این متغیر چیه؟",
            code: "message = \"سلام\"",
            options: [
                { label: "a", text: "int" },
                { label: "b", text: "str" },
                { label: "c", text: "float" },
                { label: "d", text: "bool" }
            ],
            correct: "b",
            hint: "داخل علامت نقل‌قوله → رشته",
            hints: ["هر چیزی داخل ' ' یا \" \" باشه، رشته‌ست", "متن‌ها همیشه str هستن"],
            explanation: "هر متنی داخل علامت نقل‌قول باشه (مثل \"سلام\") نوعش str (رشته) هست."
        },
        {
            id: "ch1_e6",
            type: "fill_gap",
            title: "کد رو کامل کن تا خروجی 15 بشه:",
            code: "x = 5\n___ = 10\nprint(x + y)",
            answer: "y",
            hint: "اسم متغیر چیه؟",
            hints: ["توی print از x + y استفاده شده", "متغیر ناشناخته y هست"],
            explanation: "print(x + y) یعنی باید متغیر y تعریف شده باشه، پس جواب y هست."
        }
    ],
    challenges: [
        {
            id: "ch1_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی کد رو حدس بزن:",
            code: "x = 10\ny = 3\nprint(x - y)",
            answer: "7",
            hint: "تفریق ساده",
            xp: 10,
            explanation: "10 منهای 3 برابر 7 میشه."
        },
        {
            id: "ch1_c2",
            type: "bug_hunter",
            difficulty: "easy",
            title: "کجای کد خطا داره؟",
            code: "my name = 'Ali'\nprint(my name)",
            error_line: 1,
            reason: "اسم متغیر نباید فاصله داشته باشه. باید my_name باشه.",
            hint: "اسم متغیر رو با دقت نگاه کن",
            xp: 15,
            explanation: "توی اسم متغیر نباید فاصله باشه. my name غلطه و باید my_name باشه."
        },
        {
            id: "ch1_c3",
            type: "fill_gap",
            difficulty: "medium",
            title: "جای خالی رو پر کن:",
            code: "score = 100\n___ = score * 2\nprint(double_score)",
            answer: "double_score",
            hint: "متغیری که توی print استفاده شده رو تعریف کن",
            xp: 15,
            explanation: "توی print از double_score استفاده شده، پس باید همون رو تعریف کنی."
        },
        {
            id: "ch1_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟ (به نوع داده دقت کن)",
            code: "a = '5'\nb = '3'\nprint(a + b)",
            answer: "53",
            hint: "این‌ها عدد نیستن، رشته‌ان!",
            xp: 20,
            explanation: "'5' و '3' رشته هستن. توی رشته‌ها + یعنی کنار هم گذاشتن، پس 53 چاپ می‌شه نه 8."
        },
        {
            id: "ch1_c5",
            type: "sort",
            difficulty: "medium",
            title: "خطوط رو مرتب کن تا خروجی 10 بشه:",
            code: "print(result)\ny = x * 2\nx = 5",
            correct_order: ["x = 5", "y = x * 2", "print(result)"],
            answer: ["x = 5", "y = x * 2", "print(result)"],
            hint: "تعریف متغیر اول، محاسبه بعد، چاپ آخر",
            xp: 20,
            explanation: "اول متغیر x، بعد محاسبه y، و آخر از result چاپ کن. (نکته: توی کد اصلی y = x * 2 هست و print(y) باید باشه)"
        }
    ],
    project: {
        id: "ch1_project",
        title: "کارت شخصی من",
        brief: "یه برنامه بنویس که با ۳ متغیر اسمت، سنت و قدت رو ذخیره کنه و همشون رو چاپ کنه.",
        accepts: [
            { check: (c) => /name\s*=|age\s*=|height\s*=/.test(c), success: "سه متغیر اصلی تعریف کردی", hint: "سه متغیر name، age و height بساز", points: 3 },
            { check: (c) => /print/.test(c), success: "از print استفاده کردی", hint: "مقدار هر متغیر رو با print نشون بده", points: 2 },
            { check: (c) => /['"].*['"]/.test(c), success: "رشته تعریف کردی", hint: "اسمت رو داخل علامت نقل‌قول بذار", points: 2 },
            { check: (c) => /print\(name\)|print\(age\)|print\(height\)/.test(c), success: "همه متغیرها رو چاپ کردی", hint: "هر ۳ متغیر رو print کن", points: 3 }
        ],
        passScore: 70
    }
});

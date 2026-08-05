PB.registerChapter({
    version: 2,
    id: 13,
    title: "دکوراتورها",
    level: "expert",
    lesson: {
        title: "دکوراتورها — تزئین توابع",
        intro: "دکوراتور راهی‌ست برای اضافه کردن رفتار به یه تابع بدون تغییر دادن خودش. مثل این‌که به یه هدیه بسته‌بندی اضافه کنی — هدیه همون هدیه‌ست ولی حالا بسته‌بندی هم داره.",
        sections: [
            {
                icon: "🎁",
                title: "تابع داخل تابع",
                text: "پایتون اجازه می‌ده تابع توی تابع تعریف کنی — به این closure می‌گن:\n\ndef outer():\n    def inner():\n        print('داخل!')\n    return inner\n\nو تابع می‌تونه تابع برگردونه یا بگیره.",
                code: "def make_multiplier(factor):\n    def multiplier(x):\n        return x * factor\n    return multiplier\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5))\nprint(triple(5))",
                output: "10\n15"
            },
            {
                icon: "✨",
                title: "ساخت دکوراتور",
                text: "دکوراتور یه تابع‌ست که تابع می‌گیره و تابع برمی‌گردونه:\n\ndef my_decorator(func):\n    def wrapper():\n        print('قبل')\n        func()\n        print('بعد')\n    return wrapper\n\nاستفاده:\n@my_decorator\ndef say_hi():\n    print('سلام')",
                code: "def shout(func):\n    def wrapper():\n        print('!***!')\n        func()\n        print('!***!')\n    return wrapper\n\n@shout\ndef hello():\n    print('سلام')\n\nhello()",
                output: "!***!\nسلام\n!***!"
            },
            {
                icon: "⏱️",
                title: "کاربرد واقعی: اندازه‌گیری زمان",
                text: "معروف‌ترین کاربرد دکوراتورها، اندازه‌گیری زمان اجراست:\n\nimport time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f'زمان: {time.time() - start}')\n        return result\n    return wrapper\n\n*args و **kwargs همه‌ی آرگومان‌ها رو می‌گیرن.",
                code: "def timer(func):\n    def wrapper(*args, **kwargs):\n        print('شروع')\n        result = func(*args, **kwargs)\n        print('پایان')\n        return result\n    return wrapper\n\n@timer\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))",
                output: "شروع\nپایان\n5"
            },
            {
                icon: "🔐",
                title: "دکوراتور ورود",
                text: "مثال: دکوراتور امنیتی که بررسی می‌کنه کاربر لاگین کرده یا نه:\n\ndef require_login(func):\n    def wrapper(*args, **kwargs):\n        if not is_logged_in():\n            print('لطفاً وارد شو')\n            return\n        return func(*args, **kwargs)\n    return wrapper",
                code: "def require_login(func):\n    def wrapper(*args, **kwargs):\n        if not logged_in:\n            print('ابتدا وارد شوید!')\n            return None\n        return func(*args, **kwargs)\n    return wrapper\n\nlogged_in = False\n\n@require_login\ndef profile():\n    print('پروفایل شما')\n\nprofile()\n\nlogged_in = True\nprofile()",
                output: "ابتدا وارد شوید!\nپروفایل شما"
            }
        ],
        tips: [
            "دکوراتور با @ قبل از تابع استفاده می‌شه.",
            "wrapper همیشه *args و **kwargs بگیره تا همه‌ی توابع کار کنن.",
            "دکوراتور برای log، احراز هویت و زمان‌سنجی عالیه.",
        ]
    },
    exercises: [
        {
            id: "ch13_e1",
            type: "quiz",
            title: "دکوراتور با چه علامتی استفاده می‌شه؟",
            code: "قبل از تعریف تابع، دکوراتور با چه علامتی میاد؟",
            options: [
                { label: "a", text: "@" },
                { label: "b", text: "#" },
                { label: "c", text: "$" },
                { label: "d", text: "%" }
            ],
            correct: "a",
            hint: "همون علامت ایمیل",
            hints: ["@my_decorator", "@"],
            explanation: "دکوراتور با @ قبل از تابع تعریف می‌شه: @my_decorator."
        },
        {
            id: "ch13_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def deco(func):\n    def wrapper():\n        print('1')\n        func()\n        print('3')\n    return wrapper\n\n@deco\ndef two():\n    print('2')\n\ntwo()",
            answer: "1\n2\n3",
            hint: "wrapper ترتیب چاپ رو تعیین می‌کنه",
            hints: ["1 قبل از تابع", "2 خود تابع", "3 بعد از تابع"],
            explanation: "wrapper اول 1 چاپ می‌کنه، بعد تابع اصلی (2)، بعد 3."
        },
        {
            id: "ch13_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def logger(func):\n    def wrapper(*args, **kwargs):\n        print('log: start')\n        result = func(*args, **kwargs)\n        print('log: end')\n        return result\n    return wrapper\n\n@logger\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))",
            answer: "log: start\nlog: end\n5",
            hint: "log قبل و بعد، بعد خود نتیجه",
            hints: ["اول log: start", "بعد log: end", "بعد 5 (خروجی add)"],
            explanation: "wrapper لاگ می‌گیره، add اجرا می‌شه (5)، لاگ پایانی، بعد 5 چاپ می‌شه."
        },
        {
            id: "ch13_e4",
            type: "fill_gap",
            title: "تابع داخلی دکوراتور چیه؟",
            code: "def deco(func):\n    def ___(*args, **kwargs):\n        print('قبل')\n        return func(*args, **kwargs)\n    return wrapper",
            answer: "wrapper",
            hint: "اسم تابع داخلی که تابع اصلی رو صدا می‌زنه",
            hints: ["wrapper یا inner", "wrapper"],
            explanation: "تابع داخلی معمولاً wrapper نامیده می‌شه که تابع اصلی رو صدا می‌زنه."
        },
        {
            id: "ch13_e5",
            type: "quiz",
            title: "wrapper چرا *args و **kwargs می‌گیره؟",
            code: "چرا wrapper باید *args و **kwargs بگیره؟",
            options: [
                { label: "a", text: "برای زیبایی" },
                { label: "b", text: "تا هر تابعی با هر پارامتری کار کنه" },
                { label: "c", text: "پایتون اجبار می‌کنه" },
                { label: "d", text: "برای سرعت" }
            ],
            correct: "b",
            hint: "دکوراتور باید عمومی باشه",
            hints: ["دکوراتور برای توابع مختلف استفاده می‌شه", "پس باید همه‌ی آرگومان‌ها رو پاس بده"],
            explanation: "*args و **kwargs همه‌ی آرگومان‌ها رو می‌گیرن تا دکوراتور روی هر تابعی کار کنه."
        },
        {
            id: "ch13_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def double(func):\n    def wrapper(x):\n        return func(x) * 2\n    return wrapper\n\n@double\ndef plus_one(x):\n    return x + 1\n\nprint(plus_one(5))",
            answer: "12",
            hint: "اول تابع، بعد دوبرابر",
            hints: ["plus_one(5) = 6", "wrapper * 2 = 12"],
            explanation: "plus_one(5) = 6، بعد wrapper جواب رو دوبرابر می‌کنه: 12."
        }
    ],
    challenges: [
        {
            id: "ch13_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "def wrap(func):\n    def inner():\n        print('سلام!')\n    return inner\n\n@wrap\ndef original():\n    print('اصلی')\n\noriginal()",
            answer: "سلام!",
            hint: "inner جایگزین original شده",
            xp: 15,
            explanation: "دکوراتور original رو با inner عوض کرده که فقط «سلام!» چاپ می‌کنه."
        },
        {
            id: "ch13_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "def deco(func):\n    def wrapper():\n        return func()\n    return wrapper\n\n@deco()\ndef hi():\n    print('سلام')",
            error_line: 6,
            reason: "@deco() با پرانتز استفاده شده در حالی که deco خودش دکوراتوره — این فراخوانی deco رو صدا می‌زنه",
            hint: "دکوراتور با پرانتز صدا زده نشده",
            xp: 20,
            explanation: "استفاده‌ی درست @deco هست بدون پرانتز. @deco() سعی می‌کنه deco رو صدا بزنه که خطا می‌ده."
        },
        {
            id: "ch13_c3",
            type: "fill_gap",
            difficulty: "medium",
            title: "دکوراتور رو کامل کن:",
            code: "def beep(func):\n    def wrapper():\n        print('📢')\n        ___ func()\n    return wrapper",
            answer: "return",
            hint: "نتیجه تابع اصلی باید برگرده",
            xp: 15,
            explanation: "wrapper باید نتیجه‌ی func رو return کنه تا رفتار اصلی حفظ بشه."
        },
        {
            id: "ch13_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "def repeat(func):\n    def wrapper(x):\n        return func(func(x))\n    return wrapper\n\n@repeat\ndef square(x):\n    return x * x\n\nprint(square(2))",
            answer: "16",
            hint: "تابع دو بار اجرا می‌شه",
            xp: 25,
            explanation: "square(square(2)) = square(4) = 16."
        },
        {
            id: "ch13_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا دکوراتور کار کنه:",
            code: "def wrapper():\n    return wrapper\n@deco\ndef deco(func):\n    def wrapper():\n        return func()\n    def hello():\n        print('سلام')",
            correct_order: ["def deco(func):", "    def wrapper():", "        return func()", "    return wrapper", "@deco", "def hello():", "    print('سلام')"],
            answer: ["def deco(func):", "    def wrapper():", "        return func()", "    return wrapper", "@deco", "def hello():", "    print('سلام')"],
            hint: "دکوراتور، wrapper، بعد استفاده",
            xp: 25,
            explanation: "اول دکوراتور با wrapper، بعد استفاده با @."
        }
    ],
    project: {
        id: "ch13_project",
        title: "دکوراتور تشویق",
        brief: "دکوراتوری بساز که قبل از هر تابع یه پیام «💪 بیا بریم!» و بعدش «🎉 تمام شد!» چاپ کنه. یه تابع ساده‌ی سلام بساز و دکوراتور رو روش استفاده کن.",
        accepts: [
            { check: (c) => /def\s+\w+\(func\)/.test(c), success: "تابع دکوراتور داری", hint: "def my_deco(func): بساز", points: 4 },
            { check: (c) => /def\s+wrapper/.test(c), success: "wrapper داری", hint: "توی دکوراتور wrapper بساز", points: 3 },
            { check: (c) => /return\s+wrapper/.test(c), success: "wrapper رو برگردوندی", hint: "return wrapper", points: 3 },
            { check: (c) => /@\w+/.test(c), success: "با @ استفاده کردی", hint: "@اسم_دکوراتور قبل تابع", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "پیام‌ها رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

PB.registerChapter({
    version: 2,
    id: 5,
    title: "توابع",
    level: "intermediate",
    lesson: {
        title: "توابع — بسته‌بندی کد",
        intro: "تا حالا کد می‌نوشتی که تکرار می‌شه؟ توابع بهت اجازه می‌دن یه بلاک کد رو یه بار بنویسی و هر وقت خواستی صداش بزنی. مثل یه ماشین که هر بار می‌تونی مواد اولیه بدی و نتیجه بگیری.",
        sections: [
            {
                icon: "🧩",
                title: "ساخت تابع با def",
                text: "ساختار تابع:\n\ndef اسم_تابع():\n    کدها\n\nبعد از def باید : بذاری و بلاک تورفتگی داره.\nبرای صدا زدن تابع: اسم_تابع()",
                code: "def greet():\n    print('سلام!')\n    print('به پایتون خوش اومدی')\n\ngreet()\ngreet()",
                output: "سلام!\nبه پایتون خوش اومدی\nسلام!\nبه پایتون خوش اومدی"
            },
            {
                icon: "🎁",
                title: "پارامتر و آرگومان",
                text: "پارامتر: متغیری که تابع تعریف می‌کنه (توی پرانتز def)\nآرگومان: مقداری که موقع صدا زدن می‌دی\n\ndef greet(name):  ← name پارامتره\n    print('سلام', name)\n\ngreet('علی')  ← 'علی' آرگومانه",
                code: "def greet(name):\n    print('سلام', name)\n\ndef add(a, b):\n    print(a + b)\n\ngreet('علی')\ngreet('سارا')\nadd(3, 5)",
                output: "سلام علی\nسلام سارا\n8"
            },
            {
                icon: "📤",
                title: "return — برگرداندن مقدار",
                text: "فرق print و return:\n\nprint فقط نمایش می‌ده.\nreturn مقدار رو به بیرون تابع می‌فرسته تا توی برنامه استفاده بشه.\n\nبعد از return، بقیه‌ی تابع اجرا نمی‌شه.",
                code: "def double(x):\n    return x * 2\n\nresult = double(5)\nprint(result)\nprint(double(10))",
                output: "10\n20"
            },
            {
                icon: "📊",
                title: "مقدار پیش‌فرض",
                text: "می‌تونی به پارامترها مقدار پیش‌فرض بدی — اگه موقع صدا زدن مقداری ندی، پیش‌فرض استفاده می‌شه:\n\ndef greet(name='مهمان'):\n    print('سلام', name)\n\ngreet()  → سلام مهمان\ngreet('Ali')  → سلام Ali",
                code: "def greet(name='مهمان'):\n    print('سلام', name)\n\ngreet()\ngreet('سارا')\ngreet(name='علی')",
                output: "سلام مهمان\nسلام سارا\nسلام علی"
            }
        ],
        tips: [
            "اسم تابع باید کارش رو توصیف کنه: calc_total، greet_user.",
            "تابع‌های کوتاه و تک‌کاره بنویس — تست‌شون راحت‌تره.",
            "return رو وقتی می‌خوای مقدار رو استفاده کنی، print رو وقتی فقط می‌خوای نشون بدی.",
        ]
    },
    exercises: [
        {
            id: "ch5_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def say_hi():\n    print('سلام!')\n\nsay_hi()",
            answer: "سلام!",
            hint: "تابع صدا زده می‌شه",
            hints: ["say_hi() تابع رو اجرا می‌کنه", "فقط print('سلام!') اجرا می‌شه"],
            explanation: "صدا زدن say_hi() باعث اجرای بلاک تابع می‌شه که «سلام!» چاپ می‌کنه."
        },
        {
            id: "ch5_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def add(a, b):\n    return a + b\n\nprint(add(4, 6))",
            answer: "10",
            hint: "return مقدار رو برمی‌گردونه",
            hints: ["add(4,6) = 10", "print مقدار برگشتی رو نشون می‌ده"],
            explanation: "add(4,6) مقدار 10 رو return می‌کنه و print همون رو چاپ می‌کنه."
        },
        {
            id: "ch5_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def cube(x):\n    return x ** 3\n\nprint(cube(3))",
            answer: "27",
            hint: "3 به توان 3",
            hints: ["3*3*3", "= 27"],
            explanation: "cube(3) یعنی 3 به توان 3 که 27 هست."
        },
        {
            id: "ch5_e4",
            type: "quiz",
            title: "بعد از return چه اتفاقی می‌افته؟",
            code: "def test():\n    print('A')\n    return 5\n    print('B')\n\ntest()",
            options: [
                { label: "a", text: "A و B هر دو چاپ می‌شن" },
                { label: "b", text: "فقط A چاپ می‌شه" },
                { label: "c", text: "فقط B چاپ می‌شه" },
                { label: "d", text: "خطا می‌ده" }
            ],
            correct: "b",
            hint: "بعد از return کدی اجرا نمی‌شه",
            hints: ["return تابع رو تموم می‌کنه", "print('B') هیچ وقت اجرا نمی‌شه"],
            explanation: "return تابع رو فوراً تموم می‌کنه، پس print('B') هرگز اجرا نمی‌شه. فقط A چاپ می‌شه."
        },
        {
            id: "ch5_e5",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def greet(name='دوست'):\n    print('سلام', name)\n\ngreet()",
            answer: "سلام دوست",
            hint: "مقدار پیش‌فرض استفاده می‌شه",
            hints: ["آرگومانی داده نشده", "پس name = 'دوست'"],
            explanation: "چون greet() بدون آرگومان صدا زده شده، مقدار پیش‌فرض «دوست» استفاده می‌شه."
        },
        {
            id: "ch5_e6",
            type: "fill_gap",
            title: "تابع رو کامل کن:",
            code: "def multiply(a, b):\n    ___ a * b\n\nprint(multiply(3, 4))",
            answer: "return",
            hint: "تا مقدار به بیرون بره",
            hints: ["باید مقدار برگردونه", "return"],
            explanation: "برای اینکه نتیجه‌ی ضرب برگرده و print بتونه چاپش کنه، باید return باشه."
        }
    ],
    challenges: [
        {
            id: "ch5_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "def square(x):\n    return x * x\n\nprint(square(7))",
            answer: "49",
            hint: "7 ضربدر 7",
            xp: 10,
            explanation: "square(7) یعنی 7*7 = 49."
        },
        {
            id: "ch5_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "def greet()\n    print('سلام')\n\ngreet()",
            error_line: 1,
            reason: "بعد از def باید دو نقطه (:) بذاری",
            hint: "پایان خط تعریف تابع",
            xp: 15,
            explanation: "بعد از def greet() باید : بذاری: def greet(): — وگرنه SyntaxError می‌گیری."
        },
        {
            id: "ch5_c3",
            type: "fill_gap",
            difficulty: "medium",
            title: "تابع رو کامل کن:",
            code: "def is_even(n):\n    ___ n % 2 == 0\n\nprint(is_even(4))\nprint(is_even(7))",
            answer: "return",
            hint: "مقدار True/False باید برگرده",
            xp: 15,
            explanation: "تابع باید نتیجه‌ی مقایسه (True/False) رو return کنه."
        },
        {
            id: "ch5_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "def area(length, width):\n    return length * width\n\nprint(area(5, 3))",
            answer: "15",
            hint: "مساحت مستطیل",
            xp: 20,
            explanation: "مساحت = طول × عرض = 5 × 3 = 15."
        },
        {
            id: "ch5_c5",
            type: "quiz",
            difficulty: "hard",
            title: "خروجی این کد چیه؟",
            code: "def mystery(x):\n    return x * 2\n\nprint(mystery(mystery(3)))",
            options: [
                { label: "a", text: "6" },
                { label: "b", text: "9" },
                { label: "c", text: "12" },
                { label: "d", text: "18" }
            ],
            correct: "c",
            hint: "از داخل شروع کن: mystery(3)",
            xp: 25,
            explanation: "مقدار داخلی: mystery(3) = 6. بعد mystery(6) = 12."
        }
    ],
    project: {
        id: "ch5_project",
        title: "کتابخانه‌ی توابع ریاضی",
        brief: "سه تابع بنویس: double (دو برابر)، triple (سه برابر) و half (نصف). هر کدوم یک عدد بگیره و نتیجه‌ش رو return کنه.",
        accepts: [
            { check: (c) => /def\s+\w+\s*\(/.test(c), success: "تابع تعریف کردی", hint: "با def سه تابع بساز", points: 4 },
            { check: (c) => /def\s+(double|triple|half)/.test(c), success: "اسم توابع درست هست", hint: "توابع double، triple و half", points: 3 },
            { check: (c) => /return/.test(c), success: "return داری", hint: "هر تابع باید مقدار رو return کنه", points: 4 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه‌ها رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

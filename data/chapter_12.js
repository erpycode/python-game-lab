PB.registerChapter({
    version: 2,
    id: 12,
    title: "جنریتورها",
    level: "expert",
    lesson: {
        title: "جنریتورها — تولید گام‌به‌گام",
        intro: "تصور کن به جای این‌که کل ۱۰۰۰ عدد رو یه‌جا توی حافظه نگه داری، هر بار فقط یکی بسازی. جنریتورها دقیقاً همین کارو می‌کنن: یه تابع که به جای return از yield استفاده می‌کنه و مقادیر رو یکی‌یکی تولید می‌کنه.",
        sections: [
            {
                icon: "🎁",
                title: "yield به جای return",
                text: "فرق اصلی:\n\nreturn — تابع رو تموم می‌کنه و یه مقدار می‌ده\nyield — یه مقدار می‌ده ولی تابع رو «مکث» می‌کنه، بعداً از همون‌جا ادامه می‌ده!\n\nهر تابعی که yield داشته باشه، جنریتور می‌شه.",
                code: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor num in countdown(3):\n    print(num)",
                output: "3\n2\n1"
            },
            {
                icon: "📊",
                title: "جنریتور در مقابل لیست",
                text: "مزیت بزرگ جنریتور حافظه‌ست:\n\nلیست: همه‌ی مقادیر یک‌جا ساخته و ذخیره می‌شن\nجنریتور: هر مقدار موقع نیاز ساخته می‌شه\n\nبرای ۱ میلیون عدد، جنریتور خیلی سبک‌تره.",
                code: "def my_range(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nfor x in my_range(5):\n    print(x)",
                output: "0\n1\n2\n3\n4"
            },
            {
                icon: "🔁",
                title: "جنریتور با for و next",
                text: "دو روش مصرف:\n\nfor — ساده‌ترین راه\nnext(gen) — مقدار بعدی رو می‌گیره\n\nهنگامی که مقادیر تموم بشه، next خطای StopIteration می‌ده.",
                code: "def squares(n):\n    for i in range(1, n + 1):\n        yield i * i\n\ngen = squares(3)\nprint(next(gen))\nprint(next(gen))\nprint(next(gen))",
                output: "1\n4\n9"
            },
            {
                icon: "💡",
                title: "مثال عملی: خواندن فایل بزرگ",
                text: "وقتی فایل بزرگه، جنریتور بهترین انتخابه:\n\ndef read_lines(file):\n    for line in file:\n        yield line.strip()\n\nبه این ترتیب فقط یه خط توی حافظه می‌مونه، نه کل فایل.",
                code: "def read_lines(text):\n    for line in text.split('\\n'):\n        yield line.strip()\n\ncontent = 'a\\nb\\nc'\nfor line in read_lines(content):\n    print(line)",
                output: "a\nb\nc"
            }
        ],
        tips: [
            "هر تابعی با yield، جنریتور می‌شه — نه return.",
            "جنریتور فقط یک‌بار مصرفه — بعد از تمام شدن، دوباره نمی‌تونی استفاده کنی.",
            "next(gen) مقدار بعدی رو می‌ده و StopIteration می‌ده وقتی تموم بشه.",
        ]
    },
    exercises: [
        {
            id: "ch12_e1",
            type: "quiz",
            title: "جنریتور چه کلمه‌ای استفاده می‌کنه؟",
            code: "به جای return، جنریتورها از چی استفاده می‌کنن؟",
            options: [
                { label: "a", text: "yield" },
                { label: "b", text: "break" },
                { label: "c", text: "continue" },
                { label: "d", text: "pass" }
            ],
            correct: "a",
            hint: "کلمه‌ای که مکث می‌کنه",
            hints: ["مقدار می‌ده ولی تابع ادامه می‌ده", "yield"],
            explanation: "yield مقدار می‌ده ولی تابع رو مکث می‌کنه — مشخصه‌ی جنریتورهاست."
        },
        {
            id: "ch12_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def simple():\n    yield 1\n    yield 2\n\nfor x in simple():\n    print(x)",
            answer: "1\n2",
            hint: "جنریتور ۱ و ۲ می‌ده",
            hints: ["دو تا yield", "۱ بعد ۲"],
            explanation: "جنریتور اول 1 می‌ده، بعد 2."
        },
        {
            id: "ch12_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def even(n):\n    for i in range(n):\n        if i % 2 == 0:\n            yield i\n\nfor e in even(6):\n    print(e)",
            answer: "0\n2\n4",
            hint: "اعداد زوج 0 تا 5",
            hints: ["0, 2, 4", "6 شامل نمی‌شه چون range(6)"],
            explanation: "اعداد زوج توی 0 تا 5: 0، 2 و 4."
        },
        {
            id: "ch12_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "def gen():\n    yield 'a'\n    yield 'b'\n\ng = gen()\nprint(next(g))\nprint(next(g))",
            answer: "a\nb",
            hint: "next مقدار بعدی رو می‌ده",
            hints: ["اول a", "بعد b"],
            explanation: "next(g) اول 'a' می‌ده، بعد 'b'."
        },
        {
            id: "ch12_e5",
            type: "fill_gap",
            title: "جنریتور بساز:",
            code: "def count():\n    i = 0\n    while True:\n        ___ i\n        i += 1",
            answer: "yield",
            hint: "مقدار رو مکث و بده",
            hints: ["yield i", "yield"],
            explanation: "با yield مقدار i داده می‌شه و تابع مکث می‌کنه."
        },
        {
            id: "ch12_e6",
            type: "quiz",
            title: "وقتی جنریتور تموم بشه چی می‌شه؟",
            code: "g = (x for x in [1, 2])\nnext(g)\nnext(g)\nnext(g)  # چی؟",
            options: [
                { label: "a", text: "None" },
                { label: "b", text: "StopIteration" },
                { label: "c", text: "0" },
                { label: "d", text: "خطای ValueError" }
            ],
            correct: "b",
            hint: "مقداری نمونده",
            hints: ["همه مقادیر مصرف شده", "StopIteration"],
            explanation: "وقتی جنریتور تموم بشه، next خطای StopIteration می‌ده."
        }
    ],
    challenges: [
        {
            id: "ch12_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "def gen():\n    yield 10\n\ng = gen()\nprint(next(g))",
            answer: "10",
            hint: "اولین yield",
            xp: 10,
            explanation: "next(g) اولین مقدار جنریتور یعنی 10 رو می‌ده."
        },
        {
            id: "ch12_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "جنریتور رو کامل کن:",
            code: "def odds(n):\n    for i in range(n):\n        if i % 2 == 1:\n            ___ i",
            answer: "yield",
            hint: "مقداردهی گام‌به‌گام",
            xp: 15,
            explanation: "با yield اعداد فرد یکی‌یکی داده می‌شن."
        },
        {
            id: "ch12_c3",
            type: "quiz",
            difficulty: "medium",
            title: "مزیت اصلی جنریتور چیه؟",
            code: "چرا برای لیست‌های بزرگ از جنریتور استفاده می‌کنیم؟",
            options: [
                { label: "a", text: "سریع‌تره همیشه" },
                { label: "b", text: "حافظه کمتری مصرف می‌کنه" },
                { label: "c", text: "خودکار مرتب می‌کنه" },
                { label: "d", text: "خطا نمی‌ده" }
            ],
            correct: "b",
            hint: "مقادیر یکی‌یکی ساخته می‌شن",
            xp: 15,
            explanation: "جنریتور مقادیر رو یکی‌یکی می‌سازه، پس حافظه‌ی خیلی کمتری مصرف می‌کنه."
        },
        {
            id: "ch12_c4",
            type: "predict",
            difficulty: "hard",
            title: "خروجی این کد چیه؟",
            code: "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nf = fib()\nprint(next(f))\nprint(next(f))\nprint(next(f))\nprint(next(f))",
            answer: "0\n1\n1\n2",
            hint: "دنباله‌ی فیبوناچی",
            xp: 25,
            explanation: "فیبوناچی: 0، 1، 1، 2 — هر عدد جمع دو عدد قبلیه."
        },
        {
            id: "ch12_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا جنریتور درست بشه:",
            code: "yield x\nfor x in range(3):\ndef gen():\n    for x in range(3):",
            correct_order: ["def gen():", "    for x in range(3):", "        yield x"],
            answer: ["def gen():", "    for x in range(3):", "        yield x"],
            hint: "تعریف تابع، حلقه، yield",
            xp: 25,
            explanation: "اول def، بعد for، بعد yield داخل حلقه."
        }
    ],
    project: {
        id: "ch12_project",
        title: "شمارنده‌ی زوج‌ها",
        brief: "جنریتوری بنویس که اعداد زوج نامحدود تولید کنه (از 0 شروع). با next پنج عدد اولش رو چاپ کن.",
        accepts: [
            { check: (c) => /def\s+\w+\s*\(/.test(c), success: "تابع داری", hint: "با def جنریتور بساز", points: 3 },
            { check: (c) => /yield/.test(c), success: "yield داری", hint: "با yield مقادیر رو بده", points: 5 },
            { check: (c) => /next\s*\(/.test(c), success: "با next مصرف کردی", hint: "با next مقدار بگیر", points: 4 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "مقادیر رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

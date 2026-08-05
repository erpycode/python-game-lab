PB.registerChapter({
    version: 2,
    id: 4,
    title: "حلقه‌ها",
    level: "intermediate",
    lesson: {
        title: "حلقه‌ها — تکرار هوشمند",
        intro: "انسان‌ها از تکرار خسته می‌شن، کامپیوتر نه! حلقه‌ها بهت اجازه می‌دن یه کار رو چند بار یا تا وقتی که شرطی برقراره انجام بدی — بدون این که کد رو تکرار کنی.",
        sections: [
            {
                icon: "🔁",
                title: "حلقه for",
                text: "for روی هر عنصر یه بار اجرا می‌شه:\n\nfor i in range(5):\n    print(i)\n\nrange(5) یعنی اعداد 0 تا 4.\nrange(2, 6) یعنی 2 تا 5.\nrange(0, 10, 2) یعنی با گام 2: 0,2,4,6,8",
                code: "for i in range(5):\n    print(i)",
                output: "0\n1\n2\n3\n4"
            },
            {
                icon: "♾️",
                title: "حلقه while",
                text: "while تا وقتی شرطش درست باشه تکرار می‌شه:\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n\n⚠️ خطر: اگه شرط هیچ وقت غلط نشه، حلقه بی‌نهایت می‌شه! حتماً توی حلقه یه جوری شرط رو عوض کن.",
                code: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
                output: "0\n1\n2"
            },
            {
                icon: "✋",
                title: "break و continue",
                text: "دو کنترل‌کننده:\n\nbreak — فوراً حلقه رو تموم می‌کنه\ncontinue — رد می‌شه به تکرار بعدی\n\nمثال break: دنبال عدد 7 بگرد و وقتی پیدا شد تموم کن.",
                code: "for i in range(10):\n    if i == 4:\n        break\n    print(i)\n\nprint('---')\n\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)",
                output: "0\n1\n2\n3\n---\n0\n1\n3\n4"
            },
            {
                icon: "🪆",
                title: "حلقه‌های تو در تو",
                text: "می‌تونی یه حلقه داخل حلقه‌ی دیگه بذاری:\n\nfor i in range(3):\n    for j in range(2):\n        print(i, j)\n\nحلقه داخلی برای هر مقدار حلقه بیرونی کامل اجرا می‌شه.\nتعداد کل تکرارها: 3 × 2 = 6 بار.",
                code: "for i in range(2):\n    for j in range(3):\n        print(i, j)",
                output: "0 0\n0 1\n0 2\n1 0\n1 1\n1 2"
            }
        ],
        tips: [
            "for برای وقتی که تعداد تکرار مشخصه بهتره، while برای وقتی که شرطی باید برقرار باشه.",
            "همیشه مطمئن شو حلقه while یه راه خروج داره.",
            "range(5) از 0 شروع می‌شه نه از 1 — مبتدی‌ها همیشه یادشون میره!",
        ]
    },
    exercises: [
        {
            id: "ch4_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "for i in range(3):\n    print(i)",
            answer: "0\n1\n2",
            hint: "range(3) از 0 شروع می‌شه",
            hints: ["0, 1, 2", "3 شامل نمی‌شه"],
            explanation: "range(3) اعداد 0، 1 و 2 رو می‌ده (3 شامل نمی‌شه)."
        },
        {
            id: "ch4_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
            answer: "0\n1\n2",
            hint: "while تا وقتی count < 3 تکرار می‌شه",
            hints: ["count از 0 شروع می‌شه", "وقتی count به 3 می‌رسه تموم می‌شه"],
            explanation: "count 0، 1 و 2 رو چاپ می‌کنه؛ وقتی به 3 می‌رسه شرط غلط می‌شه و حلقه تموم می‌شه."
        },
        {
            id: "ch4_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "for i in range(2, 5):\n    print(i)",
            answer: "2\n3\n4",
            hint: "range(2, 5) از 2 تا 4",
            hints: ["عدد اول شروع، عدد دوم پایان (شامل نمی‌شه)", "2, 3, 4"],
            explanation: "range(2, 5) اعداد 2، 3 و 4 رو می‌ده (5 شامل نمی‌شه)."
        },
        {
            id: "ch4_e4",
            type: "quiz",
            title: "چند بار «سلام» چاپ می‌شه؟",
            code: "for i in range(4):\n    print('سلام')",
            options: [
                { label: "a", text: "۳ بار" },
                { label: "b", text: "۴ بار" },
                { label: "c", text: "۵ بار" },
                { label: "d", text: "بی‌نهایت" }
            ],
            correct: "b",
            hint: "تعداد تکرار range(4) چقدره؟",
            hints: ["range(4) یعنی 0 تا 3 → 4 تا", "پس ۴ بار"],
            explanation: "حلقه 4 بار تکرار می‌شه (i = 0,1,2,3) و هر بار «سلام» چاپ می‌شه."
        },
        {
            id: "ch4_e5",
            type: "quiz",
            title: "این حلقه چند بار تکرار می‌شه؟",
            code: "x = 0\nwhile x < 10:\n    x += 2",
            options: [
                { label: "a", text: "4 بار" },
                { label: "b", text: "5 بار" },
                { label: "c", text: "10 بار" },
                { label: "d", text: "بی‌نهایت" }
            ],
            correct: "b",
            hint: "x با گام 2 جلو می‌ره",
            hints: ["x = 0,2,4,6,8", "وقتی x = 10 بشه شرط غلط می‌شه", "پس ۵ بار"],
            explanation: "x مقادیر 0,2,4,6,8 رو می‌گیره (۵ تکرار). در تکرار ششم x=10 می‌شه که شرط غلط می‌شه."
        },
        {
            id: "ch4_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "for i in range(5):\n    if i == 3:\n        break\n    print(i)",
            answer: "0\n1\n2",
            hint: "break توی i==3 اتفاق می‌افته",
            hints: ["0 و 1 و 2 چاپ می‌شن", "وقتی i=3 شد، break حلقه رو قطع می‌کنه"],
            explanation: "i=0,1,2 چاپ می‌شن. وقتی i=3 می‌شه، break اجرا می‌شه و حلقه تموم می‌شه."
        }
    ],
    challenges: [
        {
            id: "ch4_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)",
            answer: "6",
            hint: "1 + 2 + 3",
            xp: 15,
            explanation: "total = 1+2+3 = 6. (range(1,4) یعنی 1,2,3)"
        },
        {
            id: "ch4_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "حلقه رو کامل کن تا ۰ تا ۴ چاپ بشه:",
            code: "for i in ___(5):\n    print(i)",
            answer: "range",
            hint: "تابعی که اعداد پشت سر هم می‌سازه",
            xp: 15,
            explanation: "range(5) اعداد 0 تا 4 رو می‌سازه."
        },
        {
            id: "ch4_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "این کد یه حلقه بی‌نهایته! کجاش خرابه؟",
            code: "x = 1\nwhile x < 10:\n    print(x)",
            error_line: 2,
            reason: "مقدار x داخل حلقه هیچ وقت تغییر نمی‌کنه، پس شرط همیشه درست می‌مونه و حلقه بی‌نهایت می‌شه",
            hint: "توی بلاک while باید یه چیزی x رو عوض کنه",
            xp: 20,
            explanation: "چون x هرگز تغییر نمی‌کنه، شرط x < 10 همیشه True هست و حلقه هیچ وقت تموم نمی‌شه. باید x += 1 اضافه بشه."
        },
        {
            id: "ch4_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "for i in range(3):\n    for j in range(2):\n        print(i, j)",
            answer: "0 0\n0 1\n1 0\n1 1\n2 0\n2 1",
            hint: "حلقه داخلی برای هر i کامل اجرا می‌شه",
            xp: 25,
            explanation: "برای i=0: j=0,1. برای i=1: j=0,1. برای i=2: j=0,1. مجموعاً ۶ خط."
        },
        {
            id: "ch4_c5",
            type: "sort",
            difficulty: "hard",
            title: "خطوط رو مرتب کن تا ۰،۱،۲،۳ چاپ بشه:",
            code: "print(x)\nwhile x < 4:\nx = 0\n    x += 1",
            correct_order: ["x = 0", "while x < 4:", "    print(x)", "    x += 1"],
            answer: ["x = 0", "while x < 4:", "    print(x)", "    x += 1"],
            hint: "مقداردهی اول، شرط، بدنه، به‌روزرسانی",
            xp: 25,
            explanation: "اول x=0، بعد while با شرط، بعد چاپ و بعد افزایش x."
        }
    ],
    project: {
        id: "ch4_project",
        title: "شمارشگر معکوس موشک",
        brief: "برنامه‌ای بنویس که از 5 تا 1 بشماره و بعد «پرتاب!» چاپ کنه.",
        accepts: [
            { check: (c) => /for\s|while\s/.test(c), success: "حلقه داری", hint: "با for یا while حلقه بزن", points: 4 },
            { check: (c) => /range\s*\(/.test(c), success: "از range استفاده کردی", hint: "با range اعداد رو بساز", points: 2 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "اعداد رو print کن", points: 2 },
            { check: (c) => /'پرتاب'|'پرتاپ'|"پرتاب"|"پرتاپ"/.test(c), success: "پیام پرتاب داری", hint: "بعد از حلقه «پرتاب!» چاپ کن", points: 3 }
        ],
        passScore: 70
    }
});

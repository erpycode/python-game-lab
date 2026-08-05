PB.registerChapter({
    version: 2,
    id: 19,
    title: "لیست کامپریهنشن",
    level: "expert",
    lesson: {
        title: "لیست کامپریهنشن — ساخت لیست در یک خط",
        intro: "حلقه برای ساخت لیست ساده‌ست ولی چند خط طول می‌کشه. کامپریهنشن همه‌چی رو توی یه خط خلاصه می‌کنه. بعد از این فصل، دلت نمی‌خواد دوباره با حلقه‌ی سه‌خطی لیست بسازی!",
        sections: [
            {
                icon: "⚡",
                title: "ساختار پایه",
                text: "ساختار:\n\n[عبارت for متغیر in منبع]\n\nمثال:\nsquares = [x * x for x in range(5)]\n→ [0, 1, 4, 9, 16]\n\nمعادل:\nsquares = []\nfor x in range(5):\n    squares.append(x * x)",
                code: "squares = [x * x for x in range(5)]\nprint(squares)\n\ndoubles = [x * 2 for x in [1, 2, 3]]\nprint(doubles)",
                output: "[0, 1, 4, 9, 16]\n[2, 4, 6]"
            },
            {
                icon: "🎯",
                title: "فیلتر با if",
                text: "می‌تونی شرط هم اضافه کنی:\n\n[عبارت for متغیر in منبع if شرط]\n\nمثال:\nevens = [x for x in range(10) if x % 2 == 0]\n→ [0, 2, 4, 6, 8]\n\nفقط عنصرهایی که شرط رو برقرار کنن می‌مونن.",
                code: "evens = [x for x in range(10) if x % 2 == 0]\nprint(evens)\n\nbig = [x for x in [3, 8, 12, 1] if x > 5]\nprint(big)",
                output: "[0, 2, 4, 6, 8]\n[8, 12]"
            },
            {
                icon: "🔤",
                title: "کار با رشته‌ها",
                text: "کامپریهنشن روی هر چیزی کار می‌کنه:\n\nwords = ['ali', 'sara']\nupper = [w.upper() for w in words]\n→ ['ALI', 'SARA']\n\nطول کلمات:\nlengths = [len(w) for w in words]\n→ [3, 4]",
                code: "words = ['پایتون', 'باز', 'آرکید']\nlengths = [len(w) for w in words]\nprint(lengths)\n\nwith_a = [w for w in words if 'ر' in w]\nprint(with_a)",
                output: "[6, 3, 5]\n['آرکید']"
            },
            {
                icon: "🧬",
                title: "کامپریهنشن‌های پیچیده‌تر",
                text: "می‌تونی ترکیب‌شون کنی:\n\nماتریس:\nmatrix = [[i * j for j in range(3)] for i in range(2)]\n\nفشرده‌سازی:\nflat = [num for row in matrix for num in row]\n\nفقط وقتی پیچیده‌شه که خوندنش راحت بمونه!",
                code: "matrix = [[i * j for j in range(3)] for i in range(2)]\nprint(matrix)\n\nflat = [num for row in matrix for num in row]\nprint(flat)",
                output: "[[0, 0, 0], [0, 1, 2]]\n[0, 0, 0, 0, 1, 2]"
            }
        ],
        tips: [
            "کامپریهنشن کد رو کوتاه‌تر و خواناتر می‌کنه — ولی اگه خیلی پیچیده شد، حلقه بنویس.",
            "ساختار: [عبارت for متغیر in منبع if شرط]",
            "فقط یک بار کامپریهنشن رو به سلیقه‌ات بساز — تمرین زیاد می‌خواد!",
        ]
    },
    exercises: [
        {
            id: "ch19_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "squares = [x * x for x in range(4)]\nprint(squares)",
            answer: "[0, 1, 4, 9]",
            hint: "مربع 0 تا 3",
            hints: ["0²=0", "1²=1", "2²=4", "3²=9"],
            explanation: "x از 0 تا 3 می‌ره و مربعشون ساخته می‌شه: [0, 1, 4, 9]."
        },
        {
            id: "ch19_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "nums = [1, 2, 3, 4]\ndoubled = [x * 2 for x in nums]\nprint(doubled)",
            answer: "[2, 4, 6, 8]",
            hint: "هر عدد × 2",
            hints: ["1*2=2", "2*2=4", "3*2=6", "4*2=8"],
            explanation: "هر عنصر لیست دوبرابر می‌شه: [2, 4, 6, 8]."
        },
        {
            id: "ch19_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "evens = [x for x in range(8) if x % 2 == 0]\nprint(evens)",
            answer: "[0, 2, 4, 6]",
            hint: "زوج‌های 0 تا 7",
            hints: ["0, 2, 4, 6", "8 شامل نمی‌شه چون range(8)"],
            explanation: "اعداد زوج 0 تا 7: 0، 2، 4، 6."
        },
        {
            id: "ch19_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "words = ['ali', 'sara']\nprint([w.upper() for w in words])",
            answer: "['ALI', 'SARA']",
            hint: "همه بزرگ",
            hints: ["ali → ALI", "sara → SARA"],
            explanation: "هر کلمه با upper بزرگ می‌شه: ['ALI', 'SARA']."
        },
        {
            id: "ch19_e5",
            type: "fill_gap",
            title: "کامپریهنشن بساز:",
            code: "nums = [1, 2, 3, 4, 5]\nodd = [x for x in nums ___ x % 2 == 1]\nprint(odd)",
            answer: "if",
            hint: "کلمه‌ی شرط",
            hints: ["if x % 2 == 1", "if"],
            explanation: "با if توی کامپریهنشن فیلتر می‌کنی."
        },
        {
            id: "ch19_e6",
            type: "quiz",
            title: "کدوم با این کامپریهنشن ساخته می‌شه؟",
            code: "[x for x in range(5) if x > 2]",
            options: [
                { label: "a", text: "[0, 1, 2]" },
                { label: "b", text: "[3, 4]" },
                { label: "c", text: "[2, 3, 4]" },
                { label: "d", text: "[1, 2, 3, 4]" }
            ],
            correct: "b",
            hint: "بزرگ‌تر از 2",
            hints: ["0, 1, 2 نیستن چون > 2 نیستن", "3 و 4 می‌مونن"],
            explanation: "اعدادی که بزرگ‌تر از 2 هستن (3 و 4) می‌مونن."
        }
    ],
    challenges: [
        {
            id: "ch19_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "print([x + 1 for x in [1, 2, 3]])",
            answer: "[2, 3, 4]",
            hint: "به هر عدد ۱ اضافه می‌شه",
            xp: 10,
            explanation: "1+1=2، 2+1=3، 3+1=4."
        },
        {
            id: "ch19_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "فقط بزرگ‌ترها:",
            code: "nums = [2, 5, 8, 3, 10]\nbig = [x for x in nums ___ x > 5]\nprint(big)",
            answer: "if",
            hint: "کلمه‌ی شرط فیلتر",
            xp: 15,
            explanation: "با if فقط اعداد بزرگ‌تر از 5 می‌مونن: [8, 10]."
        },
        {
            id: "ch19_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "nums = [x for x in range(10) if x % 2 == 0]\nprint(nums[6])",
            error_line: 2,
            reason: "لیست فقط ۵ عنصر داره (0,2,4,6,8) — ایندکس 6 خارج از محدوده‌ست",
            hint: "چند عنصر توی لیسته؟",
            xp: 20,
            explanation: "لیست زوج‌ها فقط 5 عنصره: [0,2,4,6,8]. ایندکس 6 وجود نداره → IndexError."
        },
        {
            id: "ch19_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "names = ['علی', 'سارا', 'رضا']\nprint([n for n in names if 'ر' in n])",
            answer: "['سارا', 'رضا']",
            hint: "اسم‌هایی که «ر» دارن",
            xp: 20,
            explanation: "علی «ر» نداره، سارا و رضا دارن."
        },
        {
            id: "ch19_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا [4, 16, 36] بشه:",
            code: "print(squares)\nsquares = [x * x for x in nums if x % 2 == 0]\nnums = [2, 3, 4, 5, 6]",
            correct_order: ["nums = [2, 3, 4, 5, 6]", "squares = [x * x for x in nums if x % 2 == 0]", "print(squares)"],
            answer: ["nums = [2, 3, 4, 5, 6]", "squares = [x * x for x in nums if x % 2 == 0]", "print(squares)"],
            hint: "لیست، کامپریهنشن، چاپ",
            xp: 25,
            explanation: "زوج‌ها (2,4,6) مربع می‌شن: [4, 16, 36]."
        }
    ],
    project: {
        id: "ch19_project",
        title: "پردازشگر لیست",
        brief: "لیستی از ۱۰ عدد بساز، با کامپریهنشن مربع‌شون کن، با کامپریهنشن دیگه اونایی که از ۲۵ بزرگ‌ترن فیلتر کن و نتیجه رو چاپ کن.",
        accepts: [
            { check: (c) => /\[.*for .* in .*\]/.test(c), success: "کامپریهنشن داری", hint: "با [x for x in ...] بساز", points: 4 },
            { check: (c) => /\[.*for .* in .* if/.test(c), success: "کامپریهنشن با if داری", hint: "با if فیلتر کن", points: 4 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

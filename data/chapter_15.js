PB.registerChapter({
    version: 2,
    id: 15,
    title: "عبارات باقاعده",
    level: "expert",
    lesson: {
        title: "عبارات باقاعده — Regex",
        intro: "Regex (عبارت باقاعده) یه زبان کوچیک برای پیدا کردن الگو توی متن‌هاست. می‌خوای ایمیل‌ها، شماره تلفن‌ها یا کلمه‌های تکراری رو پیدا کنی؟ Regex کارت رو راحت می‌کنه — اگه باهاش دوست بشی!",
        sections: [
            {
                icon: "🔍",
                title: "ساختار اولیه",
                text: "با re می‌تونی الگو پیدا کنی:\n\nimport re\nre.search(pattern, text) — اولین پیدا شدن\nre.findall(pattern, text) — همه‌ی پیداش‌ها\n\nساده‌ترین الگو فقط خود متن‌ه:\nre.search('cat', 'a cat sat')",
                code: "import re\n\ntext = 'پایتون زبانه، پایتون قدرتمنده'\nprint(re.findall('پایتون', text))\n\nresult = re.search('قدرتمند', text)\nif result:\n    print('پیدا شد!')",
                output: "['پایتون', 'پایتون']\nپیدا شد!"
            },
            {
                icon: "🔤",
                title: "کاراکترهای خاص",
                text: "نمادهای مهم:\n\n. — هر کاراکتری\n\\d — هر رقم (0-9)\n\\w — حرف یا رقم\n\\s — فاصله\n^ — شروع متن\n$ — پایان متن\n\nمثال: re.findall(r'\\d+', 'x12y3') → ['12', '3']",
                code: "import re\n\nprint(re.findall(r'\\d+', 'a12b345'))\nprint(re.findall(r'a.c', 'abc axc aXc'))",
                output: "['12', '345']\n['abc', 'axc', 'aXc']"
            },
            {
                icon: "🔁",
                title: "تکرارها",
                text: "چند تا از مهم‌ترین‌ها:\n\n* — صفر یا بیشتر\n+ — یک یا بیشتر\n? — صفر یا یک\n{n} — دقیقاً n بار\n\nمثال: r'\\d{2}' یعنی دو رقم، r'colou?r' هم 'color' و هم 'colour' رو پیدا می‌کنه.\n\n(خروجی مثال ab+ رو خودت توی پایتون تست کن — ab+ یعنی a به همراه یک یا چند b.)",
                code: "import re\n\nprint(re.findall(r'\\d{2}', '123456'))\nprint(re.findall(r'colou?r', 'color colour'))",
                output: "['12', '34', '56']\n['color', 'colour']"
            },
            {
                icon: "🧪",
                title: "کاربرد واقعی: ایمیل",
                text: "الگوی ساده‌ی ایمیل:\n\nr'\\w+@\\w+\\.\\w+'\n\nیعنی: حروف + @ + حروف + نقطه + حروف\n\nمثال: ali@example.com پیدا می‌شه.",
                code: "import re\n\ntext = 'تماس: ali@example.com یا sara@gmail.com'\npattern = r'\\w+@\\w+\\.\\w+'\n\nprint(re.findall(pattern, text))",
                output: "['ali@example.com', 'sara@gmail.com']"
            }
        ],
        tips: [
            "الگوها رو با r'...' بنویس (raw string) تا از دستور escape درست استفاده بشه.",
            "\\d+ پرکاربردترین الگوئه — «هر تعداد رقم».",
            "regex101.com یه ابزار عالی برای تمرین‌ه — توی یادگیری عالیه.",
        ]
    },
    exercises: [
        {
            id: "ch15_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import re\nprint(re.findall(r'\\d', 'a1b2c3'))",
            answer: "['1', '2', '3']",
            hint: "\\d هر رقم رو پیدا می‌کنه",
            hints: ["1، 2، 3 رقم‌ان", "هر کدوم جدا"],
            explanation: "\\d هر رقم رو جدا جدا پیدا می‌کنه: ['1', '2', '3']."
        },
        {
            id: "ch15_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import re\nprint(re.findall(r'\\d+', 'a1b22c333'))",
            answer: "['1', '22', '333']",
            hint: "\\d+ یک یا چند رقم پشت سر هم",
            hints: ["1 یک‌تاست", "22 دو تاست", "333 سه تاست"],
            explanation: "\\d+ گروه‌های ارقام رو می‌گیره: ['1', '22', '333']."
        },
        {
            id: "ch15_e3",
            type: "quiz",
            title: "این الگو یعنی چی؟",
            code: "r'a.c'",
            options: [
                { label: "a", text: "فقط 'a.c'" },
                { label: "b", text: "a با هر کاراکتری در وسط، بعد c" },
                { label: "c", text: "a یا c" },
                { label: "d", text: "abc" }
            ],
            correct: "b",
            hint: "نقطه یعنی هر کاراکتری",
            hints: [". یعنی هر کاراکتری", "a.c → abc یا axc"],
            explanation: "نقطه (.) با هر کاراکتری match می‌شه: a.c یعنی a + هر چیزی + c."
        },
        {
            id: "ch15_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import re\nprint(bool(re.search(r'\\d+', 'hello')))",
            answer: "False",
            hint: "توی hello رقمی نیست",
            hints: ["هیچ عددی توی hello نیست", "پس search چیزی پیدا نمی‌کنه → None → False"],
            explanation: "توی 'hello' هیچ رقمی نیست، پس re.search None برمی‌گردونه و bool → False."
        },
        {
            id: "ch15_e5",
            type: "fill_gap",
            title: "سه رقم پیدا کن:",
            code: "import re\nprint(re.findall(r'\\d{___}', '12345'))",
            answer: "3",
            hint: "دقیقاً چند رقم؟",
            hints: ["{n} یعنی دقیقاً n بار", "{3} یعنی ۳ رقم"],
            explanation: "{3} یعنی دقیقاً ۳ رقم: '123' و '45' نمی‌مونه (فقط 123 پیدا می‌شه چون {3} دقیقاً سه‌تایی‌ها رو می‌گیره)."
        },
        {
            id: "ch15_e6",
            type: "quiz",
            title: "این الگو چی پیدا می‌کنه؟",
            code: "re.findall(r'\\w+@\\w+\\.\\w+', text)",
            options: [
                { label: "a", text: "شماره تلفن‌ها" },
                { label: "b", text: "ایمیل‌ها" },
                { label: "c", text: "کلمه‌های تکراری" },
                { label: "d", text: "اعداد" }
            ],
            correct: "b",
            hint: "@ و نقطه توی الگوئه",
            hints: ["@ و . توی الگوئه", "ایمیل‌ها"],
            explanation: "الگوی \\w+@\\w+\\.\\w+ ساختار ایمیل رو پیدا می‌کنه."
        }
    ],
    challenges: [
        {
            id: "ch15_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "import re\nprint(re.findall(r'\\w+', 'سلام دنیا'))",
            answer: "['سلام', 'دنیا']",
            hint: "\\w+ کلمه‌ها رو جدا می‌کنه",
            xp: 10,
            explanation: "\\w+ هر گروه از حروف/ارقام رو جدا می‌کنه: کلمه‌ها."
        },
        {
            id: "ch15_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "الگوی سه رقم رو بساز:",
            code: "import re\nprint(re.findall(r'\\d{___}', '12345'))",
            answer: "3",
            hint: "{n} یعنی تعداد دقیق رقم",
            xp: 15,
            explanation: "\\d{3} یعنی دقیقاً ۳ رقم پشت سر هم پیدا کن."
        },
        {
            id: "ch15_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "import re\nprint(re.findall(r'\\d+', 'a1b2'))\nprint('پایان'",
            error_line: 3,
            reason: "پرانتز print('پایان' بسته نشده — باید print('پایان') باشه",
            hint: "آخرین خط رو با دقت نگاه کن",
            xp: 20,
            explanation: "print('پایان' یه پرانتز بسته کم داره → SyntaxError. باید print('پایان') باشه."
        },
        {
            id: "ch15_c4",
            type: "quiz",
            difficulty: "hard",
            title: "خروجی این کد چیه؟",
            code: "re.findall(r'ab+c', 'abc abbc abbbc')",
            options: [
                { label: "a", text: "['abc']" },
                { label: "b", text: "['abc', 'abbc', 'abbbc']" },
                { label: "c", text: "['ac']" },
                { label: "d", text: "['ab']" }
            ],
            correct: "b",
            hint: "b+ یعنی یک یا چند b",
            xp: 25,
            explanation: "ab+c یعنی a + یک یا چند b + c. هر سه مورد match می‌شن."
        },
        {
            id: "ch15_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا همه‌ی ارقام چاپ بشن:",
            code: "print(nums)\nimport re\nnums = re.findall(r'\\d+', 'x10 y20')",
            correct_order: ["import re", "nums = re.findall(r'\\d+', 'x10 y20')", "print(nums)"],
            answer: ["import re", "nums = re.findall(r'\\d+', 'x10 y20')", "print(nums)"],
            hint: "import، پیدا کردن، چاپ",
            xp: 25,
            explanation: "اول ماژول میاد، بعد الگو، بعد چاپ."
        }
    ],
    project: {
        id: "ch15_project",
        title: "شماره‌شناس",
        brief: "یه متن با شماره تلفن و ایمیل بساز. با regex شماره تلفن‌ها (ر\\d{11} یا \\d{3}-\\d{3}-\\d{4}) و ایمیل‌ها رو جدا پیدا کن و چاپ کن.",
        accepts: [
            { check: (c) => /import\s+re/.test(c), success: "re import کردی", hint: "import re", points: 3 },
            { check: (c) => /re\.findall\s*\(/.test(c), success: "findall استفاده کردی", hint: "با re.findall جستجو کن", points: 4 },
            { check: (c) => /\\d/.test(c), success: "از \\d استفاده کردی", hint: "برای ارقام از \\d استفاده کن", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

PB.registerChapter({
    version: 2,
    id: 14,
    title: "ماژول‌ها",
    level: "expert",
    lesson: {
        title: "ماژول‌ها — کد مشترک",
        intro: "هیچ‌کس از صفر شروع نمی‌کنه! پایتون هزاران ماژول آماده داره — از ریاضیات تا وب. ماژول‌ها بهت اجازه می‌دن کدهای آماده رو import کنی و از قدرت کل جامعه‌ی پایتون استفاده کنی.",
        sections: [
            {
                icon: "📦",
                title: "import — آوردن کد",
                text: "سه روش import:\n\nimport math — کل ماژول (math.sqrt(9))\nfrom math import sqrt — فقط یک تابع (sqrt(9))\nimport math as m — با نام کوتاه (m.sqrt(9))\n\nاولی همه‌چی میاره، دومی فقط لازم رو.",
                code: "import math\nprint(math.sqrt(16))\nprint(math.pi)\n\nfrom math import floor\nprint(floor(3.7))\n\nfrom math import sqrt as s\nprint(s(25))",
                output: "4.0\n3.141592653589793\n3\n5.0"
            },
            {
                icon: "🎲",
                title: "ماژول random",
                text: "برای کار با شانس و تصادفی:\n\nrandom.randint(1, 6) — عدد تصادفی بین\nrandom.choice(list) — انتخاب از لیست\nrandom.shuffle(list) — جابه‌جا کردن\nrandom.random() — عدد اعشاری ۰ تا ۱",
                code: "import random\n\nnames = ['علی', 'سارا', 'رضا']\nprint(random.choice(names))\nprint(random.randint(1, 6))\n\nrandom.shuffle(names)\nprint(names)",
                output: ""
            },
            {
                icon: "🕐",
                title: "ماژول datetime",
                text: "برای تاریخ و زمان:\n\ndatetime.datetime.now() — الان\ndatetime.date.today() — امروز\n\nو ماژول time برای تاخیر:\ntime.sleep(2) — ۲ ثانیه صبر کن",
                code: "import datetime\nimport time\n\ntoday = datetime.date.today()\nprint(today.year)\nprint(today.month)\n\nprint('شروع')\ntime.sleep(1)\nprint('پایان')",
                output: "2026\n8\nشروع\nپایان"
            },
            {
                icon: "🧰",
                title: "ساخت ماژول خودت",
                text: "ماژول خودت هم بسازی! کافیه یه فایل .py بسازی و از جایی دیگه import کنی:\n\n# tools.py\ndef square(x):\n    return x * x\n\n# main.py\nfrom tools import square\nprint(square(5))\n\nهر فایل پایتون می‌تونه ماژول باشه.",
                code: "# tools.py\ndef square(x):\n    return x * x\n\n# main.py\nfrom tools import square\nprint(square(5))",
                output: "25"
            }
        ],
        tips: [
            "from module import x خاص‌تره و کد تمیزتری می‌ده.",
            "قبل از استفاده از ماژول حتماً نصبش کن (pip install).",
            "ماژول‌های خودت رو توی فایل‌های جدا بذار و import کن.",
        ]
    },
    exercises: [
        {
            id: "ch14_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import math\nprint(math.sqrt(36))",
            answer: "6.0",
            hint: "جذر 36",
            hints: ["ریشه دوم 36 = 6", "sqrt همیشه float برمی‌گردونه"],
            explanation: "math.sqrt(36) = 6.0 (ریشه دوم همیشه float برمی‌گردونه)."
        },
        {
            id: "ch14_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "from math import floor\nprint(floor(4.9))",
            answer: "4",
            hint: "گرد کردن به پایین",
            hints: ["floor یعنی کف", "4.9 → 4"],
            explanation: "floor عدد رو به پایین گرد می‌کنه: 4."
        },
        {
            id: "ch14_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import random\n\nnums = [1, 2, 3, 4, 5]\nrandom.shuffle(nums)\nprint(len(nums))",
            answer: "5",
            hint: "shuffle فقط جابه‌جا می‌کنه",
            hints: ["تعداد عنصرها عوض نمی‌شه", "هنوز ۵ تاست"],
            explanation: "shuffle فقط ترتیب رو جابه‌جا می‌کنه؛ تعداد عنصرها (5) ثابت می‌مونه."
        },
        {
            id: "ch14_e4",
            type: "fill_gap",
            title: "ماژول رو بیار:",
            code: "___ math\nprint(math.pi)",
            answer: "import",
            hint: "کلمه‌ی آوردن ماژول",
            hints: ["import math", "import"],
            explanation: "با import math می‌تونی از توابع و ثابت‌های math استفاده کنی."
        },
        {
            id: "ch14_e5",
            type: "quiz",
            title: "این یعنی چی؟",
            code: "from datetime import date",
            options: [
                { label: "a", text: "کل datetime میاد" },
                { label: "b", text: "فقط date از datetime میاد" },
                { label: "c", text: "کل date میاد" },
                { label: "d", text: "خطا می‌ده" }
            ],
            correct: "b",
            hint: "from...import",
            hints: ["from X import Y یعنی فقط Y از X", "فقط date"],
            explanation: "from datetime import date یعنی فقط کلاس/تابع date از ماژول datetime میاد."
        },
        {
            id: "ch14_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import time\nprint('الف')\ntime.sleep(1)\nprint('ب')",
            answer: "الف\nب",
            hint: "فقط یه تاخیر کوچیکه",
            hints: ["الف چاپ می‌شه", "یه ثانیه صبر", "ب چاپ می‌شه"],
            explanation: "کد الف رو چاپ می‌کنه، یه ثانیه صبر می‌کنه، بعد ب رو چاپ می‌کنه."
        }
    ],
    challenges: [
        {
            id: "ch14_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "import math\nprint(math.ceil(2.1))",
            answer: "3",
            hint: "ceil یعنی سقف — گرد به بالا",
            xp: 10,
            explanation: "math.ceil عدد رو به بالا گرد می‌کنه: 2.1 → 3."
        },
        {
            id: "ch14_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "عدد تصادفی بساز:",
            code: "import random\nnum = random.___(1, 10)\nprint(num)",
            answer: "randint",
            hint: "عدد صحیح تصادفی",
            xp: 15,
            explanation: "random.randint(1, 10) عدد صحیح تصادفی بین ۱ تا ۱۰ می‌ده."
        },
        {
            id: "ch14_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "print(math.sqrt(25))",
            error_line: 1,
            reason: "math import نشده — NameError می‌گیریم چون math تعریف نشده",
            hint: "قبل استفاده باید ماژول بیاد",
            xp: 20,
            explanation: "بدون import math، پایتون نمی‌دونه math چیه → NameError. اول باید import math."
        },
        {
            id: "ch14_c4",
            type: "quiz",
            difficulty: "medium",
            title: "یه مورد از لیست انتخاب کن:",
            code: "random.choice(['a', 'b', 'c'])",
            options: [
                { label: "a", text: "همیشه 'a'" },
                { label: "b", text: "یه عدد تصادفی" },
                { label: "c", text: "یه عنصر تصادفی از لیست" },
                { label: "d", text: "لیست مرتب شده" }
            ],
            correct: "c",
            hint: "choice یعنی انتخاب",
            xp: 15,
            explanation: "random.choice یک عنصر تصادفی از لیست برمی‌گردونه."
        },
        {
            id: "ch14_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا سال چاپ بشه:",
            code: "print(today.year)\ntoday = datetime.date.today()\nimport datetime",
            correct_order: ["import datetime", "today = datetime.date.today()", "print(today.year)"],
            answer: ["import datetime", "today = datetime.date.today()", "print(today.year)"],
            hint: "import اول، بعد استفاده",
            xp: 25,
            explanation: "اول ماژول میاد، بعد تاریخ امروز، بعد چاپ سال."
        }
    ],
    project: {
        id: "ch14_project",
        title: "قرعه‌کشی",
        brief: "لیستی از ۵ اسم بساز، با random.choice یه برنده انتخاب کن و با math از یه محاسبه استفاده کن. نتیجه رو چاپ کن.",
        accepts: [
            { check: (c) => /import\s+random/.test(c), success: "random import کردی", hint: "import random", points: 3 },
            { check: (c) => /random\.choice|random\.randint/.test(c), success: "تصادفی استفاده کردی", hint: "با random.choice برنده رو انتخاب کن", points: 4 },
            { check: (c) => /import\s+math/.test(c), success: "math import کردی", hint: "import math هم لازمه", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

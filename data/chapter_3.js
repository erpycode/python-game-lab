PB.registerChapter({
    version: 2,
    id: 3,
    title: "شرط‌ها",
    level: "intermediate",
    lesson: {
        title: "شرط‌ها — تصمیم‌گیری",
        intro: "برنامه‌های واقعی همیشه یک مسیر رو نمی‌رن؛ بسته به شرایط، مسیرهای مختلفی انتخاب می‌کنن. شرط‌ها (if/elif/else) همون‌نقش رو توی پایتون دارن: «اگه این درست بود این کار رو بکن، وگرنه اون کار رو.»",
        sections: [
            {
                icon: "🛤️",
                title: "if ساده",
                text: "ساده‌ترین شرط: اگه درست بود، بلاک اجرا می‌شه.\n\nقوانین:\n• بعد از شرط باید : بذاری\n• بلاک باید تورفتگی داشته باشه (indentation)\n• تورفتگی معمولاً ۴ فاصله‌ست",
                code: "age = 20\nif age >= 18:\n    print('بالغ هستی')\n    print('خوش اومدی!')",
                output: "بالغ هستی\nخوش اومدی!"
            },
            {
                icon: "🔄",
                title: "if/else",
                text: "با else می‌تونی مسیر دوم (وقتی شرط غلطه) رو تعریف کنی:\n\nاگه شرط درست → بلاک if\nاگه شرط غلط → بلاک else\n\nنکته: else خودش شرط نداره و بعد از بلاک if میاد.",
                code: "password = '1234'\nif password == '1234':\n    print('ورود موفق')\nelse:\n    print('رمز اشتباهه')",
                output: "ورود موفق"
            },
            {
                icon: "🔀",
                title: "if/elif/else",
                text: "برای چند مسیر، از elif استفاده کن (مخفف else if):\n\nاگه چندتا شرط پشت سر هم داشته باشی، اولین شرط درست اجرا می‌شه و بقیه نادیده گرفته می‌شن.",
                code: "score = 85\nif score >= 90:\n    print('عالی')\nelif score >= 70:\n    print('خوب')\nelif score >= 50:\n    print('قابل قبول')\nelse:\n    print('باید بیشتر تلاش کنی')",
                output: "خوب"
            },
            {
                icon: "🧩",
                title: "شرط‌های ترکیبی",
                text: "می‌تونی چند شرط رو با and و or ترکیب کنی:\n\nif age >= 18 and has_id:\n    print('مجاز')\n\nif score < 50 or attempts > 3:\n    print('تلاش دوباره')",
                code: "age = 25\nhas_ticket = True\n\nif age >= 18 and has_ticket:\n    print('ورود مجاز است')\nelse:\n    print('ورود ممنوع')",
                output: "ورود مجاز است"
            },
            {
                icon: "⌨️",
                title: "گرفتن ورودی با input",
                text: "با input() می‌تونی از کاربر ورودی بگیری:\n\nنام = input('اسمت چیه؟ ')\n\n⚠️ مهم: input همیشه رشته برمی‌گردونه! اگه می‌خوای عدد بگیری باید تبدیلش کنی:\nسن = int(input('سنت چنده؟ '))",
                code: "name = input('اسمت چیه؟ ')\nprint('سلام', name)\n\nage = int(input('سنت چنده؟ '))\nif age >= 18:\n    print('بزرگسال')\nelse:\n    print('نوجوان')",
                output: ""
            }
        ],
        tips: [
            "بعد از if/elif/else حتماً دو نقطه (:) بذار.",
            "تورفتگی بلاک‌ها رو یکسان نگه دار — وگرنه خطای IndentationError می‌گیری.",
            "شرط‌های ترکیبی با and/or کد رو تمیزتر می‌کنن تا if تو در تو.",
        ]
    },
    exercises: [
        {
            id: "ch3_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "x = 10\nif x > 5:\n    print('بزرگ')\nelse:\n    print('کوچک')",
            answer: "بزرگ",
            hint: "10 بزرگ‌تر از 5 هست یا نه؟",
            hints: ["10 > 5 درسته", "پس بلاک if اجرا می‌شه"],
            explanation: "10 بزرگ‌تر از 5 هست، پس چاپ «بزرگ» انجام می‌شه."
        },
        {
            id: "ch3_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "score = 65\nif score >= 70:\n    print('قبول')\nelse:\n    print('مردود')",
            answer: "مردود",
            hint: "65 بزرگ‌تر مساوی 70 هست؟",
            hints: ["65 < 70", "پس else اجرا می‌شه"],
            explanation: "65 از 70 کمتره، شرط False هست و بلاک else اجرا می‌شه: «مردود»."
        },
        {
            id: "ch3_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "num = 7\nif num % 2 == 0:\n    print('زوج')\nelse:\n    print('فرد')",
            answer: "فرد",
            hint: "باقیمانده‌ی 7 تقسیم بر 2 چیه؟",
            hints: ["7 % 2 = 1", "1 == 0 غلطه → else"],
            explanation: "7 % 2 برابر 1 هست که مساوی 0 نیست، پس عدد فرده و «فرد» چاپ می‌شه."
        },
        {
            id: "ch3_e4",
            type: "quiz",
            title: "کدوم خط اجرا می‌شه؟",
            code: "score = 45\nif score >= 90:\n    print('A')\nelif score >= 70:\n    print('B')\nelif score >= 50:\n    print('C')\nelse:\n    print('D')",
            options: [
                { label: "a", text: "A" },
                { label: "b", text: "B" },
                { label: "c", text: "C" },
                { label: "d", text: "D" }
            ],
            correct: "d",
            hint: "45 از همه‌ی شرط‌ها کوچیک‌تره",
            hints: ["45 < 50", "هیچ شرطی درست نیست → else"],
            explanation: "45 کمتر از همه‌ی حدهاست، هیچ شرطی True نمی‌شه و else اجرا می‌شه: D."
        },
        {
            id: "ch3_e5",
            type: "fill_gap",
            title: "شرط رو کامل کن تا «مجاز» چاپ بشه:",
            code: "age = 20\nhas_id = True\nif age >= 18 ___ has_id:\n    print('مجاز')\nelse:\n    print('ممنوع')",
            answer: "and",
            hint: "هر دو شرط باید درست باشن",
            hints: ["age >= 18 درسته و has_id درسته", "کدوم عملگر هر دو رو لازم داره؟"],
            explanation: "برای اینکه هر دو شرط (سن و کارت) لازم باشن، باید از and استفاده کنیم."
        },
        {
            id: "ch3_e6",
            type: "bug_hunter",
            title: "کجای کد خطا داره؟",
            code: "age = 15\nif age >= 18:\n    print('بزرگسال')\nelse:\nprint('نوجوان')",
            error_line: 5,
            reason: "بلاک else باید تورفتگی داشته باشه — دستور print هم‌سطح else نیست",
            hint: "تورفتگی خط آخر رو نگاه کن",
            explanation: "print('نوجوان') هیچ تورفتگی‌ای نداره، در حالی که باید داخل بلاک else باشه. این IndentationError می‌ده."
        }
    ],
    challenges: [
        {
            id: "ch3_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "temp = 35\nif temp > 30:\n    print('گرمه!')\nelse:\n    print('خنکه')",
            answer: "گرمه!",
            hint: "35 از 30 بزرگ‌تره",
            xp: 10,
            explanation: "35 بزرگ‌تر از 30 هست، پس «گرمه!» چاپ می‌شه."
        },
        {
            id: "ch3_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "شرط رو کامل کن تا «شب» چاپ بشه:",
            code: "hour = 23\nif hour ___ 18:\n    print('شب')\nelse:\n    print('روز')",
            answer: ">",
            hint: "23 از 18 بزرگ‌تره",
            xp: 15,
            explanation: "برای اینکه 23 ___ 18 درست باشه باید از > استفاده کنیم."
        },
        {
            id: "ch3_c3",
            type: "quiz",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "x = 5\ny = 10\nif x > 3 and y < 8:\n    print('A')\nelse:\n    print('B')",
            options: [
                { label: "a", text: "A" },
                { label: "b", text: "B" },
                { label: "c", text: "خطا" },
                { label: "d", text: "هیچی" }
            ],
            correct: "b",
            hint: "هر دو شرط رو بررسی کن",
            xp: 20,
            explanation: "x > 3 درسته ولی y < 8 غلطه (10 < 8 نیست). چون and هست، کل شرط False می‌شه → B."
        },
        {
            id: "ch3_c4",
            type: "bug_hunter",
            difficulty: "hard",
            title: "این کد کجا خطا داره؟",
            code: "grade = 85\nif grade >= 90:\n    print('عالی')\nelif grade >= 70:\n    print('خوب')\nelse grade >= 50:\n    print('قابل قبول')",
            error_line: 5,
            reason: "else نمی‌تونه شرط داشته باشه — باید elif باشه",
            hint: "خط آخر: else با شرط استفاده شده",
            xp: 25,
            explanation: "else بدون شرطه؛ وقتی بعد از else شرط می‌خوای باید از elif استفاده کنی."
        },
        {
            id: "ch3_c5",
            type: "sort",
            difficulty: "hard",
            title: "خطوط رو مرتب کن تا خروجی «جذاب» بشه:",
            code: "print('جذاب')\nprint('خسته‌کننده')\nscore = 95\nif score >= 90:\nelse:",
            correct_order: ["score = 95", "if score >= 90:", "    print('جذاب')", "else:", "    print('خسته‌کننده')"],
            answer: ["score = 95", "if score >= 90:", "    print('جذاب')", "else:", "    print('خسته‌کننده')"],
            hint: "متغیر اول، شرط بعد، بعد بلاک‌ها",
            xp: 25,
            explanation: "اول متغیر تعریف می‌شه، بعد شرط if، بعد بلاکش، بعد else و بلاکش."
        }
    ],
    project: {
        id: "ch3_project",
        title: "دستگاه رای‌گیری",
        brief: "برنامه‌ای بنویس که سن کاربر رو بگیره و اگه بالای ۱۸ بود «مجاز به رای» وگرنه «مجاز نیست» چاپ کنه.",
        accepts: [
            { check: (c) => /input/.test(c), success: "از input استفاده کردی", hint: "با input سن کاربر رو بگیر", points: 3 },
            { check: (c) => /int\s*\(/.test(c), success: "ورودی رو به عدد تبدیل کردی", hint: "با int() ورودی رو عدد کن", points: 3 },
            { check: (c) => /if\s/.test(c), success: "شرط داری", hint: "با if شرط سن رو بررسی کن", points: 3 },
            { check: (c) => /else/.test(c), success: "مسیر دوم داری", hint: "با else حالت مخالف رو پوشش بده", points: 2 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

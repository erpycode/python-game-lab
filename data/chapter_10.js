PB.registerChapter({
    version: 2,
    id: 10,
    title: "مدیریت خطا",
    level: "advanced",
    lesson: {
        title: "مدیریت خطا — try و except",
        intro: "خطا بخشی از برنامه‌نویسیه، حتی برای حرفه‌ای‌ها! فرق برنامه‌نویس حرفه‌ای اینه که خطاها رو پیش‌بینی می‌کنه و برنامه رو طوری می‌نویسه که به جای کرش، پیام خوب نشون بده.",
        sections: [
            {
                icon: "⚠️",
                title: "خطاهای رایج",
                text: "سه تا از معروف‌ترین خطاها:\n\nNameError — متغیر تعریف نشده\nTypeError — نوع داده‌ی اشتباه\nValueError — مقدار اشتباه\n\nZeroDivisionError — تقسیم بر صفر!",
                code: "print(10 / 0)\nprint('این خط اجرا نمی‌شه')",
                output: ""
            },
            {
                icon: "🛡️",
                title: "try و except",
                text: "ساختار:\n\ntry:\n    کدِ ممکن‌الخطا\n    except:\n    کدِ خطا\n\nاگه توی try خطا بیفته، except اجرا می‌شه و برنامه نمی‌میره.",
                code: "try:\n    num = int('abc')\nexcept ValueError:\n    print('عدد معتبر نیست!')\n\nprint('برنامه ادامه دارد')",
                output: "عدد معتبر نیست!\nبرنامه ادامه دارد"
            },
            {
                icon: "🧭",
                title: "except خاص و عمومی",
                text: "می‌تونی خطای خاص یا همه‌ی خطاها رو بگیری:\n\nexcept ValueError:  ← فقط ValueError\nexcept TypeError:  ← فقط TypeError\nexcept Exception:  ← هر خطایی\n\nترتیب مهمه: خاص اول، عمومی آخر.",
                code: "try:\n    x = int('abc')\nexcept ValueError:\n    print('خطای مقدار')\nexcept TypeError:\n    print('خطای نوع')\nexcept Exception:\n    print('یه خطای دیگه')",
                output: "خطای مقدار"
            },
            {
                icon: "🚀",
                title: "raise — ساختن خطا",
                text: "با raise خودت می‌تونی خطا بسازی:\n\nraise ValueError('پیام')\n\nکاربرد: وقتی ورودی غیرقابل قبوله، سریع هشدار بده.",
                code: "def set_age(age):\n    if age < 0:\n        raise ValueError('سن نمی‌تونه منفی باشه')\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print('خطا:', e)",
                output: "خطا: سن نمی‌تونه منفی باشه"
            }
        ],
        tips: [
            "except خالی همه‌ی خطاها رو می‌گیره — ولی بهتره خاص باشه.",
            "با as e می‌تونی پیام خطا رو بگیری.",
            "خطا رو به‌موقع با raise بساز، نه دیر!",
        ]
    },
    exercises: [
        {
            id: "ch10_e1",
            type: "quiz",
            title: "این کد چه خطایی می‌ده؟",
            code: "print(10 / 0)",
            options: [
                { label: "a", text: "NameError" },
                { label: "b", text: "ValueError" },
                { label: "c", text: "ZeroDivisionError" },
                { label: "d", text: "TypeError" }
            ],
            correct: "c",
            hint: "تقسیم بر چی؟",
            hints: ["تقسیم بر صفر", "ZeroDivisionError"],
            explanation: "تقسیم بر صفر خطای ZeroDivisionError می‌ده."
        },
        {
            id: "ch10_e2",
            type: "quiz",
            title: "این کد چه خطایی می‌ده؟",
            code: "print(x)",
            options: [
                { label: "a", text: "NameError" },
                { label: "b", text: "ValueError" },
                { label: "c", text: "ZeroDivisionError" },
                { label: "d", text: "TypeError" }
            ],
            correct: "a",
            hint: "x تعریف نشده",
            hints: ["متغیر x وجود نداره", "NameError"],
            explanation: "متغیر x تعریف نشده → NameError."
        },
        {
            id: "ch10_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "try:\n    print('A')\n    int('xyz')\nexcept ValueError:\n    print('B')\n\nprint('C')",
            answer: "A\nB\nC",
            hint: "A چاپ می‌شه، بعد خطا، بعد B و C",
            hints: ["'A' قبل از خطا", "int('xyz') خطا می‌ده → except", "بعد 'C'"],
            explanation: "A چاپ می‌شه، بعد int('xyz') خطای ValueError می‌ده که except می‌گیره (B)، بعد C چاپ می‌شه."
        },
        {
            id: "ch10_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "try:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    result = 0\n\nprint(result)",
            answer: "5.0",
            hint: "خطایی پیش نمیاد — ولی دقت کن!",
            hints: ["10 / 2 = 5", "ولی / همیشه float برمی‌گردونه", "پس 5.0"],
            explanation: "تقسیم بر 2 خطا نداره و except اجرا نمی‌شه. عملگر / همیشه عدد اعشاری برمی‌گردونه، پس 5.0."
        },
        {
            id: "ch10_e5",
            type: "fill_gap",
            title: "کد رو کامل کن:",
            code: "try:\n    num = int('abc')\nexcept ___:\n    print('عدد نیست')",
            answer: "ValueError",
            hint: "خطای تبدیل رشته به عدد",
            hints: ["int('abc') خطای ValueError می‌ده", "ValueError"],
            explanation: "تبدیل رشته‌ی غیرعددی به int خطای ValueError می‌ده."
        },
        {
            id: "ch10_e6",
            type: "bug_hunter",
            title: "این کد بدون try خطا می‌ده — کدوم خط؟",
            code: "data = [1, 2]\nprint(data[5])\nprint('پایان')",
            error_line: 2,
            reason: "ایندکس 5 توی لیست ۲ عنصری وجود نداره → IndexError",
            hint: "ایندکس از محدوده بیرونه",
            explanation: "دسترسی به ایندکس 5 توی لیست ۲ عنصری خطای IndexError می‌ده."
        }
    ],
    challenges: [
        {
            id: "ch10_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "try:\n    print('سلام')\nexcept:\n    print('خطا')\n\nprint('پایان')",
            answer: "سلام\nپایان",
            hint: "هیچ خطایی نیست",
            xp: 10,
            explanation: "توی try خطایی نیست، پس except اجرا نمی‌شه. «سلام» و «پایان» چاپ می‌شن."
        },
        {
            id: "ch10_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد باعث خطا می‌شه؟",
            code: "age = int('25')\nprint(age)\nheight = int('قد')",
            error_line: 3,
            reason: "'قد' رشته‌ی عددی نیست و int() نمی‌تونه تبدیلش کنه → ValueError",
            hint: "تبدیل یک رشته‌ی غیرعددی",
            xp: 20,
            explanation: "int('قد') چون «قد» عدد نیست، ValueError می‌ده."
        },
        {
            id: "ch10_c3",
            type: "quiz",
            difficulty: "medium",
            title: "بهترین راه گرفتن این خطا چیه؟",
            code: "result = 10 / 0",
            options: [
                { label: "a", text: "except ZeroDivisionError" },
                { label: "b", text: "except ValueError" },
                { label: "c", text: "except NameError" },
                { label: "d", text: "except KeyError" }
            ],
            correct: "a",
            hint: "نوع خطا رو دقیق بنویس",
            xp: 15,
            explanation: "تقسیم بر صفر خطای ZeroDivisionError می‌ده، پس باید همون رو بگیریم."
        },
        {
            id: "ch10_c4",
            type: "fill_gap",
            difficulty: "hard",
            title: "خطا بساز وقتی سن منفیه:",
            code: "def check_age(age):\n    if age < 0:\n        ___ ValueError('سن منفی')\n    return age",
            answer: "raise",
            hint: "ساخت خطا",
            xp: 25,
            explanation: "با raise می‌تونی خطای دلخواهت رو بسازی."
        },
        {
            id: "ch10_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا خطا بگیره:",
            code: "except ValueError:\n    print('خطا')\ntry:\n    int('x')",
            correct_order: ["try:", "    int('x')", "except ValueError:", "    print('خطا')"],
            answer: ["try:", "    int('x')", "except ValueError:", "    print('خطا')"],
            hint: "try اول، بعد کد، بعد except",
            xp: 25,
            explanation: "اول try و کد خطادار، بعد except با مدیریت خطا."
        }
    ],
    project: {
        id: "ch10_project",
        title: "ماشین‌حساب ضدخطا",
        brief: "یه تابع بنویس که دو عدد بگیره و تقسیمشون کنه. اگه تقسیم بر صفر بود، به جای خطا پیام «تقسیم بر صفر ممنوع» چاپ کنه.",
        accepts: [
            { check: (c) => /def\s+\w+\s*\(/.test(c), success: "تابع داری", hint: "با def تابع بساز", points: 3 },
            { check: (c) => /try\s*:/.test(c), success: "try داری", hint: "کد تقسیم رو توی try بذار", points: 4 },
            { check: (c) => /except\s+ZeroDivisionError|except\s*:/.test(c), success: "خطا رو می‌گیری", hint: "با except خطا رو بگیر", points: 4 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه یا پیام خطا رو چاپ کن", points: 2 }
        ],
        passScore: 70
    }
});

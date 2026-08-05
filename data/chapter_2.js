PB.registerChapter({
    version: 2,
    id: 2,
    title: "عملگرها",
    level: "beginner",
    lesson: {
        title: "عملگرها — زبان محاسبه",
        intro: "عملگرها به پایتون می‌گن چیکار کنه: جمع کنه، کم کنه، مقایسه کنه یا ترکیب کنه. مثل علامت‌های ریاضی که بلدی، پایتون هم همون‌ها رو با چند تا دوست جدید استفاده می‌کنه.",
        sections: [
            {
                icon: "➕",
                title: "عملگرهای ریاضی",
                text: "شش عملگر ریاضی اصلی:\n\n+ جمع\n- تفریق\n* ضرب\n/ تقسیم (همیشه float برمی‌گردونه)\n// تقسیم صحیح (عدد صحیح)\n% باقیمانده\n** توان\n\nنکته‌ی جالب: توی پایتون، / همیشه عدد اعشاری می‌ده، حتی اگه تقسیم کامل باشه!",
                code: "print(10 + 3)\nprint(10 - 3)\nprint(10 * 3)\nprint(10 / 3)\nprint(10 // 3)\nprint(10 % 3)\nprint(2 ** 3)",
                output: "13\n7\n30\n3.3333333333333335\n3\n1\n8"
            },
            {
                icon: "⚖️",
                title: "عملگرهای مقایسه",
                text: "نتیجه‌ی مقایسه همیشه True یا False هست:\n\n== مساوی (نه = !)\n!= نابرابر\n> بزرگ‌تر\n< کوچک‌تر\n>= بزرگ‌تر یا مساوی\n<= کوچک‌تر یا مساوی\n\nاشتباه رایج: = برای مقداردهیه، == برای مقایسه. این دو رو قاطی نکن!",
                code: "print(5 == 5)\nprint(5 != 3)\nprint(7 > 4)\nprint(7 < 4)\nprint(4 >= 4)\nprint(3 <= 2)",
                output: "True\nTrue\nTrue\nFalse\nTrue\nFalse"
            },
            {
                icon: "🧠",
                title: "عملگرهای منطقی",
                text: "سه عملگر منطقی برای ترکیب شرط‌ها:\n\nand — هر دو درست باشن\nor — یکی درست باشه\nnot — برعکس کن\n\nمثال: (5 > 3) and (2 < 4) → True\nمثال: not True → False",
                code: "print(True and True)\nprint(True and False)\nprint(True or False)\nprint(False or False)\nprint(not True)\nprint(not False)",
                output: "True\nFalse\nTrue\nFalse\nFalse\nTrue"
            },
            {
                icon: "🔢",
                title: "اولویت عملگرها",
                text: "پایتون مثل ریاضی، اولویت داره:\n\n1) پرانتز ( )\n2) توان **\n3) ضرب و تقسیم * / // %\n4) جمع و تفریق + -\n\nمثال: 2 + 3 * 4 = 14 (نه 20!)\nمثال: (2 + 3) * 4 = 20",
                code: "print(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(2 ** 3 + 1)\nprint(10 - 2 ** 2)",
                output: "14\n20\n9\n6"
            },
            {
                icon: "🔗",
                title: "رشته‌ها با + و *",
                text: "عملگرها روی رشته‌ها هم کار می‌کنن:\n\n+ توی رشته یعنی کنار هم گذاشتن (concatenation)\n* توی رشته یعنی تکرار\n\n'سلام' + ' دنیا' → 'سلام دنیا'\n'ها' * 3 → 'هاهاها'\n\n⚠️ ولی جمع عدد با رشته خطا می‌ده!",
                code: "first = 'پایتون'\nsecond = 'باز'\nprint(first + ' ' + second)\nprint('زنگ!' * 3)",
                output: "پایتون باز\nزنگ!زنگ!زنگ!"
            }
        ],
        tips: [
            "از / برای تقسیم دقیق (اعشاری) و از // برای تقسیم صحیح استفاده کن.",
            "برای چک مساوی بودن از == استفاده کن، نه =.",
            "پرانتز باعث خوانایی بیشتر کد می‌شه — ازش خجالت نکش!",
        ]
    },
    exercises: [
        {
            id: "ch2_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "print(7 * 8)",
            answer: "56",
            hint: "ضرب ساده",
            hints: ["7 ضربدر 8", "جدول ضرب رو یادت بیار"],
            explanation: "7 ضربدر 8 برابر 56 هست."
        },
        {
            id: "ch2_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "print(17 // 5)",
            answer: "3",
            hint: "تقسیم صحیح — باقیمانده رو حذف می‌کنه",
            hints: ["17 تقسیم بر 5 چند میشه؟", "17 = 3*5 + 2 پس نتیجه صحیح 3 هست"],
            explanation: "17 تقسیم بر 5 برابر 3 با باقیمانده 2 هست. // فقط قسمت صحیح (3) رو برمی‌گردونه."
        },
        {
            id: "ch2_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "print(17 % 5)",
            answer: "2",
            hint: "باقیمانده تقسیم",
            hints: ["17 تقسیم بر 5 چی باقی می‌ذاره؟", "5*3 = 15 پس 17 - 15 = 2"],
            explanation: "باقیمانده‌ی تقسیم 17 بر 5 برابر 2 هست."
        },
        {
            id: "ch2_e4",
            type: "quiz",
            title: "نتیجه‌ی این مقایسه چیه؟",
            code: "print(3 + 2 == 5)",
            options: [
                { label: "a", text: "True" },
                { label: "b", text: "False" },
                { label: "c", text: "5" },
                { label: "d", text: "خطا" }
            ],
            correct: "a",
            hint: "اول سمت راست = حساب می‌شه",
            hints: ["3 + 2 = 5", "5 == 5 درسته → True"],
            explanation: "اول 3 + 2 حساب می‌شه (5)، بعد مقایسه 5 == 5 که True می‌ده."
        },
        {
            id: "ch2_e5",
            type: "quiz",
            title: "کدوم عبارت False می‌ده؟",
            code: "چه عبارتی غلطه؟",
            options: [
                { label: "a", text: "10 > 3" },
                { label: "b", text: "5 != 5" },
                { label: "c", text: "7 >= 7" },
                { label: "d", text: "3 < 9" }
            ],
            correct: "b",
            hint: "!= یعنی نابرابر",
            hints: ["5 != 5 یعنی ۵ مساوی ۵ نیست — که غلطه", "پس False می‌ده"],
            explanation: "5 != 5 یعنی «۵ نابرابر ۵» که غلط (False) هست چون 5 مساوی 5 است."
        },
        {
            id: "ch2_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "print(2 + 3 * 4)",
            answer: "14",
            hint: "اولویت: ضرب قبل از جمع",
            hints: ["ضرب اول حساب می‌شه: 3*4 = 12", "بعد جمع: 2 + 12 = 14"],
            explanation: "طبق اولویت عملگرها، ضرب (3*4=12) قبل از جمع حساب می‌شه، پس 2+12=14."
        }
    ],
    challenges: [
        {
            id: "ch2_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "print(2 ** 4)",
            answer: "16",
            hint: "توان — 2 به توان 4",
            xp: 10,
            explanation: "2 به توان 4 یعنی 2*2*2*2 که برابر 16 هست."
        },
        {
            id: "ch2_c2",
            type: "quiz",
            difficulty: "easy",
            title: "کدوم عملگر باقیمانده‌ی تقسیم رو برمی‌گردونه؟",
            code: "",
            options: [
                { label: "a", text: "/" },
                { label: "b", text: "//" },
                { label: "c", text: "%" },
                { label: "d", text: "**" }
            ],
            correct: "c",
            hint: "به علامت درصد دقت کن",
            xp: 10,
            explanation: "عملگر % باقیمانده‌ی تقسیم رو برمی‌گردونه. مثلاً 17 % 5 برابر 2 هست."
        },
        {
            id: "ch2_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "x = 5\nif x = 5:\n    print('پنج')",
            error_line: 2,
            reason: "برای مقایسه باید == استفاده بشه نه =",
            hint: "تو مقایسه از = استفاده شده",
            xp: 20,
            explanation: "توی شرط if باید == باشه نه =. خط دوم (`if x = 5:`) خطا داره."
        },
        {
            id: "ch2_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "a = 10\nb = 4\nprint((a - b) * 2)",
            answer: "12",
            hint: "اول پرانتز، بعد ضرب",
            xp: 15,
            explanation: "اول a - b = 6، بعد 6 * 2 = 12."
        },
        {
            id: "ch2_c5",
            type: "fill_gap",
            difficulty: "hard",
            title: "جای خالی رو پر کن تا خروجی True بشه:",
            code: "age = 18\nprint(age ___ 18)",
            answer: ">=",
            hint: "age برابر 18 هست؛ برای True شدن باید 18 >= 18 باشه",
            xp: 25,
            explanation: "age = 18 پس برای اینکه 18 ___ 18 درست (True) باشه باید >= باشه."
        }
    ],
    project: {
        id: "ch2_project",
        title: "ماشین حساب کوچک",
        brief: "یه برنامه بنویس که دو عدد ذخیره کنه و جمع، تفریق، ضرب، تقسیم صحیح و باقیمانده‌شون رو چاپ کنه.",
        accepts: [
            { check: (c) => /print\s*\(/.test(c), success: "از print استفاده کردی", hint: "نتیجه‌ها رو با print نشون بده", points: 2 },
            { check: (c) => /[+\-*]/.test(c), success: "جمع/تفریق/ضرب داری", hint: "از + و - و * استفاده کن", points: 3 },
            { check: (c) => /\/\//.test(c), success: "تقسیم صحیح داری", hint: "با // تقسیم صحیح بزن", points: 3 },
            { check: (c) => /%/.test(c), success: "باقیمانده داری", hint: "با % باقیمانده بگیر", points: 3 },
            { check: (c) => /=/.test(c), success: "متغیر داری", hint: "اعداد رو توی متغیر بذار", points: 2 }
        ],
        passScore: 70
    }
});

PB.registerChapter({
    version: 2,
    id: 7,
    title: "دیکشنری‌ها",
    level: "advanced",
    lesson: {
        title: "دیکشنری‌ها — کلید و مقدار",
        intro: "لیست خوبه ولی یه مشکل داره: باید ایندکس عددی رو حفظ کنی. دیکشنری بهت اجازه می‌ده به جای عدد از اسم استفاده کنی — مثل یه فرهنگ لغت که کلیدش کلمه‌ست و مقدارش معنی.",
        sections: [
            {
                icon: "🔑",
                title: "ساخت دیکشنری",
                text: "دیکشنری با { } و به شکل کلید: مقدار ساخته می‌شه:\n\nperson = {'name': 'علی', 'age': 25}\n\nدسترسی: person['name'] → 'علی'\n\nکلیدها unique هستن — اگه تکراری باشن، آخرین مقدار می‌مونه.",
                code: "person = {\n    'name': 'علی',\n    'age': 25,\n    'city': 'تهران'\n}\n\nprint(person['name'])\nprint(person['age'])\nprint(len(person))",
                output: "علی\n25\n3"
            },
            {
                icon: "✏️",
                title: "تغییر و اضافه",
                text: "اضافه کردن یا تغییر خیلی راحته:\n\nperson['email'] = 'ali@example.com'  ← اضافه\nperson['age'] = 26  ← تغییر\n\nحذف:\ndel person['city']\n\nیا: person.pop('city')",
                code: "person = {'name': 'سارا'}\nperson['age'] = 30\nperson['name'] = 'سارا محمدی'\nprint(person)\n\nperson['city'] = 'شیراز'\nprint(person)",
                output: "{'name': 'سارا محمدی', 'age': 30}\n{'name': 'سارا محمدی', 'age': 30, 'city': 'شیراز'}"
            },
            {
                icon: "🔍",
                title: "متدهای اصلی",
                text: "سه متد پرکاربرد:\n\n.keys() → همه کلیدها\n.values() → همه مقادیر\n.items() → جفت‌های (کلید, مقدار)\n\nاین متدها برای حلقه زدن عالی هستن.",
                code: "scores = {'ریاضی': 18, 'علوم': 16, 'ادبیات': 20}\n\nfor subject in scores.keys():\n    print('درس:', subject)\n\nfor subject, score in scores.items():\n    print(subject, score)",
                output: "درس: ریاضی\nدرس: علوم\nدرس: ادبیات\nریاضی 18\nعلوم 16\nادبیات 20"
            },
            {
                icon: "🛡️",
                title: "get و بررسی وجود",
                text: "دسترسی مستقیم person['key'] اگه کلید نباشه خطا می‌ده!\n\nراه امن: person.get('key')\nاگه کلید نباشه → None (یا مقدار پیش‌فرض)\n\nبررسی وجود:\nif 'name' in person:",
                code: "person = {'name': 'علی'}\nprint(person.get('age'))\nprint(person.get('age', 0))\n\nif 'name' in person:\n    print('name هست')\n\nif 'age' not in person:\n    print('age نیست')",
                output: "None\n0\nname هست\nage نیست"
            }
        ],
        tips: [
            "دیکشنری برای داده‌های با نام مناسبه، لیست برای داده‌های مرتب.",
            "از .get() استفاده کن تا خطای KeyError نگیری.",
            "حلقه با .items() تمیزترین راه پیمایشه.",
        ]
    },
    exercises: [
        {
            id: "ch7_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "person = {'name': 'علی', 'age': 25}\nprint(person['name'])",
            answer: "علی",
            hint: "دسترسی با کلید",
            hints: ["person['name']", "مقدار کلید name = 'علی'"],
            explanation: "کلید 'name' مقدار 'علی' داره."
        },
        {
            id: "ch7_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "person = {'name': 'علی', 'age': 25}\nprint(len(person))",
            answer: "2",
            hint: "تعداد جفت کلید-مقدار",
            hints: ["دو تا کلید هست", "name و age"],
            explanation: "دیکشنری ۲ جفت کلید-مقدار داره، پس len = 2."
        },
        {
            id: "ch7_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "car = {'brand': 'bmw', 'year': 2020}\ncar['year'] = 2024\nprint(car['year'])",
            answer: "2024",
            hint: "مقدار سال عوض شده",
            hints: ["year اول 2020 بود", "با = عوضش کردی → 2024"],
            explanation: "مقدار کلید 'year' به 2024 تغییر کرده."
        },
        {
            id: "ch7_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "person = {'name': 'سارا'}\nprint(person.get('age', 18))",
            answer: "18",
            hint: "age نیست → مقدار پیش‌فرض",
            hints: ["get دنبال age می‌گرده", "پیدا نمی‌کنه → 18 برمی‌گردونه"],
            explanation: "کلید 'age' وجود نداره، پس get مقدار پیش‌فرض 18 رو برمی‌گردونه."
        },
        {
            id: "ch7_e5",
            type: "quiz",
            title: "خروجی این کد چیه؟",
            code: "d = {'a': 1, 'b': 2}\nprint(d.keys())",
            options: [
                { label: "a", text: "[1, 2]" },
                { label: "b", text: "['a', 'b']" },
                { label: "c", text: "{'a', 'b'}" },
                { label: "d", text: "{1, 2}" }
            ],
            correct: "b",
            hint: "keys یعنی کلیدها",
            hints: ["کلیدها a و b هستن", "نمایش به صورت لیست‌وار"],
            explanation: "d.keys() همه کلیدها رو برمی‌گردونه: a و b."
        },
        {
            id: "ch7_e6",
            type: "fill_gap",
            title: "مقدار رو اضافه کن:",
            code: "person = {'name': 'علی'}\nperson['age'] = ___\nprint(person['age'])",
            answer: "25",
            hint: "یه عدد انتخاب کن",
            hints: ["مقدار کلید age باید عدد باشه", "مثلاً 25"],
            explanation: "با person['age'] = 25 مقدار 25 به کلید age داده می‌شه."
        }
    ],
    challenges: [
        {
            id: "ch7_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "student = {'name': 'علی', 'grade': 19}\nprint(student['grade'])",
            answer: "19",
            hint: "مقدار کلید grade",
            xp: 10,
            explanation: "کلید 'grade' مقدار 19 داره."
        },
        {
            id: "ch7_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "person = {'name': 'علی'}\nprint(person['age'])",
            error_line: 2,
            reason: "کلید 'age' توی دیکشنری نیست و دسترسی مستقیم خطای KeyError می‌ده",
            hint: "دسترسی به کلیدی که نیست",
            xp: 20,
            explanation: "دسترسی مستقیم person['age'] وقتی کلید نباشه خطای KeyError می‌ده. باید از get استفاده کنی."
        },
        {
            id: "ch7_c3",
            type: "quiz",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "d = {'x': 1}\nd['y'] = 2\nd['x'] = 10\nprint(len(d))",
            options: [
                { label: "a", text: "2" },
                { label: "b", text: "3" },
                { label: "c", text: "4" },
                { label: "d", text: "خطا" }
            ],
            correct: "a",
            hint: "تغییر کلید موجود تعداد رو زیاد نمی‌کنه",
            xp: 20,
            explanation: "d['x'] = 10 فقط مقدار رو عوض می‌کنه، کلید جدید نمی‌سازه. پس ۲ کلید داره: x و y."
        },
        {
            id: "ch7_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "person = {'name': 'سارا', 'age': 30}\nprint(person.get('city', 'نامشخص'))",
            answer: "نامشخص",
            hint: "city توی دیکشنری نیست",
            xp: 15,
            explanation: "کلید city وجود نداره، پس get مقدار پیش‌فرض «نامشخص» رو برمی‌گردونه."
        },
        {
            id: "ch7_c5",
            type: "fill_gap",
            difficulty: "hard",
            title: "کد رو کامل کن تا «سارا: 30» چاپ بشه:",
            code: "person = {'name': 'سارا', 'age': 30}\nfor key, value in person.___():\n    print(key, ':', value)",
            answer: "items",
            hint: "متدی که جفت‌های کلید-مقدار می‌ده",
            xp: 25,
            explanation: "person.items() جفت‌های (کلید, مقدار) رو برمی‌گردونه که میشه توی حلقه unpack کرد."
        }
    ],
    project: {
        id: "ch7_project",
        title: "کارنامه درسی",
        brief: "دیکشنری‌ای بساز با ۳ درس و نمره. با items حلقه بزن و هر درس و نمره‌ش رو چاپ کن، بعد میانگین نمره‌ها رو حساب و چاپ کن.",
        accepts: [
            { check: (c) => /\{.*:.*\}[\s\S]*/.test(c), success: "دیکشنری ساختی", hint: "با { } و کلید:مقدار بساز", points: 3 },
            { check: (c) => /\.items\s*\(/.test(c), success: "از items استفاده کردی", hint: "با .items() حلقه بزن", points: 4 },
            { check: (c) => /for\s+\w+\s*,\s*\w+\s+in\s+/.test(c), success: "حلقه با دو متغیر داری", hint: "for lesson, grade in ...", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 },
            { check: (c) => /sum\s*\(|len\s*\(|\/\s*len|average|avg/.test(c), success: "میانگین حساب کردی", hint: "جمع نمره‌ها تقسیم بر تعداد", points: 3 }
        ],
        passScore: 70
    }
});

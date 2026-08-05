PB.registerChapter({
    version: 2,
    id: 9,
    title: "مدیریت فایل",
    level: "advanced",
    lesson: {
        title: "مدیریت فایل — ذخیره‌سازی ماندگار",
        intro: "برنامه‌های واقعی باید داده‌ها رو ذخیره کنن. پایتون با توابع ساده‌ای می‌تونه فایل بخونه و بنویسه — از یک متن ساده تا داده‌های ساختاریافته. این فصل اولین قدم به دنیای برنامه‌های واقعیه.",
        sections: [
            {
                icon: "📂",
                title: "باز کردن فایل با open",
                text: "open(نام, مود) فایل رو باز می‌کنه:\n\nمودها:\n'r' — خواندن (پیش‌فرض)\n'w' — نوشتن (پاک و بازنویسی!)\n'a' — اضافه به انتها\n\nبعد از کار حتماً فایل رو ببند: file.close()",
                code: "f = open('test.txt', 'w')\nf.write('سلام دنیا')\nf.close()\n\nf = open('test.txt', 'r')\ncontent = f.read()\nf.close()\nprint(content)",
                output: "سلام دنیا"
            },
            {
                icon: "🔐",
                title: "with — مدیریت خودکار",
                text: "با with نیازی به close نیست — خودکار بسته می‌شه:\n\nwith open('test.txt', 'r') as f:\n    content = f.read()\n\nاین راه امن‌تره چون حتی اگه خطا هم پیش بیاد، فایل بسته می‌شه.",
                code: "with open('test.txt', 'w') as f:\n    f.write('خط اول\\n')\n    f.write('خط دوم')\n\nwith open('test.txt', 'r') as f:\n    print(f.read())",
                output: "خط اول\nخط دوم"
            },
            {
                icon: "📖",
                title: "خواندن خط به خط",
                text: "سه روش:\n\nread() — کل محتوا به صورت یک رشته\nreadline() — یک خط\nreadlines() — لیست خط‌ها\n\nیا ساده‌تر: حلقه روی خود فایل",
                code: "with open('test.txt', 'w') as f:\n    f.write('a\\nb\\nc\\n')\n\nwith open('test.txt', 'r') as f:\n    for line in f:\n        print('خط:', line.strip())",
                output: "خط: a\nخط: b\nخط: c"
            },
            {
                icon: "🧩",
                title: "کار با JSON",
                text: "برای ذخیره داده‌های پیچیده، JSON عالیه:\n\nimport json\njson.dump(data, f) — بنویس\njson.load(f) — بخون\n\nاینطوری می‌تونی لیست/دیکشنری رو کامل ذخیره کنی.",
                code: "import json\n\nperson = {'name': 'علی', 'age': 25}\n\nwith open('person.json', 'w') as f:\n    json.dump(person, f)\n\nwith open('person.json', 'r') as f:\n    loaded = json.load(f)\n\nprint(loaded['name'])\nprint(loaded['age'])",
                output: "علی\n25"
            }
        ],
        tips: [
            "مود 'w' فایل رو پاک می‌کنه — با احتیاط!",
            "با with کار کن تا فایل‌ها خودکار بسته بشن.",
            "برای داده‌های ساختاریافته از JSON استفاده کن نه متن ساده.",
        ]
    },
    exercises: [
        {
            id: "ch9_e1",
            type: "quiz",
            title: "کدوم مود برای نوشتن فایل؟",
            code: "کدوم مود فایل رو پاک و بازنویسی می‌کنه؟",
            options: [
                { label: "a", text: "'r'" },
                { label: "b", text: "'w'" },
                { label: "c", text: "'a'" },
                { label: "d", text: "'x'" }
            ],
            correct: "b",
            hint: "این مود محتوا رو پاک می‌کنه",
            hints: ["'r' فقط می‌خونه", "'w' می‌نویسه و پاک می‌کنه", "'a' اضافه می‌کنه"],
            explanation: "مود 'w' فایل رو برای نوشتن باز می‌کنه و محتوای قبلی رو پاک می‌کنه."
        },
        {
            id: "ch9_e2",
            type: "quiz",
            title: "کدوم مود به انتها اضافه می‌کنه؟",
            code: "کدوم مود بدون پاک کردن به انتهای فایل اضافه می‌کنه؟",
            options: [
                { label: "a", text: "'r'" },
                { label: "b", text: "'w'" },
                { label: "c", text: "'a'" },
                { label: "d", text: "'r+'" }
            ],
            correct: "c",
            hint: "a مخفف append هست",
            hints: ["append یعنی اضافه کردن", "'a' به انتها اضافه می‌کنه"],
            explanation: "مود 'a' (append) بدون پاک کردن، به انتهای فایل اضافه می‌کنه."
        },
        {
            id: "ch9_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "with open('data.txt', 'w') as f:\n    f.write('سلام')\n\nwith open('data.txt', 'r') as f:\n    print(f.read())",
            answer: "سلام",
            hint: "چی نوشتیم همون می‌خونیم",
            hints: ["'سلام' نوشته شده", "read همه رو می‌خونه"],
            explanation: "فایل محتوای «سلام» رو داره و read همون رو برمی‌گردونه."
        },
        {
            id: "ch9_e4",
            type: "fill_gap",
            title: "فایل رو باز کن:",
            code: "with ___( 'notes.txt', 'r') as f:\n    content = f.read()\nprint(content)",
            answer: "open",
            hint: "تابع باز کردن فایل",
            hints: ["open(نام, مود)", "open"],
            explanation: "با open() فایل رو باز می‌کنیم."
        },
        {
            id: "ch9_e5",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import json\n\ndata = {'a': 1, 'b': 2}\nwith open('x.json', 'w') as f:\n    json.dump(data, f)\n\nwith open('x.json', 'r') as f:\n    loaded = json.load(f)\n\nprint(loaded['a'])",
            answer: "1",
            hint: "همون داده‌ای که ذخیره کردی برمی‌گرده",
            hints: ["data = {'a': 1}", "loaded['a'] = 1"],
            explanation: "داده در JSON ذخیره و دوباره بارگذاری شده — loaded['a'] برابر 1 هست."
        },
        {
            id: "ch9_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "with open('l.txt', 'w') as f:\n    f.write('x\\ny\\nz\\n')\n\nwith open('l.txt', 'r') as f:\n    lines = f.readlines()\n\nprint(len(lines))",
            answer: "3",
            hint: "چند خط نوشته شده؟",
            hints: ["x، y، z = ۳ خط", "readlines لیست خط‌ها رو می‌ده"],
            explanation: "سه خط نوشته شده (x، y، z) پس readlines لیست ۳ عنصری می‌ده."
        }
    ],
    challenges: [
        {
            id: "ch9_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "with open('t.txt', 'w') as f:\n    f.write('abc')\n\nwith open('t.txt', 'r') as f:\n    print(f.read())",
            answer: "abc",
            hint: "همون چیزی که نوشتیم",
            xp: 10,
            explanation: "محتوای فایل abc هست و read همون رو می‌خونه."
        },
        {
            id: "ch9_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "f = open('m.txt', 'r')\ncontent = f.read()\nf.write('اضافه')",
            error_line: 3,
            reason: "فایل با مود 'r' (خواندن) باز شده، پس write خطا می‌ده",
            hint: "مود فایل اجازه‌ی نوشتن نمی‌ده",
            xp: 20,
            explanation: "فایل با مود خواندن ('r') باز شده. تلاش برای write با مود r → io.UnsupportedOperation."
        },
        {
            id: "ch9_c3",
            type: "quiz",
            difficulty: "medium",
            title: "بهترین راه بستن فایل کدومه؟",
            code: "کدوم راه فایل رو امن‌تر می‌بنده؟",
            options: [
                { label: "a", text: "f = open(...) ... f.close()" },
                { label: "b", text: "with open(...) as f:" },
                { label: "c", text: "هیچی، خودکار بسته می‌شه" },
                { label: "d", text: "del f" }
            ],
            correct: "b",
            hint: "مدیریت خودکار",
            xp: 15,
            explanation: "with open(...) as f خودکار فایل رو می‌بنده حتی اگه خطا پیش بیاد — امن‌ترین راهه."
        },
        {
            id: "ch9_c4",
            type: "fill_gap",
            difficulty: "hard",
            title: "کد رو کامل کن تا JSON بخونه:",
            code: "import json\n\nwith open('d.json', 'r') as f:\n    data = json.___(f)\n\nprint(data)",
            answer: "load",
            hint: "تابع خواندن JSON از فایل",
            xp: 25,
            explanation: "json.load(f) داده رو از فایل JSON می‌خونه."
        },
        {
            id: "ch9_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا فایل درست نوشته بشه:",
            code: "f.write('سلام')\nf = open('out.txt', 'w')\nf.close()",
            correct_order: ["f = open('out.txt', 'w')", "f.write('سلام')", "f.close()"],
            answer: ["f = open('out.txt', 'w')", "f.write('سلام')", "f.close()"],
            hint: "باز، بنویس، ببند",
            xp: 25,
            explanation: "اول فایل رو باز کن، بعد بنویس، بعد ببند."
        }
    ],
    project: {
        id: "ch9_project",
        title: "یادداشت‌بردار",
        brief: "سه یادداشت رو توی یه فایل بنویس (هر کدوم یه خط)، بعد فایل رو باز کن و خط به خط چاپش کن.",
        accepts: [
            { check: (c) => /open\s*\(/.test(c), success: "فایل باز کردی", hint: "با open() فایل بساز", points: 3 },
            { check: (c) => /with\s+open/.test(c), success: "از with استفاده کردی", hint: "با with امن‌تره", points: 3 },
            { check: (c) => /\.write\s*\(/.test(c), success: "نوشتی توی فایل", hint: "با .write() یادداشت بنویس", points: 3 },
            { check: (c) => /for\s+line|readlines|\.read\s*\(/.test(c), success: "فایل رو خوندی", hint: "محتوا رو بخون و چاپ کن", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

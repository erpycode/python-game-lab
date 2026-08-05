PB.registerChapter({
    version: 2,
    id: 21,
    title: "پایگاه داده",
    level: "expert",
    lesson: {
        title: "پایگاه داده — SQLite و SQL",
        intro: "فایل JSON خوبه ولی برای داده‌های زیاد و جستجوی پیچیده نه. پایگاه داده‌ها داده رو ساختارمند و سریع نگه می‌دارن. SQLite ساده‌ترینشونه — بدون نصب، یه فایل، و همه‌چیز توش ذخیره می‌شه.",
        sections: [
            {
                icon: "🗄️",
                title: "اتصال به SQLite",
                text: "SQLite با پایتون میاد — نصب لازم نیست:\n\nimport sqlite3\nconn = sqlite3.connect('data.db')\ncursor = conn.cursor()\n\nبعد از تغییرات:\nconn.commit()  ← ذخیره\nconn.close()  ← بستن",
                code: "import sqlite3\n\nconn = sqlite3.connect('app.db')\ncursor = conn.cursor()\nprint('اتصال برقرار شد')\nconn.close()",
                output: "اتصال برقرار شد"
            },
            {
                icon: "🏗️",
                title: "ساخت جدول",
                text: "با SQL جدول می‌سازی:\n\nCREATE TABLE users (\n    id INTEGER PRIMARY KEY,\n    name TEXT,\n    age INTEGER\n)\n\nنوع‌ها: INTEGER، TEXT، REAL\nPRIMARY KEY — کلید اصلی (unique)",
                code: "import sqlite3\n\nconn = sqlite3.connect('app.db')\ncursor = conn.cursor()\n\ncursor.execute('''CREATE TABLE IF NOT EXISTS users (\n    id INTEGER PRIMARY KEY,\n    name TEXT,\n    age INTEGER\n)''')\n\nconn.commit()\nprint('جدول ساخته شد')\nconn.close()",
                output: "جدول ساخته شد"
            },
            {
                icon: "➕",
                title: "درج داده (INSERT)",
                text: "داده اضافه کن:\n\nINSERT INTO users (name, age) VALUES ('علی', 25)\n\nبا پارامتر امن‌تره:\ncursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('علی', 25))\n\nهمیشه ? به جای مقادیر مستقیم!",
                code: "import sqlite3\n\nconn = sqlite3.connect('app.db')\ncursor = conn.cursor()\n\ncursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('علی', 25))\ncursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('سارا', 30))\n\nconn.commit()\nprint('داده اضافه شد')\nconn.close()",
                output: "داده اضافه شد"
            },
            {
                icon: "🔍",
                title: "خواندن داده (SELECT)",
                text: "داده بخون:\n\nSELECT * FROM users — همه\nSELECT name FROM users — فقط نام\nSELECT * FROM users WHERE age > 20 — شرطی\n\nبا fetchall() نتیجه رو می‌گیری.",
                code: "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncursor = conn.cursor()\n\ncursor.execute('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)')\ncursor.execute(\"INSERT INTO users (name, age) VALUES ('سارا', 30)\")\n\ncursor.execute('SELECT * FROM users WHERE age > 25')\nrows = cursor.fetchall()\n\nfor row in rows:\n    print(row)\n\nconn.close()",
                output: "(1, 'سارا', 30)"
            }
        ],
        tips: [
            "همیشه بعد از INSERT/UPDATE باید commit کنی.",
            "با ? پارامتر بنویس تا از SQL Injection امن باشی.",
            "WHERE برای فیلتر کردن داده‌هاست.",
        ]
    },
    exercises: [
        {
            id: "ch21_e1",
            type: "quiz",
            title: "ماژول SQLite چیه؟",
            code: "import ___",
            options: [
                { label: "a", text: "sqlite3" },
                { label: "b", text: "database" },
                { label: "c", text: "db" },
                { label: "d", text: "sql" }
            ],
            correct: "a",
            hint: "نسخه‌ی 3",
            hints: ["sqlite3", "import sqlite3"],
            explanation: "import sqlite3 ماژول پایگاه داده‌ی پایتونه."
        },
        {
            id: "ch21_e2",
            type: "quiz",
            title: "اتصال به دیتابیس؟",
            code: "conn = sqlite3.___('app.db')",
            options: [
                { label: "a", text: "connect" },
                { label: "b", text: "open" },
                { label: "c", text: "link" },
                { label: "d", text: "attach" }
            ],
            correct: "a",
            hint: "برقراری اتصال",
            hints: ["sqlite3.connect()", "connect"],
            explanation: "sqlite3.connect('app.db') به دیتابیس متصل می‌شه."
        },
        {
            id: "ch21_e3",
            type: "quiz",
            title: "کلید اصلی چیه؟",
            code: "id INTEGER ___",
            options: [
                { label: "a", text: "PRIMARY KEY" },
                { label: "b", text: "MAIN KEY" },
                { label: "c", text: "UNIQUE KEY" },
                { label: "d", text: "FIRST KEY" }
            ],
            correct: "a",
            hint: "کلید اصلی",
            hints: ["PRIMARY KEY", "کلید اصلی هر جدول"],
            explanation: "PRIMARY KEY کلید اصلی جدوله که هر ردیف رو یکتا مشخص می‌کنه."
        },
        {
            id: "ch21_e4",
            type: "quiz",
            title: "داده بخون:",
            code: "cursor.___('SELECT * FROM users')",
            options: [
                { label: "a", text: "execute" },
                { label: "b", text: "run" },
                { label: "c", text: "query" },
                { label: "d", text: "fetch" }
            ],
            correct: "a",
            hint: "اجرای دستور SQL",
            hints: ["cursor.execute()", "execute"],
            explanation: "cursor.execute() دستور SQL رو اجرا می‌کنه."
        },
        {
            id: "ch21_e5",
            type: "quiz",
            title: "نتیجه رو بگیر:",
            code: "rows = cursor.___()",
            options: [
                { label: "a", text: "fetchall" },
                { label: "b", text: "getall" },
                { label: "c", text: "result" },
                { label: "d", text: "all" }
            ],
            correct: "a",
            hint: "گرفتن همه",
            hints: ["fetchall", "همه ردیف‌ها"],
            explanation: "fetchall() همه‌ی ردیف‌های نتیجه رو برمی‌گردونه."
        },
        {
            id: "ch21_e6",
            type: "quiz",
            title: "ذخیره تغییرات؟",
            code: "بعد از INSERT برای ذخیره:",
            options: [
                { label: "a", text: "conn.commit()" },
                { label: "b", text: "conn.save()" },
                { label: "c", text: "conn.flush()" },
                { label: "d", text: "conn.done()" }
            ],
            correct: "a",
            hint: "تایید تغییرات",
            hints: ["commit", "conn.commit()"],
            explanation: "conn.commit() تغییرات رو توی دیتابیس ذخیره می‌کنه."
        }
    ],
    challenges: [
        {
            id: "ch21_c1",
            type: "fill_gap",
            difficulty: "easy",
            title: "به دیتابیس وصل شو:",
            code: "conn = sqlite3.___('my.db')",
            answer: "connect",
            hint: "برقراری اتصال",
            xp: 10,
            explanation: "sqlite3.connect('my.db') اتصال رو برقرار می‌کنه."
        },
        {
            id: "ch21_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد مشکل داره؟",
            code: "conn = sqlite3.connect('db.sqlite')\ncursor = conn.cursor()\ncursor.execute('INSERT INTO users (name) VALUES (?)', ('علی',))\n# داده ذخیره نشد! چرا؟",
            error_line: 4,
            reason: "بعد از INSERT باید conn.commit() صدا زده بشه تا تغییرات ذخیره بشن",
            hint: "کدوم خط فکر می‌کنی باعث ذخیره‌نشدن می‌شه؟",
            xp: 25,
            explanation: "بدون conn.commit() تغییرات ذخیره نمی‌شن. کامنت خط 4 اشاره به این مشکل داره."
        },
        {
            id: "ch21_c3",
            type: "fill_gap",
            difficulty: "medium",
            title: "فقط بزرگسال‌ها:",
            code: "cursor.execute('SELECT * FROM users ___ age >= 18')",
            answer: "WHERE",
            hint: "کلمه‌ی فیلتر",
            xp: 15,
            explanation: "WHERE برای فیلتر کردن ردیف‌هاست."
        },
        {
            id: "ch21_c4",
            type: "quiz",
            difficulty: "medium",
            title: "چرا از ? استفاده می‌کنیم؟",
            code: "cursor.execute('... VALUES (?)', (name,))",
            options: [
                { label: "a", text: "برای سرعت" },
                { label: "b", text: "برای امنیت در برابر SQL Injection" },
                { label: "c", text: "پایتون اجبار می‌کنه" },
                { label: "d", text: "اختیاریه" }
            ],
            correct: "b",
            hint: "امنیت",
            xp: 15,
            explanation: "با ? داده‌ی ورودی جدا می‌شه و از حمله‌ی SQL Injection جلوگیری می‌شه."
        },
        {
            id: "ch21_c5",
            type: "sort",
            difficulty: "hard",
            title: "ترتیب درست کار با دیتابیس:",
            code: "cursor.execute('INSERT ...')\nconn = sqlite3.connect('db')\ncursor = conn.cursor()\nconn.commit()\nconn.close()",
            correct_order: ["conn = sqlite3.connect('db')", "cursor = conn.cursor()", "cursor.execute('INSERT ...')", "conn.commit()", "conn.close()"],
            answer: ["conn = sqlite3.connect('db')", "cursor = conn.cursor()", "cursor.execute('INSERT ...')", "conn.commit()", "conn.close()"],
            hint: "اتصال، کرسر، اجرا، ذخیره، بستن",
            xp: 25,
            explanation: "اول اتصال، بعد کرسر، بعد دستور، بعد commit و آخر close."
        }
    ],
    project: {
        id: "ch21_project",
        title: "دفترچه تلفن",
        brief: "دیتابیس SQLite با جدول contacts (name، phone) بساز. دو مخاطب اضافه کن و بعد همه‌ی مخاطبین رو چاپ کن.",
        accepts: [
            { check: (c) => /import\s+sqlite3/.test(c), success: "sqlite3 import کردی", hint: "import sqlite3", points: 3 },
            { check: (c) => /sqlite3\.connect/.test(c), success: "اتصال داری", hint: "sqlite3.connect('...')", points: 3 },
            { check: (c) => /CREATE\s+TABLE/i.test(c), success: "جدول ساختی", hint: "با CREATE TABLE جدول بساز", points: 4 },
            { check: (c) => /INSERT/i.test(c), success: "داده اضافه کردی", hint: "با INSERT مخاطب اضافه کن", points: 3 },
            { check: (c) => /SELECT/i.test(c), success: "داده خوندی", hint: "با SELECT بخون و چاپ کن", points: 3 },
            { check: (c) => /commit/.test(c), success: "commit داری", hint: "با commit ذخیره کن", points: 2 }
        ],
        passScore: 70
    }
});

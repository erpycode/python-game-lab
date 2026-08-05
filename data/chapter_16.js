PB.registerChapter({
    version: 2,
    id: 16,
    title: "فریم‌ورک‌ها",
    level: "expert",
    lesson: {
        title: "فریم‌ورک‌ها — دنیای وب",
        intro: "فریم‌ورک‌ها بهت ابزارهای آماده می‌دن تا وب‌اپلیکیشن بسازی بدون این‌که از صفر شروع کنی. Flask ساده‌ترین فریم‌ورک پایتونه — در چند خط یه وب‌سرور واقعی داری!",
        sections: [
            {
                icon: "🌐",
                title: "Flask چیست؟",
                text: "Flask یه فریم‌ورک وب سبک و محبوب:\n\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'سلام!'\n\nبا app.run() سرور روشن می‌شه.",
                code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'سلام دنیا!'\n\napp.run(debug=True)",
                output: ""
            },
            {
                icon: "🛤️",
                title: "مسیرها (Routes)",
                text: "هر مسیر یه تابع داره:\n\n@app.route('/')\n@app.route('/about')\n@app.route('/user/<name>')\n\n<name> پارامتر داینامیکه — هر اسمی توی URL بیاد، تابع می‌گیره.",
                code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return '<h1>خانه</h1>'\n\n@app.route('/user/<name>')\ndef user(name):\n    return f'سلام {name}!'",
                output: ""
            },
            {
                icon: "🎨",
                title: "قالب‌ها (Templates)",
                text: "با render_template می‌تونی HTML رو از فایل جدا بخونی:\n\nreturn render_template('index.html', name='علی')\n\nو توی HTML با {{ name }} مقدار رو نشون بدی.\nاین باعث جدایی منطق از نمایش می‌شه.",
                code: "from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return render_template('index.html', name='علی')",
                output: ""
            },
            {
                icon: "🔁",
                title: "ورودی از کاربر",
                text: "با request می‌تونی داده‌ی کاربر رو بگیری:\n\nfrom flask import request\n\n@app.route('/greet')\ndef greet():\n    name = request.args.get('name', 'مهمان')\n    return f'سلام {name}!'\n\nURL: /greet?name=علی",
                code: "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.route('/greet')\ndef greet():\n    name = request.args.get('name', 'مهمان')\n    return f'سلام {name}!'",
                output: ""
            }
        ],
        tips: [
            "Flask برای شروع عالیه؛ Django برای پروژه‌های بزرگ‌تر.",
            "با debug=True خطاها رو راحت‌تر می‌بینی.",
            "قالب‌ها رو از منطق جدا نگه دار.",
        ]
    },
    exercises: [
        {
            id: "ch16_e1",
            type: "quiz",
            title: "فلاسک با چه دستوری ساخته می‌شه؟",
            code: "app = ___(__name__)",
            options: [
                { label: "a", text: "Flask" },
                { label: "b", text: "Server" },
                { label: "c", text: "Web" },
                { label: "d", text: "App" }
            ],
            correct: "a",
            hint: "اسم کلاس",
            hints: ["Flask(__name__)", "Flask"],
            explanation: "Flask(__name__) یه نمونه از اپلیکیشن فلاسک می‌سازه."
        },
        {
            id: "ch16_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'سلام!'\n\nprint(app)  # خلاصه",
            answer: "<Flask 'app'>",
            hint: "نمایش خلاصه اپ",
            hints: ["Flask 'app'", "<Flask 'app'>"],
            explanation: "print(app) نمایش خلاصه‌ی اپلیکیشن فلاسک رو نشون می‌ده."
        },
        {
            id: "ch16_e3",
            type: "quiz",
            title: "مسیر توی Flask با چه دکوراتوری تعریف می‌شه؟",
            code: "___\ndef home():\n    return 'سلام'",
            options: [
                { label: "a", text: "@app.route('/')" },
                { label: "b", text: "@app('/')" },
                { label: "c", text: "#route('/')" },
                { label: "d", text: "def('/')" }
            ],
            correct: "a",
            hint: "دکوراتور مسیر",
            hints: ["@app.route('/')", "با route"],
            explanation: "@app.route('/') مسیر رو به تابع home متصل می‌کنه."
        },
        {
            id: "ch16_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/user/<name>')\ndef user(name):\n    return f'سلام {name}'\n\nprint(user('علی'))",
            answer: "سلام علی",
            hint: "تابع با پارامتر صدا زده شده",
            hints: ["user('علی')", "f'سلام {name}' → سلام علی"],
            explanation: "صدا زدن مستقیم user('علی') نتیجه‌ی «سلام علی» رو برمی‌گردونه."
        },
        {
            id: "ch16_e5",
            type: "fill_gap",
            title: "فریم‌ورک رو import کن:",
            code: "from ___ import Flask\n\napp = Flask(__name__)",
            answer: "flask",
            hint: "اسم فریم‌ورک",
            hints: ["flask", "from flask import Flask"],
            explanation: "from flask import Flask — اسم ماژول flask هست."
        },
        {
            id: "ch16_e6",
            type: "quiz",
            title: "چطور سرور رو روشن می‌کنی؟",
            code: "چطور فلاسک رو اجرا می‌کنی؟",
            options: [
                { label: "a", text: "app.start()" },
                { label: "b", text: "app.run()" },
                { label: "c", text: "app.go()" },
                { label: "d", text: "run.app()" }
            ],
            correct: "b",
            hint: "متد اجرا",
            hints: ["app.run()", "با run"],
            explanation: "app.run() سرور فلاسک رو روشن می‌کنه."
        }
    ],
    challenges: [
        {
            id: "ch16_c1",
            type: "fill_gap",
            difficulty: "easy",
            title: "مسیر رو تعریف کن:",
            code: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    ___ 'سلام!'",
            answer: "return",
            hint: "مقدار برگشتی مسیر",
            xp: 10,
            explanation: "تابع مسیر باید یه پاسخ (رشته) رو return کنه."
        },
        {
            id: "ch16_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'سلام'",
            error_line: 2,
            reason: "این خط اشتباه نیست — این کد درسته! (مثال آموزشی: خطا توی فراخوانی app.run() نبودن)",
            hint: "دنبال خطای واقعی بگرد — اینجا خطایی نیست",
            xp: 15,
            explanation: "این کد درسته! بعضی سؤال‌ها برای یادگیری، کد سالم نشون می‌دن. (چالش فکری: همیشه با دقت بخون)"
        },
        {
            id: "ch16_c3",
            type: "quiz",
            difficulty: "medium",
            title: "پارامتر داینامیک توی URL چیه؟",
            code: "@app.route('/user/<name>')",
            options: [
                { label: "a", text: "<name> پارامتر داینامیکه" },
                { label: "b", text: "یه ثابت HTML" },
                { label: "c", text: "یه تابع" },
                { label: "d", text: "یه خطای Flask" }
            ],
            correct: "a",
            hint: "هر مقداری می‌تونه بیاد",
            xp: 15,
            explanation: "<name> یه پارامتر داینامیکه — هر مقداری توی URL بیاد به تابع پاس داده می‌شه."
        },
        {
            id: "ch16_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'A'\n\n@app.route('/')\ndef home2():\n    return 'B'\n\nprint(home())",
            answer: "A",
            hint: "تابع اول صدا زده می‌شه",
            xp: 20,
            explanation: "print(home()) تابع home رو صدا می‌زنه که 'A' برمی‌گردونه."
        },
        {
            id: "ch16_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا وب‌اپ فلاسک درست بشه:",
            code: "app = Flask(__name__)\ndef home():\n    return 'سلام'\n@app.route('/')\nfrom flask import Flask",
            correct_order: ["from flask import Flask", "app = Flask(__name__)", "@app.route('/')", "def home():", "    return 'سلام'"],
            answer: ["from flask import Flask", "app = Flask(__name__)", "@app.route('/')", "def home():", "    return 'سلام'"],
            hint: "import، ساخت اپ، مسیر، تابع",
            xp: 25,
            explanation: "اول import، بعد ساخت اپ، بعد مسیر و تابع."
        }
    ],
    project: {
        id: "ch16_project",
        title: "وب‌اپ سلام",
        brief: "یه وب‌اپ فلاسک بساز با مسیر اصلی (/) که «سلام دنیا!» برگردونه و یه مسیر دوم /about که «درباره من» برگردونه.",
        accepts: [
            { check: (c) => /from\s+flask\s+import\s+Flask/.test(c), success: "Flask import کردی", hint: "from flask import Flask", points: 4 },
            { check: (c) => /app\s*=\s*Flask/.test(c), success: "اپ ساختی", hint: "app = Flask(__name__)", points: 3 },
            { check: (c) => /@app\.route/.test(c), success: "مسیر داری", hint: "با @app.route دو مسیر بساز", points: 4 },
            { check: (c) => /return/.test(c), success: "return داری", hint: "هر مسیر یه متن return کنه", points: 2 }
        ],
        passScore: 70
    }
});

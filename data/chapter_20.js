PB.registerChapter({
    version: 2,
    id: 20,
    title: "محیط مجازی",
    level: "expert",
    lesson: {
        title: "محیط مجازی — فضای ایزوله",
        intro: "تا حالا شده یه پروژه یه نسخه‌ی پایتون بخواد و یه پروژه‌ی دیگه نسخه‌ی دیگه؟ محیط مجازی این مشکل رو حل می‌کنه: هر پروژه فضای مخصوص خودش رو داره — مثل اتاق شخصی هر بچه!",
        sections: [
            {
                icon: "🏝️",
                title: "محیط مجازی چیست؟",
                text: "محیط مجازی (venv) یه پوشه‌ست که پایتون و پکیج‌های مخصوص پروژه‌ت توش نصب می‌شن:\n\nساخت:\npython -m venv myenv\n\nفعال‌سازی (ویندوز):\nmyenv\\Scripts\\activate\n\nفعال‌سازی (مک/لینوکس):\nsource myenv/bin/activate\n\nخروج:\ndeactivate",
                code: "# ساخت محیط مجازی\npython -m venv myenv\n\n# فعال‌سازی (ویندوز)\nmyenv\\Scripts\\activate\n\n# خروج\n deactivate",
                output: ""
            },
            {
                icon: "📦",
                title: "pip — مدیر پکیج",
                text: "با pip پکیج نصب و مدیریت می‌کنی:\n\nنصب:\npip install requests\n\nنصب نسخه خاص:\npip install requests==2.31.0\n\nمشاهده نصب‌شده‌ها:\npip list\n\nحذف:\npip uninstall requests",
                code: "# نصب پکیج\npip install requests\n\n# نسخه‌ی مشخص\npip install flask==3.0.0\n\n# دیدن پکیج‌ها\npip list",
                output: ""
            },
            {
                icon: "📋",
                title: "requirements.txt",
                text: "این فایل لیست پکیج‌های پروژه‌ست:\n\nساخت:\npip freeze > requirements.txt\n\nنصب همه:\npip install -r requirements.txt\n\nاینطوری هر کسی می‌تونه پروژه‌ت رو با همون پکیج‌ها اجرا کنه.",
                code: "# ذخیره پکیج‌ها\npip freeze > requirements.txt\n\n# نصب همه پکیج‌ها از فایل\npip install -r requirements.txt",
                output: ""
            },
            {
                icon: "🧪",
                title: "چرا محیط مجازی؟",
                text: "سه دلیل اصلی:\n\n1. ایزولاسیون — پروژه‌ها به هم ربط ندارن\n2. نسخه‌بندی — هر پروژه نسخه‌ی خاص خودش\n3. اشتراک‌گذاری — با requirements.txt همه اجرا می‌کنن\n\nقانون طلایی: همیشه برای هر پروژه یه محیط مجازی بساز!",
                code: "# نمونه requirements.txt\nrequests==2.31.0\nflask==3.0.0\npytest==8.0.0",
                output: ""
            }
        ],
        tips: [
            "همیشه اول پروژه، محیط مجازی بساز، بعد پکیج نصب کن.",
            "پوشه‌ی venv رو توی گیت commit نکن — فقط requirements.txt.",
            "قانون طلایی: هر پروژه، یه محیط مجازی.",
        ]
    },
    exercises: [
        {
            id: "ch20_e1",
            type: "quiz",
            title: "محیط مجازی با چی ساخته می‌شه؟",
            code: "python -m ___ myenv",
            options: [
                { label: "a", text: "venv" },
                { label: "b", text: "pip" },
                { label: "c", text: "install" },
                { label: "d", text: "env" }
            ],
            correct: "a",
            hint: "virtual environment",
            hints: ["venv = virtual env", "python -m venv"],
            explanation: "python -m venv myenv محیط مجازی می‌سازه."
        },
        {
            id: "ch20_e2",
            type: "quiz",
            title: "فعال‌سازی در ویندوز؟",
            code: "myenv\\Scripts\\___",
            options: [
                { label: "a", text: "activate" },
                { label: "b", text: "start" },
                { label: "c", text: "run" },
                { label: "d", text: "on" }
            ],
            correct: "a",
            hint: "روشن کردن",
            hints: ["activate", "myenv\\Scripts\\activate"],
            explanation: "در ویندوز: myenv\\Scripts\\activate."
        },
        {
            id: "ch20_e3",
            type: "quiz",
            title: "پکیج رو نصب کن:",
            code: "pip ___ requests",
            options: [
                { label: "a", text: "install" },
                { label: "b", text: "add" },
                { label: "c", text: "get" },
                { label: "d", text: "setup" }
            ],
            correct: "a",
            hint: "فرمان نصب",
            hints: ["pip install requests", "install"],
            explanation: "pip install requests پکیج رو نصب می‌کنه."
        },
        {
            id: "ch20_e4",
            type: "quiz",
            title: "لیست پکیج‌ها رو ذخیره کن:",
            code: "pip ___ > requirements.txt",
            options: [
                { label: "a", text: "freeze" },
                { label: "b", text: "list" },
                { label: "c", text: "save" },
                { label: "d", text: "dump" }
            ],
            correct: "a",
            hint: "یخ زدن نسخه‌ها",
            hints: ["pip freeze", "freeze"],
            explanation: "pip freeze لیست پکیج‌های نصب‌شده با نسخه‌هاشون رو می‌ده."
        },
        {
            id: "ch20_e5",
            type: "quiz",
            title: "نصب همه از فایل:",
            code: "pip install -___ requirements.txt",
            options: [
                { label: "a", text: "r" },
                { label: "b", text: "f" },
                { label: "c", text: "a" },
                { label: "d", text: "p" }
            ],
            correct: "a",
            hint: "مخفف requirements",
            hints: ["-r requirements.txt", "r"],
            explanation: "pip install -r requirements.txt همه‌ی پکیج‌های فایل رو نصب می‌کنه."
        },
        {
            id: "ch20_e6",
            type: "quiz",
            title: "خروج از محیط مجازی؟",
            code: "از محیط مجازی با چه دستوری خارج می‌شی؟",
            options: [
                { label: "a", text: "deactivate" },
                { label: "b", text: "exit" },
                { label: "c", text: "stop" },
                { label: "d", text: "close" }
            ],
            correct: "a",
            hint: "غیرفعال کردن",
            hints: ["deactivate", "برعکس activate"],
            explanation: "با deactivate از محیط مجازی خارج می‌شی."
        }
    ],
    challenges: [
        {
            id: "ch20_c1",
            type: "fill_gap",
            difficulty: "easy",
            title: "محیط مجازی بساز:",
            code: "python -m ___ myenv",
            answer: "venv",
            hint: "virtual environment",
            xp: 10,
            explanation: "python -m venv myenv محیط مجازی می‌سازه."
        },
        {
            id: "ch20_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "اشتباه توی این فرمان چیه؟",
            code: "pip install requests==latest",
            error_line: 1,
            reason: "==latest معتبر نیست — باید نسخه‌ی مشخص مثل 2.31.0 یا بدون نسخه باشه",
            hint: "فرمت نسخه",
            xp: 20,
            explanation: "pip با ==latest کار نمی‌کنه. یا pip install requests (آخرین نسخه) یا pip install requests==2.31.0 (نسخه مشخص)."
        },
        {
            id: "ch20_c3",
            type: "quiz",
            difficulty: "medium",
            title: "چرا venv پوشه‌ش رو commit نمی‌کنیم؟",
            code: "چرا پوشه‌ی myenv رو توی گیت نمی‌ذاریم؟",
            options: [
                { label: "a", text: "بزرگ و بیهوده‌ست — با requirements ساخته می‌شه" },
                { label: "b", text: "ممنوعه" },
                { label: "c", text: "پایتون اجازه نمی‌ده" },
                { label: "d", text: "گیت نمی‌تونه" }
            ],
            correct: "a",
            hint: "با pip freeze بازسازی می‌شه",
            xp: 15,
            explanation: "محیط مجازی بزرگه و با requirements.txt قابل بازسازیه — پس توی گیت نمی‌ره."
        },
        {
            id: "ch20_c4",
            type: "fill_gap",
            difficulty: "medium",
            title: "پکیج با نسخه خاص نصب کن:",
            code: "pip install flask___3.0.0",
            answer: "==",
            hint: "علامت تعیین نسخه",
            xp: 15,
            explanation: "pip install flask==3.0.0 نسخه‌ی دقیق رو نصب می‌کنه."
        },
        {
            id: "ch20_c5",
            type: "sort",
            difficulty: "hard",
            title: "ترتیب درست کار با پروژه جدید:",
            code: "pip install requests\npython -m venv myenv\npip freeze > requirements.txt\nmyenv\\Scripts\\activate",
            correct_order: ["python -m venv myenv", "myenv\\Scripts\\activate", "pip install requests", "pip freeze > requirements.txt"],
            answer: ["python -m venv myenv", "myenv\\Scripts\\activate", "pip install requests", "pip freeze > requirements.txt"],
            hint: "ساخت، فعال، نصب، ذخیره",
            xp: 25,
            explanation: "اول محیط بساز، بعد فعال کن، بعد پکیج نصب کن، بعد لیست رو ذخیره کن."
        }
    ],
    project: {
        id: "ch20_project",
        title: "راه‌اندازی پروژه",
        brief: "دنباله‌ی دستورات درست برای راه‌اندازی یک پروژه‌ی جدید با محیط مجازی رو بنویس: ساخت محیط، فعال‌سازی، نصب requests و ذخیره‌ی requirements.",
        accepts: [
            { check: (c) => /venv/.test(c), success: "محیط مجازی ساختی", hint: "python -m venv ...", points: 4 },
            { check: (c) => /activate/.test(c), success: "فعال‌سازی داری", hint: "myenv\\Scripts\\activate", points: 3 },
            { check: (c) => /pip\s+install/.test(c), success: "pip install داری", hint: "pip install requests", points: 3 },
            { check: (c) => /freeze|requirements/.test(c), success: "requirements داری", hint: "pip freeze > requirements.txt", points: 3 }
        ],
        passScore: 70
    }
});

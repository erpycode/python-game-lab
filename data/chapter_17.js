PB.registerChapter({
    version: 2,
    id: 17,
    title: "پایتون در عمل",
    level: "expert",
    lesson: {
        title: "پایتون در عمل — اتوماسیون",
        intro: "حالا که اصول رو بلدی، ببینیم پایتون توی دنیای واقعی چه کارهایی می‌کنه: اسکریپت‌هایی که کارهای تکراری رو خودکار می‌کنن، فایل‌ها رو مدیریت می‌کنن و با سیستم عامل حرف می‌زنن. این جایی‌ست که پایتون واقعاً می‌درخشه!",
        sections: [
            {
                icon: "🛠️",
                title: "کار با os و sys",
                text: "os بهت اجازه می‌ده با سیستم‌عامل حرف بزنی:\n\nos.getcwd() — پوشه فعلی\nos.listdir() — لیست فایل‌ها\nos.mkdir() — ساخت پوشه\nos.remove() — حذف فایل\n\nبا os.path هم راحت‌تر کار می‌کنی.",
                code: "import os\n\nprint(os.getcwd())\nprint(os.listdir('.'))\n\nos.mkdir('new_folder')\nprint('پوشه ساخته شد')\n\nos.rmdir('new_folder')\nprint('پوشه حذف شد')",
                output: ""
            },
            {
                icon: "⚙️",
                title: "آرگومان خط فرمان",
                text: "با sys.argv می‌تونی آرگومان‌های خط فرمان رو بگیری:\n\npython script.py ali 25\nsys.argv[0] → 'script.py'\nsys.argv[1] → 'ali'\nsys.argv[2] → '25'\n\n(نکته: همه رشته‌ان!)\n\nمی‌تونی اسکریپت‌های تعاملی بسازی.",
                code: "import sys\n\nname = sys.argv[1] if len(sys.argv) > 1 else 'مهمان'\nprint(f'سلام {name}')\n\n# اجرا: python app.py علی\n# خروجی: سلام علی",
                output: ""
            },
            {
                icon: "🗃️",
                title: "اتوماسیون فایل",
                text: "مثال عملی: جمع کردن فایل‌ها از چند پوشه:\n\nos.listdir() بگرد\nif file.endswith('.txt') چک کن\nshutil.move() جابه‌جا کن\n\nبا glob هم راحت‌تر فایل پیدا می‌کنی.",
                code: "import os\nimport glob\n\n# همه فایل‌های py توی پوشه فعلی\ntxt_files = glob.glob('*.txt')\nprint(txt_files)\n\nfor f in txt_files:\n    print('پیدا شد:', f)",
                output: ""
            },
            {
                icon: "🚀",
                title: "پروژه‌های کوچک واقعی",
                text: "چند ایده‌ی شروع:\n\n1. پشتیبان‌گیری: کپی فایل‌ها با تاریخ\n2. تغییر نام گروهی: فایل‌ها رو مرتب کن\n3. تمیزکاری: حذف فایل‌های اضافه\n4. گزارش‌ساز: خواندن داده و ساختن خروجی\n\nشروع کن با یه کار کوچیک روزمره که ازش خسته شدی!",
                code: "import shutil\nimport datetime\n\nsource = 'data.txt'\nbackup = f'backup_{datetime.date.today()}.txt'\n\nshutil.copy(source, backup)\nprint(f'پشتیبان از {source} به {backup} ساخته شد')",
                output: ""
            }
        ],
        tips: [
            "اول کاری رو خودکار کن که واقعاً تکراریه — نه به خاطر فانتزی.",
            "همیشه با یه پوشه‌ی تست شروع کن، نه فایل‌های واقعی!",
            "glob و shutil دو تا از کاربردی‌ترین ماژول‌های روزمره‌ان.",
        ]
    },
    exercises: [
        {
            id: "ch17_e1",
            type: "quiz",
            title: "پوشه فعلی رو با چی می‌گیری؟",
            code: "import os\nprint(os.___())",
            options: [
                { label: "a", text: "getcwd" },
                { label: "b", text: "current" },
                { label: "c", text: "folder" },
                { label: "d", text: "path" }
            ],
            correct: "a",
            hint: "مخفف get current working directory",
            hints: ["getcwd", "get current working directory"],
            explanation: "os.getcwd() پوشه‌ی کاری فعلی رو برمی‌گردونه."
        },
        {
            id: "ch17_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import os\n\nfiles = ['a.txt', 'b.py', 'c.txt']\nprint(len([f for f in files if f.endswith('.txt')]))",
            answer: "2",
            hint: "فایل‌های txt",
            hints: ["a.txt و c.txt", "۲ تاست"],
            explanation: "دو فایل به .txt ختم می‌شن: a.txt و c.txt."
        },
        {
            id: "ch17_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import sys\n\nargs = ['app.py', 'علی']\nprint(args[1])",
            answer: "علی",
            hint: "دومین آرگومان",
            hints: ["args[0] = 'app.py'", "args[1] = 'علی'"],
            explanation: "args[1] دومین عنصر لیسته که 'علی' هست."
        },
        {
            id: "ch17_e4",
            type: "fill_gap",
            title: "فایل‌های txt پیدا کن:",
            code: "import glob\nfiles = glob.___('*.txt')\nprint(files)",
            answer: "glob",
            hint: "تابع پیدا کردن فایل‌ها",
            hints: ["glob.glob('*.txt')", "glob"],
            explanation: "glob.glob('*.txt') همه فایل‌های txt رو پیدا می‌کنه."
        },
        {
            id: "ch17_e5",
            type: "quiz",
            title: "چرا sys.argv همه رشته‌ان؟",
            code: "چرا sys.argv[1] همیشه رشته‌ست؟",
            options: [
                { label: "a", text: "چون پایتون این‌طوریه" },
                { label: "b", text: "چون آرگومان‌ها از خط فرمان به صورت متن میان" },
                { label: "c", text: "خطاست، باید عدد باشه" },
                { label: "d", text: "فقط وقتی عدد بدهی" }
            ],
            correct: "b",
            hint: "خط فرمان چیه؟",
            hints: ["ورودی خط فرمان همیشه متن‌ست", "پس رشته‌ان"],
            explanation: "آرگومان‌های خط فرمان همیشه به صورت متن (رشته) وارد می‌شن — اگه عدد لازم داری خودت int کن."
        },
        {
            id: "ch17_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "import os\n\nfiles = ['a.py', 'b.txt', 'c.py']\npy = [f for f in files if f.endswith('.py')]\nprint(len(py))",
            answer: "2",
            hint: "فایل‌های py",
            hints: ["a.py و c.py", "۲ تاست"],
            explanation: "دو فایل به .py ختم می‌شن: a.py و c.py."
        }
    ],
    challenges: [
        {
            id: "ch17_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "import os\n\nfiles = ['a.txt', 'b.pdf', 'c.txt']\nprint(files[2].endswith('.txt'))",
            answer: "True",
            hint: "c.txt به .txt ختم می‌شه؟",
            xp: 10,
            explanation: "files[2] = 'c.txt' که به .txt ختم می‌شه → True."
        },
        {
            id: "ch17_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "پوشه بساز:",
            code: "import os\nos.___('project')\nprint('ساخته شد')",
            answer: "mkdir",
            hint: "make directory",
            xp: 15,
            explanation: "os.mkdir('project') پوشه‌ی project رو می‌سازه."
        },
        {
            id: "ch17_c3",
            type: "quiz",
            difficulty: "medium",
            title: "کپی فایل با چه ماژولی؟",
            code: "import ___\nshutil.copy('a.txt', 'b.txt')",
            options: [
                { label: "a", text: "shutil" },
                { label: "b", text: "os" },
                { label: "c", text: "copy" },
                { label: "d", text: "file" }
            ],
            correct: "a",
            hint: "ماژول عملیات سطح‌بالا روی فایل",
            xp: 15,
            explanation: "shutil ماژول عملیات سطح‌بالا روی فایل‌هاست — shutil.copy کپی می‌کنه."
        },
        {
            id: "ch17_c4",
            type: "predict",
            difficulty: "hard",
            title: "خروجی این کد چیه؟",
            code: "import sys\n\n# اجرا: python app.py 3\nnum = int(sys.argv[1])\nprint(num * 2)",
            answer: "6",
            hint: "آرگومان 3 رو عدد کن و دوبرابر کن",
            xp: 20,
            explanation: "sys.argv[1] = '3'، بعد int می‌شه 3، و 3 * 2 = 6."
        },
        {
            id: "ch17_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا پشتیبان درست بشه:",
            code: "shutil.copy('a.txt', 'backup.txt')\nimport shutil\nprint('انجام شد')",
            correct_order: ["import shutil", "shutil.copy('a.txt', 'backup.txt')", "print('انجام شد')"],
            answer: ["import shutil", "shutil.copy('a.txt', 'backup.txt')", "print('انجام شد')"],
            hint: "import، کپی، چاپ",
            xp: 25,
            explanation: "اول ماژول، بعد کپی، بعد چاپ."
        }
    ],
    project: {
        id: "ch17_project",
        title: "مرتب‌کننده‌ی فایل‌ها",
        brief: "اسکریپتی بنویس که لیست فایل‌های یه پوشه رو بگرده و فایل‌های .txt رو جدا کنه و تعدادشون رو چاپ کنه.",
        accepts: [
            { check: (c) => /import\s+os|import\s+glob/.test(c), success: "ماژول فایل آوردی", hint: "os یا glob import کن", points: 3 },
            { check: (c) => /os\.listdir|glob\.glob/.test(c), success: "فایل‌ها رو لیست کردی", hint: "با listdir یا glob فایل‌ها رو بیار", points: 4 },
            { check: (c) => /endswith\s*\(|\.txt/.test(c), success: "فیلتر txt داری", hint: "با endswith('.txt') فیلتر کن", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "تعداد فایل‌های txt رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

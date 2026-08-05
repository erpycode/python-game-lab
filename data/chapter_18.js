PB.registerChapter({
    version: 2,
    id: 18,
    title: "توابع لامبدا",
    level: "advanced",
    lesson: {
        title: "توابع لامبدا — یک‌خطی‌ها",
        intro: "بعضی وقت‌ها تابع‌ت فقط یه خطه و یه بار استفاده می‌شه. لامبدا راهی برای تعریف تابع کوتاه بدون def و اسم هست — مثل یه میان‌بر!",
        sections: [
            {
                icon: "⚡",
                title: "ساختار lambda",
                text: "ساختار:\n\nlambda پارامترها: عبارت\n\nمثال:\nlambda x: x * 2\n\nمعادل این تابع:\ndef double(x):\n    return x * 2\n\nفرق: لامبدا فقط یه عبارت (expression) می‌تونه داشته باشه، نه چند خط.",
                code: "double = lambda x: x * 2\nadd = lambda a, b: a + b\n\nprint(double(5))\nprint(add(3, 4))\nprint((lambda x: x ** 2)(6))",
                output: "10\n7\n36"
            },
            {
                icon: "🗺️",
                title: "lambda با map",
                text: "map(تابع, لیست) — تابع رو روی هر عنصر اعمال می‌کنه:\n\nlist(map(lambda x: x * 2, [1, 2, 3]))\n→ [2, 4, 6]\n\nنتیجه‌ی map رو با list() به لیست تبدیل کن.",
                code: "nums = [1, 2, 3, 4]\nsquared = list(map(lambda x: x * x, nums))\nprint(squared)",
                output: "[1, 4, 9, 16]"
            },
            {
                icon: "🔍",
                title: "lambda با filter",
                text: "filter(شرط, لیست) — عنصرهایی که شرط رو داشته باشن نگه می‌داره:\n\nlist(filter(lambda x: x > 2, [1, 2, 3, 4]))\n→ [3, 4]\n\nلامبدا باید True/False برگردونه.",
                code: "nums = [1, 2, 3, 4, 5, 6]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(evens)",
                output: "[2, 4, 6]"
            },
            {
                icon: "📊",
                title: "lambda با sorted",
                text: "sorted(list, key=...) — بر اساس کلید مرتب می‌کنه:\n\nsorted(names, key=lambda n: len(n))\n— بر اساس طول نام\n\nsorted(people, key=lambda p: p['age'])\n— بر اساس سن",
                code: "names = ['علی', 'سارا محمدی', 'رضا']\nsorted_names = sorted(names, key=lambda n: len(n))\nprint(sorted_names)\n\nscores = [{'name': 'علی', 's': 70}, {'name': 'سارا', 's': 95}]\nbest = sorted(scores, key=lambda p: p['s'])\nprint(best[-1]['name'])",
                output: "['علی', 'رضا', 'سارا محمدی']\nسارا"
            }
        ],
        tips: [
            "لامبدا برای توابع کوتاه و یک‌بار مصرفه — برای چیزهای پیچیده def بنویس.",
            "با map، filter و sorted ترکیبش کن تا کد تمیزتر بشه.",
            "هر لامبدا فقط یه عبارت می‌تونه داشته باشه — بدون if و حلقه!",
        ]
    },
    exercises: [
        {
            id: "ch18_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "double = lambda x: x * 2\nprint(double(4))",
            answer: "8",
            hint: "4 ضربدر 2",
            hints: ["lambda x: x * 2", "4 * 2 = 8"],
            explanation: "double(4) = 4 * 2 = 8."
        },
        {
            id: "ch18_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "add = lambda a, b: a + b\nprint(add(10, 5))",
            answer: "15",
            hint: "جمع دو پارامتر",
            hints: ["10 + 5", "15"],
            explanation: "add(10, 5) = 10 + 5 = 15."
        },
        {
            id: "ch18_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "nums = [1, 2, 3]\nresult = list(map(lambda x: x + 1, nums))\nprint(result)",
            answer: "[2, 3, 4]",
            hint: "به هر عدد ۱ اضافه می‌شه",
            hints: ["1+1=2", "2+1=3", "3+1=4"],
            explanation: "map به هر عنصر تابع lambda رو اعمال می‌کنه: هر عدد +1."
        },
        {
            id: "ch18_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "nums = [1, 2, 3, 4, 5]\nresult = list(filter(lambda x: x % 2 == 0, nums))\nprint(result)",
            answer: "[2, 4]",
            hint: "فقط زوج‌ها",
            hints: ["x % 2 == 0 یعنی زوج", "2 و 4"],
            explanation: "filter فقط عنصرهایی رو نگه می‌داره که شرط (زوج بودن) برقرار باشه: 2 و 4."
        },
        {
            id: "ch18_e5",
            type: "fill_gap",
            title: "لامبدا بساز:",
            code: "square = ___ x: x ** 2\nprint(square(5))",
            answer: "lambda",
            hint: "کلمه‌ی تعریف تابع یک‌خطی",
            hints: ["lambda x: x ** 2", "lambda"],
            explanation: "با lambda تابع یک‌خطی می‌سازی."
        },
        {
            id: "ch18_e6",
            type: "quiz",
            title: "فرق lambda با def چیه؟",
            code: "کدوم درسته؟",
            options: [
                { label: "a", text: "lambda می‌تونه چند خط داشته باشه" },
                { label: "b", text: "lambda فقط یه عبارت می‌تونه داشته باشه" },
                { label: "c", text: "lambda سریع‌تره" },
                { label: "d", text: "lambda اسم داره" }
            ],
            correct: "b",
            hint: "محدودیت اصلی لامبدا",
            hints: ["فقط یک عبارت (expression)", "چند خط نمی‌شه"],
            explanation: "lambda فقط یه عبارت ساده می‌تونه داشته باشه — نه چند خط یا دستور."
        }
    ],
    challenges: [
        {
            id: "ch18_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "print((lambda x: x * 10)(7))",
            answer: "70",
            hint: "تابع ناشناس مستقیم صدا زده شده",
            xp: 10,
            explanation: "(lambda x: x*10)(7) یعنی 7 * 10 = 70."
        },
        {
            id: "ch18_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "همه رو سه‌برابر کن:",
            code: "nums = [1, 2, 3]\nresult = list(map(___ x: x * 3, nums))\nprint(result)",
            answer: "lambda",
            hint: "کلمه‌ی تابع یک‌خطی",
            xp: 15,
            explanation: "با lambda تابع فیلتر/تبدیل یک‌خطی می‌سازی. map(lambda x: x*3, nums) همه رو سه‌برابر می‌کنه."
        },
        {
            id: "ch18_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "triple = lambda x x * 3\nprint(triple(5))",
            error_line: 1,
            reason: "تو lambda باید بین پارامتر و عبارت دو نقطه (:) بذاری — lambda x: x * 3",
            hint: "توی lambda بعد از پارامتر چی میاد؟",
            xp: 20,
            explanation: "lambda باید lambda x: x * 3 باشه — با دو نقطه. بدون : خطای SyntaxError می‌ده."
        },
        {
            id: "ch18_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "nums = [5, 3, 8, 1]\nsorted_nums = sorted(nums, key=lambda x: -x)\nprint(sorted_nums)",
            answer: "[8, 5, 3, 1]",
            hint: "منفی باعث مرتب نزولی می‌شه",
            xp: 25,
            explanation: "key=lambda x: -x یعنی بر اساس منفی مقدار مرتب می‌کنه → نزولی: 8,5,3,1."
        },
        {
            id: "ch18_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا [1, 4, 9] چاپ بشه:",
            code: "print(result)\nresult = list(map(lambda x: x * x, nums))\nnums = [1, 2, 3]",
            correct_order: ["nums = [1, 2, 3]", "result = list(map(lambda x: x * x, nums))", "print(result)"],
            answer: ["nums = [1, 2, 3]", "result = list(map(lambda x: x * x, nums))", "print(result)"],
            hint: "لیست، map، چاپ",
            xp: 25,
            explanation: "اول لیست، بعد map با لامبدای مربع، بعد چاپ."
        }
    ],
    project: {
        id: "ch18_project",
        title: "پردازش سریع اعداد",
        brief: "لیستی از اعداد بساز، با map همه رو دوبرابر کن، با filter اونایی که از 10 بزرگ‌ترن نگه دار و نتیجه رو چاپ کن.",
        accepts: [
            { check: (c) => /lambda/.test(c), success: "lambda داری", hint: "حداقل یک lambda استفاده کن", points: 4 },
            { check: (c) => /map\s*\(/.test(c), success: "map داری", hint: "با map تغییر بده", points: 3 },
            { check: (c) => /filter\s*\(/.test(c), success: "filter داری", hint: "با filter فیلتر کن", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

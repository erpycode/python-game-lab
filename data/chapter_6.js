PB.registerChapter({
    version: 2,
    id: 6,
    title: "لیست‌ها",
    level: "advanced",
    lesson: {
        title: "لیست‌ها — مجموعه‌های مرتب",
        intro: "لیست مهم‌ترین ساختار داده‌ی پایتونه. با لیست می‌تونی چند مقدار رو توی یه متغیر نگه داری، بهشون دسترسی داشته باشی، اضافه/حذف کنی و روشون حلقه بزنی. مثل یه قفسه‌ی کتاب که هر کتاب یه شماره داره.",
        sections: [
            {
                icon: "🗂️",
                title: "ساخت لیست و دسترسی",
                text: "لیست با [ ] ساخته می‌شه و عنصرها با کاما جدا می‌شن.\n\nایندکس از 0 شروع می‌شه:\nfruits[0] → 'سیب'\nfruits[1] → 'موز'\nfruits[-1] → 'انگور' (آخرین)\n\nlen(list) → تعداد عنصرها",
                code: "fruits = ['سیب', 'موز', 'انگور']\nprint(fruits[0])\nprint(fruits[1])\nprint(fruits[-1])\nprint(len(fruits))",
                output: "سیب\nموز\nانگور\n3"
            },
            {
                icon: "🔧",
                title: "تغییر، اضافه، حذف",
                text: "متدهای پرکاربرد:\n\nappend(x) — به آخر اضافه کن\ninsert(i, x) — توی جای مشخص بذار\nremove(x) — اولین مورد رو حذف کن\npop() — آخرین رو حذف و برگردون\n\nهمچنین می‌تونی مستقیم تغییرش بدی:\nlist[0] = 'مقدار جدید'",
                code: "tasks = ['درس', 'بازی']\ntasks.append('خرید')\nprint(tasks)\n\ntasks[1] = 'ورزش'\nprint(tasks)\n\ntasks.pop()\nprint(tasks)",
                output: "['درس', 'بازی', 'خرید']\n['درس', 'ورزش', 'خرید']\n['درس', 'ورزش']"
            },
            {
                icon: "✂️",
                title: "برش (Slicing)",
                text: "با برش می‌تونی بخشی از لیست رو بگیری:\n\nlist[start:end] — از start تا end (end شامل نمی‌شه)\nlist[:3] — از اول تا 3\nlist[2:] — از 2 تا آخر\nlist[::2] — یکی در میون",
                code: "nums = [10, 20, 30, 40, 50]\nprint(nums[1:3])\nprint(nums[:2])\nprint(nums[2:])\nprint(nums[::2])",
                output: "[20, 30]\n[10, 20]\n[30, 40, 50]\n[10, 30, 50]"
            },
            {
                icon: "🔁",
                title: "حلقه روی لیست",
                text: "ساده‌ترین راه پیمایش لیست:\n\nfor item in list:\n    print(item)\n\nاگه به ایندکس هم نیاز داری:\nfor i in range(len(list)):\n    print(i, list[i])\n\nیا: for i, item in enumerate(list):",
                code: "scores = [80, 95, 70]\ntotal = 0\nfor s in scores:\n    total += s\n\nprint(total)\nprint(total / len(scores))",
                output: "245\n81.66666666666667"
            },
            {
                icon: "🎯",
                title: "بررسی عضویت",
                text: "با in و not in می‌تونی ببینی چیزی توی لیسته یا نه:\n\nif 'موز' in fruits:\n    print('موز هست')\n\nif 'انبه' not in fruits:\n    print('انبه نیست')",
                code: "colors = ['قرمز', 'سبز', 'آبی']\nif 'سبز' in colors:\n    print('سبز پیدا شد!')\n\nif 'بنفش' not in colors:\n    print('بنفش توی لیست نیست')",
                output: "سبز پیدا شد!\nبنفش توی لیست نیست"
            }
        ],
        tips: [
            "ایندکس لیست از 0 شروع می‌شه، نه 1!",
            "ایندکس منفی از آخر شماره می‌کنه: -1 آخرین عنصر.",
            "لیست mutable هست — یعنی بعد از ساخت می‌تونی تغییرش بدی.",
        ]
    },
    exercises: [
        {
            id: "ch6_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "nums = [10, 20, 30]\nprint(nums[0])",
            answer: "10",
            hint: "ایندکس از 0 شروع می‌شه",
            hints: ["nums[0] یعنی اولین عنصر", "اولین عنصر 10 هست"],
            explanation: "ایندکس 0 یعنی اولین عنصر لیست که 10 هست."
        },
        {
            id: "ch6_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "nums = [10, 20, 30]\nprint(nums[-1])",
            answer: "30",
            hint: "ایندکس منفی از آخر",
            hints: ["-1 یعنی آخرین عنصر", "آخرین عنصر 30 هست"],
            explanation: "ایندکس -1 به آخرین عنصر اشاره می‌کنه که 30 هست."
        },
        {
            id: "ch6_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "nums = [1, 2, 3, 4, 5]\nprint(len(nums))",
            answer: "5",
            hint: "len تعداد عنصرها رو می‌ده",
            hints: ["چند عنصر توی لیسته؟", "1,2,3,4,5 → ۵ تا"],
            explanation: "لیست ۵ عنصر داره، پس len(nums) برابر 5 هست."
        },
        {
            id: "ch6_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "tasks = ['الف', 'ب']\ntasks.append('ج')\nprint(len(tasks))",
            answer: "3",
            hint: "append یکی اضافه می‌کنه",
            hints: ["۲ تا بود، یه دونه اضافه شد", "۲+۱ = ۳"],
            explanation: "بعد از append، لیست ۳ عنصر داره: ['الف', 'ب', 'ج']."
        },
        {
            id: "ch6_e5",
            type: "quiz",
            title: "نتیجه‌ی این برش چیه؟",
            code: "nums = [5, 10, 15, 20, 25]\nprint(nums[1:3])",
            options: [
                { label: "a", text: "[10, 15]" },
                { label: "b", text: "[5, 10]" },
                { label: "c", text: "[15, 20]" },
                { label: "d", text: "[10, 15, 20]" }
            ],
            correct: "a",
            hint: "ایندکس 1 تا 2 (3 شامل نمی‌شه)",
            hints: ["nums[1] = 10", "nums[2] = 15", "nums[3] = 20 ولی شامل نمی‌شه"],
            explanation: "برش [1:3] یعنی ایندکس 1 و 2 → [10, 15]."
        },
        {
            id: "ch6_e6",
            type: "fill_gap",
            title: "لیست رو کامل کن:",
            code: "fruits = ['سیب', 'موز']\nfruits.___('انگور')\nprint(fruits)",
            answer: "append",
            hint: "متدی که به آخر اضافه می‌کنه",
            hints: ["به آخر اضافه کردن", "append"],
            explanation: "append('انگور') به آخر لیست اضافه می‌شه."
        }
    ],
    challenges: [
        {
            id: "ch6_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "nums = [1, 2, 3, 4, 5]\nprint(nums[2])",
            answer: "3",
            hint: "شمارش از 0",
            xp: 10,
            explanation: "nums[2] سومین عنصر هست (چون از 0 شروع می‌شه) که 3 هست."
        },
        {
            id: "ch6_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "عدد 100 رو به لیست اضافه کن:",
            code: "nums = [1, 2, 3]\nnums.___(100)\nprint(nums)",
            answer: "append",
            hint: "متد اضافه به آخر",
            xp: 15,
            explanation: "با append عدد 100 به آخر لیست اضافه می‌شه."
        },
        {
            id: "ch6_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "nums = [10, 20, 30]\nprint(nums[3])",
            error_line: 2,
            reason: "ایندکس 3 وجود نداره — لیست فقط ایندکس 0، 1 و 2 داره",
            hint: "ایندکس از آخرین عنصر بیشترِ",
            xp: 20,
            explanation: "لیست ۳ عنصر داره (ایندکس 0,1,2). دسترسی به ایندکس 3 → IndexError."
        },
        {
            id: "ch6_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "scores = [70, 85, 90]\nprint(sum(scores))",
            answer: "245",
            hint: "جمع همه",
            xp: 20,
            explanation: "sum لیست رو جمع می‌کنه: 70+85+90 = 245."
        },
        {
            id: "ch6_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا خروجی [2, 4, 6] بشه:",
            code: "nums = [1, 2, 3]\nprint(nums)\nnums = [n * 2 for n in nums]",
            correct_order: ["nums = [1, 2, 3]", "nums = [n * 2 for n in nums]", "print(nums)"],
            answer: ["nums = [1, 2, 3]", "nums = [n * 2 for n in nums]", "print(nums)"],
            hint: "تعریف، تغییر، چاپ",
            xp: 25,
            explanation: "لیست اول ساخته می‌شه، بعد با کامپریهنشن دوبرابر می‌شه، بعد چاپ می‌شه."
        }
    ],
    project: {
        id: "ch6_project",
        title: "مدیر لیست خرید",
        brief: "لیستی از ۳ خرید بساز، یک مورد جدید با append اضافه کن، مورد دوم رو تغییر بده و بعد کل لیست رو چاپ کن.",
        accepts: [
            { check: (c) => /\[.*\]/.test(c), success: "لیست ساختی", hint: "با [ ] لیست بساز", points: 3 },
            { check: (c) => /\.append/.test(c), success: "append استفاده کردی", hint: "با append یک مورد اضافه کن", points: 3 },
            { check: (c) => /\[0\]\s*=|\s*=\s*['\"]|\[1\]\s*=/.test(c), success: "یک مورد رو تغییر دادی", hint: "با ایندکس یک مورد رو عوض کن", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "لیست رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

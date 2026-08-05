PB.registerChapter({
    version: 2,
    id: 23,
    title: "تست‌نویسی",
    level: "expert",
    lesson: {
        title: "تست‌نویسی — pytest و assert",
        intro: "برنامه‌ی بدون تست مثل ماشین بدون تست‌درایویه — مطمئن نیستی کار می‌کنه! تست‌نویسی یعنی نوشتن کدی که کد دیگه رو بررسی می‌کنه. با pytest این کار ساده، سریع و حتی لذت‌بخشه.",
        sections: [
            {
                icon: "🧪",
                title: "assert — بررسی ساده",
                text: "assert پایه‌ی همه‌چیزه:\n\nassert 2 + 2 == 4  ← درسته\nassert 2 + 2 == 5  ← AssertionError می‌ده\n\nاگه عبارت False باشه، خطای AssertionError می‌گیریم.",
                code: "assert 2 + 2 == 4\nprint('درست!')\n\n# assert 2 + 2 == 5  ← خطا می‌ده\n# این خط رو اجرا نکن!",
                output: "درست!"
            },
            {
                icon: "📁",
                title: "ساختار pytest",
                text: "قوانین pytest:\n\n1. فایل‌ها: test_*.py\n2. توابع: def test_...()\n3. با assert بررسی می‌کنی\n\nاجرا:\npytest\nیا: pytest test_calc.py",
                code: "# test_calc.py\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n    assert add(-1, 1) == 0\n    assert add(0, 0) == 0\n\n# اجرا: pytest",
                output: "."
            },
            {
                icon: "✅",
                title: "تست با pytest",
                text: "مثال کامل:\n\ndef test_double():\n    assert double(4) == 8\n    assert double(0) == 0\n\ndef test_negative():\n    assert double(-3) == -6\n\nهر تابع test_ یه تست جداست. خرابی هر کدوم جدا گزارش می‌شه.",
                code: "def double(x):\n    return x * 2\n\ndef test_double_positive():\n    assert double(4) == 8\n\ndef test_double_negative():\n    assert double(-3) == -6\n\ndef test_double_zero():\n    assert double(0) == 0",
                output: ""
            },
            {
                icon: "🛡️",
                title: "چرا تست مهمه؟",
                text: "مزیت‌های تست:\n\n1. با خیال راحت کد رو تغییر می‌دی\n2. باگ‌ها زودتر پیدا می‌شن\n3. کدت مستند می‌شه\n4. با هر تغییر، مطمئنی چیزی خراب نشده\n\nقانون طلایی: قبل از رفع باگ، اول تست بنویس که باگ رو نشون بده!",
                code: "def is_even(n):\n    return n % 2 == 0\n\ndef test_is_even():\n    assert is_even(4) == True\n    assert is_even(7) == False\n\ndef test_is_even_zero():\n    assert is_even(0) == True",
                output: ""
            }
        ],
        tips: [
            "اسم تابع تست همیشه با test_ شروع بشه.",
            "هر تست باید فقط یک رفتار رو بررسی کنه.",
            "تست‌ها رو قبل از رفع باگ بنویس — این روش TDD هست.",
        ]
    },
    exercises: [
        {
            id: "ch23_e1",
            type: "quiz",
            title: "پایه‌ی تست:",
            code: "برای بررسی درستی از چی استفاده می‌کنیم؟",
            options: [
                { label: "a", text: "assert" },
                { label: "b", text: "check" },
                { label: "c", text: "verify" },
                { label: "d", text: "print" }
            ],
            correct: "a",
            hint: "ادعا کردن",
            hints: ["assert", "assert عبارت"],
            explanation: "assert بررسی می‌کنه یه عبارت True باشه — پایه‌ی تست‌نویسی."
        },
        {
            id: "ch23_e2",
            type: "quiz",
            title: "اسم تابع تست:",
            code: "توابع تست با چی شروع می‌شن؟",
            options: [
                { label: "a", text: "test_" },
                { label: "b", text: "check_" },
                { label: "c", text: "verify_" },
                { label: "d", text: "run_" }
            ],
            correct: "a",
            hint: "قانون pytest",
            hints: ["test_", "def test_...()"],
            explanation: "pytest فقط توابعی رو پیدا می‌کنه که با test_ شروع می‌شن."
        },
        {
            id: "ch23_e3",
            type: "predict",
            title: "این تست می‌گذره یا نه؟",
            code: "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5",
            answer: "می‌گذرد",
            hint: "2 + 3 = 5",
            hints: ["add(2,3) = 5", "5 == 5 درسته"],
            explanation: "add(2, 3) برابر 5 هست و 5 == 5 درسته — پس تست پاس می‌شه."
        },
        {
            id: "ch23_e4",
            type: "predict",
            title: "این تست می‌گذره یا نه؟",
            code: "def double(x):\n    return x + 2\n\ndef test_double():\n    assert double(4) == 8",
            answer: "نه — خطا می‌ده",
            hint: "double(4) چی می‌ده؟",
            hints: ["double(4) = 4 + 2 = 6", "6 == 8 غلطه → AssertionError"],
            explanation: "double(4) = 6 (نه 8). assert شکست می‌خوره → AssertionError. باگ توی تابع double هست!"
        },
        {
            id: "ch23_e5",
            type: "fill_gap",
            title: "تست رو کامل کن:",
            code: "def is_even(n):\n    return n % 2 == 0\n\ndef test_is_even():\n    ___ is_even(4) == True",
            answer: "assert",
            hint: "کلمه‌ی بررسی",
            hints: ["assert", "assert is_even(4) == True"],
            explanation: "با assert بررسی می‌کنیم تابع درست کار می‌کنه."
        },
        {
            id: "ch23_e6",
            type: "quiz",
            title: "اجرای pytest:",
            code: "تست‌ها با چه دستوری اجرا می‌شن؟",
            options: [
                { label: "a", text: "pytest" },
                { label: "b", text: "python test" },
                { label: "c", text: "run tests" },
                { label: "d", text: "test run" }
            ],
            correct: "a",
            hint: "اسم فریم‌ورک",
            hints: ["pytest", "همون اسم فریم‌ورک"],
            explanation: "با دستور pytest همه‌ی تست‌ها اجرا می‌شن."
        }
    ],
    challenges: [
        {
            id: "ch23_c1",
            type: "predict",
            difficulty: "easy",
            title: "این تست پاس می‌شه؟",
            code: "assert 10 > 5",
            answer: "بله",
            hint: "10 بزرگ‌تر از 5",
            xp: 10,
            explanation: "10 > 5 درسته، پس assert پاس می‌شه."
        },
        {
            id: "ch23_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کدوم تست خرابه؟",
            code: "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 2) == 4\n\ndef test_broken():\n    assert add(1, 1) == 3",
            error_line: 6,
            reason: "add(1, 1) = 2 ولی assert ادعا می‌کنه 3 — این تست شکست می‌خوره",
            hint: "کدوم assert غلطه؟",
            xp: 20,
            explanation: "add(1, 1) برابر 2 هست ولی تست انتظار 3 داره — این تست شکست می‌خوره."
        },
        {
            id: "ch23_c3",
            type: "fill_gap",
            difficulty: "medium",
            title: "تست رو کامل کن:",
            code: "def multiply(a, b):\n    return a * b\n\ndef test_multiply():\n    assert multiply(3, 4) == ___",
            answer: "12",
            hint: "3 × 4",
            xp: 15,
            explanation: "3 × 4 = 12، پس انتظار باید 12 باشه."
        },
        {
            id: "ch23_c4",
            type: "quiz",
            difficulty: "medium",
            title: "چرا تست می‌نویسیم؟",
            code: "مهم‌ترین دلیل تست‌نویسی چیه؟",
            options: [
                { label: "a", text: "برای زیبایی کد" },
                { label: "b", text: "برای مطمئن شدن کد درست کار می‌کنه" },
                { label: "c", text: "برای سریع‌تر شدن برنامه" },
                { label: "d", text: "الزامیه" }
            ],
            correct: "b",
            hint: "اطمینان از درستی",
            xp: 15,
            explanation: "تست‌ها مطمئن‌ت می‌کنن کد درست کار می‌کنه و تغییرات چیزی رو خراب نکردن."
        },
        {
            id: "ch23_c5",
            type: "sort",
            difficulty: "hard",
            title: "ترتیب درست فایل تست:",
            code: "assert add(2, 3) == 5\ndef test_add():\ndef add(a, b):\n    return a + b",
            correct_order: ["def add(a, b):", "    return a + b", "def test_add():", "    assert add(2, 3) == 5"],
            answer: ["def add(a, b):", "    return a + b", "def test_add():", "    assert add(2, 3) == 5"],
            hint: "تابع اصلی، بعد تستش",
            xp: 25,
            explanation: "اول تابع اصلی، بعد تابع تست با assert."
        }
    ],
    project: {
        id: "ch23_project",
        title: "تست‌کننده‌ی توابع",
        brief: "تابع is_even (زوج بودن) بنویس و سه تست با pytest براش بنویس: عدد زوج، عدد فرد و صفر. همه با assert.",
        accepts: [
            { check: (c) => /def\s+is_even/.test(c), success: "تابع is_even داری", hint: "def is_even(n) بساز", points: 3 },
            { check: (c) => /def\s+test_/.test(c), success: "تابع تست داری", hint: "با def test_ تست بساز", points: 4 },
            { check: (c) => /assert/.test(c), success: "assert داری", hint: "با assert بررسی کن", points: 4 },
            { check: (c) => /%|==/.test(c), success: "محاسبه/مقایسه داری", hint: "با % زوج بودن رو چک کن", points: 2 }
        ],
        passScore: 70
    }
});

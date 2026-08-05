PB.registerChapter({
    version: 2,
    id: 8,
    title: "متدهای رشته",
    level: "advanced",
    lesson: {
        title: "متدهای رشته — کار با متن",
        intro: "رشته‌ها فقط برای چاپ نیستن! پایتون کلی متد آماده داره که کار با متن رو راحت می‌کنه: بزرگ/کوچک کردن، شکستن، چسبوندن، جایگزینی و حتی قالب‌بندی حرفه‌ای.",
        sections: [
            {
                icon: "🔠",
                title: "تغییر بزرگی حروف",
                text: "سه متد پرکاربرد:\n\nupper() — همه بزرگ\nlower() — همه کوچک\ntitle() — اولین حرف هر کلمه بزرگ\n\nنکته: این متدها رشته‌ی جدید می‌سازن؛ رشته اصلی تغییر نمی‌کنه.",
                code: "text = 'Hello Python'\nprint(text.upper())\nprint(text.lower())\nprint(text.title())",
                output: "HELLO PYTHON\nhello python\nHello Python"
            },
            {
                icon: "✂️",
                title: "strip، split و join",
                text: "strip() — فاصله‌های اضافه اول/آخر رو حذف می‌کنه\nsplit() — رشته رو به لیست تبدیل می‌کنه\njoin() — لیست رو به رشته تبدیل می‌کنه\n\nsplit(',') — با کاما جدا می‌کنه\n' - '.join(list) — با ' - ' می‌چسبونه",
                code: "text = '  سلام دنیا  '\nprint(text.strip())\n\nwords = 'سیب،موز،انگور'\nprint(words.split('،'))\n\nparts = ['a', 'b', 'c']\nprint('|'.join(parts))",
                output: "سلام دنیا\n['سیب', 'موز', 'انگور']\na|b|c"
            },
            {
                icon: "🔍",
                title: "جستجو و جایگزینی",
                text: "find() — ایندکس اولین پیدایش (یا -1)\ncount() — تعداد تکرار\nreplace(قدیم, جدید) — جایگزینی همه\nstartswith() / endswith() — شروع/پایان",
                code: "msg = 'Python قشنگه، Python قدرتمنده'\nprint(msg.count('Python'))\nprint(msg.find('قشنگه'))\nprint(msg.replace('Python', 'پایتون'))\nprint(msg.startswith('Python'))",
                output: "2\n7\nپایتون قشنگه، پایتون قدرتمنده\nTrue"
            },
            {
                icon: "🎨",
                title: "f-string — قالب‌بندی مدرن",
                text: "به‌جای چسبوندن رشته با +، از f-string استفاده کن:\n\nname = 'علی'\nprint(f'سلام {name}')\n\nمی‌تونی داخلش محاسبه هم بزنی:\nprint(f'جمع: {3 + 4}')\n\nتعداد اعشار: {pi:.2f}",
                code: "name = 'علی'\nage = 25\nprint(f'سلام {name}، سن تو {age} است')\n\npi = 3.14159\nprint(f'پی: {pi:.2f}')\nprint(f'جمع: {10 + 5}')",
                output: "سلام علی، سن تو 25 است\nپی: 3.14\nجمع: 15"
            },
            {
                icon: "🔄",
                title: "برعکس و طول",
                text: "len() — تعداد کاراکترها\n[::-1] — برعکس کردن رشته\n\nنکته: رشته immutable هست — نمی‌تونی کاراکتری رو مستقیم تغییر بدی، باید رشته‌ی جدید بسازی.",
                code: "word = 'سلام'\nprint(len(word))\nprint(word[::-1])\nprint('abc' * 3)",
                output: "4\nمالس\nabcabcabc"
            }
        ],
        tips: [
            "رشته‌ها immutable هستن — متدها رشته‌ی جدید می‌سازن.",
            "برای قالب‌بندی همیشه f-string استفاده کن، نه +.",
            "split و join عکس هم هستن: split('x') و 'x'.join()",
        ]
    },
    exercises: [
        {
            id: "ch8_e1",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "print('python'.upper())",
            answer: "PYTHON",
            hint: "upper همه رو بزرگ می‌کنه",
            hints: ["حروف کوچک به بزرگ تبدیل می‌شن", "python → PYTHON"],
            explanation: "upper() همه‌ی حروف رو بزرگ می‌کنه: PYTHON."
        },
        {
            id: "ch8_e2",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "print('  hello  '.strip())",
            answer: "hello",
            hint: "strip فاصله‌ها رو حذف می‌کنه",
            hints: ["فاصله‌های اول و آخر", "hello می‌مونه"],
            explanation: "strip() فاصله‌های اول و آخر رو حذف می‌کنه."
        },
        {
            id: "ch8_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "text = 'a,b,c'\nprint(text.split(','))",
            answer: "['a', 'b', 'c']",
            hint: "split با کاما جدا می‌کنه",
            hints: ["به لیست تبدیل می‌شه", "['a', 'b', 'c']"],
            explanation: "split(',') رشته رو به لیست سه‌تایی تبدیل می‌کنه."
        },
        {
            id: "ch8_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "name = 'سارا'\nprint(f'سلام {name}!')",
            answer: "سلام سارا!",
            hint: "مقدار name داخل رشته قرار می‌گیره",
            hints: ["f-string مقدار رو جایگذاری می‌کنه", "'سارا' به جای {name}"],
            explanation: "f-string مقدار name رو داخل رشته قرار می‌ده: سلام سارا!"
        },
        {
            id: "ch8_e5",
            type: "quiz",
            title: "خروجی این کد چیه؟",
            code: "msg = 'a-b-c'\nprint(msg.replace('-', '+'))",
            options: [
                { label: "a", text: "a+b+c" },
                { label: "b", text: "a-b-c" },
                { label: "c", text: "a_b_c" },
                { label: "d", text: "abc" }
            ],
            correct: "a",
            hint: "همه‌ی خط‌های تیره عوض می‌شن",
            hints: ["replace همه موارد رو عوض می‌کنه", "- به + تبدیل می‌شه"],
            explanation: "replace همه‌ی '-' رو با '+' عوض می‌کنه: a+b+c."
        },
        {
            id: "ch8_e6",
            type: "fill_gap",
            title: "متد درست رو بنویس:",
            code: "text = 'HELLO'\nprint(text.___())  # خروجی: hello",
            answer: "lower",
            hint: "همه کوچیک",
            hints: ["HELLO → hello", "lower"],
            explanation: "lower() همه‌ی حروف رو کوچک می‌کنه: hello."
        }
    ],
    challenges: [
        {
            id: "ch8_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "print('Python is fun'.title())",
            answer: "Python Is Fun",
            hint: "اولین حرف هر کلمه بزرگ",
            xp: 10,
            explanation: "title() اولین حرف هر کلمه رو بزرگ می‌کنه."
        },
        {
            id: "ch8_c2",
            type: "fill_gap",
            difficulty: "medium",
            title: "چسبوندن لیست:",
            code: "words = ['پایتون', 'باز']\nprint(' '.___(words))",
            answer: "join",
            hint: "لیست رو به رشته تبدیل کن",
            xp: 15,
            explanation: "' '.join(words) کلمات رو با فاصله می‌چسبونه: «پایتون باز»."
        },
        {
            id: "ch8_c3",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "num = 42\nprint(num.upper())",
            error_line: 2,
            reason: "upper فقط روی رشته کار می‌کنه، عدد 42 متد upper نداره",
            hint: "num عدد هست نه رشته",
            xp: 20,
            explanation: "متدهای رشته مثل upper فقط روی str کار می‌کنن. عدد 42 متد upper نداره → AttributeError."
        },
        {
            id: "ch8_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "text = 'a-b-c-d'\nprint(len(text.split('-')) - 1)",
            answer: "3",
            hint: "split تعداد عنصرها و بعد منها",
            xp: 20,
            explanation: "split('-') → ['a','b','c','d'] که ۴ عنصره. 4 - 1 = 3."
        },
        {
            id: "ch8_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا «همه چی» چاپ بشه:",
            code: "print(text)\ntext = 'همه'\ntext = text + ' چی'",
            correct_order: ["text = 'همه'", "text = text + ' چی'", "print(text)"],
            answer: ["text = 'همه'", "text = text + ' چی'", "print(text)"],
            hint: "مقداردهی، چسباندن، چاپ",
            xp: 25,
            explanation: "اول 'همه'، بعد + ' چی' می‌شه «همه چی»، بعد چاپ."
        }
    ],
    project: {
        id: "ch8_project",
        title: "پاک‌کننده‌ی متن",
        brief: "یه متن ذخیره کن، فاصله‌های اضافه‌ش رو strip کن، همه‌رو کوچیک کن و یک کلمه رو با replace عوض کن. بعد نتیجه‌ها رو چاپ کن.",
        accepts: [
            { check: (c) => /\.strip\s*\(/.test(c), success: "strip استفاده کردی", hint: "فاصله‌ها رو strip کن", points: 3 },
            { check: (c) => /\.lower\s*\(|\.upper\s*\(/.test(c), success: "تغییر بزرگی داری", hint: "lower یا upper بزن", points: 3 },
            { check: (c) => /\.replace\s*\(/.test(c), success: "replace استفاده کردی", hint: "یک کلمه رو عوض کن", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه‌ها رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

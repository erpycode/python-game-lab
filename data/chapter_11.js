PB.registerChapter({
    version: 2,
    id: 11,
    title: "شی‌گرایی",
    level: "expert",
    lesson: {
        title: "شی‌گرایی — کلاس و آبجکت",
        intro: "تا اینجا با توابع کد رو بسته‌بندی کردیم. حالا وقت بسته‌بندی داده‌هاست! کلاس مثل یه قالب (مثل قالب شیرینی) و آبجکت مثل شیرینی‌هایی که با اون قالب می‌پزی. این قلب پایتون مدرنه.",
        sections: [
            {
                icon: "🏛️",
                title: "ساخت کلاس",
                text: "ساختار:\n\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print('واق واق!')\n\n__init__ سازنده (constructor) هست — موقع ساخت آبجکت اجرا می‌شه.\nself به خود آبجکت اشاره می‌کنه.",
                code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(self.name, 'می‌گوید: واق!')\n\nrex = Dog('رکس')\nrex.bark()\nprint(rex.name)",
                output: "رکس می‌گوید: واق!\nرکس"
            },
            {
                icon: "🔑",
                title: "ویژگی‌ها (Attributes)",
                text: "ویژگی‌ها داده‌های آبجکت هستن:\n\nself.name، self.age، self.color\n\nهر آبجکت ویژگی‌های خودش رو داره:\nrex.name = 'رکس'\npuffy.name = 'پفی'\n\nمی‌تونی بعد از ساخت هم ویژگی اضافه کنی.",
                code: "class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n\ns1 = Student('علی', 18)\ns2 = Student('سارا', 20)\nprint(s1.name, s1.grade)\nprint(s2.name, s2.grade)",
                output: "علی 18\nسارا 20"
            },
            {
                icon: "⚙️",
                title: "متدها (Methods)",
                text: "متدها توابع داخل کلاس هستن که با self کار می‌کنن:\n\nمتد می‌تونه ویژگی‌ها رو بخونه یا عوض کنه.\nمتد می‌تونه مقدار برگردونه (return).",
                code: "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def get_balance(self):\n        return self.balance\n\nacc = BankAccount('علی')\nacc.deposit(100)\nprint(acc.get_balance())",
                output: "100"
            },
            {
                icon: "🧬",
                title: "وراثت (Inheritance)",
                text: "کلاس‌ها می‌تونن از هم ارث ببرن:\n\nclass Cat:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print('میو')\n\nclass Kitten(Cat):  ← ارث بری\n    def play(self):\n        print(self.name, 'بازی می‌کنه')\n\nکلاس فرزند همه‌چی پدر رو داره + چیزهای خودش.",
                code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print('...')\n\nclass Cat(Animal):\n    def speak(self):\n        print(self.name, 'می‌گوید میو')\n\nclass Dog(Animal):\n    def speak(self):\n        print(self.name, 'می‌گوید واق')\n\nCat('بیبی').speak()\nDog('رکس').speak()",
                output: "بیبی می‌گوید میو\nرکس می‌گوید واق"
            }
        ],
        tips: [
            "اسم کلاس با حرف بزرگ شروع می‌شه (Dog، Student).",
            "__init__ همیشه اولین متده و با ساخت آبجکت اجرا می‌شه.",
            "وراثت یعنی کد کمتر، بازگشت پذیری بیشتر.",
        ]
    },
    exercises: [
        {
            id: "ch11_e1",
            type: "quiz",
            title: "سازنده‌ی کلاس کدومه؟",
            code: "کدوم متد موقع ساخت آبجکت اجرا می‌شه؟",
            options: [
                { label: "a", text: "__init__" },
                { label: "b", text: "self" },
                { label: "c", text: "class" },
                { label: "d", text: "def" }
            ],
            correct: "a",
            hint: "مخفف initialize",
            hints: ["سازنده (constructor)", "__init__"],
            explanation: "__init__ سازنده‌ی کلاسه که موقع ساخت آبجکت جدید اجرا می‌شه."
        },
        {
            id: "ch11_e2",
            type: "quiz",
            title: "self یعنی چی؟",
            code: "توی متد، self به چی اشاره می‌کنه؟",
            options: [
                { label: "a", text: "خود کلاس" },
                { label: "b", text: "همون آبجکتی که ساخته شده" },
                { label: "c", text: "پایتون" },
                { label: "d", text: "پارامتر اول" }
            ],
            correct: "b",
            hint: "self یعنی خودم",
            hints: ["self به آبجکت فعلی اشاره می‌کنه", "مثل rex یا s1"],
            explanation: "self به همون آبجکتی اشاره می‌کنه که متد روش صدا زده شده."
        },
        {
            id: "ch11_e3",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "class Car:\n    def __init__(self, brand):\n        self.brand = brand\n\nmy_car = Car('bmw')\nprint(my_car.brand)",
            answer: "bmw",
            hint: "ویژگی brand آبجکت",
            hints: ["my_car.brand", "موقع ساخت 'bmw' داده شده"],
            explanation: "my_car = Car('bmw') پس my_car.brand برابر 'bmw' هست."
        },
        {
            id: "ch11_e4",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "class Counter:\n    def __init__(self):\n        self.value = 0\n    def add(self):\n        self.value += 1\n\nc = Counter()\nc.add()\nc.add()\nprint(c.value)",
            answer: "2",
            hint: "دو بار add صدا زده شده",
            hints: ["شروع 0", "add یک بار → 1", "add دوباره → 2"],
            explanation: "value از 0 شروع می‌شه و هر add یک واحد اضافه می‌کنه. دو بار add → 2."
        },
        {
            id: "ch11_e5",
            type: "fill_gap",
            title: "کلاس رو کامل کن:",
            code: "class Person:\n    def __init__(self, name):\n        ___.name = name\n\np = Person('علی')\nprint(p.name)",
            answer: "self",
            hint: "ویژگی‌ها با چی ذخیره می‌شن؟",
            hints: ["self.name", "self"],
            explanation: "ویژگی‌ها با self ذخیره می‌شن: self.name = name."
        },
        {
            id: "ch11_e6",
            type: "predict",
            title: "خروجی این کد چیه؟",
            code: "class A:\n    def __init__(self):\n        self.x = 10\n\nclass B(A):\n    pass\n\nb = B()\nprint(b.x)",
            answer: "10",
            hint: "B از A ارث برده",
            hints: ["B(A) یعنی B فرزند A هست", "پس x = 10 رو داره"],
            explanation: "کلاس B از A ارث برده، پس ویژگی x (=10) رو هم داره."
        }
    ],
    challenges: [
        {
            id: "ch11_c1",
            type: "predict",
            difficulty: "easy",
            title: "خروجی این کد چیه؟",
            code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nanimal = Animal('خرس')\nprint(animal.name)",
            answer: "خرس",
            hint: "ویژگی name",
            xp: 10,
            explanation: "ویژگی name آبجکت animal برابر «خرس» هست."
        },
        {
            id: "ch11_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد خطا داره؟",
            code: "class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student()\nprint(s.name)",
            error_line: 5,
            reason: "سازنده‌ی Student به پارامتر name نیاز داره ولی آرگومانی داده نشده",
            hint: "موقع ساخت آبجکت آرگومان بده",
            xp: 20,
            explanation: "Student() باید با آرگومان ساخته بشه: Student('علی'). چون name نداره TypeError می‌ده."
        },
        {
            id: "ch11_c3",
            type: "fill_gap",
            difficulty: "medium",
            title: "کلاس رو کامل کن:",
            code: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        ___ 3.14 * self.radius * self.radius\n\nc = Circle(2)\nprint(c.area())",
            answer: "return",
            hint: "مقدار مساحت باید برگرده",
            xp: 15,
            explanation: "متد area باید مقدار مساحت رو return کنه تا print نشونش بده."
        },
        {
            id: "ch11_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nprint(Rectangle(3, 4).area())",
            answer: "12",
            hint: "مساحت مستطیل",
            xp: 20,
            explanation: "مساحت = عرض × ارتفاع = 3 × 4 = 12."
        },
        {
            id: "ch11_c5",
            type: "sort",
            difficulty: "hard",
            title: "مرتب کن تا کلاس درست کار کنه:",
            code: "self.name = name\nclass User:\n    def __init__(self, name):\n    u = User('علی')\nprint(u.name)",
            correct_order: ["class User:", "    def __init__(self, name):", "        self.name = name", "u = User('علی')", "print(u.name)"],
            answer: ["class User:", "    def __init__(self, name):", "        self.name = name", "u = User('علی')", "print(u.name)"],
            hint: "کلاس، سازنده، ویژگی، آبجکت، چاپ",
            xp: 25,
            explanation: "اول class، بعد __init__، بعد self.name، بعد ساخت آبجکت، بعد چاپ."
        }
    ],
    project: {
        id: "ch11_project",
        title: "کلاس کتاب",
        brief: "کلاس Book بساز با ویژگی‌های title و author. یه متد describe داشته باشه که توضیح کتاب رو برگردونه. دو کتاب بساز و چاپشون کن.",
        accepts: [
            { check: (c) => /class\s+\w+/.test(c), success: "کلاس ساختی", hint: "با class Book بساز", points: 4 },
            { check: (c) => /def\s+__init__\s*\(self/.test(c), success: "سازنده داری", hint: "__init__ با self بساز", points: 4 },
            { check: (c) => /self\.\w+\s*=/.test(c), success: "ویژگی داری", hint: "ویژگی‌ها رو با self ذخیره کن", points: 3 },
            { check: (c) => /def\s+\w+\s*\(self/.test(c), success: "متد داری", hint: "یه متد مثل describe بساز", points: 3 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

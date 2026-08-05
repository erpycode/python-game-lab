PB.registerChapter({
    version: 2,
    id: 22,
    title: "API و اینترنت",
    level: "expert",
    lesson: {
        title: "API و اینترنت — صحبت با وب",
        intro: "پایتون می‌تونه با دنیای بیرون حرف بزنه! APIها سرویس‌هایی هستن که داده‌ها رو از سرورها می‌دن — مثل منوی رستوران که می‌گی «این رو بده» و اون‌ها می‌دن. با requests این کار ساده‌ست.",
        sections: [
            {
                icon: "🌍",
                title: "requests — درخواست HTTP",
                text: "با requests می‌تونی به سرویس‌های وب وصل شی:\n\nimport requests\nresponse = requests.get('https://api.example.com')\n\nresponse.status_code — وضعیت (200 = موفق)\nresponse.json() — داده به صورت JSON\nresponse.text — داده به صورت متن",
                code: "import requests\n\nurl = 'https://api.github.com'\nprint('ارسال درخواست به', url)\nprint('بعد بررسی status_code')",
                output: "ارسال درخواست به https://api.github.com\nبعد بررسی status_code"
            },
            {
                icon: "📦",
                title: "کار با پاسخ JSON",
                text: "اکثر APIها JSON برمی‌گردونن:\n\nimport requests\nresponse = requests.get('https://api.example.com/users')\ndata = response.json()\nprint(data['name'])\n\nبعد مثل یه دیکشنری باهاش کار کن!",
                code: "import requests\n\n# شبیه‌سازی پاسخ API\nresponse = {'name': 'علی', 'age': 25, 'city': 'تهران'}\nprint(response['name'])\nprint(response.get('city'))",
                output: "علی\nتهران"
            },
            {
                icon: "🔗",
                title: "پارامترهای URL",
                text: "خیلی از APIها پارامتر می‌گیرن:\n\nrequests.get(url, params={'q': 'python', 'limit': 5})\n\nیا مستقیم توی URL:\nhttps://api.example.com/search?q=python&limit=5\n\n? شروع پارامترهاست، & جداکننده.",
                code: "import requests\n\n# پارامترها\nparams = {'q': 'python', 'limit': 3}\nprint(params)\n\n# ساخت URL\nurl = 'https://api.example.com/search?q=python&limit=3'\nprint(url)",
                output: "{'q': 'python', 'limit': 3}\nhttps://api.example.com/search?q=python&limit=3"
            },
            {
                icon: "🛠️",
                title: "خطاهای HTTP",
                text: "وضعیت‌های مهم:\n\n200 — موفق\n404 — پیدا نشد\n500 — خطای سرور\n\nبا raise_for_status() خطا رو چک کن:\nresponse.raise_for_status()",
                code: "# شبیه‌سازی وضعیتِ یک درخواست\nstatus_code = 404\n\nif status_code == 200:\n    print('موفق')\nelif status_code == 404:\n    print('پیدا نشد')\nelse:\n    print('خطای دیگر')",
                output: "پیدا نشد"
            }
        ],
        tips: [
            "همیشه status_code رو چک کن تا مطمئن شی جواب گرفتی.",
            "با .json() داده رو به دیکشنری تبدیل کن.",
            "با params پارامترها رو تمیزتر بفرست.",
        ]
    },
    exercises: [
        {
            id: "ch22_e1",
            type: "quiz",
            title: "درخواست GET:",
            code: "requests.___('https://api.example.com')",
            options: [
                { label: "a", text: "get" },
                { label: "b", text: "post" },
                { label: "c", text: "fetch" },
                { label: "d", text: "pull" }
            ],
            correct: "a",
            hint: "دریافت داده",
            hints: ["requests.get()", "get"],
            explanation: "requests.get() داده رو از URL دریافت می‌کنه."
        },
        {
            id: "ch22_e2",
            type: "quiz",
            title: "وضعیت موفق کدومه؟",
            code: "کد وضعیت موفقیت درخواست چیه؟",
            options: [
                { label: "a", text: "200" },
                { label: "b", text: "404" },
                { label: "c", text: "500" },
                { label: "d", text: "300" }
            ],
            correct: "a",
            hint: "همه چیز اوکیه",
            hints: ["200 = OK", "404 = پیدا نشد", "500 = خطای سرور"],
            explanation: "کد 200 یعنی درخواست با موفقیت انجام شده."
        },
        {
            id: "ch22_e3",
            type: "quiz",
            title: "پیدا نشد:",
            code: "کدوم کد یعنی صفحه پیدا نشد؟",
            options: [
                { label: "a", text: "404" },
                { label: "b", text: "200" },
                { label: "c", text: "500" },
                { label: "d", text: "100" }
            ],
            correct: "a",
            hint: "چهارصد و چهار",
            hints: ["404 Not Found", "404"],
            explanation: "کد 404 یعنی منبع پیدا نشد."
        },
        {
            id: "ch22_e4",
            type: "quiz",
            title: "پاسخ JSON رو چطور می‌خونی؟",
            code: "data = response.___()",
            options: [
                { label: "a", text: "json" },
                { label: "b", text: "text" },
                { label: "c", text: "data" },
                { label: "d", text: "parse" }
            ],
            correct: "a",
            hint: "تبدیل به دیکشنری",
            hints: ["response.json()", "json"],
            explanation: "response.json() پاسخ رو به دیکشنری پایتون تبدیل می‌کنه."
        },
        {
            id: "ch22_e5",
            type: "fill_gap",
            title: "ماژول requests:",
            code: "___ requests\nresponse = requests.get('https://x.com')",
            answer: "import",
            hint: "آوردن ماژول",
            hints: ["import requests", "import"],
            explanation: "import requests ماژول رو میاره."
        },
        {
            id: "ch22_e6",
            type: "quiz",
            title: "پارامترها چطور جدا می‌شن؟",
            code: "https://x.com/search?q=py&limit=5",
            options: [
                { label: "a", text: "با & " },
                { label: "b", text: "با +" },
                { label: "c", text: "با فاصله" },
                { label: "d", text: "با کاما" }
            ],
            correct: "a",
            hint: "بین پارامترها",
            hints: ["q=py و limit=5", "با & جدا می‌شن"],
            explanation: "پارامترهای URL با & از هم جدا می‌شن."
        }
    ],
    challenges: [
        {
            id: "ch22_c1",
            type: "fill_gap",
            difficulty: "easy",
            title: "درخواست بده:",
            code: "import requests\nresponse = requests.___('https://api.github.com')",
            answer: "get",
            hint: "متد دریافت",
            xp: 10,
            explanation: "requests.get() درخواست GET می‌فرسته."
        },
        {
            id: "ch22_c2",
            type: "bug_hunter",
            difficulty: "medium",
            title: "کجای کد مشکل داره؟",
            code: "import requests\n\nresponse = requests.get('https://httpbin.org/user-agent')\ndata = response.json()\nprint(data)\n\n# بعدتر... بهتره اول وضعیت رو چک کنی",
            error_line: 3,
            reason: "وقتی درخواست ممکنه با خطا برگرده (مثل 404)، باید اول status_code رو چک کنی؛ صدا زدن پشت‌سرهم .json() روی پاسخ خطا باعث JSONDecodeError می‌شه",
            hint: "اول وضعیت (status_code) رو بررسی کن",
            xp: 20,
            explanation: "بعد از درخواست شبکه، باید اول مطمئن شی جواب گرفتی (status_code == 200) بعد داده رو بخونی. این شبیه‌سازی خطای همیشگی کاربرانه."
        },
        {
            id: "ch22_c3",
            type: "quiz",
            difficulty: "medium",
            title: "خطای سرور کدومه؟",
            code: "کدوم کد یعنی خطای سرور؟",
            options: [
                { label: "a", text: "500" },
                { label: "b", text: "404" },
                { label: "c", text: "200" },
                { label: "d", text: "403" }
            ],
            correct: "a",
            hint: "Internal Server Error",
            xp: 15,
            explanation: "500 یعنی خطای داخلی سرور."
        },
        {
            id: "ch22_c4",
            type: "predict",
            difficulty: "medium",
            title: "خروجی این کد چیه؟",
            code: "import requests\n\n# شبیه‌سازی پاسخ موفق\nstatus_code = 200\nprint(status_code == 200)",
            answer: "True",
            hint: "مقایسه وضعیت",
            xp: 15,
            explanation: "وضعیت 200 است و 200 == 200 درسته → True."
        },
        {
            id: "ch22_c5",
            type: "sort",
            difficulty: "hard",
            title: "ترتیب درست درخواست API:",
            code: "data = response.json()\nresponse = requests.get(url)\nimport requests\nurl = 'https://api.example.com'",
            correct_order: ["import requests", "url = 'https://api.example.com'", "response = requests.get(url)", "data = response.json()"],
            answer: ["import requests", "url = 'https://api.example.com'", "response = requests.get(url)", "data = response.json()"],
            hint: "import، URL، درخواست، داده",
            xp: 25,
            explanation: "اول ماژول، بعد URL، بعد درخواست، بعد داده."
        }
    ],
    project: {
        id: "ch22_project",
        title: "چک‌کننده‌ی سایت",
        brief: "با requests به یه URL وصل شو، وضعیت (status_code) رو چک کن و اگه 200 بود «موفق» وگرنه «مشکل داره» چاپ کن.",
        accepts: [
            { check: (c) => /import\s+requests/.test(c), success: "requests import کردی", hint: "import requests", points: 3 },
            { check: (c) => /requests\.get/.test(c), success: "درخواست دادی", hint: "با requests.get درخواست بده", points: 4 },
            { check: (c) => /status_code/.test(c), success: "وضعیت رو چک کردی", hint: "با status_code وضعیت رو ببین", points: 4 },
            { check: (c) => /print/.test(c), success: "خروجی داری", hint: "نتیجه رو print کن", points: 2 }
        ],
        passScore: 70
    }
});

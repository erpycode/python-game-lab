<div dir="rtl">

# 🐍 پایتون‌باز | Python Baz

### یادگیری پایتون با بازی و چالش | Learn Python Through Games & Challenges

<p align="center">
  <img src="https://img.shields.io/badge/Python-Game_Lab-00d4aa?style=for-the-badge&logo=python&logoColor=white" alt="Python Game Lab">
  <img src="https://img.shields.io/badge/Platform-Web-4dabf7?style=for-the-badge" alt="Web">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Active">
  <a href="https://erpycode.github.io/python-game-lab/"><img src="https://img.shields.io/badge/🎮_بازی_آنلاین- LIVE-00d4aa?style=for-the-badge" alt="Live Demo"></a>
</p>

---

## 🎮 پایتون‌باز چیه؟

یه بازی آنلاین برای یادگیری پایتون از صفر. هر فصل شامل **آموزش**، **تمرین** و **چالش** هست. با حل کردن چالش‌ها، سطحت بالا میره و فصل‌های بعدی باز میشه!

**🔗 [بازی آنلاین پایتون‌باز](https://erpycode.github.io/python-game-lab/)**

## ✨ امکانات

| امکان | توضیح |
|:------|:------|
| 📖 آموزش ساده | هر فصل با توضیح ساده و مثال شروع میشه |
| 🎯 چالش‌های متنوع | پیش‌بینی خروجی، شکار باگ، جای خالی، چندگزینه‌ای |
| 💾 ذخیره پیشرفت | از هرجا ادامه بده، پیشرفتت از بین نمیره |
| 🔊 صدا و افکت | تجربه بازی با صدا و انیمیشن |
| 📱 ریسپانسیو | روی موبایل و دسکتاپ کار میکنه |
| 🔒 سطح‌بندی | فصل‌ها قفل هستن و باید فصل قبلی رو تموم کنی |
| 🌙☀️ حالت تاریک/روشن | تم دلخواهت رو انتخاب کن |
| 📖 واژه‌نامه پایتون | ۳۷ کلمه کلیدی با توضیح فارسی |
| 🔍 جستجوی فصل | سریع فصل مورد نظرت رو پیدا کن |
| 🏅 دستاورد‌ها | ۷ دستاورد قابل باز کردن |
| ⏱️ تایمر چالش | چالش‌ها رو با تایمر حل کن |
| 📊 پیشرفت کلی | نوار پیشرفت + آمار کامل |

## 📚 فصل‌ها

<table>
<tr>
<td align="center">

#### 📗 مبتدی
شروع یادگیری

| | فصل |
|:--:|:------|
| ۱ | متغیرها |
| ۲ | عملگرها |

</td>
<td align="center">

#### 📘 متوسط
عمیق‌تر شو!

| | فصل |
|:--:|:------|
| ۳ | شرط‌ها |
| ۴ | حلقه‌ها |
| ۵ | توابع |
| ۱۰ | مدیریت خطا |

</td>
<td align="center">

#### 📕 پیشرفته
حرفه‌ای شو!

| | فصل |
|:--:|:------|
| ۶ | لیست‌ها |
| ۷ | دیکشنری |
| ۸ | متدهای رشته |
| ۹ | مدیریت فایل |
| ۱۸ | توابع لامبدا |
| ۱۹ | لیست کامپریهنشن |

</td>
<td align="center">

#### 🎓 حرفه‌ای
استاد شو!

| | فصل |
|:--:|:------|
| ۱۱ | شی‌گرایی |
| ۱۲ | جنریتورها |
| ۱۳ | دکوراتورها |
| ۱۴ | ماژول‌ها |
| ۱۵ | عبارات باقاعده |
| ۱۶ | فریم‌ورک‌ها |
| ۱۷ | پایتون در عمل |
| ۲۰ | محیط مجازی |
| ۲۱ | پایگاه داده |
| ۲۲ | API و اینترنت |
| ۲۳ | تست‌نویسی |

</td>
</tr>
</table>

## 🚀 اجرا کردن

### 🎮 بازی آنلاین (بدون نصب)

**🔗 [بازی آنلاین پایتون‌باز](https://erpycode.github.io/python-game-lab/)**

فقط کافیه لینک رو باز کنی و شروع کنی!

### 💻 اجرا روی سیستم خودت

<div dir="ltr">

```bash
# Clone the repo
git clone https://github.com/erpycode/python-game-lab.git

# Go to directory
cd python-game-lab

# Start local server
python3 -m http.server 8080

# Open browser → http://localhost:8080
```

</div>

## 📁 ساختار پروژه

<div dir="ltr">

```
python-game-lab/
├── index.html              # Main page
├── css/
│   └── style.css           # Styles & animations
├── js/
│   ├── app.js              # Main logic + navigation
│   ├── challenges.js       # Challenge engine + smart feedback
│   ├── progress.js         # Progress storage (localStorage)
│   ├── ui.js               # User interface + rendering
│   ├── utils.js            # Helper functions
│   ├── sounds.js           # Sound effects (Web Audio API)
│   ├── achievements.js     # Badge/achievement system
│   ├── darkmode.js         # Dark/light theme toggle
│   ├── glossary.js         # Python glossary (37 terms)
│   ├── search.js           # Chapter search filter
│   └── timer.js            # Challenge countdown timer
├── data/
│   ├── chapter_1.json      # 📗 Variables
│   ├── chapter_2.json      # 📗 Operators
│   ├── ...                 # (23 chapters total)
│   └── chapter_23.json     # 🎓 Testing with pytest
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── .nojekyll               # Bypass Jekyll processing
├── DESIGN.md               # Design documentation
└── README.md
```

</div>

## 🤝 مشارکت

این پروژه اوپن‌سورس هست! اگه میخوای کمک کنی:

1. 🍴 ریپو رو Fork کن
2. 🌿 Branch جدید بساز
3. ✏️ تغییراتت رو commit کن
4. 📤 Push کن
5. 🔀 Pull Request بزن

## 📝 اضافه کردن فصل جدید

فقط یه فایل JSON جدید توی پوشه `data/` بساز و اسمش رو توی `js/ui.js` اضافه کن. برای جزئیات بیشتر فایل `DESIGN.md` رو ببین.

## 📄 لایسنس

[MIT License](LICENSE)

---

<p align="center">
  ساخته شده با ❤️ توسط <a href="https://github.com/erpycode">ErPyCode</a>
</p>

</div>

---

<div dir="ltr">
# 🐍 Python Baz

### Learn Python Through Games & Challenges

<p align="center">
  <img src="https://img.shields.io/badge/Python-Game_Lab-00d4aa?style=for-the-badge&logo=python&logoColor=white" alt="Python Game Lab">
  <img src="https://img.shields.io/badge/Platform-Web-4dabf7?style=for-the-badge" alt="Web">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Active">
  <a href="https://erpycode.github.io/python-game-lab/"><img src="https://img.shields.io/badge/🎮_Play_Live-00d4aa?style=for-the-badge" alt="Live Demo"></a>
</p>

---

## 🎮 What is Python Baz?

An online game for learning Python from scratch. Each chapter includes **lessons**, **exercises**, and **challenges**. Solve challenges to level up and unlock the next chapter!

**🔗 [Play Python Baz Online](https://erpycode.github.io/python-game-lab/)**

## ✨ Features

| Feature | Description |
|:--------|:------------|
| 📖 Simple Lessons | Each chapter starts with easy explanations and examples |
| 🎯 Various Challenges | Predict output, bug hunting, fill-in-the-blank, multiple choice |
| 💾 Save Progress | Resume from anywhere, your progress is saved locally |
| 🔊 Sound & Effects | Game experience with sounds and animations |
| 📱 Responsive | Works on mobile and desktop |
| 🔒 Level System | Chapters are locked — complete previous ones to unlock |
| 🌙☀️ Dark/Light Mode | Choose your preferred theme |
| 📖 Python Glossary | 37 key terms with Persian descriptions |
| 🔍 Chapter Search | Find any chapter instantly |
| 🏅 Achievements | 7 unlockable badges |
| ⏱️ Challenge Timer | Complete challenges against the clock |
| 📊 Progress Tracking | Overall progress bar + detailed stats |

## 📚 Chapters

<table>
<tr>
<td align="center">

#### 📗 Beginner
Start learning

| | Chapter |
|:--:|:------|
| 1 | Variables |
| 2 | Operators |

</td>
<td align="center">

#### 📘 Intermediate
Go deeper!

| | Chapter |
|:--:|:------|
| 3 | Conditionals |
| 4 | Loops |
| 5 | Functions |
| 10 | Error Handling |

</td>
<td align="center">

#### 📕 Advanced
Pro level!

| | Chapter |
|:--:|:------|
| 6 | Lists |
| 7 | Dictionaries |
| 8 | String Methods |
| 9 | File Handling |
| 18 | Lambda Functions |
| 19 | List Comprehension |

</td>
<td align="center">

#### 🎓 Expert
Master it!

| | Chapter |
|:--:|:------|
| 11 | OOP |
| 12 | Generators |
| 13 | Decorators |
| 14 | Modules |
| 15 | Regex |
| 16 | Frameworks |
| 17 | Python in Practice |
| 20 | Virtual Environments |
| 21 | SQLite Database |
| 22 | API & HTTP |
| 23 | Testing with pytest |

</td>
</tr>
</table>

## 🚀 Getting Started

### 🎮 Play Online (No Install Needed)

**🔗 [Play Python Baz Online](https://erpycode.github.io/python-game-lab/)**

### 💻 Run Locally

```bash
# Clone the repo
git clone https://github.com/erpycode/python-game-lab.git

# Go to directory
cd python-game-lab

# Start local server
python3 -m http.server 8080

# Open browser → http://localhost:8080
```

## 📁 Project Structure

```
python-game-lab/
├── index.html              # Main page
├── css/
│   └── style.css           # Styles & animations
├── js/
│   ├── app.js              # Main logic + navigation
│   ├── challenges.js       # Challenge engine + smart feedback
│   ├── progress.js         # Progress storage (localStorage)
│   ├── ui.js               # User interface + rendering
│   ├── utils.js            # Helper functions
│   ├── sounds.js           # Sound effects (Web Audio API)
│   ├── achievements.js     # Badge/achievement system
│   ├── darkmode.js         # Dark/light theme toggle
│   ├── glossary.js         # Python glossary (37 terms)
│   ├── search.js           # Chapter search filter
│   └── timer.js            # Challenge countdown timer
├── data/
│   ├── chapter_1.json      # 📗 Variables
│   ├── ...                 # (23 chapters total)
│   └── chapter_23.json     # 🎓 Testing with pytest
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── .nojekyll               # Bypass Jekyll processing
├── DESIGN.md               # Design documentation
└── README.md
```

## 🤝 Contributing

Contributions are welcome!

1. 🍴 Fork the repo
2. 🌿 Create a feature branch
3. ✏️ Commit changes
4. 📤 Push to branch
5. 🔀 Open a Pull Request

## 📝 Adding a New Chapter

Create a new JSON file in the `data/` folder and add its name to `js/ui.js`. See `DESIGN.md` for details.

## 📄 License

[MIT License](LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/erpycode">ErPyCode</a>
</p>

</div>

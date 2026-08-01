# 🐍 پایتون‌باز

یادگیری پایتون با بازی و چالش‌های جذاب!

<p align="center">
  <img src="https://img.shields.io/badge/Python-Game-Lab-00d4aa?style=for-the-badge&logo=python&logoColor=white" alt="Python Game Lab">
  <img src="https://img.shields.io/badge/Language-فارسی-ff6b6b?style=for-the-badge" alt="Farsi">
  <img src="https://img.shields.io/badge/Platform-Web-4dabf7?style=for-the-badge" alt="Web">
</p>

## 🎮 ویژگی‌ها

- 📖 **آموزش ساده** — هر فصل با توضیح ساده شروع میشه
- 🎯 **چالش‌های جذاب** — ۵ نوع چالش متنوع
- 💾 **ذخیره پیشرفت** — از هرجا ادامه بده
- 🌙 **تم تاریک** — چشم خسته نمیشه
- 📱 **ریسپانسیو** — روی موبایل هم کار میکنه
- 🔒 **قفل فصل‌ها** — اول فصل قبلی رو تموم کن

## 📚 فصل‌ها

| فصل | عنوان | سطح |
|-----|-------|-----|
| ۱ | متغیرها | 📗 مبتدی |
| ۲ | عملگرها | 📗 مبتدی |
| ۳ | شرط‌ها | 📘 متوسط |
| ۴ | حلقه‌ها | 📘 متوسط |
| ۵ | توابع | 📕 پیشرفته |

## 🎯 نوع چالش‌ها

| نوع | توضیح |
|-----|-------|
| 🔮 **پیش‌بینی** | خروجی کد رو حدس بزن |
| 🐛 **شکارچی باگ** | خط خطا رو پیدا کن |
| ✏️ **جای خالی** | کد ناقص رو کامل کن |
| 📝 **چندگزینه‌ای** | جواب درست رو انتخاب کن |
| 🔀 **مرتب کردن** | خطوط کد رو مرتب کن |

## 🚀 اجرا کردن

```bash
# کلون کن
git clone https://github.com/erpycode/python-game-lab.git

# بریم تو پوشه
cd python-game-lab

# باز کن با مرورگر
# index.html رو باز کن
```

یا آنلاین:
```
https://erpycode.github.io/python-game-lab/
```

## 🛠️ تکنولوژی‌ها

- HTML5
- CSS3 (با انیمیشن)
- JavaScript (Vanilla)
- localStorage (ذخیره‌سازی)
- فونت Vazirmatn (فارسی)

## 📁 ساختار پروژه

```
python-game-lab/
├── index.html          # صفحه اصلی
├── css/
│   └── style.css       # استایل‌ها
├── js/
│   ├── app.js          # لاجیک اصلی
│   ├── progress.js     # ذخیره پیشرفت
│   ├── challenges.js   # موتور چالش‌ها
│   ├── ui.js           # رابط کاربری
│   └── utils.js        # توابع کمکی
├── data/
│   ├── chapter_1.json  # فصل ۱
│   ├── chapter_2.json  # فصل ۲
│   ├── chapter_3.json  # فصل ۳
│   ├── chapter_4.json  # فصل ۴
│   └── chapter_5.json  # فصل ۵
└── README.md
```

## 🤝 مشارکت

این پروژه اوپن‌سورس هست! اگه میخوای مشارکت کنی:

1. Fork کن
2. Branch جدید بساز
3. تغییراتت رو push کن
4. Pull Request بزن

## 📝 اضافه کردن فصل جدید

فقط یه فایل JSON جدید توی پوشه `data/` بساز:

```json
{
    "id": "6",
    "title": "فصل ۶: لیست‌ها",
    "level": "advanced",
    "lesson": { ... },
    "exercises": [ ... ],
    "challenges": [ ... ]
}
```

بعد اسمش رو توی `js/ui.js` به آرایه `chaptersInfo` اضافه کن.

## 📄 لایسنس

MIT License

---

ساخته شده با ❤️ توسط [ErPyCode](https://github.com/erpycode)

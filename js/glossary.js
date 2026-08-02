/* ============================================
   🐍 پایتون‌باز — واژه‌نامه پایتون
   ============================================ */

// داده‌های واژه‌نامه
const GLOSSARY_DATA = [
    { term: 'Variable', fa: 'متغیر', desc: 'اسمی که به یه مقدار اختصاص داده میشه. مثل name = "Ali"' },
    { term: 'String (str)', fa: 'رشته', desc: 'متن داخل علامت نقل قول. مثل "سلام" یا \'Hello\'' },
    { term: 'Integer (int)', fa: 'عدد صحیح', desc: 'عدد بدون اعشار. مثل 5, -3, 100' },
    { term: 'Float', fa: 'عدد اعشاری', desc: 'عدد با اعشار. مثل 3.14, -0.5' },
    { term: 'Boolean (bool)', fa: 'بولین', desc: 'فقط دو مقدار داره: True یا False' },
    { term: 'print()', fa: 'چاپ', desc: 'نمایش اطلاعات روی صفحه' },
    { term: 'type()', fa: 'نوع', desc: 'نوع داده یه متغیر رو برمی‌گردونه' },
    { term: 'if/else/elif', fa: 'شرط', desc: 'بررسی شرط و اجرای کد بر اساس اون' },
    { term: 'for', fa: 'حلقه for', desc: 'تکرار کد برای هر آیتم در یه لیست' },
    { term: 'while', fa: 'حلقه while', desc: 'تکرار کد تا زمانی که شرط درست باشه' },
    { term: 'range()', fa: 'بازه عددی', desc: 'تولید اعداد پشت سر هم. مثل range(5) → 0,1,2,3,4' },
    { term: 'def', fa: 'تعریف تابع', desc: 'ساختن تابع جدید با def نام_تابع():' },
    { term: 'return', fa: 'برگشت', desc: 'مقدار خروجی تابع' },
    { term: 'List', fa: 'لیست', desc: 'مجموعه مرتب از آیتم‌ها. مثل [1, 2, 3]' },
    { term: 'Dictionary', fa: 'دیکشنری', desc: 'مجموعه کلید-مقدار. مثل {"name": "Ali"}' },
    { term: 'Tuple', fa: 'تورپل', desc: 'مثل لیست ولی غیرقابل تغییر. مثل (1, 2, 3)' },
    { term: 'Set', fa: 'مجموعه', desc: 'مجموعه بدون ترتیب و بدون تکرار. مثل {1, 2, 3}' },
    { term: 'append()', fa: 'اضافه کردن', desc: 'اضافه کردن آیتم به انتهای لیست' },
    { term: 'split()', fa: 'جدا کردن', desc: 'تقسیم رشته به لیست بر اساس جداکننده' },
    { term: 'join()', fa: 'وصل کردن', desc: 'وصل کردن لیست رشته‌ها با جداکننده' },
    { term: 'replace()', fa: 'جایگزینی', desc: 'جایگزینی بخشی از رشته' },
    { term: 'try/except', fa: 'مدیریت خطا', desc: 'گرفتن و مدیریت خطاها در کد' },
    { term: 'class', fa: 'کلاس', desc: 'قالب برای ساخت آبجکت در شی‌گرایی' },
    { term: 'object', fa: 'آبجکت', desc: 'نمونه‌ای از یه کلاس' },
    { term: 'import', fa: 'وارد کردن', desc: 'استفاده از ماژول‌های بیرونی' },
    { term: 'pip', fa: 'مدیر بسته', desc: 'ابزار نصب پکیج‌های پایتون' },
    { term: 'lambda', fa: 'لاگدا', desc: 'تابع کوچک و سریع بدون اسم' },
    { term: 'yield', fa: 'تولید', desc: 'برگشت مقدار در جنریتور' },
    { term: 'decorator', fa: 'دکوراتور', desc: 'افزودن قابلیت به تابع بدون تغییر خود تابع' },
    { term: 'f-string', fa: 'رشته قالبی', desc: 'درج متغیر داخل رشته. مثل f"سلام {name}"' },
    { term: 'List Comprehension', fa: 'ساخت لیست', desc: 'ساخت لیست با یه خط. مثل [x*2 for x in range(5)]' },
    { term: 'Exception', fa: 'خطا', desc: 'خطایی که هنگام اجرای کد رخ میده' },
    { term: 'SyntaxError', fa: 'خطای نگارشی', desc: 'اشتباه در نوشتن کد (مثل فراموشی : بعد از if)' },
    { term: 'IndexError', fa: 'خطای ایندکس', desc: 'دسترسی به ایندکسی که وجود نداره' },
    { term: 'Module', fa: 'ماژول', desc: 'فایل پایتونی که توابع و کلاس‌ها داره' },
    { term: 'Package', fa: 'پکیج', desc: 'پوشه‌ای که ماژول‌های مرتبط داره' },
    { term: 'Recursion', fa: 'بازگشت', desc: 'فراخوانی تابع توسط خودش' },
];

// باز کردن مودال واژه‌نامه
function openGlossary() {
    const modal = document.getElementById('glossary-modal');
    const body = document.getElementById('glossary-body');
    if (!modal || !body) return;
    renderGlossaryList(GLOSSARY_DATA);
    modal.classList.remove('hidden');
}

// بستن مودال واژه‌نامه
function closeGlossary() {
    const modal = document.getElementById('glossary-modal');
    if (modal) modal.classList.add('hidden');
}

// رندر لیست واژه‌نامه
function renderGlossaryList(items) {
    const body = document.getElementById('glossary-body');
    if (!body) return;
    
    if (items.length === 0) {
        body.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">چیزی پیدا نشد 🔍</p>';
        return;
    }
    
    body.innerHTML = items.map(item => `
        <div class="glossary-item">
            <div class="glossary-term">${escapeHtml(item.term)}</div>
            <div class="glossary-desc"><strong>${escapeHtml(item.fa)}</strong> — ${escapeHtml(item.desc)}</div>
        </div>
    `).join('');
}

// فیلتر واژه‌نامه
function filterGlossary(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        renderGlossaryList(GLOSSARY_DATA);
        return;
    }
    const filtered = GLOSSARY_DATA.filter(item =>
        item.term.toLowerCase().includes(q) ||
        item.fa.includes(q) ||
        item.desc.includes(q)
    );
    renderGlossaryList(filtered);
}

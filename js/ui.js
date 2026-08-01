/* ============================================
   🐍 پایتون‌باز — رابط کاربری
   ============================================ */

// ============================================
// رندر صفحه فصل‌ها
// ============================================
function renderChaptersGrid() {
    const container = document.getElementById('chapters-grid');
    const progress = getProgress();
    let html = '';
    
    // اطلاعات فصل‌ها
    const chaptersInfo = [
        { num: 1, title: 'فصل ۱: متغیرها', desc: 'متغیرها، انواع داده و print', level: 'beginner' },
        { num: 2, title: 'فصل ۲: عملگرها', desc: 'عملگرهای ریاضی، مقایسه و منطقی', level: 'beginner' },
        { num: 3, title: 'فصل ۳: شرط‌ها', desc: 'if, else, elif و شرط‌ها', level: 'intermediate' },
        { num: 4, title: 'فصل ۴: حلقه‌ها', desc: 'for, while, range و break', level: 'intermediate' },
        { num: 5, title: 'فصل ۵: توابع', desc: 'def, return, پارامترها', level: 'advanced' },
        { num: 6, title: 'فصل ۶: لیست‌ها', desc: 'ایجاد، دسترسی، متدهای لیست', level: 'advanced' },
        { num: 7, title: 'فصل ۷: دیکشنری', desc: 'کلید-مقدار، متدهای دیکشنری', level: 'advanced' },
        { num: 8, title: 'فصل ۸: متدهای رشته', desc: 'split, join, replace و...', level: 'advanced' },
        { num: 9, title: 'فصل ۹: مدیریت فایل', desc: 'خواندن و نوشتن فایل', level: 'advanced' },
        { num: 10, title: 'فصل ۱۰: مدیریت خطا', desc: 'try, except, raise', level: 'advanced' }
    ];
    
    chaptersInfo.forEach(ch => {
        const isLocked = isChapterLocked(ch.num);
        const isCompleted = progress.completedChapters.includes(ch.num);
        const chapterProgress = getChapterProgress(ch.num);
        
        let statusIcon = '🔒';
        let cardClass = 'chapter-card';
        
        if (isCompleted) {
            statusIcon = '✅';
            cardClass += ' completed';
        } else if (isLocked) {
            cardClass += ' locked';
        } else {
            statusIcon = '▶️';
        }
        
        html += `
            <div class="${cardClass}" onclick="openChapter(${ch.num})">
                <div class="chapter-number ${ch.level}">
                    ${levelIcon(ch.level)} ${toPersianNum(ch.num)}
                </div>
                <div class="chapter-info">
                    <h3>${ch.title}</h3>
                    <p>${ch.desc}</p>
                    ${chapterProgress ? `<p style="color: var(--accent); font-size: 0.8rem;">⭐ ${toPersianNum(chapterProgress.xp)} XP</p>` : ''}
                </div>
                <div class="chapter-status">
                    ${isLocked ? '<span class="chapter-locked-icon">🔒</span>' : statusIcon}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// باز کردن فصل
// ============================================
async function openChapter(chapterNum) {
    if (isChapterLocked(chapterNum)) {
        showToast('اول فصل قبلی رو تموم کن! 🔒', 'error');
        return;
    }
    
    showLoading();
    const success = await startChapter(chapterNum);
    hideLoading();
    
    if (success) {
        // آپدیت عنوان
        document.getElementById('lesson-title').textContent = `📖 ${currentChapter.title}`;
        document.getElementById('lesson-xp').textContent = formatNumber(getTotalXP());
        
        // رندر آموزش
        renderLesson(currentChapter);
        
        // ریست دکمه‌ها
        document.getElementById('btn-to-exercises').disabled = false;
        document.getElementById('btn-to-challenges').disabled = true;
        document.getElementById('btn-complete-chapter').disabled = true;
        
        // نمایش صفحه
        showPage('page-lesson');
    }
}

// ============================================
// صفحه‌بندی
// ============================================
function showPage(pageId) {
    // مخفی کردن همه صفحات
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // نمایش صفحه مورد نظر
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // اسکرول به بالا
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // آپدیت محتوا بر اساس صفحه
        switch (pageId) {
            case 'page-home':
                updateHomePage();
                break;
            case 'page-chapters':
                renderChaptersGrid();
                document.getElementById('header-xp').textContent = formatNumber(getTotalXP());
                break;
            case 'page-exercises':
                if (currentChapter) {
                    currentExerciseIndex = 0;
                    renderExercise(currentChapter, 0);
                }
                break;
            case 'page-challenges':
                if (currentChapter) {
                    currentChallengeIndex = 0;
                    renderChallenge(currentChapter, 0);
                }
                break;
        }
    }
}

// ============================================
// آپدیت صفحه اصلی
// ============================================
function updateHomePage() {
    const welcomeBox = document.getElementById('welcome-box');
    const startBox = document.getElementById('start-box');
    
    if (hasProgress()) {
        const progress = getProgress();
        welcomeBox.classList.remove('hidden');
        startBox.classList.add('hidden');
        
        document.getElementById('display-username').textContent = progress.username;
        document.getElementById('display-chapter').textContent = toPersianNum(progress.currentChapter);
        document.getElementById('display-xp').textContent = formatNumber(progress.totalXP);
    } else {
        welcomeBox.classList.add('hidden');
        startBox.classList.remove('hidden');
    }
}

// ============================================
// نمایش نتیجه فصل
// ============================================
function showChapterResult(score, xp, accuracy) {
    document.getElementById('result-score').textContent = formatNumber(score);
    document.getElementById('result-xp').textContent = `+${formatNumber(xp)}`;
    document.getElementById('result-accuracy').textContent = `${formatNumber(accuracy)}٪`;
    
    showPage('page-result');
    showConfetti();
}

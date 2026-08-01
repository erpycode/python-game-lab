/* ============================================
   🐍 پایتون‌باز — موتور چالش‌ها
   ============================================ */

// وضعیت فعلی چالش‌ها
let currentChapter = null;
let currentExerciseIndex = 0;
let currentChallengeIndex = 0;
let chapterScore = 0;
let chapterXP = 0;
let exerciseResults = [];
let challengeResults = [];

// لود کردن فصل از JSON
async function loadChapterData(chapterNum) {
    try {
        const response = await fetch(`data/chapter_${chapterNum}.json`);
        if (!response.ok) throw new Error(`فصل ${chapterNum} پیدا نشد`);
        return await response.json();
    } catch (e) {
        console.error('خطا در لود فصل:', e);
        return null;
    }
}

// شروع فصل
async function startChapter(chapterNum) {
    currentChapter = await loadChapterData(chapterNum);
    if (!currentChapter) {
        showToast('خطا در لود فصل', 'error');
        return false;
    }
    
    currentExerciseIndex = 0;
    currentChallengeIndex = 0;
    chapterScore = 0;
    chapterXP = 0;
    exerciseResults = [];
    challengeResults = [];
    
    return true;
}

// ============================================
// رندر آموزش
// ============================================
function renderLesson(chapterData) {
    const container = document.getElementById('lesson-content');
    let html = '';
    
    // مقدمه
    html += `
        <div class="lesson-section">
            <h3>📖 ${chapterData.lesson.title}</h3>
            <div class="lesson-text">${chapterData.lesson.intro}</div>
        </div>
    `;
    
    // بخش‌های آموزشی
    chapterData.lesson.sections.forEach((section, i) => {
        html += `
            <div class="lesson-section">
                <h3>${section.icon || '📝'} ${section.title}</h3>
                <div class="lesson-text">${section.text}</div>
                ${section.code ? renderCode(section.code) : ''}
                ${section.output ? renderOutput(section.output) : ''}
            </div>
        `;
    });
    
    // نکات
    if (chapterData.lesson.tips && chapterData.lesson.tips.length > 0) {
        html += `
            <div class="tips-box">
                <h4>⚡ نکات مهم</h4>
                <ul>
                    ${chapterData.lesson.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// ============================================
// رندر تمرین‌ها
// ============================================
function renderExercise(chapterData, index) {
    if (index >= chapterData.exercises.length) return false;
    
    const exercise = chapterData.exercises[index];
    const container = document.getElementById('exercise-content');
    
    // آپدیت پیشرفت
    document.getElementById('exercise-progress').textContent = 
        `${toPersianNum(index + 1)}/${toPersianNum(chapterData.exercises.length)}`;
    
    let html = '';
    
    html += `
        <div class="challenge-card" id="exercise-${index}">
            <div class="challenge-header">
                <div class="challenge-type">
                    <span class="challenge-type-badge ${challengeBadgeClass(exercise.type)}">
                        ${challengeTypeName(exercise.type)}
                    </span>
                    <span>تمرین ${toPersianNum(index + 1)}</span>
                </div>
            </div>
            <div class="challenge-title">${exercise.title}</div>
            ${renderCode(exercise.code)}
    `;
    
    // بر اساس نوع تمرین
    switch (exercise.type) {
        case 'predict':
            html += renderPredictInput(exercise, index, 'exercise');
            break;
        case 'quiz':
            html += renderQuizOptions(exercise, index, 'exercise');
            break;
        case 'fill_gap':
            html += renderFillGap(exercise, index, 'exercise');
            break;
        default:
            html += renderPredictInput(exercise, index, 'exercise');
    }
    
    html += `
            <div class="hint-box" id="hint-exercise-${index}">💡 ${exercise.hint || ''}</div>
            <div class="result-message" id="result-exercise-${index}"></div>
        </div>
    `;
    
    container.innerHTML = html;
    return true;
}

// ============================================
// رندر چالش‌ها
// ============================================
function renderChallenge(chapterData, index) {
    if (index >= chapterData.challenges.length) return false;
    
    const challenge = chapterData.challenges[index];
    const container = document.getElementById('challenge-content');
    
    // آپدیت پیشرفت
    document.getElementById('challenge-progress').textContent = 
        `${toPersianNum(index + 1)}/${toPersianNum(chapterData.challenges.length)}`;
    
    let html = '';
    
    html += `
        <div class="challenge-card" id="challenge-${index}">
            <div class="challenge-header">
                <div class="challenge-type">
                    <span class="challenge-type-badge ${challengeBadgeClass(challenge.type)}">
                        ${challengeTypeName(challenge.type)}
                    </span>
                    <span>چالش ${toPersianNum(index + 1)}</span>
                </div>
                <span class="challenge-xp">⭐ ${toPersianNum(challenge.xp)} XP</span>
            </div>
            <div class="challenge-title">${challenge.title}</div>
            ${renderCode(challenge.code)}
    `;
    
    // بر اساس نوع چالش
    switch (challenge.type) {
        case 'predict':
            html += renderPredictInput(challenge, index, 'challenge');
            break;
        case 'bug_hunter':
            html += renderBugHunter(challenge, index);
            break;
        case 'fill_gap':
            html += renderFillGap(challenge, index, 'challenge');
            break;
        case 'quiz':
            html += renderQuizOptions(challenge, index, 'challenge');
            break;
        case 'sort':
            html += renderSortChallenge(challenge, index);
            break;
        default:
            html += renderPredictInput(challenge, index, 'challenge');
    }
    
    html += `
            <div class="challenge-actions">
                <button onclick="showHint('challenge-${index}')" class="btn btn-secondary" style="font-size: 0.85rem;">
                    💡 راهنمایی
                </button>
            </div>
            <div class="hint-box" id="hint-challenge-${index}">💡 ${challenge.hint || ''}</div>
            <div class="result-message" id="result-challenge-${index}"></div>
        </div>
    `;
    
    container.innerHTML = html;
    return true;
}

// ============================================
// رندر انواع ورودی
// ============================================

// پیش‌بینی خروجی
function renderPredictInput(item, index, prefix) {
    return `
        <div style="margin-top: 12px;">
            <input type="text" class="challenge-input" 
                   id="input-${prefix}-${index}" 
                   placeholder="خروجی رو بنویس..."
                   onkeypress="if(event.key==='Enter') checkAnswer('${prefix}', ${index})">
            <button onclick="checkAnswer('${prefix}', ${index})" class="btn btn-primary" style="width: 100%;">
                بررسی ✓
            </button>
        </div>
    `;
}

// شکارچی باگ
function renderBugHunter(challenge, index) {
    const lines = challenge.code.split('\n');
    let html = '<div style="margin-top: 12px;">';
    html += '<p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 0.9rem;">شماره خطی که خطا داره رو بنویس:</p>';
    html += '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">';
    lines.forEach((line, i) => {
        html += `
            <button class="quiz-option" id="bug-line-${index}-${i+1}" 
                    onclick="selectBugLine(${index}, ${i+1})"
                    style="font-family: 'Courier New', monospace; font-size: 0.85rem; text-align: left; direction: ltr;">
                خط ${i+1}: ${escapeHtml(line)}
            </button>
        `;
    });
    html += '</div>';
    html += `<button onclick="checkAnswer('challenge', ${index})" class="btn btn-primary" style="width: 100%;">
                بررسی ✓
             </button>`;
    html += '</div>';
    return html;
}

// جای خالی
function renderFillGap(item, index, prefix) {
    const codeWithGap = item.code.replace(/_+/g, '<span style="background: var(--accent); color: var(--bg-primary); padding: 2px 8px; border-radius: 4px; font-weight: bold;">___</span>');
    return `
        <div style="margin-top: 12px;">
            <div class="code-block"><pre>${codeWithGap}</pre></div>
            <input type="text" class="challenge-input" 
                   id="input-${prefix}-${index}" 
                   placeholder="جای خالی رو پر کن..."
                   onkeypress="if(event.key==='Enter') checkAnswer('${prefix}', ${index})">
            <button onclick="checkAnswer('${prefix}', ${index})" class="btn btn-primary" style="width: 100%;">
                بررسی ✓
            </button>
        </div>
    `;
}

// چندگزینه‌ای
function renderQuizOptions(item, index, prefix) {
    const shuffledOptions = shuffleArray(item.options);
    // ذخیره گزینه‌های مخلوط شده
    window[`quiz_options_${prefix}_${index}`] = shuffledOptions;
    
    let html = '<div class="quiz-options">';
    shuffledOptions.forEach((option, i) => {
        html += `
            <button class="quiz-option" id="quiz-${prefix}-${index}-${i}" 
                    onclick="selectQuizOption('${prefix}', ${index}, ${i})">
                ${option.label}) ${option.text}
            </button>
        `;
    });
    html += '</div>';
    html += `<button onclick="checkAnswer('${prefix}', ${index})" class="btn btn-primary" style="width: 100%;">
                بررسی ✓
             </button>`;
    return html;
}

// مرتب کردن
function renderSortChallenge(challenge, index) {
    const shuffledLines = shuffleArray(challenge.lines);
    window[`sort_lines_${index}`] = shuffledLines;
    
    let html = '<div class="sort-items" id="sort-container-' + index + '">';
    shuffledLines.forEach((line, i) => {
        html += `
            <div class="sort-item" draggable="true" data-index="${i}" 
                 ondragstart="dragStart(event, ${index}, ${i})"
                 ondragover="dragOver(event)"
                 ondrop="drop(event, ${index}, ${i})">
                <span class="drag-handle">⋮⋮</span>
                <span>${escapeHtml(line)}</span>
            </div>
        `;
    });
    html += '</div>';
    html += `<button onclick="checkAnswer('challenge', ${index})" class="btn btn-primary" style="width: 100%;">
                بررسی ✓
             </button>`;
    return html;
}

// ============================================
// بررسی پاسخ‌ها
// ============================================

let selectedBugLine = {};
let selectedQuizOption = {};

// انتخاب خط باگ
function selectBugLine(index, lineNum) {
    // حذف انتخاب قبلی
    document.querySelectorAll(`[id^="bug-line-${index}-"]`).forEach(el => {
        el.classList.remove('selected');
    });
    // انتخاب جدید
    document.getElementById(`bug-line-${index}-${lineNum}`).classList.add('selected');
    selectedBugLine[index] = lineNum;
}

// انتخاب گزینه
function selectQuizOption(prefix, index, optionIndex) {
    // حذف انتخاب قبلی
    document.querySelectorAll(`[id^="quiz-${prefix}-${index}-"]`).forEach(el => {
        el.classList.remove('selected');
    });
    // انتخاب جدید
    document.getElementById(`quiz-${prefix}-${index}-${optionIndex}`).classList.add('selected');
    if (!selectedQuizOption[prefix]) selectedQuizOption[prefix] = {};
    selectedQuizOption[prefix][index] = optionIndex;
}

// Drag & Drop
let draggedItem = null;

function dragStart(event, challengeIndex, itemIndex) {
    draggedItem = { challengeIndex, itemIndex };
    event.target.classList.add('dragging');
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event, challengeIndex, targetIndex) {
    event.preventDefault();
    const container = document.getElementById(`sort-container-${challengeIndex}`);
    const items = [...container.children];
    
    const sourceIndex = draggedItem.itemIndex;
    if (sourceIndex === targetIndex) return;
    
    // جابه‌جایی در آرایه
    const lines = window[`sort_lines_${challengeIndex}`];
    const [removed] = lines.splice(sourceIndex, 1);
    lines.splice(targetIndex, 0, removed);
    
    // رندر مجدد
    container.innerHTML = '';
    lines.forEach((line, i) => {
        const div = document.createElement('div');
        div.className = 'sort-item';
        div.draggable = true;
        div.dataset.index = i;
        div.ondragstart = (e) => dragStart(e, challengeIndex, i);
        div.ondragover = dragOver;
        div.ondrop = (e) => drop(e, challengeIndex, i);
        div.innerHTML = `<span class="drag-handle">⋮⋮</span><span>${escapeHtml(line)}</span>`;
        container.appendChild(div);
    });
    
    document.querySelectorAll('.sort-item').forEach(el => el.classList.remove('dragging'));
    draggedItem = null;
}

// بررسی پاسخ
function checkAnswer(prefix, index) {
    let isCorrect = false;
    let userAnswer = '';
    let correctAnswer = '';
    
    const data = prefix === 'exercise' ? currentChapter.exercises[index] : currentChapter.challenges[index];
    const resultEl = document.getElementById(`result-${prefix}-${index}`);
    const cardEl = document.getElementById(`${prefix}-${index}`);
    
    switch (data.type) {
        case 'predict':
        case 'fill_gap':
            const inputEl = document.getElementById(`input-${prefix}-${index}`);
            userAnswer = inputEl.value.trim();
            correctAnswer = data.answer;
            // مقایسه انعطاف‌پذیر
            isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
            break;
            
        case 'bug_hunter':
            userAnswer = selectedBugLine[index];
            correctAnswer = data.error_line;
            isCorrect = userAnswer === correctAnswer;
            break;
            
        case 'quiz':
            const selectedIdx = selectedQuizOption[prefix]?.[index];
            if (selectedIdx === undefined) {
                showToast('یه گزینه رو انتخاب کن! 🤔', 'error');
                return;
            }
            const options = window[`quiz_options_${prefix}_${index}`];
            userAnswer = options[selectedIdx].label;
            correctAnswer = data.correct;
            isCorrect = userAnswer === correctAnswer;
            break;
            
        case 'sort':
            const userLines = window[`sort_lines_${index}`];
            correctAnswer = data.correct_order;
            isCorrect = JSON.stringify(userLines) === JSON.stringify(correctAnswer);
            break;
    }
    
    // نمایش نتیجه
    if (isCorrect) {
        resultEl.className = 'result-message show success';
        resultEl.innerHTML = '🎉 آفرین! درسته!';
        cardEl.classList.add('solved');
        cardEl.classList.remove('wrong');
        
        // امتیاز
        const xp = data.xp || 10;
        if (prefix === 'challenge') {
            chapterXP += xp;
            chapterScore += xp;
        } else {
            chapterScore += 5;
        }
        
        showConfetti();
    } else {
        resultEl.className = 'result-message show error';
        resultEl.innerHTML = `❌ اشتباهه! جواب: <strong>${correctAnswer}</strong>`;
        cardEl.classList.add('wrong');
        setTimeout(() => cardEl.classList.remove('wrong'), 500);
    }
    
    // ذخیره نتیجه
    if (prefix === 'exercise') {
        exerciseResults[index] = isCorrect;
        // بررسی اتمام تمرین‌ها
        if (exerciseResults.filter(r => r === true).length >= Math.ceil(currentChapter.exercises.length * 0.5)) {
            document.getElementById('btn-to-challenges').disabled = false;
        }
    } else {
        challengeResults[index] = isCorrect;
        // بررسی اتمام چالش‌ها
        if (challengeResults.filter(r => r === true).length >= Math.ceil(currentChapter.challenges.length * 0.5)) {
            document.getElementById('btn-complete-chapter').disabled = false;
        }
    }
}

// نرمال‌سازی جواب برای مقایسه
function normalizeAnswer(answer) {
    return answer
        .toString()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/['"]/g, '')
        .toLowerCase();
}

// نمایش راهنمایی
function showHint(id) {
    const hint = document.getElementById(`hint-${id}`);
    if (hint) {
        hint.classList.toggle('visible');
    }
}

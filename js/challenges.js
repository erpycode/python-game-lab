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
            <div class="exercise-actions">
                <button onclick="showHint('exercise-${index}')" class="btn btn-secondary" style="font-size: 0.85rem;">
                    💡 راهنمایی
                </button>
                <span class="wrong-count" id="wrong-count-exercise-${index}" style="color: var(--danger); font-size: 0.85rem;"></span>
            </div>
            <div class="hint-box" id="hint-exercise-${index}">💡 ${exercise.hint || ''}</div>
            <div class="result-message" id="result-exercise-${index}"></div>
            <div id="show-answer-exercise-${index}" class="hidden"></div>
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

// جای خالی — input مستقیم توی کد
function renderFillGap(item, index, prefix) {
    let gapIndex = 0;
    // جایگزینی ___ (حداقل ۳ تا underscore) با input مستقیم
    const codeWithInputs = item.code.replace(/_{3,}/g, () => {
        const inputId = `gap-${prefix}-${index}-${gapIndex}`;
        gapIndex++;
        return `<input type="text" class="gap-input" id="${inputId}" placeholder="?" autocomplete="off" spellcheck="false">`;
    });
    
    return `
        <div style="margin-top: 12px;">
            <div class="code-block code-block-interactive"><pre>${codeWithInputs}</pre></div>
            <button onclick="checkAnswer('${prefix}', ${index})" class="btn btn-primary" style="width: 100%; margin-top: 12px;">
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
                <span style="font-weight: 700; color: var(--accent); min-width: 20px;">${option.label})</span>
                <span>${escapeHtml(option.text)}</span>
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
let wrongAttempts = {}; // شمارش اشتباهات هر تمرین/چالش
let hintLevels = {}; // سطح hint فعلی

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

// بررسی هوشمند پاسخ‌ها
function checkAnswer(prefix, index) {
    let isCorrect = false;
    let userAnswer = '';
    let correctAnswer = '';
    let smartFeedback = '';
    
    const data = prefix === 'exercise' ? currentChapter.exercises[index] : currentChapter.challenges[index];
    const resultEl = document.getElementById(`result-${prefix}-${index}`);
    const cardEl = document.getElementById(`${prefix}-${index}`);
    
    switch (data.type) {
        case 'predict':
            const predictInput = document.getElementById(`input-${prefix}-${index}`);
            userAnswer = predictInput.value.trim();
            correctAnswer = data.answer;
            isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
            if (!isCorrect && userAnswer) {
                smartFeedback = generatePredictFeedback(userAnswer, correctAnswer, data);
            }
            break;
            
        case 'fill_gap':
            const gapInputs = document.querySelectorAll(`[id^="gap-${prefix}-${index}-"]`);
            const userAnswers = [];
            gapInputs.forEach(input => userAnswers.push(input.value.trim()));
            const correctAnswers = Array.isArray(data.answer) ? data.answer : [data.answer];
            const gapResults = userAnswers.map((ans, i) => ({
                user: ans,
                correct: correctAnswers[i],
                isCorrect: normalizeAnswer(ans) === normalizeAnswer(correctAnswers[i])
            }));
            isCorrect = gapResults.every(g => g.isCorrect);
            if (!isCorrect) {
                smartFeedback = generateFillGapFeedback(gapResults);
            }
            userAnswer = userAnswers.join(', ');
            correctAnswer = correctAnswers.join(', ');
            break;
            
        case 'bug_hunter':
            userAnswer = selectedBugLine[index];
            correctAnswer = data.error_line;
            isCorrect = userAnswer === correctAnswer;
            if (!isCorrect && userAnswer) {
                smartFeedback = generateBugHunterFeedback(userAnswer, correctAnswer, data);
            }
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
            if (!isCorrect) {
                smartFeedback = generateQuizFeedback(options, selectedIdx, correctAnswer, data);
            }
            break;
            
        case 'sort':
            const userLines = window[`sort_lines_${index}`];
            correctAnswer = data.correct_order;
            isCorrect = JSON.stringify(userLines) === JSON.stringify(correctAnswer);
            if (!isCorrect) {
                smartFeedback = generateSortFeedback(userLines, correctAnswer);
            }
            break;
    }
    
    // نمایش نتیجه هوشمند
    if (isCorrect) {
        resultEl.className = 'result-message show success';
        
        // نمایش توضیح چرا درسته
        let successMsg = '🎉 آفرین! درسته!';
        if (data.explanation) {
            successMsg += `<br><div class="smart-feedback" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.2);">💡 ${data.explanation}</div>`;
        }
        resultEl.innerHTML = successMsg;
        
        cardEl.classList.add('solved');
        cardEl.classList.remove('wrong');
        
        soundManager.playCorrect();
        createParticleEffect(cardEl);
        glowElement(cardEl, '#22C55E');
        
        // امتیاز (فقط اگه قبلاً نگرفته باشه)
        const progress = getProgress();
        const isAlreadyCompleted = progress.completedChapters.includes(currentChapter.id);
        
        if (!isAlreadyCompleted) {
            const xp = data.xp || 10;
            if (prefix === 'challenge') {
                chapterXP += xp;
                chapterScore += xp;
            } else {
                chapterScore += 5;
            }
        }
        
        showConfetti();
        
        const nextBtn = createNextButton(prefix, index);
        if (nextBtn) {
            resultEl.innerHTML += '<br>' + nextBtn;
        }
    } else {
        // شمارش اشتباهات
        const key = `${prefix}-${index}`;
        if (!wrongAttempts[key]) wrongAttempts[key] = 0;
        wrongAttempts[key]++;
        
        const wrongCountEl = document.getElementById(`wrong-count-${key}`);
        if (wrongCountEl) {
            wrongCountEl.textContent = `${toPersianNum(wrongAttempts[key])} بار اشتباه`;
        }
        
        // نمایش feedback هوشمند
        let errorMsg = `❌ اشتباهه!`;
        if (smartFeedback) {
            errorMsg += `<br><div class="smart-feedback">${smartFeedback}</div>`;
        }
        errorMsg += `<br><small style="color: var(--text-muted);">${toPersianNum(4 - wrongAttempts[key])} بار دیگه مونده</small>`;
        
        resultEl.className = 'result-message show error';
        resultEl.innerHTML = errorMsg;
        
        // نمایش hint پیشرفته
        if (wrongAttempts[key] >= 2 && data.hints) {
            const hintIndex = Math.min(wrongAttempts[key] - 2, data.hints.length - 1);
            if (data.hints[hintIndex]) {
                const hintEl = document.getElementById(`hint-${key}`);
                if (hintEl) {
                    hintEl.innerHTML = `💡 ${data.hints[hintIndex]}`;
                    hintEl.classList.add('visible');
                }
            }
        }
        
        // بعد از ۴ اشتباه، نمایش جواب کامل
        if (wrongAttempts[key] >= 4) {
            const showAnswerEl = document.getElementById(`show-answer-${key}`);
            if (showAnswerEl) {
                showAnswerEl.className = '';
                showAnswerEl.innerHTML = `
                    <div class="show-answer-box">
                        <p>📝 جواب صحیح: <strong style="color: var(--accent);">${correctAnswer}</strong></p>
                        ${data.explanation ? `<p style="margin-top: 8px; color: var(--text-secondary);">💡 ${data.explanation}</p>` : ''}
                        <button onclick="skipToNext('${prefix}', ${index})" class="btn btn-primary" style="margin-top: 12px; width: 100%;">
                            ➡️ تمرین بعدی
                        </button>
                    </div>
                `;
            }
        }
        
        cardEl.classList.add('wrong');
        soundManager.playWrong();
        shakeElement(cardEl);
        setTimeout(() => cardEl.classList.remove('wrong'), 500);
    }
    
    // ذخیره نتیجه
    if (prefix === 'exercise') {
        exerciseResults[index] = isCorrect;
        if (exerciseResults.filter(r => r === true).length >= Math.ceil(currentChapter.exercises.length * 0.5)) {
            document.getElementById('btn-to-challenges').disabled = false;
        }
    } else {
        challengeResults[index] = isCorrect;
        if (challengeResults.filter(r => r === true).length >= Math.ceil(currentChapter.challenges.length * 0.5)) {
            document.getElementById('btn-complete-chapter').disabled = false;
        }
    }
}

// ============================================
// توابع تولید feedback هوشمند
// ============================================

// feedback برای predict
function generatePredictFeedback(userAns, correctAns, data) {
    const userNorm = normalizeAnswer(userAns);
    const correctNorm = normalizeAnswer(correctAns);
    
    // چک کن آیا جواب رشته هست ولی کاربر عدد نوشته
    const isCorrectString = correctAns.toString().startsWith("'") || correctAns.toString().startsWith('"');
    const isUserNumber = !isNaN(userNorm) && userNorm !== '';
    
    if (isCorrectString && isUserNumber) {
        return `⚠️ <strong>دقت کن!</strong> جواب یه <strong>رشته (string)</strong> هست نه عدد! وقتی متن‌ها رو جمع می‌کنی، عدد حساب نمیشه. مثلاً <code>'1' + '7'</code> برابر <code>'17'</code> هست (رشته)، نه <code>8</code> (عدد).`;
    }
    
    // چک کن آیا عدد اشتباه وارد کرده
    if (!isNaN(userNorm) && !isNaN(correctNorm)) {
        const diff = parseInt(userNorm) - parseInt(correctNorm);
        const absDiff = Math.abs(diff);
        
        // خیلی نزدیکه!
        if (absDiff <= 2) {
            return `🎯 <strong>خیلی نزدیکی!</strong> جوابت ${userAns} هست ولی ${correctAns} باید باشه. فقط ${absDiff} فرق داره!`;
        }
        
        if (diff > 0) {
            return `جوابت <strong>${userAns}</strong> هست ولی <strong>${correctAns}</strong> باید باشه. جوابت ${diff} تا بیشتر از حد واقعیه. دوباره حساب کن!`;
        } else {
            return `جوابت <strong>${userAns}</strong> هست ولی <strong>${correctAns}</strong> باید باشه. جوابت ${absDiff} تا کمتر از حد واقعیه. دوباره حساب کن!`;
        }
    }
    
    // چک کن آیا نوع داده اشتباهه
    if (correctNorm.startsWith('<class')) {
        return `جواب باید نوع داده باشه (مثل <strong>${correctAns}</strong>). تو نوشتی: ${userAns}`;
    }
    
    // چک کن آیا نزدیک متنی هست (typo)
    if (isSimilar(userNorm, correctNorm, 0.6)) {
        return `🔍 <strong>خیلی نزدیکی!</strong> جوابت تقریباً درسته. یه نگاه دیگه بنداز!`;
    }
    
    // feedback عمومی
    if (data.explanation) {
        return `${data.explanation}`;
    }
    return `جواب صحیح <strong>${correctAns}</strong> هست. دوباره کد رو بخون و فکر کن!`;
}

// بررسی شباهت دو رشته (Levenshtein simplified)
function isSimilar(str1, str2, threshold) {
    if (!str1 || !str2) return false;
    const len1 = str1.length;
    const len2 = str2.length;
    const maxLen = Math.max(len1, len2);
    if (maxLen === 0) return true;
    
    let matches = 0;
    const shorter = len1 < len2 ? str1 : str2;
    const longer = len1 < len2 ? str2 : str1;
    
    for (let i = 0; i < shorter.length; i++) {
        if (longer.includes(shorter[i])) matches++;
    }
    
    return (matches / maxLen) >= threshold;
}

// feedback برای fill_gap
function generateFillGapFeedback(gapResults) {
    const wrongGaps = gapResults.filter(g => !g.isCorrect);
    const correctGaps = gapResults.filter(g => g.isCorrect);
    
    let feedback = '';
    
    if (correctGaps.length > 0) {
        feedback += `<span style="color: var(--success);">✓ جای خالی ${correctGaps.length > 1 ? 'ها' : ''} درسته!</span><br>`;
    }
    
    wrongGaps.forEach((gap, i) => {
        const gapNum = gapResults.indexOf(gap) + 1;
        if (gap.user === '') {
            feedback += `<span style="color: var(--danger);">✗ جای خالی ${gapNum}: خالیه! باید <strong>${gap.correct}</strong> باشه</span><br>`;
        } else if (isSimilar(gap.user.toLowerCase(), gap.correct.toLowerCase(), 0.7)) {
            // خیلی نزدیکه (typo)
            feedback += `<span style="color: var(--warning);">🔍 جای خالی ${gapNum}: <strong>${gap.user}</strong> خیلی نزدیکه! فقط یکم اصلاح کن — جواب: <strong>${gap.correct}</strong></span><br>`;
        } else {
            feedback += `<span style="color: var(--danger);">✗ جای خالی ${gapNum}: <strong>${gap.user}</strong> نوشتی ولی <strong>${gap.correct}</strong> باید باشه</span><br>`;
        }
    });
    
    return feedback;
}

// feedback برای bug_hunter
function generateBugHunterFeedback(userLine, correctLine, data) {
    const lines = data.code.split('\n');
    const userLineContent = lines[userLine - 1] || '';
    const correctLineContent = lines[correctLine - 1] || '';
    const distance = Math.abs(userLine - correctLine);
    
    let feedback = '';
    
    // نزدیک بودی!
    if (distance === 1) {
        feedback = `🎯 <strong>خیلی نزدیکی!</strong> خط ${userLine} درسته، ولی خط <strong>${correctLine}</strong> خطا داره:<br>`;
    } else if (distance <= 2) {
        feedback = `📍 <strong>نزدیک بودی!</strong> خط ${userLine} (<code>${escapeHtml(userLineContent.trim())}</code>) درسته.<br>`;
        feedback += `خط خطا <strong>خط ${correctLine}</strong> هست: <code>${escapeHtml(correctLineContent.trim())}</code><br>`;
    } else {
        feedback = `خط ${userLine} (<code>${escapeHtml(userLineContent.trim())}</code>) درسته.<br>`;
        feedback += `خط خطا <strong>خط ${correctLine}</strong> هست: <code>${escapeHtml(correctLineContent.trim())}</code><br>`;
    }
    
    if (data.hint) {
        feedback += `<span style="color: var(--warning);">💡 ${data.hint}</span>`;
    }
    
    return feedback;
}

// feedback برای quiz
function generateQuizFeedback(options, selectedIdx, correctLabel, data) {
    const selectedOption = options[selectedIdx];
    const correctOption = options.find(o => o.label === correctLabel);
    
    let feedback = '';
    
    // چک کن آیا گزینه‌ش نزدیکه
    if (isSimilar(selectedOption.text.toLowerCase(), correctOption.text.toLowerCase(), 0.6)) {
        feedback = `🎯 <strong>خیلی نزدیکی!</strong> گزینه <strong>${selectedOption.label}) ${selectedOption.text}</strong> تقریباً درسته.<br>`;
        feedback += `ولی جواب دقیق <strong>${correctOption.label}) ${correctOption.text}</strong> هست.<br>`;
    } else {
        feedback = `گزینه <strong>${selectedOption.label}) ${selectedOption.text}</strong> اشتباهه.<br>`;
        feedback += `جواب درست <strong>${correctOption.label}) ${correctOption.text}</strong> هست.<br>`;
    }
    
    if (data.explanation) {
        feedback += `<span style="color: var(--warning);">💡 ${data.explanation}</span>`;
    }
    
    return feedback;
}

// feedback برای sort
function generateSortFeedback(userLines, correctLines) {
    const wrongPositions = [];
    userLines.forEach((line, i) => {
        if (line !== correctLines[i]) {
            wrongPositions.push(i + 1);
        }
    });
    
    let feedback = '';
    
    if (wrongPositions.length <= 2) {
        feedback += `🎯 <strong>خیلی نزدیکی!</strong> فقط ${wrongPositions.length} خط جابه‌جا هست.<br>`;
    } else {
        feedback += `${wrongPositions.length} خط جابه‌جا هست.<br>`;
    }
    
    feedback += `ترتیب صحیح:<br>`;
    correctLines.forEach((line, i) => {
        const isWrong = line !== userLines[i];
        feedback += `<span style="color: ${isWrong ? 'var(--danger)' : 'var(--success)'};">${i + 1}. ${escapeHtml(line)}</span><br>`;
    });
    
    return feedback;
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

// نمایش جواب و رفتن به بعدی
function skipToNext(prefix, index) {
    soundManager.playClick();
    const items = prefix === 'exercise' ? currentChapter.exercises : currentChapter.challenges;
    const nextIndex = index + 1;
    
    if (nextIndex < items.length) {
        goToNext(prefix, nextIndex);
    } else {
        if (prefix === 'exercise') {
            showPage('page-challenges');
        } else {
            completeChapter();
        }
    }
}

// ============================================
// دکمه تمرین/چالش بعدی
// ============================================
function createNextButton(prefix, currentIndex) {
    const items = prefix === 'exercise' ? currentChapter.exercises : currentChapter.challenges;
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < items.length) {
        const label = prefix === 'exercise' ? 'تمرین بعدی' : 'چالش بعدی';
        return `<button onclick="goToNext('${prefix}', ${nextIndex})" class="btn btn-primary" style="margin-top: 12px; width: 100%;">
            ➡️ ${label}
        </button>`;
    } else {
        // آخرین آیتم بود
        if (prefix === 'exercise') {
            return `<button onclick="showPage('page-challenges')" class="btn btn-success" style="margin-top: 12px; width: 100%;">
                ⚡ رفتن به چالش‌ها
            </button>`;
        } else {
            return `<button onclick="completeChapter()" class="btn btn-success" style="margin-top: 12px; width: 100%;">
                🏆 فصل تموم شد!
            </button>`;
        }
    }
}

// رفتن به تمرین/چالش بعدی
function goToNext(prefix, nextIndex) {
    soundManager.playClick();
    
    // ریست شمارش اشتباهات
    const prevKey = `${prefix}-${nextIndex - 1}`;
    delete wrongAttempts[prevKey];
    delete hintLevels[prevKey];
    
    if (prefix === 'exercise') {
        currentExerciseIndex = nextIndex;
        renderExercise(currentChapter, nextIndex);
    } else {
        currentChallengeIndex = nextIndex;
        renderChallenge(currentChapter, nextIndex);
    }
    
    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

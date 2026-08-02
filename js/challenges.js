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
            <div class="lesson-text">${escapeHtml(chapterData.lesson.intro).replace(/\n/g, '<br>')}</div>
        </div>
    `;
    
    // بخش‌های آموزشی
    chapterData.lesson.sections.forEach((section, i) => {
        // تبدیل \n به <br> برای نمایش درست
        const textWithBreaks = escapeHtml(section.text || '').replace(/\n/g, '<br>');
        
        html += `
            <div class="lesson-section">
                <h3>${section.icon || '📝'} ${section.title}</h3>
                <div class="lesson-text">${textWithBreaks}</div>
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
    
    // پروژه عملی
    if (chapterData.project) {
        const projectId = `project-${chapterData.id}`;
        html += `
            <div class="project-box">
                <h4>🚀 پروژه عملی: ${chapterData.project.title}</h4>
                <p>${chapterData.project.description}</p>
                <span class="project-difficulty">${chapterData.project.difficulty === 'easy' ? '🟢 آسان' : chapterData.project.difficulty === 'medium' ? '🟡 متوسط' : '🔴 سخت'}</span>
                
                <div class="project-editor">
                    <p style="margin-top: 16px; margin-bottom: 8px; color: var(--text-secondary);">📝 کدت رو اینجا بنویس و بررسی کن:</p>
                    <textarea id="${projectId}" class="project-textarea" placeholder="# کدت رو اینجا بنویس..." rows="6" dir="ltr" style="font-family: 'Courier New', monospace; width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e0e0e0; resize: vertical;"></textarea>
                    <button onclick="checkProjectCode('${chapterData.id}')" class="btn btn-primary" style="margin-top: 10px; width: 100%;">
                        ✓ بررسی کد
                    </button>
                    <div id="project-result-${chapterData.id}" style="margin-top: 10px;"></div>
                </div>
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
                <span class="timer-badge" id="challenge-timer"></span>
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
    const escapedCode = escapeHtml(item.code);
    const codeWithInputs = escapedCode.replace(/_{3,}/g, () => {
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
        
        // پاک کردن شمارش اشتباهات
        const correctKey = `${prefix}-${index}`;
        delete wrongAttempts[correctKey];
        delete hintLevels[correctKey];
        
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
        const isAlreadyCompleted = progress.completedChapters.includes(parseInt(currentChapter.id, 10));
        
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
        // چک دستاورد‌ها
        if (typeof checkAchievements === 'function') checkAchievements();

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

// ============================================
// توابع پروژه عملی
// ============================================

// بررسی هوشمند کد پروژه
function checkProjectCode(chapterId) {
    const textarea = document.getElementById(`project-${chapterId}`);
    const resultEl = document.getElementById(`project-result-${chapterId}`);
    
    if (!textarea || !resultEl) return;
    
    const code = textarea.value.trim();
    if (!code) {
        resultEl.innerHTML = '<div style="padding: 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; color: #ef4444;">❌ اول کدت رو بنویس!</div>';
        return;
    }
    
    // قوانین هر فصل
    const rules = getProjectRules(chapterId);
    let feedback = [];
    let score = 0;
    let maxScore = 0;
    
    rules.forEach(rule => {
        maxScore += rule.points;
        const passed = rule.check(code);
        if (passed) {
            feedback.push({ type: 'success', text: rule.success });
            score += rule.points;
        } else {
            feedback.push({ type: 'hint', text: rule.hint });
        }
    });
    
    // بررسی خطاهای رایج
    const errors = findCommonErrors(code, chapterId);
    errors.forEach(err => {
        feedback.push({ type: 'error', text: err });
    });
    
    // بررسی طول کد
    const lines = code.split('\n').filter(l => l.trim()).length;
    if (lines >= 5) {
        feedback.push({ type: 'success', text: `✅ ${lines} خط کد نوشتی — آفرین!` });
        score += 2;
        maxScore += 2;
    }
    
    // نمایش نتیجه
    const percentage = Math.round((score / maxScore) * 100);
    let resultHtml = '<div style="padding: 16px; border-radius: 8px; margin-top: 10px;';
    
    if (percentage >= 80) {
        resultHtml += 'background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2);">';
        resultHtml += '<strong style="color: #22c55e;">🏆 آفرین! کد عالی‌ای نوشتی!</strong><br><br>';
    } else if (percentage >= 50) {
        resultHtml += 'background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2);">';
        resultHtml += '<strong style="color: #f59e0b;">👍 خوبه! ولی میتونی بهترش کنی!</strong><br><br>';
    } else {
        resultHtml += 'background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2);">';
        resultHtml += '<strong style="color: #3b82f6;">🚀 شروع خوبیه! ادامه بده!</strong><br><br>';
    }
    
    feedback.forEach(f => {
        const icon = f.type === 'success' ? '' : f.type === 'error' ? '❌ ' : '💡 ';
        const color = f.type === 'success' ? '#22c55e' : f.type === 'error' ? '#ef4444' : '#f59e0b';
        resultHtml += `<span style="color: ${color};">${icon}${f.text}</span><br>`;
    });
    
    resultHtml += `<br><span style="color: var(--text-muted); font-size: 0.85rem;">امتیاز: ${score} از ${maxScore} (${percentage}%)</span>`;
    resultHtml += '</div>';
    
    resultEl.innerHTML = resultHtml;
    
    // ذخیره پیشرفت
    const progress = getProgress();
    if (!progress.projectScores) progress.projectScores = {};
    progress.projectScores[chapterId] = Math.max(progress.projectScores[chapterId] || 0, score);
    saveProgress(progress);
}

// قوانین پروژه هر فصل
function getProjectRules(chapterId) {
    const rules = {
        // فصل ۱: متغیرها
        '1': [
            { check: c => /=/.test(c) && !/==/.test(c), success: '✅ متغیر تعریف کردی', hint: '💡 متغیر با = تعریف میشه', points: 2 },
            { check: c => /print/.test(c), success: '✅ از print استفاده کردی', hint: '💡 با print میتونی مقدار متغیر رو نشون بدی', points: 2 },
            { check: c => /['"].*['"]/.test(c), success: '✅ رشته تعریف کردی', hint: '💡 از علامت نقل قول برای رشته استفاده کن', points: 2 },
            { check: c => /\d+/.test(c), success: '✅ عدد استفاده کردی', hint: '💡 عدد بذار تا با متغیر ترکیب کنی', points: 2 }
        ],
        // فصل ۲: عملگرها
        '2': [
            { check: c => /[+\-*/]/.test(c), success: '✅ عملگر ریاضی استفاده کردی', hint: '💡 از + - * / استفاده کن', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی چاپ کردی', hint: '💡 با print نتیجه رو نشون بده', points: 2 },
            { check: c => /\d+\s*[+\-*/]\s*\d+/.test(c), success: '✅ محاسبه انجام دادی', hint: '💡 دو عدد رو با عملگر ترکیب کن', points: 3 },
            { check: c => /==|!=|>=|<=|>|</.test(c), success: '✅ عملگر مقایسه استفاده کردی', hint: '💡 از == یا > یا < استفاده کن', points: 2 }
        ],
        // فصل ۳: شرط‌ها
        '3': [
            { check: c => /if\s/.test(c), success: '✅ شرط تعریف کردی', hint: '💡 با if شرط بذار', points: 3 },
            { check: c => /:/.test(c), success: '✅ دو نقطه گذاشتی', hint: '💡 بعد از if باید : بذاری', points: 1 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 با print نتیجه رو نشون بده', points: 2 },
            { check: c => /else|elif/.test(c), success: '✅ else/elif استفاده کردی', hint: '💡 با else حالت دیگه رو هم پوشش بده', points: 2 }
        ],
        // فصل ۴: حلقه‌ها
        '4': [
            { check: c => /for\s/.test(c), success: '✅ حلقه for تعریف کردی', hint: '💡 با for حلقه بزن', points: 3 },
            { check: c => /range/.test(c), success: '✅ از range استفاده کردی', hint: '💡 range تعداد تکرار رو مشخص میکنه', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 با print نتیجه رو چاپ کن', points: 2 },
            { check: c => /while/.test(c), success: '✅ حلقه while هم داری', hint: '💡 while برای تکرار شرطی خوبه', points: 2 }
        ],
        // فصل ۵: توابع
        '5': [
            { check: c => /def\s/.test(c), success: '✅ تابع تعریف کردی', hint: '💡 با def تابع بساز', points: 3 },
            { check: c => /def\s+\w+\(.*\)/.test(c), success: '✅ پارامتر داری', hint: '💡 تابع باید پارامتر بگیره', points: 2 },
            { check: c => /return/.test(c), success: '✅ return داری', hint: '💡 با return مقدار برگردون', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی چاپ کردی', hint: '💡 نتیجه تابع رو print کن', points: 2 }
        ],
        // فصل ۶: لیست‌ها
        '6': [
            { check: c => /\[.*\]/.test(c), success: '✅ لیست تعریف کردی', hint: '💡 لیست با [ ] ساخته میشه', points: 3 },
            { check: c => /\.append/.test(c), success: '✅ append استفاده کردی', hint: '💡 با append آیتم اضافه کن', points: 2 },
            { check: c => /for\s.*\s+in\s+/.test(c), success: '✅ روی لیست حلقه زدی', hint: '💡 با for روی لیست حلقه بزن', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 لیست رو print کن', points: 2 }
        ],
        // فصل ۷: دیکشنری
        '7': [
            { check: c => /\{.*:.*\}/.test(c), success: '✅ دیکشنری تعریف کردی', hint: '💡 دیکشنری با { } ساخته میشه', points: 3 },
            { check: c => /\[.+\]/.test(c) && /['"].+['"]/.test(c), success: '✅ به دیکشنری دسترسی پیدا کردی', hint: '💡 با [key] مقدار بگیر', points: 2 },
            { check: c => /\.keys|\.values|\.items/.test(c), success: '✅ متود دیکشنری استفاده کردی', hint: '💡 .keys() یا .values() خوبه', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۸: متدهای رشته
        '8': [
            { check: c => /\.upper|\.lower|\.strip/.test(c), success: '✅ متود رشته استفاده کردی', hint: '💡 .upper() یا .lower() یا .strip()', points: 3 },
            { check: c => /\.split|\.join/.test(c), success: '✅ split/join استفاده کردی', hint: '💡 .split() رشته رو جدا میکنه', points: 2 },
            { check: c => /\.replace/.test(c), success: '✅ replace استفاده کردی', hint: '💡 .replace() جایگزینی میکنه', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۹: مدیریت فایل
        '9': [
            { check: c => /open\(/.test(c), success: '✅ فایل باز کردی', hint: '💡 با open() فایل رو باز کن', points: 3 },
            { check: c => /['"]w['"]|['"]r['"]|['"]a['"]/.test(c), success: '✅ مود فایل مشخص کردی', hint: "💡 r برای خواندن، w برای نوشتن", points: 2 },
            { check: c => /\.read|\.write|\.close/.test(c), success: '✅ عملیات فایل انجام دادی', hint: '💡 .read() یا .write() استفاده کن', points: 2 },
            { check: c => /with/.test(c), success: '✅ از with استفاده کردی', hint: '💡 with خودکار فایل رو میبنده', points: 2 }
        ],
        // فصل ۱۰: مدیریت خطا
        '10': [
            { check: c => /try/.test(c), success: '✅ try داری', hint: '💡 با try شروع کن', points: 3 },
            { check: c => /except/.test(c), success: '✅ except داری', hint: '💡 except خطا رو میگیره', points: 3 },
            { check: c => /ValueError|TypeError|NameError|FileNotFoundError/.test(c), success: '✅ نوع خطا مشخص کردی', hint: '💡 نوع خطا رو مشخص کن', points: 2 },
            { check: c => /print/.test(c), success: '✅ پیام خطا چاپ کردی', hint: '💡 پیام خطا رو print کن', points: 2 }
        ],
        // فصل ۱۱: OOP
        '11': [
            { check: c => /class\s/.test(c), success: '✅ کلاس تعریف کردی', hint: '💡 با class کلاس بساز', points: 3 },
            { check: c => /def\s+__init__/.test(c), success: '✅ سازنده داری', hint: '💡 __init__ سازنده کلاسه', points: 2 },
            { check: c => /self\./.test(c), success: '✅ از self استفاده کردی', hint: '💡 self به خود آبجکت اشاره میکنه', points: 2 },
            { check: c => /=\s*\w+\(/.test(c), success: '✅ آبجکت ساختی', hint: '💡 از کلاس آبجکت بساز', points: 2 }
        ],
        // فصل ۱۲: جنریتورها
        '12': [
            { check: c => /def\s/.test(c), success: '✅ تابع تعریف کردی', hint: '💡 جنریتور یه تابعه', points: 2 },
            { check: c => /yield/.test(c), success: '✅ yield استفاده کردی', hint: '💡 yield جنریتور رو مخصوص میکنه', points: 4 },
            { check: c => /for.*in/.test(c), success: '✅ روی جنریتور حلقه زدی', hint: '💡 با for مقادیر رو بگیر', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۱۳: دکوراتورها
        '13': [
            { check: c => /def\s/.test(c), success: '✅ تابع تعریف کردی', hint: '💡 دکوراتور یه تابعه', points: 2 },
            { check: c => /@/.test(c), success: '✅ دکوراتور استفاده کردی', hint: '💡 با @ قبل تابع استفاده کن', points: 3 },
            { check: c => /def\s+wrapper/.test(c), success: '✅ wrapper داری', hint: '💡 wrapper تابع داخلیه', points: 2 },
            { check: c => /return/.test(c), success: '✅ return داری', hint: '💡 wrapper رو برگردون', points: 2 }
        ],
        // فصل ۱۴: ماژول‌ها
        '14': [
            { check: c => /import/.test(c), success: '✅ ماژول import کردی', hint: '💡 با import ماژول بیار', points: 3 },
            { check: c => /from\s+\w+\s+import/.test(c), success: '✅ from...import استفاده کردی', hint: '💡 from X import Y خاص‌تره', points: 2 },
            { check: c => /random|datetime|os|json/.test(c), success: '✅ ماژول معروف استفاده کردی', hint: '💡 random یا datetime یا os', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۱۵: Regex
        '15': [
            { check: c => /import\s+re/.test(c), success: '✅ re رو import کردی', hint: '💡 import re لازمه', points: 3 },
            { check: c => /re\.search|re\.match|re\.findall/.test(c), success: '✅ تابع regex استفاده کردی', hint: '💡 re.search() یا re.findall()', points: 3 },
            { check: c => /['"]/.test(c) && /\./.test(c), success: '✅ الگو نوشتی', hint: '💡 الگو با نقطه و ...', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۱۶: فریم‌ورک‌ها
        '16': [
            { check: c => /from\s+flask|from\s+django|import\s+flask/.test(c), success: '✅ فریم‌ورک import کردی', hint: '💡 Flask یا Django', points: 3 },
            { check: c => /app\s*=|@app\.route/.test(c), success: '✅ اپلیکیشن ساختی', hint: '💡 app = Flask(__name__)', points: 3 },
            { check: c => /def\s+\w+\(/.test(c), success: '✅ تابع مسیر داری', hint: '💡 تابع برای هر صفحه', points: 2 },
            { check: c => /return/.test(c), success: '✅ return داری', hint: '💡 محتوا رو برگردون', points: 2 }
        ],
        // فصل ۱۷: پایتون در عمل
        '17': [
            { check: c => /import|from/.test(c), success: '✅ کتابخونه import کردی', hint: '💡 requests یا beautifulsoup', points: 2 },
            { check: c => /requests\.get|BeautifulSoup/.test(c), success: '✅ درخواست وب دادی', hint: '💡 requests.get() یا BeautifulSoup()', points: 3 },
            { check: c => /\.json\(\)|\.text/.test(c), success: '✅ پاسخ رو خوندی', hint: '💡 .json() یا .text', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۱۸: Lambda
        '18': [
            { check: c => /lambda/.test(c), success: '✅ lambda استفاده کردی', hint: '💡 lambda x: x * 2', points: 4 },
            { check: c => /map|filter|sorted/.test(c), success: '✅ با map/filter/sorted ترکیب کردی', hint: '💡 lambda با map یا filter خوبه', points: 3 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۱۹: List Comprehension
        '19': [
            { check: c => /\[.*for.*in/.test(c), success: '✅ list comprehension نوشتی', hint: '💡 [x for x in range()]', points: 4 },
            { check: c => /if/.test(c) && /\[.*for/.test(c), success: '✅ فیلتر هم داری', hint: '💡 [x for x in ... if ...]', points: 3 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 لیست رو print کن', points: 2 }
        ],
        // فصل ۲۰: محیط مجازی
        '20': [
            { check: c => /venv|virtualenv|pip\s+install/.test(c), success: '✅ محیط مجازی ساختی', hint: '💡 python -m venv myenv', points: 3 },
            { check: c => /activate|deactivate/.test(c), success: '✅ activate کردی', hint: '💡 source myenv/bin/activate', points: 2 },
            { check: c => /requirements/.test(c), success: '✅ requirements.txt داری', hint: '💡 pip freeze > requirements.txt', points: 3 },
            { check: c => /pip/.test(c), success: '✅ pip استفاده کردی', hint: '💡 pip install package_name', points: 2 }
        ],
        // فصل ۲۱: SQLite
        '21': [
            { check: c => /import\s+sqlite3/.test(c), success: '✅ sqlite3 رو import کردی', hint: '💡 import sqlite3 لازمه', points: 3 },
            { check: c => /connect/.test(c), success: '✅ اتصال برقرار کردی', hint: '💡 sqlite3.connect()', points: 2 },
            { check: c => /CREATE\s+TABLE/.test(c), success: '✅ جدول ساختی', hint: '💡 CREATE TABLE', points: 2 },
            { check: c => /INSERT|SELECT/.test(c), success: '✅ داده خوندی/نوشتی', hint: '💡 INSERT INTO یا SELECT', points: 2 }
        ],
        // فصل ۲۲: API
        '22': [
            { check: c => /import\s+requests/.test(c), success: '✅ requests رو import کردی', hint: '💡 import requests', points: 3 },
            { check: c => /requests\.get/.test(c), success: '✅ GET درخواست دادی', hint: '💡 requests.get(url)', points: 3 },
            { check: c => /\.json\(\)/.test(c), success: '✅ JSON خوندی', hint: '💡 .json() تبدیل به دیکشنری', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 نتیجه رو print کن', points: 2 }
        ],
        // فصل ۲۳: Testing
        '23': [
            { check: c => /def\s+test_/.test(c), success: '✅ تابع تست نوشتی', hint: '💡 نام باید test_ شروع بشه', points: 3 },
            { check: c => /assert/.test(c), success: '✅ assert استفاده کردی', hint: '💡 assert نتیجه رو بررسی میکنه', points: 3 },
            { check: c => /==/.test(c), success: '✅ مقایسه کردی', hint: '💡 assert x == expected', points: 2 },
            { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 پیام موفقیت چاپ کن', points: 2 }
        ]
    };
    
    return rules[chapterId] || [
        { check: c => c.length > 20, success: '✅ کد کافی نوشتی', hint: '💡 بیشتر بنویس!', points: 3 },
        { check: c => /print/.test(c), success: '✅ خروجی داری', hint: '💡 print بذار', points: 2 },
        { check: c => /=/.test(c), success: '✅ متغیر داری', hint: '💡 متغیر تعریف کن', points: 2 }
    ];
}

// پیدا کردن خطاهای رایج
function findCommonErrors(code, chapterId) {
    let errors = [];
    
    // بررسی : بعد از if/for/while/def
    const lines = code.split('\n');
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (/^(if|elif|else|for|while|def|class)\s/.test(trimmed) && !trimmed.endsWith(':') && !trimmed.endsWith(':\\')) {
            errors.push(`خط ${i+1}: بعد از "${trimmed.split(' ')[0]}" باید : بذاری`);
        }
    });
    
    // بررسی print بدون پرانتز
    if (/print\s+['"]/.test(code) || /print\s+\w+/.test(code)) {
        if (!/print\(/.test(code)) {
            errors.push('print باید پرانتز داشته باشه: print()');
        }
    }
    
    // بررسی متغیر بدون مقدار
    if (/^\s*\w+\s*$/.test(code) && !/^(if|for|while|def|class|return|print)/.test(code.trim())) {
        errors.push('به نظر میاد یه خط فقط اسم متغیره بدون مقدار');
    }
    
    return errors;
}

// اجرای کد پروژه (شبیه‌سازی ساده)
function runProjectCode(chapterId) {
    const codeEl = document.getElementById(`project-${chapterId}`);
    const outputEl = document.getElementById(`project-result-${chapterId}`);
    
    if (!codeEl || !outputEl) return;
    
    const code = codeEl.value.trim();
    if (!code) {
        outputEl.className = 'project-output show error';
        outputEl.innerHTML = '❌ اول کدت رو بنویس!';
        return;
    }
    
    // شبیه‌سازی اجرای کد
    outputEl.className = 'project-output show success';
    
    // بررسی ساده کد
    let output = '';
    let hasError = false;
    
    // چک کردن syntax ساده
    if (code.includes('def ') && !code.includes(':')) {
        output = '❌ خطای syntax: بعد از def باید : بذاری';
        hasError = true;
    } else if (code.includes('if ') && !code.includes(':')) {
        output = '❌ خطای syntax: بعد از if باید : بذاری';
        hasError = true;
    } else if (code.includes('for ') && !code.includes(':')) {
        output = '❌ خطای syntax: بعد از for باید : بذاری';
        hasError = true;
    } else if (code.includes('print') && !code.includes('(')) {
        output = '❌ خطای syntax: print باید پرانتز داشته باشه';
        hasError = true;
    } else {
        // شمارش خطوط کد
        const lines = code.split('\n').filter(l => l.trim());
        const printCount = (code.match(/print/g) || []).length;
        const defCount = (code.match(/def /g) || []).length;
        const ifCount = (code.match(/if /g) || []).length;
        const forCount = (code.match(/for /g) || []).length;
        
        output = `✅ کد شما بررسی شد!\n\n`;
        output += `📊 آمار:\n`;
        output += `   📝 خطوط کد: ${lines.length}\n`;
        output += `   🖨️ دستور print: ${printCount}\n`;
        output += `   🔧 توابع: ${defCount}\n`;
        output += `   🔀 شرط‌ها: ${ifCount}\n`;
        output += `   🔄 حلقه‌ها: ${forCount}\n\n`;
        
        if (lines.length < 3) {
            output += `💡 پیشنهاد: سعی کن کد بیشتری بنویسی!`;
        } else if (defCount > 0 && printCount > 0) {
            output += `🎉 عالیه! داری از توابع استفاده میکنی!`;
        } else if (ifCount > 0) {
            output += `👍 خوبه! داری شرط استفاده میکنی!`;
        } else if (forCount > 0) {
            output += `🔄 عالی! داری حلقه استفاده میکنی!`;
        } else {
            output += `💪 ادامه بده!`;
        }
    }
    
    if (hasError) {
        outputEl.className = 'project-output show error';
    }
    
    outputEl.innerHTML = `<pre>${output}</pre>`;
}

// پاک کردن کد پروژه
function clearProjectCode(chapterId) {
    const codeEl = document.getElementById(`project-${chapterId}`);
    const outputEl = document.getElementById(`project-result-${chapterId}`);
    
    if (codeEl) codeEl.value = '';
    if (outputEl) {
        outputEl.className = 'project-output hidden';
        outputEl.innerHTML = '';
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

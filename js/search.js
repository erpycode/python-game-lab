/* ============================================
   🐍 پایتون‌باز — جستجوی فصل‌ها
   ============================================ */

// جستجو در فصل‌ها
function searchChapters(query) {
    const grid = document.getElementById('chapters-grid');
    if (!grid) return;
    
    const normalizedQuery = query.trim().toLowerCase();
    const cards = grid.querySelectorAll('.chapter-card');
    
    // اگه جستجو خالی باشه، همه رو نشون بده
    if (!normalizedQuery) {
        cards.forEach(card => card.style.display = '');
        grid.querySelectorAll('.level-section').forEach(s => s.style.display = '');
        return;
    }
    
    // جستجو در کارت‌ها
    grid.querySelectorAll('.level-section').forEach(section => {
        const sectionCards = section.querySelectorAll('.chapter-card');
        let hasVisible = false;
        
        sectionCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const match = text.includes(normalizedQuery);
            card.style.display = match ? '' : 'none';
            if (match) hasVisible = true;
        });
        
        // نمایش/مخفی کردن بخش
        section.style.display = hasVisible ? '' : 'none';
        
        // اگه کارتی پیدا شد، بخش رو باز کن
        if (hasVisible) {
            const chapters = section.querySelector('.level-chapters');
            if (chapters) chapters.style.display = 'flex';
            section.classList.add('open');
            section.classList.remove('closed');
        }
    });
}

// پاک کردن جستجو
function clearSearch() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    searchChapters('');
}

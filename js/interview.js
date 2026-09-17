/* ==========================================================================
   Interview Guide JavaScript
   Navya Chiliveri — Crack Product Management Interviews
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initInterviewAccordions();
  initQuestionSearch();
  initTopicFilter();
  initExpandCollapseAll();
});

/* --------------------------------------------------------------------------
   Accordion Mechanics (Allows multiple items to remain open)
   -------------------------------------------------------------------------- */
function initInterviewAccordions() {
  const headers = document.querySelectorAll('.interview-accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const isExpanded = item.classList.contains('expanded');
      
      if (isExpanded) {
        item.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Question Search Filter
   -------------------------------------------------------------------------- */
function initQuestionSearch() {
  const searchInput = document.getElementById('interviewSearch');
  const items = document.querySelectorAll('.interview-question-item');
  const noResultsMsg = document.getElementById('noResultsMessage');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const tags = (item.getAttribute('data-tags') || '').toLowerCase();
      
      if (text.includes(query) || tags.includes(query)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   Topic Tag Filters
   -------------------------------------------------------------------------- */
function initTopicFilter() {
  const tagBtns = document.querySelectorAll('.topic-filter-btn');
  const items = document.querySelectorAll('.interview-question-item');
  const searchInput = document.getElementById('interviewSearch');

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTopic = btn.getAttribute('data-topic');

      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (searchInput) searchInput.value = '';

      let visibleCount = 0;
      items.forEach(item => {
        const itemTags = (item.getAttribute('data-tags') || '').split(',');
        if (selectedTopic === 'all' || itemTags.includes(selectedTopic)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      const noResultsMsg = document.getElementById('noResultsMessage');
      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Expand All / Collapse All
   -------------------------------------------------------------------------- */
function initExpandCollapseAll() {
  const expandAllBtn = document.getElementById('expandAllQuestions');
  const collapseAllBtn = document.getElementById('collapseAllQuestions');
  const items = document.querySelectorAll('.interview-question-item');

  expandAllBtn?.addEventListener('click', () => {
    items.forEach(item => {
      if (item.style.display !== 'none') {
        item.classList.add('expanded');
        const header = item.querySelector('.interview-accordion-header');
        header?.setAttribute('aria-expanded', 'true');
      }
    });
  });

  collapseAllBtn?.addEventListener('click', () => {
    items.forEach(item => {
      item.classList.remove('expanded');
      const header = item.querySelector('.interview-accordion-header');
      header?.setAttribute('aria-expanded', 'false');
    });
  });
}

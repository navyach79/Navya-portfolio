/* ==========================================================================
   Main JavaScript
   Navya Chiliveri — Portfolio & Product Showcase
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initWorkflowToggle();

  initCaseStudyModal();
  initClipboard();
});

/* --------------------------------------------------------------------------
   Navbar & Navigation Spy
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerClose = document.querySelector('.drawer-close');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer controls
  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Close mobile drawer when clicking a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Animated Number Counters
   -------------------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetStr = el.getAttribute('data-counter');
        
        // Handle range formats like "90-95%" or numbers like "60%"
        if (targetStr.includes('-')) {
          el.textContent = targetStr;
        } else {
          const num = parseInt(targetStr.replace(/[^0-9]/g, ''), 10);
          const suffix = targetStr.replace(/[0-9]/g, '');
          let start = 0;
          const duration = 1200;
          const stepTime = Math.abs(Math.floor(duration / (num || 1)));
          
          const timer = setInterval(() => {
            start += Math.ceil(num / 30);
            if (start >= num) {
              start = num;
              clearInterval(timer);
            }
            el.textContent = `${start}${suffix}`;
          }, Math.max(stepTime, 20));
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Interactive Traditional vs AI Workflow Visualizer
   -------------------------------------------------------------------------- */
function initWorkflowToggle() {
  const toggleBtns = document.querySelectorAll('[data-workflow-tab]');
  const workflowViews = document.querySelectorAll('[data-workflow-view]');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const viewKey = btn.getAttribute('data-workflow-tab');
      
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      workflowViews.forEach(view => {
        if (view.getAttribute('data-workflow-view') === viewKey) {
          view.style.display = 'flex';
          view.style.animation = 'fadeIn 0.35s ease';
        } else {
          view.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Deep-Dive Case Study Modals
   -------------------------------------------------------------------------- */
const caseStudiesData = {
  'case-01': {
    number: 'Case Study 01',
    title: 'Document Management System',
    domain: 'Enterprise Technology & Agile Delivery',
    role: 'Senior Business Analyst (Requirements, Backlog & UAT Lead)',
    problem: 'Multiple global stakeholders with divergent business priorities led to scope volatility, sprint rollover, and developer friction in defining MVP scope.',
    solutionSteps: [
      'Facilitated structured requirement discovery workshops with business leads and product leadership.',
      'Decomposed ambiguous business needs into clear epics, user stories, and granular acceptance criteria in Azure DevOps.',
      'Conducted iterative wireframe and prototype walkthroughs in collaboration with UI/UX designers.',
      'Established sprint readiness checklists and rigorous UAT acceptance criteria to eliminate ambiguity prior to development.',
      'Led sprint ceremonies, defect triage meetings, and post-production release verification.'
    ],
    impact: 'Achieved 90–95% on-time sprint delivery with zero critical release rollback events.',
    takeaway: 'Strong requirement engineering and clear acceptance criteria act as the ultimate bridge between business intent and engineering execution.'
  },
  'case-02': {
    number: 'Case Study 02',
    title: 'Fleet & Workshop Management Workflow Engine',
    domain: 'Fleet, Workshop & Supply Chain Operations',
    role: 'Business Analyst — Associate Process Leader',
    problem: 'Fragmented workshop operations across job cards, technician allocation, maintenance schedules, and spare-part validation caused operational bottlenecks and lost turnaround time.',
    solutionSteps: [
      'Mapped end-to-end vehicle lifecycle: Arrival → Inspection → Job Card Generation → Technician Assignment → Parts Approval → Quality Check → Gate Pass.',
      'Drafted comprehensive BRDs, FRDs, Data Flow Diagrams (DFDs), and validation rules.',
      'Collaborated with design teams on Balsamiq/Figma interactive wireframes for workshop mobile tablets and desktop dashboards.',
      'Implemented automated approval hierarchies based on spare-part cost thresholds.',
      'Conducted UAT and end-user training for workshop supervisors and fleet managers.'
    ],
    impact: 'Standardized multi-location workshop operations and reduced turnaround delay for commercial vehicle maintenance.',
    takeaway: 'Understanding the physical reality of frontline workers (technicians & supervisors) is essential to building digital workflows they will actually use.'
  },
  'case-03': {
    number: 'Case Study 03',
    title: 'Healthcare Application & EHR Workflow Analysis',
    domain: 'Healthcare Technology & Clinical Workflows',
    role: 'Business Analyst (Healthcare & EHR Workflows)',
    problem: 'Translating complex patient encounter data, provider notes, lab orders, and role-based permissions into intuitive, compliant digital workflows.',
    solutionSteps: [
      'Researched and mapped the patient encounter continuum: Registration → Scheduling → Clinical Encounter → Documentation → Orders → Results → Billing.',
      'Defined strict role-based access control (RBAC) matrices and comprehensive audit trail requirements.',
      'Formulated clinical documentation requirements ensuring data integrity, traceability, and intuitive UI layout for practitioners.',
      'Expanded alignment with healthcare standards, interoperability considerations, and HIPAA-aware data privacy rules.',
      'Authored functional specifications and verification criteria for lab order routing and result reconciliation.'
    ],
    impact: 'Created clear, traceable functional requirements for healthcare software modules with high user clarity and compliance awareness.',
    takeaway: 'In healthcare technology, process accuracy and data traceability are not just technical features—they directly impact patient care and provider trust.'
  },
  'case-04': {
    number: 'Case Study 04',
    title: 'Marketplace Integrations & Catalog Data Optimization',
    domain: 'E-Commerce Operations & Data Systems',
    role: 'Business Analyst — Catalog Specialist',
    problem: 'High volumes of manual catalog data entry across international seller marketplaces caused high error rates and substantial operational processing latency.',
    solutionSteps: [
      'Analyzed catalog ingestion pipelines across 15 global marketplace integrations.',
      'Authored standard operating procedures (SOPs) and identified manual failure points in data consolidation.',
      'Spearheaded requirements for automated validation scripts, batch processing rules, and seller enforcement safeguards.',
      'Served as Subject Matter Expert (SME), leading UAT cycles and driving data-informed reporting for cross-regional leadership.'
    ],
    impact: 'Achieved 60% processing time reduction and a 35% reduction in data entry errors across 6 marketplace integrations.',
    takeaway: 'Process optimization powered by data validation and automated rules generates massive compound efficiency in high-scale enterprise systems.'
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('caseStudyModal');
  const modalContainer = modalBackdrop?.querySelector('.modal-container');
  const closeBtn = modalBackdrop?.querySelector('.modal-close-btn');
  const caseButtons = document.querySelectorAll('[data-case-id]');

  if (!modalBackdrop) return;

  function openCaseModal(caseId) {
    const data = caseStudiesData[caseId];
    if (!data) return;

    const modalBody = document.getElementById('caseStudyModalBody');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">${data.number}</span>
        <h2 style="font-size: var(--text-2xl); margin-bottom: 0.5rem; color: var(--color-primary-navy);">${data.title}</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: var(--text-xs); color: var(--color-text-muted); font-weight: 600;">
          <span>🌐 Domain: ${data.domain}</span>
          <span>💼 Role: ${data.role}</span>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem; background: var(--color-bg-light); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--color-primary-navy);">
        <h4 style="font-size: var(--text-sm); margin-bottom: 0.35rem; color: var(--color-primary-navy);">The Challenge</h4>
        <p style="font-size: var(--text-sm); margin-bottom: 0; color: var(--color-text-secondary);">${data.problem}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: var(--text-base); margin-bottom: 0.75rem; color: var(--color-primary-navy);">Approach & Solution</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
          ${data.solutionSteps.map(step => `
            <li style="font-size: var(--text-sm); color: var(--color-text-secondary); display: flex; gap: 0.6rem; align-items: flex-start;">
              <span style="color: var(--color-primary-teal); font-weight: 700; margin-top: 1px;">✔</span>
              <span>${step}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="background: var(--color-accent-teal-subtle); border: 1px solid var(--color-border-accent); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h4 style="font-size: var(--text-sm); color: var(--color-cta-hover); margin-bottom: 0.25rem;">Measurable Impact</h4>
        <p style="font-size: var(--text-sm); font-weight: 600; color: var(--color-primary-navy); margin-bottom: 0;">${data.impact}</p>
      </div>

      <div style="border-top: 1px solid var(--color-border); padding-top: 1rem;">
        <p style="font-size: var(--text-xs); color: var(--color-text-muted); font-style: italic; margin-bottom: 0;"><strong>Core BA Takeaway:</strong> "${data.takeaway}"</p>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  caseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute('data-case-id');
      openCaseModal(caseId);
    });
  });

  closeBtn?.addEventListener('click', closeCaseModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeCaseModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeCaseModal();
    }
  });
}

/* --------------------------------------------------------------------------
/* --------------------------------------------------------------------------
   Clipboard & Toast System
   -------------------------------------------------------------------------- */
function initClipboard() {
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast('Unable to copy text.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

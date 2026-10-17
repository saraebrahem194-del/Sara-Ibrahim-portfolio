const projects = [
  {
    id: 'TaskFlow',
    title: 'TaskFlow',
    kicker: 'Full-stack task dashboard',
    description: 'A lightweight task command center for managing daily work, with live filters, search, and a local database that keeps every change saved.',
    detail: 'I turned a basic to-do list into a full-stack dashboard where every action, adding, editing, deleting, and filtering & happens without a page reload or a single frontend framework. The interface was designed around the rhythm of daily task management rather than generic admin patterns, with clear states and keyboard-friendly flows.',
    tags: ['Vanilla JS', 'Express', 'Node.js'],
    year: '2026',
    metric: '0 deps',
    metricLabel: 'on the frontend',
    image: 'Taskflow.png',
  },
  {
    id: 'GreenOasis',
    title: 'GreenOasis',
    kicker: 'Storefront UI',
    description: 'A front-end storefront for an imaginary plant shop, built from scratch to practice responsive layout, modern UI patterns, and interactive components.',
    detail: 'I built the entire storefront with nothing but HTML, CSS, and JavaScript, no frameworks, no build step & no dependencies. The goal was to sharpen the fundamentals: a responsive grid that holds up on every screen, a clean product browsing experience, and small interactive touches that make the page feel alive rather than static.',
    link: 'https://saraebrahem194-del.github.io/Green-oasis/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    year: '2025',
    metric: '3 files',
    metricLabel: 'entire project',
    image: 'GreenOasis.png',
  },
];

const stack = [
  { name: 'HTML & CSS', note: 'structure and style' },
  { name: 'JavaScript', note: 'interactive interfaces' },
  { name: 'React', note: 'component-based UIs' },
  { name: 'SQL', note: 'structured data' },
  { name: 'Python', note: 'backend logic & automation' },
  { name: 'Git', note: 'careful shipping' },
];

const timeline = [
  { date: 'now', title: 'BSc Business Information Systems · GPA 3.8', org: 'Assiut National University', body: 'Learning to connect business needs, data, and the technical decisions behind reliable software.' },
  { date: '2025', title: 'Startup Project Development · Project Lead', org: 'Information Technology Industry Development Agency (ITIDA)', body: 'Led a team through the full software lifecycle & Agile coordination, requirements gathering, and validating the product concept.' },
  { date: '2024', title: 'Intro to Web Development', org: 'Information Technology Institute (ITI)', body: 'Hands-on with HTML, CSS, and JavaScript — building responsive, structured front-end components' },
];

const icons = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"></path>',
  close: '<path d="m18 6-12 12M6 6l12 12"></path>',
  'arrow-down': '<path d="M12 4v16m-7-7 7 7 7-7"></path>',
  'arrow-up': '<path d="M12 20V4m-7 7 7-7 7 7"></path>',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"></path>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
  globe: '<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle>',
  'chevron-right': '<path d="m9 18 6-6-6-6"></path>',
};

document.querySelectorAll('[data-icon]').forEach((element) => {
  const name = element.dataset.icon;
  if (icons[name]) {
    element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
  }
});

const filterContainer = document.querySelector('.project-filters');
const projectGrid = document.querySelector('.project-grid');
const categories = ['All', ...new Set(projects.flatMap((project) => project.tags))];
let activeFilter = 'All';
let activeProject = null;
let previouslyFocused = null;

function renderFilters() {
  filterContainer.innerHTML = categories.map((category) => `
    <button class="filter-button${activeFilter === category ? ' active' : ''}" type="button"
      aria-pressed="${activeFilter === category}" data-filter="${category}">
      ${category}
    </button>
  `).join('');
}

function renderProjects() {
  const visible = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.tags.includes(activeFilter));

  projectGrid.innerHTML = visible.map((project) => `
    <button class="project-card" type="button" data-project="${project.id}" aria-label="View details for ${project.title}">
    ${project.image ? `<span class="project-image"><img src="${project.image}" alt="${project.title}" loading="lazy" /></span>` : ''}
      <span class="project-card-top">
        <span class="project-kicker">${project.kicker}</span>
        <span class="project-arrow" aria-hidden="true"><span class="icon"><svg viewBox="0 0 24 24">${icons['arrow-up-right']}</svg></span></span>
      </span>
      <span class="project-copy">
        <span class="project-meta"><span>${project.year}</span><span class="meta-rule"></span><span>${project.tags[0]}</span></span>
        <span class="project-title">${project.title}</span>
        <span class="project-description">${project.description}</span>
        <span class="project-metric"><strong>${project.metric}</strong><span>${project.metricLabel}</span></span>
      </span>
    </button>
  `).join('');
}

function renderToolkit() {
  document.querySelector('.toolkit-grid').innerHTML = stack.map((item, index) => `
    <div class="toolkit-item">
      <div class="toolkit-number">0${index + 1}</div>
      <div class="toolkit-name">${item.name}</div>
      <div class="toolkit-note">${item.note}</div>
    </div>
  `).join('');
}

function renderTimeline() {
  document.querySelector('.timeline').innerHTML = timeline.map((item, index) => `
    <article class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div>
        <div class="timeline-meta"><span class="timeline-date">${item.date}</span><span class="timeline-org">${item.org}</span></div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-description">${item.body}</p>
      </div>
      ${index === 0 ? '<span class="in-progress">In progress</span>' : ''}
    </article>
  `).join('');
}

const modal = document.querySelector('.modal-backdrop');
const closeModalButtons = document.querySelectorAll('.modal-close, .modal-close-text');


function openProject(project, trigger) {
  activeProject = project;
  previouslyFocused = trigger;
  document.querySelector('.modal-kicker').textContent = `${project.kicker} · ${project.year}`;
  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('.modal-detail').textContent = project.detail;
  document.querySelector('.modal-tags').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  document.querySelector('.modal-metric').textContent = project.metric;
  document.querySelector('.modal-metric-label').textContent = project.metricLabel;
  const linkBtn = document.getElementById('modal-project-link');
  if (linkBtn) { linkBtn.href = project.link || '#'; linkBtn.style.display = project.link ? 'inline-block' : 'none'; }
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeProject() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  activeProject = null;
  previouslyFocused?.focus();
}

renderFilters();
renderProjects();
renderToolkit();
renderTimeline();
document.querySelector('#year').textContent = new Date().getFullYear();

if (window.location.hash) {
  const initialAnchor = document.getElementById(window.location.hash.slice(1));
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!initialAnchor) return;
      document.documentElement.style.scrollBehavior = 'auto';
      initialAnchor.scrollIntoView({ block: 'start', behavior: 'auto' });
      document.documentElement.style.removeProperty('scroll-behavior');
    });
  });
}

filterContainer.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderProjects();
});

projectGrid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-project]');
  if (!card) return;
  const project = projects.find((item) => item.id === card.dataset.project);
  if (project) openProject(project, card);
});

closeModalButtons.forEach((button) => button.addEventListener('click', closeProject));
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeProject();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeProject();
  if (event.key === 'Tab' && !modal.hidden) {
    const focusable = [...modal.querySelectorAll('button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const themeButton = document.querySelector('.theme-toggle');
function getSavedTheme() {
  try {
    return localStorage.getItem('sara-theme');
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('sara-theme', theme);
  } catch {
    // Theme switching still works for the current page when storage is unavailable.
  }
}

const savedTheme = getSavedTheme();
if (savedTheme === 'dark') document.documentElement.classList.add('dark');

function updateThemeButton() {
  const isDark = document.documentElement.classList.contains('dark');
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.innerHTML = `<span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true">${isDark ? icons.sun : icons.moon}</svg></span>`;
}

updateThemeButton();
themeButton.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  saveTheme(isDark ? 'dark' : 'light');
  updateThemeButton();
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const shouldOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(shouldOpen));
  menuButton.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
  menuButton.innerHTML = `<span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true">${shouldOpen ? icons.close : icons.menu}</svg></span>`;
  mobileNav.hidden = !shouldOpen;
});
mobileNav.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.innerHTML = `<span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons.menu}</svg></span>`;
});

const floatingTop = document.querySelector('.floating-top');
const handleScroll = () => floatingTop.classList.toggle('visible', window.scrollY > 650);
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const feedback = form.querySelector('.form-feedback');
  let error = '';

  if (!name || !email || !message) {
    error = 'Please fill in your name, email, and a short note.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error = 'That email address looks a little off. Please check it and try again.';
  }

  feedback.hidden = false;
  feedback.className = `form-feedback ${error ? 'error' : 'success'}`;
  feedback.textContent = error || '✓  Thanks — your note is ready for its next step.';
  if (!error) form.reset();
});
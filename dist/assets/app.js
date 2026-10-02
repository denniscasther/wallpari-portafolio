const state = { projects: [], query: '', sector: '', type: '' };

const $ = (selector) => document.querySelector(selector);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const unique = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b, 'es'));

function projectCard(project) {
  const visual = project.image
    ? `<img src="${project.image}" alt="Vista de ${project.name}" loading="lazy">`
    : `<div class="project-monogram" aria-hidden="true"><span>${project.name.slice(0, 2)}</span><small>${project.type}</small></div>`;
  const liveLink = project.liveUrl
    ? `<a class="card-link" href="${project.liveUrl}" target="_blank" rel="noopener" aria-label="Abrir ${project.name}">Abrir <span>↗</span></a>`
    : '';

  return `<article class="project-card accent-${project.accent}">
    <div class="project-visual">${visual}<span class="status">${project.status}</span></div>
    <div class="project-body">
      <p class="project-eyebrow">${project.eyebrow}</p>
      <h3>${project.name}</h3>
      <p class="project-summary">${project.summary}</p>
      <div class="tags">${project.technologies.slice(0, 4).map((tech) => `<span>${tech}</span>`).join('')}</div>
      <div class="project-meta"><span>${project.sector}</span><span>${project.type}</span></div>
      <div class="card-actions"><a class="card-link" href="proyecto.html?id=${project.slug}">Conocer el caso <span>→</span></a>${liveLink}</div>
    </div>
  </article>`;
}

function fillSelect(element, values) {
  values.forEach((value) => element.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`));
}

function filteredProjects() {
  const query = normalize(state.query.trim());
  return state.projects.filter((project) => {
    const haystack = normalize([project.name, project.summary, project.sector, project.type, ...project.technologies].join(' '));
    return (!query || haystack.includes(query)) && (!state.sector || project.sector === state.sector) && (!state.type || project.type === state.type);
  });
}

function render() {
  const projects = filteredProjects();
  $('#project-grid').innerHTML = projects.map(projectCard).join('');
  $('#results-label').textContent = `${projects.length} ${projects.length === 1 ? 'proyecto' : 'proyectos'}`;
  $('#empty-state').hidden = projects.length > 0;
  $('#clear-filters').hidden = !(state.query || state.sector || state.type);
}

function clearFilters() {
  state.query = state.sector = state.type = '';
  $('#search').value = $('#sector-filter').value = $('#type-filter').value = '';
  render();
}

async function init() {
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.projects = await response.json();
    const technologies = unique(state.projects.flatMap((project) => project.technologies));
    const sectors = unique(state.projects.map((project) => project.sector));
    const types = unique(state.projects.map((project) => project.type));

    $('#project-count').textContent = state.projects.length;
    $('#sector-count').textContent = sectors.length;
    $('#tech-count').textContent = technologies.length;
    fillSelect($('#sector-filter'), sectors);
    fillSelect($('#type-filter'), types);
    $('#featured-strip').innerHTML = state.projects.filter((project) => project.featured).map((project) => `<a href="${project.liveUrl}" target="_blank" rel="noopener"><span>${project.name}</span><small>${project.status}</small></a>`).join('');
    render();
  } catch (error) {
    $('#results-label').textContent = 'No se pudo cargar el catálogo';
    $('#empty-state').hidden = false;
    $('#empty-state h3').textContent = 'El catálogo no está disponible en este momento.';
  }
}

$('#search').addEventListener('input', (event) => { state.query = event.target.value; render(); });
$('#sector-filter').addEventListener('change', (event) => { state.sector = event.target.value; render(); });
$('#type-filter').addEventListener('change', (event) => { state.type = event.target.value; render(); });
$('#clear-filters').addEventListener('click', clearFilters);
$('#empty-clear').addEventListener('click', clearFilters);

init();

const state = { projects: [], query: '', sector: '' };
const $ = (selector) => document.querySelector(selector);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const unique = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b, 'es'));

function card(project, index) {
  const number = String(index + 1).padStart(3, '0');
  const visual = project.image
    ? `<img src="${project.image}" alt="Vista de ${project.name}" loading="lazy">`
    : `<div class="lettermark accent-${project.accent}"><strong>${project.name.slice(0, 2)}</strong><span>${project.type}</span></div>`;
  const live = project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener">Abrir proyecto ↗</a>` : `<span class="private-note">Caso técnico documentado</span>`;
  return `<article class="project-row">
    <div class="project-number">${number}</div>
    <div class="project-copy"><p>${project.eyebrow}</p><h2>${project.name}</h2><div class="project-description">${project.summary}</div><div class="project-links">${live}</div></div>
    <div class="project-image">${visual}<span>${project.status}</span></div>
    <div class="project-spec"><dl><div><dt>Rubro</dt><dd>${project.sector}</dd></div><div><dt>Formato</dt><dd>${project.type}</dd></div><div><dt>Stack</dt><dd>${project.technologies.slice(0, 4).join(' · ')}</dd></div></dl></div>
  </article>`;
}

function filtered() {
  const query = normalize(state.query.trim());
  return state.projects.filter((project) => {
    const content = normalize([project.name, project.summary, project.type, project.sector, ...project.technologies].join(' '));
    return (!query || content.includes(query)) && (!state.sector || project.sector === state.sector);
  });
}

function render() {
  const projects = filtered();
  $('#project-list').innerHTML = projects.map(card).join('');
  $('#result-count').textContent = `${projects.length} ${projects.length === 1 ? 'resultado' : 'resultados'}`;
  $('#empty').hidden = projects.length !== 0;
  $('#clear').hidden = !(state.query || state.sector);
  document.querySelectorAll('[data-sector]').forEach((button) => button.classList.toggle('active', button.dataset.sector === state.sector));
}

function reset() {
  state.query = state.sector = '';
  $('#search').value = '';
  render();
}

fetch('data/projects.json')
  .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
  .then((projects) => {
    state.projects = projects;
    const sectors = unique(projects.map((project) => project.sector));
    const technologies = unique(projects.flatMap((project) => project.technologies));
    $('#total').textContent = projects.length;
    $('#sectors').textContent = sectors.length;
    $('#technologies').textContent = technologies.length;
    $('#sector-filters').innerHTML = `<button class="active" data-sector="">Todos</button>${sectors.map((sector) => `<button data-sector="${sector}">${sector}</button>`).join('')}`;
    $('#sector-filters').addEventListener('click', (event) => {
      const button = event.target.closest('[data-sector]');
      if (!button) return;
      state.sector = button.dataset.sector;
      render();
    });
    render();
  })
  .catch(() => { $('#result-count').textContent = 'Archivo no disponible'; });

$('#search').addEventListener('input', (event) => { state.query = event.target.value; render(); });
$('#clear').addEventListener('click', reset);
$('#empty button').addEventListener('click', reset);

const root = document.querySelector('#case-root');
const slug = new URLSearchParams(location.search).get('id');

function renderProject(project) {
  document.title = `${project.name} · Portafolio Wallpari`;
  const visual = project.image
    ? `<img src="${project.image}" alt="Vista de ${project.name}">`
    : `<div class="case-monogram" aria-hidden="true">${project.name.slice(0, 2)}</div>`;
  const live = project.liveUrl
    ? `<a class="primary-button" href="${project.liveUrl}" target="_blank" rel="noopener">Abrir proyecto <span>↗</span></a>`
    : '';
  const message = encodeURIComponent(`Hola Wallpari, vi el caso ${project.name} y quiero conversar sobre una solución similar.`);
  root.innerHTML = `
    <a class="back-link" href="index.html#catalogo">← Volver al catálogo</a>
    <section class="case-hero">
      <div><p class="overline">${project.eyebrow}</p><h1>${project.name}</h1><p class="case-lead">${project.summary}</p><div class="case-cta">${live}<a class="secondary-button" href="https://wa.me/51923696270?text=${message}" target="_blank" rel="noopener">Solicitar algo similar</a></div></div>
      <div class="case-visual">${visual}</div>
    </section>
    <section class="case-facts"><div><span>Rubro</span><strong>${project.sector}</strong></div><div><span>Tipo</span><strong>${project.type}</strong></div><div><span>Estado</span><strong>${project.status}</strong></div><div><span>Visibilidad</span><strong>${project.public ? 'Proyecto público' : 'Caso técnico'}</strong></div></section>
    <section class="case-content"><div><p class="overline">La solución</p><h2>Una respuesta técnica ajustada al contexto.</h2><p>${project.summary} Esta ficha documenta el alcance verificable del proyecto y crecerá con capturas, resultados y decisiones técnicas confirmadas.</p></div><div><p class="overline">Tecnologías</p><h2>Stack utilizado</h2><div class="case-tech">${project.technologies.map((technology) => `<span>${technology}</span>`).join('')}</div></div></section>`;
}

fetch('data/projects.json')
  .then((response) => { if (!response.ok) throw new Error(); return response.json(); })
  .then((projects) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) throw new Error();
    renderProject(project);
  })
  .catch(() => { root.innerHTML = '<div class="case-error"><p class="overline">Proyecto no encontrado</p><h1>Esta ficha no está disponible.</h1><a class="back-link" href="index.html#catalogo">Volver al catálogo</a></div>'; });

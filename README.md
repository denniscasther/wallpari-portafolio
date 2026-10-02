# Portafolio Wallpari

Catálogo estático y escalable de productos, plataformas y proyectos de Wallpari.

## Desarrollo local

Sirve la carpeta `dist/` con cualquier servidor HTTP estático. No abras el HTML
directamente como archivo: el catálogo carga `data/projects.json` mediante `fetch`.

## Añadir proyectos

1. Agrega la ficha a `dist/data/projects.json`.
2. Guarda una captura optimizada en `dist/assets/img/projects/` cuando pueda mostrarse.
3. Completa rubro, tipo, tecnologías, estado, privacidad y enlaces verificables.
4. No publiques nombres de clientes, datos personales, credenciales ni capturas sensibles.

El catálogo y los filtros se generan automáticamente desde ese archivo.


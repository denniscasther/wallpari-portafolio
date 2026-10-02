# Portafolio Wallpari

Catálogo estático y escalable de productos, plataformas y proyectos de Wallpari. El sitio
publicado alojará dos presentaciones comparables bajo el mismo dominio:

- `/` — portada para elegir estilo.
- `/opcion-1/` — tarjetas tecnológicas inmersivas.
- `/opcion-2/` — archivo técnico editorial.

## Desarrollo local

Sirve la carpeta `dist/` con cualquier servidor HTTP estático. No abras el HTML
directamente como archivo: el catálogo carga `data/projects.json` mediante `fetch`.

## Añadir proyectos

1. Agrega la ficha al JSON canónico `dist/data/projects.json`.
2. Replica ese archivo en `dist/opcion-1/data/projects.json` y `dist/opcion-2/data/projects.json`.
3. Actualiza las copias del sitio en `dist/opcion-1/` y `dist/opcion-2/` si cambias sus fuentes.
4. Guarda capturas optimizadas en ambas carpetas de assets cuando puedan mostrarse.
5. Completa rubro, tipo, tecnologías, estado, privacidad y enlaces verificables.
6. No publiques nombres de clientes, datos personales, credenciales ni capturas sensibles.

El catálogo y los filtros se generan automáticamente desde ese archivo.

El despliegue de GitHub Pages usa `dist/` como artefacto y el dominio previsto es
`portafolio.wallpari.pe`. La opción 1 se mantiene en esta carpeta; el proyecto editable
de la opción 2 está en `../wallpari-portafolio-opcion-2/`.

## Estado para retomar

- La publicación combinada está armada localmente: portada en `/`, opciones en `/opcion-1/`
  y `/opcion-2/`, workflow de Pages y archivo `dist/CNAME`.
- Las páginas, datos, estilos y el CNAME respondieron HTTP 200 en la prueba local.
- La rama `main` aún no tiene remoto; el repositorio de GitHub todavía no se ha creado.
- La autenticación CLI guardada estaba vencida. El 2026-10-02 se inició login por dispositivo;
  complétalo en GitHub si sigue activo. No conserves el código temporal. Si caducó, vuelve a
  ejecutar `gh auth login -h github.com --git-protocol https --web`.
- `portafolio.wallpari.pe` todavía no tiene DNS. Tras activar Pages, crear en Cloudflare
  `CNAME portafolio -> denniscasther.github.io` en modo DNS only, asociar el hostname a Pages,
  y verificar certificado HTTPS y ambas rutas.

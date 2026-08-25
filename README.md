<p align="center">
  <img src="./docs/header-banner.png" alt="Notifica" />
</p>

<p align="center">
  <a href="https://notifica-kappa.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Demo%20en%20Vercel-Click%20para%20probar-blue?style=for-the-badge" alt="Demo en Vercel" />
  </a>
</p>

# Notifica

Notifica es una app PWA y Android para registrar tareas tecnicas durante la jornada laboral, pensada para uso movil, funcionamiento offline y exportacion rapida al final del tramo.

El proyecto nacio para resolver una necesidad real de trabajo: sustituir notas manuales por un registro agil, persistente y facil de compartir.

## Estado

- PWA estable: https://notifica-kappa.vercel.app/
- Android: https://play.google.com/store/apps/details?id=com.jcpaezd.notifica
- `main`: produccion
- `develop`: desarrollo y pruebas

La app ya se usa en condiciones reales. La fase actual del proyecto no busca crecer en funcionalidades de golpe, sino reforzar base tecnica, documentacion, tests y arquitectura.

## Funcionalidades

- Registro rapido de tareas por tramo.
- Edicion inline de descripcion, horas y tecnico asignado.
- Finalizacion, reapertura, eliminacion y restauracion de tareas.
- Filtros por tramo, estado y tareas pendientes de registrar.
- Notas libres por tramo.
- Exportacion y comparticion del resumen del tramo.
- Importacion/exportacion JSON.
- Persistencia local offline.
- Modo claro, oscuro y automatico.
- Ajuste para mantener la pantalla encendida mientras la app esta abierta y en primer plano.
- Interfaz responsive para movil y escritorio.
- Soporte multidioma ES/EN.
- Sistema propio de toasts con acciones como `Deshacer`.

## Capturas

<p align="center">
  <img src="./public/screenshots/13-movil-claro.png" alt="Vista movil" width="250"/>
  <img src="./public/screenshots/15-escritorio-claro.png" alt="Vista escritorio" width="450"/>
</p>

## Stack

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Capacitor](https://capacitorjs.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)

## Uso Local

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Estructura

```text
src/
  components/   Vue components
  composables/  reusable UI/state logic
  constants/    shared constants
  locales/      i18n translations
  types/        TypeScript types
  utils/        shared utilities

docs/
  dev/          active development documentation
```

La documentacion de desarrollo empieza en [docs/dev/README.md](./docs/dev/README.md).

Documentos principales:

- [Roadmap](./docs/dev/Notifica-Roadmap.md)
- [Development notes](./docs/dev/dev-notes.md)
- [Architecture notes](./docs/dev/architecture.md)
- [Maintenance guide](./docs/dev/maintenance.md)
- [Release process](./docs/dev/release-process.md)
- [i18n guide](./docs/dev/i18n.md)
- [Known issues](./docs/dev/known-issues.md)

## Android

La version Android se genera con Capacitor a partir de la misma aplicacion web.

La app se comporta como una aplicacion Android independiente:

- instalable desde Google Play
- icono y splash screen propios
- soporte offline
- persistencia local en el dispositivo

El flujo de release Android esta documentado en [docs/dev/release-process.md](./docs/dev/release-process.md).

## Sobre El Proyecto

Notifica es un proyecto personal construido como herramienta real de uso diario. Por eso prioriza flujos simples, fiabilidad offline, bajo rozamiento y compatibilidad con datos existentes.

La etapa actual de consolidacion tecnica busca convertir esa base funcional en un proyecto mas mantenible y presentable: mejor documentacion, tests, automatizaciones y separacion gradual de responsabilidades.

## Licencia

Este proyecto esta licenciado bajo la licencia MIT. Consulta [LICENSE](./LICENSE) para mas detalles.

# Notas de Desarrollo

Este documento mantiene las notas vigentes y decisiones duraderas de desarrollo de Notifica.

El documento historico completo se conserva en [archive/dev-notes-history.md](./archive/dev-notes-history.md).

## Contexto Del Proyecto

Notifica es una app Vue 3 + TypeScript + Vite con Tailwind CSS. Se distribuye como:

- PWA de produccion desplegada desde `main` en Vercel
- app Android generada con Capacitor y publicada en Google Play

`develop` es la rama activa de trabajo.

La fase actual es `v1.3.x Fortificacion Tecnica`: mejorar workflow, documentacion, tests, arquitectura y mantenimiento antes de volver a crecer en funcionalidades.

## Principios Activos

- Tratar `main` como produccion viva.
- Tratar `develop` como rama de trabajo salvo indicacion explicita.
- Preservar compatibilidad con datos existentes en localStorage y JSON importado/exportado.
- No refactorizar persistencia, fechas o exportacion sin tests o plan de validacion concreto.
- Mantener cambios UI/UX pequenos bajo validacion humana antes de cerrarlos.
- Usar `../notifica_docs` para planes privados, estrategia interna y analisis que aun no deben vivir en el repo publico.

## Workflow

La guia repo-local vive en:

- [../../AGENTS.md](../../AGENTS.md)
- [../../.agents/workflow.md](../../.agents/workflow.md)

Uso esperado de skills:

- `capture-item`: notas crudas
- `refine-item`: items capturados pero ambiguos
- `plan-version`: decisiones de roadmap y bloques de trabajo
- `design-spec`: diseno de items seleccionados
- `breakdown-feature`: division de trabajo ya disenado
- `implement-feature`: implementacion clara
- `debug-root-cause`: bugs poco claros
- `release-workflow`: releases PWA/Android

## Superficies Documentales

- [Notifica-Roadmap.md](./Notifica-Roadmap.md): roadmap activo y fase actual.
- [architecture.md](./architecture.md): arquitectura y direccion del refactor.
- [maintenance.md](./maintenance.md): checks locales y mantenimiento diario.
- [release-process.md](./release-process.md): proceso de release PWA/Android.
- [i18n.md](./i18n.md): flujo de traducciones.
- [known-issues.md](./known-issues.md): bugs conocidos y caveats de plataforma.
- [archive/](./archive/): documentacion historica.
- [working/](./working/): inventarios temporales.

## Decisiones Tecnicas Vigentes

- La persistencia local es una superficie critica de datos de usuario.
- Import/export es una superficie de compatibilidad.
- Los toasts son el mecanismo preferido para feedback no intrusivo.
- `Undo` es preferible a confirmacion bloqueante para acciones frecuentes y reversibles cuando encaja con el sistema de toasts.
- `window.confirm()` sigue siendo aceptable para acciones destructivas raras donde la interrupcion es intencional.
- Los textos i18n deben vivir en `src/locales/`, no directamente en templates.
- PWA y Android deben mantenerse alineadas salvo diferencia deliberada y documentada.

## Regla Documental Vigente

Mantener la documentacion activa corta y navegable.

Cuando un documento acumule historial, mover la narracion antigua a `archive/` y dejar en vivo solo la decision, regla o enlace vigente.

# Notas de Desarrollo

Este documento mantiene las notas vigentes y decisiones duraderas de desarrollo de Notifica.

El documento historico completo se conserva en [archive/dev-notes-history.md](./archive/dev-notes-history.md).

## Contexto Del Proyecto

Notifica es una app Vue 3 + TypeScript + Vite con Tailwind CSS. Se distribuye como:

- PWA de produccion desplegada desde `main` en Vercel
- app Android generada con Capacitor y publicada en Google Play

`develop` es la rama activa de trabajo.

La fase actual es `v1.3.x Fortificacion Tecnica`: mejorar workflow, documentacion, tests, arquitectura y mantenimiento antes de volver a crecer en funcionalidades.

## Entorno De Validacion

- Preview generica de `develop` en Vercel: [Notifica develop](https://notifica-git-develop-jcpaezds-projects.vercel.app/).
- Usar esta URL para la primera revision de cambios desplegados desde `develop`.
- No confundirla con la PWA de produccion publicada desde `main`.

## Decision De Versionado Y Alcance - 2026-08-23

- `v1.3.x` se mantiene como fase interna de fortificacion y no se publica como version de producto.
- El objetivo publico siguiente es una release coordinada PWA + Android `1.4.0`.
- El alcance confirmado de `1.4.0` incluye los cambios ya validados en `develop`, la feature `Mantener pantalla encendida` y un bloque separado de mantenimiento de dependencias/seguridad.
- Antes de congelar el alcance final se revisaran explicitamente los pendientes excluidos: fechas cerca de medianoche, barra inferior Android en tema oscuro, release notice/menu/iconos, incluida la retirada o mantenimiento del aviso de nueva version y su CTA de Play Store, deuda tecnica adicional y automatizacion de capturas Android. Ninguno entra automaticamente por esta decision.
- No se modifica todavia ningun metadato de version, `versionCode`, `main` ni Play Console. La preparacion de release verificara la coherencia de `1.4.0` y el siguiente `versionCode` antes de publicar.
- Orden de trabajo acordado: mantenimiento de dependencias, diseno e implementacion de `Mantener pantalla encendida`, validacion completa y puerta de alcance de pendientes, preparacion de release.
- El primer pase de mantenimiento de dependencias ya esta aplicado dentro de las lineas compatibles: Capacitor 7, Vite 6, PostCSS, Workbox/PWA y `npm-run-all2` 9.
- Tras el pase, `npm audit --omit=dev` queda limpio; el audit completo conserva 8 avisos transitivos de tooling (1 baja, 1 moderada y 6 altas, sin criticas), que no bloquean el grafo de produccion y quedan separados para una futura revision de herramientas.
- La implementacion de `Mantener pantalla encendida` esta actualmente en `develop`: ajuste persistente y desactivado por defecto, Screen Wake Lock validado en la PWA iPhone y `FLAG_KEEP_SCREEN_ON` validado en la APK debug del Huawei para activacion, persistencia, ciclo de segundo plano/reapertura, auto-bloqueo con el ajuste desactivado y liberacion en caliente.

### Checkpoint Android De Mantener Pantalla Encendida - 2026-08-24

- La APK debug `com.jcpaezd.notifica.debug` se recompilo, instalo y arranco correctamente en el Huawei `POT-LX1`; la APK de produccion `com.jcpaezd.notifica` permanecio instalada e independiente.
- Con el ajuste activo, la pantalla permanecio encendida al menos 10 minutos despues del ultimo toque conocido, superando el timeout normal configurado de 5 minutos.
- La activacion/desactivacion, el paso a segundo plano, la reapertura y la persistencia del ajuste se comportaron correctamente durante la prueba manual.
- La prueba inicial de bloqueo no fue concluyente porque el dispositivo estaba conectado por USB y reporto `stay_on_while_plugged_in=7`, `mPlugType=2` y `screen_off_timeout=300000`; se repitio con valores temporales `0` y `30000`, y se confirmo el auto-bloqueo y la liberacion en caliente.
- Los valores originales del dispositivo se restauraron y verificaron: `stay_on_while_plugged_in=7` y `screen_off_timeout=300000`.

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

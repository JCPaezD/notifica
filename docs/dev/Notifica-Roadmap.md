# Roadmap de Notifica

Este es el roadmap activo de Notifica.

El roadmap historico completo se conserva en [archive/roadmap-history.md](./archive/roadmap-history.md).

## Estado Actual Del Producto

- La PWA de produccion esta publicada desde `main` en Vercel.
- La app Android esta publicada en Google Play.
- Usuarios reales siguen usando la app sin problemas bloqueantes detectados tras el lanzamiento.
- La siguiente fase debe reforzar la base del proyecto antes de abrir una version grande de funcionalidades.

## Fase Actual: v1.3.x Fortificacion Tecnica

Objetivo:

- hacer el proyecto mas facil de mantener, probar, explicar y evolucionar
- reducir riesgo antes de abordar features grandes
- preservar compatibilidad con datos reales existentes
- mejorar el repo como producto real y como pieza de portfolio

No objetivos:

- redisenar visualmente la app de forma amplia
- reescribir la app desde cero
- agrupar todo el backlog en una unica version grande
- romper importacion/exportacion o persistencia local sin plan explicito de migracion

## Objetivo De Release

- `v1.3.x` se mantiene como fase interna de fortificacion.
- El objetivo publico siguiente es una release coordinada PWA + Android `1.4.0`.
- El alcance congelado incluye los cambios ya validados en `develop`, `Mantener pantalla encendida`, el mantenimiento compatible de dependencias/seguridad y la retirada completa del aviso de nueva version, su CTA de Play Store y su entrada del menu PWA.
- La puerta de alcance de pendientes quedo cerrada el 2026-08-24: fechas cerca de medianoche, barra inferior Android en tema oscuro, deuda tecnica adicional y automatizacion de capturas Android permanecen fuera de `1.4.0`.
- El candidato local de release queda preparado en `develop` con metadatos `1.4.0`,
  `versionCode 11` y version visible `v1.4.0`; el `versionCode` se comprobara de nuevo
  contra Play Console antes de una subida real.
- Este estado es un gate previo: no implica merge a `main`, tag, despliegue de
  produccion, subida a Play Console ni publicacion.

## Bloques De Fortificacion

### Bloque A - Planificacion Privada Y Captura

Estado: completado en `../notifica_docs`.

- Se reorganizo y versiono la documentacion privada.
- Se capturaron notas post-lanzamiento.
- Se creo el plan vivo privado de fortificacion.

### Bloque B - Workflow Y Skills

Estado: completado.

- Se anadio `.agents/workflow.md`.
- Se anadieron skills repo-locales:
  - `capture-item`
  - `refine-item`
  - `plan-version`
  - `design-spec`
  - `breakdown-feature`
- Se mantuvieron las skills especificas de Notifica:
  - `implement-feature`
  - `debug-root-cause`
  - `release-workflow`
- Se actualizaron `AGENTS.md` e `implement-feature` para usar el nuevo flujo.

### Bloque C - Refactor Documental

Estado: completado.

Objetivo:

- hacer la documentacion publica/dev mas facil de navegar
- separar conocimiento vigente de historial pesado
- crear una superficie documental mas clara para desarrollo futuro y portfolio

Alcance:

- reestructurar `docs/dev/`
- conservar historicos en `docs/dev/archive/`
- mover inventarios temporales a `docs/dev/working/`
- refrescar el `README.md` raiz cuando la documentacion dev este clara

Resultado:

- documentacion activa reducida y separada por responsabilidad
- historicos completos preservados en `archive/`
- inventarios temporales movidos a `working/`
- `README.md` actualizado como presentacion publica del proyecto
- workflow de agentes actualizado para apuntar a la nueva estructura documental

### Bloque D - Tests Y Automatizaciones Base

Estado: implementado y validado en la verificacion acumulada del 2026-08-16.

Objetivo:

- introducir un primer stack de tests antes de refactors con riesgo
- proteger reglas de dominio, persistencia, import/export y logica de fechas
- decidir que validacion Android debe ser automatica, manual o mixta

Foco candidato:

- Vitest como base de tests unitarios.
- Vue Test Utils para componentes Vue criticos.
- Playwright como smoke E2E ligero e independiente.
- Tests de dominio para fechas/duracion, filtros/turnos, import/export y texto compartido.
- Tests de composables/utilidades para notas, toasts y plataforma Android.
- CI basica para `develop` y pull requests.
- Android se mantiene como validacion manual/checklist salvo automatizacion especifica futura.

Validacion acumulada:

- completada en deploy dev de Vercel, PWA movil/web y Android local el 2026-08-16
- los detalles y observaciones quedan registrados en la checklist privada de fortificacion

### Bloque E - Refactor Progresivo De Arquitectura

Estado: implementado en primera tanda y validado en la verificacion acumulada del 2026-08-16.

Objetivo:

- reducir responsabilidades de `App.vue`
- separar reglas de dominio, persistencia, adaptadores de plataforma y UI
- mantener comportamiento visible estable mientras se extrae logica

Principios:

- anadir tests antes de extraer comportamiento de riesgo
- evitar migraciones salvo que la compatibilidad este disenada explicitamente

Resultado inicial:

- `App.vue` se ha reducido y ahora delega reglas en `src/domain/`, `src/services/` y `src/adapters/`.
- Se conectaron helpers de dominio ya testeados para import/export, filtros, texto compartido y duracion.
- Se extrajo persistencia de tareas y turno actual.
- Se extrajeron helpers de ciclo de vida de tareas.
- Se extrajeron adaptadores de export/share para navegador y Capacitor.

Validacion acumulada:

- persistencia local y recuperacion tras recarga
- importacion JSON antigua y nueva
- exportacion JSON en web/PWA y Android local
- compartir texto y archivo
- crear/finalizar/reabrir/borrar/restaurar tareas
- borrar todo/deshacer restaurando notas
- filtros, turnos con notas, duracion y cruce de medianoche
- detalle completo y resultado en la checklist privada de fortificacion

### Bloque F - Tooling Android Y Android Skills Oficiales

Estado: implementado y usado en validacion Android local el 2026-08-16.

Objetivo:

- investigar `android/skills` y soporte de Android CLI para trabajo Android asistido por agentes
- decidir si instalar alguna skill Android aporta valor real a este proyecto Capacitor

Decision actual:

- Android CLI instalado y probado de forma controlada
- no instalar `android skills add --all`
- skills oficiales instaladas: `android-cli`, `edge-to-edge`, `testing-setup` y `adaptive`
- usar `edge-to-edge` como apoyo para futura auditoria Android/Capacitor
- usar `testing-setup` y `adaptive` solo como referencias para validacion Android y pantallas grandes
- aplazar `agp-9-upgrade` y `r8-analyzer` hasta que haya necesidad concreta

### Bloque G - Quick Wins UX

Estado: implementado y validado en `develop` / Vercel dev.

Resultado:

- se anadio `Undo` al reabrir tarea para evitar perdida irreversible de `endTime` por clic accidental
- el boton principal se mantuvo compacto tras validar que aumentar su altura empeoraba el riesgo de missclick
- se mantiene una separacion visual ligera con acciones secundarias
- queda diferida una revision mas amplia del layout de acciones si los clics accidentales persisten

Restriccion:

- mantenerlo como mejora pequena validada, no como rediseño amplio.

## Backlog Vivo

### Alta Prioridad / Candidatos Cercanos

- Verificacion manual acumulada completada el 2026-08-16; mantener las observaciones no bloqueantes visibles antes de decidir release.
- El ajuste `Mantener pantalla encendida` ya esta implementado en `develop`, desactivado por defecto y validado manualmente en la PWA iPhone y en la APK debug del Huawei, incluido el auto-bloqueo con la opcion desactivada.
- La retirada completa del aviso de nueva version y su entrada de menu quedo validada manualmente en la PWA movil de `develop`; la comprobacion desktop se omitio conscientemente por compartir la misma ruta funcional.
- Revisar informe externo post-checkpoint y decidir si abre nuevos bloques o ajustes de plan.
- Pase inicial de mantenimiento de dependencias aplicado; `npm audit --omit=dev` queda limpio y los avisos restantes son de tooling de desarrollo.

### Deuda Tecnica

- `App.vue` centraliza demasiado estado y orquestacion.
- Los flujos con toasts/undo y timers siguen mayoritariamente en `App.vue`.
- `startNewShift`, `deleteTask` y `deleteAllTasks` siguen mezclando reglas de negocio con UX/toasts.
- Notas por tramo siguen acopladas entre lista, composable y flujo de turnos.
- La version visible y metadatos de release siguen siendo parcialmente manuales.
- Mantener bajo revision el audit completo y el warning de Browserslist; el grafo de produccion ya queda limpio tras el primer pase de mantenimiento de dependencias.

### Plataforma / Android

- Mantener como comprobacion especifica de release cualquier revision adicional de edge-to-edge en Android 15 / SDK 35.
- Vigilar warnings de status bar y navigation bar.
- Usar Android CLI y skills oficiales instaladas como apoyo selectivo, no como sustituto del workflow local.
- Explorar `android screen capture` para automatizar capturas Android cuando haya dispositivo o emulador disponible.
- Mantener validacion Android como checkpoint manual hasta justificar automatizacion.
- Mantener como cerrada la validacion Android de `Mantener pantalla encendida`: activacion, persistencia, ciclo de segundo plano, auto-bloqueo desactivado y liberacion en caliente quedaron comprobados en la APK debug.

### Producto / UX

- Revisar layout de acciones en `TaskItem` si persisten missclicks entre registrar/notificar/reabrir.
- Mantener correccion de fechas cerca de medianoche como trabajo futuro.
- Mantener ayuda/tutorial y formulario de feedback como candidatos posteriores.
- Valorar capturas tablet y pantallas grandes mas adelante.

## Roadmap Historico

El roadmap anterior completo, incluyendo fases de lanzamiento ya cerradas y checklists historicos detallados, esta archivado en [archive/roadmap-history.md](./archive/roadmap-history.md).

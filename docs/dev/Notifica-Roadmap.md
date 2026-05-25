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

Estado: implementado pendiente de revision.

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

Validacion pendiente acumulada:

- validar en el deploy dev de Vercel antes de cerrar la fase de fortificacion o preparar merge/release
- comprobar flujo basico de tareas y duracion
- comprobar caso de tarea que cruza medianoche
- comprobar compartir/exportar una tarea finalizada
- anotar cualquier regresion antes de pasar al Bloque E
- esta validacion puede acumularse con la del refactor grande para evitar pruebas intermedias repetidas, siempre que el checklist no se pierda

### Bloque E - Refactor Progresivo De Arquitectura

Estado: implementado en primera tanda, pendiente de validacion acumulada.

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

Validacion pendiente acumulada:

- persistencia local y recuperacion tras recarga
- importacion JSON antigua y nueva
- exportacion JSON en web/PWA
- compartir texto y archivo
- crear/finalizar/reabrir/borrar/restaurar tareas
- borrar todo/deshacer restaurando notas
- filtros, turnos con notas, duracion y cruce de medianoche

### Bloque F - Tooling Android Y Android Skills Oficiales

Estado: implementado pendiente de uso real.

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

Estado: planificado.

Candidato:

- anadir `Undo` al reabrir tarea para evitar perdida irreversible de `endTime` por clic accidental
- revisar espaciado y proximidad visual de botones de accion en tareas

Restriccion:

- mantenerlo como mejora pequena validada, no como rediseño amplio.

## Backlog Vivo

### Alta Prioridad / Candidatos Cercanos

- Anadir undo al reabrir tarea.
- Anadir tests y automatizacion base.
- Extraer logica de tareas/fechas/exportacion a modulos testeables.
- Mejorar documentacion y presentacion del repo.

### Deuda Tecnica

- `App.vue` centraliza demasiado estado y orquestacion.
- Las reglas de dominio no estan suficientemente aisladas para tests.
- Persistencia/import/export necesitan proteccion explicita antes de refactors.
- La version visible y metadatos de release siguen siendo parcialmente manuales.
- Revisar `npm audit`, Browserslist y warning de doble import de `@capacitor/share` en un bloque de mantenimiento separado.

### Plataforma / Android

- Revisar comportamiento edge-to-edge en Android 15 / SDK 35.
- Vigilar warnings de status bar y navigation bar.
- Investigar tooling/skills oficiales Android.
- Mantener validacion Android como checkpoint manual hasta justificar automatizacion.

### Producto / UX

- Revisar flujo de reapertura de tareas.
- Mantener correccion de fechas cerca de medianoche como trabajo futuro.
- Mantener ayuda/tutorial y formulario de feedback como candidatos posteriores.
- Valorar capturas tablet y pantallas grandes mas adelante.

## Roadmap Historico

El roadmap anterior completo, incluyendo fases de lanzamiento ya cerradas y checklists historicos detallados, esta archivado en [archive/roadmap-history.md](./archive/roadmap-history.md).

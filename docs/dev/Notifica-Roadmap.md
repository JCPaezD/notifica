# Roadmap de Notifica

Este es el roadmap activo de Notifica.

El roadmap historico completo se conserva en [archive/roadmap-history.md](./archive/roadmap-history.md).

## Estado Actual Del Producto

- La PWA de produccion esta publicada desde `main` en Vercel.
- La app Android esta publicada en Google Play.
- Usuarios reales siguen usando la app sin problemas bloqueantes detectados tras el lanzamiento.
- La release publica `1.4.0` esta cerrada y la validacion manual post-release quedo completada.

## Fase De Fortificacion Cerrada: v1.3.x

Estado: cerrada en el alcance publicado de `1.4.0`.

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

## Release Publicada: 1.4.0

- `v1.3.x` se mantiene como fase interna de fortificacion.
- El alcance publicado incluyo los cambios ya validados en `develop`, `Mantener pantalla encendida`, el mantenimiento compatible de dependencias/seguridad y la retirada completa del aviso de nueva version, su CTA de Play Store y su entrada del menu PWA.
- La release se integro en `main`, se publico en la PWA de produccion, se etiqueto como `v1.4.0` y se publico en Android con `versionCode 11`.
- La validacion post-release de PWA y Android quedo completada sin incidencias bloqueantes.
- Las fechas cerca de medianoche, la barra inferior Android en tema oscuro, la deuda tecnica adicional y la automatizacion de capturas Android quedaron fuera de `1.4.0` y siguen siendo trabajo diferido.
- No queda ninguna accion de publicacion pendiente ni se reabre `1.4.0` por el seguimiento tecnico de Play.

## Cierre De La Fortificacion v1.3.x

La fase interna de fortificacion que precedio a `1.4.0` queda cerrada. El
detalle de sus bloques historicos no forma parte del roadmap activo.

## Version En Desarrollo: 1.5.0

- Hardening de persistencia ante cierres abruptos.
- `App.vue` centraliza demasiado estado y orquestacion.
- `startNewShift`, `deleteTask` y `deleteAllTasks` siguen mezclando reglas de negocio con UX/toasts.
- Notas por tramo siguen acopladas entre lista, composable y flujo de turnos.
- La version visible y metadatos de release siguen siendo parcialmente manuales.
- Mantener como comprobacion especifica de release cualquier revision adicional de edge-to-edge en Android 15 / SDK 35.
- Vigilar warnings de status bar y navigation bar.
- Usar Android CLI y skills oficiales instaladas como apoyo selectivo.
- Explorar `android screen capture` para automatizar capturas Android cuando haya dispositivo o emulador disponible.
- Mantener validacion Android como checkpoint manual hasta justificar automatizacion.
- Mantener correccion de fechas cerca de medianoche como trabajo de la version.
- Formulario de feedback de usuarios dentro de la app.

## Backlog Vivo

### Trabajo Posterior

- Tutorial u onboarding para usuarios nuevos.
- Automatizacion Android avanzada, matrices de dispositivos o sustitucion de checkpoints manuales.
- Refactor arquitectonico general que no este directamente apoyando la version en desarrollo.
- Mantenimiento del tooling de desarrollo, incluyendo el audit completo y Browserslist, cuando exista un bloque con alcance suficiente.

### Seguimiento No Bloqueante

- Mantener una observacion ligera de las metricas post-release de Android cuando Play Console tenga datos suficientes.
- Mantener el seguimiento preventivo P2 de requisitos tecnicos de Play segun los disparadores documentados en `maintenance.md`.

### Producto / UX

- Revisar layout de acciones en `TaskItem` si persisten missclicks entre registrar/notificar/reabrir.
- Mantener ayuda/tutorial como candidato posterior.
- Valorar capturas tablet y pantallas grandes mas adelante.

## Roadmap Historico

El roadmap anterior completo, incluyendo fases de lanzamiento ya cerradas y checklists historicos detallados, esta archivado en [archive/roadmap-history.md](./archive/roadmap-history.md).

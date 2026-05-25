# Bugs Conocidos Y Trabajo Diferido

Este documento mantiene visibles bugs, limitaciones y trabajo de plataforma diferido sin sobrecargar el roadmap.

Los diagnosticos historicos detallados se conservan en [archive/dev-notes-history.md](./archive/dev-notes-history.md).

## Issues Actuales De Mayor Valor

### Reabrir Tarea Puede Perder `endTime`

Problema:

- Reabrir una tarea elimina la hora de fin.
- Un clic accidental puede perder un dato util.

Direccion preferida:

- anadir toast con `Undo`
- conservar el `endTime` anterior el tiempo suficiente para restaurarlo
- revisar espaciado/tamano de botones si siguen siendo probables los clics accidentales

Ubicacion:

- `v1.3.x Fortificacion Tecnica`, quick win UX.

### Fecha/Hora Cerca De Medianoche

Problema:

- Editar horas de tareas cerca de medianoche puede requerir decidir si la hora pertenece al dia anterior o actual.

Direccion preferida:

- disenar antes de implementar
- proteger duracion, ordenacion, exportacion e importacion
- anadir tests antes de tocar logica central de fechas

Ubicacion:

- backlog / trabajo tecnico-producto futuro.

## Caveats De Plataforma

### Android Edge-To-Edge / SDK 35

Play Console y versiones nuevas de Android pueden requerir revisar layout edge-to-edge, status bar y navigation bar.

Mantenerlo como trabajo especifico Android salvo que se vuelva bloqueante de release.

### APIs De Status Bar / Navigation Bar En Android

Algunas APIs o internals de plugins pueden estar obsoletos o comportarse distinto entre versiones Android.

Revisarlo durante trabajo de tooling o release Android.

### PWA iOS: Edicion De Notas Con Teclado

Existe un bug menor en PWA iOS al editar notas de tramo con el teclado abierto y navegacion nativa de campos visible.

No es bloqueante, pero debe seguir visible para revision futura.

### Recorte De Icono Maskable

El renderizado de iconos maskable puede variar segun superficie de instalacion Android/PWA.

Hay investigacion historica en el archivo. Reabrir solo si vuelve a ser visible o relevante para release.

## Regla Documental

Mantener este archivo enfocado en issues actuales o plausiblemente recurrentes.

Mover diagnosticos largos y bugs cerrados a `archive/`.

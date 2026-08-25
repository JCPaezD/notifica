# Bugs Conocidos Y Trabajo Diferido

Este documento mantiene visibles bugs, limitaciones y trabajo de plataforma diferido sin sobrecargar el roadmap.

Los diagnosticos historicos detallados se conservan en [archive/dev-notes-history.md](./archive/dev-notes-history.md).

## Issues Actuales De Mayor Valor

### Layout De Acciones En Tarea Puede Provocar Missclicks

Problema:

- Las acciones de tarea pueden quedar muy proximas en algunas superficies.
- El caso mas sensible era reabrir una tarea finalizada por error al intentar pulsar otra accion.

Estado:

- mitigado en `develop` con toast `Deshacer` al reabrir tarea
- validado en PWA desktop y movil simulado desde Vercel dev
- el boton principal se mantuvo compacto; aumentar su altura empeoraba el objetivo

Trabajo diferido:

- revisar layout, separacion o posicion de acciones si los missclicks persisten en uso real
- evitar convertirlo en rediseÃ±o amplio salvo que haya evidencia clara

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

En el Huawei `POT-LX1` validado localmente, la barra inferior de navegacion del sistema permanece clara/blanca cuando Notifica usa el tema oscuro, en lugar de adoptar el color del tema. No bloquea el uso actual y queda pendiente de una revision Android futura.

### PWA iOS: Edicion De Notas Con Teclado

Existe un bug menor en PWA iOS al editar notas de tramo con el teclado abierto y navegacion nativa de campos visible.

No es bloqueante, pero debe seguir visible para revision futura.

### Persistencia Ante Cierre Abrupto

La persistencia actual confirma las notas al perder el foco. Si la app termina abruptamente mientras una nota sigue en edicion, la ultima edicion puede no haberse confirmado; ademas, existe una ventana muy corta y no determinista tras crear una tarea en la que un `force-stop` inmediato puede dejar el cambio pendiente.

Estado:

- no reproducido durante el uso manual normal ni tras cierres con escritura confirmada
- aceptado como riesgo no bloqueante para `1.4.0`
- priorizado como bug/hardening para la siguiente version, con posible persistencia mas inmediata y pruebas especificas de cierre abrupto

### Recorte De Icono Maskable

El renderizado de iconos maskable puede variar segun superficie de instalacion Android/PWA.

Hay investigacion historica en el archivo. Reabrir solo si vuelve a ser visible o relevante para release.

## Regla Documental

Mantener este archivo enfocado en issues actuales o plausiblemente recurrentes.

Mover diagnosticos largos y bugs cerrados a `archive/`.

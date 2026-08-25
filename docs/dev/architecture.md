# Arquitectura

Este documento describe la arquitectura actual y la direccion prevista del refactor de Notifica.

## Stack Actual

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- vue-i18n
- Capacitor Android
- persistencia en localStorage
- PWA desplegada en Vercel

## Estructura Actual

Estructura general:

```text
src/
  adapters/
  components/
  composables/
  constants/
  domain/
  locales/
  services/
  types/
  utils/
```

Areas importantes:

- `App.vue`: shell/orquestacion principal, estado reactivo y wiring de componentes.
- `src/domain/`: reglas testeables de tareas, duracion, import/export, filtros y texto compartido.
- `src/services/`: servicios de aplicacion como persistencia de tareas/turno.
- `src/adapters/`: integracion con APIs de navegador y Capacitor.
- `src/components/`: componentes visuales e interactivos.
- `src/composables/`: comportamiento reusable de UI/estado, como notificaciones.
- `src/locales/`: traducciones en espanol e ingles.
- `src/utils/`: utilidades compartidas.

## Deuda Arquitectonica Conocida

- `App.vue` es demasiado grande y mezcla responsabilidades.
- Aun quedan responsabilidades de orquestacion importantes en `App.vue`.
- Parte del ciclo de vida de tareas ya esta extraido, pero los flujos con toasts/undo siguen en `App.vue`.
- Persistencia, import/export, share y ciclo de vida tienen primera separacion, pero falta consolidar casos de uso mas completos.
- Parte del comportamiento existe como conocimiento historico documentado, pero no como limites de modulo claros.

## Direccion Objetivo

El refactor deberia avanzar gradualmente hacia capas mas claras:

```text
domain/
  reglas de tareas, fechas, horas y turnos

services/
  persistencia, import/export, formateo, orquestacion de notificaciones

adapters/
  APIs de navegador, Capacitor, clipboard/share, localStorage

ui/
  componentes y composables Vue
```

Esto es una direccion, no una exigencia de crear todas las carpetas de golpe.

## Reglas De Refactor

- Anadir tests antes de extraer logica de riesgo.
- Extraer comportamiento en pasos pequenos.
- Mantener comportamiento visible estable salvo cambio aprobado.
- No cambiar la forma de datos persistidos sin plan de compatibilidad.
- Preservar compatibilidad import/export salvo migracion disenada explicitamente.
- Priorizar logica pura: fechas, ciclo de vida de tareas, formato de exportacion y validacion.

## Primeros Candidatos De Extraccion

- casos de uso de tarea que todavia mezclan dominio, toasts y timers
- flujo de turnos: iniciar, deshacer nuevo turno, seleccionar turno actual/pasado
- notas por tramo y su relacion con tareas/turnos
- preferencias UI: idioma, mantener pantalla encendida, plataforma iOS-like
- adaptadores de plataforma restantes si aparecen nuevas necesidades Android/PWA

## Objetivo Portfolio

La arquitectura no necesita estar sobredisenada.

Debe quedar lo bastante clara para que otro desarrollador entienda:

- que hace la app
- donde viven las reglas de dominio
- como se persisten los datos
- como difieren PWA y Android
- como los tests protegen futuros refactors

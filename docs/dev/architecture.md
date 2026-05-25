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
  components/
  composables/
  constants/
  locales/
  types/
  utils/
```

Areas importantes:

- `App.vue`: orquestacion principal, estado de tareas, llamadas de persistencia, comportamiento de plataforma, import/export y estado UI general.
- `src/components/`: componentes visuales e interactivos.
- `src/composables/`: comportamiento reusable de UI/estado, como notificaciones.
- `src/locales/`: traducciones en espanol e ingles.
- `src/utils/`: utilidades compartidas.

## Deuda Arquitectonica Conocida

- `App.vue` es demasiado grande y mezcla responsabilidades.
- Las reglas de dominio no estan suficientemente aisladas para tests focalizados.
- Persistencia, import/export, ciclo de vida de tareas, plataforma y UI estan demasiado acoplados.
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

- ciclo de vida de tareas: iniciar, finalizar, reabrir, eliminar, restaurar
- calculos de horas y duraciones
- reglas de filtrado y ordenacion por turno
- formato de exportacion de texto
- validacion y normalizacion de importacion
- adaptador de persistencia localStorage

## Objetivo Portfolio

La arquitectura no necesita estar sobredisenada.

Debe quedar lo bastante clara para que otro desarrollador entienda:

- que hace la app
- donde viven las reglas de dominio
- como se persisten los datos
- como difieren PWA y Android
- como los tests protegen futuros refactors

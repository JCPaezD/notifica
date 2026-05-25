# Proceso De Release

Este documento resume el proceso actual de release de Notifica.

El contexto historico completo de lanzamientos se conserva en [archive/dev-notes-history.md](./archive/dev-notes-history.md) y [archive/roadmap-history.md](./archive/roadmap-history.md).

## Superficies De Release

Notifica se publica en dos superficies relacionadas:

- PWA desplegada en Vercel desde `main`
- app Android generada con Capacitor y publicada en Google Play

El trabajo de release debe mantener coherentes:

- `package.json`
- `package-lock.json`
- `android/app/build.gradle`
- version visible en `src/components/SideMenu.vue`
- documentacion de release cuando aplique

## Release PWA

1. Completar y validar cambios en `develop`.
2. Confirmar metadatos de version y version visible si la release cambia version.
3. Abrir PR de `develop` a `main`.
4. Revisar diff y alcance de release.
5. Hacer merge a `main`.
6. Verificar despliegue de Vercel en produccion.
7. Validar la PWA en condiciones similares a produccion.
8. Crear tag Git solo cuando sea intencional.

`main` es produccion viva. No actualizarla de forma rutinaria.

## Release Android

Antes de preparar una release Android:

- verificar `versionCode`
- verificar `versionName`
- confirmar expectativas de `package.json` y version visible
- confirmar notas de version
- confirmar firma y configuracion de release

Preparacion local habitual:

```bash
npm run build
npx cap sync android
```

Despues usar Android Studio o el camino Gradle aprobado para generar el bundle.

Camino historico usado por el proyecto:

```bash
cd android
.\gradlew.bat bundleRelease
```

El `.aab` generado debe validarse antes de publicarlo en Play Console.

## Validacion Manual

La validacion manual es obligatoria antes de cerrar trabajo de release.

Checks habituales:

- version visible correcta
- PWA carga y funciona tras despliegue
- app Android instala o actualiza correctamente
- los datos locales persisten
- export/share/import siguen funcionando
- mensajes de migracion o release son correctos
- ficha de Play Store y notas de version son coherentes

## Skill De Release

Usar `.agents/skills/release-workflow` para trabajo orientado a release.

No tratar una release como implementacion ordinaria: cruza versionado, despliegue PWA, artefactos Android, documentacion y checkpoints manuales.

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

## Preparacion Y Gate Previo

La preparacion de una release puede dejar un candidato listo sin publicarlo. Para el
candidato publico coordinado `1.4.0`:

- `package.json` y `package-lock.json` quedan en `1.4.0`.
- Android queda preparado con `versionName "1.4.0"` y `versionCode 11` como candidato.
- La version visible de la app queda en `v1.4.0`.
- El trabajo permanece en `develop` y se valida primero sobre el deploy dev.

El `versionCode` debe volver a comprobarse contra Play Console en el momento real de
preparar la subida. Esta fase no publica, no hace merge a `main`, no crea tag, no
actualiza la PWA de produccion y no sube nada a Play Console.

La publicacion requiere un gate explicito posterior con estas confirmaciones:

- alcance y diff final revisados por el usuario
- momento adecuado para publicar, incluyendo disponibilidad y estado mental del usuario
- autorizacion expresa para mergear `develop` a `main`
- verificacion manual de la PWA desplegada en produccion
- autorizacion expresa para preparar/subir el Android release a Play Console
- firma, artefacto AAB, versionCode, notas y ficha de Play Store comprobados

Si alguna confirmacion falta, el candidato permanece preparado pero no publicado.

## Release PWA

1. Completar y validar cambios en `develop`.
2. Confirmar metadatos de version y version visible si la release cambia version.
3. Abrir PR de `develop` a `main`.
4. Comprobar la proteccion vigente de `main`, el autor del PR, los checks y los
   metodos de merge disponibles.
5. Revisar diff y alcance de release.
6. Resolver el requisito de revision formal si existe.
7. Hacer merge a `main` solo con autorizacion expresa.
8. Verificar despliegue de Vercel en produccion.
9. Validar la PWA en condiciones similares a produccion.
10. Crear tag Git solo cuando sea intencional.

`main` es produccion viva. No actualizarla de forma rutinaria.

### Revision Del PR En Un Repositorio De Una Sola Cuenta

La PR sigue siendo el mecanismo recomendado para conservar trazabilidad,
mostrar el diff completo y ejecutar los checks antes de tocar `main`. Revisar el
diff y el alcance con el usuario no equivale a una aprobacion formal de GitHub.

El autor de una PR no puede aprobar su propia PR. Si la proteccion de `main`
exige aprobaciones:

- usar un revisor independiente con permisos sobre el repositorio cuando exista;
- si el repositorio tiene una sola cuenta mantenedora, conservar la PR y sus
  checks y usar un bypass administrativo solo con autorizacion expresa e
  inmediata del usuario antes del merge.

No se debe bajar la proteccion de `main` solo para esta release, crear otra
cuenta unicamente para autoaprobarse ni considerar un comentario como
aprobacion. El bypass debe dejar documentada la razon y respetar el resto de
requisitos, especialmente checks correctos e historial lineal.

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

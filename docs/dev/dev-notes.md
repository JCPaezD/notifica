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

## Decision De Versionado Y Alcance - 2026-08-24

- `v1.3.x` se mantiene como fase interna de fortificacion y no se publica como version de producto.
- El objetivo publico siguiente es una release coordinada PWA + Android `1.4.0`.
- El alcance congelado de `1.4.0` incluye los cambios ya validados en `develop`, la feature `Mantener pantalla encendida`, el mantenimiento compatible de dependencias/seguridad y la retirada completa del aviso de nueva version, su CTA de Play Store y su entrada del menu PWA.
- La revision explicita de pendientes quedo cerrada el 2026-08-24: fechas cerca de medianoche, barra inferior Android en tema oscuro, deuda tecnica adicional y automatizacion de capturas Android permanecen fuera de `1.4.0`.
- La preparacion del candidato deja coherentes `package.json`, `package-lock.json`,
  Android y la version visible en `1.4.0`; el `versionCode` candidato es `11` y se
  comprobara de nuevo contra Play Console antes de una subida real.
- Esta preparacion es un gate previo y no implica merge a `main`, tag, produccion,
  Play Console ni publicacion. La decision final queda pendiente de confirmacion
  expresa del usuario y de un momento adecuado para publicar.
- Orden de trabajo acordado: mantenimiento de dependencias, implementacion y validacion de `Mantener pantalla encendida`, retirada y validacion del aviso antiguo, preparacion de release.
- El primer pase de mantenimiento de dependencias ya esta aplicado dentro de las lineas compatibles: Capacitor 7, Vite 6, PostCSS, Workbox/PWA y `npm-run-all2` 9.
- Tras el pase, `npm audit --omit=dev` queda limpio; el audit completo conserva 8 avisos transitivos de tooling (1 baja, 1 moderada y 6 altas, sin criticas), que no bloquean el grafo de produccion y quedan separados para una futura revision de herramientas.
- La implementacion de `Mantener pantalla encendida` esta actualmente en `develop`: ajuste persistente y desactivado por defecto, Screen Wake Lock validado en la PWA iPhone y `FLAG_KEEP_SCREEN_ON` validado en la APK debug del Huawei para activacion, persistencia, ciclo de segundo plano/reapertura, auto-bloqueo con el ajuste desactivado y liberacion en caliente.
- La retirada del aviso de nueva version queda aprobada como el ultimo cambio funcional acotado antes de preparar `1.4.0`.

### Validacion De Retirada Del Aviso - 2026-08-24

- La PWA movil de `develop` no muestra el banner antiguo de nueva version.
- El menu lateral ya no muestra la entrada de novedades.
- Los ajustes, tareas, notas, `Deshacer`, exportacion y compartir siguen funcionando correctamente.
- La PWA conserva preferencias y datos tras recarga/reapertura.
- La prueba desktop se omitio conscientemente al compartir la misma ruta funcional y no haber cambios especificos de viewport.

### Checkpoint Android De Mantener Pantalla Encendida - 2026-08-24

- La APK debug `com.jcpaezd.notifica.debug` se recompilo, instalo y arranco correctamente en el Huawei `POT-LX1`; la APK de produccion `com.jcpaezd.notifica` permanecio instalada e independiente.
- Con el ajuste activo, la pantalla permanecio encendida al menos 10 minutos despues del ultimo toque conocido, superando el timeout normal configurado de 5 minutos.
- La activacion/desactivacion, el paso a segundo plano, la reapertura y la persistencia del ajuste se comportaron correctamente durante la prueba manual.
- La prueba inicial de bloqueo no fue concluyente porque el dispositivo estaba conectado por USB y reporto `stay_on_while_plugged_in=7`, `mPlugType=2` y `screen_off_timeout=300000`; se repitio con valores temporales `0` y `30000`, y se confirmo el auto-bloqueo y la liberacion en caliente.

### Preparacion Del Candidato 1.4.0 - 2026-08-24

- Los metadatos de `package.json`, `package-lock.json`, Android y la version visible quedan coherentes en `1.4.0`.
- El `versionCode` Android candidato es `11`; debe comprobarse de nuevo contra Play Console en el momento real de subida.
- `npm run quality` paso: type-check, 14 archivos de tests unitarios, 54 tests y build PWA.
- `npm run test:e2e` paso con 14 tests en Chromium y mobile-Chrome.
- `npx cap sync android`, `assembleDebug` y `bundleRelease` pasaron con la firma local configurada.
- El manifest Android generado fue comprobado con `com.jcpaezd.notifica`, `versionCode 11` y `versionName 1.4.0`; la firma del AAB se verifico.
- La verificacion local de firma pasa, con las advertencias esperables del keystore local sobre certificado autofirmado y ausencia de timestamp; la credencial y el esquema de firma de Play Console deben confirmarse en el gate real.
- El AAB candidato se conserva localmente en `android/app/release/app-release-2026-08-24-v1.4.0.aab`; es un artefacto ignorado por Git y no se ha subido a Play Console.
- Este checkpoint deja preparada la release, pero no autoriza merge a `main`, tag, produccion, Play Console ni publicacion. Queda pendiente la revision final del candidato desplegado en `develop` y la confirmacion expresa del usuario.

### Validacion Del Preview Del Candidato - 2026-08-24

- `develop` se publico en `origin/develop` en `592e98e` y el preview generico de Vercel respondio `HTTP 200`.
- El bundle remoto contiene la version visible `Notifica v1.4.0` y no contiene el aviso/menu retirado.
- En la PWA publicada se comprobo la version visible `v1.4.0`, la ausencia de `Novedades` y la presencia de `Mantener pantalla encendida` desactivado por defecto.
- Una pestaña que conservaba la version anterior mostro `v1.3.0` hasta recargarse; despues de la recarga quedo en `v1.4.0`. Se registra como observacion de actualizacion de service worker/cache, no como regresion funcional.
- La preparacion queda pausada antes del gate final: no hay merge a `main`, produccion, tag, Play Console ni publicacion.
- Los valores originales del dispositivo se restauraron y verificaron: `stay_on_while_plugged_in=7` y `screen_off_timeout=300000`.

### Regresion Y Correccion De Notas - 2026-08-25

- Durante la revision del gate final en la PWA movil se detecto que, tras reabrir la app con notas en el tramo actual, el panel aparecia cerrado y las notas existentes quedaban con altura cero hasta editarlas.
- La diagnosis local confirmo que los datos se recuperaban correctamente; el problema estaba en la sincronizacion inicial de la apertura y en el redimensionado de textareas cuando el panel se mostraba.
- `ShiftNotes.vue` ahora inicializa la apertura tambien en el montaje y redimensiona todas las notas al montarse, al cambiar el contenido y despues de abrir la transicion.
- Se anadio un E2E que comprueba reapertura, apertura automatica, visibilidad y valores de varias notas persistidas; la suite completa pasa con 14 tests en Chromium y mobile-Chrome.
- `npm run quality` pasa con type-check, 14 archivos unitarios, 54 tests y build PWA.
- La revalidacion manual de Notas en la PWA desplegada en `develop` quedo completada el 2026-08-25: reapertura, apertura automatica, visibilidad inmediata, cambio de tramo, edicion y persistencia pasaron correctamente.

### Revalidacion Android Tras La Correccion De Notas - 2026-08-25

- Se eligio el AVD `Pixel_7` con Android API 34 para repetir la comprobacion sin usar el Huawei.
- `npx cap sync android`, `assembleDebug`, `bundleRelease` y `assembleRelease` finalizaron correctamente; la APK release `com.jcpaezd.notifica` `1.4.0` / `versionCode 11` se instalo y probo en el emulador.
- Con una tarea y una nota creadas y la nota desenfocada para confirmar la escritura, `force-stop` y reapertura conservaron la tarea, el contador, la apertura automatica del panel y el texto visible.
- El AAB candidato actualizado queda archivado localmente en `android/app/release/app-release-2026-08-25-v1.4.0.aab`; no se modifico Play Console.

### Actualizacion Android A API 36 - 2026-08-25

- La revision de Play Console detecto que las futuras actualizaciones deben orientarse a Android 16 / API 36 desde el 2026-08-31; la produccion actual sigue en `1.3.0` y no se hizo ninguna subida.
- Se instalo localmente `platforms;android-36` y `android/variables.gradle` queda con `minSdkVersion 23`, `compileSdkVersion 36` y `targetSdkVersion 36`.
- `npx cap sync android`, `assembleDebug` y `bundleRelease` finalizaron correctamente. Se conserva el mismo `versionName 1.4.0` y `versionCode 11`.
- El AAB API 36 queda archivado localmente en `android/app/release/app-release-2026-08-25-v1.4.0-api36.aab`, con SHA-256 `4DB8379AA804FC9C507630C93AB2D3593766333D8C2ABB3858C408B51BD8C2F4`.
- Se valido la variante debug `com.jcpaezd.notifica.debug` en el AVD `Medium_Phone_API_36.0`: arranque, interfaz, acceso a Ajustes, activacion en caliente de `Mantener pantalla encendida` y persistencia tras relanzar. El valor se restauro a desactivado y el emulador se cerro.
- Los avisos de Gradle/Capacitor y de firma local son los esperables y no bloquearon la compilacion. Play Console, merge, tag y publicacion siguen pendientes.

### Decision Sobre Persistencia Ante Cierre Abrupto - 2026-08-25

- El guardado de una nota al perder el foco es el comportamiento esperado por diseno. La perdida de una edicion aun enfocada al cerrar abruptamente la app queda registrada como mejora de robustez.
- La ventana de perdida de una tarea creada y cerrada casi inmediatamente solo se observo en una prueba sintetica de `force-stop`, sin reproduccion en uso manual normal.
- Se acepta expresamente este riesgo para `1.4.0`; la mejora queda priorizada como bug/hardening para la siguiente version, sin reabrir el alcance actual ni bloquear el gate de release.

### Notas De Version Aprobadas - 2026-08-25

Texto aprobado para la ficha/release de `1.4.0`:

- Nuevo ajuste «Mantener pantalla encendida».
- Notas por tramo visibles al reabrir la app.
- Exportacion JSON y uso compartido mejorados.
- Correcciones y optimizaciones generales.

Criterio de oportunidad: publicar en cuanto el gate este cerrado y exista una
ventana suficiente para comprobar produccion con calma. No hay una hora concreta
preferida.

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

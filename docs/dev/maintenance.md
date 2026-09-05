# Mantenimiento

Este documento recoge el flujo de mantenimiento y validacion diaria de Notifica.

## Ramas

- `main`: PWA de produccion.
- `develop`: rama activa de trabajo y pruebas.

No tratar `main` como una rama de integracion rutinaria.

## Comandos Locales

```bash
npm install
npm run dev
npm run test:unit
npm run test:e2e
npm run quality
npm run build
npm run preview
```

Tests actuales:

- `npm run test:unit`: Vitest + jsdom para dominio, composables, utilidades y componentes.
- `npm run test:e2e`: Playwright smoke sobre la app servida con `npm run preview`.
- `npm run quality`: type-check, tests unitarios y build de Vite en secuencia.
- `.github/workflows/quality.yml`: CI para `develop` y pull requests con `npm ci`, Chromium de Playwright, `quality` y smoke E2E.

Nota:

- Playwright requiere tener descargados los navegadores locales con `npx playwright install chromium`.
- Los artefactos temporales de Playwright (`test-results/`, `playwright-report/`) estan ignorados.

## Validacion Base

Para cambios solo de documentacion:

- revisar enlaces y rutas
- revisar `git diff --stat`
- mantener el material historico accesible

Para cambios de comportamiento web/app:

- ejecutar `npm run quality`
- validar el flujo afectado en navegador o app instalada
- confirmar traducciones si cambia texto visible
- confirmar modo claro/oscuro si cambia UI

Para cambios acumulados durante la fortificacion tecnica:

- se puede diferir la validacion manual intermedia mientras el trabajo siga en `develop`
- cada bloque que toque comportamiento debe aportar sus puntos al checklist acumulado
- antes de cerrar la fortificacion, preparar merge/release o considerar estable el refactor, validar en PWA movil y web:
  - crear tarea
  - finalizar tarea
  - ver duracion
  - editar hora de inicio y fin
  - comprobar una tarea que cruza medianoche
  - compartir/exportar una tarea finalizada
  - revisar filtros basicos
- tras el Bloque E, incluir tambien:
  - recargar y comprobar persistencia local
  - importar JSON en formato antiguo y nuevo
  - borrar/restaurar tarea
  - borrar todo/deshacer restaurando notas
  - iniciar nuevo tramo/deshacer
- tras el Bloque G, incluir tambien:
  - reabrir una tarea finalizada y comprobar que pierde temporalmente la hora de fin
  - pulsar `Deshacer` y comprobar que recupera exactamente la hora de fin anterior
  - repetir la prueba con filtros activos si la tarea cambia de visibilidad
  - revisar en movil/web que los botones de tarea no quedan demasiado juntos
- tras extraer `ShiftNotes.vue`, incluir tambien:
  - abrir y cerrar notas de turno
  - crear una nota y comprobar persistencia tras blur
  - pulsar Enter en nota con texto y comprobar que aparece una fila nueva
  - pulsar Enter en nota vacia y comprobar que no se guarda contenido vacio
  - cambiar entre turnos con y sin notas
  - confirmar que no aparecen notas cuando no hay turno activo
- tras extraer `AppLogo.vue` y `SettingsModal.vue`, incluir tambien:
  - comprobar logo en cabecera y pie del menu lateral
  - abrir/cerrar ajustes desde el menu lateral
  - cambiar tema entre sistema, claro y oscuro
  - cambiar idioma entre auto, ES y EN
- tras implementar `Mantener pantalla encendida`, incluir tambien:
  - comprobar que el ajuste aparece desactivado por defecto y conserva su valor tras recargar
  - activarlo y desactivarlo en caliente
  - comprobar el bloqueo de pantalla en primer plano y su liberacion al pasar a segundo plano cuando la plataforma lo soporte
  - comprobar la degradacion transparente en navegadores sin Screen Wake Lock
  - repetir la validacion en APK debug y confirmar que la APK de produccion permanece intacta
- no perder la trazabilidad de que cambio anadio cada punto al checklist.

Nota:

- El Bloque G ya se valido en Vercel dev con PWA desktop y movil simulado.
- Mantener esos puntos en la verificacion acumulada final antes de cerrar la fortificacion, mergear o preparar release.

Para cambios Android:

- tratar Android Studio, instalacion en dispositivo, emuladores y Play Console como checkpoints manuales salvo automatizacion especifica
- no considerar validada una release Android solo con checks web

## Tooling Android

Android CLI esta disponible como herramienta local para inspeccion y apoyo en tareas Android:

```bash
android --no-metrics --version
android --no-metrics info
android --no-metrics skills list
```

Notas:

- En Windows, si `android` no aparece en una sesion ya abierta, usar `C:/Users/jcpdp/.android/bin/android-cli.exe` o abrir una terminal nueva para recoger el `PATH`.
- Usar `--no-metrics` por defecto en comandos automatizados.
- `android emulator` puede estar limitado en Windows segun la docu oficial; Android Studio/emuladores existentes y `adb` siguen siendo los checkpoints principales.
- Las skills oficiales instaladas en `.agents/skills/` son `android-cli`, `edge-to-edge`, `testing-setup` y `adaptive`.
- En Notifica, `edge-to-edge`, `testing-setup` y `adaptive` son referencias para trabajos Android/Capacitor, no instrucciones para migrar la UI a Compose.
- El comando `android screen capture` queda como candidato para automatizar capturas Android cuando haya emulador o dispositivo conectado.

## Higiene Del Repo

- Mantener inventarios temporales en `docs/dev/working/`.
- Mantener historicos en `docs/dev/archive/`.
- Mantener ignorados outputs de build y logs.
- No commitear keystores, outputs Android, APKs, AABs ni logs transitorios.
- `bundletool.jar` esta ignorado y debe seguir siendo artefacto local salvo decision deliberada de tooling.

## Mantenimiento Documental

Antes de anadir contenido largo a un documento vivo, decidir si es:

- decision o proceso vigente -> documento activo
- traza historica -> `archive/`
- material temporal -> `working/`
- estrategia privada o analisis bruto -> `../notifica_docs/`

## Commits

Preferir commits que cuenten una historia clara:

- refactor documental/workflow
- setup de tests
- extraccion de arquitectura
- fix UX
- preparacion de release

No mezclar codigo, docs y artefactos generados sin una relacion deliberada.

## Estado Del Mantenimiento De Dependencias

- El primer pase de mantenimiento de dependencias se ha aplicado dentro de las lineas compatibles de `1.4.0`, manteniendo Capacitor 7 y Vite 6.
- `npm audit --omit=dev` queda limpio: no quedan vulnerabilidades en el grafo de produccion.
- El audit completo conserva 8 avisos transitivos de tooling de desarrollo (1 baja, 1 moderada y 6 altas, sin criticas); quedan separados para una futura revision especifica de herramientas y no bloquean el grafo de produccion.
- El warning de Browserslist desactualizado sigue siendo conocido y no bloqueante.
- El warning de build por import estatico y dinamico de `@capacitor/share` quedo eliminado tras la extraccion de los adaptadores de export/share; vigilar que no se reintroduzca en cambios futuros.

## Mantenimiento Pendiente No Bloqueante

- Revisar en el futuro las vulnerabilidades restantes del tooling de desarrollo sin aplicar `npm audit fix` global automaticamente.
- Revisar el warning de Browserslist desactualizado cuando haya un bloque de tooling con alcance suficiente.

## Seguimiento Futuro: Requisitos Tecnicos De Google Play

Estado: seguimiento preventivo de prioridad media (P2). No bloquea la release
`1.4.0` ni requiere cambios inmediatos.

- Google Play ha anunciado nuevos umbrales de memoria dinamica, memoria de
  bitmaps y optimizacion DEX, con aplicacion prevista desde febrero de 2027.
- Para aplicaciones, el requisito de optimizacion DEX se centra en apps con mas
  de 10 MB de DEX y exige umbrales minimos de optimizacion, reduccion y
  ofuscacion. El AAB de `1.4.0` contiene localmente 9.926.412 bytes de DEX sin
  comprimir (aprox. 9,93 MB decimales), por debajo del umbral conocido; Play
  Console sigue siendo la referencia final si cambia la clasificacion.
- Play Console recomienda R8 para esta app, pero la build actual no usa R8/ProGuard
  y la recomendacion no es un bloqueo de la release.
- El requisito de restauracion de credenciales sin interaccion esta previsto
  para abril de 2027 y aplica a apps con inicio de sesion. Notifica no tiene
  cuentas ni inicio de sesion, por lo que no aplica mientras se mantenga ese
  alcance.
- La compatibilidad con paginas de memoria de 16 kB ya fue comprobada en el AAB
  de `1.4.0`.

Revision recomendada:

- Consultar Android Vitals cuando haya datos suficientes de `1.4.0` y, como
  maximo, durante el ultimo trimestre de 2026.
- Repetir la medicion DEX antes de cualquier release Android de 2027 y revisar
  R8 solo si el DEX supera 10 MB o aparece una exigencia concreta de Play.
- No abrir una investigacion completa de memoria/R8 ahora: requeriria datos de
  28 dias, analisis por estado y RAM, posible ajuste de build y nuevas pruebas.

Fuentes oficiales:

- [Requisitos tecnicos de calidad de Play Console](https://support.google.com/googleplay/android-developer/answer/17492799?hl=es)
- [Anuncio de Android Developers](https://developer.android.com/blog/posts/elevating-app-quality-reducing-memory-usage-and-improving-device-migration)
- [Compatibilidad con paginas de memoria de 16 kB](https://developer.android.com/guide/practices/page-sizes)

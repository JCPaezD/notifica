# ðŸ““ Notas de desarrollo â€“ Notifica

Este documento recoge decisiones tÃ©cnicas, flujos de trabajo y convenciones para el desarrollo y mantenimiento de Notifica.

## Ãndice

- [Contexto general del proyecto (actualizado 04/08/2025)](#contexto-general-del-proyecto-actualizado-04082025)
- [Flujo de versiones y despliegue](#flujo-de-versiones-y-despliegue)
  - [Flujo de merges y releases](#flujo-de-merges-y-releases)
  - [PublicaciÃ³n de versiÃ³n PWA y gestiÃ³n de versiones](#publicaciÃ³n-de-versiÃ³n-pwa-y-gestiÃ³n-de-versiones)
  - [Publicar una actualizaciÃ³n de Android (.aab)](#publicar-una-actualizaciÃ³n-de-android-aab)
  - [RevisiÃ³n del .aab antes de lanzar testing externo](#revisiÃ³n-del-aab-antes-de-lanzar-testing-externo)
- [Convenciones y control de versiones](#convenciones-y-control-de-versiones)
  - [Convenciones y buenas prÃ¡cticas de control de versiones](#convenciones-y-buenas-prÃ¡cticas-de-control-de-versiones)
- [Funcionalidades y decisiones tÃ©cnicas](#funcionalidades-y-decisiones-tÃ©cnicas)
  - [Sistema de toasts](#sistema-de-toasts)
  - [Paleta clara validada para modo light](#paleta-clara-validada-para-modo-light)
  - [Exportar archivo JSON en Android](#exportar-archivo-json-en-android)
  - [Capacitor Share: problema con compartir en Android](#capacitor-share-problema-con-compartir-en-android)
  - [Aviso temporal de novedades y migracion a app Android](#aviso-temporal-de-novedades-y-migracion-a-app-android)
  - [Enfoque estratÃ©gico de publicaciÃ³n (etapa 8)](#enfoque-estratÃ©gico-de-publicaciÃ³n-etapa-8)
  - [EliminaciÃ³n del reload tras deshacer "Borrar todo"](#eliminaciÃ³n-del-reload-tras-deshacer-borrar-todo)
  - [TransiciÃ³n visual global en cambio de tema (modo claro â†” oscuro)](#transiciÃ³n-visual-global-en-cambio-de-tema-modo-claro--oscuro)
  - [InicializaciÃ³n temprana del modo oscuro en main.ts](#inicializaciÃ³n-temprana-del-modo-oscuro-en-maints)
  - [AnimaciÃ³n colapsable del bloque de apariencia (max-height + scrollHeight)](#animaciÃ³n-colapsable-del-bloque-de-apariencia-max-height--scrollheight)
  - [Modo oscuro: uso de `class` y soporte para preferencia del sistema](#modo-oscuro-uso-de-class-y-soporte-para-preferencia-del-sistema)
  - [Notas por turno: sistema editable vinculado a shiftId](#notas-por-turno-sistema-editable-vinculado-a-shiftid)
  - [Utilidad para generar datos mock](#utilidad-para-generar-datos-mock)
- [Errores y problemas documentados](#errores-y-problemas-documentados)
  - [Bug en iOS PWA: scroll azul tras cerrar teclado](#bug-en-ios-pwa-scroll-azul-tras-cerrar-teclado)
  - [Problemas comunes en emuladores Android](#problemas-comunes-en-emuladores-android)
  - [ValidaciÃ³n de bugs: scroll y animaciÃ³n toast](#validaciÃ³n-de-bugs-scroll-y-animaciÃ³n-toast)
  - [LimitaciÃ³n: clases dinÃ¡micas de color en SVG con funciones personalizadas](#limitaciÃ³n-clases-dinÃ¡micas-de-color-en-svg-con-funciones-personalizadas)
  - [LimitaciÃ³n: clases dinÃ¡micas de Tailwind no aplicadas](#limitaciÃ³n-clases-dinÃ¡micas-de-tailwind-no-aplicadas)
  - [Bug con getShiftColor: diagnÃ³stico y soluciÃ³n definitiva](#bug-con-getshiftcolor-diagnÃ³stico-y-soluciÃ³n-definitiva)
  - [Bug con clases `text-*` no aplicadas por Tailwind](#bug-con-clases-text--no-aplicadas-por-tailwind-extendcolors-vs-extendtextcolor)
  - [Bug con colores en toasts: diagnÃ³stico y soluciÃ³n](#bug-con-colores-en-toasts-diagnÃ³stico-y-soluciÃ³n)
  - [Logo dinÃ¡mico en modo claro/oscuro](#logo-dinÃ¡mico-en-modo-clarooscuro)
  - [Bug visual en botones mÃ³viles: hover pegado tras pulsar](#bug-visual-en-botones-mÃ³viles-hover-pegado-tras-pulsar)
  - [Bug en animaciÃ³n del colapsable de notas del turno](#bug-en-animaciÃ³n-del-colapsable-de-notas-del-turno)
  - [Bug: icono maskable recortado en instalaciÃ³n PWA Android](#bug-icono-maskable-recortado-en-instalaciÃ³n-pwa-android)
  - [Bug: manifiesto PWA no detectado en previews protegidos de Vercel](#bug-manifiesto-pwa-no-detectado-en-previews-protegidos-de-vercel)
  - [Safe Areas: integraciÃ³n, fallos y soluciÃ³n definitiva (plugin EdgeToEdge)](#safe-areas-integraciÃ³n-fallos-y-soluciÃ³n-definitiva-plugin-edgetoedge)
  - [Bug crÃ­tico: el plugin capacitor-navigation-bar rompe la build debug](#bug-crÃ­tico-el-plugin-capacitor-navigation-bar-rompe-la-build-debug)
  - [GestiÃ³n dinÃ¡mica de la barra de estado (StatusBar)](#gestiÃ³n-dinÃ¡mica-de-la-barra-de-estado-statusbar)
  - [Bug en modal: hover/active residual y migraciÃ³n a Headless UI](#bug-en-modal-hoveractive-residual-y-migraciÃ³n-a-headless-ui)
- [UI, diseÃ±o y experiencia de usuario](#ui-diseÃ±o-y-experiencia-de-usuario)
  - [Splash personalizada en Android](#splash-personalizada-en-android)
  - [DescripciÃ³n para ficha de Play Store](#descripciÃ³n-para-ficha-de-play-store)
  - [Capturas oficiales de la app (v1.0)](#capturas-oficiales-de-la-app-v10)
  - [ReestructuraciÃ³n del layout de las tareas para alineaciÃ³n precisa (botÃ³n, duraciÃ³n, horas)](#reestructuraciÃ³n-del-layout-de-las-tareas-para-alineaciÃ³n-precisa-botÃ³n-duraciÃ³n-horas)
  - [Bloque de apariencia: diseÃ±o UI y selector de tema](#bloque-de-apariencia-diseÃ±o-ui-y-selector-de-tema)
  - [GestiÃ³n de traducciones existentes con i18n](#gestiÃ³n-de-traducciones-existentes-con-i18n)  
  - [AÃ±adir nuevos textos traducibles con i18n](#aÃ±adir-nuevos-textos-traducibles-con-i18n)  
- [Notas meta del proyecto](#notas-meta-del-proyecto)
  - [Nueva conversaciÃ³n principal para el desarrollo de Notifica](#nueva-conversaciÃ³n-principal-para-el-desarrollo-de-notifica)
  - [Notas para generar mensaje para nueva conversacion de desarrollo](#notas-para-generar-mensaje-para-nueva-conversacion-de-desarrollo)
  - [Normas para generar bloques de documentaciÃ³n en dev-notes](#normas-para-generar-bloques-de-documentaciÃ³n-en-dev-notes)

---

## Mantenimiento de este documento

- Mantener el Ã­ndice actualizado al aÃ±adir nuevas secciones o bloques.
- Evitar aÃ±adir encabezados `###` o `####` innecesarios:  
  - Usar solo `##` para secciones principales (reflejadas en el Ã­ndice).
  - Usar `###` solo si es imprescindible para estructurar subsecciones claras.
  - Para bloques internos, preferir **negrita como subtÃ­tulo** (`**Texto:**`) en lugar de mÃ¡s niveles de encabezado.
- No usar `---` como separadores dentro de una misma secciÃ³n.
- Formatear bloques de cÃ³digo con indentaciÃ³n (`4 espacios`), no con bloques tipo ```.
- Incluir fechas en los bloques cuando sea relevante para contexto o trazabilidad.
- Usar encabezados consistentes y sin emojis a partir del nivel `##`.
- Insertar nuevos bloques en la secciÃ³n temÃ¡tica adecuada (versiÃ³n, errores, diseÃ±o, etc.).
- Revisar y reordenar si una secciÃ³n acumula demasiado contenido o se vuelve ambigua.
- Validar el estilo visual del documento despuÃ©s de reestructuraciones extensas.

---

## Contexto general del proyecto (actualizado 03/04/2026)

**Notifica** es un proyecto personal iniciado por el autor, tÃ©cnico de mantenimiento en una fÃ¡brica, con el objetivo de sustituir el uso de notas manuales para registrar tareas tÃ©cnicas durante la jornada laboral. Desde el principio se concibiÃ³ como una herramienta de uso diario en un entorno real, con foco en la agilidad, la persistencia local y la posibilidad de exportar fÃ¡cilmente los registros al final del turno.

El proyecto ha evolucionado desde una aplicaciÃ³n mÃ­nima hasta un producto completo con funcionalidades avanzadas: modo oscuro con detecciÃ³n de sistema y selector manual, sistema propio de notificaciones visuales (toasts), diseÃ±o responsive y multiplataforma (PWA + app Android mediante Capacitor), notas por turno, exportaciÃ³n/importaciÃ³n y soporte multidioma. A nivel prÃ¡ctico, no es un experimento detenido en fase temprana, sino una herramienta real ya utilizada en jornada laboral.

Actualmente, la situaciÃ³n del proyecto es la siguiente:

- La rama `main` representa la PWA en producciÃ³n desplegada en Vercel y utilizada por usuarios reales.
- La rama `develop` concentra la evoluciÃ³n posterior del producto y se usa como rama de trabajo y como PWA de pruebas.
- La publicaciÃ³n en Google Play Console ya estÃ¡ aprobada para lanzamiento pÃºblico.
- La fase abierta del proyecto ya no es validar la viabilidad tÃ©cnica bÃ¡sica, sino cerrar correctamente la fase de lanzamiento y dejar alineados producto, ramas, documentaciÃ³n y workflow.

La pausa del proyecto no se produjo por falta de valor del producto ni por un bloqueo tÃ©cnico principal, sino por una combinaciÃ³n de desgaste del tramo final y fricciÃ³n del flujo de trabajo de ese momento. Eso redujo la inercia justo cuando la aplicaciÃ³n ya estaba madura y la publicaciÃ³n pÃºblica en Android parecÃ­a cercana.

La reentrada iniciada en abril de 2026 parte de una situaciÃ³n distinta: existe un workflow mÃ¡s estable, una mejor base documental y un criterio mÃ¡s claro para revisar alcance antes de implementar. Por eso, el objetivo de esta etapa no es reinventar `Notifica`, sino retomar un proyecto ya valioso y cerrar de forma controlada la fase de lanzamiento pendiente.

Este bloque sirve como reanclaje del estado real del proyecto en 2026. A partir de aquÃ­, el roadmap y el resto de este documento deben interpretarse con ese marco: `main` como producto vivo, `develop` como release acumulada pendiente de aterrizaje, y la documentaciÃ³n como soporte activo para decidir scope, ordenar el trabajo y cerrar la publicaciÃ³n sin reabrir el proyecto innecesariamente.


## Flujo de versiones y despliegue

### Flujo de merges y releases

- La rama `main` representa la versiÃ³n estable y se despliega automÃ¡ticamente en producciÃ³n (Vercel, Play Store).
- La rama `develop` es el entorno de trabajo diario: cada push genera un deploy preview en Vercel para testear cambios sin afectar producciÃ³n.
- Para subir cambios a producciÃ³n:
  1. Revisa que `develop` estÃ© actualizado:
     - git checkout develop
     - git pull
  2. Abre un Pull Request en GitHub de `develop` â†’ `main`.
  3. En el PR:
     - AÃ±ade descripciÃ³n de bloques completados, bugs corregidos o mejoras.
     - Adjunta capturas si es necesario.
  4. Revisa el diff en GitHub y aprueba el PR.
  5. MergÃ©alo: esto actualizarÃ¡ `main` y desplegarÃ¡ la nueva versiÃ³n estable.
  6. (Opcional) Crea un tag en `main` para marcar el release:
     - git checkout main
     - git pull
     - git tag vX.Y.Z -m "DescripciÃ³n breve del release"
     - git push origin vX.Y.Z
- RecomendaciÃ³n: mantÃ©n un historial claro y limpia la rama `develop` periÃ³dicamente rebaseando si es necesario.

### PublicaciÃ³n de versiÃ³n PWA y gestiÃ³n de versiones

La versiÃ³n web (PWA) de Notifica se despliega automÃ¡ticamente cada vez que se hace `merge` a la rama `main`. Este proceso estÃ¡ configurado en Vercel y no requiere pasos adicionales manuales.

**Estructura y flujo de despliegue:**

- La rama `develop` se usa para el desarrollo diario.
- La rama `main` contiene la versiÃ³n estable que se publica automÃ¡ticamente en Vercel como PWA.
- Cada vez que se desea actualizar la PWA:
  1. Se completan los cambios en `develop`.
  2. Se realiza un Pull Request de `develop` â†’ `main`.
  3. Al hacer merge, Vercel despliega la nueva versiÃ³n automÃ¡ticamente.
  4. Opcionalmente, puede aÃ±adirse un tag git (`vX.Y.Z`) para marcar el release.

**GestiÃ³n de versiones:**

La versiÃ³n de la app se muestra actualmente en dos lugares:

1. package.json
   - El campo `version` refleja la versiÃ³n general del proyecto.
   - Esta es la fuente de verdad y deberÃ­a actualizarse manualmente antes de cada publicaciÃ³n.
   - `package-lock.json` debe quedar sincronizado con ese valor.

2. SideMenu.vue
   - La versiÃ³n aparece en el pie del menÃº lateral como texto hardcodeado.
   - Debe actualizarse manualmente para que coincida con package.json.

3. Android (si aplica)
   - En android/app/build.gradle, se gestiona por separado mediante:
     - versionCode (entero creciente para updates)
     - versionName (cadena visible en Play Store, recomendable sincronizarla con package.json y SideMenu.vue).

**Mejora opcional futura:**

Puede automatizarse la sincronizaciÃ³n entre package.json y la versiÃ³n mostrada en el footer de SideMenu.vue usando Vite.  
Esto permitirÃ­a importar la versiÃ³n con:

  import { version } from '../package.json'

Y usarla como variable reactiva.  
Por ahora se mantiene la ediciÃ³n manual para simplicidad y control total.

**ActualizaciÃ³n recomendada:**

Antes de hacer merge a main para publicar una nueva versiÃ³n PWA:

- [ ] Aumentar versiÃ³n en package.json ("version": "1.X.Y")
- [ ] Confirmar que `package-lock.json` queda alineado con esa versiÃ³n
- [ ] Actualizar texto en SideMenu.vue
- [ ] (Opcional) Sincronizar versionName en Android (build.gradle)
- [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "DescripciÃ³n del release"
      git push origin v1.X.Y

### Publicar una actualizaciÃ³n de Android (.aab)

Pasos para crear y subir una nueva versiÃ³n firmada a Google Play:

1. Aumentar versiÃ³n:
  - Editar `android/app/build.gradle`:
     - `versionCode`: sumar 1 respecto a la release anterior
     - `versionName`: nueva etiqueta visible alineada con la versiÃ³n del proyecto
  - Editar footer de `SideMenu.vue`

2. Sincronizar Gradle y generar `.aab`:
   - En Android Studio:
     - `File > Sync Project with Gradle Files`
     - `Build > Build Bundle(s) / APK(s) > Build Bundle`
   - El archivo se genera en:
      android/app/build/outputs/bundle/release/app-release.aab
   - Renombrar con marca temporal:
      app-release-YYYY-MM-DD-HH-MM.aab
   - Verificar que la ruta `android/app/build/` estÃ¡ incluida en `.gitignore`

3. Subir a Google Play Console:
   - Ir a la app > `VersiÃ³n > Pruebas internas` o `ProducciÃ³n` > Crear versiÃ³n
   - Subir el `.aab` renombrado
   - No activar â€œIncluir versiÃ³n anteriorâ€, a menos que se suban mÃºltiples bundles segmentados (por arquitectura, regiÃ³n, etc.). En actualizaciones normales debe subirse solo la nueva versiÃ³n.
   - Revisar nombre de versiÃ³n generado (`3 (1.0.2)` por ejemplo)
   - AÃ±adir notas de la versiÃ³n (idioma `es-ES`):
      <es-ES>
        DescripciÃ³n breve de cambios incluidos.
      </es-ES>

4. Instalar en dispositivo real desde el enlace de test interno o Play Store

### RevisiÃ³n del `.aab` antes de lanzar testing externo

[Actualizado 02/08/2025 - âœ… Lista completada]

(ver roadmap Etapa 8: â€œLanzar fase de testing real con usuarios externosâ€)

**Funcionamiento general**
- âœ… Lanzamiento rÃ¡pido y sin errores
- âœ… Splash personalizada aparece correctamente (Android 12+ y 10)
- âœ… NavegaciÃ³n fluida entre acciones (crear, cerrar, exportar, borrar)
- âœ… Scroll correcto en listas largas de tareas - En listas cortas mantiene bug scroll extra en main. En listas largas, selector de turno no se ve (abajo fuera de pantalla)
- âœ… Sin cierres, cuelgues ni errores visibles

**Persistencia y datos**
- âœ… Tareas se guardan correctamente entre sesiones
- âœ… ExportaciÃ³n en texto plano funciona y copia al portapapeles o usa share
- âœ… ExportaciÃ³n como `.json` se ofrece para compartir (Capacitor Share)
- âœ… ImportaciÃ³n de `.json` funciona
- âœ… "Borrar todo" borra efectivamente y muestra feedback

**Interfaz**
- âœ… Header fijo visible correctamente
- âœ… Toasts aparecen bien (posiciÃ³n, stacking, botones funcionales)
- âœ… Formulario â€œIniciar tareaâ€ funciona sin glitches
- âœ… Lista de tareas y botones responden correctamente
- âœ… El menÃº lateral abre y cierra sin problemas

**Experiencia visual**
- âœ… No hay scroll fantasma ni glitches al abrir teclado - si lo hay con poco contenido
- âœ… TipografÃ­a, colores, espaciado coherentes
- âœ… Iconos visibles y en su sitio
- âœ… Animaciones presentes donde corresponde

**IntegraciÃ³n Android**
- âœ… Splash screen limpia sin halo ni deformaciÃ³n
- âœ… Icono visible correctamente (maskable, sin fondo gris)
- âœ… No hay permisos extra solicitados
- âœ… Compatible con modo oscuro si estÃ¡ activado - No existe modo oscuro. Â¿costarÃ­a mucho de integrar?

**Otros detalles**
- âœ… NÃºmero de versiÃ³n correcto (`versionName` y `versionCode`)
- âœ… Pie de menÃº muestra versiÃ³n actual
- âœ… No hay regresiones respecto a versiÃ³n anterior
- âœ… Confirmado que estÃ¡ firmada y se instala desde Play Store (canal de test)

---

## Convenciones y control de versiones

### Convenciones y buenas prÃ¡cticas de control de versiones

Este proyecto sigue un conjunto claro de normas para garantizar un historial de cambios limpio, entendible y trazable en Git.

### ðŸ§± Estructura de los commits

- Se utiliza el formato de Conventional Commits:

    tipo: descripciÃ³n breve y clara

  Ejemplos:
    - feat: aÃ±adir soporte para modo oscuro
    - fix: corregir bug visual en selector de turno
    - refactor: extraer formulario de nueva tarea a componente
    - docs: actualizar README con informaciÃ³n de la versiÃ³n Android

- Tipo puede ser: feat, fix, refactor, docs, chore, style, etc.
- Siempre en espaÃ±ol.
- Usar imperativo (ej. aÃ±adir, corregir, actualizar), no infinitivo.

### ðŸ“¥ InclusiÃ³n de archivos nuevos

- âš ï¸ El comando `git commit -am` no incluye archivos nuevos (solo modifica los ya trackeados).
- Por tanto, se recomienda usar siempre:
    git add . && git commit -m "mensaje claro"

- Esto asegura que todos los archivos modificados y creados se incluyan en el commit.
- Solo se puede usar `git commit -am "..."` si estÃ¡s 100% seguro de que:
    - No se ha creado ningÃºn archivo nuevo.
    - Solo se estÃ¡n modificando archivos ya existentes.

### ðŸ” RevisiÃ³n antes de cada commit

- Usar `git status` para confirmar quÃ© archivos estÃ¡n modificados, aÃ±adidos o no incluidos.
- Confirmar que no se han olvidado archivos importantes (componentes .vue, tailwind.config.js, etc.).

### ðŸ§ª ValidaciÃ³n antes de confirmar cambios

- Se debe validar la funcionalidad en entorno local (navegador o PWA) antes de hacer el commit.
- En bloques complejos, validar tambiÃ©n en Android o emuladores si aplica.
- El commit debe realizarse despuÃ©s de la validaciÃ³n, no antes.

### ðŸ§­ OrganizaciÃ³n por bloques

- Cada tarea del roadmap debe cerrarse con un commit propio.
- Si se trata de un bloque largo, puede dividirse en varios commits, pero todos deben ser claros y seguir la convenciÃ³n.
- No se deben agrupar cambios de distintas tareas en un solo commit.

### ðŸ·ï¸ Tags y versiones

- Las versiones estables se etiquetan en la rama main con:
    git tag v1.X.Y -m "DescripciÃ³n del release"
    git push origin v1.X.Y

- Esto debe hacerse solo tras merge a main y validaciÃ³n completa.

---

## Funcionalidades y decisiones tÃ©cnicas

### Sistema de toasts

Se reemplazÃ³ la librerÃ­a externa `vue-sonner` por un sistema de notificaciones propio inspirado en Nocta.  
Motivos:
- Mayor control visual y de interacciÃ³n  
- Mejor integraciÃ³n con el diseÃ±o y lÃ³gica de Notifica  
- EliminaciÃ³n de dependencias innecesarias  

El sistema se basa en:
- `Toast.vue`: componente individual de notificaciÃ³n  
- `useToast.ts`: composable para gestionar estado reactivo de los toasts y control de cierre  
- `toast.ts`: funciÃ³n `add(...)` para mostrar toasts desde cualquier lugar  
- `<Teleport>` y `<TransitionGroup>` en `App.vue` para renderizar toasts fuera del flujo principal  

Mejoras aplicadas respecto a Nocta:
- Soporte para uno o varios botones de acciÃ³n mediante `actions[]` con `label` y `onClick`  
- Estilo animado en botones de acciÃ³n (`scale-95` al pulsar)  
- AnimaciÃ³n al montar el botÃ³n (`animate-pop` tras 300â€¯ms en el primero)  
- Cierre diferido del toast para permitir ver la animaciÃ³n de pulsaciÃ³n  
- SeparaciÃ³n clara entre ejecuciÃ³n de acciÃ³n y cierre visual del toast  
- Estilos personalizados por tipo (`success`, `info`, `error`, `warning`) con icono SVG, fondo pastel y bordes redondeados  
- Layout compacto y centrado (`max-w-xs`), con margen inferior ajustado para evitar conflicto con barras de sistema  
- Apilamiento dinÃ¡mico con animaciÃ³n de transiciÃ³n (`translate-y` y `opacity`) al reordenarse  
- IntegraciÃ³n visual coherente con el resto de la interfaz (colores, botones, tipografÃ­a)  
- Comportamiento corregido en PWA iOS: el botÃ³n de acciÃ³n ya reacciona correctamente al tacto (`@touchstart`)  
- Bloqueo de selecciÃ³n de texto en todo el toast (`select-none`) para evitar comportamiento inesperado en mÃ³viles  

Nuevas capacidades aÃ±adidas:
- `delayClose`: los toasts no se cierran automÃ¡ticamente. El temporizador de cierre solo se activa tras pulsar fuera del toast. Permite mantener opciones activas como â€œDeshacerâ€ el tiempo que el usuario necesite.  
- `startDismissTimer(id, duraciÃ³n?)`: se exporta desde `useToast.ts` para iniciar el cierre manual desde fuera  
- DetecciÃ³n automÃ¡tica de tap fuera en `Toast.vue` si `delayClose` estÃ¡ activo (evento `pointerdown`)  
- Soporte para `actions.length > 1`: se renderizan todos los botones en fila con estilo consistente  
- Preparado para `persistent: true` en el futuro (toast que solo se cierra con âœ• o interacciÃ³n explÃ­cita)  

Estado de validaciÃ³n:
- Comprobado y validado en escritorio, Android nativo, PWA Android y PWA iOS  
- Todos los toasts funcionales, consistentes y con cierre progresivo segÃºn lo esperado  
- El sistema mantiene retrocompatibilidad con toasts simples sin acciÃ³n  
- No se han detectado problemas de eventos en mÃ³viles ni pÃ©rdidas de reactividad  

Este sistema puede reutilizarse o retroportarse a Nocta con pequeÃ±as adaptaciones, manteniendo una base comÃºn de diseÃ±o, UX y lÃ³gica.

Tareas pendientes o ideas futuras:
- (Opcional) AÃ±adir variante `persistent` para banners que solo se cierren manualmente  
- (Opcional) AÃ±adir barra de progreso visual o transiciÃ³n de opacidad en cierre tras tap fuera  
- (Opcional) Resaltar brevemente el contenido afectado por la acciÃ³n (e.g. Deshacer)  
- (Opcional) Documentar ejemplo de uso avanzado con mÃºltiples acciones o `onDismiss`

### Paleta clara validada para modo light

[24/07/2025]  
Esta es la versiÃ³n final validada de la paleta clara de Notifica.  
Se considera estable y es la base oficial sobre la que se definirÃ¡ el modo oscuro.  
Incluye tokens personalizados organizados por propÃ³sito, con semÃ¡ntica clara y coherencia visual validada en app real.

**Superficies y contornos:**

- `app-bg`: fondo general de la app â†’ `#f5f7fa`
- `surface-1`: tarjetas, contenedores, etc. â†’ `#ffffff`
- `surface-hover`: hover sobre elementos claros â†’ `#e2e8f0`
- `surface-pressed`: al pulsar botones claros â†’ `#e5e7eb`
- `surface-thumb`: fondo del pulgar en toggles â†’ `#ffffff`
- `divider`: lÃ­neas divisorias, contornos suaves â†’ `#cbd5e1`

**Controles y acciÃ³n principal:**

- `accent-main`: botones principales y elementos destacados â†’ `#93c5fd`
- `toggle-inactive`: fondo de switches desactivados â†’ `#cbd5e1`

**Estados visuales (semÃ¡nticos):**

- `status-success`: fondo verde claro para tareas finalizadas â†’ `#d1fae5`
- `status-success-hover`: hover sobre botones de Ã©xito â†’ `#a7f3d0`
- `status-success-dark`: placeholder para modo oscuro â†’ `#a7f3d0`
- `status-success-dark-hover`: idem â†’ `#6ee7b7`

- `status-alert`: estado de advertencia â†’ `#fecaca`
- `status-active`: amarillo activo (ej. tarea pendiente) â†’ `#fef08a`
- `status-inprogress`: gris azulado (estado intermedio) â†’ `#cbd5e1`

- `status-accent`: fondo azul pastel para acciones â†’ `#bfdbfe`
- `status-accent-hover`: hover sobre botones azules â†’ `#93c5fd`

- `status-danger`: acciones destructivas â†’ `#fecaca`
- `status-danger-hover`: hover para confirmar eliminaciÃ³n â†’ `#fca5a5`

- `status-purple`: morado pastel para botones secundarios â†’ `#ddd6fe`
- `status-purple-hover`: hover morado claro â†’ `#c4b5fd`
- `status-purple-dark`: placeholder dark â†’ `#c4b5fd`
- `status-purple-dark-hover`: placeholder dark â†’ `#a78bfa`

*Nota:* Algunos colores coinciden entre `alert`, `danger`, `error`, etc. por decisiÃ³n semÃ¡ntica. Se mantienen como tokens separados para permitir diferenciaciÃ³n futura.

**Texto:**

- `main`: texto primario â†’ `#334155`
- `on-pastel`: texto oscuro sobre fondo pastel â†’ `#1e293b`
- `subtle`: texto secundario o complementario â†’ `#64748b`
- `placeholder`: inputs y texto gris tenue â†’ `#94a3b8`
- `muted-80`: texto desactivado con opacidad â†’ `rgba(148, 163, 184, 0.8)`

**Texto fuerte por tipo:**

- `success-strong`: `#047857`
- `alert-strong`: `#b91c1c`
- `danger-strong`: `#b91c1c`
- `active-strong`: `#b45309`
- `accent-strong`: `#2563eb`
- `purple-strong`: `#6d28d9`

**Turnos:**

- `shift-morning`: amarillo â†’ `#facc15`
- `shift-afternoon`: naranja â†’ `#f59e0b`
- `shift-night`: azul oscuro â†’ `#6366f1`

**Turnos en modo oscuro (placeholder):**

- `shift-morning-dark`: `#fde68a`
- `shift-afternoon-dark`: `#fcd34d`
- `shift-night-dark`: `#a5b4fc`

**Toasts:**

- `toast-success`: fondo â†’ `#ecfdf5`
- `toast-success-action`: botÃ³n â†’ `#d1fae5`
- `toast-success-action-hover`: hover â†’ `#bbf7d0`
- `toast-success-border`: borde â†’ `#a7f3d0`
- `toast-success-text`: texto principal â†’ `#15803d`
- `toast-success-action-text`: botÃ³n â†’ `#16a34a`
- `toast-success-close`: icono cerrar â†’ `#22c55e`
- `toast-success-close-hover`: hover cerrar â†’ `#166534`

- `toast-error`: fondo â†’ `#fef2f2`
- `toast-error-action`: botÃ³n â†’ `#fee2e2`
- `toast-error-action-hover`: hover â†’ `#fecaca`
- `toast-error-border`: borde â†’ `#fecaca`
- `toast-error-text`: texto principal â†’ `#b91c1c`
- `toast-error-action-text`: botÃ³n â†’ `#dc2626`
- `toast-error-close`: icono cerrar â†’ `#f87171`
- `toast-error-close-hover`: hover cerrar â†’ `#991b1b`

- `toast-warning`: fondo â†’ `#fefce8`
- `toast-warning-action`: botÃ³n â†’ `#fef9c3`
- `toast-warning-action-hover`: hover â†’ `#fef08a`
- `toast-warning-border`: borde â†’ `#fde68a`
- `toast-warning-text`: texto â†’ `#a16207`
- `toast-warning-action-text`: botÃ³n â†’ `#ca8a04`
- `toast-warning-close`: cerrar â†’ `#eab308`
- `toast-warning-close-hover`: hover cerrar â†’ `#92400e`

- `toast-info`: fondo â†’ `#eff6ff`
- `toast-info-action`: botÃ³n â†’ `#dbeafe`
- `toast-info-action-hover`: hover â†’ `#bfdbfe`
- `toast-info-border`: borde â†’ `#bfdbfe`
- `toast-info-text`: texto â†’ `#1d4ed8`
- `toast-info-action-text`: botÃ³n â†’ `#2563eb`
- `toast-info-close`: cerrar â†’ `#60a5fa`
- `toast-info-close-hover`: hover cerrar â†’ `#1e40af`

**Notas:**

- Todos los tokens estÃ¡n definidos como `textColor`, `backgroundColor` o `borderColor` para asegurar que Tailwind genere las clases correspondientes.
- Validado en app real (mÃ³vil y escritorio).
- Estilo pastel deliberado, sin redundancias tÃ©cnicas.
- Listo para derivar la versiÃ³n `dark`. Los `*-dark` actuales son marcadores provisionales.


### Exportar archivo JSON en Android

Problema: en Android nativo, la exportaciÃ³n por "a download" no generaba ningÃºn archivo visible.

SoluciÃ³n: se combinÃ³ @capacitor/filesystem (para guardar en Directory.Cache) con @capacitor/share para permitir compartir el archivo .json generado.

Resultado:
- En PWA/navegador, se mantiene la descarga directa como antes.
- En Android, se lanza un diÃ¡logo para compartir el archivo con apps compatibles (Drive, Gmail, etc.).

LimitaciÃ³n aceptada: no siempre aparece una opciÃ³n de "Guardar en Archivos"; depende del dispositivo y apps instaladas.

FunciÃ³n validada como completa y estable.

### Capacitor Share: problema con compartir en Android

**SÃ­ntoma:**  
El botÃ³n "Compartir" funcionaba correctamente en PWA, pero no mostraba el diÃ¡logo nativo en la app Android instalada. En algunos casos mostraba solo el toast de "copiado al portapapeles", y en otros lanzaba errores.

**DiagnÃ³stico:**
- El botÃ³n usaba `@capacitor/share`, correctamente instalado y sincronizado.
- El cÃ³digo estaba bien estructurado, pero el comportamiento en Android no reflejaba los cambios del frontend (ni el botÃ³n de test se mostraba).
- Se detectÃ³ que no se estaba ejecutando `npm run build` tras los cambios en el frontend, por lo que la app nativa no incluÃ­a los cambios.

**SoluciÃ³n:**
1. Ejecutar `npm run build` para compilar el frontend.
2. Ejecutar `npx cap copy android` para copiar los archivos a `/android/app/src/main/assets/public`.
3. Recompilar la app desde Android Studio.

Esto permitiÃ³ que la versiÃ³n instalada mostrara correctamente el botÃ³n y ejecutara el diÃ¡logo nativo de compartir.

**ConclusiÃ³n:**
Cada vez que se hagan cambios en la interfaz o lÃ³gica del frontend:
- Ejecutar `npm run build`
- Luego `npx cap copy android`
- Luego `npx cap open android`
- Y recompilar desde Android Studio.

AsÃ­ se asegura que la app nativa use los archivos mÃ¡s recientes.

### Aviso temporal de novedades y migracion a app Android

**Contexto:**  
Durante la fase de lanzamiento 2026 se añadio una pieza de UI temporal para comunicar la nueva release acumulada en `develop` y, cuando procede, derivar a la app Android en Google Play.  
La solucion no se diseño como sistema permanente de anuncios, sino como apoyo puntual al cierre de lanzamiento y a la migracion desde la PWA.

**Implementacion:**  
- Se creo el componente `src/components/ReleaseNoticeBanner.vue`.
- La logica de visibilidad y persistencia se centralizo en `App.vue`.
- El estado de cierre se guarda en `localStorage` con una clave dedicada.
- El aviso puede reabrirse desde `SideMenu.vue` mediante una entrada discreta `Novedades`.
- Los textos viven en `src/locales/es.ts` y `src/locales/en.ts`, siguiendo el sistema i18n ya existente.

**Comportamiento por plataforma:**  
- Android nativa:
  - No muestra banner.
  - No muestra entrada `Novedades` en el menu lateral.
- Android web / PWA y web no iOS:
  - Muestra banner.
  - Incluye CTA a Google Play.
- iOS web / PWA:
  - Muestra banner.
  - No incluye CTA a app nativa.
  - Usa copy especifico orientado a explicar que la actualizacion tambien mejora la experiencia en iPhone y iPad.

**Criterio UX:**  
- El aviso es persistente pero descartable.
- Debe integrarse visualmente con la app, sin parecer un toast ni una pantalla aparte.
- Se prioriza claridad, cierre facil y reentrada discreta desde el menu.
- El sistema es deliberadamente temporal y debera revisarse tras el lanzamiento real para decidir si se retira, se simplifica o se reaprovecha.

**Validacion:**  
- Validado en iOS PWA instalada.
- Validado en iOS web.
- Validado en Android web / PWA.
- Validado en Android nativa (ausencia correcta del sistema).
- Validado en web escritorio no iOS.

### Enfoque estratÃ©gico de publicaciÃ³n (etapa 8)

Durante la etapa 8 del roadmap, centrada en preparar la publicaciÃ³n de la app en Google Play, se identificÃ³ un requisito no previsto: el sistema exige un periodo mÃ­nimo de pruebas internas o cerradas con al menos 12 testers activos durante 14 dÃ­as para habilitar el lanzamiento abierto.

Este descubrimiento generÃ³ una aceleraciÃ³n artificial del flujo de trabajo, con prioridad inmediata sobre la validaciÃ³n de la APK y la PWA. Como consecuencia, se acumularon tareas tÃ©cnicas, revisiones visuales y mejoras funcionales menores que empezaron a percibirse como urgentes.

Tras una revisiÃ³n del estado real del proyecto y de su uso actual, se tomÃ³ la decisiÃ³n de priorizar la estabilidad, la claridad y la orientaciÃ³n a producto a largo plazo. Se reorganizÃ³ la etapa 8 del roadmap en consecuencia:

- Se pospuso el testing real de la APK al final del bloque.
- Se incorporaron mejoras estructurales opcionales con visiÃ³n de producto (modo oscuro, multidioma, ayuda al usuarioâ€¦).
- Se confirmÃ³ que la versiÃ³n actual es funcional y estable, y que los usuarios activos ya la utilizan con normalidad desde hace semanas.
- Se reafirmÃ³ que la app se estÃ¡ desarrollando como un producto potencialmente Ãºtil para un pÃºblico mÃ¡s amplio, mÃ¡s allÃ¡ del entorno inmediato, apostando por la calidad y manteniendo la sencillez.

Esta decisiÃ³n permitiÃ³ devolver el control del ritmo de desarrollo al criterio interno, evitando decisiones precipitadas basadas en plazos externos.

### EliminaciÃ³n del reload tras deshacer "Borrar todo"

[20/07/2025]  
Se eliminÃ³ la llamada a `window.location.reload()` que se ejecutaba al cerrar el toast de â€œTareas Restauradasâ€ tras usar el botÃ³n de deshacer en la operaciÃ³n de â€œBorrar todoâ€.

**Motivo del cambio:**  
En el flujo actual, si el usuario borra todas las tareas, luego pulsa â€œDeshacerâ€, y posteriormente vuelve a pulsar â€œBorrar todoâ€ antes de que el primer toast se cierre automÃ¡ticamente, la app se recarga al cerrar ese primer toast.  
Esto provoca que el segundo toast desaparezca de forma inmediata e irreversible, lo que impide restaurar las tareas, causando una **pÃ©rdida de datos no recuperable**.

**JustificaciÃ³n tÃ©cnica:**  
- `allTasks.value = [...]` ya es completamente reactivo.
- Se usa `nextTick()` correctamente para asegurar reactividad antes de cerrar el toast anterior.
- La recarga ya no es necesaria para limpiar el estado ni corregir glitches visuales.
- El comportamiento actual rompe la UX y anula el botÃ³n "Deshacer" si el usuario actÃºa rÃ¡pidamente.

**DecisiÃ³n:**  
Se elimina por completo la propiedad `onDismiss` del toast de restauraciÃ³n. No se deja funciÃ³n vacÃ­a.  
La restauraciÃ³n ahora es fluida, reactiva y sin recarga forzada.

Este cambio debe mantenerse salvo que una futura regresiÃ³n demuestre necesidad real de una recarga manual (lo cual no es el caso actual).

### TransiciÃ³n visual global en cambio de tema (modo claro â†” oscuro)

**Objetivo:**  
Permitir una transiciÃ³n visual suave cuando el usuario activa o desactiva el modo oscuro, sin parpadeos ni cambios bruscos, y sin romper otras transiciones como la pulsaciÃ³n de botones.

**DiagnÃ³stico inicial:**  
- Se intentÃ³ aplicar una transiciÃ³n global con `* { transition: background-color, color, ... }` a 2500â€¯ms.
- Funcionaba bien en algunos elementos (fondos de tareas, contenedores), pero no se aplicaba a botones e inputs.
- Algunos botones (como los que contienen solo iconos SVG) sÃ­ aplicaban la transiciÃ³n correctamente, lo que indicaba que no era un problema de `transition-property`, sino de selectores.

**Pruebas y hallazgos:**
- AÃ±adir una regla especÃ­fica para `button, input, textarea` permitiÃ³ aplicar tambiÃ©n la transiciÃ³n a estos elementos.
- Se confirmÃ³ que Tailwind aplica estilos base especÃ­ficos a botones e inputs que podÃ­an anular reglas genÃ©ricas.
- Se detectÃ³ que con `transition-duration: 2500ms` tambiÃ©n se veÃ­an afectadas animaciones de pulsaciÃ³n (por ejemplo, el feedback visual al hacer clic en un botÃ³n), que se volvieron lentas e imprecisas.

**SoluciÃ³n intermedia aplicada:**
- Se definieron dos bloques CSS explÃ­citos:  
  1. Uno para `*` que define la transiciÃ³n global con `transition-property: background-color, border-color, color, fill, stroke;`.
  2. Otro para `button, input, textarea` que replica la misma transiciÃ³n (para asegurar aplicaciÃ³n uniforme).

- Se bajÃ³ la duraciÃ³n global de transiciÃ³n a `300ms`, lo que permitÃ­a:
  - Una transiciÃ³n clara y fluida al cambiar de modo claro â†” oscuro.
  - Mantener animaciones rÃ¡pidas e intuitivas para interacciÃ³n con botones.

**Resultado intermedio:**
- TransiciÃ³n global de color coherente, incluida en botones e inputs.
- Compatible con pulsaciones y otras interacciones rÃ¡pidas.
- Validado en navegadores de escritorio, Android y PWA iOS.

**ActualizaciÃ³n 26/07/2025 â€“ EliminaciÃ³n de la transiciÃ³n global `*`**

**Problema detectado:**  
En PWA iOS (Safari y Chrome instaladas como standalone), al pasar de modo oscuro a claro, los textos (como la descripciÃ³n y horas) quedaban durante varios segundos en color blanco, generando una pantalla aparentemente vacÃ­a sobre fondo claro.

**Causa confirmada:**  
La regla global `* { transition: background-color, border-color, color, fill, stroke; }` en `animations.css` era la responsable.  
iOS WebKit presenta problemas de repintado cuando se combinan:
- Cambios de color heredados por la clase `.dark` en `<html>`.
- `transition: color` heredado globalmente por todos los nodos.
- ReestructuraciÃ³n visual con `Transition` o `TransitionGroup`.

**SoluciÃ³n final aplicada:**  
- Se eliminÃ³ por completo la regla global `*` de `animations.css`.
- El cambio fue validado en entorno real: el bug desapareciÃ³ y el cambio de tema es ahora inmediato, sin flashes ni retardos.
- Se comprobÃ³ que eliminar la transiciÃ³n global no afecta negativamente a la UX.  
  De hecho, el cambio de tema se percibe ahora como mÃ¡s natural y directo.

**DecisiÃ³n final:**  
No se volverÃ¡ a introducir transiciÃ³n global para colores.  
Si se desea animaciÃ³n en puntos especÃ­ficos (botones, contenedores), se usarÃ¡ `transition-colors` de forma localizada.

**Estado actual:**  
- SoluciÃ³n robusta y sin efectos secundarios.
- Cierre validado del subbloque 5 del modo oscuro en el roadmap.

### InicializaciÃ³n temprana del modo oscuro en `main.ts`

[27/07/2025]  
Para evitar el efecto de **render mixto** (pantalla inicial en modo incorrecto durante unos milisegundos antes de aplicar el tema), se decidiÃ³ aplicar la clase `dark` **antes de montar la app**.

**Motivo:**  
Al usar `darkMode: 'class'` en Tailwind, la clase `dark` debe estar presente en el DOM en el momento del render inicial. Si se espera a que Vue cargue o que reactive el estado de `isDark`, el primer frame de la interfaz puede mostrarse en modo claro y luego saltar visualmente al modo oscuro, causando un efecto de parpadeo o mezcla de estilos.

**ImplementaciÃ³n:**  
En `main.ts`, antes de `createApp(App).mount(...)`, se ejecuta la siguiente lÃ³gica:

- Se lee `darkMode` desde `localStorage` (puede ser `'light'`, `'dark'` o `'system'`).
- Si no hay valor guardado o el valor es `'system'`, se consulta `window.matchMedia(...)`.
- Si el resultado es que debe usarse el modo oscuro, se aÃ±ade manualmente la clase `dark` al `<html>`:
  
      document.documentElement.classList.add('dark')

- Si no debe usarse, se asegura que la clase estÃ© ausente con `classList.remove(...)`.

Esto permite que **la app se renderice ya en el modo correcto** desde el primer milisegundo, sin flashes ni desincronizaciÃ³n visual.

**Estado actual:**  
- Validado en Android, PWA iOS, escritorio y dispositivos reales.
- Compatible con el sistema de preferencia `'light' | 'dark' | 'system'`.
- SoluciÃ³n robusta y aplicable a futuros proyectos con Tailwind y modo oscuro.

### AnimaciÃ³n colapsable del bloque de apariencia (max-height + scrollHeight)

[27/07/2025]  
Para permitir que el bloque de apariencia en el menÃº lateral (`SideMenu.vue`) pueda expandirse y contraerse con una transiciÃ³n fluida, se aplicÃ³ una tÃ©cnica basada en `max-height` y `scrollHeight`, combinada con eventos personalizados en el componente `<Transition>`.

**MotivaciÃ³n:**  
Las transiciones de altura con `v-if` o `v-show` no permiten animaciÃ³n suave, y `height: auto` no puede animarse directamente. Se necesitaba una soluciÃ³n que permitiera transiciÃ³n vertical sin salto, adaptable al contenido real.

**ImplementaciÃ³n:**  
- Al iniciar la apertura del bloque, se mide su altura real (`scrollHeight`) y se asigna como `max-height`, lo que permite una expansiÃ³n suave.
- Tras completarse la apertura, se limpia el `max-height` para no restringir futuras modificaciones dinÃ¡micas del contenido.
- Para cerrar, se vuelve a establecer el `scrollHeight` como `max-height` y luego se reduce a `0px`, generando un colapso animado.
- Toda esta lÃ³gica se gestiona mediante los hooks `onEnter`, `onLeave`, etc., definidos directamente en el componente.

**Complementos visuales:**  
- Se usa `overflow-hidden` para evitar que el contenido sea visible durante la animaciÃ³n de cierre.
- La duraciÃ³n, interpolaciÃ³n (`ease`), y otros efectos estÃ¡n definidos en las clases CSS asociadas a la transiciÃ³n `collapse`.

**Resultado:**  
- TransiciÃ³n suave y coherente al mostrar u ocultar el bloque de apariencia.
- Comportamiento robusto y validado en todos los entornos.
- PatrÃ³n reutilizable para cualquier otro bloque colapsable de la app.

### Modo oscuro: uso de `class` y soporte para preferencia del sistema

[27/07/2025]  
Para implementar el sistema de modo oscuro en Notifica se eligiÃ³ el enfoque `darkMode: 'class'` en Tailwind, en lugar de la opciÃ³n `media`.

**Motivos de la decisiÃ³n:**

- **Control total sobre el tema activo**  
  Con `class`, la app puede cambiar de modo claro a oscuro de forma manual o programada, sin depender del sistema operativo.  
  Esto permite al usuario seleccionar su preferencia independientemente del entorno (especialmente Ãºtil en PWA y apps nativas con comportamiento propio).

- **Persistencia de preferencia**  
  Al gestionar el modo manualmente (con una clase en `<html>`), es posible guardar la elecciÃ³n del usuario en `localStorage`, mantenerla entre sesiones, e ignorar cambios del sistema si asÃ­ lo desea.

- **Compatibilidad multiplataforma**  
  El enfoque basado en `media` (matchMedia) es reactivo pero no controlable por el usuario si no se implementa una capa adicional.  
  En iOS PWA, algunas actualizaciones de estilo pueden fallar al depender solo de `media queries`.  
  AdemÃ¡s, con `class` se puede aplicar la clase correcta incluso **antes de que Vue se monte**, evitando parpadeos o flashes (ver bloque sobre inicializaciÃ³n temprana en `main.ts`).

**IntegraciÃ³n con la preferencia `'system'`:**

- El valor `'system'` se gestiona como una tercera opciÃ³n vÃ¡lida (`light`, `dark`, `system`) en la app.
- Si el usuario selecciona `'system'`, se evalÃºa el resultado de `matchMedia('(prefers-color-scheme: dark)')`.
- Se observa esa preferencia de forma reactiva, y se actualiza la clase `dark` cuando el sistema cambia de modo.
- Si el usuario cambia su selecciÃ³n manualmente, se detiene la escucha y se fuerza el modo elegido.

**Resultado:**  
- Sistema flexible, reactivo y respetuoso con el usuario.
- Visualmente estable, sin flashes ni parpadeos en la carga.
- Validado en dispositivos con cambios dinÃ¡micos de tema (Android, iOS, escritorio).
- PatrÃ³n sÃ³lido para futuras apps con necesidades similares de theming.

### Notas por turno: sistema editable vinculado a shiftId

**MotivaciÃ³n y propÃ³sito:**  
Se aÃ±adiÃ³ este sistema para permitir al usuario registrar observaciones o comentarios asociados a un turno especÃ­fico, sin necesidad de crear tareas estructuradas. Esto permite anotar detalles complementarios de forma libre, como incidencias menores, observaciones de proceso, entregas pendientes o cualquier otra informaciÃ³n no formalizable como tarea.

**Estructura tÃ©cnica:**  
- El almacenamiento de notas se gestiona mediante el composable `useNotes.ts`, que mantiene un objeto reactivo con claves `shiftId` y valores `string[]`.
- Las notas se guardan en `localStorage` bajo el objeto `notesByShiftId`.
- Cada turno puede tener una lista de notas independiente. Las actualizaciones se hacen a travÃ©s de `setNotesForShift()` y `deleteNotesForShift()`.

**IntegraciÃ³n visual y UX:**  
- El bloque visual se encuentra al final de `TaskList.vue`, despuÃ©s de las tareas.
- Se muestra un botÃ³n colapsable con el tÃ­tulo â€œNotas del turnoâ€, un icono y un contador de notas activas.
- Al expandirse, aparece una lista editable de campos tipo `textarea`. Su comportamiento incluye:
  - Siempre hay una lÃ­nea vacÃ­a al final para facilitar entrada encadenada.
  - Al hacer `blur`, las notas vacÃ­as se eliminan automÃ¡ticamente.
  - Si se modifica una nota existente, se actualiza en tiempo real.
  - El bloque permanece accesible incluso si todas las notas son borradas, pero se muestra colapsado por defecto en ese caso.
- La detecciÃ³n de `blur`, `enter` y el estado del Ãºltimo campo se gestionan para permitir una experiencia fluida sin botones explÃ­citos de guardar.

**Persistencia y comportamiento reactivo:**  
- Las notas se sincronizan automÃ¡ticamente tras cada ediciÃ³n, sin necesidad de acciÃ³n manual del usuario.
- Internamente se mantiene siempre un array limpio de `string[]`, sin notas vacÃ­as.
- El sistema es compatible con sesiones anteriores: si un usuario importa un backup antiguo que no contiene `notesByShiftId`, el sistema lo ignora sin errores ni efectos colaterales.

**ExportaciÃ³n / ImportaciÃ³n:**  
- En los backups `.json`, se incluye `notesByShiftId` junto al resto de claves como `tasks`.
- En la exportaciÃ³n de texto plano, si existen notas para el turno exportado, se aÃ±aden al final del contenido con el siguiente formato:

    ðŸ—’ï¸ Notas:
     - Primera nota
     - Segunda nota

- Durante la importaciÃ³n, si `notesByShiftId` estÃ¡ presente y es vÃ¡lido, se restaura mediante `setAllNotes()`. TambiÃ©n se toma en cuenta para determinar el turno mÃ¡s reciente tras la importaciÃ³n.

**Estilo visual final:**  
- Se igualÃ³ el ancho del bloque al de las tarjetas de tareas para mantener la coherencia del layout.
- Se mantuvieron las esquinas redondeadas (`rounded-xl`) para integrar visualmente el bloque con el resto de la app.
- Se aplicÃ³ un diseÃ±o que evoca una hoja de cuaderno:
  - LÃ­nea vertical roja (`status-alert`) como margen izquierdo.
  - `textarea` con indentaciÃ³n (`pl-10`) para ubicar el texto tras la lÃ­nea.
  - LÃ­neas horizontales completas mediante `border-b-2`, alineadas con el resto del layout.
- El diseÃ±o es totalmente compatible con modo claro y oscuro.

**ValidaciÃ³n y resoluciÃ³n de bugs:**  
- Validado en escritorio, PWA Android, PWA iOS y APK Android real.
- Se detectÃ³ un bug que impedÃ­a visualizar el `placeholder` del campo vacÃ­o tras una recarga si no habÃ­a notas. Se resolviÃ³ aÃ±adiendo una llamada a `autoResize()` del Ãºltimo campo tras la animaciÃ³n de entrada (`onAfterEnter`).
- Se confirmÃ³ que el Ã¡rea de clic era limitada en ese estado, pero el problema desapareciÃ³ tras resolver el bug anterior.


### Utilidad para generar datos mock

Se creÃ³ un script auxiliar en `/dev-tools/mock-data/generateMock.cjs` junto con listas editables de descripciones, tÃ©cnicos y notas.  
Este script permite generar archivos JSON de ejemplo con la misma estructura que la app, para usarlos en pruebas y capturas oficiales.

**Funcionamiento:**
- Al ejecutarlo (`node dev-tools/mock-data/generateMock.cjs`) solicita en consola:
  - Fecha inicio y fin
  - NÃºmero de tramos por dÃ­a
  - NÃºmero de tareas por tramo
  - Ratio de tareas completadas
  - Ratio de tareas registradas
  - DuraciÃ³n mÃ­nima y mÃ¡xima de tareas
  - Offset horario local (ej. +2)
  - NÃºmero mÃ¡ximo de notas por tramo
- Con estos datos genera un archivo JSON en `dev-tools/mock-data/output/mock-YYYY-MM-DD-HH-MM.json`.

**Uso previsto:**  
Sirve para poblar la aplicaciÃ³n con datos realistas de prueba, facilitando la validaciÃ³n de funciones y la creaciÃ³n de capturas de pantalla consistentes.  
Las listas base (`tasks.json`, `names.json`, `notes.json`) pueden ampliarse para dar mÃ¡s variedad al generador.

---

## Errores y problemas documentados

### Bug en iOS PWA: scroll azul tras cerrar teclado
[Resuelto 20/07/25]

DescripciÃ³n:  
En PWA instalada en iPhone, tras cerrar el teclado virtual de un `<input>` o `<textarea>`, si el usuario hace doble tap en el fondo de la app, aparece una franja vacÃ­a azul en la parte inferior. Su altura coincide con el layout visible (header, tareas, etc.).

Estado actual:
- No ocurre al abrir la app, solo tras mostrar/ocultar el teclado.
- El scroll aparece aunque el contenido no exceda el viewport.
- Solo ocurre en modo PWA standalone de iOS (no en Safari o Chrome).

Intentos de soluciÃ³n:
- `scrollTo(0, 0)` tras blur â†’ no resuelve
- `overflow-hidden`, `min-h-[100svh]` y ajustes de layout â†’ no resuelve
- AÃ±adir `viewport-fit=cover` en meta viewport â†’ no resuelve
- Bloquear `touchmove` durante focus de inputs â†’ no resuelve
- Detectar y resetear scroll manualmente tras teclado â†’ tampoco efectivo

ConclusiÃ³n:
- Bug confirmado como fallo persistente de WebKit iOS.
- No tiene workaround robusto ni soluciÃ³n fiable sin introducir efectos secundarios.
- Dado que no rompe el uso normal y solo es visible si se fuerza, se descarta temporalmente.

Puede reintentarse en el futuro si hay avances en iOS o mejores soluciones conocidas.

[20/07/2025]  
Tras aplicar estilos globales (`touch-action: manipulation` y `-webkit-text-size-adjust: 100%`) al `<html>` y `<body>` desde `main.css`, el bug ya no se reproduce.

Verificado en:
- PWA iOS (instalada desde Safari)
- Chrome iOS
- App abierta tras cerrar teclado y realizar mÃºltiples interacciones

**El hueco azul al hacer doble tap en Ã¡rea vacÃ­a ha desaparecido completamente.**  
Se considera solucionado de forma estable y no regresiva.

No se aplicaron cambios adicionales de layout ni soluciones agresivas.  
El bug queda cerrado y documentado.

### Problemas comunes en emuladores Android

**Pantalla blanca tras splash o dispositivo desconectado (API 29):**

**SÃ­ntomas:**
- La app se instala pero queda en blanco tras la splash.
- No se muestran errores en Logcat.
- A veces el emulador aparece como â€œofflineâ€ (`adb devices â†’ device offline`).
- La app no responde o el sistema no la lanza tras la instalaciÃ³n.

**DiagnÃ³stico:**
- El sistema WebView estÃ¡ roto o no instalado, especialmente tras hacer `Wipe Data` en emuladores con Android 9â€“10.
- TambiÃ©n puede deberse a errores internos del emulador tras actualizaciones o limpiezas de proyecto.

**Soluciones:**
- Actualizar WebView desde Play Store dentro del emulador:
  - Abrir Play Store > "Mis apps > Actualizaciones pendientes".
  - Actualizar **Android System WebView** manualmente.
- Hacer `Wipe Data` al emulador si:
  - EstÃ¡ en estado `offline` persistente.
  - No lanza la app aunque la build se haya completado sin errores.
  - Se ha producido un fallo visual o de sistema sin causa clara.

**RecomendaciÃ³n:**
- Tras un `Wipe Data` en emuladores Android 9â€“10:
  - Verificar conexiÃ³n ADB (`adb devices` debe decir `device`).
  - Abrir Play Store y actualizar WebView antes de lanzar la app.
- Si el error persiste:
  - Cerrar el emulador, repetir `Wipe Data`, o recrearlo desde AVD Manager.

### ValidaciÃ³n de bugs: scroll y animaciÃ³n toast

[20/07/2025]  
Se validaron dos bugs registrados previamente en la secciÃ³n de mejoras UX/UI y se confirmÃ³ que ya no se reproducen en la versiÃ³n actual:

- **Scroll innecesario en listas cortas**  
  No se observa scroll vertical extra en vistas con 1â€“2 tareas. Verificado en navegador (modo mÃ³vil), PWA iOS, Android nativo y emulador.  
  Se considera corregido por los ajustes de layout ya aplicados en bloques anteriores.

- **BotÃ³n â€œDeshacerâ€ sin animaciÃ³n al pulsar**  
  La animaciÃ³n `scale-95` funciona correctamente al pulsar â€œDeshacerâ€ en los toasts. Verificado en todos los entornos.  
  No ha sido necesario aplicar cambios adicionales. Se considera resuelto.

No se ha modificado cÃ³digo funcional. Se registra como validaciÃ³n de cierre.

### LimitaciÃ³n: clases dinÃ¡micas de color en SVG con funciones personalizadas

[21/07/2025]

Los iconos SVG del selector de turno no mostraban color al aplicar clases personalizadas como `text-shift-morning`, aunque estas aparecÃ­an correctamente en el DOM y el CSS generado era vÃ¡lido.

Se descartaron mÃºltiples causas: safelist, uso de `textColor`, `stroke-current`, herencia de clase desde `defineComponent`, etc. El color solo se aplicaba si se usaban clases estÃ¡ticas como `text-yellow-400`.

Se concluye que Tailwind no aplica correctamente clases `text-*` generadas desde funciones dinÃ¡micas si no estÃ¡n referenciadas literalmente en el cÃ³digo fuente.

**SoluciÃ³n aplicada:**
  - Reescribir `getShiftColor()` para devolver directamente clases estÃ¡ndar (`text-yellow-400`, etc.).
  - Incluir lÃ³gica por modo claro/oscuro usando `isDark.value`.

Ejemplo:
  if (icon === 'sun') return isDark.value ? 'text-yellow-300' : 'text-yellow-400'

Esta soluciÃ³n funciona correctamente, permite personalizaciÃ³n dual y se considera definitiva.

### LimitaciÃ³n: clases dinÃ¡micas de Tailwind no aplicadas

[21/07/2025]

**SÃ­ntomas detectados:**  
Las clases como `text-shift-*` no se aplicaban correctamente a los iconos SVG del selector de turno, aunque aparecÃ­an correctamente en el DOM. Los iconos aparecÃ­an en color gris por defecto (sin aplicar `fill` ni `text-*`).

**DiagnÃ³stico:**  
Tailwind no interpreta clases generadas dinÃ¡micamente en tiempo de ejecuciÃ³n (como `'text-' + color`) porque su sistema de purgado elimina todas las clases no mencionadas literalmente en el cÃ³digo fuente.  
Esto impide usar funciones como `getShiftColor()` que devuelven una clase basada en lÃ³gica condicional si no hay una referencia literal a cada clase implicada.

**HipÃ³tesis descartadas:**  
- Conflictos con clases `bg-white`, `fill-current` o `stroke-current`: sin efecto.  
- Error de lÃ³gica en `getShiftIcon` o `shiftId`: descartado tras depuraciÃ³n.  
- Bug de WebKit o renderizado de SVG: no aplicaba.  
- Uso de `safelist` o constante dummy con nombres de clase: probado y descartado (Tailwind no detecta clases en arrays si no se usan en el template o estilos inyectados).

**SoluciÃ³n aplicada:**  
Se creÃ³ un archivo centralizado `shiftColors.ts` con todas las combinaciones posibles de clases, referenciadas **de forma estÃ¡tica y literal**:

    // src/constants/shiftColors.ts
    export const shiftColors = {
      sun: {
        light: 'text-yellow-400',
        dark: 'text-yellow-300',
      },
      clock: {
        light: 'text-amber-400',
        dark: 'text-amber-300',
      },
      moon: {
        light: 'text-indigo-400',
        dark: 'text-indigo-300',
      },
    }

En el composable `useShifts.ts`, se usa `getShiftIcon()` para mapear el turno a `sun | clock | moon`, y `isDark.value` para decidir el modo. La clase se obtiene asÃ­:

    import { shiftColors } from '../constants/shiftColors'
    import { useDarkMode } from './useDarkMode'

    const { isDark } = useDarkMode()

    export function getShiftColor(shiftId: string): string {
      const icon = getShiftIcon(shiftId)
      return shiftColors[icon][isDark.value ? 'dark' : 'light']
    }

Esta estructura garantiza que todas las clases estÃ©n en el cÃ³digo fuente como strings literales, lo que permite que Tailwind las compile correctamente incluso tras purgado.

**Estado actual:**  
Validado en todos los entornos (PWA iOS, Android, navegador).  
Los iconos SVG del selector de turno muestran el color correcto tanto en modo claro como oscuro.  
La soluciÃ³n es clara, mantenible y extensible a cualquier sistema de clases condicionadas.

### Bug con getShiftColor: diagnÃ³stico y soluciÃ³n definitiva

[21/07/2025]

**SÃ­ntomas observados:**  
Los iconos del selector de turno (sol, reloj, luna) y los textos asociados aparecÃ­an sin color o con estilos incorrectos tras refactorar el sistema de turnos.  
El DOM mostraba clases `text-*` en los `svg`, pero visualmente no se aplicaban los colores esperados.

**DiagnÃ³stico:**  
La funciÃ³n `getShiftColor()` devolvÃ­a clases de forma dinÃ¡mica, lo que provocaba que Tailwind no incluyera esas clases en el CSS generado si no estaban escritas de forma literal.  
El problema era que el nombre de la clase (`text-color`) se construÃ­a condicionalmente a partir del tipo de turno y del modo claro/oscuro.

**SoluciÃ³n aplicada:**  
Se creÃ³ un archivo `shiftColors.ts` con un objeto estÃ¡tico que mapea todas las combinaciones posibles de turno y modo a clases `text-*` literales de Tailwind.  
Esto garantiza que las clases estÃ©n presentes en el bundle final, evitando que el purgado de Tailwind las elimine.

    // src/constants/shiftColors.ts
    export const shiftColors = {
      sun: {
        light: 'text-yellow-400',
        dark: 'text-yellow-300',
      },
      clock: {
        light: 'text-amber-500',
        dark: 'text-amber-300',
      },
      moon: {
        light: 'text-indigo-500',
        dark: 'text-indigo-300',
      },
    }

    // src/composables/useShifts.ts
    import { shiftColors } from '@/constants/shiftColors'
    import { useDarkMode } from './useDarkMode'

    const { isDark } = useDarkMode()

    export function getShiftColor(shiftId: string): string {
      const icon = getShiftIcon(shiftId)
      return shiftColors[icon][isDark.value ? 'dark' : 'light']
    }

**Resultado actual:**  
- Confirmado que los iconos muestran el color correcto en modo claro y oscuro.  
- Las clases se aplican correctamente (`text-amber-500`, etc.) y se ven reflejadas en el DOM.  
- El sistema es limpio, escalable y preparado para migrar a una paleta personalizada cuando se finalice el modo oscuro.

**Tareas futuras relacionadas:**  
- Convertir estas clases base (`text-yellow-400`, etc.) a tokens personalizados pastel.  
- Eliminar de `tailwind.config.js` las clases `text-shift-*` si no estÃ¡n en uso.

### Bug con clases `text-*` no aplicadas por Tailwind (extend.colors vs extend.textColor)

**SÃ­ntoma observado**

- Las clases como `text-shift-morning`, `text-success-strong`, etc., no se aplicaban correctamente en SVGs o textos, aunque estaban definidas en `extend.colors`.
- Los elementos aparecÃ­an con color negro o sin estilo.

**DiagnÃ³stico**

- Tailwind purga todas las clases no literales.
- Las clases `text-*` no se generan si estÃ¡n solo en `extend.colors` y se usan de forma indirecta (desde funciones, objetos, o en SVGs).
- Este problema afectÃ³ tanto a `getShiftColor` como a los textos coloreados en `toastColors`.

**SoluciÃ³n**

- Mover estos colores a `theme.extend.textColor` (en lugar de `extend.colors`).
- Al hacer esto, Tailwind sÃ­ genera las clases correctamente.

**ValidaciÃ³n**

- Aplicado y validado en dos contextos:
  - Iconos de turno (`shiftColors.ts`)
  - Textos de toast y botones (`toastColors.ts`)
- Las clases se aplican correctamente sin usar `safelist` ni otros hacks.


### Bug con colores en toasts: diagnÃ³stico y soluciÃ³n

[21/07/2025]

Tras eliminar las clases hardcodeadas del sistema de toasts, los tipos `success`, `error`, `info` y `warning` no aplicaban correctamente sus colores.  
El uso de clases construidas dinÃ¡micamente (`bg-${type}-100`, ternarios en templates) fue descartado por no ser reconocido por Tailwind.

**SoluciÃ³n:**  
Se creÃ³ `toastColors.ts` con un mapa estÃ¡tico de clases por tipo y modo (`light` / `dark`).  
Las clases estÃ¡n escritas como strings literales para asegurar su inclusiÃ³n tras el purgado.

    export const toastColorMap = {
      success: {
        light: 'bg-status-success text-success-strong',
        dark: 'bg-status-success-dark text-success-strong',
      },
      error: {
        light: 'bg-status-alert text-alert-strong',
        dark: 'bg-status-alert text-alert-strong',
      },
      info: {
        light: 'bg-status-accent text-accent-strong',
        dark: 'bg-status-accent text-accent-strong',
      },
      warning: {
        light: 'bg-status-active text-active-strong',
        dark: 'bg-status-active text-active-strong',
      },
    }

El componente `Toast.vue` usa este mapa importado segÃºn el tipo y el modo actual (`isDark.value`).  
Se validÃ³ visualmente en todos los modos y dispositivos. Bug cerrado.

### Logo dinÃ¡mico en modo claro/oscuro

**Objetivo:** Permitir que el logo se vea correctamente en modo claro y oscuro sin usar mÃºltiples versiones de archivo ni swaps manuales.

**Errores detectados y pruebas descartadas:**
- Uso de `mask-image` con `.mask-logo` fallaba en todos los navegadores (incluyendo Safari, Chrome y Firefox), no se renderizaba nada o aparecÃ­a una caja invisible.
- Forzar color con `bg-*` funcionaba pero no permitÃ­a personalizaciÃ³n futura ni integraciÃ³n con `text-*`.
- Usar SVG original inline sin limpiar mostraba el logo completamente relleno, sin huecos internos (las manecillas del reloj desaparecÃ­an).

**SoluciÃ³n aplicada:**
- Se limpiÃ³ y optimizÃ³ el SVG con `fill="currentColor"`, `fill-rule="evenodd"` y `clip-rule="evenodd"` para respetar contornos huecos.
- El logo se insertÃ³ **inline** en `App.vue` y `SideMenu.vue`, con clases de tamaÃ±o (`h-8`, `h-4`) y color dinÃ¡mico (`text-text-main dark:text-main-dark`).
- Las manecillas del reloj y demÃ¡s detalles se conservaron al eliminar `fill="#000000"` y definir el color solo en el `<svg>`.

**Limpieza final:**
- Se eliminÃ³ el archivo `logoColors.ts` (ya no necesario).
- Se borrÃ³ la clase `.mask-logo` de `main.css`.
- Se eliminaron `mode`, `getLogoColor`, y otros restos si solo se usaban para el logo.

**Nota Ãºtil:** Para futuros SVG dinÃ¡micos usar siempre:
- `fill="currentColor"`
- `fill-rule="evenodd"` y `clip-rule="evenodd"`
- Evitar `fill` directo en los `<path>`, limpiar con herramientas como [SVGOMG](https://jakearchibald.github.io/svgomg/) si viene de PNG.

### Bug visual en botones mÃ³viles: hover pegado tras pulsar

**Problema:**  
En mÃ³viles (iOS y Android, tanto PWA como app nativa), al pulsar un botÃ³n, el color de fondo correspondiente al estado `hover` permanecÃ­a visible tras soltar el botÃ³n. El efecto solo desaparecÃ­a al tocar otra parte de la interfaz. Este comportamiento no se producÃ­a en escritorio, donde el estado `hover` se gestionaba correctamente.

**Causa:**  
El estilo `hover:bg-*` aplicado mediante Tailwind se mantenÃ­a activo en entornos tÃ¡ctiles porque no existe un evento confiable para desactivar `hover` tras `touchend`. Esto provocaba un estado visual persistente no deseado.

**SoluciÃ³n:**  
Se reescribieron los estilos de botones utilizando clases estÃ¡ticas declaradas en un nuevo archivo `buttons.css`, usando `@apply` con las utilidades Tailwind. Se aplicaron las siguientes estrategias:
- El estilo visual que antes se aplicaba con `hover:` se trasladÃ³ al estado `:active`, que sÃ­ desaparece correctamente tras soltar el botÃ³n.
- El estado `hover` se mantuvo Ãºnicamente para dispositivos que realmente soportan hover, mediante la condiciÃ³n `@media (hover: hover)`.
- Se reprodujo fielmente el comportamiento visual anterior, manteniendo soporte para tema claro y oscuro sin dependencias JS.

**ImplementaciÃ³n:**  
- Se creÃ³ el archivo `src/assets/css/buttons.css`.
- Se importÃ³ al inicio de `main.css`.
- Se definiÃ³ la clase `btn-primary` con el mismo diseÃ±o que `getButtonStyle('primary', mode)`.
- Se sustituyÃ³ `getButtonStyle(...)` por `'btn-primary'` en el botÃ³n â€œIniciarâ€ como caso de prueba.
- Se validÃ³ el resultado en DevTools mÃ³vil, PWA iOS, app Android y escritorio.
- Se completÃ³ la migraciÃ³n del resto de botones del `SideMenu`, iconos redondos (`notificar`, `eliminar`), botones de acciÃ³n y cierre de toast, hamburguesa y cierre de menÃº.
- Se mantuvieron y adaptaron todos los efectos visuales previos: `hover`, `active`, `focus`, `scale`, etc.
- Se refactorizÃ³ completamente el archivo `buttons.css` centralizando todos los estilos personalizados de botones.

**Impacto y conclusiones:**  
- El bug desaparece por completo en todos los entornos mÃ³viles.
- No hay efectos colaterales en animaciones ni en el sistema de cambio de tema.
- El sistema evita el purgado de clases Tailwind al usar clases estÃ¡ticas.
- El archivo `menuButtonStyles.ts` fue eliminado por completo tras verificarse que todas las referencias habÃ­an sido sustituidas.
- Los botones con transiciÃ³n dinÃ¡mica (como Finalizar/Reabrir) fueron adaptados cuidadosamente para mantener efectos visuales y resolver el â€˜flashâ€™ en el intercambio, modificando el fade `opacity` a `opacity-50` para evitar desapariciÃ³n total.
- El nuevo sistema permite ahora implementar botones coherentes y accesibles con feedback completo sin cÃ³digo duplicado ni soluciones JS especÃ­ficas para mÃ³vil.

### Bug en PWA iOS: las acciones de la vista principal no cancelaban el click al arrastrar fuera

**Problema:**  
En PWA instalada en iOS, varios controles de la vista principal seguÃ­an ejecutando su acciÃ³n aunque el gesto tÃ¡ctil saliera del botÃ³n o elemento clicable antes de soltar. Se detectÃ³ primero en `Volver al tramo actual`, pero la revisiÃ³n posterior mostrÃ³ el mismo patrÃ³n en filtros, selector de tramo, botÃ³n `Iniciar` y varias acciones de tarea.

**DiagnÃ³stico:**  
No era un bug de una acciÃ³n concreta, sino una diferencia de semÃ¡ntica tÃ¡ctil en iOS PWA al confiar Ãºnicamente en `@click` y en la cancelaciÃ³n nativa por arrastre. El `SideMenu` no reproducÃ­a el problema, por lo que se acotÃ³ como un bug general de la vista principal, no de toda la app.

**SoluciÃ³n aplicada:**  
Se creÃ³ una directiva reutilizable en `src/directives/cancelTouchClick.ts` y se registrÃ³ globalmente en `main.ts`.  
La directiva:
- detecta si un gesto tÃ¡ctil sale del Ã¡rea del control,
- marca la activaciÃ³n como cancelada,
- y bloquea el siguiente `click` sintÃ©tico durante una ventana corta de seguridad.

DespuÃ©s de una primera iteraciÃ³n, fue necesario ampliar la ventana de bloqueo para cubrir tambiÃ©n el caso `hold + drag + release` en iOS PWA.

**Criterio de comportamiento:**  
La soluciÃ³n es deliberadamente conservadora: si el dedo sale del Ã¡rea del control en cualquier momento del gesto, la acciÃ³n se considera cancelada aunque luego vuelva a entrar antes de soltar. Para lanzamiento se considera un comportamiento correcto y mÃ¡s seguro frente a activaciones accidentales.

**ValidaciÃ³n:**  
- Corregido y validado manualmente en PWA iOS instalada.
- Probado sobre los controles afectados de la vista principal.
- Sin regresiones apreciables en taps normales.

### Bug en animaciÃ³n del colapsable de notas del turno

**DescripciÃ³n del problema:**  
Al colapsar o desplegar el bloque de notas del turno mediante animaciÃ³n (`max-height` + opacidad), se observaba un salto visual abrupto al inicio y final de la transiciÃ³n. Este salto daba sensaciÃ³n de desincronizaciÃ³n o glitch, visible especialmente en la fase de colapso.

**HipÃ³tesis y causas consideradas:**  
- Interferencia del `v-show` frente a `v-if`  
- Conflictos con `TransitionGroup`  
- Animaciones de opacidad simultÃ¡neas con `max-height`  
- Problemas derivados del uso de `space-y-*`, `py-*` o `overflow-hidden`  
- Comportamiento de los `textarea` autoajustables (`autoResize`)  
- Efecto del `padding` en el bloque `notes-content`  
- Estilos heredados desde `App.vue` u otros contenedores  
- Diferencias frente al colapsable funcional del `SideMenu`  
- Desfase entre `onLeave` y el fade-out en animaciÃ³n

**Pruebas realizadas (fallidas):**  
- Eliminar `autoResize`, `v-show`, `Transition`, o `@input` â†’ sin efecto  
- Cambiar `v-show` por `v-if` â†’ sin efecto  
- Sustituir `TransitionGroup` por `Transition` â†’ sin efecto  
- Aplicar `overflow-hidden` o `position` en distintos niveles â†’ sin efecto  
- Sustituir `textarea` por contenido estÃ¡tico â†’ bug persistÃ­a  
- Borrar clases `space-y-*`, `py-*`, `px-*`, `bg-*` de todos los niveles â†’ sin efecto o solo reducÃ­a el salto  
- Sustituir funciones `onEnter/onLeave` por variantes que usaban `scrollHeight` o `getBoundingClientRect()` â†’ sin efecto  
- ComparaciÃ³n completa con colapsable funcional de `SideMenu` â†’ misma estructura no replicaba el bug

**SoluciÃ³n parcial aplicada:**  
Agrupar las clases internas (`px-4`, `py-2`, `space-y-2`) en un nuevo `div` anidado dentro de `notes-content`.  
Esto redujo drÃ¡sticamente la altura del salto y permitiÃ³ mantener una animaciÃ³n fluida sin afectar el layout general.  
TambiÃ©n se ajustÃ³ la duraciÃ³n final de la animaciÃ³n a `0.2s` para mejorar la percepciÃ³n y minimizar aÃºn mÃ¡s el defecto.

**Resultado:**  
El bug no se eliminÃ³ por completo, pero el salto visual quedÃ³ reducido a un mÃ­nimo apenas perceptible.  
Se considera un resultado aceptable dentro del diseÃ±o actual y se documenta aquÃ­ para evitar reprocesos futuros.

**Recomendaciones futuras:**  
- Si se reestructura el bloque, partir de cero en un entorno aislado podrÃ­a revelar la causa exacta.  
- No volver a mover ni eliminar clases en `notes-content` sin validar este bug.  
- Documentar bien cualquier cambio estructural que implique colapsables con contenido dinÃ¡mico como `textarea`.  
- En caso de requerir una soluciÃ³n 100% fluida, replantear el diseÃ±o sin usar colapsado animado con `max-height`.


### Bug: icono maskable recortado en instalaciÃ³n PWA Android

Durante la validaciÃ³n del manifiesto de la PWA en Android, se ha detectado que el icono definido como **maskable** se muestra mal recortado tanto en la vista previa de instalaciÃ³n como en el acceso directo creado en el homescreen.

Este comportamiento afecta tanto a la rama `develop` como a `main`, y estÃ¡ presente desde las primeras versiones del proyecto. Se descubriÃ³ al realizar pruebas especÃ­ficas de instalaciÃ³n PWA en emuladores Android (API 36) y se ha confirmado en un dispositivo fÃ­sico (Huawei P Smart 2019, Android 10).

**Pruebas realizadas:**
- Verificada la correcta detecciÃ³n del manifiesto y su contenido tras desactivar la autenticaciÃ³n de previews en Vercel.
- Imagen `icon-maskable.png` reescalada a 512x512 para coincidir con el valor declarado en `sizes`.
- Probados los valores `"purpose": "maskable"` y `"purpose": "any maskable"` sin cambios en el comportamiento.
- Eliminado el warning de DevTools usando solo `"maskable"`, pero sin mejoras visuales en Android.
- Restaurado `"any maskable"` para ampliar compatibilidad, sin resultados satisfactorios.
- Realizado wipe de datos y reinstalaciÃ³n en emuladores sin cambios apreciables.

**Resultado:**
El bug persiste tras aplicar todas las correcciones posibles a nivel de manifiesto e icono. Se trata de un error visual no crÃ­tico, ya que la instalaciÃ³n principal para Android serÃ¡ mediante APK nativa. Se ha documentado para posible resoluciÃ³n futura si se prioriza la experiencia PWA en esta plataforma.

**Relacionado con:**
- Tarea en el roadmap: *Revisar problema de recorte incorrecto del icono maskable al instalar la PWA en Android*


### Bug: manifiesto PWA no detectado en previews protegidos de Vercel

Durante las pruebas de la PWA en dispositivos Android y emuladores, se detectÃ³ que el manifiesto no era reconocido correctamente en las versiones desplegadas como preview (`develop`) en Vercel. Esto impedÃ­a la correcta instalaciÃ³n como PWA, y se manifestaba como errores en consola del navegador y fallos en la carga de iconos y capturas del manifest.

El problema no afectaba a la versiÃ³n de producciÃ³n (`main`), lo que generÃ³ confusiÃ³n inicial sobre su origen.

**AnÃ¡lisis y hallazgo:**
- El archivo `manifest.webmanifest` se servÃ­a correctamente y era accesible manualmente por URL.
- Los recursos como iconos y screenshots tambiÃ©n estaban presentes en el deploy.
- Se comprobÃ³ que el manifiesto era generado correctamente en local y en producciÃ³n.
- El fallo solo ocurrÃ­a en los deploys protegidos por la opciÃ³n "Legacy Pre-Production Deployments" de Vercel, que requiere autenticaciÃ³n de usuario.
- Al desactivar esa protecciÃ³n, el manifiesto comenzÃ³ a ser reconocido inmediatamente sin necesidad de redeploy.

**Resultado:**
El error se debÃ­a a una limitaciÃ³n de las previews protegidas de Vercel. Se resolviÃ³ desactivando la autenticaciÃ³n de previews desde la configuraciÃ³n del proyecto. No ha sido necesario modificar cÃ³digo ni configuraciÃ³n adicional del proyecto.

**Relacionado con:**
- Tarea completada en el roadmap: *Solucionar error de detecciÃ³n del manifiesto PWA en los previews protegidos de Vercel*

### Safe Areas: integraciÃ³n, fallos y soluciÃ³n definitiva (plugin EdgeToEdge)

**Contexto:**  
En dispositivos con barras flotantes o notches (especialmente PWA iOS y Android recientes), la app no respetaba correctamente las zonas seguras (safe areas), provocando que la interfaz quedara pisada o mostrara scroll fantasma. En algunos Android tambiÃ©n se mostraban barras negras en lugar de integrar visualmente las zonas reservadas.

**Problemas detectados:**  
- En PWA iOS: el `safe-area-inset-bottom` daba un espacio excesivo.  
- En Android (nativo): no se aplicaban los `env(safe-area-*)`, causando solapamientos.  
- En escritorio y DevTools mÃ³vil: el uso de `env(...)` sin fallback provocaba que el sidemenu quedara desplazado hacia abajo.  
- Comportamiento inconsistente al abrir la app: en algunos casos, la status bar se pisaba al primer inicio pero no al abrirla de nuevo.  

**Intentos y soluciones fallidas:**  
- Aplicar `env(...)` directamente en Tailwind sin plugin â†’ sin efecto en Android.  
- AÃ±adir `nextTick` tras `onMounted` para esperar a que se apliquen â†’ no solucionÃ³.  
- Forzar valores con `calc(...)` en CSS con `env(...)` â†’ inconsistencias.  

**SoluciÃ³n aplicada:**  
- Instalado `@capacitor-community/safe-area` para obtener los valores seguros de forma fiable.  
- El plugin define automÃ¡ticamente las variables CSS --safe-area-inset-top y --safe-area-inset-bottom, accesibles desde cualquier componente.
- Aplicado `padding-top: var(--safe-area-inset-top)` en `<header>` y en `DialogPanel` del SideMenu.  
- Ajustado `<main>` con `min-height: calc(100svh - var(--safe-area-inset-top) - 68px)` para evitar scroll fantasma.  
- En Android, se activÃ³ la transparencia de la barra inferior con navigationBarColor: '#00000000' y se forzÃ³ color claro (#f8f9fa) y texto oscuro en la barra superior con statusBarColor y statusBarContent.
- Se descartÃ³ el uso de `safe-area-inset-bottom` en el sidemenu inferior, sustituyÃ©ndolo por `pb-3` fijo.  

**Resultado final:**  
- **Android nativo:** correcto. Se respeta el safe area, las barras flotantes son transparentes, y no hay solapamientos. El sidemenu queda ligeramente elevado, pero se acepta por ahora.  
- **PWA iOS:** correcto. Se adapta bien a las zonas seguras sin excesos ni solapamientos.  
- **Escritorio y DevTools:** correcto. Se evita la desalineaciÃ³n del sidemenu.  

**Problemas abiertos:**  
- En Android, el `DialogPanel` del sidemenu sigue algo desalineado (ligeramente elevado respecto al header).  
- Comportamiento inconsistente en Android al abrir la app por primera vez: la status bar puede quedar pisada si no se reinicia.  
- No se ha encontrado una soluciÃ³n universal y robusta que funcione idÃ©nticamente en todas las plataformas.  

**Pendiente de revisar mÃ¡s adelante:**  
- Investigar si el plugin puede exponer eventos de ready/safe-area actualizados para evitar inconsistencias iniciales.  
- Probar alternativas con `capacitor-statusbar` o listeners a cambios en la visibilidad de UI del sistema.  
- Decidir si vale la pena sincronizar dinÃ¡micamente los paddings del sidemenu y el header con una funciÃ³n comÃºn.


**ActualizaciÃ³n: investigaciÃ³n adicional sobre bug persistente en primera carga (Android)**
Fecha: 2025-08-02

Tras la validaciÃ³n del sistema de safe-areas, se ha confirmado que en Android nativo (APK) persiste un bug especÃ­fico al abrir la app por primera vez:

Comportamiento observado:  
- En la primera carga, la variable `--safe-area-inset-top` estÃ¡ presente pero vale `0px`, lo que provoca que el header quede pisado por la status bar.  
- Al tocar un input real (input o textarea), se corrige automÃ¡ticamente y la interfaz se ajusta correctamente.  
- El comportamiento es consistente en todos los emuladores Android:  
  - Siempre incorrecto al abrir por primera vez  
  - Siempre correcto tras la primera interacciÃ³n  
  - Persiste si se cierra completamente la app y se vuelve a abrir  

Pruebas realizadas y descartadas:  
- `initialize()` del plugin: inyecta correctamente las variables CSS, pero no desencadena el layout  
- Esperar a `document.readyState === "complete"`  
- Escuchar `window.onload`  
- Forzar reflow con `getComputedStyle`, `offsetHeight`, `requestAnimationFrame`  
- Forzar `window.dispatchEvent(new Event('resize'))`  
- Enfocar programÃ¡ticamente un input oculto  
- Esperar evento `visualViewport.resize`  
- Insertar `debugDiv` para observar los valores: se confirmÃ³ que solo cambian al abrir el teclado

Causa confirmada:  
El WebView de Android no recalcula ni aplica los `env(--safe-area-inset-*)` hasta que se produce una interacciÃ³n del usuario. Este bug estÃ¡ documentado en el repositorio oficial de Capacitor y en foros de Ionic.  
Es una limitaciÃ³n tÃ©cnica sin workaround fiable actualmente desde JavaScript.

DecisiÃ³n final:  
- Se acepta como limitaciÃ³n estructural del entorno Capacitor + Android WebView  
- Se conserva `initialize()` como paso necesario para asegurar la existencia de las variables, aunque estÃ©n inicialmente a `0px`  
- No se aplicarÃ¡n mÃ¡s intentos de parche temporal (como inputs invisibles o focus forzado)  
- Se documenta en el roadmap como tarea cerrada  
- Si en el futuro se desea resolver, serÃ¡ necesario intervenir desde cÃ³digo nativo (Java/Kotlin) usando `WindowInsets` reales


**ActualizaciÃ³n: abandono del uso de safe-area en Android y cierre del intento de integraciÃ³n multiplataforma**
Fecha: 2025-08-03

Durante el intento de corregir la desalineaciÃ³n del `SideMenu` en Android nativo, se ha confirmado que **no existe un mÃ©todo fiable** para aplicar correctamente los mÃ¡rgenes seguros (`--safe-area-inset-*`) en componentes montados dinÃ¡micamente como `DialogPanel`.

**Hallazgos clave:**

* Aunque `--safe-area-inset-top` puede leerse desde JavaScript tras interacciÃ³n (e.g., al pulsar un input), **su aplicaciÃ³n manual por `ref`, `style`, o `computed` no tiene efecto visible** en el menÃº lateral.
* Los estilos dinÃ¡micos (`padding-top`, `margin-top`, `height`) aplicados por JS no afectan la posiciÃ³n visual en WebView.
* Se descartÃ³ que Headless UI o el uso de `Teleport` fueran la causa.
* El problema persiste aunque el valor sea capturado correctamente desde el layout root (`document.documentElement`).

**Pruebas realizadas sin Ã©xito:**

* Captura reactiva con watcher a `isOpen` y aplicaciÃ³n de `style.marginTop`.
* AplicaciÃ³n directa desde `useSafeArea.ts` expuesto globalmente.
* EncapsulaciÃ³n de la lÃ³gica y sincronizaciÃ³n con `waitForSafeAreaTop`.
* Forzar animaciÃ³n o reflow en el `DialogPanel` tras open.
* Uso de `var(...)` en el template con fallbacks por clase o estilo.

**Resultado observado:**

* En Android, el `SideMenu` siempre queda desplazado hacia arriba si se apoya en `safe-area`, tanto si el valor estÃ¡ presente como si se inyecta desde JS.
* En plataformas donde sÃ­ funciona (`iOS`, `PWA`, `escritorio`), el diseÃ±o es correcto sin necesidad de parches.

**DecisiÃ³n tomada:**

* Se **abandona definitivamente el uso de `safe-area` en Android WebView**.
* Se descarta el plugin `@capacitor-community/safe-area` como soluciÃ³n vÃ¡lida multiplataforma.
* El cÃ³digo `useSafeArea.ts`, sus referencias y el uso de `var(--safe-area-inset-top)` serÃ¡n eliminados.
* Se implementarÃ¡ una soluciÃ³n alternativa basada en **`padding-top` fijo solo en Android nativo**, suficientemente alto (e.g., `24px`) para evitar solapamientos.
* Se investigarÃ¡ tambiÃ©n el uso del plugin `@capacitor/status-bar` y su opciÃ³n `overlaysWebView: false` como posible sustituto del uso de safe-areas, siempre que no introduzca otras inconsistencias.

Esta decisiÃ³n permite simplificar el sistema visual, evitar comportamiento impredecible y recuperar control total del layout en Android.



**SoluciÃ³n al bug de solapamiento en Android con plugin EdgeToEdge**
Fecha: 2025-08-04

Tras mÃºltiples intentos fallidos con el sistema SafeArea, se logrÃ³ una soluciÃ³n definitiva al problema de solapamiento de contenido con las barras de sistema en Android nativo.

Dado que todas las soluciones previas (incluyendo `@capacitor-community/safe-area`, `@capacitor/status-bar`, y ajustes de estilos CSS con `env(...)` o `var(...)`) habÃ­an resultado inconsistentes o ineficaces, se decidiÃ³ hacer una investigaciÃ³n externa completa. Para ello se utilizÃ³ NotebookLM como asistente de investigaciÃ³n, con el objetivo de buscar Ãºnicamente informaciÃ³n contrastada, actualizada en 2025 y validada por usuarios reales.

La bÃºsqueda revelÃ³ que la Ãºnica soluciÃ³n fiable y actual en proyectos Capacitor hÃ­bridos era el uso del plugin `@capawesome/capacitor-android-edge-to-edge-support`, que aplica insets reales a la WebView desde el cÃ³digo nativo sin depender de estilos dinÃ¡micos de la parte web. Esta aproximaciÃ³n resolvÃ­a el problema raÃ­z: la WebView de Android no aplica correctamente los mÃ¡rgenes de safe-area hasta despuÃ©s de una interacciÃ³n (ademÃ¡s de incosistencias en distintos componentes de la app), lo que impedÃ­a una soluciÃ³n visual sÃ³lida en la primera carga.

Se siguieron los siguientes pasos:

- InstalaciÃ³n y activaciÃ³n del plugin EdgeToEdge.
- VerificaciÃ³n inicial con color rojo para comprobar que el plugin realmente controlaba el fondo de las barras del sistema.
- Pruebas de color transparent fallidas, lo que llevÃ³ a investigar la procedencia del fondo blanco o gris visible.
- AÃ±adido de un CSS global con `html, body, #app { background-color: transparent !important; }` para permitir que el color de fondo real del WebView fuera visible.
- No se llegÃ³ a ver el WebView como fondo (el color lima de prueba nunca apareciÃ³), lo que sugiere que el fondo visible era un fallback de otra capa; tras probar haciendo transparentes las barras desde styles.xml y otros mÃ©todos, se confirmÃ³ que el bug ya estaba solucionado aplicando el color desde EdgeToEdge, por lo que se detuvo la bÃºsqueda del origen exacto del color blanco/gris.
- ImplementaciÃ³n dinÃ¡mica del color de fondo usando clases Tailwind (`bg-surface-1` y `dark:bg-surface-1-dark`) aplicadas de forma programÃ¡tica al iniciar la app.
- Refactor posterior: se aÃ±adiÃ³ un `watch()` al valor de `isDark` en `useDarkMode.ts` para actualizar el color de fondo en tiempo real cuando el usuario cambiaba el modo claro/oscuro, incluyendo el caso de cambio por modo del sistema.
- VerificaciÃ³n completa en emuladores Android (API 29, 30 y 36), con resultados positivos:
  - En Android 30 y 36 el color se adapta dinÃ¡micamente, y la WebView evita correctamente las barras del sistema.
  - En Android 29 se respeta la status bar, pero aparece una barra inferior adicional (padding extra), que se analizarÃ¡ en otro momento.

**Mejoras pendientes**

- Revisar el comportamiento en Android API 29: la barra inferior muestra un espacio adicional del mismo color de fondo.
- Verificar si es necesario adaptar el comportamiento cuando cambia el teclado o se ocultan las barras del sistema.
- Considerar si debe armonizarse tambiÃ©n el color de la barra de navegaciÃ³n inferior (mediante `@capgo/capacitor-navigation-bar` o similar).


### Bug crÃ­tico: el plugin capacitor-navigation-bar rompe la build debug

**Fecha:** 2025-08-05  
**Estado:** Documentado y descartado

**Contexto:**  
Durante el refinamiento visual en Android, se intentÃ³ aplicar transparencia en la barra de navegaciÃ³n inferior mediante el plugin `@capgo/capacitor-navigation-bar`, con el objetivo de mostrar contenido detrÃ¡s de la misma y adaptar los iconos al tema claro/oscuro. El plugin se integrÃ³ con una llamada directa en `main.ts`, sin alterar otras partes del sistema.

**Pruebas realizadas:**  
- El plugin se instalÃ³ correctamente y se sincronizÃ³ con `npx cap sync`.
- Se aÃ±adiÃ³ una llamada a `NavigationBar.setNavigationBarColor(...)` en `main.ts`.
- La app compilÃ³ en modo `debug` sin errores visibles.
- Al ejecutarla en el emulador, se produjo el error:  
  `Activity class {com.jcpaezd.notifica/com.jcpaezd.notifica.MainActivity} does not exist`
- Se generÃ³ un APK manual y se analizÃ³ con Android Studio.
- El `AndroidManifest.xml` contenÃ­a correctamente la declaraciÃ³n de `MainActivity`.
- Sin embargo, el archivo `classes.dex` no incluÃ­a la clase `MainActivity` ni ninguna clase propia del proyecto.

**ConclusiÃ³n:**  
El plugin rompe silenciosamente la build en modo `debug`, provocando un APK invÃ¡lido. Esto impide la ejecuciÃ³n normal de la app, aunque no se produzcan errores de compilaciÃ³n. El problema desaparece completamente al desinstalar el plugin y eliminar su uso en `main.ts`.

**DecisiÃ³n:**  
Se descarta el uso del plugin `@capgo/capacitor-navigation-bar` hasta nuevo aviso. No se recomienda volver a instalarlo ni usarlo en builds de desarrollo. Se considerarÃ¡n otras alternativas (manuales o nativas) si se requiere modificar visualmente la barra inferior sin comprometer la integridad del proyecto.


### GestiÃ³n dinÃ¡mica de la barra de estado (StatusBar)

**Contexto:**  
Hasta ahora, el color de fondo de la barra de estado (status bar) y el color de sus iconos no se adaptaban correctamente al tema visual de la app en Android. En versiones modernas (API 30 en adelante), el objetivo era sincronizar el color de fondo con el tema activo y ajustar el color de los iconos (blanco o negro) para garantizar contraste y legibilidad. En versiones antiguas, habÃ­a problemas de visualizaciÃ³n e insets dobles.

**MotivaciÃ³n:**  
Ofrecer una integraciÃ³n visual coherente con el tema de la app, respetando el diseÃ±o edge-to-edge y evitando errores visuales en versiones no compatibles. TambiÃ©n se buscaba solucionar problemas de insets dobles en dispositivos con Android 10 y anteriores.

**Pruebas realizadas:**  
- Se integrÃ³ `@capacitor/status-bar` y se aplicÃ³ el cambio de estilo de los iconos tras detectar el tema (oscuro/claro).
- Se obtuvo el color actual desde las clases definidas por Tailwind para cada tema.
- Se limitÃ³ la aplicaciÃ³n de cambios al API 30 o superior, tras detectar mediante `@capacitor/device` la versiÃ³n exacta del sistema.
- Se probÃ³ en emuladores con API 29, 30 y 36, asÃ­ como en dispositivo fÃ­sico con Android 10.

**Resultado:**  
- En **API â‰¥ 30**, tanto el color de fondo como los iconos se actualizan correctamente segÃºn el tema.  
- En **API 29 emulado**, se corrige el problema de la barra superior adicional. Aunque los iconos no cambian, el fondo mantiene coherencia.  
- En **Android 10 fÃ­sico**, persisten ambas barras adicionales y los iconos no cambian dinÃ¡micamente (solo tras reinicio), pero no rompen la experiencia.  
- Se evita aplicar cambios visuales en dispositivos no compatibles, lo que mejora la estabilidad general.

**Notas adicionales:**  
- La soluciÃ³n se basa en una separaciÃ³n clara de lÃ³gica por API, y puede servir como modelo para futuras adaptaciones relacionadas con la barra de navegaciÃ³n u otros comportamientos especÃ­ficos de Android.
- TambiÃ©n se ha creado un archivo utilitario (`src/utils/platform.ts`) para centralizar la lÃ³gica de detecciÃ³n del nivel de API en Android. Este archivo expone una funciÃ³n `isAndroidApiAtLeast(minApi)` que devuelve un booleano segÃºn la versiÃ³n del sistema. Permite condicionar de forma segura la ejecuciÃ³n de funciones sensibles a la versiÃ³n, mejorando la legibilidad del cÃ³digo y evitando duplicaciones.


### Bug en modal: hover/active residual y migraciÃ³n a Headless UI

**Contexto:**  
Al migrar un modal preliminar desde Nocta, se detectÃ³ que al cerrar el modal pulsando sobre el overlay, los botones o campos situados debajo quedaban en estado *hover/active* â€œpegadoâ€ en dispositivos mÃ³viles. Este comportamiento no ocurrÃ­a en escritorio ni en el SideMenu (tambiÃ©n basado en Headless UI).

**Pruebas realizadas:**  
- Se probaron soluciones con `@click.stop`, `@pointerdown.stop`, y retrasos en el desmontaje (`setTimeout`), sin Ã©xito.  
- Se revisÃ³ el CSS de botones y campos, descartando que fuera la causa.  
- Se comparÃ³ con el SideMenu, confirmando que en ese componente el overlay bloqueaba los eventos correctamente.  
- Se consultÃ³ documentaciÃ³n y ejemplos de Headless UI (v1.7.23), verificando la estructura recomendada.  
- Se reprodujo el bug incluso forzando `isSettingsOpen = true`, lo que descartÃ³ fallos en la propagaciÃ³n del estado.

**DiagnÃ³stico:**  
El bug se debÃ­a a que el modal era un componente **custom**, sin la gestiÃ³n completa de overlay, foco y animaciones que Headless UI implementa en `Dialog`. La propagaciÃ³n de eventos y la coordinaciÃ³n de transiciones no estaban controladas de forma robusta, lo que permitÃ­a que el `touchstart` llegara al contenido subyacente.

**DecisiÃ³n:**  
Se descartaron parches manuales y se optÃ³ por **migrar el modal a Headless UI**, unificÃ¡ndolo con el SideMenu para tener consistencia en la gestiÃ³n de overlays, animaciones y accesibilidad.  

**Resultado:**  
- El modal ahora funciona con `Dialog`, `DialogOverlay` y `DialogPanel`, usando la misma estructura que el SideMenu.  
- El bug del hover/active residual quedÃ³ completamente resuelto.  
- Se consolidÃ³ el cÃ³digo, eliminando duplicados y asegurando compatibilidad con teclado y lectores de pantalla.  
- Se aÃ±adiÃ³ un **botÃ³n oculto (`sr-only`) con `initialFocus`** para cumplir con los requisitos de accesibilidad incluso en modales sin elementos interactivos visibles.  
- Ambas piezas (SideMenu y Modal) quedan unificadas bajo la misma librerÃ­a y patrÃ³n, simplificando el mantenimiento futuro.

---

## UI, diseÃ±o y experiencia de usuario

### Splash personalizada en Android

**Estrategia aplicada por versiÃ³n:**

- **Android 12+**: Se utilizÃ³ `Theme.SplashScreen` con icono animado (`@mipmap/ic_launcher_foreground`), fondo pastel (`@color/splash_background`) y fondo de icono `@null`. Evita el icono sobrepuesto por defecto.
- **Android 10**: Se empleÃ³ `splash_background_legacy.xml` con una imagen rectangular (1280Ã—1920) generada con APE Tools, centrada mediante `<bitmap>` en un `layer-list`.
- En `MainActivity.java` se aÃ±adiÃ³ `SplashScreen.installSplashScreen(this);` justo antes de `super.onCreate(...)`.

Resultado:
- âœ… Splash limpia y sin deformaciones en Android 10 y Android 12+
- âœ… TransiciÃ³n fluida sin flicker en dispositivos modernos
- ðŸ“Œ Parpadeo blanco breve en dispositivos lentos (aceptado como limitaciÃ³n menor)

**Proceso de resoluciÃ³n del bug visual:**

[13/07/2025-08:14] DiagnÃ³stico inicial
- En Android 10 la splash se mostraba correctamente usando `splash.png` en drawable-xxxhdpi.
- En Android 12+ esa misma imagen se deformaba al usarse como `AnimatedIcon` en `Theme.SplashScreen`.
- Se identificÃ³ como causa el uso indebido de una imagen grande rectangular como icono animado.

âœ… SoluciÃ³n adoptada
- Android 12+: uso de icono cuadrado `@mipmap/ic_launcher_foreground`.
- Android 10: imagen rectangular mantenida en drawable-xxxhdpi, referenciada desde `splash_background_legacy.xml`.

**Limpiezas realizadas:**

[13/07/2025-08:41] Archivos eliminados:
- `splash_background.xml`
- `splash_background_modern.xml`
- `icon.png` (redundante en drawable-xxxhdpi)

Confirmado que no afectaban al funcionamiento ni al aspecto en ningÃºn dispositivo.

### ðŸŒ€ Bug al renombrar splash legacy

[13/07/2025-08:50]
- Renombrar `splash.png` a `splash_legacy.png` rompÃ­a la visualizaciÃ³n en Android 10.
- Intentos de forzar centrado y tileMode fallaron.
- Se revirtiÃ³ el cambio y se restaurÃ³ la imagen original.

âœ… RestauraciÃ³n completa y validaciÃ³n

[13/07/2025-09:36]
- Restaurada imagen rectangular en drawable-xxxhdpi (1280Ã—1920).
- Confirmado funcionamiento correcto en:
  - Pixel 4 (Android 10)
  - Medium & Pixel 7 (Android 12+)
  - Huawei fÃ­sico (Android 10, desde Play Console)

### ðŸŽ¯ Mejoras aplicadas

[13/07/2025-10:25] EliminaciÃ³n del halo en Android 12+
- Cambiado `@mipmap/ic_launcher` â†’ `@mipmap/ic_launcher_foreground`.
- El icono se muestra limpio, sin fondo circular gris.

### ðŸ”´ Intento revertido: evitar pantalla blanca post-splash

[13/07/2025-11:13]
- Se probÃ³ desactivar el auto-hide y cerrar manualmente con `SplashScreen.hide()`.
- Resultado:
  - Android 12+: splash quedaba congelada
  - Android 10: splash secundaria deformada que bloqueaba la app
- Se revirtiÃ³ el cambio y se eliminÃ³ el plugin
- El parpadeo se acepta como comportamiento por defecto en dispositivos lentos

### ðŸ“Œ Observaciones adicionales

- En emulador Pixel 4, al abrir desde el home se muestra temporalmente un icono genÃ©rico. Desaparece tras abrir desde el launcher. No se ha reproducido en dispositivos reales.
- El sistema actual es limpio, bifurcado por versiÃ³n, mantenible y libre de hacks visuales.

âœ… **Estado final**: Splash completamente funcional, documentada y validada para Android 10 y 12+. Sin flickers ni conflictos. Preparado para reutilizaciÃ³n en otros proyectos.

### DescripciÃ³n para ficha de Play Store

[06/11/2025] DescripciÃ³n actualizada para ficha de Play Store

Lleva el control de tu dÃ­a de forma Ã¡gil, clara y sin conexiÃ³n.

Notifica te ayuda a registrar lo que haces en cada tramo del dÃ­a y compartirlo fÃ¡cilmente.
Perfecta para organizar tareas, anotar tiempos y tener siempre un resumen limpio y ordenado, sin perder tiempo ni conexiÃ³n.

CaracterÃ­sticas principales:
â€¢ Crea tareas al instante y registra su inicio y fin (automÃ¡tico o manual).
â€¢ Filtra por estado o tramo para centrarte en lo que importa.
â€¢ AÃ±ade notas rÃ¡pidas a cada tramo para observaciones o recordatorios.
â€¢ Exporta y comparte tus tareas por WhatsApp, correo o cualquier app compatible.
â€¢ Funciona 100 % offline: sin conexiÃ³n, sin registro, sin permisos extra.
â€¢ Interfaz cuidada, con modo claro y oscuro, y soporte multidioma (es/en).

Cuando termines, marca las tareas completadas y envÃ­a tu resumen con un toque.
Ãgil, prÃ¡ctica y diseÃ±ada para adaptarse a cualquier entorno: trabajo, estudio o proyectos personales.

---

(VersiÃ³n antigua - Actualizada: [13/07/2025])

Registra tus tareas tÃ©cnicas de forma rÃ¡pida, clara y sin conexiÃ³n.

Notifica es una app diseÃ±ada para tÃ©cnicos y trabajadores por turnos que necesitan llevar un control Ã¡gil de sus tareas diarias. Anota avisos y trabajos durante el dÃ­a, marca su hora de inicio y fin (automÃ¡tica o manual), y notifÃ­calos fÃ¡cilmente al final del turno.

CaracterÃ­sticas principales:
â€¢ Registro de tareas por turno con hora de inicio/fin.
â€¢ Tiempos calculados automÃ¡ticamente por tramos.
â€¢ Filtros por estado: activas, finalizadas, notificadas.
â€¢ HistÃ³rico completo de turnos anteriores.
â€¢ EnvÃ­o del listado por WhatsApp o apps compatibles.
â€¢ Funciona 100% offline: sin conexiÃ³n, sin registro, sin permisos extra.

Al final del dÃ­a, marca las tareas notificadas y borra las completadas. Puedes compartir tu turno si necesitas que un compaÃ±ero cierre tus avisos por ti.

Una interfaz simple, rÃ¡pida y sin distracciones. Ideal para usar a lo largo de la jornada sin complicaciones.

DiseÃ±ada desde dentro, para quienes necesitan agilidad en el trabajo tÃ©cnico.

### Capturas oficiales de la app (v1.0)

Listado de imÃ¡genes disponibles para documentaciÃ³n, README y ficha de Play Store.  
Las imÃ¡genes se encuentran en `/public/screenshots/`.

| NÂº  | DescripciÃ³n                    | Ruta en proyecto                            | Enlace navegable en editor local                       |
|-----|--------------------------------|----------------------------------------------|---------------------------------------------------------|
| 01  | Tareas vacÃ­as                  | `/public/screenshots/01-tareas-vacias.png`   | [abrir](../../public/screenshots/01-tareas-vacias.png) |
| 02  | Varias tareas                  | `/public/screenshots/02-varias-tareas.png`   | [abrir](../../public/screenshots/02-varias-tareas.png) |
| 03  | Turno anterior                 | `/public/screenshots/03-turno-anterior.png`  | [abrir](../../public/screenshots/03-turno-anterior.png) |
| 04  | Toast tarea completada         | `/public/screenshots/04-toast-tarea-completada.png` | [abrir](../../public/screenshots/04-toast-tarea-completada.png) |
| 05  | Notas del turno                | `/public/screenshots/05-notas-turno.png`     | [abrir](../../public/screenshots/05-notas-turno.png)   |
| 06  | Compartir activo               | `/public/screenshots/06-compartir-activo.png`| [abrir](../../public/screenshots/06-compartir-activo.png) |
| 07  | Confirmar borrado             | `/public/screenshots/07-confirmar-borrado.png`| [abrir](../../public/screenshots/07-confirmar-borrado.png) |
| 08  | Scroll + selector de turno     | `/public/screenshots/08-scroll-selector-turno.png` | [abrir](../../public/screenshots/08-scroll-selector-turno.png) |
| 09  | Vista modo oscuro              | `/public/screenshots/09-modo-oscuro.png`     | [abrir](../../public/screenshots/09-modo-oscuro.png)   |
| 10  | Vista modo claro               | `/public/screenshots/10-modo-claro.png`      | [abrir](../../public/screenshots/10-modo-claro.png)    |
| 11  | Toast mÃºltiples                | `/public/screenshots/11-toast-multiples.png` | [abrir](../../public/screenshots/11-toast-multiples.png) |
| 12  | Selector de tema               | `/public/screenshots/12-selector-tema.png`   | [abrir](../../public/screenshots/12-selector-tema.png) |
| 13  | MÃ³vil modo claro               | `/public/screenshots/13-movil-claro.png`     | [abrir](../../public/screenshots/13-movil-claro.png)   |
| 14  | MÃ³vil modo oscuro              | `/public/screenshots/14-movil-oscuro.png`    | [abrir](../../public/screenshots/14-movil-oscuro.png)  |
| 15  | Escritorio modo claro          | `/public/screenshots/15-escritorio-claro.png`| [abrir](../../public/screenshots/15-escritorio-claro.png) |
| 16  | Escritorio modo oscuro         | `/public/screenshots/16-escritorio-oscuro.png`| [abrir](../../public/screenshots/16-escritorio-oscuro.png) |
| 17  | Foco en input                  | `/public/screenshots/17-foco-input.png`      | [abrir](../../public/screenshots/17-foco-input.png)    |
| 18  | Texto aumentado                | `/public/screenshots/18-texto-aumentado.png` | [abrir](../../public/screenshots/18-texto-aumentado.png) |
| 19  | Toast de error                 | `/public/screenshots/19-toast-error.png`     | [abrir](../../public/screenshots/19-toast-error.png)   |

**Notas:**
- Capturas Android con emulador "Medium phone" API 36.0.
- Recortar 60px arriba y 64px abajo (excepto capturas de escritorio, que se mantienen completas).
- Script para generar mock-data:
    node dev-tools/mock-data/generateMock.cjs
    - Ejecutar en la raÃ­z del proyecto e insertar datos interactivos.
- Hacer todas las capturas siguiendo el listado.
- Guardar las capturas en carpeta temporal (ej. Screenshots/YYYY-MM-DD).
- En esa carpeta, clic derecho â†’ abrir PowerShell.

**Pasos para procesar capturas**
1. Crear carpeta de salida:
    mkdir recortadas

2. Ejecutar script de recorte (manteniendo sin recortar las posiciones 15 y 16):
    ..\Recortar-Screenshots.ps1
   - El script recorta 60px arriba y 64px abajo a todas las imÃ¡genes.
   - Copia sin recortar las imÃ¡genes 15 y 16 (Ã­ndices 14 y 15 en orden alfabÃ©tico).

3. Verificar dimensiones de salida (opcional, requiere ImageMagick):
    magick identify -format "%f %wx%h\n" .\recortadas\*.png
   - Capturas mÃ³viles â†’ 1080Ã—2276.
   - Capturas escritorio (15 y 16) â†’ 1080Ã—2400.

4. Renombrar en bloque segÃºn lista oficial (ejecutar en recortadas):
    $names = @(
    "01-tareas-vacias.png",
    "02-varias-tareas.png",
    "03-turno-anterior.png",
    "04-toast-tarea-completada.png",
    "05-notas-turno.png",
    "06-compartir-activo.png",
    "07-confirmar-borrado.png",
    "08-scroll-selector-turno.png",
    "09-modo-oscuro.png",
    "10-modo-claro.png",
    "11-toast-multiples.png",
    "12-selector-tema.png",
    "13-movil-claro.png",
    "14-movil-oscuro.png",
    "15-escritorio-claro.png",
    "16-escritorio-oscuro.png",
    "17-foco-input.png",
    "18-texto-aumentado.png",
    "19-toast-error.png"
    )

    $files = Get-ChildItem *.png | Sort-Object Name
    for ($i=0; $i -lt $files.Count; $i++) {
        Rename-Item $files[$i].FullName $names[$i]
    }

5. Mover a proyecto:
   - Sustituir /public/screenshots/ por el contenido de recortadas.
   - Actualizar tambiÃ©n capturas en la ficha de Play Store cuando corresponda.



### ReestructuraciÃ³n del layout de las tareas para alineaciÃ³n precisa (botÃ³n, duraciÃ³n, horas)

**Contexto:**  
En la estructura original basada en `flex`, la alineaciÃ³n vertical entre filas era inconsistente. Los elementos de la segunda fila (como duraciÃ³n y botones secundarios) no se podÃ­an alinear correctamente con los de la primera (horas y botÃ³n principal), especialmente en tareas con muchas lÃ­neas.

**Problemas detectados:**
- El bloque de duraciÃ³n (`0.5h`) no quedaba alineado con el bloque de horas (inicioâ€“fin).
- Los botones de notificaciÃ³n y eliminar no quedaban bajo el botÃ³n principal, sino desajustados a la derecha.
- Las dos filas (primera y segunda) estaban estructuradas como bloques `flex` separados, sin relaciÃ³n entre sus columnas.

**SoluciÃ³n aplicada:**  
Se migrÃ³ la estructura del contenido de cada tarea a `CSS Grid` con 3 columnas:
- `grid-cols-[1fr_auto_auto]` define tres columnas alineadas:
  1. DescripciÃ³n y tÃ©cnico (crecen libremente),
  2. Horas y duraciÃ³n,
  3. BotÃ³n principal y botones secundarios.

Los elementos se posicionan explÃ­citamente en la cuadrÃ­cula (`col-start`, `row-start`), logrando alineaciÃ³n vertical entre filas distintas.

Ajustes adicionales:
- Se eliminÃ³ `grid-rows-2` para evitar alturas forzadas y mejorar el ajuste en tareas con muchas o pocas lÃ­neas.
- Se usÃ³ `justify-self-end` en horas y duraciÃ³n para forzar su alineaciÃ³n derecha sin afectar al resto del layout.
- Los botones secundarios se distribuyen horizontalmente con `justify-evenly` dentro de su celda de grid.

**Resultado:**  
Layout robusto, alineado vertical y horizontalmente, vÃ¡lido para tareas cortas y largas. Se mantiene predecible y limpio en todos los modos y estados.

**Relacionado:**  
Roadmap Â· Etapa 8 Â· Tareas de UI â†’ â€œMejorar alineaciÃ³n vertical de fila 2 en tareasâ€.

### Bloque de apariencia: diseÃ±o UI y selector de tema

[27/07/2025]  
Durante la implementaciÃ³n del sistema de modo oscuro se rediseÃ±Ã³ el bloque de apariencia general en el menÃº lateral (`SideMenu.vue`). El objetivo era ofrecer un control claro, accesible y coherente con el estilo visual de la app.

**Decisiones clave:**  
- Se sustituyÃ³ el selector binario claro/oscuro por una tarjeta con 3 opciones: Claro / Oscuro / Sistema.
- Cada opciÃ³n se representa mediante un botÃ³n apilado (`flex-col`) con:
  - Un Ã­cono de Heroicons (`SunIcon`, `MoonIcon`, `ComputerDesktopIcon`)
  - Un tÃ­tulo breve (`Claro`, `Oscuro`, `Sistema`)
- El modo activo se resalta mediante:
  - Fondo con clase `surface-hover` (modo claro) o `surface-pressed` (modo oscuro)
  - Borde izquierdo del botÃ³n visible (`border-l-4`) con color `accent-main`
  - Texto y Ã­conos adaptados al modo actual (`text-main` y `dark:text-main-dark`)

**IntegraciÃ³n con la UI:**  
- La tarjeta aparece como un bloque unido al botÃ³n opciones desplegado desde este.
- Se respetan las proporciones, espaciado y estilos del resto del SideMenu.
- La secciÃ³n se puede colapsar o expandir con animaciÃ³n fluida (ver bloque tÃ©cnico correspondiente).
- El menÃº lateral completo se validÃ³ visualmente en modo claro y oscuro, con todos los botones revisados por contraste, iconos, color de fondo y comportamiento interactivo.

**Resultado:**  
- Selector de tema intuitivo y visualmente atractivo.
- Accesibilidad y contraste garantizados en ambos modos.
- Comportamiento responsive correcto en mÃ³viles y escritorio.

Este bloque puede servir como patrÃ³n reutilizable para configuraciones similares (idioma, tamaÃ±o de textoâ€¦).


## GestiÃ³n de traducciones existentes con i18n

Todas las cadenas de la aplicaciÃ³n estÃ¡n centralizadas en los archivos de idioma ubicados en `src/locales/`.  
Actualmente existen dos archivos principales (`es.ts` y `en.ts`) que contienen todas las claves y sus valores traducidos.  

**Pautas para editar traducciones:**
- No se debe modificar texto directamente en los componentes o vistas.  
- Siempre que se quiera corregir, cambiar o ajustar una traducciÃ³n, debe hacerse en los archivos `es.ts` y `en.ts`.  
- Las claves deben mantenerse consistentes en todos los idiomas. Si se cambia el nombre de una clave, hay que actualizarla en todos los idiomas y en el cÃ³digo que la utilice.  
- Vue I18n estÃ¡ configurado para usar **inglÃ©s (en)** como fallback. Si una clave no existe en el idioma actual, automÃ¡ticamente se mostrarÃ¡ la traducciÃ³n inglesa.  

**CÃ³mo aÃ±adir un nuevo idioma**

Para incorporar un nuevo idioma a la aplicaciÃ³n, el proceso es el siguiente:

1. **Crear el archivo de traducciones**  
   - Copiar uno de los archivos existentes en `src/locales/` (por ejemplo, `en.ts`) y renombrarlo con el cÃ³digo del nuevo idioma (`fr.ts`, `de.ts`, etc.).  
   - Traducir todas las claves al nuevo idioma manteniendo la misma estructura de claves.

2. **Registrar el idioma en `main.ts`**  
   - Importar el nuevo archivo de traducciones.  
   - AÃ±adirlo dentro del objeto `messages` de `createI18n`.  
   - Ampliar la lÃ³gica de `browserLocale` para que reconozca el nuevo cÃ³digo de idioma si se quiere usar como opciÃ³n por defecto.

3. **Actualizar el modal de selecciÃ³n de idioma**  
   - Editar el bloque de idioma en `App.vue` para aÃ±adir un nuevo botÃ³n con la abreviatura correspondiente (FR, DE, IT, etc.).  
   - Usar el mismo estilo y clases que los botones existentes.  

4. **Validar en la aplicaciÃ³n**  
   - Seleccionar el nuevo idioma desde el modal y comprobar que todos los textos aparecen traducidos.  
   - Verificar que la opciÃ³n **AUTO** del selector tambiÃ©n detecta el nuevo idioma cuando el dispositivo estÃ© configurado con Ã©l.

Este procedimiento asegura que el nuevo idioma quede integrado de forma coherente en toda la app, sin necesidad de modificar los componentes uno a uno.

Este sistema asegura que la app se mantenga coherente y sea sencillo aÃ±adir o actualizar traducciones sin riesgo de dejar cadenas sueltas en el cÃ³digo.  

---

## AÃ±adir nuevos textos traducibles con i18n

Para introducir textos nuevos en la aplicaciÃ³n, el flujo recomendado es el siguiente:  

1. **Definir una clave clara y coherente**  
   - Usar un esquema jerÃ¡rquico como `menu.settings`, `task.add`, `notes.title`, etc.  
   - Evitar nombres ambiguos o demasiado genÃ©ricos.  

2. **AÃ±adir la clave en todos los idiomas disponibles**  
   - Editar `src/locales/es.ts` y `src/locales/en.ts`, aÃ±adiendo la nueva clave con su traducciÃ³n correspondiente.  
   - Si se aÃ±aden nuevos idiomas en el futuro, hay que replicar la clave en cada uno de ellos.  

3. **Usar la clave en el cÃ³digo**  
   - En los componentes, obtener la funciÃ³n `t` desde `useI18n()` y llamar a `t('clave')`.  
   - Nunca insertar textos hardcodeados directamente en los templates.  

4. **Validar la visualizaciÃ³n**  
   - Probar la app en todos los idiomas disponibles para asegurarse de que el texto aparece correctamente traducido y sin romper el diseÃ±o.  
   - Recordar que la opciÃ³n **AUTO (system)** hace que la app arranque en el idioma del dispositivo si estÃ¡ soportado (actualmente ES o EN), y en caso contrario se aplica inglÃ©s como fallback.  

Este flujo garantiza que las nuevas cadenas se integren de forma ordenada, consistente y sin duplicar lÃ³gica en los componentes.  

---

## Notas meta del proyecto

### Nueva conversaciÃ³n principal para el desarrollo de Notifica

Â¡Hola! Esta conversaciÃ³n es la nueva conversaciÃ³n principal para el desarrollo continuo de **Notifica**, la app para registrar tareas tÃ©cnicas por turnos, pensada para uso sin conexiÃ³n y exportaciÃ³n rÃ¡pida de registros.

ðŸ“Œ **Uso de la conversaciÃ³n:**  
Esta conversaciÃ³n servirÃ¡ para:  
- Tomar decisiones de diseÃ±o, UX y arquitectura.  
- Ejecutar tareas de desarrollo en bloques claros y validados.  
- Resolver dudas tÃ©cnicas sin suposiciones.  
- Documentar avances y acuerdos.  
- Mantener un hilo Ãºnico de trabajo con contexto limpio, enfocado y actualizado.

ðŸ“‚ **Archivos que se subirÃ¡n al iniciar esta conversaciÃ³n:**  
- `Notifica-Roadmap.md`  
- `README.md`  
- `dev-notes.md`  
(para cargar el estado actual y asegurar trazabilidad completa del proyecto)

ðŸ“ **Normas de trabajo para esta conversaciÃ³n:**  
- Todo cÃ³digo o documentaciÃ³n debe entregarse en un bloque `.txt` o `.md` sin interpretar, para permitir copiar de un clic.  
- Antes de escribir cÃ³digo, se debe pedir siempre el fragmento actual necesario. No se permite suponer estructura o lÃ³gica.  
- Las tareas se abordan en bloques secuenciales. Cada bloque debe quedar cerrado (validado + commit) antes de pasar al siguiente.  
- Se recuerda validar todos los cambios en entorno real (PWA y APK) antes de considerarlos completados.

ðŸ”„ **Contexto general del proyecto:**  
- El sistema base estÃ¡ finalizado y validado. La app funciona como PWA offline y tambiÃ©n como APK Android firmada.  
- El proyecto se encuentra en la **Etapa 8 del Roadmap**, enfocada en mejoras estructurales, pulido visual y consolidaciÃ³n previa a la publicaciÃ³n pÃºblica.  
- El desarrollo sigue un roadmap riguroso con commits estructurados, pruebas cruzadas en mÃ³vil, emulador y navegador, y documentaciÃ³n exhaustiva.

ðŸ› ï¸ **Ãšltimos bloques completados:**  
- Lista de ultimas tareas o bloques completados.

ðŸŽ¯ **Siguiente tarea prevista:**  
- Tarea o tareas del roadmap que se pretende abordar o tomar la decisiÃ³n de cual elegir.

ðŸ“– **Notas y aprendizajes estructurales del proyecto:**  
- Cambiar de conversaciÃ³n en el momento adecuado ayuda a evitar errores por saturaciÃ³n de contexto.  
- Cada bloque complejo debe cerrarse con su commit propio antes de continuar.  
- Las validaciones cruzadas (PWA, Android, mÃ³vil real) son parte integral del flujo.  
- Se prioriza la calidad, claridad y mantenimiento futuro del proyecto frente a lanzamientos apresurados.  
- Las decisiones estratÃ©gicas (como el enfoque de producto o cambios en la estructura) deben documentarse explÃ­citamente en `dev-notes.md` o el roadmap.  
- Encapsular UI interactiva en componentes ayuda a reducir el tamaÃ±o de App.vue sin perder control funcional.   
- Confirmado que `touch-action: manipulation` y `-webkit-text-size-adjust: 100%` aplicados globalmente corrigen el bug crÃ­tico de scroll en iOS PWA. Este conocimiento es reutilizable en proyectos como Nocta.
- Validaciones completas y rÃ¡pidas en entorno real permiten cerrar tareas menores con agilidad y seguridad.

---

### Notas para generar mensaje para nueva conversacion de desarrollo

Cuando se genere una nueva conversaciÃ³n de desarrollo para Notifica:

- Mantener el encabezado â€œÂ¡Hola! Esta conversaciÃ³n es la nueva conversaciÃ³n principal para el desarrollo continuo de Notificaâ€¦â€
- Incluir:  
  - Uso previsto de la conversaciÃ³n  
  - Archivos que se subirÃ¡n  
  - Normas de trabajo (cÃ³digo en `.txt`, bloques secuenciales, validaciÃ³n real)  
  - Contexto general actualizado del proyecto  
  - Ãšltimos bloques completados  
  - Siguiente tarea prevista  
  - Notas y aprendizajes estructurales (nunca eliminar los anteriores si siguen vigentes; aÃ±adir los nuevos)
- No usar markdown interpretado. Entregar como bloque `.txt` o `.md` simple para poder copiar fÃ¡cilmente.
- Usar frases claras, sintÃ©ticas y orientadas a acciÃ³n.
- Solo incluir tareas validadas y documentadas. Nunca asumir el estado de una tarea no confirmada.
- Incluir en â€œaprendizajes estructuralesâ€ cualquier conclusiÃ³n Ãºtil no reflejada aÃºn en los documentos del proyecto.

### Normas para generar bloques de documentaciÃ³n en dev-notes

**Objetivo:**  
Estandarizar la forma de redactar nuevos bloques de documentaciÃ³n dentro de este archivo, para mantener coherencia, claridad y trazabilidad entre conversaciones.

**Normas generales:**

- **UbicaciÃ³n:** El asistente debe decidir en quÃ© secciÃ³n del documento encaja mejor el nuevo bloque, basÃ¡ndose en el contenido ya existente. No debe crear secciones nuevas innecesariamente.
- **Ãndice:** Siempre debe generarse una lÃ­nea para el Ã­ndice, con el formato exacto ya utilizado (`- [TÃ­tulo](#ancla)`), sin sÃ­mbolos extra.
- **Formato:** 
  - Usar `##` para secciones principales y `###` para subsecciones dentro de ellas.
  - Usar **negritas** para resaltar partes importantes, no tÃ­tulos.
  - No incluir bloques de cÃ³digo ni anotaciones tÃ©cnicas que ya estÃ©n presentes en los archivos del proyecto.
- **Contenido:** La redacciÃ³n debe explicar claramente el contexto, los motivos de la decisiÃ³n, pruebas realizadas, y resultado final. Debe poder entenderse sin necesidad de leer el cÃ³digo fuente.
- **Entrega:** El bloque debe entregarse como texto plano, en un bloque `.txt` o `.md` sin interpretar, para permitir copiar y pegar fÃ¡cilmente.

**AplicaciÃ³n:**  
Estas reglas deben seguirse siempre que se documente una nueva decisiÃ³n tÃ©cnica, funcionalidad implementada, hallazgo relevante o cualquier aspecto del proyecto que requiera trazabilidad.


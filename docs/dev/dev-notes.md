# 📓 Notas de desarrollo – Notifica

Este documento recoge decisiones técnicas, flujos de trabajo y convenciones para el desarrollo y mantenimiento de Notifica.

## Índice

- [Contexto general del proyecto (actualizado 04/08/2025)](#contexto-general-del-proyecto-actualizado-04082025)
- [Flujo de versiones y despliegue](#flujo-de-versiones-y-despliegue)
  - [Flujo de merges y releases](#flujo-de-merges-y-releases)
  - [Publicación de versión PWA y gestión de versiones](#publicación-de-versión-pwa-y-gestión-de-versiones)
  - [Publicar una actualización de Android (.aab)](#publicar-una-actualización-de-android-aab)
  - [Revisión del .aab antes de lanzar testing externo](#revisión-del-aab-antes-de-lanzar-testing-externo)
- [Convenciones y control de versiones](#convenciones-y-control-de-versiones)
  - [Convenciones y buenas prácticas de control de versiones](#convenciones-y-buenas-prácticas-de-control-de-versiones)
- [Funcionalidades y decisiones técnicas](#funcionalidades-y-decisiones-técnicas)
  - [Sistema de toasts](#sistema-de-toasts)
  - [Paleta clara validada para modo light](#paleta-clara-validada-para-modo-light)
  - [Exportar archivo JSON en Android](#exportar-archivo-json-en-android)
  - [Capacitor Share: problema con compartir en Android](#capacitor-share-problema-con-compartir-en-android)
  - [Enfoque estratégico de publicación (etapa 8)](#enfoque-estratégico-de-publicación-etapa-8)
  - [Eliminación del reload tras deshacer "Borrar todo"](#eliminación-del-reload-tras-deshacer-borrar-todo)
  - [Transición visual global en cambio de tema (modo claro ↔ oscuro)](#transición-visual-global-en-cambio-de-tema-modo-claro--oscuro)
  - [Inicialización temprana del modo oscuro en main.ts](#inicialización-temprana-del-modo-oscuro-en-maints)
  - [Animación colapsable del bloque de apariencia (max-height + scrollHeight)](#animación-colapsable-del-bloque-de-apariencia-max-height--scrollheight)
  - [Modo oscuro: uso de `class` y soporte para preferencia del sistema](#modo-oscuro-uso-de-class-y-soporte-para-preferencia-del-sistema)
  - [Notas por turno: sistema editable vinculado a shiftId](#notas-por-turno-sistema-editable-vinculado-a-shiftid)
- [Errores y problemas documentados](#errores-y-problemas-documentados)
  - [Bug en iOS PWA: scroll azul tras cerrar teclado](#bug-en-ios-pwa-scroll-azul-tras-cerrar-teclado)
  - [Problemas comunes en emuladores Android](#problemas-comunes-en-emuladores-android)
  - [Validación de bugs: scroll y animación toast](#validación-de-bugs-scroll-y-animación-toast)
  - [Limitación: clases dinámicas de color en SVG con funciones personalizadas](#limitación-clases-dinámicas-de-color-en-svg-con-funciones-personalizadas)
  - [Limitación: clases dinámicas de Tailwind no aplicadas](#limitación-clases-dinámicas-de-tailwind-no-aplicadas)
  - [Bug con getShiftColor: diagnóstico y solución definitiva](#bug-con-getshiftcolor-diagnóstico-y-solución-definitiva)
  - [Bug con clases `text-*` no aplicadas por Tailwind](#bug-con-clases-text--no-aplicadas-por-tailwind-extendcolors-vs-extendtextcolor)
  - [Bug con colores en toasts: diagnóstico y solución](#bug-con-colores-en-toasts-diagnóstico-y-solución)
  - [Logo dinámico en modo claro/oscuro](#logo-dinámico-en-modo-clarooscuro)
  - [Bug visual en botones móviles: hover pegado tras pulsar](#bug-visual-en-botones-móviles-hover-pegado-tras-pulsar)
  - [Bug en animación del colapsable de notas del turno](#bug-en-animación-del-colapsable-de-notas-del-turno)
  - [Bug: icono maskable recortado en instalación PWA Android](#bug-icono-maskable-recortado-en-instalación-pwa-android)
  - [Bug: manifiesto PWA no detectado en previews protegidos de Vercel](#bug-manifiesto-pwa-no-detectado-en-previews-protegidos-de-vercel)
  - [Safe Areas: integración, fallos y solución definitiva (plugin EdgeToEdge)](#safe-areas-integración-fallos-y-solución-definitiva-plugin-edgetoedge)
  - [Bug crítico: el plugin capacitor-navigation-bar rompe la build debug](#bug-crítico-el-plugin-capacitor-navigation-bar-rompe-la-build-debug)
  - [Gestión dinámica de la barra de estado (StatusBar)](#gestión-dinámica-de-la-barra-de-estado-statusbar)
- [UI, diseño y experiencia de usuario](#ui-diseño-y-experiencia-de-usuario)
  - [Splash personalizada en Android](#splash-personalizada-en-android)
  - [Descripción para ficha de Play Store](#descripción-para-ficha-de-play-store)
  - [Reestructuración del layout de las tareas para alineación precisa (botón, duración, horas)](#reestructuración-del-layout-de-las-tareas-para-alineación-precisa-botón-duración-horas)
  - [Bloque de apariencia: diseño UI y selector de tema](#bloque-de-apariencia-diseño-ui-y-selector-de-tema)
- [Notas meta del proyecto](#notas-meta-del-proyecto)
  - [Nueva conversación principal para el desarrollo de Notifica](#nueva-conversación-principal-para-el-desarrollo-de-notifica)
  - [Notas para generar mensaje para nueva conversacion de desarrollo](#notas-para-generar-mensaje-para-nueva-conversacion-de-desarrollo)
  - [Normas para generar bloques de documentación en dev-notes](#normas-para-generar-bloques-de-documentación-en-dev-notes)

---

## Mantenimiento de este documento

- Mantener el índice actualizado al añadir nuevas secciones o bloques.
- Evitar añadir encabezados `###` o `####` innecesarios:  
  - Usar solo `##` para secciones principales (reflejadas en el índice).
  - Usar `###` solo si es imprescindible para estructurar subsecciones claras.
  - Para bloques internos, preferir **negrita como subtítulo** (`**Texto:**`) en lugar de más niveles de encabezado.
- No usar `---` como separadores dentro de una misma sección.
- Formatear bloques de código con indentación (`4 espacios`), no con bloques tipo ```.
- Incluir fechas en los bloques cuando sea relevante para contexto o trazabilidad.
- Usar encabezados consistentes y sin emojis a partir del nivel `##`.
- Insertar nuevos bloques en la sección temática adecuada (versión, errores, diseño, etc.).
- Revisar y reordenar si una sección acumula demasiado contenido o se vuelve ambigua.
- Validar el estilo visual del documento después de reestructuraciones extensas.

---

## Contexto general del proyecto (actualizado 04/08/2025)

**Notifica** es un proyecto personal iniciado por el autor, técnico de mantenimiento en una fábrica, con el objetivo de sustituir el uso de notas manuales para registrar tareas técnicas durante la jornada laboral. Desde el principio se concibió como una herramienta de uso diario en un entorno real, con foco en la agilidad, la persistencia local y la posibilidad de exportar fácilmente los registros al final del turno.

El autor no tiene formación previa en programación ni diseño. Todo el desarrollo ha sido autoguiado, estructurado y asistido mediante el uso intensivo de ChatGPT como herramienta de apoyo técnico y de producto. Esto ha permitido transformar intuiciones sobre diseño, usabilidad y estructura en soluciones concretas, razonadas y funcionales. El trabajo se ha organizado en etapas con un roadmap progresivo, commits siguiendo convenciones estrictas, y documentación estructurada en este archivo (`dev-notes.md`) y en el `README.md`.

El proyecto ha evolucionado desde una aplicación mínima hasta un producto completo con funcionalidades avanzadas: modo oscuro con detección de sistema y selector manual, sistema propio de notificaciones visuales (toasts), diseño responsive y multiplataforma (PWA + APK nativo), y refinamiento visual y de interacción basado en pruebas reales con usuarios.

Durante el desarrollo se pausó temporalmente para comenzar otro proyecto más ambicioso, **Nocta**, motivado por el uso diario y consistente de Notifica por parte del autor y varios compañeros. Al retomarlo, se aplicaron mejoras estructurales, refactors, y componentes reutilizables pensando en su portabilidad hacia Nocta. Todo el conocimiento técnico adquirido se ha documentado cuidadosamente para poder ser replicado y escalado en futuros desarrollos.

Actualmente (agosto 2025), Notifica se encuentra en fase de publicación como beta cerrada en Google Play Store, con versiones estables validadas en Android, iOS (PWA) y escritorio. La aplicación es funcional, robusta, sin dependencias externas innecesarias, y se utiliza activamente en jornada laboral real. Además de su valor práctico inmediato, este proyecto representa un hito personal de aprendizaje completo: desde el diseño conceptual hasta la publicación y mantenimiento de una app multiplataforma lista para usuarios externos.

Esta nota resume el contexto técnico y personal del proyecto, para referencia futura o para cualquier lector que consulte este archivo en busca de comprensión global del propósito y recorrido de Notifica.


## Flujo de versiones y despliegue

### Flujo de merges y releases

- La rama `main` representa la versión estable y se despliega automáticamente en producción (Vercel, Play Store).
- La rama `develop` es el entorno de trabajo diario: cada push genera un deploy preview en Vercel para testear cambios sin afectar producción.
- Para subir cambios a producción:
  1. Revisa que `develop` esté actualizado:
     - git checkout develop
     - git pull
  2. Abre un Pull Request en GitHub de `develop` → `main`.
  3. En el PR:
     - Añade descripción de bloques completados, bugs corregidos o mejoras.
     - Adjunta capturas si es necesario.
  4. Revisa el diff en GitHub y aprueba el PR.
  5. Mergéalo: esto actualizará `main` y desplegará la nueva versión estable.
  6. (Opcional) Crea un tag en `main` para marcar el release:
     - git checkout main
     - git pull
     - git tag vX.Y.Z -m "Descripción breve del release"
     - git push origin vX.Y.Z
- Recomendación: mantén un historial claro y limpia la rama `develop` periódicamente rebaseando si es necesario.

### Publicación de versión PWA y gestión de versiones

La versión web (PWA) de Notifica se despliega automáticamente cada vez que se hace `merge` a la rama `main`. Este proceso está configurado en Vercel y no requiere pasos adicionales manuales.

**Estructura y flujo de despliegue:**

- La rama `develop` se usa para el desarrollo diario.
- La rama `main` contiene la versión estable que se publica automáticamente en Vercel como PWA.
- Cada vez que se desea actualizar la PWA:
  1. Se completan los cambios en `develop`.
  2. Se realiza un Pull Request de `develop` → `main`.
  3. Al hacer merge, Vercel despliega la nueva versión automáticamente.
  4. Opcionalmente, puede añadirse un tag git (`vX.Y.Z`) para marcar el release.

**Gestión de versiones:**

La versión de la app se muestra actualmente en dos lugares:

1. package.json
   - Campo "version": "1.0.0" refleja la versión del proyecto.
   - Esta es la fuente de verdad y debería actualizarse manualmente antes de cada publicación.

2. SideMenu.vue
   - La versión aparece en el pie del menú lateral como texto hardcodeado (ej. Notifica v1.0.0 - JCPD 2025).
   - Debe actualizarse manualmente para que coincida con package.json.

3. Android (si aplica)
   - En android/app/build.gradle, se gestiona por separado mediante:
     - versionCode (entero creciente para updates)
     - versionName (cadena visible en Play Store, recomendable sincronizarla con package.json y SideMenu.vue).

**Mejora opcional futura:**

Puede automatizarse la sincronización entre package.json y la versión mostrada en el footer de SideMenu.vue usando Vite.  
Esto permitiría importar la versión con:

  import { version } from '../package.json'

Y usarla como variable reactiva.  
Por ahora se mantiene la edición manual para simplicidad y control total.

**Actualización recomendada:**

Antes de hacer merge a main para publicar una nueva versión PWA:

- [ ] Aumentar versión en package.json ("version": "1.X.Y")
- [ ] Actualizar texto en SideMenu.vue
- [ ] (Opcional) Sincronizar versionName en Android (build.gradle)
- [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "Descripción del release"
      git push origin v1.X.Y

### Publicar una actualización de Android (.aab)

Pasos para crear y subir una nueva versión firmada a Google Play:

1. Aumentar versión:
   - Editar `android/app/build.gradle`:
     - `versionCode`: sumar 1 (ej: 2 → 3)
     - `versionName`: nueva etiqueta visible (ej: "1.0.2")

2. Sincronizar Gradle y generar `.aab`:
   - En Android Studio:
     - `File > Sync Project with Gradle Files`
     - `Build > Build Bundle(s) / APK(s) > Build Bundle`
   - El archivo se genera en:
      android/app/build/outputs/bundle/release/app-release.aab
   - Renombrar con marca temporal:
      app-release-YYYY-MM-DD-HH-MM.aab
   - Verificar que la ruta `android/app/build/` está incluida en `.gitignore`

3. Subir a Google Play Console:
   - Ir a la app > `Versión > Pruebas internas` o `Producción` > Crear versión
   - Subir el `.aab` renombrado
   - No activar “Incluir versión anterior”, a menos que se suban múltiples bundles segmentados (por arquitectura, región, etc.). En actualizaciones normales debe subirse solo la nueva versión.
   - Revisar nombre de versión generado (`3 (1.0.2)` por ejemplo)
   - Añadir notas de la versión (idioma `es-ES`):
      <es-ES>
        Descripción breve de cambios incluidos.
      </es-ES>

4. Instalar en dispositivo real desde el enlace de test interno o Play Store

### Revisión del `.aab` antes de lanzar testing externo

[Actualizado 02/08/2025 - ✅ Lista completada]

(ver roadmap Etapa 8: “Lanzar fase de testing real con usuarios externos”)

**Funcionamiento general**
- ✅ Lanzamiento rápido y sin errores
- ✅ Splash personalizada aparece correctamente (Android 12+ y 10)
- ✅ Navegación fluida entre acciones (crear, cerrar, exportar, borrar)
- ✅ Scroll correcto en listas largas de tareas - En listas cortas mantiene bug scroll extra en main. En listas largas, selector de turno no se ve (abajo fuera de pantalla)
- ✅ Sin cierres, cuelgues ni errores visibles

**Persistencia y datos**
- ✅ Tareas se guardan correctamente entre sesiones
- ✅ Exportación en texto plano funciona y copia al portapapeles o usa share
- ✅ Exportación como `.json` se ofrece para compartir (Capacitor Share)
- ✅ Importación de `.json` funciona
- ✅ "Borrar todo" borra efectivamente y muestra feedback

**Interfaz**
- ✅ Header fijo visible correctamente
- ✅ Toasts aparecen bien (posición, stacking, botones funcionales)
- ✅ Formulario “Iniciar tarea” funciona sin glitches
- ✅ Lista de tareas y botones responden correctamente
- ✅ El menú lateral abre y cierra sin problemas

**Experiencia visual**
- ✅ No hay scroll fantasma ni glitches al abrir teclado - si lo hay con poco contenido
- ✅ Tipografía, colores, espaciado coherentes
- ✅ Iconos visibles y en su sitio
- ✅ Animaciones presentes donde corresponde

**Integración Android**
- ✅ Splash screen limpia sin halo ni deformación
- ✅ Icono visible correctamente (maskable, sin fondo gris)
- ✅ No hay permisos extra solicitados
- ✅ Compatible con modo oscuro si está activado - No existe modo oscuro. ¿costaría mucho de integrar?

**Otros detalles**
- ✅ Número de versión correcto (`versionName` y `versionCode`)
- ✅ Pie de menú muestra versión actual
- ✅ No hay regresiones respecto a versión anterior
- ✅ Confirmado que está firmada y se instala desde Play Store (canal de test)

---

## Convenciones y control de versiones

### Convenciones y buenas prácticas de control de versiones

Este proyecto sigue un conjunto claro de normas para garantizar un historial de cambios limpio, entendible y trazable en Git.

### 🧱 Estructura de los commits

- Se utiliza el formato de Conventional Commits:

    tipo: descripción breve y clara

  Ejemplos:
    - feat: añadir soporte para modo oscuro
    - fix: corregir bug visual en selector de turno
    - refactor: extraer formulario de nueva tarea a componente
    - docs: actualizar README con información de la versión Android

- Tipo puede ser: feat, fix, refactor, docs, chore, style, etc.
- Siempre en español.
- Usar imperativo (ej. añadir, corregir, actualizar), no infinitivo.

### 📥 Inclusión de archivos nuevos

- ⚠️ El comando `git commit -am` no incluye archivos nuevos (solo modifica los ya trackeados).
- Por tanto, se recomienda usar siempre:
    git add . && git commit -m "mensaje claro"

- Esto asegura que todos los archivos modificados y creados se incluyan en el commit.
- Solo se puede usar `git commit -am "..."` si estás 100% seguro de que:
    - No se ha creado ningún archivo nuevo.
    - Solo se están modificando archivos ya existentes.

### 🔍 Revisión antes de cada commit

- Usar `git status` para confirmar qué archivos están modificados, añadidos o no incluidos.
- Confirmar que no se han olvidado archivos importantes (componentes .vue, tailwind.config.js, etc.).

### 🧪 Validación antes de confirmar cambios

- Se debe validar la funcionalidad en entorno local (navegador o PWA) antes de hacer el commit.
- En bloques complejos, validar también en Android o emuladores si aplica.
- El commit debe realizarse después de la validación, no antes.

### 🧭 Organización por bloques

- Cada tarea del roadmap debe cerrarse con un commit propio.
- Si se trata de un bloque largo, puede dividirse en varios commits, pero todos deben ser claros y seguir la convención.
- No se deben agrupar cambios de distintas tareas en un solo commit.

### 🏷️ Tags y versiones

- Las versiones estables se etiquetan en la rama main con:
    git tag v1.X.Y -m "Descripción del release"
    git push origin v1.X.Y

- Esto debe hacerse solo tras merge a main y validación completa.

---

## Funcionalidades y decisiones técnicas

### Sistema de toasts

Se reemplazó la librería externa `vue-sonner` por un sistema de notificaciones propio inspirado en Nocta.  
Motivos:
- Mayor control visual y de interacción  
- Mejor integración con el diseño y lógica de Notifica  
- Eliminación de dependencias innecesarias  

El sistema se basa en:
- `Toast.vue`: componente individual de notificación  
- `useToast.ts`: composable para gestionar estado reactivo de los toasts y control de cierre  
- `toast.ts`: función `add(...)` para mostrar toasts desde cualquier lugar  
- `<Teleport>` y `<TransitionGroup>` en `App.vue` para renderizar toasts fuera del flujo principal  

Mejoras aplicadas respecto a Nocta:
- Soporte para uno o varios botones de acción mediante `actions[]` con `label` y `onClick`  
- Estilo animado en botones de acción (`scale-95` al pulsar)  
- Animación al montar el botón (`animate-pop` tras 300 ms en el primero)  
- Cierre diferido del toast para permitir ver la animación de pulsación  
- Separación clara entre ejecución de acción y cierre visual del toast  
- Estilos personalizados por tipo (`success`, `info`, `error`, `warning`) con icono SVG, fondo pastel y bordes redondeados  
- Layout compacto y centrado (`max-w-xs`), con margen inferior ajustado para evitar conflicto con barras de sistema  
- Apilamiento dinámico con animación de transición (`translate-y` y `opacity`) al reordenarse  
- Integración visual coherente con el resto de la interfaz (colores, botones, tipografía)  
- Comportamiento corregido en PWA iOS: el botón de acción ya reacciona correctamente al tacto (`@touchstart`)  
- Bloqueo de selección de texto en todo el toast (`select-none`) para evitar comportamiento inesperado en móviles  

Nuevas capacidades añadidas:
- `delayClose`: los toasts no se cierran automáticamente. El temporizador de cierre solo se activa tras pulsar fuera del toast. Permite mantener opciones activas como “Deshacer” el tiempo que el usuario necesite.  
- `startDismissTimer(id, duración?)`: se exporta desde `useToast.ts` para iniciar el cierre manual desde fuera  
- Detección automática de tap fuera en `Toast.vue` si `delayClose` está activo (evento `pointerdown`)  
- Soporte para `actions.length > 1`: se renderizan todos los botones en fila con estilo consistente  
- Preparado para `persistent: true` en el futuro (toast que solo se cierra con ✕ o interacción explícita)  

Estado de validación:
- Comprobado y validado en escritorio, Android nativo, PWA Android y PWA iOS  
- Todos los toasts funcionales, consistentes y con cierre progresivo según lo esperado  
- El sistema mantiene retrocompatibilidad con toasts simples sin acción  
- No se han detectado problemas de eventos en móviles ni pérdidas de reactividad  

Este sistema puede reutilizarse o retroportarse a Nocta con pequeñas adaptaciones, manteniendo una base común de diseño, UX y lógica.

Tareas pendientes o ideas futuras:
- (Opcional) Añadir variante `persistent` para banners que solo se cierren manualmente  
- (Opcional) Añadir barra de progreso visual o transición de opacidad en cierre tras tap fuera  
- (Opcional) Resaltar brevemente el contenido afectado por la acción (e.g. Deshacer)  
- (Opcional) Documentar ejemplo de uso avanzado con múltiples acciones o `onDismiss`

### Paleta clara validada para modo light

[24/07/2025]  
Esta es la versión final validada de la paleta clara de Notifica.  
Se considera estable y es la base oficial sobre la que se definirá el modo oscuro.  
Incluye tokens personalizados organizados por propósito, con semántica clara y coherencia visual validada en app real.

**Superficies y contornos:**

- `app-bg`: fondo general de la app → `#f5f7fa`
- `surface-1`: tarjetas, contenedores, etc. → `#ffffff`
- `surface-hover`: hover sobre elementos claros → `#e2e8f0`
- `surface-pressed`: al pulsar botones claros → `#e5e7eb`
- `surface-thumb`: fondo del pulgar en toggles → `#ffffff`
- `divider`: líneas divisorias, contornos suaves → `#cbd5e1`

**Controles y acción principal:**

- `accent-main`: botones principales y elementos destacados → `#93c5fd`
- `toggle-inactive`: fondo de switches desactivados → `#cbd5e1`

**Estados visuales (semánticos):**

- `status-success`: fondo verde claro para tareas finalizadas → `#d1fae5`
- `status-success-hover`: hover sobre botones de éxito → `#a7f3d0`
- `status-success-dark`: placeholder para modo oscuro → `#a7f3d0`
- `status-success-dark-hover`: idem → `#6ee7b7`

- `status-alert`: estado de advertencia → `#fecaca`
- `status-active`: amarillo activo (ej. tarea pendiente) → `#fef08a`
- `status-inprogress`: gris azulado (estado intermedio) → `#cbd5e1`

- `status-accent`: fondo azul pastel para acciones → `#bfdbfe`
- `status-accent-hover`: hover sobre botones azules → `#93c5fd`

- `status-danger`: acciones destructivas → `#fecaca`
- `status-danger-hover`: hover para confirmar eliminación → `#fca5a5`

- `status-purple`: morado pastel para botones secundarios → `#ddd6fe`
- `status-purple-hover`: hover morado claro → `#c4b5fd`
- `status-purple-dark`: placeholder dark → `#c4b5fd`
- `status-purple-dark-hover`: placeholder dark → `#a78bfa`

*Nota:* Algunos colores coinciden entre `alert`, `danger`, `error`, etc. por decisión semántica. Se mantienen como tokens separados para permitir diferenciación futura.

**Texto:**

- `main`: texto primario → `#334155`
- `on-pastel`: texto oscuro sobre fondo pastel → `#1e293b`
- `subtle`: texto secundario o complementario → `#64748b`
- `placeholder`: inputs y texto gris tenue → `#94a3b8`
- `muted-80`: texto desactivado con opacidad → `rgba(148, 163, 184, 0.8)`

**Texto fuerte por tipo:**

- `success-strong`: `#047857`
- `alert-strong`: `#b91c1c`
- `danger-strong`: `#b91c1c`
- `active-strong`: `#b45309`
- `accent-strong`: `#2563eb`
- `purple-strong`: `#6d28d9`

**Turnos:**

- `shift-morning`: amarillo → `#facc15`
- `shift-afternoon`: naranja → `#f59e0b`
- `shift-night`: azul oscuro → `#6366f1`

**Turnos en modo oscuro (placeholder):**

- `shift-morning-dark`: `#fde68a`
- `shift-afternoon-dark`: `#fcd34d`
- `shift-night-dark`: `#a5b4fc`

**Toasts:**

- `toast-success`: fondo → `#ecfdf5`
- `toast-success-action`: botón → `#d1fae5`
- `toast-success-action-hover`: hover → `#bbf7d0`
- `toast-success-border`: borde → `#a7f3d0`
- `toast-success-text`: texto principal → `#15803d`
- `toast-success-action-text`: botón → `#16a34a`
- `toast-success-close`: icono cerrar → `#22c55e`
- `toast-success-close-hover`: hover cerrar → `#166534`

- `toast-error`: fondo → `#fef2f2`
- `toast-error-action`: botón → `#fee2e2`
- `toast-error-action-hover`: hover → `#fecaca`
- `toast-error-border`: borde → `#fecaca`
- `toast-error-text`: texto principal → `#b91c1c`
- `toast-error-action-text`: botón → `#dc2626`
- `toast-error-close`: icono cerrar → `#f87171`
- `toast-error-close-hover`: hover cerrar → `#991b1b`

- `toast-warning`: fondo → `#fefce8`
- `toast-warning-action`: botón → `#fef9c3`
- `toast-warning-action-hover`: hover → `#fef08a`
- `toast-warning-border`: borde → `#fde68a`
- `toast-warning-text`: texto → `#a16207`
- `toast-warning-action-text`: botón → `#ca8a04`
- `toast-warning-close`: cerrar → `#eab308`
- `toast-warning-close-hover`: hover cerrar → `#92400e`

- `toast-info`: fondo → `#eff6ff`
- `toast-info-action`: botón → `#dbeafe`
- `toast-info-action-hover`: hover → `#bfdbfe`
- `toast-info-border`: borde → `#bfdbfe`
- `toast-info-text`: texto → `#1d4ed8`
- `toast-info-action-text`: botón → `#2563eb`
- `toast-info-close`: cerrar → `#60a5fa`
- `toast-info-close-hover`: hover cerrar → `#1e40af`

**Notas:**

- Todos los tokens están definidos como `textColor`, `backgroundColor` o `borderColor` para asegurar que Tailwind genere las clases correspondientes.
- Validado en app real (móvil y escritorio).
- Estilo pastel deliberado, sin redundancias técnicas.
- Listo para derivar la versión `dark`. Los `*-dark` actuales son marcadores provisionales.


### Exportar archivo JSON en Android

Problema: en Android nativo, la exportación por "a download" no generaba ningún archivo visible.

Solución: se combinó @capacitor/filesystem (para guardar en Directory.Cache) con @capacitor/share para permitir compartir el archivo .json generado.

Resultado:
- En PWA/navegador, se mantiene la descarga directa como antes.
- En Android, se lanza un diálogo para compartir el archivo con apps compatibles (Drive, Gmail, etc.).

Limitación aceptada: no siempre aparece una opción de "Guardar en Archivos"; depende del dispositivo y apps instaladas.

Función validada como completa y estable.

### Capacitor Share: problema con compartir en Android

**Síntoma:**  
El botón "Compartir" funcionaba correctamente en PWA, pero no mostraba el diálogo nativo en la app Android instalada. En algunos casos mostraba solo el toast de "copiado al portapapeles", y en otros lanzaba errores.

**Diagnóstico:**
- El botón usaba `@capacitor/share`, correctamente instalado y sincronizado.
- El código estaba bien estructurado, pero el comportamiento en Android no reflejaba los cambios del frontend (ni el botón de test se mostraba).
- Se detectó que no se estaba ejecutando `npm run build` tras los cambios en el frontend, por lo que la app nativa no incluía los cambios.

**Solución:**
1. Ejecutar `npm run build` para compilar el frontend.
2. Ejecutar `npx cap copy android` para copiar los archivos a `/android/app/src/main/assets/public`.
3. Recompilar la app desde Android Studio.

Esto permitió que la versión instalada mostrara correctamente el botón y ejecutara el diálogo nativo de compartir.

**Conclusión:**
Cada vez que se hagan cambios en la interfaz o lógica del frontend:
- Ejecutar `npm run build`
- Luego `npx cap copy android`
- Luego `npx cap open android`
- Y recompilar desde Android Studio.

Así se asegura que la app nativa use los archivos más recientes.

### Enfoque estratégico de publicación (etapa 8)

Durante la etapa 8 del roadmap, centrada en preparar la publicación de la app en Google Play, se identificó un requisito no previsto: el sistema exige un periodo mínimo de pruebas internas o cerradas con al menos 12 testers activos durante 14 días para habilitar el lanzamiento abierto.

Este descubrimiento generó una aceleración artificial del flujo de trabajo, con prioridad inmediata sobre la validación de la APK y la PWA. Como consecuencia, se acumularon tareas técnicas, revisiones visuales y mejoras funcionales menores que empezaron a percibirse como urgentes.

Tras una revisión del estado real del proyecto y de su uso actual, se tomó la decisión de priorizar la estabilidad, la claridad y la orientación a producto a largo plazo. Se reorganizó la etapa 8 del roadmap en consecuencia:

- Se pospuso el testing real de la APK al final del bloque.
- Se incorporaron mejoras estructurales opcionales con visión de producto (modo oscuro, multidioma, ayuda al usuario…).
- Se confirmó que la versión actual es funcional y estable, y que los usuarios activos ya la utilizan con normalidad desde hace semanas.
- Se reafirmó que la app se está desarrollando como un producto potencialmente útil para un público más amplio, más allá del entorno inmediato, apostando por la calidad y manteniendo la sencillez.

Esta decisión permitió devolver el control del ritmo de desarrollo al criterio interno, evitando decisiones precipitadas basadas en plazos externos.

### Eliminación del reload tras deshacer "Borrar todo"

[20/07/2025]  
Se eliminó la llamada a `window.location.reload()` que se ejecutaba al cerrar el toast de “Tareas Restauradas” tras usar el botón de deshacer en la operación de “Borrar todo”.

**Motivo del cambio:**  
En el flujo actual, si el usuario borra todas las tareas, luego pulsa “Deshacer”, y posteriormente vuelve a pulsar “Borrar todo” antes de que el primer toast se cierre automáticamente, la app se recarga al cerrar ese primer toast.  
Esto provoca que el segundo toast desaparezca de forma inmediata e irreversible, lo que impide restaurar las tareas, causando una **pérdida de datos no recuperable**.

**Justificación técnica:**  
- `allTasks.value = [...]` ya es completamente reactivo.
- Se usa `nextTick()` correctamente para asegurar reactividad antes de cerrar el toast anterior.
- La recarga ya no es necesaria para limpiar el estado ni corregir glitches visuales.
- El comportamiento actual rompe la UX y anula el botón "Deshacer" si el usuario actúa rápidamente.

**Decisión:**  
Se elimina por completo la propiedad `onDismiss` del toast de restauración. No se deja función vacía.  
La restauración ahora es fluida, reactiva y sin recarga forzada.

Este cambio debe mantenerse salvo que una futura regresión demuestre necesidad real de una recarga manual (lo cual no es el caso actual).

### Transición visual global en cambio de tema (modo claro ↔ oscuro)

**Objetivo:**  
Permitir una transición visual suave cuando el usuario activa o desactiva el modo oscuro, sin parpadeos ni cambios bruscos, y sin romper otras transiciones como la pulsación de botones.

**Diagnóstico inicial:**  
- Se intentó aplicar una transición global con `* { transition: background-color, color, ... }` a 2500 ms.
- Funcionaba bien en algunos elementos (fondos de tareas, contenedores), pero no se aplicaba a botones e inputs.
- Algunos botones (como los que contienen solo iconos SVG) sí aplicaban la transición correctamente, lo que indicaba que no era un problema de `transition-property`, sino de selectores.

**Pruebas y hallazgos:**
- Añadir una regla específica para `button, input, textarea` permitió aplicar también la transición a estos elementos.
- Se confirmó que Tailwind aplica estilos base específicos a botones e inputs que podían anular reglas genéricas.
- Se detectó que con `transition-duration: 2500ms` también se veían afectadas animaciones de pulsación (por ejemplo, el feedback visual al hacer clic en un botón), que se volvieron lentas e imprecisas.

**Solución intermedia aplicada:**
- Se definieron dos bloques CSS explícitos:  
  1. Uno para `*` que define la transición global con `transition-property: background-color, border-color, color, fill, stroke;`.
  2. Otro para `button, input, textarea` que replica la misma transición (para asegurar aplicación uniforme).

- Se bajó la duración global de transición a `300ms`, lo que permitía:
  - Una transición clara y fluida al cambiar de modo claro ↔ oscuro.
  - Mantener animaciones rápidas e intuitivas para interacción con botones.

**Resultado intermedio:**
- Transición global de color coherente, incluida en botones e inputs.
- Compatible con pulsaciones y otras interacciones rápidas.
- Validado en navegadores de escritorio, Android y PWA iOS.

**Actualización 26/07/2025 – Eliminación de la transición global `*`**

**Problema detectado:**  
En PWA iOS (Safari y Chrome instaladas como standalone), al pasar de modo oscuro a claro, los textos (como la descripción y horas) quedaban durante varios segundos en color blanco, generando una pantalla aparentemente vacía sobre fondo claro.

**Causa confirmada:**  
La regla global `* { transition: background-color, border-color, color, fill, stroke; }` en `animations.css` era la responsable.  
iOS WebKit presenta problemas de repintado cuando se combinan:
- Cambios de color heredados por la clase `.dark` en `<html>`.
- `transition: color` heredado globalmente por todos los nodos.
- Reestructuración visual con `Transition` o `TransitionGroup`.

**Solución final aplicada:**  
- Se eliminó por completo la regla global `*` de `animations.css`.
- El cambio fue validado en entorno real: el bug desapareció y el cambio de tema es ahora inmediato, sin flashes ni retardos.
- Se comprobó que eliminar la transición global no afecta negativamente a la UX.  
  De hecho, el cambio de tema se percibe ahora como más natural y directo.

**Decisión final:**  
No se volverá a introducir transición global para colores.  
Si se desea animación en puntos específicos (botones, contenedores), se usará `transition-colors` de forma localizada.

**Estado actual:**  
- Solución robusta y sin efectos secundarios.
- Cierre validado del subbloque 5 del modo oscuro en el roadmap.

### Inicialización temprana del modo oscuro en `main.ts`

[27/07/2025]  
Para evitar el efecto de **render mixto** (pantalla inicial en modo incorrecto durante unos milisegundos antes de aplicar el tema), se decidió aplicar la clase `dark` **antes de montar la app**.

**Motivo:**  
Al usar `darkMode: 'class'` en Tailwind, la clase `dark` debe estar presente en el DOM en el momento del render inicial. Si se espera a que Vue cargue o que reactive el estado de `isDark`, el primer frame de la interfaz puede mostrarse en modo claro y luego saltar visualmente al modo oscuro, causando un efecto de parpadeo o mezcla de estilos.

**Implementación:**  
En `main.ts`, antes de `createApp(App).mount(...)`, se ejecuta la siguiente lógica:

- Se lee `darkMode` desde `localStorage` (puede ser `'light'`, `'dark'` o `'system'`).
- Si no hay valor guardado o el valor es `'system'`, se consulta `window.matchMedia(...)`.
- Si el resultado es que debe usarse el modo oscuro, se añade manualmente la clase `dark` al `<html>`:
  
      document.documentElement.classList.add('dark')

- Si no debe usarse, se asegura que la clase esté ausente con `classList.remove(...)`.

Esto permite que **la app se renderice ya en el modo correcto** desde el primer milisegundo, sin flashes ni desincronización visual.

**Estado actual:**  
- Validado en Android, PWA iOS, escritorio y dispositivos reales.
- Compatible con el sistema de preferencia `'light' | 'dark' | 'system'`.
- Solución robusta y aplicable a futuros proyectos con Tailwind y modo oscuro.

### Animación colapsable del bloque de apariencia (max-height + scrollHeight)

[27/07/2025]  
Para permitir que el bloque de apariencia en el menú lateral (`SideMenu.vue`) pueda expandirse y contraerse con una transición fluida, se aplicó una técnica basada en `max-height` y `scrollHeight`, combinada con eventos personalizados en el componente `<Transition>`.

**Motivación:**  
Las transiciones de altura con `v-if` o `v-show` no permiten animación suave, y `height: auto` no puede animarse directamente. Se necesitaba una solución que permitiera transición vertical sin salto, adaptable al contenido real.

**Implementación:**  
- Al iniciar la apertura del bloque, se mide su altura real (`scrollHeight`) y se asigna como `max-height`, lo que permite una expansión suave.
- Tras completarse la apertura, se limpia el `max-height` para no restringir futuras modificaciones dinámicas del contenido.
- Para cerrar, se vuelve a establecer el `scrollHeight` como `max-height` y luego se reduce a `0px`, generando un colapso animado.
- Toda esta lógica se gestiona mediante los hooks `onEnter`, `onLeave`, etc., definidos directamente en el componente.

**Complementos visuales:**  
- Se usa `overflow-hidden` para evitar que el contenido sea visible durante la animación de cierre.
- La duración, interpolación (`ease`), y otros efectos están definidos en las clases CSS asociadas a la transición `collapse`.

**Resultado:**  
- Transición suave y coherente al mostrar u ocultar el bloque de apariencia.
- Comportamiento robusto y validado en todos los entornos.
- Patrón reutilizable para cualquier otro bloque colapsable de la app.

### Modo oscuro: uso de `class` y soporte para preferencia del sistema

[27/07/2025]  
Para implementar el sistema de modo oscuro en Notifica se eligió el enfoque `darkMode: 'class'` en Tailwind, en lugar de la opción `media`.

**Motivos de la decisión:**

- **Control total sobre el tema activo**  
  Con `class`, la app puede cambiar de modo claro a oscuro de forma manual o programada, sin depender del sistema operativo.  
  Esto permite al usuario seleccionar su preferencia independientemente del entorno (especialmente útil en PWA y apps nativas con comportamiento propio).

- **Persistencia de preferencia**  
  Al gestionar el modo manualmente (con una clase en `<html>`), es posible guardar la elección del usuario en `localStorage`, mantenerla entre sesiones, e ignorar cambios del sistema si así lo desea.

- **Compatibilidad multiplataforma**  
  El enfoque basado en `media` (matchMedia) es reactivo pero no controlable por el usuario si no se implementa una capa adicional.  
  En iOS PWA, algunas actualizaciones de estilo pueden fallar al depender solo de `media queries`.  
  Además, con `class` se puede aplicar la clase correcta incluso **antes de que Vue se monte**, evitando parpadeos o flashes (ver bloque sobre inicialización temprana en `main.ts`).

**Integración con la preferencia `'system'`:**

- El valor `'system'` se gestiona como una tercera opción válida (`light`, `dark`, `system`) en la app.
- Si el usuario selecciona `'system'`, se evalúa el resultado de `matchMedia('(prefers-color-scheme: dark)')`.
- Se observa esa preferencia de forma reactiva, y se actualiza la clase `dark` cuando el sistema cambia de modo.
- Si el usuario cambia su selección manualmente, se detiene la escucha y se fuerza el modo elegido.

**Resultado:**  
- Sistema flexible, reactivo y respetuoso con el usuario.
- Visualmente estable, sin flashes ni parpadeos en la carga.
- Validado en dispositivos con cambios dinámicos de tema (Android, iOS, escritorio).
- Patrón sólido para futuras apps con necesidades similares de theming.

### Notas por turno: sistema editable vinculado a shiftId

**Motivación y propósito:**  
Se añadió este sistema para permitir al usuario registrar observaciones o comentarios asociados a un turno específico, sin necesidad de crear tareas estructuradas. Esto permite anotar detalles complementarios de forma libre, como incidencias menores, observaciones de proceso, entregas pendientes o cualquier otra información no formalizable como tarea.

**Estructura técnica:**  
- El almacenamiento de notas se gestiona mediante el composable `useNotes.ts`, que mantiene un objeto reactivo con claves `shiftId` y valores `string[]`.
- Las notas se guardan en `localStorage` bajo el objeto `notesByShiftId`.
- Cada turno puede tener una lista de notas independiente. Las actualizaciones se hacen a través de `setNotesForShift()` y `deleteNotesForShift()`.

**Integración visual y UX:**  
- El bloque visual se encuentra al final de `TaskList.vue`, después de las tareas.
- Se muestra un botón colapsable con el título “Notas del turno”, un icono y un contador de notas activas.
- Al expandirse, aparece una lista editable de campos tipo `textarea`. Su comportamiento incluye:
  - Siempre hay una línea vacía al final para facilitar entrada encadenada.
  - Al hacer `blur`, las notas vacías se eliminan automáticamente.
  - Si se modifica una nota existente, se actualiza en tiempo real.
  - El bloque permanece accesible incluso si todas las notas son borradas, pero se muestra colapsado por defecto en ese caso.
- La detección de `blur`, `enter` y el estado del último campo se gestionan para permitir una experiencia fluida sin botones explícitos de guardar.

**Persistencia y comportamiento reactivo:**  
- Las notas se sincronizan automáticamente tras cada edición, sin necesidad de acción manual del usuario.
- Internamente se mantiene siempre un array limpio de `string[]`, sin notas vacías.
- El sistema es compatible con sesiones anteriores: si un usuario importa un backup antiguo que no contiene `notesByShiftId`, el sistema lo ignora sin errores ni efectos colaterales.

**Exportación / Importación:**  
- En los backups `.json`, se incluye `notesByShiftId` junto al resto de claves como `tasks`.
- En la exportación de texto plano, si existen notas para el turno exportado, se añaden al final del contenido con el siguiente formato:

    🗒️ Notas:
     - Primera nota
     - Segunda nota

- Durante la importación, si `notesByShiftId` está presente y es válido, se restaura mediante `setAllNotes()`. También se toma en cuenta para determinar el turno más reciente tras la importación.

**Estilo visual final:**  
- Se igualó el ancho del bloque al de las tarjetas de tareas para mantener la coherencia del layout.
- Se mantuvieron las esquinas redondeadas (`rounded-xl`) para integrar visualmente el bloque con el resto de la app.
- Se aplicó un diseño que evoca una hoja de cuaderno:
  - Línea vertical roja (`status-alert`) como margen izquierdo.
  - `textarea` con indentación (`pl-10`) para ubicar el texto tras la línea.
  - Líneas horizontales completas mediante `border-b-2`, alineadas con el resto del layout.
- El diseño es totalmente compatible con modo claro y oscuro.

**Validación y resolución de bugs:**  
- Validado en escritorio, PWA Android, PWA iOS y APK Android real.
- Se detectó un bug que impedía visualizar el `placeholder` del campo vacío tras una recarga si no había notas. Se resolvió añadiendo una llamada a `autoResize()` del último campo tras la animación de entrada (`onAfterEnter`).
- Se confirmó que el área de clic era limitada en ese estado, pero el problema desapareció tras resolver el bug anterior.


---

## Errores y problemas documentados

### Bug en iOS PWA: scroll azul tras cerrar teclado
[Resuelto 20/07/25]

Descripción:  
En PWA instalada en iPhone, tras cerrar el teclado virtual de un `<input>` o `<textarea>`, si el usuario hace doble tap en el fondo de la app, aparece una franja vacía azul en la parte inferior. Su altura coincide con el layout visible (header, tareas, etc.).

Estado actual:
- No ocurre al abrir la app, solo tras mostrar/ocultar el teclado.
- El scroll aparece aunque el contenido no exceda el viewport.
- Solo ocurre en modo PWA standalone de iOS (no en Safari o Chrome).

Intentos de solución:
- `scrollTo(0, 0)` tras blur → no resuelve
- `overflow-hidden`, `min-h-[100svh]` y ajustes de layout → no resuelve
- Añadir `viewport-fit=cover` en meta viewport → no resuelve
- Bloquear `touchmove` durante focus de inputs → no resuelve
- Detectar y resetear scroll manualmente tras teclado → tampoco efectivo

Conclusión:
- Bug confirmado como fallo persistente de WebKit iOS.
- No tiene workaround robusto ni solución fiable sin introducir efectos secundarios.
- Dado que no rompe el uso normal y solo es visible si se fuerza, se descarta temporalmente.

Puede reintentarse en el futuro si hay avances en iOS o mejores soluciones conocidas.

[20/07/2025]  
Tras aplicar estilos globales (`touch-action: manipulation` y `-webkit-text-size-adjust: 100%`) al `<html>` y `<body>` desde `main.css`, el bug ya no se reproduce.

Verificado en:
- PWA iOS (instalada desde Safari)
- Chrome iOS
- App abierta tras cerrar teclado y realizar múltiples interacciones

**El hueco azul al hacer doble tap en área vacía ha desaparecido completamente.**  
Se considera solucionado de forma estable y no regresiva.

No se aplicaron cambios adicionales de layout ni soluciones agresivas.  
El bug queda cerrado y documentado.

### Problemas comunes en emuladores Android

**Pantalla blanca tras splash o dispositivo desconectado (API 29):**

**Síntomas:**
- La app se instala pero queda en blanco tras la splash.
- No se muestran errores en Logcat.
- A veces el emulador aparece como “offline” (`adb devices → device offline`).
- La app no responde o el sistema no la lanza tras la instalación.

**Diagnóstico:**
- El sistema WebView está roto o no instalado, especialmente tras hacer `Wipe Data` en emuladores con Android 9–10.
- También puede deberse a errores internos del emulador tras actualizaciones o limpiezas de proyecto.

**Soluciones:**
- Actualizar WebView desde Play Store dentro del emulador:
  - Abrir Play Store > "Mis apps > Actualizaciones pendientes".
  - Actualizar **Android System WebView** manualmente.
- Hacer `Wipe Data` al emulador si:
  - Está en estado `offline` persistente.
  - No lanza la app aunque la build se haya completado sin errores.
  - Se ha producido un fallo visual o de sistema sin causa clara.

**Recomendación:**
- Tras un `Wipe Data` en emuladores Android 9–10:
  - Verificar conexión ADB (`adb devices` debe decir `device`).
  - Abrir Play Store y actualizar WebView antes de lanzar la app.
- Si el error persiste:
  - Cerrar el emulador, repetir `Wipe Data`, o recrearlo desde AVD Manager.

### Validación de bugs: scroll y animación toast

[20/07/2025]  
Se validaron dos bugs registrados previamente en la sección de mejoras UX/UI y se confirmó que ya no se reproducen en la versión actual:

- **Scroll innecesario en listas cortas**  
  No se observa scroll vertical extra en vistas con 1–2 tareas. Verificado en navegador (modo móvil), PWA iOS, Android nativo y emulador.  
  Se considera corregido por los ajustes de layout ya aplicados en bloques anteriores.

- **Botón “Deshacer” sin animación al pulsar**  
  La animación `scale-95` funciona correctamente al pulsar “Deshacer” en los toasts. Verificado en todos los entornos.  
  No ha sido necesario aplicar cambios adicionales. Se considera resuelto.

No se ha modificado código funcional. Se registra como validación de cierre.

### Limitación: clases dinámicas de color en SVG con funciones personalizadas

[21/07/2025]

Los iconos SVG del selector de turno no mostraban color al aplicar clases personalizadas como `text-shift-morning`, aunque estas aparecían correctamente en el DOM y el CSS generado era válido.

Se descartaron múltiples causas: safelist, uso de `textColor`, `stroke-current`, herencia de clase desde `defineComponent`, etc. El color solo se aplicaba si se usaban clases estáticas como `text-yellow-400`.

Se concluye que Tailwind no aplica correctamente clases `text-*` generadas desde funciones dinámicas si no están referenciadas literalmente en el código fuente.

**Solución aplicada:**
  - Reescribir `getShiftColor()` para devolver directamente clases estándar (`text-yellow-400`, etc.).
  - Incluir lógica por modo claro/oscuro usando `isDark.value`.

Ejemplo:
  if (icon === 'sun') return isDark.value ? 'text-yellow-300' : 'text-yellow-400'

Esta solución funciona correctamente, permite personalización dual y se considera definitiva.

### Limitación: clases dinámicas de Tailwind no aplicadas

[21/07/2025]

**Síntomas detectados:**  
Las clases como `text-shift-*` no se aplicaban correctamente a los iconos SVG del selector de turno, aunque aparecían correctamente en el DOM. Los iconos aparecían en color gris por defecto (sin aplicar `fill` ni `text-*`).

**Diagnóstico:**  
Tailwind no interpreta clases generadas dinámicamente en tiempo de ejecución (como `'text-' + color`) porque su sistema de purgado elimina todas las clases no mencionadas literalmente en el código fuente.  
Esto impide usar funciones como `getShiftColor()` que devuelven una clase basada en lógica condicional si no hay una referencia literal a cada clase implicada.

**Hipótesis descartadas:**  
- Conflictos con clases `bg-white`, `fill-current` o `stroke-current`: sin efecto.  
- Error de lógica en `getShiftIcon` o `shiftId`: descartado tras depuración.  
- Bug de WebKit o renderizado de SVG: no aplicaba.  
- Uso de `safelist` o constante dummy con nombres de clase: probado y descartado (Tailwind no detecta clases en arrays si no se usan en el template o estilos inyectados).

**Solución aplicada:**  
Se creó un archivo centralizado `shiftColors.ts` con todas las combinaciones posibles de clases, referenciadas **de forma estática y literal**:

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

En el composable `useShifts.ts`, se usa `getShiftIcon()` para mapear el turno a `sun | clock | moon`, y `isDark.value` para decidir el modo. La clase se obtiene así:

    import { shiftColors } from '../constants/shiftColors'
    import { useDarkMode } from './useDarkMode'

    const { isDark } = useDarkMode()

    export function getShiftColor(shiftId: string): string {
      const icon = getShiftIcon(shiftId)
      return shiftColors[icon][isDark.value ? 'dark' : 'light']
    }

Esta estructura garantiza que todas las clases estén en el código fuente como strings literales, lo que permite que Tailwind las compile correctamente incluso tras purgado.

**Estado actual:**  
Validado en todos los entornos (PWA iOS, Android, navegador).  
Los iconos SVG del selector de turno muestran el color correcto tanto en modo claro como oscuro.  
La solución es clara, mantenible y extensible a cualquier sistema de clases condicionadas.

### Bug con getShiftColor: diagnóstico y solución definitiva

[21/07/2025]

**Síntomas observados:**  
Los iconos del selector de turno (sol, reloj, luna) y los textos asociados aparecían sin color o con estilos incorrectos tras refactorar el sistema de turnos.  
El DOM mostraba clases `text-*` en los `svg`, pero visualmente no se aplicaban los colores esperados.

**Diagnóstico:**  
La función `getShiftColor()` devolvía clases de forma dinámica, lo que provocaba que Tailwind no incluyera esas clases en el CSS generado si no estaban escritas de forma literal.  
El problema era que el nombre de la clase (`text-color`) se construía condicionalmente a partir del tipo de turno y del modo claro/oscuro.

**Solución aplicada:**  
Se creó un archivo `shiftColors.ts` con un objeto estático que mapea todas las combinaciones posibles de turno y modo a clases `text-*` literales de Tailwind.  
Esto garantiza que las clases estén presentes en el bundle final, evitando que el purgado de Tailwind las elimine.

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
- Eliminar de `tailwind.config.js` las clases `text-shift-*` si no están en uso.

### Bug con clases `text-*` no aplicadas por Tailwind (extend.colors vs extend.textColor)

**Síntoma observado**

- Las clases como `text-shift-morning`, `text-success-strong`, etc., no se aplicaban correctamente en SVGs o textos, aunque estaban definidas en `extend.colors`.
- Los elementos aparecían con color negro o sin estilo.

**Diagnóstico**

- Tailwind purga todas las clases no literales.
- Las clases `text-*` no se generan si están solo en `extend.colors` y se usan de forma indirecta (desde funciones, objetos, o en SVGs).
- Este problema afectó tanto a `getShiftColor` como a los textos coloreados en `toastColors`.

**Solución**

- Mover estos colores a `theme.extend.textColor` (en lugar de `extend.colors`).
- Al hacer esto, Tailwind sí genera las clases correctamente.

**Validación**

- Aplicado y validado en dos contextos:
  - Iconos de turno (`shiftColors.ts`)
  - Textos de toast y botones (`toastColors.ts`)
- Las clases se aplican correctamente sin usar `safelist` ni otros hacks.


### Bug con colores en toasts: diagnóstico y solución

[21/07/2025]

Tras eliminar las clases hardcodeadas del sistema de toasts, los tipos `success`, `error`, `info` y `warning` no aplicaban correctamente sus colores.  
El uso de clases construidas dinámicamente (`bg-${type}-100`, ternarios en templates) fue descartado por no ser reconocido por Tailwind.

**Solución:**  
Se creó `toastColors.ts` con un mapa estático de clases por tipo y modo (`light` / `dark`).  
Las clases están escritas como strings literales para asegurar su inclusión tras el purgado.

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

El componente `Toast.vue` usa este mapa importado según el tipo y el modo actual (`isDark.value`).  
Se validó visualmente en todos los modos y dispositivos. Bug cerrado.

### Logo dinámico en modo claro/oscuro

**Objetivo:** Permitir que el logo se vea correctamente en modo claro y oscuro sin usar múltiples versiones de archivo ni swaps manuales.

**Errores detectados y pruebas descartadas:**
- Uso de `mask-image` con `.mask-logo` fallaba en todos los navegadores (incluyendo Safari, Chrome y Firefox), no se renderizaba nada o aparecía una caja invisible.
- Forzar color con `bg-*` funcionaba pero no permitía personalización futura ni integración con `text-*`.
- Usar SVG original inline sin limpiar mostraba el logo completamente relleno, sin huecos internos (las manecillas del reloj desaparecían).

**Solución aplicada:**
- Se limpió y optimizó el SVG con `fill="currentColor"`, `fill-rule="evenodd"` y `clip-rule="evenodd"` para respetar contornos huecos.
- El logo se insertó **inline** en `App.vue` y `SideMenu.vue`, con clases de tamaño (`h-8`, `h-4`) y color dinámico (`text-text-main dark:text-main-dark`).
- Las manecillas del reloj y demás detalles se conservaron al eliminar `fill="#000000"` y definir el color solo en el `<svg>`.

**Limpieza final:**
- Se eliminó el archivo `logoColors.ts` (ya no necesario).
- Se borró la clase `.mask-logo` de `main.css`.
- Se eliminaron `mode`, `getLogoColor`, y otros restos si solo se usaban para el logo.

**Nota útil:** Para futuros SVG dinámicos usar siempre:
- `fill="currentColor"`
- `fill-rule="evenodd"` y `clip-rule="evenodd"`
- Evitar `fill` directo en los `<path>`, limpiar con herramientas como [SVGOMG](https://jakearchibald.github.io/svgomg/) si viene de PNG.

### Bug visual en botones móviles: hover pegado tras pulsar

**Problema:**  
En móviles (iOS y Android, tanto PWA como app nativa), al pulsar un botón, el color de fondo correspondiente al estado `hover` permanecía visible tras soltar el botón. El efecto solo desaparecía al tocar otra parte de la interfaz. Este comportamiento no se producía en escritorio, donde el estado `hover` se gestionaba correctamente.

**Causa:**  
El estilo `hover:bg-*` aplicado mediante Tailwind se mantenía activo en entornos táctiles porque no existe un evento confiable para desactivar `hover` tras `touchend`. Esto provocaba un estado visual persistente no deseado.

**Solución:**  
Se reescribieron los estilos de botones utilizando clases estáticas declaradas en un nuevo archivo `buttons.css`, usando `@apply` con las utilidades Tailwind. Se aplicaron las siguientes estrategias:
- El estilo visual que antes se aplicaba con `hover:` se trasladó al estado `:active`, que sí desaparece correctamente tras soltar el botón.
- El estado `hover` se mantuvo únicamente para dispositivos que realmente soportan hover, mediante la condición `@media (hover: hover)`.
- Se reprodujo fielmente el comportamiento visual anterior, manteniendo soporte para tema claro y oscuro sin dependencias JS.

**Implementación:**  
- Se creó el archivo `src/assets/css/buttons.css`.
- Se importó al inicio de `main.css`.
- Se definió la clase `btn-primary` con el mismo diseño que `getButtonStyle('primary', mode)`.
- Se sustituyó `getButtonStyle(...)` por `'btn-primary'` en el botón “Iniciar” como caso de prueba.
- Se validó el resultado en DevTools móvil, PWA iOS, app Android y escritorio.
- Se completó la migración del resto de botones del `SideMenu`, iconos redondos (`notificar`, `eliminar`), botones de acción y cierre de toast, hamburguesa y cierre de menú.
- Se mantuvieron y adaptaron todos los efectos visuales previos: `hover`, `active`, `focus`, `scale`, etc.
- Se refactorizó completamente el archivo `buttons.css` centralizando todos los estilos personalizados de botones.

**Impacto y conclusiones:**  
- El bug desaparece por completo en todos los entornos móviles.
- No hay efectos colaterales en animaciones ni en el sistema de cambio de tema.
- El sistema evita el purgado de clases Tailwind al usar clases estáticas.
- El archivo `menuButtonStyles.ts` fue eliminado por completo tras verificarse que todas las referencias habían sido sustituidas.
- Los botones con transición dinámica (como Finalizar/Reabrir) fueron adaptados cuidadosamente para mantener efectos visuales y resolver el ‘flash’ en el intercambio, modificando el fade `opacity` a `opacity-50` para evitar desaparición total.
- El nuevo sistema permite ahora implementar botones coherentes y accesibles con feedback completo sin código duplicado ni soluciones JS específicas para móvil.

### Bug en animación del colapsable de notas del turno

**Descripción del problema:**  
Al colapsar o desplegar el bloque de notas del turno mediante animación (`max-height` + opacidad), se observaba un salto visual abrupto al inicio y final de la transición. Este salto daba sensación de desincronización o glitch, visible especialmente en la fase de colapso.

**Hipótesis y causas consideradas:**  
- Interferencia del `v-show` frente a `v-if`  
- Conflictos con `TransitionGroup`  
- Animaciones de opacidad simultáneas con `max-height`  
- Problemas derivados del uso de `space-y-*`, `py-*` o `overflow-hidden`  
- Comportamiento de los `textarea` autoajustables (`autoResize`)  
- Efecto del `padding` en el bloque `notes-content`  
- Estilos heredados desde `App.vue` u otros contenedores  
- Diferencias frente al colapsable funcional del `SideMenu`  
- Desfase entre `onLeave` y el fade-out en animación

**Pruebas realizadas (fallidas):**  
- Eliminar `autoResize`, `v-show`, `Transition`, o `@input` → sin efecto  
- Cambiar `v-show` por `v-if` → sin efecto  
- Sustituir `TransitionGroup` por `Transition` → sin efecto  
- Aplicar `overflow-hidden` o `position` en distintos niveles → sin efecto  
- Sustituir `textarea` por contenido estático → bug persistía  
- Borrar clases `space-y-*`, `py-*`, `px-*`, `bg-*` de todos los niveles → sin efecto o solo reducía el salto  
- Sustituir funciones `onEnter/onLeave` por variantes que usaban `scrollHeight` o `getBoundingClientRect()` → sin efecto  
- Comparación completa con colapsable funcional de `SideMenu` → misma estructura no replicaba el bug

**Solución parcial aplicada:**  
Agrupar las clases internas (`px-4`, `py-2`, `space-y-2`) en un nuevo `div` anidado dentro de `notes-content`.  
Esto redujo drásticamente la altura del salto y permitió mantener una animación fluida sin afectar el layout general.  
También se ajustó la duración final de la animación a `0.2s` para mejorar la percepción y minimizar aún más el defecto.

**Resultado:**  
El bug no se eliminó por completo, pero el salto visual quedó reducido a un mínimo apenas perceptible.  
Se considera un resultado aceptable dentro del diseño actual y se documenta aquí para evitar reprocesos futuros.

**Recomendaciones futuras:**  
- Si se reestructura el bloque, partir de cero en un entorno aislado podría revelar la causa exacta.  
- No volver a mover ni eliminar clases en `notes-content` sin validar este bug.  
- Documentar bien cualquier cambio estructural que implique colapsables con contenido dinámico como `textarea`.  
- En caso de requerir una solución 100% fluida, replantear el diseño sin usar colapsado animado con `max-height`.


### Bug: icono maskable recortado en instalación PWA Android

Durante la validación del manifiesto de la PWA en Android, se ha detectado que el icono definido como **maskable** se muestra mal recortado tanto en la vista previa de instalación como en el acceso directo creado en el homescreen.

Este comportamiento afecta tanto a la rama `develop` como a `main`, y está presente desde las primeras versiones del proyecto. Se descubrió al realizar pruebas específicas de instalación PWA en emuladores Android (API 36) y se ha confirmado en un dispositivo físico (Huawei P Smart 2019, Android 10).

**Pruebas realizadas:**
- Verificada la correcta detección del manifiesto y su contenido tras desactivar la autenticación de previews en Vercel.
- Imagen `icon-maskable.png` reescalada a 512x512 para coincidir con el valor declarado en `sizes`.
- Probados los valores `"purpose": "maskable"` y `"purpose": "any maskable"` sin cambios en el comportamiento.
- Eliminado el warning de DevTools usando solo `"maskable"`, pero sin mejoras visuales en Android.
- Restaurado `"any maskable"` para ampliar compatibilidad, sin resultados satisfactorios.
- Realizado wipe de datos y reinstalación en emuladores sin cambios apreciables.

**Resultado:**
El bug persiste tras aplicar todas las correcciones posibles a nivel de manifiesto e icono. Se trata de un error visual no crítico, ya que la instalación principal para Android será mediante APK nativa. Se ha documentado para posible resolución futura si se prioriza la experiencia PWA en esta plataforma.

**Relacionado con:**
- Tarea en el roadmap: *Revisar problema de recorte incorrecto del icono maskable al instalar la PWA en Android*


### Bug: manifiesto PWA no detectado en previews protegidos de Vercel

Durante las pruebas de la PWA en dispositivos Android y emuladores, se detectó que el manifiesto no era reconocido correctamente en las versiones desplegadas como preview (`develop`) en Vercel. Esto impedía la correcta instalación como PWA, y se manifestaba como errores en consola del navegador y fallos en la carga de iconos y capturas del manifest.

El problema no afectaba a la versión de producción (`main`), lo que generó confusión inicial sobre su origen.

**Análisis y hallazgo:**
- El archivo `manifest.webmanifest` se servía correctamente y era accesible manualmente por URL.
- Los recursos como iconos y screenshots también estaban presentes en el deploy.
- Se comprobó que el manifiesto era generado correctamente en local y en producción.
- El fallo solo ocurría en los deploys protegidos por la opción "Legacy Pre-Production Deployments" de Vercel, que requiere autenticación de usuario.
- Al desactivar esa protección, el manifiesto comenzó a ser reconocido inmediatamente sin necesidad de redeploy.

**Resultado:**
El error se debía a una limitación de las previews protegidas de Vercel. Se resolvió desactivando la autenticación de previews desde la configuración del proyecto. No ha sido necesario modificar código ni configuración adicional del proyecto.

**Relacionado con:**
- Tarea completada en el roadmap: *Solucionar error de detección del manifiesto PWA en los previews protegidos de Vercel*

### Safe Areas: integración, fallos y solución definitiva (plugin EdgeToEdge)

**Contexto:**  
En dispositivos con barras flotantes o notches (especialmente PWA iOS y Android recientes), la app no respetaba correctamente las zonas seguras (safe areas), provocando que la interfaz quedara pisada o mostrara scroll fantasma. En algunos Android también se mostraban barras negras en lugar de integrar visualmente las zonas reservadas.

**Problemas detectados:**  
- En PWA iOS: el `safe-area-inset-bottom` daba un espacio excesivo.  
- En Android (nativo): no se aplicaban los `env(safe-area-*)`, causando solapamientos.  
- En escritorio y DevTools móvil: el uso de `env(...)` sin fallback provocaba que el sidemenu quedara desplazado hacia abajo.  
- Comportamiento inconsistente al abrir la app: en algunos casos, la status bar se pisaba al primer inicio pero no al abrirla de nuevo.  

**Intentos y soluciones fallidas:**  
- Aplicar `env(...)` directamente en Tailwind sin plugin → sin efecto en Android.  
- Añadir `nextTick` tras `onMounted` para esperar a que se apliquen → no solucionó.  
- Forzar valores con `calc(...)` en CSS con `env(...)` → inconsistencias.  

**Solución aplicada:**  
- Instalado `@capacitor-community/safe-area` para obtener los valores seguros de forma fiable.  
- El plugin define automáticamente las variables CSS --safe-area-inset-top y --safe-area-inset-bottom, accesibles desde cualquier componente.
- Aplicado `padding-top: var(--safe-area-inset-top)` en `<header>` y en `DialogPanel` del SideMenu.  
- Ajustado `<main>` con `min-height: calc(100svh - var(--safe-area-inset-top) - 68px)` para evitar scroll fantasma.  
- En Android, se activó la transparencia de la barra inferior con navigationBarColor: '#00000000' y se forzó color claro (#f8f9fa) y texto oscuro en la barra superior con statusBarColor y statusBarContent.
- Se descartó el uso de `safe-area-inset-bottom` en el sidemenu inferior, sustituyéndolo por `pb-3` fijo.  

**Resultado final:**  
- **Android nativo:** correcto. Se respeta el safe area, las barras flotantes son transparentes, y no hay solapamientos. El sidemenu queda ligeramente elevado, pero se acepta por ahora.  
- **PWA iOS:** correcto. Se adapta bien a las zonas seguras sin excesos ni solapamientos.  
- **Escritorio y DevTools:** correcto. Se evita la desalineación del sidemenu.  

**Problemas abiertos:**  
- En Android, el `DialogPanel` del sidemenu sigue algo desalineado (ligeramente elevado respecto al header).  
- Comportamiento inconsistente en Android al abrir la app por primera vez: la status bar puede quedar pisada si no se reinicia.  
- No se ha encontrado una solución universal y robusta que funcione idénticamente en todas las plataformas.  

**Pendiente de revisar más adelante:**  
- Investigar si el plugin puede exponer eventos de ready/safe-area actualizados para evitar inconsistencias iniciales.  
- Probar alternativas con `capacitor-statusbar` o listeners a cambios en la visibilidad de UI del sistema.  
- Decidir si vale la pena sincronizar dinámicamente los paddings del sidemenu y el header con una función común.


**Actualización: investigación adicional sobre bug persistente en primera carga (Android)**
Fecha: 2025-08-02

Tras la validación del sistema de safe-areas, se ha confirmado que en Android nativo (APK) persiste un bug específico al abrir la app por primera vez:

Comportamiento observado:  
- En la primera carga, la variable `--safe-area-inset-top` está presente pero vale `0px`, lo que provoca que el header quede pisado por la status bar.  
- Al tocar un input real (input o textarea), se corrige automáticamente y la interfaz se ajusta correctamente.  
- El comportamiento es consistente en todos los emuladores Android:  
  - Siempre incorrecto al abrir por primera vez  
  - Siempre correcto tras la primera interacción  
  - Persiste si se cierra completamente la app y se vuelve a abrir  

Pruebas realizadas y descartadas:  
- `initialize()` del plugin: inyecta correctamente las variables CSS, pero no desencadena el layout  
- Esperar a `document.readyState === "complete"`  
- Escuchar `window.onload`  
- Forzar reflow con `getComputedStyle`, `offsetHeight`, `requestAnimationFrame`  
- Forzar `window.dispatchEvent(new Event('resize'))`  
- Enfocar programáticamente un input oculto  
- Esperar evento `visualViewport.resize`  
- Insertar `debugDiv` para observar los valores: se confirmó que solo cambian al abrir el teclado

Causa confirmada:  
El WebView de Android no recalcula ni aplica los `env(--safe-area-inset-*)` hasta que se produce una interacción del usuario. Este bug está documentado en el repositorio oficial de Capacitor y en foros de Ionic.  
Es una limitación técnica sin workaround fiable actualmente desde JavaScript.

Decisión final:  
- Se acepta como limitación estructural del entorno Capacitor + Android WebView  
- Se conserva `initialize()` como paso necesario para asegurar la existencia de las variables, aunque estén inicialmente a `0px`  
- No se aplicarán más intentos de parche temporal (como inputs invisibles o focus forzado)  
- Se documenta en el roadmap como tarea cerrada  
- Si en el futuro se desea resolver, será necesario intervenir desde código nativo (Java/Kotlin) usando `WindowInsets` reales


**Actualización: abandono del uso de safe-area en Android y cierre del intento de integración multiplataforma**
Fecha: 2025-08-03

Durante el intento de corregir la desalineación del `SideMenu` en Android nativo, se ha confirmado que **no existe un método fiable** para aplicar correctamente los márgenes seguros (`--safe-area-inset-*`) en componentes montados dinámicamente como `DialogPanel`.

**Hallazgos clave:**

* Aunque `--safe-area-inset-top` puede leerse desde JavaScript tras interacción (e.g., al pulsar un input), **su aplicación manual por `ref`, `style`, o `computed` no tiene efecto visible** en el menú lateral.
* Los estilos dinámicos (`padding-top`, `margin-top`, `height`) aplicados por JS no afectan la posición visual en WebView.
* Se descartó que Headless UI o el uso de `Teleport` fueran la causa.
* El problema persiste aunque el valor sea capturado correctamente desde el layout root (`document.documentElement`).

**Pruebas realizadas sin éxito:**

* Captura reactiva con watcher a `isOpen` y aplicación de `style.marginTop`.
* Aplicación directa desde `useSafeArea.ts` expuesto globalmente.
* Encapsulación de la lógica y sincronización con `waitForSafeAreaTop`.
* Forzar animación o reflow en el `DialogPanel` tras open.
* Uso de `var(...)` en el template con fallbacks por clase o estilo.

**Resultado observado:**

* En Android, el `SideMenu` siempre queda desplazado hacia arriba si se apoya en `safe-area`, tanto si el valor está presente como si se inyecta desde JS.
* En plataformas donde sí funciona (`iOS`, `PWA`, `escritorio`), el diseño es correcto sin necesidad de parches.

**Decisión tomada:**

* Se **abandona definitivamente el uso de `safe-area` en Android WebView**.
* Se descarta el plugin `@capacitor-community/safe-area` como solución válida multiplataforma.
* El código `useSafeArea.ts`, sus referencias y el uso de `var(--safe-area-inset-top)` serán eliminados.
* Se implementará una solución alternativa basada en **`padding-top` fijo solo en Android nativo**, suficientemente alto (e.g., `24px`) para evitar solapamientos.
* Se investigará también el uso del plugin `@capacitor/status-bar` y su opción `overlaysWebView: false` como posible sustituto del uso de safe-areas, siempre que no introduzca otras inconsistencias.

Esta decisión permite simplificar el sistema visual, evitar comportamiento impredecible y recuperar control total del layout en Android.



**Solución al bug de solapamiento en Android con plugin EdgeToEdge**
Fecha: 2025-08-04

Tras múltiples intentos fallidos con el sistema SafeArea, se logró una solución definitiva al problema de solapamiento de contenido con las barras de sistema en Android nativo.

Dado que todas las soluciones previas (incluyendo `@capacitor-community/safe-area`, `@capacitor/status-bar`, y ajustes de estilos CSS con `env(...)` o `var(...)`) habían resultado inconsistentes o ineficaces, se decidió hacer una investigación externa completa. Para ello se utilizó NotebookLM como asistente de investigación, con el objetivo de buscar únicamente información contrastada, actualizada en 2025 y validada por usuarios reales.

La búsqueda reveló que la única solución fiable y actual en proyectos Capacitor híbridos era el uso del plugin `@capawesome/capacitor-android-edge-to-edge-support`, que aplica insets reales a la WebView desde el código nativo sin depender de estilos dinámicos de la parte web. Esta aproximación resolvía el problema raíz: la WebView de Android no aplica correctamente los márgenes de safe-area hasta después de una interacción (además de incosistencias en distintos componentes de la app), lo que impedía una solución visual sólida en la primera carga.

Se siguieron los siguientes pasos:

- Instalación y activación del plugin EdgeToEdge.
- Verificación inicial con color rojo para comprobar que el plugin realmente controlaba el fondo de las barras del sistema.
- Pruebas de color transparent fallidas, lo que llevó a investigar la procedencia del fondo blanco o gris visible.
- Añadido de un CSS global con `html, body, #app { background-color: transparent !important; }` para permitir que el color de fondo real del WebView fuera visible.
- No se llegó a ver el WebView como fondo (el color lima de prueba nunca apareció), lo que sugiere que el fondo visible era un fallback de otra capa; tras probar haciendo transparentes las barras desde styles.xml y otros métodos, se confirmó que el bug ya estaba solucionado aplicando el color desde EdgeToEdge, por lo que se detuvo la búsqueda del origen exacto del color blanco/gris.
- Implementación dinámica del color de fondo usando clases Tailwind (`bg-surface-1` y `dark:bg-surface-1-dark`) aplicadas de forma programática al iniciar la app.
- Refactor posterior: se añadió un `watch()` al valor de `isDark` en `useDarkMode.ts` para actualizar el color de fondo en tiempo real cuando el usuario cambiaba el modo claro/oscuro, incluyendo el caso de cambio por modo del sistema.
- Verificación completa en emuladores Android (API 29, 30 y 36), con resultados positivos:
  - En Android 30 y 36 el color se adapta dinámicamente, y la WebView evita correctamente las barras del sistema.
  - En Android 29 se respeta la status bar, pero aparece una barra inferior adicional (padding extra), que se analizará en otro momento.

**Mejoras pendientes**

- Revisar el comportamiento en Android API 29: la barra inferior muestra un espacio adicional del mismo color de fondo.
- Verificar si es necesario adaptar el comportamiento cuando cambia el teclado o se ocultan las barras del sistema.
- Considerar si debe armonizarse también el color de la barra de navegación inferior (mediante `@capgo/capacitor-navigation-bar` o similar).


### Bug crítico: el plugin capacitor-navigation-bar rompe la build debug

**Fecha:** 2025-08-05  
**Estado:** Documentado y descartado

**Contexto:**  
Durante el refinamiento visual en Android, se intentó aplicar transparencia en la barra de navegación inferior mediante el plugin `@capgo/capacitor-navigation-bar`, con el objetivo de mostrar contenido detrás de la misma y adaptar los iconos al tema claro/oscuro. El plugin se integró con una llamada directa en `main.ts`, sin alterar otras partes del sistema.

**Pruebas realizadas:**  
- El plugin se instaló correctamente y se sincronizó con `npx cap sync`.
- Se añadió una llamada a `NavigationBar.setNavigationBarColor(...)` en `main.ts`.
- La app compiló en modo `debug` sin errores visibles.
- Al ejecutarla en el emulador, se produjo el error:  
  `Activity class {com.jcpaezd.notifica/com.jcpaezd.notifica.MainActivity} does not exist`
- Se generó un APK manual y se analizó con Android Studio.
- El `AndroidManifest.xml` contenía correctamente la declaración de `MainActivity`.
- Sin embargo, el archivo `classes.dex` no incluía la clase `MainActivity` ni ninguna clase propia del proyecto.

**Conclusión:**  
El plugin rompe silenciosamente la build en modo `debug`, provocando un APK inválido. Esto impide la ejecución normal de la app, aunque no se produzcan errores de compilación. El problema desaparece completamente al desinstalar el plugin y eliminar su uso en `main.ts`.

**Decisión:**  
Se descarta el uso del plugin `@capgo/capacitor-navigation-bar` hasta nuevo aviso. No se recomienda volver a instalarlo ni usarlo en builds de desarrollo. Se considerarán otras alternativas (manuales o nativas) si se requiere modificar visualmente la barra inferior sin comprometer la integridad del proyecto.


### Gestión dinámica de la barra de estado (StatusBar)

**Contexto:**  
Hasta ahora, el color de fondo de la barra de estado (status bar) y el color de sus iconos no se adaptaban correctamente al tema visual de la app en Android. En versiones modernas (API 30 en adelante), el objetivo era sincronizar el color de fondo con el tema activo y ajustar el color de los iconos (blanco o negro) para garantizar contraste y legibilidad. En versiones antiguas, había problemas de visualización e insets dobles.

**Motivación:**  
Ofrecer una integración visual coherente con el tema de la app, respetando el diseño edge-to-edge y evitando errores visuales en versiones no compatibles. También se buscaba solucionar problemas de insets dobles en dispositivos con Android 10 y anteriores.

**Pruebas realizadas:**  
- Se integró `@capacitor/status-bar` y se aplicó el cambio de estilo de los iconos tras detectar el tema (oscuro/claro).
- Se obtuvo el color actual desde las clases definidas por Tailwind para cada tema.
- Se limitó la aplicación de cambios al API 30 o superior, tras detectar mediante `@capacitor/device` la versión exacta del sistema.
- Se probó en emuladores con API 29, 30 y 36, así como en dispositivo físico con Android 10.

**Resultado:**  
- En **API ≥ 30**, tanto el color de fondo como los iconos se actualizan correctamente según el tema.  
- En **API 29 emulado**, se corrige el problema de la barra superior adicional. Aunque los iconos no cambian, el fondo mantiene coherencia.  
- En **Android 10 físico**, persisten ambas barras adicionales y los iconos no cambian dinámicamente (solo tras reinicio), pero no rompen la experiencia.  
- Se evita aplicar cambios visuales en dispositivos no compatibles, lo que mejora la estabilidad general.

**Notas adicionales:**  
- La solución se basa en una separación clara de lógica por API, y puede servir como modelo para futuras adaptaciones relacionadas con la barra de navegación u otros comportamientos específicos de Android.
- También se ha creado un archivo utilitario (`src/utils/platform.ts`) para centralizar la lógica de detección del nivel de API en Android. Este archivo expone una función `isAndroidApiAtLeast(minApi)` que devuelve un booleano según la versión del sistema. Permite condicionar de forma segura la ejecución de funciones sensibles a la versión, mejorando la legibilidad del código y evitando duplicaciones.

---

## UI, diseño y experiencia de usuario

### Splash personalizada en Android

**Estrategia aplicada por versión:**

- **Android 12+**: Se utilizó `Theme.SplashScreen` con icono animado (`@mipmap/ic_launcher_foreground`), fondo pastel (`@color/splash_background`) y fondo de icono `@null`. Evita el icono sobrepuesto por defecto.
- **Android 10**: Se empleó `splash_background_legacy.xml` con una imagen rectangular (1280×1920) generada con APE Tools, centrada mediante `<bitmap>` en un `layer-list`.
- En `MainActivity.java` se añadió `SplashScreen.installSplashScreen(this);` justo antes de `super.onCreate(...)`.

Resultado:
- ✅ Splash limpia y sin deformaciones en Android 10 y Android 12+
- ✅ Transición fluida sin flicker en dispositivos modernos
- 📌 Parpadeo blanco breve en dispositivos lentos (aceptado como limitación menor)

**Proceso de resolución del bug visual:**

[13/07/2025-08:14] Diagnóstico inicial
- En Android 10 la splash se mostraba correctamente usando `splash.png` en drawable-xxxhdpi.
- En Android 12+ esa misma imagen se deformaba al usarse como `AnimatedIcon` en `Theme.SplashScreen`.
- Se identificó como causa el uso indebido de una imagen grande rectangular como icono animado.

✅ Solución adoptada
- Android 12+: uso de icono cuadrado `@mipmap/ic_launcher_foreground`.
- Android 10: imagen rectangular mantenida en drawable-xxxhdpi, referenciada desde `splash_background_legacy.xml`.

**Limpiezas realizadas:**

[13/07/2025-08:41] Archivos eliminados:
- `splash_background.xml`
- `splash_background_modern.xml`
- `icon.png` (redundante en drawable-xxxhdpi)

Confirmado que no afectaban al funcionamiento ni al aspecto en ningún dispositivo.

### 🌀 Bug al renombrar splash legacy

[13/07/2025-08:50]
- Renombrar `splash.png` a `splash_legacy.png` rompía la visualización en Android 10.
- Intentos de forzar centrado y tileMode fallaron.
- Se revirtió el cambio y se restauró la imagen original.

✅ Restauración completa y validación

[13/07/2025-09:36]
- Restaurada imagen rectangular en drawable-xxxhdpi (1280×1920).
- Confirmado funcionamiento correcto en:
  - Pixel 4 (Android 10)
  - Medium & Pixel 7 (Android 12+)
  - Huawei físico (Android 10, desde Play Console)

### 🎯 Mejoras aplicadas

[13/07/2025-10:25] Eliminación del halo en Android 12+
- Cambiado `@mipmap/ic_launcher` → `@mipmap/ic_launcher_foreground`.
- El icono se muestra limpio, sin fondo circular gris.

### 🔴 Intento revertido: evitar pantalla blanca post-splash

[13/07/2025-11:13]
- Se probó desactivar el auto-hide y cerrar manualmente con `SplashScreen.hide()`.
- Resultado:
  - Android 12+: splash quedaba congelada
  - Android 10: splash secundaria deformada que bloqueaba la app
- Se revirtió el cambio y se eliminó el plugin
- El parpadeo se acepta como comportamiento por defecto en dispositivos lentos

### 📌 Observaciones adicionales

- En emulador Pixel 4, al abrir desde el home se muestra temporalmente un icono genérico. Desaparece tras abrir desde el launcher. No se ha reproducido en dispositivos reales.
- El sistema actual es limpio, bifurcado por versión, mantenible y libre de hacks visuales.

✅ **Estado final**: Splash completamente funcional, documentada y validada para Android 10 y 12+. Sin flickers ni conflictos. Preparado para reutilización en otros proyectos.

### Descripción para ficha de Play Store

(Actualizada: [13/07/2025])

Registra tus tareas técnicas de forma rápida, clara y sin conexión.

Notifica es una app diseñada para técnicos y trabajadores por turnos que necesitan llevar un control ágil de sus tareas diarias. Anota avisos y trabajos durante el día, marca su hora de inicio y fin (automática o manual), y notifícalos fácilmente al final del turno.

Características principales:
• Registro de tareas por turno con hora de inicio/fin.
• Tiempos calculados automáticamente por tramos.
• Filtros por estado: activas, finalizadas, notificadas.
• Histórico completo de turnos anteriores.
• Envío del listado por WhatsApp o apps compatibles.
• Funciona 100% offline: sin conexión, sin registro, sin permisos extra.

Al final del día, marca las tareas notificadas y borra las completadas. Puedes compartir tu turno si necesitas que un compañero cierre tus avisos por ti.

Una interfaz simple, rápida y sin distracciones. Ideal para usar a lo largo de la jornada sin complicaciones.

Diseñada desde dentro, para quienes necesitan agilidad en el trabajo técnico.

### Reestructuración del layout de las tareas para alineación precisa (botón, duración, horas)

**Contexto:**  
En la estructura original basada en `flex`, la alineación vertical entre filas era inconsistente. Los elementos de la segunda fila (como duración y botones secundarios) no se podían alinear correctamente con los de la primera (horas y botón principal), especialmente en tareas con muchas líneas.

**Problemas detectados:**
- El bloque de duración (`0.5h`) no quedaba alineado con el bloque de horas (inicio–fin).
- Los botones de notificación y eliminar no quedaban bajo el botón principal, sino desajustados a la derecha.
- Las dos filas (primera y segunda) estaban estructuradas como bloques `flex` separados, sin relación entre sus columnas.

**Solución aplicada:**  
Se migró la estructura del contenido de cada tarea a `CSS Grid` con 3 columnas:
- `grid-cols-[1fr_auto_auto]` define tres columnas alineadas:
  1. Descripción y técnico (crecen libremente),
  2. Horas y duración,
  3. Botón principal y botones secundarios.

Los elementos se posicionan explícitamente en la cuadrícula (`col-start`, `row-start`), logrando alineación vertical entre filas distintas.

Ajustes adicionales:
- Se eliminó `grid-rows-2` para evitar alturas forzadas y mejorar el ajuste en tareas con muchas o pocas líneas.
- Se usó `justify-self-end` en horas y duración para forzar su alineación derecha sin afectar al resto del layout.
- Los botones secundarios se distribuyen horizontalmente con `justify-evenly` dentro de su celda de grid.

**Resultado:**  
Layout robusto, alineado vertical y horizontalmente, válido para tareas cortas y largas. Se mantiene predecible y limpio en todos los modos y estados.

**Relacionado:**  
Roadmap · Etapa 8 · Tareas de UI → “Mejorar alineación vertical de fila 2 en tareas”.

### Bloque de apariencia: diseño UI y selector de tema

[27/07/2025]  
Durante la implementación del sistema de modo oscuro se rediseñó el bloque de apariencia general en el menú lateral (`SideMenu.vue`). El objetivo era ofrecer un control claro, accesible y coherente con el estilo visual de la app.

**Decisiones clave:**  
- Se sustituyó el selector binario claro/oscuro por una tarjeta con 3 opciones: Claro / Oscuro / Sistema.
- Cada opción se representa mediante un botón apilado (`flex-col`) con:
  - Un ícono de Heroicons (`SunIcon`, `MoonIcon`, `ComputerDesktopIcon`)
  - Un título breve (`Claro`, `Oscuro`, `Sistema`)
- El modo activo se resalta mediante:
  - Fondo con clase `surface-hover` (modo claro) o `surface-pressed` (modo oscuro)
  - Borde izquierdo del botón visible (`border-l-4`) con color `accent-main`
  - Texto y íconos adaptados al modo actual (`text-main` y `dark:text-main-dark`)

**Integración con la UI:**  
- La tarjeta aparece como un bloque unido al botón opciones desplegado desde este.
- Se respetan las proporciones, espaciado y estilos del resto del SideMenu.
- La sección se puede colapsar o expandir con animación fluida (ver bloque técnico correspondiente).
- El menú lateral completo se validó visualmente en modo claro y oscuro, con todos los botones revisados por contraste, iconos, color de fondo y comportamiento interactivo.

**Resultado:**  
- Selector de tema intuitivo y visualmente atractivo.
- Accesibilidad y contraste garantizados en ambos modos.
- Comportamiento responsive correcto en móviles y escritorio.

Este bloque puede servir como patrón reutilizable para configuraciones similares (idioma, tamaño de texto…).

---

## Notas meta del proyecto

### Nueva conversación principal para el desarrollo de Notifica

¡Hola! Esta conversación es la nueva conversación principal para el desarrollo continuo de **Notifica**, la app para registrar tareas técnicas por turnos, pensada para uso sin conexión y exportación rápida de registros.

📌 **Uso de la conversación:**  
Esta conversación servirá para:  
- Tomar decisiones de diseño, UX y arquitectura.  
- Ejecutar tareas de desarrollo en bloques claros y validados.  
- Resolver dudas técnicas sin suposiciones.  
- Documentar avances y acuerdos.  
- Mantener un hilo único de trabajo con contexto limpio, enfocado y actualizado.

📂 **Archivos que se subirán al iniciar esta conversación:**  
- `Notifica-Roadmap.md`  
- `README.md`  
- `dev-notes.md`  
(para cargar el estado actual y asegurar trazabilidad completa del proyecto)

📐 **Normas de trabajo para esta conversación:**  
- Todo código o documentación debe entregarse en un bloque `.txt` o `.md` sin interpretar, para permitir copiar de un clic.  
- Antes de escribir código, se debe pedir siempre el fragmento actual necesario. No se permite suponer estructura o lógica.  
- Las tareas se abordan en bloques secuenciales. Cada bloque debe quedar cerrado (validado + commit) antes de pasar al siguiente.  
- Se recuerda validar todos los cambios en entorno real (PWA y APK) antes de considerarlos completados.

🔄 **Contexto general del proyecto:**  
- El sistema base está finalizado y validado. La app funciona como PWA offline y también como APK Android firmada.  
- El proyecto se encuentra en la **Etapa 8 del Roadmap**, enfocada en mejoras estructurales, pulido visual y consolidación previa a la publicación pública.  
- El desarrollo sigue un roadmap riguroso con commits estructurados, pruebas cruzadas en móvil, emulador y navegador, y documentación exhaustiva.

🛠️ **Últimos bloques completados:**  
- Lista de ultimas tareas o bloques completados.

🎯 **Siguiente tarea prevista:**  
- Tarea o tareas del roadmap que se pretende abordar o tomar la decisión de cual elegir.

📖 **Notas y aprendizajes estructurales del proyecto:**  
- Cambiar de conversación en el momento adecuado ayuda a evitar errores por saturación de contexto.  
- Cada bloque complejo debe cerrarse con su commit propio antes de continuar.  
- Las validaciones cruzadas (PWA, Android, móvil real) son parte integral del flujo.  
- Se prioriza la calidad, claridad y mantenimiento futuro del proyecto frente a lanzamientos apresurados.  
- Las decisiones estratégicas (como el enfoque de producto o cambios en la estructura) deben documentarse explícitamente en `dev-notes.md` o el roadmap.  
- Encapsular UI interactiva en componentes ayuda a reducir el tamaño de App.vue sin perder control funcional.   
- Confirmado que `touch-action: manipulation` y `-webkit-text-size-adjust: 100%` aplicados globalmente corrigen el bug crítico de scroll en iOS PWA. Este conocimiento es reutilizable en proyectos como Nocta.
- Validaciones completas y rápidas en entorno real permiten cerrar tareas menores con agilidad y seguridad.

---

### Notas para generar mensaje para nueva conversacion de desarrollo

Cuando se genere una nueva conversación de desarrollo para Notifica:

- Mantener el encabezado “¡Hola! Esta conversación es la nueva conversación principal para el desarrollo continuo de Notifica…”
- Incluir:  
  - Uso previsto de la conversación  
  - Archivos que se subirán  
  - Normas de trabajo (código en `.txt`, bloques secuenciales, validación real)  
  - Contexto general actualizado del proyecto  
  - Últimos bloques completados  
  - Siguiente tarea prevista  
  - Notas y aprendizajes estructurales (nunca eliminar los anteriores si siguen vigentes; añadir los nuevos)
- No usar markdown interpretado. Entregar como bloque `.txt` o `.md` simple para poder copiar fácilmente.
- Usar frases claras, sintéticas y orientadas a acción.
- Solo incluir tareas validadas y documentadas. Nunca asumir el estado de una tarea no confirmada.
- Incluir en “aprendizajes estructurales” cualquier conclusión útil no reflejada aún en los documentos del proyecto.

### Normas para generar bloques de documentación en dev-notes

**Objetivo:**  
Estandarizar la forma de redactar nuevos bloques de documentación dentro de este archivo, para mantener coherencia, claridad y trazabilidad entre conversaciones.

**Normas generales:**

- **Ubicación:** El asistente debe decidir en qué sección del documento encaja mejor el nuevo bloque, basándose en el contenido ya existente. No debe crear secciones nuevas innecesariamente.
- **Índice:** Siempre debe generarse una línea para el índice, con el formato exacto ya utilizado (`- [Título](#ancla)`), sin símbolos extra.
- **Formato:** 
  - Usar `##` para secciones principales y `###` para subsecciones dentro de ellas.
  - Usar **negritas** para resaltar partes importantes, no títulos.
  - No incluir bloques de código ni anotaciones técnicas que ya estén presentes en los archivos del proyecto.
- **Contenido:** La redacción debe explicar claramente el contexto, los motivos de la decisión, pruebas realizadas, y resultado final. Debe poder entenderse sin necesidad de leer el código fuente.
- **Entrega:** El bloque debe entregarse como texto plano, en un bloque `.txt` o `.md` sin interpretar, para permitir copiar y pegar fácilmente.

**Aplicación:**  
Estas reglas deben seguirse siempre que se documente una nueva decisión técnica, funcionalidad implementada, hallazgo relevante o cualquier aspecto del proyecto que requiera trazabilidad.


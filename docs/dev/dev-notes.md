# 📓 Notas de desarrollo – Notifica

Este documento recoge decisiones técnicas, flujos de trabajo y convenciones para el desarrollo y mantenimiento de Notifica.

## Índice

- [Flujo de versiones y despliegue](#flujo-de-versiones-y-despliegue)
  - [Flujo de merges y releases](#flujo-de-merges-y-releases)
  - [Publicación de versión PWA y gestión de versiones](#publicación-de-versión-pwa-y-gestión-de-versiones)
  - [Publicar una actualización de Android (.aab)](#publicar-una-actualización-de-android-aab)
  - [Revisión del .aab antes de lanzar testing externo](#revisión-del-aab-antes-de-lanzar-testing-externo)
- [Convenciones y control de versiones](#convenciones-y-control-de-versiones)
  - [Convenciones y buenas prácticas de control de versiones](#convenciones-y-buenas-prácticas-de-control-de-versiones)
- [Funcionalidades y decisiones técnicas](#funcionalidades-y-decisiones-técnicas)
  - [Sistema de toasts](#sistema-de-toasts)
  - [Exportar archivo JSON en Android](#exportar-archivo-json-en-android)
  - [Capacitor Share: problema con compartir en Android](#capacitor-share-problema-con-compartir-en-android)
  - [Enfoque estratégico de publicación (etapa 8)](#enfoque-estratégico-de-publicación-etapa-8)
  - [Eliminación del reload tras deshacer "Borrar todo"](#eliminación-del-reload-tras-deshacer-borrar-todo)
- [Errores y problemas documentados](#errores-y-problemas-documentados)
  - [Bug en iOS PWA: scroll azul tras cerrar teclado](#bug-en-ios-pwa-scroll-azul-tras-cerrar-teclado)
  - [Problemas comunes en emuladores Android](#problemas-comunes-en-emuladores-android)
  - [Validación de bugs: scroll y animación toast](#validación-de-bugs-scroll-y-animación-toast)
- [UI, diseño y publicación](#ui-diseño-y-publicación)
  - [Splash personalizada en Android](#splash-personalizada-en-android)
  - [Descripción para ficha de Play Store](#descripción-para-ficha-de-play-store)
- [Notas meta del proyecto](#notas-meta-del-proyecto)
  - [Nueva conversación principal para el desarrollo de Notifica](#nueva-conversación-principal-para-el-desarrollo-de-notifica)

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

(ver roadmap Etapa 8: “Lanzar fase de testing real con usuarios externos”)

### 📦 Revisión del .aab antes de lanzar testing real (fase externa)

**Funcionamiento general**
- ✅ Lanzamiento rápido y sin errores
- ✅ Splash personalizada aparece correctamente (Android 12+ y 10)
- ✅ Navegación fluida entre acciones (crear, cerrar, exportar, borrar)
- ❌ Scroll correcto en listas largas de tareas - En listas cortas mantiene bug scroll extra en main. En listas largas, selector de turno no se ve (abajo fuera de pantalla)
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
- ❌ No hay scroll fantasma ni glitches al abrir teclado - si lo hay con poco contenido
- ✅ Tipografía, colores, espaciado coherentes
- ✅ Iconos visibles y en su sitio
- ✅ Animaciones presentes donde corresponde

**Integración Android**
- ✅ Splash screen limpia sin halo ni deformación
- ✅ Icono visible correctamente (maskable, sin fondo gris)
- ✅ No hay permisos extra solicitados
- ❌ Compatible con modo oscuro si está activado - No existe modo oscuro. ¿costaría mucho de integrar?

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
- `useToast.ts`: composable para gestionar estado reactivo de los toasts  
- `toast.ts`: función `add(...)` para mostrar toasts desde cualquier lugar  
- `<Teleport>` y `<TransitionGroup>` en `App.vue` para renderizar toasts fuera del flujo principal  

Mejoras aplicadas respecto a Nocta:
- Soporte para botón de acción con `label` y `onClick`  
- Estilo animado en el botón de acción (`scale-95` al pulsar)  
- Animación al montar el botón de acción (`animate-pop` tras 300 ms)  
- Cierre diferido del toast para permitir ver la animación de pulsación  
- Separación clara entre ejecución de acción y cierre visual  
- Estilos personalizados por tipo (`success`, `info`, `error`, `warning`) con icono SVG, fondo suave y bordes redondeados  
- Layout compacto y centrado (`max-w-xs`), con margen inferior ajustado para evitar conflicto con barras de sistema  
- Apilamiento dinámico con animación de transición (`translate-y` y `opacity`) al reordenarse  
- Integración visual coherente con el resto de la interfaz (colores, botones, tipografía)  
- Comportamiento corregido en PWA iOS: el botón de acción ya reacciona correctamente al tacto (`@touchstart`)  
- Bloqueo de selección de texto en todo el toast (`select-none`) para evitar comportamiento inesperado en móviles  

Estado de validación:
- Comprobado y validado en escritorio, Android nativo, PWA Android y PWA iOS  
- Todos los toasts funcionales y visualmente consistentes  
- Errores anteriores (como botón que no cerraba el toast o scroll fantasma tras teclado) han sido corregidos o descartados tras investigación

Este sistema puede reutilizarse o retroportarse a Nocta con pequeñas adaptaciones, manteniendo una base común de diseño y lógica.

Tareas pendientes o ideas futuras:
- (Opcional) Añadir variantes visuales para toast persistente o informativo largo (banner)  
- (Opcional) Resaltar brevemente el contenido afectado por la acción (e.g. Deshacer)  
- (Opcional) Documentar ejemplo de uso avanzado con múltiples acciones o `onDismiss`

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

---

## UI, diseño y publicación

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
- Validación y cierre del bug de scroll innecesario en listas cortas.  
- Solución completa al zoom por doble tap en Safari/Chrome iOS.  
- Validación de animación del botón “Deshacer” en toast.  
- Corrección definitiva del bug crítico del scroll azul en PWA iOS tras cerrar teclado (WebKit).  
- Documentación completa en `dev-notes.md` de todos los bugs resueltos y causas.  
- Commits limpios y trazados para validaciones sin cambios funcionales.

🎯 **Siguiente tarea prevista:**  
Iniciar el bloque de **modo oscuro (`darkMode`)**:
- Activar soporte en Tailwind.
- Definir paleta de colores pastel oscura.
- Aplicar clases condicionales `dark:` a componentes clave.
- Validar integración automática con el sistema operativo y/o selector manual.
- Asegurar consistencia visual y legibilidad.

📖 **Notas y aprendizajes estructurales del proyecto:**  
- Cambiar de conversación en el momento adecuado ayuda a evitar errores por saturación de contexto.  
- Cada bloque complejo debe cerrarse con su commit propio antes de continuar.  
- Las validaciones cruzadas (PWA, Android, móvil real) son parte integral del flujo.  
- Se prioriza la calidad, claridad y mantenimiento futuro del proyecto frente a lanzamientos apresurados.  
- Las decisiones estratégicas (como el enfoque de producto o cambios en la estructura) deben documentarse explícitamente en `dev-notes.md` o el roadmap.  
- Encapsular UI interactiva en componentes ayuda a reducir el tamaño de App.vue sin perder control funcional.  
- El uso de `Notifica` como tracker de sesiones de desarrollo ha comenzado, lo que permite un registro cruzado con commits para revisión y mejora de productividad.  
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


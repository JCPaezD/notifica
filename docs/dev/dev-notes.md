# 📓 Notas de desarrollo – Notifica

Este documento recoge decisiones técnicas, flujos de trabajo y convenciones para el desarrollo y mantenimiento de Notifica.

## 📑 Índice

- [Flujo de merges y releases](#flujo-de-merges-y-releases)
- [Nueva conversación principal para el desarrollo de Notifica](#nueva-conversación-principal-para-el-desarrollo-de-notifica)
- [Splash personalizada en Android (resuelta en v1.0.1)](#splash-personalizada-en-android-resuelta-en-v101)

---


## 📌 Flujo de merges y releases

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

---

## 📄 Nueva conversación principal para el desarrollo de **Notifica**

¡Hola! Esta conversación es la nueva conversación principal para el desarrollo continuo de **Notifica**, la app para registrar tareas técnicas por turnos, pensada para uso sin conexión y exportación rápida de registros.

📌 **Uso de la conversación:**  
Esta conversación servirá para:  
- Tomar decisiones de diseño, UX y arquitectura.  
- Ejecutar tareas de desarrollo.  
- Resolver dudas técnicas.  
- Documentar avances y acuerdos.  
- Mantener un hilo único de trabajo con contexto limpio y actualizado.

📂 **Archivos que se subirán al iniciar esta conversación:**  
- `Notifica-Roadmap.md`  
- `README.md`
- `dev-notes.md`  
(para proporcionar el contexto actual y mantener trazabilidad del progreso)

🔄 **Contexto general:**  
- Esta conversación sustituye a la anterior tras llegar al límite técnico de longitud: se ralentizó por exceso de bloques de código, archivos y validaciones encadenadas.  
- El proyecto está en la Etapa 8 (mejoras opcionales antes de la publicación pública), siguiendo un roadmap claro y riguroso.  
- Ya se ha completado todo el sistema base, la app está firmada y desplegada como PWA y APK funcional.

🛠️ **Contexto actual de trabajo (última tarea activa):**  
Estamos en mitad del reemplazo del sistema `vue-sonner` por un sistema de notificaciones propio basado en el desarrollado para Nocta.  
Ya están completadas:  
- Integración del componente `<Toast>` y `useToast()`  
- Soporte para botón de acción (`label` + `onClick`)  
- Animaciones personalizadas al pulsar botón y al montar  
- Animación de entrada/salida de los toasts mediante `<TransitionGroup>`  
- Ajustes visuales preliminares y comportamiento refinado en móvil y escritorio  
- Documentación de este sistema en `dev-notes.md`  
Ahora estamos reemplazando todas las llamadas antiguas (`notifySuccess`, etc.) por llamadas al nuevo sistema (`add({...})`), una a una para evitar errores.  
El último bloque actualizado fue el de exportación de tareas (incluyendo `notifySuccess`, `notifyError`, `notifyInfo`).  

🔍 **Flujo para esta migración:**  
1. Buscar llamadas a funciones antiguas (notifySuccess, notifyInfo, etc.)  
2. Sustituirlas por llamadas al nuevo sistema  
3. Eliminar `useNotifications.ts` y `vue-sonner` del proyecto  
4. Ajustar visualmente los toasts  
5. Verificar en dispositivo real  
6. Documentar cierre de la migración

📖 **Notas y aprendizajes no documentados en archivos:**  
- Se ha detectado que vue-sonner no permite personalización visual precisa sin `!important` y presenta limitaciones en stacking, posición y diseño.  
- Se ha decidido que el nuevo sistema será más robusto, mantenible y reutilizable (también se llevará a Nocta).  
- Se prioriza el feedback visual en móvil sobre hover en escritorio.  
- Las animaciones se ajustan con `animate-pop` personalizado y transición global con `<TransitionGroup>`.  
- Se ha incluido control total del sistema desde `useToast.ts`, permitiendo acciones (ej. Deshacer), duración personalizada y cierre programado.

Con esto, retomamos el desarrollo de Notifica con contexto limpio y toda la documentación necesaria cargada desde el inicio. ¡Listos para seguir!

---

## 🟦 Splash personalizada en Android (resuelta en v1.0.1)

### 🔧 Estrategia aplicada por versión

- **Android 12+**: Se utilizó `Theme.SplashScreen` con icono animado (`@mipmap/ic_launcher_foreground`), fondo pastel (`@color/splash_background`) y fondo de icono `@null`. Evita el icono sobrepuesto por defecto.
- **Android 10**: Se empleó `splash_background_legacy.xml` con una imagen rectangular (1280×1920) generada con APE Tools, centrada mediante `<bitmap>` en un `layer-list`.
- En `MainActivity.java` se añadió `SplashScreen.installSplashScreen(this);` justo antes de `super.onCreate(...)`.

Resultado:
- ✅ Splash limpia y sin deformaciones en Android 10 y Android 12+
- ✅ Transición fluida sin flicker en dispositivos modernos
- 📌 Parpadeo blanco breve en dispositivos lentos (aceptado como limitación menor)

---

### 🛠 Proceso de resolución del bug visual en splash

#### [13/07/2025-08:14] Diagnóstico inicial
- En Android 10 la splash se mostraba correctamente usando `splash.png` en drawable-xxxhdpi.
- En Android 12+ esa misma imagen se deformaba al usarse como `AnimatedIcon` en `Theme.SplashScreen`.
- Se identificó como causa el uso indebido de una imagen grande rectangular como icono animado.

#### ✅ Solución adoptada
- Android 12+: uso de icono cuadrado `@mipmap/ic_launcher_foreground`.
- Android 10: imagen rectangular mantenida en drawable-xxxhdpi, referenciada desde `splash_background_legacy.xml`.

---

### 🧹 Limpiezas realizadas

#### [13/07/2025-08:41] Archivos eliminados:
- `splash_background.xml`
- `splash_background_modern.xml`
- `icon.png` (redundante en drawable-xxxhdpi)

Confirmado que no afectaban al funcionamiento ni al aspecto en ningún dispositivo.

---

### 🌀 Bug al renombrar splash legacy

#### [13/07/2025-08:50]
- Renombrar `splash.png` a `splash_legacy.png` rompía la visualización en Android 10.
- Intentos de forzar centrado y tileMode fallaron.
- Se revirtió el cambio y se restauró la imagen original.

---

### ✅ Restauración completa y validación

#### [13/07/2025-09:36]
- Restaurada imagen rectangular en drawable-xxxhdpi (1280×1920).
- Confirmado funcionamiento correcto en:
  - Pixel 4 (Android 10)
  - Medium & Pixel 7 (Android 12+)
  - Huawei físico (Android 10, desde Play Console)

---

### 🎯 Mejoras aplicadas

#### [13/07/2025-10:25] Eliminación del halo en Android 12+
- Cambiado `@mipmap/ic_launcher` → `@mipmap/ic_launcher_foreground`.
- El icono se muestra limpio, sin fondo circular gris.

---

### 🔴 Intento revertido: evitar pantalla blanca post-splash

#### [13/07/2025-11:13]
- Se probó desactivar el auto-hide y cerrar manualmente con `SplashScreen.hide()`.
- Resultado:
  - Android 12+: splash quedaba congelada
  - Android 10: splash secundaria deformada que bloqueaba la app
- Se revirtió el cambio y se eliminó el plugin
- El parpadeo se acepta como comportamiento por defecto en dispositivos lentos

---

### 📌 Observaciones adicionales

- En emulador Pixel 4, al abrir desde el home se muestra temporalmente un icono genérico. Desaparece tras abrir desde el launcher. No se ha reproducido en dispositivos reales.
- El sistema actual es limpio, bifurcado por versión, mantenible y libre de hacks visuales.

✅ **Estado final**: Splash completamente funcional, documentada y validada para Android 10 y 12+. Sin flickers ni conflictos. Preparado para reutilización en otros proyectos.


---

## 🔄 Publicar una actualización de Android (.aab)

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
     ```
     android/app/build/outputs/bundle/release/app-release.aab
     ```
   - Renombrar con marca temporal:
     ```
     app-release-YYYY-MM-DD-HH-MM.aab
     ```
   - Verificar que la ruta `android/app/build/` está incluida en `.gitignore`

3. Subir a Google Play Console:
   - Ir a la app > `Versión > Pruebas internas` o `Producción` > Crear versión
   - Subir el `.aab` renombrado
   - No activar “Incluir versión anterior”, a menos que se suban múltiples bundles segmentados (por arquitectura, región, etc.). En actualizaciones normales debe subirse solo la nueva versión.
   - Revisar nombre de versión generado (`3 (1.0.2)` por ejemplo)
   - Añadir notas de la versión (idioma `es-ES`):
     ```xml
     <es-ES>
     Descripción breve de cambios incluidos.
     </es-ES>
     ```

4. Instalar en dispositivo real desde el enlace de test interno o Play Store

---

## 🌐 Publicación de versión PWA y gestión de versiones

La versión web (PWA) de Notifica se despliega automáticamente cada vez que se hace `merge` a la rama `main`. Este proceso está configurado en Vercel y no requiere pasos adicionales manuales.

### 🧩 Estructura y flujo de despliegue

- La rama `develop` se usa para el desarrollo diario.
- La rama `main` contiene la versión estable que se publica automáticamente en Vercel como PWA.
- Cada vez que se desea actualizar la PWA:
  1. Se completan los cambios en `develop`.
  2. Se realiza un Pull Request de `develop` → `main`.
  3. Al hacer merge, Vercel despliega la nueva versión automáticamente.
  4. Opcionalmente, puede añadirse un tag git (`vX.Y.Z`) para marcar el release.

### 🔢 Gestión de versiones

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

### 🛠 Mejora opcional futura

Puede automatizarse la sincronización entre package.json y la versión mostrada en el footer de SideMenu.vue usando Vite.  
Esto permitiría importar la versión con:

   import { version } from '../package.json'

Y usarla como variable reactiva.  
Por ahora se mantiene la edición manual para simplicidad y control total.

### 🚀 Actualización recomendada

Antes de hacer merge a main para publicar una nueva versión PWA:

- [ ] Aumentar versión en package.json ("version": "1.X.Y")
- [ ] Actualizar texto en SideMenu.vue
- [ ] (Opcional) Sincronizar versionName en Android (build.gradle)
- [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "Descripción del release"
      git push origin v1.X.Y


---

## 📝 Descripción para ficha de Play Store
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

## 🐞 Capacitor Share: problema con compartir en Android nativo

### 🔍 Síntoma
El botón "Compartir" funcionaba correctamente en PWA, pero no mostraba el diálogo nativo en la app Android instalada. En algunos casos mostraba solo el toast de "copiado al portapapeles", y en otros lanzaba errores.

### 🧪 Diagnóstico
- El botón usaba `@capacitor/share`, correctamente instalado y sincronizado.
- El código estaba bien estructurado, pero el comportamiento en Android no reflejaba los cambios del frontend (ni el botón de test se mostraba).
- Se detectó que no se estaba ejecutando `npm run build` tras los cambios en el frontend, por lo que la app nativa no incluía los cambios.

### ✅ Solución
1. Ejecutar `npm run build` para compilar el frontend.
2. Ejecutar `npx cap copy android` para copiar los archivos a `/android/app/src/main/assets/public`.
3. Recompilar la app desde Android Studio.

Esto permitió que la versión instalada mostrara correctamente el botón y ejecutara el diálogo nativo de compartir.

### 💡 Conclusión
Cada vez que se hagan cambios en la interfaz o lógica del frontend:
- Ejecutar `npm run build`
- Luego `npx cap copy android`
- Y recompilar desde Android Studio.

Así se asegura que la app nativa use los archivos más recientes.

---

## 📤 Exportar archivo JSON en Android

Problema: en Android nativo, la exportación por <a download> no generaba ningún archivo visible.

Solución: se combinó @capacitor/filesystem (para guardar en Directory.Cache) con @capacitor/share para permitir compartir el archivo .json generado.

Resultado:
- En PWA/navegador, se mantiene la descarga directa como antes.
- En Android, se lanza un diálogo para compartir el archivo con apps compatibles (Drive, Gmail, etc.).

Limitación aceptada: no siempre aparece una opción de "Guardar en Archivos"; depende del dispositivo y apps instaladas.

Función validada como completa y estable.


---

## Sistema de Toasts (Notifica)

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

---

## 🐛 Bug no resuelto: doble tap muestra scroll azul en PWA iOS

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

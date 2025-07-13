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

🔄 **Contexto:**  
- Esta conversación se inicia tras cerrar la anterior por saturación y lentitud, tras un bloque largo de tareas relacionadas con la firma de la app, subida a Google Play y pruebas internas.  
- El último paso completado fue la subida e instalación de la versión 1.0.1 firmada, y validación completa de su funcionamiento en entorno real.  
- El siguiente paso es avanzar con los puntos restantes de la **Etapa 8** (mejoras opcionales antes de publicación pública), según el roadmap actualizado, y preparar la app para su versión pública estable.

📖 **Notas sobre la forma de trabajo:**  
- Se usa un flujo basado en roadmap detallado en Markdown, con tareas divididas en subtareas.  
- Cada paso se valida antes de avanzar al siguiente.  
- Se aplican convenciones de commits tipo Conventional Commits.  
- Se prioriza claridad en la comunicación y precisión en las instrucciones para evitar errores o malentendidos.  
- Las builds se validan localmente y en dispositivos reales.

Con esto, retomamos el desarrollo de Notifica con contexto limpio y toda la documentación necesaria cargada desde el inicio. ¡Listos para seguir!

---

## 🟦 Splash personalizada en Android (resuelta en v1.0.1)

- Se utilizó el sistema de SplashScreen API de Android 12+ con `Theme.SplashScreen`.
- Para evitar que se superponga el icono del launcher sobre la splash, se aplicó esta configuración:
  - `windowSplashScreenAnimatedIcon` = `@drawable/splash`
  - `windowSplashScreenBackground` = `@color/splash_bg` (`#b3e3fa`)
  - `windowSplashScreenIconBackgroundColor` = `@null`
- Se eliminó `themes.xml` duplicado y se centralizó todo en `values-v31/styles.xml`.
- En `MainActivity.java` se añadió `SplashScreen.installSplashScreen(this);` antes de `super.onCreate(...)`.
- Resultado: splash sin icono sobrepuesto, con imagen y color exacto.


### 🟦 Arreglo completo del bug de splash screen en Android 10 y 12+  
🕒 Fecha y hora: [13/07/2025-08:14]

Este bloque documenta la resolución del bug donde la splash se veía deformada en dispositivos modernos (Pixel 7, Android 12+) tras intentar usar una imagen completa (2732×2732) como icono en Theme.SplashScreen.

#### 🔍 Situación de partida
- La app mostraba correctamente la splash en dispositivos con Android 10 (Huawei, Pixel 4) usando una imagen grande (splash.png) en carpetas drawable-*dpi.
- Esa misma imagen se veía deformada o achatada en Android 12+ (Pixel 7, Medium Phone API 36).
- Se habían realizado múltiples pruebas incluyendo:
  - Copiar carpetas generadas por APE Tools (drawable-*, drawable-land-*)
  - Añadir temas duplicados, drawables modernos y legacy
  - Revertir configuraciones para evitar el parpadeo blanco tras la splash
  - Usar @drawable/splash directamente como windowSplashScreenAnimatedIcon

#### ✅ Decisión clave
- No se debe usar una imagen de fondo completa (tipo 2732×2732) como icono en Android 12+. Esa imagen debe reservarse solo para versiones anteriores a Android 12.
- En Android 12+ se debe usar un icono cuadrado (como el de la app) y un color de fondo limpio, sin intentar usar imágenes de fondo.

#### ✅ Primer paso realizado
- Se hizo un commit de respaldo con todos los cambios rotos del sistema actual de splash screen:  
  chore(wip): respaldo de cambios intermedios en splash screen (bug aún presente)
- Se eliminaron archivos binarios y temporales innecesarios antes del commit (spec.json, app-release.apks).
- Se hizo un análisis exhaustivo de los archivos XML actuales, incluyendo:  
  - styles.xml y themes.xml  
  - splash_background_legacy.xml, splash_background_modern.xml, splash_background.xml
- Se identificó que splash_background.xml y splash_background_modern.xml no están siendo usados actualmente y pueden ser eliminados.
- Se determinó una estrategia bifurcada robusta:  
  - Android 10: splash_background_legacy.xml con imagen centrada.  
  - Android 12+: Theme.SplashScreen con icono estándar y color de fondo.


### 🟦 Ajuste de splash en Android 12+ con icono oficial  
🕒 Fecha y hora: [13/07/2025-08:33]

Se modificó el archivo res/values-v31/themes.xml para eliminar el uso incorrecto de una imagen completa (splash.png) como icono en Theme.SplashScreen.

En su lugar se configuró:

- android:windowSplashScreenAnimatedIcon → @mipmap/ic_launcher  
- android:windowSplashScreenBackground → @color/splash_background  
- android:windowSplashScreenIconBackgroundColor → @null  
- postSplashScreenTheme → @style/AppTheme.NoActionBar

Resultado tras pruebas:

- ✅ En Pixel 4 (Android 10): splash legacy se ve perfecta.  
- ✅ En Medium Phone y Pixel 7 (Android 12+): se muestra el icono centrado correctamente, sin deformaciones.  
- 🔍 Se observa un leve halo circular más oscuro detrás del icono en Android 12+. Es el fondo por defecto del icono con transparencia y puede ajustarse si se desea, pero no afecta negativamente al diseño actual.  
- ✅ Transición hacia la app fluida y sin parpadeos blancos.

Este paso resolvió el bug de forma estable en todas las versiones objetivo.

### 🟦 Limpieza de drawables no utilizados (parte 1)  
🕒 Fecha y hora: [13/07/2025-08:41]

Se eliminaron los archivos splash_background.xml y splash_background_modern.xml del directorio res/drawable, ya que no estaban siendo usados por ningún theme actual ni en versiones modernas ni legacy.

Estos archivos provenían de pruebas anteriores y su presencia era redundante y potencialmente conflictiva.  
Se confirmó que tras su eliminación la app sigue compilando correctamente y que la splash screen funciona bien tanto en Android 10 (Pixel 4) como en Android 12+ (Pixel 7, Medium Phone).

### 🟦 Fallo al renombrar splash legacy – restaurado  
🕒 Fecha y hora: [13/07/2025-08:41]

Tras renombrar splash.png a splash_legacy.png para mejorar la claridad del código, la splash dejó de escalar correctamente en dispositivos Android 10 (Pixel 4), apareciendo muy agrandada.

Se intentó forzar el centrado y escalado correcto añadiendo android:tileMode="disabled" al bitmap del XML splash_background_legacy.xml, pero no tuvo efecto.

Se concluye que:
- Android 10 resuelve mejor el recurso splash.png tal como estaba originalmente.
- El uso de un nombre genérico como splash.png en drawable/ no presenta problemas si se documenta correctamente.

✅ Se restaurará el nombre original splash.png y se revertirá el cambio en splash_background_legacy.xml.

### 🟦 Restauración del splash legacy al estado funcional  
🕒 Fecha y hora: [13/07/2025-09:36]

Tras el intento de renombrar splash.png a splash_legacy.png, la splash dejó de escalar correctamente en Android 10 (Pixel 4), apareciendo muy grande.  

Aunque se revirtió el nombre del archivo y la referencia en splash_background_legacy.xml, el problema persistía. Se identificó que la causa era la ausencia de la imagen splash.png en una carpeta de densidad específica.  

✅ Se restauró splash.png en res/drawable-xxxhdpi con una versión rectangular generada con APE tools (1280x1920) que funcionaba correctamente antes.

Verificaciones realizadas:
- Pixel 4 (Android 10): splash vuelve a escalarse y centrarse correctamente.
- Pixel 7 y Medium (Android 12+): splash moderna sigue funcionando sin cambios.
- Confirmado que esta estructura funciona de forma robusta y sin parches.

Este punto marca el retorno a una configuración estable, desde la cual se pueden hacer pruebas controladas o limpiezas con total seguridad.

### 🟦 Confirmación en dispositivo físico (Huawei Android 10)  
🕒 Fecha y hora: [13/07/2025-10:03]

Se generó un .aab (app-release-2025-07-13-09-41.aab) y se instaló en el dispositivo físico Huawei P Smart 2019 (Android 10) desde Google Play Console (canal de pruebas internas).  

Verificación:
- Splash se muestra correctamente, sin deformaciones ni parpadeos, durante aproximadamente 1 segundo.
- Luego aparece una pantalla blanca durante ~1 segundo adicional antes de cargar la app.

Este parpadeo no es un bug, sino el comportamiento por defecto de Capacitor cuando se cierra automáticamente la splash antes de que el WebView haya terminado de renderizar el contenido.

Este punto marca la validación real del comportamiento observado en emuladores.

📌 Se abre como punto de mejora opcional pendiente:
- Evitar pantalla blanca post-splash usando SplashScreen.hide() desde JS
- Requiere desactivar autocierre en capacitor.config.ts y controlar el cierre manual
- Solo se abordará si puede hacerse de forma aislada, documentada y reversible

### 🟦 Limpieza de recurso redundante: icon.png  
🕒 Fecha y hora: [13/07/2025-10:19]

Se eliminó el archivo res/drawable-xxxhdpi/icon.png, que contenía la misma imagen que el ícono de la app (192x192) pero no estaba referenciado en ningún archivo del proyecto.  

Confirmaciones:
- icon.png no aparecía en styles.xml, themes.xml, AndroidManifest.xml ni capacitor.config.ts
- No se utilizaba como ícono de splash ni como recurso de interfaz

Verificado tras eliminar:
- ✅ Splash y app funcionan correctamente en Pixel 4, Medium y Pixel 7
- ✅ Icono de la app se mantiene intacto

📌 Observación detectada (sin relación directa con esta limpieza):
En el emulador Pixel 4, al lanzar la app desde el acceso directo en el home, aparece momentáneamente un icono genérico en la vista general (overview).  
Tras abrirla desde el menú de aplicaciones, el icono correcto se muestra.  
No se ha reproducido en otros dispositivos ni se considera prioritario, pero se anotará como punto a revisar si reaparece o afecta visualmente en la versión publicada.

### 🟦 Eliminación del halo oscuro en splash de Android 12+  
🕒 Fecha y hora: [13/07/2025-10:25]

En dispositivos Android 12+ se mostraba un halo circular tenue detrás del icono durante la splash screen. Esto era causado por el uso de un ícono con transparencia como windowSplashScreenAnimatedIcon.

🔧 Se resolvió cambiando el recurso:

  De: @mipmap/ic_launcher  
  A:  @mipmap/ic_launcher_foreground

Este ícono vectorial no presenta fondo transparente excesivo y es más compatible visualmente con el sistema de splash de Android 12+.

Verificaciones:
- ✅ En Pixel 7 y Medium Phone (API 31+): el halo desaparece, se muestra el icono limpio y centrado.
- ✅ En Pixel 4 (Android 10): sin cambios, se sigue mostrando la splash legacy correctamente.

















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

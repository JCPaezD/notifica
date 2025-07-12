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

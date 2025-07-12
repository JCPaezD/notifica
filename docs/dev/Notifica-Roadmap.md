# 🛠️ Roadmap: Notifica (v0.1.0)

App web tipo PWA para registrar tareas laborales de forma ágil, sin conexión y exportables o marcables como notificadas al final del turno.

---

## ✅ Etapa 1: Preparación del entorno

- [x] Crear carpeta de proyecto y abrirla en VS Code
- [x] Iniciar proyecto con `npm init vue@latest`
  - Project name: `notifica`
  - Add TypeScript: Yes
  - Add Vue Router: No
  - Add Pinia: No
  - Add ESLint, testing, etc.: No
- [x] Ejecutar `npm install` y `npm run dev`
- [x] Confirmar que la app Vue básica funciona en el navegador

---

## 🎨 Etapa 2: Configuración del diseño

- [x] Instalar y configurar **Tailwind CSS**
  - Seguir guía oficial: https://tailwindcss.com/docs/guides/vite
  - Crear archivo `style.css` si es necesario
- [x] Aplicar un diseño limpio y moderno desde el inicio
- [x] Crear estructura de carpetas:
  - `src/components/`
  - `src/composables/`
  - `src/utils/`

---

## 📋 Etapa 3: Lógica básica de tareas

- [x] Crear interfaz para añadir una nueva tarea
  - [x] Botón “Iniciar tarea” que registre hora y descripción
  - [x] Botón “Finalizar tarea” que añada la hora de fin
- [x] Crear componente `TaskList.vue` para mostrar tareas del día
- [x] Crear componente `TaskItem.vue` para cada tarea individual
- [x] Definir tipos (interfaces) para Tarea en un archivo separado (e.g., `src/types/Task.ts`)
- [x] Calcular y mostrar duración de tareas finalizadas
- [x] Permitir editar los campos en cualquier momento
- [x] Campo para seleccionar “técnico(s)” o “personal”
- [x] Check de “Notificado” para marcar qué tareas ya han sido introducidas en SAP manualmente
- [x] Filtrar tareas completadas y notificadas (mostrar solo)

---

## 💾 Etapa 4: Gestión de datos y persistencia

- [x] Guardar las tareas en `localStorage`
- [x] Botón para exportar datos (JSON)
- [x] Botón para importar datos (JSON)
- [x] Botón para borrar todos los datos (con confirmación)
- [x] Agrupar por día y turno
  - [x] Implementar lógica de "turnos" (`shiftId`)
  - [x] Botón "Iniciar Nuevo Turno"
  - [x] Asignar `shiftId` a nuevas tareas
  - [x] Persistir `currentShiftId`
  - [x] Filtrar tareas por turno actual por defecto
- [x] Añadir filtro para ver tareas de días anteriores

---

## 📤 Etapa 5: Exportación (Completada)

- [x] Crear botón “Exportar tareas del día”
- [x] Formato: texto plano listo para enviar por WhatsApp o email
- [x] Usar `navigator.clipboard` o `navigator.share` si está disponible

---

## 📱 Etapa 6: PWA y Despliegue

- [x] **Configuración del Manifest:**
  - [x] Crear `public/manifest.json` con nombre, nombre corto, descripción, `start_url`, `display` (e.g., `standalone`), `orientation`. (Gestionado por `vite-plugin-pwa`)
  - [x] Añadir íconos de la aplicación (varios tamaños, e.g., 192x192, 512x512) en una carpeta como `public/icons/` y referenciarlos en `manifest.json`.
  - [x] Definir `theme_color` y `background_color` en `manifest.json` para la splash screen y la barra de título.
  - [x] Añadir `screenshots` al `manifest.json` para mejorar la UI de instalación.
  - [x] Enlazar `manifest.json` en `index.html`. (Gestionado por `vite-plugin-pwa`)
  - [x] Añadir meta tags relevantes para PWA en `index.html` (e.g., `theme-color` para Safari, `apple-touch-icon`).
- [x] **Service Worker para Offline y Caché:**
  - [x] Configurar un Service Worker. Podemos usar una herramienta como `vite-plugin-pwa` para simplificar esto con Vite, o crearlo manualmente.
  - [x] Implementar una estrategia de caché para el App Shell (HTML, CSS, JS principal) y assets estáticos.
  - [x] Asegurar que la aplicación cargue y sea funcional (al menos en modo lectura o con datos cacheados) sin conexión a internet.
  - [x] Considerar una estrategia para la actualización del Service Worker cuando despliegues nuevas versiones de la app. (`autoUpdate` configurado)
- [x] **Instalación y Experiencia PWA:**
  - [x] Verificar que los navegadores ofrezcan la opción de "Añadir a pantalla de inicio" o "Instalar aplicación".
  - [x] (Opcional) Considerar un aviso o botón personalizado dentro de la app para promover la instalación.
  - [x] Verificar la apariencia de la splash screen y el comportamiento como app independiente (sin la barra de URL del navegador).
- [x] **Despliegue en Producción:**
  - [x] Elegir una plataforma de hosting estático que soporte HTTPS (fundamental para Service Workers). Opciones populares y gratuitas para empezar: Vercel, Netlify, GitHub Pages. (Elegido: Vercel)
  - [x] Configurar el proceso de build de producción de Vite (`npm run build`).
  - [x] Desplegar los archivos generados en la plataforma elegida. (Desplegado en Vercel)
  - [x] Asegurar que la aplicación se sirva obligatoriamente sobre HTTPS. (Gestionado por Vercel)
- [ ] **Auditoría PWA Inicial (Pre-Rediseño):**
  - [x] Realizar una auditoría Lighthouse inicial para identificar problemas críticos de PWA, Performance o Accesibilidad.
- [ ] **Rediseño y Ajustes Visuales/UX:**
  - [x] **Hallazgos Auditoría Lighthouse:**
    - [x] Asegurar contraste de color adecuado en toda la aplicación (mínimo 4.5:1 para texto normal, 3:1 para texto grande). Prestar especial atención a botones y elementos interactivos. (Ajustes iniciales aplicados)
    - [x] Añadir etiqueta `<main>` en `App.vue` para envolver el contenido principal y mejorar la accesibilidad semántica.
  - [x] **UI – Visual y Estilo:**
    - [x] Definir una nueva paleta de colores más armónica y accesible (Paleta pastel moderna definida: fondo #f5f7fa, texto #334155, acento #93c5fd, éxito #a7f3d0, alerta #fecaca, activo #fef08a).
    - [x] Configurar la nueva paleta de colores en Tailwind CSS (`tailwind.config.js`).
    - [x] Aplicar la nueva paleta de colores y estilos base a `App.vue` (fondo general, texto principal, contenedores principales, inputs, botones de acción principales y de gestión).
    - [x] Aplicar la nueva paleta de colores y estilos a `TaskList.vue` (título de la lista).
    - [x] Aplicar la nueva paleta de colores y estilos a `TaskItem.vue` (tarjetas de tarea, textos, botones internos de acción, iconos de estado, inputs de edición).
    - [x] Actualizar `theme_color` y `background_color` en `manifest.json` (o `vite.config.ts` si es generado por `vite-plugin-pwa`) para que coincidan con la nueva paleta.
    - [x] Actualizar el meta tag `theme-color` en `index.html` para que coincida con la nueva paleta.
    - [x] Unificar los estilos de bordes (`rounded`) en toda la aplicación para consistencia visual.    
    - [x] Integrar iconos junto al texto en botones clave para mejorar la comprensión y el atractivo visual (e.g., “Reabrir 🔁”, “Finalizar ✅”, “Eliminar 🗑️”, "Nuevo Turno ✨", "Exportar 📤", "Importar 📥", "Compartir 🔗").
        - [x] Mover iconos a la izquierda del texto en botones globales (`App.vue`).
        - [x] Reemplazar icono `+` en "Iniciar Tarea" por `PencilSquareIcon`.
        - [x] Asegurar consistencia de tamaño (`w-4 h-4`) y espaciado (`gap-2`) en iconos de botones globales.
        - [x] Añadir iconos a botones "Finalizar" y "Reabrir" en tarjetas de tarea (`TaskItem.vue`) a la izquierda del texto, con tamaño `w-4 h-4` y `gap-2`.
        - [x] Confirmar y mantener tamaño `h-6 w-6` para botones-icono ("Notificado", "Eliminar") en `TaskItem.vue` para mejor usabilidad.
    - [x] Mejorar la jerarquía visual utilizando contenedores diferenciados (mediante fondos, bordes sutiles, o sombras ligeras) para las secciones principales: formulario de nueva tarea, lista de tareas, filtros y acciones.
    - [x] Revisar y aplicar una tipografía y espaciado consistentes en toda la aplicación (e.g., `text-lg font-semibold tracking-wide` para títulos de sección, `text-base` o `text-sm` para contenido y controles, según jerarquía).
    - [x] Rediseñar el título principal de la aplicación: considerar eliminar el subtítulo actual, valorar la inclusión de un logo/icono simple y una fuente más distintiva si se desea.
  - [ ] **UX – Comodidad, Fluidez y Usabilidad:**
    - [x] Asegurar que la interfaz se adapta correctamente a pantallas móviles reales:
      - [x] Ajustar la disposición de los botones de acción en la parte inferior para evitar que salten de línea o se desordenen en pantallas pequeñas (usar `flex-wrap`, `gap`, `w-[48%]`, etc.).
      - [x] Compactar el formulario “Iniciar Tarea” en dispositivos móviles: inputs y botón en horizontal si es viable, o reducir `padding` y `margin` para que no ocupe tanto alto.
      - [x] Priorizar diseño "mobile-first", especialmente en botones y controles.
      - [x] Usar `flex-wrap`, `w-full`, `md:w-auto`, etc., para que los botones se comporten bien en dispositivos pequeños.
      - [x] Probar interacciones y distribución en dispositivos móviles reales (tamaño real de botones, espaciado, scroll).
      - [x] Comprobar y depurar la vista móvil en el navegador usando DevTools (modo dispositivo manualmente si atajo no funciona).    
    - [x] Asegurar que todos los botones y elementos interactivos tengan un tamaño accesible, cumpliendo con las directrices de zona mínima pulsable (e.g., `min-w-[44px]` y `min-h-[44px]`, y `py-2 px-4` o similar para el contenido interno).
    - [x] Reorganizar el layout de los `TaskItem.vue` (ítems de tarea):
        - [x] Explorar una disposición más horizontal de los campos (descripción, tiempos, técnico, acciones) si el espacio en dispositivos de escritorio/tableta lo permite, manteniendo una vista apilada clara para móviles.
        - [x] Considerar si la descripción de la tarea debería ser expandible/colapsable si es muy larga.
    - [x] (Opcional) Evaluar la posición del formulario "Iniciar tarea": podría integrarse de forma más fluida, quizás apareciendo de forma destacada si no hay tareas o como una sección siempre visible pero compacta.
    - [x] Agrupar los controles de filtro ("Solo Activas", "Solo Sin Notificar") y el selector de turno en una sección cohesiva, posiblemente en una sola línea con `flex-wrap` para adaptarse a diferentes anchos de pantalla.
    - [x] Definir y aplicar un esquema de color por estado de tarea que sea claro y consistente (e.g., un color para tareas activas/pendientes, otro para finalizadas).
    - [x] Implementar animaciones y transiciones suaves (`transition-all duration-300` o similar) para interacciones clave como hover en botones, cambio de estado de tareas, aparición/desaparición de elementos, para mejorar la sensación de fluidez.
    - [x] (Opcional) Evaluar la viabilidad y utilidad de una barra fija (superior o inferior) para acciones muy frecuentes (como "Iniciar Tarea" o "Nuevo Turno") o para el input principal.    
    - [x] (Opcional) Considerar un menú lateral desplegable (activado por un botón "hamburguesa") para opciones menos frecuentes como importación/exportación, borrado total, o futuro historial, para despejar la interfaz principal.
  - [x] **UX Funcional (Mejoras de Interacción):**
    - [x] Rediseñar el formato del mensaje de texto plano generado al compartir tareas para mejorar su legibilidad y atractivo visual (considerar emojis consistentes, mejor estructura).
    - [x] Implementar notificaciones visuales no intrusivas (tipo "Toast" o "Snackbar" sutil) para confirmar acciones importantes (e.g., "Tarea guardada", "Tarea notificada", "Turno iniciado").
    - [x] Implementada funcionalidad "Deshacer" con toasts para Eliminar Tarea, Borrar Todo y Crear Turno.
    - [x] (Descartado) Botón "Marcar todo como notificado". No requerido por no tener ocasiones de uso real.
  - [x] **Recursos y Componentes (Consideraciones Técnicas):**
    - [x] (Descartado) Uso de Headless UI. Evaluado y no necesario en esta app. La interfaz ya es accesible, no requiere modales ni menús complejos, y los componentes actuales (SideMenu, notificaciones…) ya están bien resueltos sin esta librería.
  - [x] **Actualizar Capturas de Pantalla:**
    - [x] Una vez finalizado el rediseño, crear/actualizar las capturas de pantalla (`screenshots`) para el `manifest.json` (mejorando la UI de instalación de la PWA) y para el archivo `README.md` de la documentación.
- [x] **Pruebas y Auditoría PWA Exhaustivas (Post-Rediseño):**
  - [x] Realizar auditorías completas con Lighthouse para verificar el cumplimiento de todos los criterios PWA, Performance, Accesibilidad, etc., tras el rediseño.
  - [x] Probar la instalación y el funcionamiento offline en diferentes navegadores de escritorio (Chrome, Edge, Firefox si soporta PWA).
  - [x] Probar en dispositivos móviles reales o emuladores:
    - [x] **Android (Chrome):** Verificar instalación, splash screen, funcionamiento offline, notificaciones (si las implementamos).
      - [x] Corregido icono cuadrado en Android añadiendo soporte "maskable" en manifest
    - [x] **iOS (Safari):** Verificar "Añadir a pantalla de inicio", comportamiento, y limitaciones (Safari tiene un soporte de PWA un poco diferente, especialmente para notificaciones push y background sync).

---

## 📓 Etapa 7: Documentación y presentación

- [x] Crear `README.md` con propósito, tecnologías, uso y capturas
- [x] Documentar cómo se inicializa y ejecuta la app
- [x] Registrar decisiones clave de diseño o estructura
- [x] Revisar y añadir comentarios explicativos al código en archivos importantes
- [x] Dejar anotaciones para evolución futura (v1.1, ideas de mejora, etc.)

---

## 🔔 Etapa 8: Mejoras opcionales

- [ ] 🤖 Exportar, firmar y publicar versión Android nativa (Capacitor + Android Studio)

  - [x] 📦 Generar y probar APK sin firmar
    - [x] Ejecutar `npx cap add android` y abrir proyecto en Android Studio
    - [x] Hacer build de producción (`npm run build`) y copiarlo con `npx cap copy`
    - [x] Generar APK sin firmar desde Android Studio (modo debug)
    - [x] Instalar manualmente en dispositivo de prueba (USB, enlace o almacenamiento interno)
    - [x] Probar que la app funciona correctamente en dispositivo real:
      - [x] Comprobada carga sin conexión
      - [x] Comprobado comportamiento como app (inputs, scroll, botones, navegación)
      - [x] Validado splash screen por defecto
      - [ ] Reemplazar splash screen por versión personalizada
        - [ ] Diseñar imagen o animación para el splash adaptada a la app
        - [ ] Configurar splash personalizado en `capacitor.config.ts` y `android/app/src/main/res`
        - [ ] Verificar que la transición desde el splash a la app es fluida
      - [ ] Funciones de compartir, import/export (no implementadas aún)
      - [ ] Permisos (no aplican aún)
    - [x] Revisar diseño y UX en Android real:
      - [x] Inputs y teclado
      - [x] Scroll y navegación
      - [x] Botones e interacción general
      - [ ] Ajustes para safe areas, notch y barras flotantes (pendiente de revisión en detalle)

  - [x] 🪢 Separar ramas de desarrollo y producción en el repositorio
    - [x] Crear rama `main` dedicada a versiones estables y producción (APK/Play Store)
    - [x] Crear rama `develop` para implementar nuevas características y mejoras sin afectar usuarios finales
    - [x] Configurar flujos de merge (PRs o manual) para que los cambios se validen antes de llegar a `main`
    - [x] Opcional: configurar previsualizaciones automáticas en Vercel desde `develop` (si se necesita testing web)
    - [x] Documentar en README el flujo de trabajo con ramas para futuros cambios

  - [x] 🔐 Generar y aplicar firma de aplicación (APK firmado)
    - [x] Crear un `keystore` persistente para la app (`.jks`) y guardar copia segura
    - [x] Configurar firma en Android Studio (`build.gradle`) con ese keystore
    - [x] Generar APK o App Bundle (`.aab`) firmada y lista para distribución
    - [x] Verificar que se instala correctamente en el dispositivo
    - [x] Confirmar que el keystore se conserva para futuras actualizaciones

  - [x] 🧪 Verificar versión firmada y preparada para futuras actualizaciones
    - [x] Aumentar `versionCode` y `versionName` en `build.gradle` con cada nueva versión
    - [x] Comprobar que una instalación previa se puede actualizar sin problemas
    - [x] Validar comportamiento de splash screen, íconos, orientación, permisos, navegación, botón de retroceso y almacenamiento local en versión firmada

  - [ ] 🧼 Revisión de metadata y configuración para distribución
    - [ ] Verificar que `manifest.json` tiene `display: standalone`, nombre corto, descripción, idioma, `theme_color`, `background_color`, etc.
    - [ ] Confirmar que los íconos son adecuados y `maskable` (Android)
    - [x] Definir nombre visible y nombre de paquete (`com.jcpaezd.notifica`)
    - [ ] Eliminar permisos innecesarios y asegurar comportamiento offline
    - [ ] Incluir capturas, ícono de app y descripción lista para Play Store

  - [x] 🛡 Crear cuenta de desarrollador Google Play
    - [x] Acceder a https://play.google.com/console/ y registrarse como desarrollador individual
    - [x] Pagar la tasa única de 25 USD
    - [x] Aceptar términos y configurar perfil de cuenta. Completar verificaciones.

  - [x] 🚦 Subir app en canal de testing privado en Google Play
    - [x] Generar `.aab` y subirlo a Play Console *(listo para subir)*
    - [x] Crear listado de testers (emails) o compartir enlace de testing interno
    - [x] Especificar versión, notas de cambio, idioma, categoría, etc.
    - [x] Habilitar feedback de testing si se desea
    - [x] Instalar desde Play Store en dispositivo real y verificar funcionamiento completo

  - [ ] 🚀 Publicar app en canal público de Google Play
    - [ ] Completar ficha de Play Store: nombre, descripción, capturas, privacidad, contacto, categoría, rating, política de datos
    - [ ] Revisar que cumple todas las políticas de contenido y permisos
    - [ ] Enviar para revisión y esperar validación de Google
    - [ ] Una vez aprobada, confirmar que está disponible públicamente en Play Store

---

- [ ] 🕛 Corrección automática de fecha en tareas creadas o editadas cerca de medianoche
  - [ ] Detectar si la hora introducida corresponde al día anterior (e.g. 23:00 introducida después de medianoche)
  - [ ] Ajustar fecha automáticamente si es coherente
  - [ ] Mostrar toast informativo con opción de deshacer

- [ ] ✉️ Formulario de feedback con envío automático por email
  - [ ] Añadir botón "Enviar feedback" en el menú lateral
  - [ ] Crear formulario visual con campos: tipo de mensaje (bug, sugerencia...), descripción, email opcional
  - [ ] Al enviar, guardar el feedback en Firestore en la colección `feedback`
  - [ ] Crear una función en Firebase (`functions.firestore.onCreate`) que escuche nuevos documentos y envíe un correo con su contenido
  - [ ] Usar `nodemailer` o servicio externo (Resend, SendGrid...) para el envío
  - [ ] Mostrar confirmación de envío exitosa en la interfaz

- [ ] 📜 Evitar scroll innecesario cuando no hay contenido largo
  - [ ] Decidir si añadir más o menos scroll para evitar contenido tapado por toast
  - [ ] Revisar estructura de layout general (`App.vue`)
  - [ ] Asegurar que el `main` se ajusta correctamente al viewport y no desborda

- [ ] 🗓️ Mejorar identificador de turnos en el selector
  - [ ] Añadir día de la semana al nombre del turno (`📅 Lunes · 03/06 · 23:00`)
  - [ ] Aplicar formato más visual con emojis, abreviaturas y colores sutiles en selector y en títulos de las vistas cargadas de turnos

- [ ] 🙅‍♂️ Desactivar selección de texto en elementos UI no editables
  - [ ] Aplicar clase `select-none` en botones, tarjetas, menús y demás UI
  - [ ] Permitir `select-text` solo en campos de entrada y texto editable

- [ ] 🍔 Corregir comportamiento de hover persistente en botón hamburguesa
  - [ ] Limitar uso de `hover:` solo a escritorio (`md:hover:`)
  - [ ] Asegurar limpieza de estilos en móviles (`focus-visible`, `active`, etc.)

- [ ] ↖️ Mantener header fijo para acceso a menú siempre

- [ ] 🛠 Mejoras UX/UI aplicando aprendizajes de Nocta
  - [ ] 📐 Revisar safe areas para pantallas con notch o barras flotantes
    - [ ] Asegurar que el contenido principal no queda oculto en dispositivos con notches, cámaras perforadas o barras de navegación
    - [ ] Ajustar paddings o usar `env(safe-area-inset-*)` en CSS/Tailwind si es necesario
    - [ ] Verificar en dispositivos reales y simuladores que la app se ve correctamente

- [ ] 📣 Aviso en PWA para migración a versión nativa (tras publicación en Google Play)
  - [ ] Añadir comprobación condicional para mostrar aviso solo en entornos `web` o PWA (`navigator.standalone`, `Capacitor.isNativePlatform()`, etc.)
  - [ ] Mostrar toast persistente o banner:  
        `¡Ya está disponible la app oficial en Google Play! Instálala para disfrutar mejor experiencia.`
  - [ ] Incluir botón con enlace a la app en Play Store (`market://details?id=com.jcpaezd.notifica` o URL de fallback)
  - [ ] Añadir lógica para ocultar el aviso tras instalar versión nativa (opcional, si se puede detectar)
  - [ ] Desactivar este aviso cuando se publique en abierto o pasado un tiempo

---

## 🚀 Etapa 9: Publicación final y visibilidad pública

- [ ] 🧭 Revisar, repensar y tomar decisiones sobre los puntos de este bloque
  - [ ] Confirmar qué tareas de visibilidad y comunicación se llevarán a cabo
  - [ ] Posponer o descartar aquellas que no se consideren útiles o prioritarias

- [ ] 🌍 Publicar app en canal público de Google Play
  - [ ] Completar ficha de Play Store: nombre, descripción, capturas, privacidad, contacto, categoría, rating, política de datos
  - [ ] Revisar que cumple todas las políticas de contenido y permisos
  - [ ] Enviar para revisión y esperar validación de Google
  - [ ] Confirmar que está disponible públicamente en Play Store

- [ ] 📢 Anunciar disponibilidad de versión nativa a usuarios actuales de la PWA
  - [ ] Detectar si el usuario está accediendo desde la versión web/PWA
  - [ ] Mostrar banner o alerta informativa: “Disponible versión nativa en Play Store”
  - [ ] Incluir enlace directo a la ficha de la app en Google Play
  - [ ] Opcional: detectar si ya tiene la app nativa instalada y ocultar banner

- [ ] 📬 Preparar mensaje de presentación para redes o comunidades
  - [ ] Escribir un texto breve y claro explicando:
    - Qué problema resuelve la app
    - Para quién está pensada
    - Por qué se ha creado
  - [ ] Incluir capturas atractivas o enlace a la ficha de Play Store
  - [ ] Incluir enlace a GitHub, página informativa o demo si se considera útil

- [ ] 📌 Compartir la app en plataformas relevantes
  - [ ] `/r/androidapps` (si se presenta como app útil, sin spam)
  - [ ] `/r/SideProject` (enfocado a proyectos personales)
  - [ ] `/r/AndroidDev` (enfocado a desarrollo, si se cuenta parte del proceso técnico)
  - [ ] Foros o grupos relacionados con mantenimiento técnico, trabajo en fábricas, etc.
  - [ ] Círculos personales o profesionales cercanos (Telegram, WhatsApp, email)
  - [ ] (Opcional) Crear mini landing page o entrada en Notion con más detalles


---


### 🔧 Buenas prácticas para trabajar con Gemini en VSCode

* Guarda siempre los archivos antes de pedir un diff.
* Pide a Gemini que te solicite el archivo antes de sugerir cambios.
* Divide los cambios en pasos pequeños y progresivos.
* Si un diff no aplica bien, cierra y vuelve a abrir el archivo.
* Reinicia la conversación si ves bloqueos o lentitud persistente.

#### 📄 Prompt recomendado para nuevas conversaciones con Gemini:

Vamos a continuar el desarrollo de mi app llamada Notifica. Ya tengo avanzado el proyecto y vamos a continuar siguiendo el roadmap. Puedes revisar el archivo Notifica-Roadmap.md para ver el estado actual.

Por favor:

* Antes de generar diffs, pídeme que te muestre el archivo.
* Aplica los cambios de forma gradual y clara.
* Recuerda siempre no generar lineas demasiado largas, divídelas en varias para facilita lectura y evitar errores con los diffs. Usa saltos de linea después de cada grupo de clases.
* Si no estas seguro de conocer el código actualizado antes de generar un diff, pídeme que muestre el archivo.
* Si el paso actual del roadmap es amplio, sugiéreme dividirlo en subtareas.
* Usa la paleta de colores pastel acordada y sigue el estilo minimalista, suave, funcional y moderno que hemos definido.
* Al completar todos los subpuntos de un punto, marca ese punto tambien como completado.

Podemos continuar.
Lo ultimo que hice fue...
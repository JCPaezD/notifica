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

## 🔔 Etapa 8: Mejoras opcionales y consolidación previa a publicación

- [x] 🤖 Consolidar versión Android nativa (Capacitor + Android Studio)

  - [x] 📦 Generar y probar APK sin firmar
    - [x] Ejecutar `npx cap add android` y abrir proyecto en Android Studio
    - [x] Hacer build de producción (`npm run build`) y copiarlo con `npx cap copy`
    - [x] Generar APK sin firmar desde Android Studio (modo debug)
    - [x] Instalar manualmente en dispositivo de prueba
    - [x] Confirmar funcionamiento completo en dispositivo real:
      - [x] Carga sin conexión
      - [x] Inputs, scroll, botones, navegación
      - [x] Splash personalizada con Theme.SplashScreen (Android 12+) y background_legacy (Android 10)
      - [x] Transición fluida a la app
      - [x] Confirmado en emuladores y dispositivo Huawei físico
      - [x] Evitado halo oscuro (cambio de icono)
      - [x] Intento de evitar parpadeo blanco descartado y revertido
      - [x] Limpieza de recursos no usados (icon.png)
      - [x] Confirmado funcionamiento tras limpieza
      - [ ] Anotado comportamiento menor: icono genérico en Pixel 4 al abrir desde homescreen (posible bug del emulador)

  - [x] 🪢 Flujo de ramas y despliegue
    - [x] Rama `main`: producción estable
    - [x] Rama `develop`: trabajo diario
    - [x] Merge validado antes de llegar a `main`
    - [x] Previsualizaciones automáticas en Vercel desde `develop` (opcional)
    - [x] Documentado en README

  - [x] 🔐 Firma y preparación para distribución
    - [x] Keystore `.jks` creado y guardado
    - [x] Configuración en `build.gradle`
    - [x] Generación de `.aab` firmada
    - [x] Confirmado que se instala y actualiza correctamente

  - [x] 🧪 Verificación de release firmada
    - [x] Aumento de `versionCode` y `versionName` en `build.gradle`
    - [x] Confirmado que se puede actualizar desde una instalación previa
    - [x] Validado splash, navegación, retroceso, permisos y almacenamiento local

  - [ ] 🧼 Preparación para publicación en Play Store
    - [x] `manifest.json` correcto (`standalone`, idioma, nombre, colores…)
    - [x] Nombre visible y nombre de paquete (`com.jcpaezd.notifica`)
    - [x] Confirmar que los íconos son adecuados y `maskable` (Android)
    - [x] Eliminar permisos innecesarios
          > La app solo solicita INTERNET, necesario para el WebView de Capacitor. No hay permisos adicionales en PWA ni nativos.
    - [x] Incluir capturas para ficha de Play Store (realistas y variadas)
    - [x] Redactar descripción detallada para ficha de Play Store
    - [x] Crear borrador de ficha en Google Play Console  
      - [x] Subido icono principal (512x512)  
      - [x] Subidas 5 capturas desde emulador Pixel 7 (pantallas clave de la app)  
      - [x] Redactada y guardada descripción larga en estilo claro y profesional  
      - [x] Definida descripción breve para la ficha (PWA-style)  
      - [x] Guardado todo como borrador (sin enviar a revisión aún)

  - [x] 🛡 Cuenta de desarrollador Google Play
    - [x] Registro, verificación y pago completado

  - [x] 🚦 Testing interno en Play Console
    - [x] Subida de `.aab` al canal de pruebas internas
    - [x] Compartido con testers
    - [x] Confirmada instalación desde Play Store y funcionamiento completo

  - [x] ✅ Validar funciones clave en versión nativa Android  
    - [x] Compartir tareas (botón compartir, clipboard, navigator.share y Capacitor Share)
    - [x] Exportar e importar archivos (JSON o texto)  
        - ✅ Exportar archivo `.json` en Android nativo usando `Filesystem` + `Share`.  
        - ✅ En PWA/navegador, se mantiene la descarga directa del archivo.  
        - ℹ️ En Android, el archivo se comparte mediante el diálogo del sistema.  
        - 📌 Limitación aceptada: Android no siempre ofrece una opción de "Guardar en Archivos"; dependerá de las apps instaladas.  
        - ✅ Importar `.json` desde archivo funciona correctamente en todas las plataformas.
    - [x] Borrar todos los datos (y mostrar toast de confirmación)
    - [x] Comparar con experiencia en PWA
    - [x] Ajustar si es necesario para equiparar comportamiento  
        - No se han detectado diferencias relevantes entre Android nativo y PWA.  
        - Comportamiento validado como equivalente tras pruebas completas en ambas plataformas.

  - [x] 🔃 Reorganización de tareas en etapa 8 y 9  
    - [x] Pospuesto el cambio de visibilidad pública hasta después del aviso en PWA  
    - [x] Ajustado orden de pasos para que reflejen la secuencia real de publicación  
    - [x] Añadido recordatorio para actualizar README tras publicación

  - [x] Documentar proceso completo de splash screen en Android  
    - [x] Registrar solución bifurcada Android 10 / Android 12+  
    - [x] Incluir causas del bug, pruebas realizadas, fallos y revertidos  
    - [x] Confirmar validez del sistema actual y observaciones secundarias  
    - [x] Marcar como reutilizable en futuros proyectos similares

  - [x] Documentar proceso de publicación PWA y sincronización de versiones  
    > Incluye actualización manual de package.json y SideMenu.vue, recomendaciones para Android y opción futura de automatización con Vite.


---

- [ ] 🕛 Corrección automática de fecha en tareas cerca de medianoche
  - [ ] Detectar si hora introducida corresponde al día anterior
  - [ ] Ajustar fecha si es coherente
  - [ ] Mostrar toast con opción de deshacer

- [ ] ✉️ Formulario de feedback por email
  - [ ] Botón "Enviar feedback" en menú lateral
  - [ ] Formulario con tipo de mensaje, descripción y email opcional
  - [ ] Guardar en Firestore (colección `feedback`)
  - [ ] Trigger en Firebase Functions con envío por email (`nodemailer`, Resend, etc.)
  - [ ] Confirmación visual tras enviar

- [ ] 📜 Scroll innecesario en pantallas cortas
  - [x] Revisar layout y paddings
  - [ ] Ajustar para evitar toasts tapados y mejorar adaptación al viewport
    - [x] Revisar sistema de notificaciones usado en Nocta
    - [x] Decidir estructura de archivos y rutas para Notifica
    - [x] Copiar/adaptar componentes y composables necesarios
    - [x] Integrar sistema en App.vue con <Teleport> si aplica
    - [x] Añadir soporte para botón de acción en el sistema de toasts
      - [x] Definir API esperada (label + onClick)
      - [x] Modificar <Toast.vue> para mostrar botón si hay acción
      - [x] Emitir evento o ejecutar función asociada al click
      - [x] Estilizar el botón para que sea compacto y accesible
      - [x] Probar en móvil y escritorio con caso "Deshacer"
    - [x] Añadir animación o retroalimentación visual al botón de acción al pulsar
    - [x] Añadir animación sutil al montar el toast (una sola vez)
      - [x] Activar clase como animate-pop o animate-scale tras delay breve
      - [x] Usar onMounted o watch en Toast.vue
      - [x] Retirar clase para evitar loops
      - [x] Comprobar en móvil y escritorio sin interferir con el cierre
    - [x] Añadir animación de entrada y salida al toast completo
      - [x] Usar <TransitionGroup name="toast"> como en Nocta
      - [x] Definir clases .toast-enter-from, .toast-leave-to... en main.css
      - [x] Validar que funciona con v-for y Teleport
      - [x] Probar fluidez en móvil y escritorio
    - [x] Reemplazar llamadas a vue-sonner por sistema propio
      - [x] Añadir soporte para onDismiss (ejecutar al cerrarse automáticamente)
      - [x] Añadir soporte para tipo visual de toast (success, error, info, warning)
      - [x] Hacer que add(...) devuelva el id del toast
      - [x] Revisar todas las llamadas a toast para adaptar estos nuevos campos si aplica
      - [x] Continuar la sustitución de notifySuccess, notifyInfo, notifyError, notifyWarning
    - [x] Eliminar vue-sonner y sus rastros del proyecto
    - [x] El botón deshacer no cerraba el toast de "Tarea eliminada"
      > Se ajustaron los tiempos de cierre y aparición para permitir la animación completa del botón y una experiencia visual fluida.
    - [x] Ajustar diseño visual: tamaño, posición, animación, stacking. 
      > Objetivo general: estética profesional y agradable.
      > Objetivo original y principal: compactar y molestar menos al usuatio tapando contenido.
      - [x] Analizar estética actual del sistema migrado (fondos blancos, full width, stacking sin animación)
      - [x] Revisar ejemplos anteriores (vue-sonner, Tailwind UI, cute-toast, etc.) y evaluar ideas aplicables
      - [x] Tomar decisiones de estilo:
        - Fondos suaves por tipo (no blancos)
        - Icono a la izquierda, botón de cerrar a la derecha
        - Botón de acción opcional con icono de deshacer incluido
        - Compactar paddings y espacio entre toasts
        - Limitar ancho y centrar (máx. `max-w-xs`)
        - Borde redondeado uniforme (como tareas)
      - [x] Validar tipos de toast e iconografía adecuada (error, success, info, warning)
      - [x] Diseñar un mock en HTML con Tailwind Play
      - [x] Iterar con ajustes hasta obtener versión final
      - [x] Aplicar diseño final a `<Toast.vue>` (estructura, estilos, colores, iconos)
      - [x] Ajustes visuales menores en el sistema de toasts
        > Tipos corregidos, margen inferior ajustado y limpieza de toasts de prueba tras validación en iOS.
      - [x] Ajustar layout de `<TransitionGroup>` para respetar ancho, spacing y posición
      - [ ] Añadir animación suave a reordenamiento de toasts (apilado dinámico)
      - [x] Validar consistencia visual con otros elementos de la app (como tareas, botones, colores)
      - [x] Botón deshacer en toast "Borrar todo" y "Nuevo turno", al pulsar no se cierra el toast
        > Copiar comportamiento de eliminar tarea 
      - [x] Animación de pulsado en PWA iPhone
        > Corregido el efecto `scale-95` al pulsar el botón de acción del toast en iOS añadiendo `@touchstart="() => {}"` para forzar la activación de `:active` sin interferir con `onClick`.
      - [x] No permitir seleccionar textos en toasts
    - [x] Scroll inesperado al hacer doble tap en área vacía
      > Corregido ajustando el alto del `<main>` con `min-h-[100svh]` y añadiendo `overflow-hidden`, además de activar `viewport-fit=cover` en el meta viewport para soporte completo en PWA iOS.
    - [x] Scroll inesperado al hacer doble tap en área vacía
      > Bug visual de iOS PWA confirmado como fallo de WebKit. Se descarta tras probar soluciones estándar: scrollTo, bloqueo de touchmove, min-h-[100svh], safe areas, etc. No afecta a usabilidad y solo se produce si se fuerza. Se documenta en dev-notes.
    - [x] Scroll innecesario en el menú lateral (PWA iOS)
      > Solucionado limitando altura del <DialogPanel> con min-h-[100svh] y overflow-hidden. El scroll extra desaparece y el footer con la versión se mantiene visible.
    - [ ] Verificar funcionamiento real (móvil y escritorio)
    - [ ] Documentar en dev-notes la decisión y estructura

- [ ] 🗓️ Mejora en identificador visual de turnos
  - [ ] Corregir visibilidad del desplegable de turnos en Android
    > El menú se corta si no hay espacio suficiente hacia abajo. Detectar si debe abrirse hacia arriba o abajo dinámicamente. Añadir altura máxima y scroll interno para evitar cortes visuales.
  - [ ] Añadir día de la semana al selector
  - [ ] Usar emojis o colores sutiles para diferenciar turnos

- [x] 🙅‍♂️ Desactivar selección de texto innecesaria  
  - [x] Aplicado `select-none` global en `<main>`, `<header>` y contenedor de menú lateral  
  - [x] `select-text` se mantiene solo en campos de entrada por defecto (inputs, textareas)  
  - [x] Validado en navegador y dispositivos: no se puede seleccionar texto accidentalmente en ningún elemento de la UI

- [ ] 🍔 Corregir hover persistente en botón hamburguesa
  - [ ] Limitar hover a escritorio (`md:hover:`)
  - [ ] Asegurar estilos limpios en móvil (`focus-visible`, `active`)
  - 📝 Intentado con clases `btn-interactive`, pero generaba efectos inconsistentes. Se pospone.

- [x] ↖️ Fijar header para acceso constante al menú  
  > Implementado con `sticky top-0` y fondo blanco en todo el ancho.  
  > Probado en dispositivo real (PWA en iPhone 16 Pro): sin fallos visuales.  
  > En DevTools móvil (Chrome), puede verse un "temblor al hacer scroll", considerado bug de simulación. No se reproduce en dispositivos físicos.

- [x] 🎞️ Animación sutil del icono del header
  - [x] Decidir tipo de animación (escala + sombra sutil)
  - [x] Activarla al hacer hover en escritorio (`md:hover`) sobre logo + título
  - [x] Activarla al crear nuevo turno con efecto breve y retraso de inicio
  > Se ha implementado una animación suave compartida entre logo y título (scale-105 + drop-shadow-md), que se activa en escritorio al hacer hover, y también de forma programada cuando se crea un nuevo turno.
  > El comportamiento es fluido, no invasivo y aporta feedback visual sin distraer.
  > En móvil, la animación se dispara tras confirmar la creación del turno, con un retardo para asegurar visibilidad.

- [ ] 🛠 Mejoras UX/UI aprendidas en Nocta
  - [ ] Añadir splash para pa PWA ios y arreglar la de android (si es posible y fácil) 
  - [ ] 📐 Revisar safe areas para notches y barras flotantes
    - [ ] Asegurar que ningún contenido queda oculto
    - [ ] Ajustar paddings con `env(safe-area-inset-*)`
    - [ ] Verificar en dispositivos reales y emuladores

- [ ] 🪧 Toast no desaparecen a veces al volver si la app ha salido del primer plano

- [ ] 📣 Aviso en PWA para migración a app nativa
  - [ ] Detectar si es entorno web o PWA
  - [ ] Mostrar toast persistente con enlace a Play Store
  - [ ] Ocultar aviso si ya está instalada la versión nativa (opcional)
  - [ ] Añadir fallback para iOS con link personalizado

---

## 🚀 Etapa 9: Publicación final y visibilidad pública

- [ ] 📤 Publicar versión PWA como estable  
  - [ ] Confirmar que la rama `main` está actualizada con la última versión  
  - [ ] Subir cambios a Vercel y verificar despliegue correcto  
  - [ ] Actualizar `versionName` en UI y archivos visibles para usuarios  
  - [ ] Confirmar correcto funcionamiento como app instalada desde navegador
  - [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "Descripción del release"
      git push origin v1.X.Y  

- [ ] 🧭 Revisar, repensar y tomar decisiones sobre los puntos de este bloque  
  - [ ] Confirmar qué tareas de visibilidad y comunicación se llevarán a cabo  
  - [ ] Posponer o descartar aquellas que no se consideren útiles o prioritarias  

- [ ] 🌍 Subir app al canal público como "no listada"  
  > Este paso sube la app a producción en Google Play para revisión, pero sin visibilidad pública.  
  - [ ] Revisar ficha de Play Store (nombre, descripción, capturas, política de datos…)  
  - [ ] Confirmar que todo está actualizado y listo para revisión  
  - [ ] Enviar para revisión de Google y esperar aprobación  
  - [ ] No activar aún la visibilidad pública  

- [ ] 📢 Aviso en PWA para migración a versión nativa (tras publicación en abierto)  
  - [ ] Añadir comprobación condicional para mostrar aviso solo en entornos `web` o PWA (`navigator.standalone`, `Capacitor.isNativePlatform()`, etc.)  
  - [ ] Mostrar toast persistente o banner:  
        `¡Ya está disponible la app oficial en Google Play! Instálala para disfrutar mejor experiencia.`  
  - [ ] Incluir botón con enlace a la app en Play Store (`market://details?id=com.jcpaezd.notifica` o URL de fallback)  
  - [ ] Añadir lógica para ocultar el aviso tras instalar versión nativa (opcional, si se puede detectar)  
  - [ ] Desactivar este aviso cuando se publique en abierto o pasado un tiempo  
  - [ ] Informar de que para usuarios de iOS, se puede instalar desde el link de Vercel o un acortador personalizado  

- [ ] 📬 Preparar mensaje de presentación para redes o comunidades  
  - [ ] Escribir un texto breve y claro explicando:  
    - Qué problema resuelve la app  
    - Para quién está pensada  
    - Por qué se ha creado  
  - [ ] Incluir capturas atractivas o enlace a la ficha de Play Store  
  - [ ] Incluir enlace a GitHub, página informativa o demo si se considera útil  
  - [ ] Actualizar `README.md` del repositorio con info final (versión nativa, enlaces, capturas...)  

- [ ] ✅ Activar visibilidad pública desde Play Console  
  > Este será el lanzamiento real y abierto al público general. Se activará la visibilidad pública desde la consola de Google Play, una vez completadas las tareas anteriores.  
  - [ ] Confirmar que la app ha sido aprobada y está funcional  
  - [ ] Activar visibilidad pública desde Play Console  
  - [ ] Confirmar que está disponible en búsquedas y accesible desde la Play Store  
  - [ ] Activar el aviso en la PWA (tarea pendiente del punto anterior)  

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
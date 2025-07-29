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

## 🔔 Etapa 8: Mejoras y consolidación previa a publicación

- [x] 🤖 Consolidar versión Android nativa (Capacitor + Android Studio) y PWA par iOS.

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

  - [x] 🧼 Preparación *parcial* para publicación en Play Store
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

- [x] 📜 Scroll innecesario en pantallas cortas
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
      - [x] Añadir animación suave a reordenamiento de toasts (apilado dinámico)
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
    - [x] Verificar funcionamiento real (móvil y escritorio)
    - [x] Documentar en dev-notes la decisión y estructura

- [x] 🙅‍♂️ Desactivar selección de texto innecesaria  
  - [x] Aplicado `select-none` global en `<main>`, `<header>` y contenedor de menú lateral  
  - [x] `select-text` se mantiene solo en campos de entrada por defecto (inputs, textareas)  
  - [x] Validado en navegador y dispositivos: no se puede seleccionar texto accidentalmente en ningún elemento de la UI

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

- [x] 🗓️ Mejora en identificador visual de turnos
  - [x] Corregir visibilidad del desplegable de turnos en Android
    > El menú se corta si no hay espacio suficiente hacia abajo. Detectar si debe abrirse hacia arriba o abajo dinámicamente. Añadir altura máxima y scroll interno para evitar cortes visuales.
  - [x] Añadir día de la semana al selector
  - [x] Usar emojis o colores sutiles (finalmente svg heroicons con colores) para diferenciar turnos (mañana/tarde/noche)
  - [x] Revisión y ajuste fino del diseño del selector y del titulo del turno

- [x] 🔧 Refactor: separación de responsabilidades en App.vue
  📝 Esta tarea puede realizarse de forma aislada en una conversación separada o como bloque independiente del roadmap. No requiere rediseño ni nuevas funcionalidades.
  - [x] Crear archivo `src/composables/useShifts.ts`
    - [x] Mover `getShiftIcon`, `getShiftLabel`, `getShiftColor` a este archivo
    - [x] Exportarlos con tipos correctos
    - [x] Importarlos de nuevo en `App.vue`

  - [x] Crear archivo `src/icons/shifts.ts`
    - [x] Mover la constante `icons` con los 3 iconos (`sun`, `clock`, `moon`)
    - [x] Exportar como `export const shiftIcons = { ... }`
    - [x] Importar en `App.vue` y renombrar si es necesario

  - [x] Crear componente `ShiftSelector.vue`
    - [x] Mover el bloque del selector de turno al nuevo componente
    - [x] Recibir las props necesarias (`availableShifts`, `currentShiftId`, `selectShift`)
    - [x] Emitir eventos (`@select`) o usar `v-model` si procede
    - [x] Estilizar igual que ahora (no rediseñar)

  - [x] Verificar que `App.vue` queda reducido y más legible
    - [x] Comprobar que todo funciona igual
    - [x] No cambiar lógica ni estilos


- [x] 🍔 Corregir hover persistente en botón hamburguesa
  - [x] Limitar hover a escritorio (`md:hover:`)
  - [x] Asegurar estilos limpios en móvil (`focus-visible`, `active`)
  - 📝 Intentado con clases `btn-interactive`, pero generaba efectos inconsistentes. Se pospone.

- [x] 🔧 Refactor: extraer los filtros de tareas como componente  
  📝 Los toggles de filtros (`Activas` y `Sin Notificar`) pueden aislarse como un componente compacto y reutilizable.  
  - [x] Crear componente `TaskFilters.vue`  
  - [x] Recibir `showOnlyActive` y `showOnlyNotNotified` como props o usar `v-model`  
  - [x] Emitir eventos de cambio o usar `update:modelValue`  
  - [x] Estilizar igual que ahora, sin rediseñar  
  - [x] Sustituir el bloque de filtros actual por el nuevo componente  
  - [x] Verificar comportamiento en móviles y navegación rápida

- [x] 🔧 Refactor: extraer formulario de nueva tarea como componente  
  📝 Esta tarea puede realizarse de forma segura tras el refactor de turnos. Mejora la claridad de App.vue y permite aislar la lógica de inputs y validaciones.  
  - [x] Crear componente `NewTaskForm.vue`  
    - [x] Incluir `textarea` y `input` para técnico  
    - [x] Botón “Iniciar” con icono  
  - [x] Definir props si fueran necesarias (`currentShiftId`, etc.)  
  - [x] Emitir evento `@create` con la nueva tarea (o solo su descripción y técnico)  
  - [x] Gestionar foco, limpieza y validación internamente  
  - [x] Reemplazar bloque de formulario en App.vue por el nuevo componente  
  - [x] Verificar que todo funciona igual (móviles, teclado, toasts)


- [x] 🔧 Refactor: animación del logo en un componente o composable  
  📝 La lógica de animación del título puede separarse para claridad o reutilización futura.  
  - [x] Crear composable `useLogoAnimation.ts` o componente `LogoBlock.vue`  
  - [x] Mover `ref` y `setTimeout` actuales  
  - [x] Importar y usar en App.vue sin cambiar diseño  
  - [x] Validar que la animación se aplica como antes (hover y tras nuevo turno)

- [x] 🌀 Revisar bug crítico: “Scroll inesperado al hacer doble tap en área vacía (iOS PWA)”
  [Resuelto 20/07/25: la solución fue aplicar touch-action: manipulation y text-size-adjust globalmente. +Info dev-notes.md]
  - [x] Confirmar que:
        - El bug solo aparece en iOS cuando la app está instalada como PWA (standalone)
        - No ocurre en Android (PWA ni APK)
        - No ocurre en la versión PWA estable publicada hace ~35 días
  - [x] Estudiar en qué momento se reintrodujo:
        - [x] Comparar con commit de la última versión pública
        - [x] Identificar los cambios que pueden haberlo activado:
              - Implementación del header `sticky top-0`
              - Eliminación del scroll extra del `<main>`
  - [x] Volver a revisar soluciones previamente descartadas:
        - `min-h-[100svh]` en `<main>`
        - `overflow-hidden` en `html`, `body` o `main`
        - `viewport-fit=cover` en el meta viewport
        - Añadir `scrollTo(0, 0)` tras `blur`
        - Bloqueo de `touchmove` en áreas vacías
        - Ajustes con `safe-area-inset-*`
  - [x] Hacer pruebas controladas activando y desactivando los cambios de layout, uno por uno
  - [x] Documentar resultados, incluyendo efectos secundarios no deseados
  - [x] Tomar decisión antes de liberar públicamente la app:
        - [x] ✅ Aplicar solución si funciona sin efectos secundarios
        - [x] 🔁 Revertir cambio(s) de layout para evitar el bug (aunque se pierda alguna mejora)
        - [x] 📌 Aceptar el bug como limitación documentada de iOS PWA, si no hay alternativa razonable

- [x] 🌓 Añadir soporte para modo oscuro (tema `dark` en Tailwind)

  ✅ Subbloque 1: Activación y toggle global
  - [x] Activar modo `class` en Tailwind
    - [x] Modificar `tailwind.config.js` para usar `darkMode: 'class'`
  - [x] Preparar toggle global (modo manual)
    - [x] Crear composable `useDarkMode.ts` con:
      - [x] Estado reactivo (`isDark`)
      - [x] Persistencia en `localStorage`
      - [x] Funciones `enableDark()`, `disableDark()`, `toggleDark()`
      - [x] Detección inicial del modo por defecto del sistema (`matchMedia`)
    - [x] Aplicar o remover clase `dark` en `<html>` o `<body>` según estado
    - [x] Añadir botón en el menú lateral (`SideMenu.vue`) para alternar modo claro/oscuro (con colapsable visual integrado)

  🟡 Subbloque 2: Revisión completa de migración a clases personalizadas
  - [x] 🧼 Revisión completa de clases de color en la app
    - [x] Inspeccionar todos los elementos clave (SideMenu, botones, tareas, toasts, inputs…)
    - [x] Detectar y eliminar clases hardcodeadas (`bg-red-500`, `text-white`, etc.)
    - [x] Sustituirlas por clases personalizadas ya definidas en `tailwind.config.js`
    - [x] Confirmar que todas las clases de color visibles provienen del sistema centralizado

  - [x] 🧩 Unificar shiftColors.ts usando clases personalizadas text-shift-*
    - [x] Añadir clases text-shift-* en theme.extend.textColor
    - [x] Sustituir en shiftColors.ts los valores light y dark
    - [x] Confirmar aplicación real en modo claro y oscuro
    - [x] Eliminar definiciones anteriores de extend.colors
    - [x] Documentar el uso obligatorio de extend.textColor para clases text-*

  - [x] 🧩 Refactor completo de toastColors.ts con clases personalizadas
    - [x] Definir tokens personalizados en tailwind.config.js
    - [x] Sustituir clases base por personalizadas en toastColors.ts
    - [x] Validar visualmente en ambos modos
    - [x] Confirmar funcionamiento de todos los tipos de toast

  🟠 Subbloque 3: Revisión y cierre de la paleta clara
  - [x] 🎨 Revisar y cerrar la paleta de colores clara
    - [x] Unificar criterios de colores para botones (hover, tono pastel)
      - [x] Ajustar colores de botones verde, morado y rojo para suavizarlos
      - [x] Validar visualmente la armonía con los botones azules
    - [x] Revisar duplicados y claves sospechosas
      - [x] Detectar claves redundantes o sospechosas en `colors`, `textColor`, `backgroundColor`, `borderColor`
      - [x] Comprobar si se usan realmente en la app
      - [x] Decidir si eliminar o mantener
    - [x] Revisión estructural del `tailwind.config.js`
      - [x] Reordenar bloques por tipo y propósito (`surface-*`, `status-*`, `toast-*`, etc.)
      - [x] Unificar estilo de comentarios y limpieza estética
    - [x] Eliminar claves no utilizadas
    - [x] Probar armonía general de la paleta (suavidad, contraste, redundancia)
    - [x] Validar la paleta desde la propia app (no Tailwind Play)
    - [x] Documentar la paleta clara como base oficial antes de crear la versión oscura

  🔵 Subbloque 4: Definición de la paleta oscura
  - [x] Añadir colores oscuros personalizados en `tailwind.config.js`
  - [x] Mantener estética suave y legible (no negros puros)
  - [x] Asegurar contraste suficiente con texto e iconos

  🧪 Subbloque 5: Validación visual del modo oscuro

  - [x] Aplicar clases dark:* en todos los puntos relevantes:
    - [x] SideMenu.vue – fondos, botones, texto e icono de acordeón validados
    - [x] App.vue – header, main, y comportamiento global
    - [x] TaskList.vue – fondo visible real, estructura de lista
    - [x] TaskItem.vue – estructura general, inputs, textos y transiciones
    - [x] NewTaskForm.vue – inputs y comportamiento en cabecera
    - [x] TaskFilters.vue – botones y switches de filtros activos
    - [x] ShiftSelector.vue – controles de turno, estilo y contraste
    - [x] Toast.vue – estilos visuales de notificaciones flotantes
    - [x] menuButtonStyle.ts – colores por tipo de acción
    - [x] shiftColors.ts – colores por turno
    - [x] toastColors.ts – colores por tipo de notificación

  - [x] Revisar y refinar detalles visuales:
    - [x] Fondo general de la app no cambia en modo oscuro
    - [x] Borde izquierdo de estado en tareas (TaskItem.vue)
    - [x] Botones en tareas individuales:
        - [x] Botón "Finalizar" / "Reabrir" no cambia de tema
        - [x] Botón de notificación no adaptado
        - [x] Botón de eliminación no adaptado
        - [x] Texto de hora de fin con mal contraste
    - [x] Botón "Iniciar" del formulario (NewTaskForm.vue)
    - [x] Indicador de turno actual en selector (punto verde -> svg reloj)
    - [x] Borde blanco inferior todas las plataformas
    - [x] Añadir bajo filtros un espacio en blanco, para librar con scroll la barra de ios
    - [x] Fondo aplicación (barra superior PWA iOS – status bar) dinámico dark/light – revisado y descartado por limitación de plataforma
    - [x] Logo (header y menú lateral):
        - [x] Reemplazado `<img>` por SVG inline
        - [x] Color dinámico aplicado con `currentColor` y clases `text-*`
        - [x] SVG limpiado y optimizado para mantener huecos y detalles
  - [x] Transición de modo oscuro:
        - [x] Implementar transición global de colores con CSS (`animations.css`)
        - [x] Añadir regla específica para `button`, `input` y `textarea` con `!important` para asegurar aplicación
        - [x] Ajustar duración a 300ms como compromiso entre fluidez de tema y respuesta de interacción
        - [x] Validar que la animación es coherente en PWA, Android y escritorio
  - [x] Colores modo oscuro muy vibrantes?
      - [x] Ajustar conjunto de botones del menú lateral (modo oscuro):
        - [x] Reducir saturación del verde de "Nuevo Turno" sin perder su semántica positiva
        - [x] Unificar tonos de azules en "Compartir", "Importar", "Exportar" con menor luminosidad
        - [x] Desaturar morado de "Opciones" para integrarlo con el resto
        - [x] Validar visualmente todos los botones juntos en contexto real (contraste, jerarquía, armonía)
  - [x] Revisar y unificar paleta de toast en modo oscuro:
        - [x] Aumentado contraste en el toast de advertencia (amarillo), ajustando fondo y asegurando legibilidad sin perder función
        - [x] Aclarado ligeramente el fondo del toast de error para evitar tono marrón poco agradable
        - [x] Unificada jerarquía visual entre texto, borde, acción e icono en todos los toast
        - [x] Eliminadas clases `text-*` específicas de los iconos para heredar automáticamente el color del texto principal del toast, logrando coherencia visual total
  - [x] Validar legibilidad de iconos sobre botones en modo oscuro:
        - [x] Comprobar si hay pérdida de visibilidad en iconos de "Reabrir", "Finalizar", "Eliminar", etc.
        - [x] Aplicar ajustes mínimos al color o luminosidad solo donde haya confusión real
        - [x] Validar todos los botones en conjunto, asegurando consistencia e impacto visual
        - [x] Unificar grosor y color de bordes del formulario con los de tareas y filtros en modo oscuro

  - [x] Validar paleta modo oscuro en plataformas
      - [x] Validar en PWA Android (modo oscuro del sistema activado)
      - [x] Validar en APK Android nativo (nueva versión desde bundle)
      - [x] Validar en iOS (Safari y PWA)
      - [x] Validar en navegador de escritorio (modo oscuro forzado)
      - [x] Confirmar legibilidad, contraste y coherencia con el modo claro en todos los casos
      - [ ] Corregir bugs visuales detectados en validación multiplataforma
          - [x] Icono de notificar aparece negro en modo claro (debe ser verde)
          - [x] Borde izquierdo de estado se estrecha en tareas con texto largo
          - [x] Botones de primera línea se centran verticalmente con texto largo (deben anclarse abajo)
      - [x] Mejorar alineación vertical de fila 2 en tareas:
          - [x] Alinear botón principal con botones secundarios (notificar y eliminar)
                → Se unificó la estructura de ambas filas en un único contenedor `grid` con `grid-cols-[1fr_auto_auto]` para garantizar la alineación vertical entre columnas.
          - [x] Alinear el bloque de duración ("0.5h") con el bloque de horas (inicio–fin)
                → Ambas celdas se colocaron en `col-start-2` con `justify-self-end` para forzar el alineamiento en columna, sin dependencia de altura.
          - [x] Mantener consistencia visual en tareas con y sin duración
                → Se eliminó `grid-rows-2` para permitir altura automática de filas y evitar espacio vacío innecesario. Funciona correctamente con tareas de una o varias líneas.
          - [x] Validar en tareas con pocas y muchas líneas
                → Probado visualmente en tareas con diferentes longitudes de descripción y presencia o ausencia de técnico y duración.
      - [x] Transición de oscuro → claro muy lenta en textos e iconos en iOS PWA (pantalla queda "en blanco" durante varios segundos)
          - [x] Confirmado que el bug solo ocurre al pasar de dark → light, y solo en PWA iOS (Safari y Chrome standalone)
          - [x] Eliminadas transiciones locales (`transition-all`) en algunos textos sin mejora visible
          - [x] Descubierto que la causa era la regla global `* { transition: color, background-color, ... }` en `animations.css`
          - [x] Eliminada la regla global `*` para transición de colores
          - [x] Validado el resultado: el cambio de tema es ahora inmediato, sin flashes ni retardos, y visualmente fluido
          - [x] Se descarta volver a introducir transición global para el cambio de tema; UX más natural sin retardo forzado


  ⚙️ Subbloque 6: Integración opcional con el sistema operativo
  - [x] Añadir preferencia persistente para modo de tema: 'light' | 'dark' | 'system'
  - [x] Detectar modo del sistema en primera carga si no hay preferencia
  - [x] Observar cambios en 'prefers-color-scheme' solo si está en modo 'system'
  - [x] Aplicar clase 'dark' en <html> según resultado efectivo (usuario o sistema)
  - [x] Implementar UI clara con selector de 3 opciones (Claro / Oscuro / Sistema)
      - [x] Visualizar selección activa
      - [x] Permitir cambiar entre modos fácilmente
      - [x] Integrar en SideMenu de forma coherente con diseño actual

  📄 Subbloque 7: Documentación del modo oscuro
  - [x] Decidir qué aspectos deben documentarse técnicamente y cuáles pueden omitirse
  - [x] Documentar la inicialización temprana del modo oscuro en `main.ts` para evitar render mixto
  - [x] Registrar el diseño visual y decisiones UI aplicadas al bloque de apariencia (SideMenu, selector de tema…)
  - [x] Explicar el patrón técnico usado para animación colapsable sin salto (`scrollHeight`, `max-height`, etc.)
  - [x] Justificar el uso de `darkMode: 'class'` en lugar de `'media'` y su integración con preferencia `system`
  - [x] Confirmar que no quedan decisiones sin documentar y hacer commit de cierre del bloque


- [ ] 🕛 Corrección automática de fecha en tareas cerca de medianoche
  - [ ] Detectar si hora introducida corresponde al día anterior
  - [ ] Ajustar fecha si es coherente
  - [ ] Mostrar toast con opciones "ayer" y "hoy" en vez de deshacer

- [ ] ✉️ Formulario de feedback por email
  - [ ] Botón "Enviar feedback" en menú lateral
  - [ ] Formulario con tipo de mensaje, descripción y email opcional
    - [ ] Permitir rellenar el formulario sin conexión
    - [ ] Guardar los datos localmente si no hay conexión al enviar
    - [ ] Mostrar toast o mensaje: "Guardado para enviar cuando haya conexión"
    - [ ] Intentar reenvío automático al recuperar conexión (si es viable)
    - [ ] Ofrecer reintento manual si falla
    - [ ] Eliminar de la cola solo si se confirma el envío exitoso
    - [ ] Confirmar que no bloquea el uso normal de la app
  - [ ] Guardar en Firestore (colección `feedback`)
  - [ ] Trigger en Firebase Functions con envío por email (`nodemailer`, Resend, etc.)
  - [ ] Confirmación visual tras enviar

- [ ] 🛠 Mejoras UX/UI
  - [x] Vuelve a aparece bug: boton deshacer no hace animacion al pulsar (móvil devtools). En escritorio funciona bien.
    > Acción sugerida (futura): revisar que todos los botones de acción en toasts tengan ese @touchstart.
  - [x] Despues de "Borrar todo" + deshacer, al irse el toast hay recarga de la app. Revisar si es necesaria y quitar si no. No ocurre si no deshaces. [20/07/25]
  - [x] Revisar regresión: scroll innecesario en listas cortas (Android y PWA)
  > El bug ha reaparecido tras los cambios de layout para evitar el bug visual en iOS. Revisar `min-h`, `overflow`, estructura del main, etc.
  - [x] Corregir zoom con doble tap en chrome/safari de ios 
  - [x] Actualizar prompt de "Borrar todo" a "¿Estás seguro de que quieres borrar TODAS las tareas de la aplicación? No podrán ser recuperadas."
  - [x] Quitar toast de no compartido.
  - [x] Ajustar texto "Compartir" a este formato:
      📝 Comprobación de señales en PLC 22:46 a 23:02 (0.5 h)
      ✅ Notificado
        👷 J. González
  - [x] Botón "Volver al turno actual" pasar a encima de bloque filtros.
  - [x] 🧱 Evolución del sistema de toasts: control de cierre y múltiples acciones
    - [x] Diseñar la solución para permitir cierre tras tap fuera, soporte de múltiples botones y toasts persistentes
    - [x] Modificar `useToast.ts` para incluir:
        - [x] Propiedad `delayClose` para activar cierre manual por tap fuera
        - [x] Propiedad `persistent` para toasts que no deben cerrarse automáticamente
        - [x] Propiedad `actions[]` para múltiples botones de acción
    - [x] Modificar `Toast.vue` para:
        - [x] Detectar y renderizar correctamente un único botón desde `actions[]`
        - [x] Renderizar múltiples botones si `actions.length > 1`
        - [x] Eliminar soporte anterior de `action` (singular)
        - [x] Mantener compatibilidad visual, animación y botón de cierre `✕`
    - [x] Actualizar llamadas a `add(...)` en toasts con botón "Deshacer"
        > Añadir `delayClose: true` y ajustar duración si es necesario
    - [x] Documentar en `dev-notes.md`:
        - [x] Nuevas propiedades del tipo `Toast` (`delayClose`, `persistent`, `actions[]`)
        - [x] Justificación del comportamiento UX aplicado a toasts con botón "Deshacer"
        - [x] Preparación para futura implementación del toast con botones "Ayer / Hoy"
        - [x] Preparación para futura implementación del toast persistente tipo banner
    - [x] Verificar el comportamiento en todos los modos y plataformas
        > Asegurar que toasts simples, con acción única y múltiples siguen funcionando correctamente
    - [x] Hacer commit final del bloque
  - [x] Añadir mensaje placeholder cuando no hay tareas visibles
    - [x] Mostrar mensaje según contexto: filtros activos / turno anterior vacío / turno actual vacío
    - [x] Detectar turno anterior comparando titleId ≠ currentShiftId
    - [x] Mantener visible el título del turno aunque no tenga tareas
    - [x] Aplicar animación fade+scale al cambiar de mensaje
    - [x] Ajustar estilos para evitar salto visual tras animación
  - [x] Evaluar necesidad del botón "X" para cerrar el menú lateral
        - [x] Confirmado que su presencia mejora la accesibilidad y claridad para todo tipo de usuarios
        - [x] Se mantiene el cierre por tap fuera como opción adicional
  - [x] Quitar active de botones al soltar (movil) [opciones y otros se quedan active]
      - [x] Diagnóstico del bug en dispositivos táctiles y análisis de causa
      - [x] Creación de `buttons.css` con clases estáticas `@apply` y condicionales `@media (hover: hover)`
      - [x] Adaptación del botón “Iniciar” como prueba inicial
      - [x] Sustitución de todos los botones del menú lateral (`SideMenu`)
      - [x] Refactorización de botones de tipo icono (`notificar`, `eliminar`)
      - [x] Adaptación de botones de acción y cierre de toast (feedback completo)
      - [x] Adaptación de botones “Finalizar / Reabrir” con efecto de transición sin flash
      - [x] Eliminación de `menuButtonStyles.ts` y funciones asociadas
      - [x] Limpieza final y validación en PWA, móvil y escritorio
  - [ ] Campo de notas del turno bajo las tareas.
  - [ ] Probar iconos rellenos para turnos m/t/n
  - [ ] Revisar cambio en tamaños al cambiar en sistema ios/android.
  - [ ] Opcion mostrar duracion tiempo decimal - hh:mm. Y decidir tamaño fraccion. Decidir opcion por defecto.
  - [ ] Icono personalizado estilo heroicons svg inline de sol naciente para turno mañana. Y sol normal para tarde. 
  - [ ] Añadir splash para pa PWA ios no perdiendo la de android (si es posible y fácil) 
  - [ ] 📐 Revisar safe areas para notches y barras flotantes
    - [ ] Asegurar que ningún contenido queda oculto
    - [ ] Ajustar paddings con `env(safe-area-inset-*)`
    - [ ] Verificar en dispositivos reales y emuladores

- [ ] 📣 Aviso en PWA para migración a app nativa
  - [ ] Detectar si es entorno web o PWA
  - [ ] Mostrar toast persistente con enlace a Play Store
  - [ ] Ocultar aviso si ya está instalada la versión nativa (opcional)
  - [ ] Añadir fallback para iOS con link personalizado

- [ ] 📘 Añadir ayuda o tutorial para usuarios nuevos
  - [ ] Definir qué funciones deben explicarse (crear turno, añadir tarea, filtros, exportar, etc.)
  - [ ] Elegir el formato: modal scrollable, vista “Ayuda”, o guía paso a paso (más complejo)
  - [ ] Diseñar estructura clara, con texto corto y ejemplos visuales
  - [ ] Añadir acceso desde el menú lateral u otro lugar visible
  - [ ] Asegurar que se puede consultar en cualquier momento
  - [ ] Validar legibilidad en móvil y dispositivos pequeños

- [ ] 🌍 Añadir soporte multidioma (español e inglés)
  - [ ] Elegir estrategia: vue-i18n, objeto propio, o solución mínima
  - [ ] Extraer todos los textos visibles a sistema de traducción
  - [ ] Traducir todos los textos actuales al inglés
  - [ ] Añadir un selector de idioma manual (o usar idioma del sistema)
  - [ ] Validar comportamiento en Android e iOS
  - [ ] Ajustar diseño si hay textos más largos o distintos por idioma

- [ ] ✏️ Revisar wording para ampliar público potencial
  - [ ] Evaluar si etiquetas como “Aviso” y “Técnicos” deben ser más genéricas
  - [ ] Proponer variantes como “Descripción”, “Responsables”, etc.
  - [ ] Verificar que el nuevo wording sigue siendo claro para los usuarios actuales
  - [ ] Aplicar los cambios en todos los lugares visibles (inputs, botones, filtros, exportación)
  - [ ] Validar comprensión en contexto (sin necesidad de ayuda externa)

- [ ] 📄 Actualizar `README.md` con información final  
  - [ ] Eliminar referencias a `vue-sonner` (ya reemplazado)  
  - [ ] Añadir nota sobre el sistema de toasts propio  
  - [ ] Confirmar que la lista de tecnologías y estructura de carpetas está actualizada  
  - [ ] Incluir enlace a la versión de Play Store si ya está publicada  
  - [ ] Añadir o reemplazar capturas si han cambiado tras el rediseño

- [ ] 📣 Preparación para fase de testing real con usuarios externos 
  - [ ] Revisar si la app (actual `.aab`) está ya en estado adecuado para compartir públicamente  
        ↪ [Checklist en dev-notes.md](dev-notes.md#-revisión-del-aab-antes-de-lanzar-testing-externo)
          - [ ] Confirmar si el bug del scroll innecesario en listas cortas ha sido resuelto sin introducir nuevas regresiones
          - [ ] Asegurar que el selector de turno es visible en listas largas y no queda fuera de pantalla
          - [ ] Finalizar revisión y posible solución del bug visual en PWA iOS (doble tap en área vacía)
          - [ ] Implementar soporte para modo oscuro o decidir posponerlo con documentación adecuada
    - [ ] Si no lo está, priorizar tareas mínimas necesarias para dejarla lista cuanto antes  
    - [ ] Confirmar el canal de publicación para testing:
          - ¿Seguir en prueba interna con invitaciones?
          - ¿O mover a canal de prueba cerrada?
    - [ ] Asegurar que cumple requisitos de Google Play:
          - Al menos 12 testers activos
          - Durante un periodo de 14 días
    - [ ] Revisar ficha de app en Google Play Console:
          - Nombre, descripción, capturas, icono, política de privacidad
    - [ ] Preparar mensaje atractivo para captar testers externos voluntarios
    - [ ] Publicar el mensaje en canales adecuados:
          - Reddit (ej. /r/androidapps, /r/SideProject)
          - Foros sobre productividad, técnicos, mantenimiento, apps nuevas
          - Grupos de Discord o Telegram si procede
    - [ ] Medir respuesta de testers externos y ajustar si es necesario
    - [ ] Aprovechar el periodo de test activo para seguir refinando el resto de tareas de la Etapa 8

---

## 🚀 Etapa 9: Publicación final y visibilidad pública

- [ ] 📤 Publicar versión PWA como estable  
  - [ ] Confirmar que la rama `main` está actualizada con la última versión  
  - [ ] Subir cambios a Vercel y verificar despliegue correcto  
  - [ ] Actualizar `versionName` en UI y archivos visibles para usuarios  
  - [ ] Recordatorio: actualizar también el `README.md` si se han hecho cambios relevantes (tecnologías, capturas, enlaces, instrucciones, etc.)
  - [ ] Confirmar correcto funcionamiento como app instalada desde navegador (probar en iPhone 16 Pro, iPhone X y iPhone 5S)
  - [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "Descripción del release"
      git push origin v1.X.Y  

- [ ] 🧭 Revisar, repensar y tomar decisiones sobre los puntos de este bloque  
  - [ ] Confirmar qué tareas de visibilidad y comunicación se llevarán a cabo  
  - [ ] Posponer o descartar aquellas que no se consideren útiles o prioritarias
  - [ ] Recordatorio: actualizar también el `README.md` si se han hecho cambios relevantes (tecnologías, capturas, enlaces, instrucciones, etc.)

- [ ] 🌍 Subir app al canal público como "no listada"  
  > Este paso sube la app a producción en Google Play para revisión, pero sin visibilidad pública.  
  - [ ] Revisar ficha de Play Store (nombre, descripción, capturas, política de datos…)  
  - [ ] Confirmar que todo está actualizado y listo para revisión  
  - [ ] Enviar para revisión de Google y esperar aprobación  
  - [ ] Recordatorio: actualizar también el `README.md` si se han hecho cambios relevantes (tecnologías, capturas, enlaces, instrucciones, etc.)
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

#### 📄 Prompt recomendado para nuevas conversaciones con Gemini: -- Fuera de uso actualmente

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
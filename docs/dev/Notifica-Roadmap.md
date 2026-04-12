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


- [x] 🛠 Mejoras UX/UI
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
  - [x] Campo de notas del turno bajo las tareas
    - [x] 📌 Planificación y análisis inicial
        - [x] Validar diseño deseado y confirmar encaje visual y funcional con TaskList.vue
        - [x] Confirmar modelo de datos: almacenamiento separado en `notesByShiftId`
        - [x] Confirmar integración con exportación/importación y retrocompatibilidad
        - [x] Registrar decisión de diseño: lista de inputs encadenados sin botón “+”
              - Autoguardado al hacer blur
              - Siempre un input vacío al final
              - Borrar un campo elimina la nota
              - Si se vacían todas, se elimina completamente el bloque
              - Diseño limpio, sin botones, con foco móvil-friendly
    - [x] 🔍 Revisión del sistema actual
        - [x] Revisar cómo se obtiene y organiza la lista de tareas por turno en `TaskList.vue`
        - [x] Confirmar que `shiftId` actual está disponible en el contexto de la lista
        - [x] Confirmar dónde insertar el nuevo bloque de notas: debajo de tareas y del mensaje de “turno vacío”
    - [x] 🧱 Implementación funcional
        - [x] Crear nuevo composable `useNotes.ts` para gestionar `notesByShiftId` en localStorage
            - [x] Funciones: `getNotesForShift()`, `setNotesForShift()`, `deleteNotesForShift()`
            - [x] Guardar un array de strings `string[]` por `shiftId`
    - [x] Añadir al final de `TaskList.vue` un bloque colapsable “🗒️ Notas del turno”
        - [x] Mostrar expandido si existe nota; colapsado si no  ← manejado por usuario
        - [x] Estilo tipo tarjeta, coherente con diseño de tareas
        - [x] Comportamiento de acordeón reutilizable del bloque de apariencia
    - [x] Crear componente de lista de inputs encadenados
        - [x] Mostrar cada nota como un campo editable independiente
        - [x] Siempre renderizar un campo vacío al final
        - [x] Al hacer blur en campo vacío con texto → guardar y añadir nuevo campo
        - [x] Al hacer blur en campo existente con texto → actualizar
        - [x] Al hacer blur en campo existente vacío → eliminar
        - [x] Aplicar feedback visual leve (placeholder, opacidad, bordes)
    - [x] 🔄 Integración con exportación / importación
        - [x] Añadir `notesByShiftId` como propiedad opcional en el JSON exportado
        - [x] Adaptar sistema de importación para detectar y restaurar notas si existen
        - [x] Mantener compatibilidad con backups antiguos (sin la clave)
        - [x] 🐞 Corrección de bugs en import/export de notas
            - [x] No se exportaban notas correctamente si no se usaba shiftId válido
            - [x] No se limpiaban notas al hacer "Borrar todo"
            - [x] Error al importar JSON nuevo con notas (`.map is not a function`)
            - [x] El turno actual no muestra notas tras importar JSON con notas (hasta recarga o cambio de turno)
            - [x] El listado de turnos ignora turnos con notas pero sin tareas (debe incluirlos)
            - [x] El turno actual tras importar JSON no siempre es el más reciente (no considera turnos con solo notas)
            - [x] Tras "Borrar todo", las notas del turno actual se mantienen en pantalla hasta recarga
            - [x] El estado colapsado/expandido de las notas se mantiene entre turnos (¿debe reiniciarse si hay notas o no?)
            - [x] El botón "Deshacer" de "Borrar todo" restaura tareas pero no notas
    - [x] 📤 Integración con compartir (texto plano)
        - [x] Si existe nota para el turno exportado, añadir bloque al final:
              "🗒️ Notas:
                - Avisar a mantenimiento sobre bomba 2
                - Revisar PLC de empaquetadora"
        - [x] Asegurar formato legible, indentado, sin romper la estructura actual
    - [x] 🧱 Mejoras visuales y estructurales del bloque de notas del turno
        - [x] Sustituir la animación actual de scale en el botón de título por una transición más adecuada (e.g. cambio de fondo o icono giratorio suave)
        - [x] Ajustar tamaño y peso visual del icono del título para que coincida con el placeholder ("Notas del turno" cuando no hay tareas)
        - [x] Corregir el margen izquierdo excesivo del botón de título (alinearlo con tareas o inputs)
        - [x] Añadir un separador visual en la parte superior del bloque de notas (finalmente cambio de color de fondo)
        - [x] Añadir un indicador visual junto al título cuando haya notas guardadas (incluso si está colapsado)
        - [x] Revisar contraste y legibilidad del bloque en modo claro y oscuro
    - [x] 🧱 Rediseño del bloque de inputs de notas (estética y compacidad)
        - [x] Unificar visualmente los campos de nota como una lista editable coherente, no inputs separados (estilo más compacto)
        - [x] Reducir intensidad de bordes individuales de cada nota (usar bordes más sutiles o solo líneas inferiores)
        - [x] Asegurar que el fondo de los inputs en modo oscuro sea coherente (no blanco)
        - [x] Ajustar paddings, márgenes internos y separación vertical para lograr una presentación más compacta (como en las tareas)
        - [x] Validar que al añadir muchas notas (4–6) el bloque sigue siendo visualmente compacto y funcional
        - [x] Sustituir inputs por textarea de una línea para permitir expansión de notas largas sin truncado
    - [x] 🧱 Revisión general de alineación y espaciado
        - [x] Verificar alineación vertical del bloque completo con respecto a las tareas
        - [x] Ajustar márgenes horizontales para que coincida con los elementos contiguos (tareas, filtros)
        - [x] Validar espaciado vertical entre notas, tareas, placeholder y el bloque colapsado
        - [x] Corregir salto visual al colapsar/desplegar el bloque de notas (animación fluida con escalón mínimo)
        - [x] Igualar ancho del bloque de inputs al de las tarjetas de tareas (para coherencia visual)
        - [x] Añadir indentación a las notas y una línea vertical como las hojas de cuaderno (estética final)
    - [x] ✅ Verificaciones finales
        - [x] Validar visualmente en escritorio, PWA Android, APK Android, PWA iOS
        - [x] Validar scroll y comportamiento en tareas largas o turnos vacíos
        - [x] Validar que no afecta a rendimiento ni a otras partes del layout
        - [x] Validar backups antiguos y nuevos, con y sin notas
        - [x] Validar exportación/importación con notas presentes y ausentes
    - [x] 📚 Documentación técnica
        - [x] Añadir sección en `dev-notes.md` describiendo el sistema de notas por turno
              - Composable `useNotes.ts`: estructura y persistencia
              - Integración en `TaskList.vue` con bloque colapsable editable
              - Comportamiento UX: autoguardado, input encadenado, borrado
              - Exportación, importación y compatibilidad con backups antiguos
    - [x] 🧼 Limpieza y commit
        - [x] Confirmar que todo funciona y está documentado si procede
        - [x] Hacer commit único (`feat: añadir campo de notas del turno como lista editable asociada a shiftId`)
  - [x] Propuesta de iconos rellenos para turnos m/t/n revisada y descartada por romper la coherencia del diseño (uso exclusivo de iconos outline)
  - [x] Revisar cambio en tamaños al cambiar en sistema ios/android/desktop.
      - [x] Android: validado hasta tamaño máximo en emulador. Layout se adapta sin errores ni solapes, aunque se pierde elegancia visual a partir de tamaño 4/7.
      - [x] iOS: la opción de accesibilidad del sistema no se propaga a PWA, pero sí lo hace el ajuste de texto de Safari, aplicándose también en la PWA tras recarga.
      - [x] Escritorio: zoom hasta 175% mantiene estructura; scroll en el sidemenu aparece correctamente sin comprometer la funcionalidad.
  - [x] Al importar un archivo se conservaban notas antiguas: solucionado añadiendo deleteAllNotes() antes de setAllNotes() para limpiar el estado anterior correctamente
  - [x] Icono personalizado estilo heroicons svg inline de sol naciente para turno mañana. Y sol normal para tarde.
    - [x] Crear e integrar nuevo icono svg tipo heroicons representando el amanecer
    - [x] Normalizar nombres de iconos de turno: usar `morning`, `afternoon`, `night` en `shiftIcons` y `getShiftIcon()`
    - [x] Revisar consistencia de colores entre los iconos de turno mañana, tarde y noche
    - [x] Revisar bug: al importar un archivo sin notas, no se eliminaban las notas antiguas, lo que mantenía turnos obsoletos
  - [x] Campos descripcion, técnico y horas en tareas en darkmode tienen fondo blanco y texto blanco. Igual a NewTaskForm.vue
  - [x] Rediseño y comportamiento del botón "Volver al turno actual"
    - [x] Crear clase `btn-shift` en `buttons.css` con estilo coherente con el resto de botones
    - [x] Aplicar clase `btn-shift` al botón, unificando altura, padding y transición
    - [x] Refactor: desacoplar lógica de UI creando `handleAction('returnToCurrent')` en App.vue
    - [x] Delegar la acción real en `handleMenuAction()` como en `SideMenu`
    - [x] Añadir retardo intencionado (`setTimeout(350ms)`) para permitir feedback visual completo
  - [x] Añadir splash para PWA iOS sin perder la de Android
    - [x] Generar 43 splash screens iOS desde Progressier
    - [x] Añadir rutas absolutas en los 'link rel="apple-touch-startup-image"'
    - [x] Añadir las meta-etiquetas 'apple-mobile-web-app-capable' y 'mobile-web-app-capable'
    - [x] Cambiar background_color del manifest para adaptar fondo del icono en Android
    - [x] Validar comportamiento en iOS (iPhone 16 Pro y X), Huawei Android 10 y emuladores
  - [x] Solucionar error de detección del manifiesto PWA en los previews protegidos de Vercel (ver 'dev-notes.md')
  - [x] Formato horario 12h/24h en Android: se respeta configuración del sistema (sin forzar)
  - [x] Opcion mostrar duracion tiempo decimal - hh:mm. Y decidir tamaño fraccion. Decidir opcion por defecto. Revisado y bloque nuevo.
  - [x] 📐 Revisar safe areas para notches y barras flotantes
      - [x] Validación en dispositivos reales (iOS y Android)
          - [x] iPhone 16 Pro / X: perfecto
          - [x] Huawei Android 10 / Pixel 4 y 7: correcto
          - [x] Medium Phone API 36: header pisado, versión muy pegada abajo
      - [x] Ajuste en header con safe-area superior
          - [x] Añadir `padding-top: env(safe-area-inset-top)` solo al `<header>`
          - [x] Confirmar que no afecta a iOS ni dispositivos que ya estaban correctos
          - [x] Aplicar `min-height: calc(100svh - var(--safe-area-inset-top) - 68px)` al `<main>`
      - [x] Ajuste en footer del SideMenu
          - [x] Subir visualmente el bloque de versión (`Notifica v...`) con `pb-3` fijo
          - [x] Evitar `safe-area-inset-bottom` por ser excesivo en iOS
      - [x] Activar soporte real de safe areas en Android
          - [x] Instalar `@capacitor-community/safe-area`
          - [x] Configurar `capacitor.config.ts`
          - [x] Aplicar `setStatusBar` y `setNavigationBar` en `main.ts`
          - [x] Confirmar comportamiento correcto de barras superior/inferior
          - [x] Evitar scroll fantasma ajustando altura del `<main>`
      - [x] Ajuste del SideMenu tras mover header con safe-area
          - [x] Añadir style dinámico `padding-top: var(--safe-area-inset-top)` a `DialogPanel`
          - [x] Usar `ref` y `onMounted` para aplicar el padding solo en Android nativo
          - [x] Confirmar alineación correcta en escritorio/devtools
          - [x] Confirmar comportamiento aceptable en Android (desalineación leve aceptada)
      - [x] ⛔ Inconsistencias aún presentes (pendientes de revisión futura)
          - [x] Al abrir la app por primera vez en Android, no se aplica la safe-area superior  
                → Se mantiene `initialize()` para inyectar variables CSS desde el inicio.  
                → No es posible aplicar `--safe-area-inset-top` en primera carga por limitación del WebView Android con Capacitor.  
                → Tras múltiples intentos controlados (input invisible, visualViewport, reflow forzado…), se documenta como bug estructural no solucionable desde JS.  
                → El valor se aplica tras interacción del usuario y el layout se corrige automáticamente.
          - [x] El `DialogPanel` sigue desalineado verticalmente en Android tras la primera apertura
            > No es posible alinear dinámicamente el SideMenu en Android WebView usando safe-area-inset-top, ni por CSS ni JS, debido a limitaciones del entorno. Se descarta plugin capacitor-community/safe-area.
          - [x] Solucionar el aspecto de la app en Android nativo
              - [x] Revertir pruebas actuales (useSafeArea.ts, márgenes, etc.)
              - [x] Eliminar el plugin SafeArea del proyecto
              - [x] Eliminar todas las referencias a var(...) o env(...)
              - [x] Test multiplataforma de punto estable
              - [x] Probar StatusBar.overlaysWebView de forma limpia
                > descartado: mismo comportamiento inconsistente que plugin SafeArea, sin mejora real
              - [x] Probar @capawesome/capacitor-android-edge-to-edge-support para solucion en android nativo
                  - [x] Instalar plugin y probar con configuración mínima
                  - [x] Comprobar recorte correcto en dispositivos edge-to-edge
                  - [x] Detectar recorte incorrecto en API 29 y color blanco/gris en barras
                  - [x] Probar llamadas del plugin StatusBar y descartar incompatibilidades
                  - [x] Probar setBackgroundColor() del plugin edge-to-edge con color rojo para trazabilidad
                  - [x] Comprobar que el color se aplica correctamente desde el plugin
                  - [x] Detectar que fondo por defecto viene del WebView o capa inferior
                  - [x] Aplicar fondo lime en body/html/app para detectar capas internas
                  - [x] Confirmar que el color depende del tema pero no es dinámico
                  - [x] Extraer color de fondo de Tailwind en tiempo real y pasarlo como background al plugin
                  - [x] Detectar fallo por uso en entorno web sin check de plataforma
                  - [x] Aplicar fix con Capacitor.getPlatform() === 'android'
                  - [x] Añadir watch en useDarkMode para actualizar background dinámicamente
                  - [x] Confirmar funcionamiento dinámico en tiempo real al cambiar tema
                  - [x] Ajustar clases bg-surface-1 para integrar visualmente con el header
              - [x] Descartado: Si no funciona: decidir si implementar padding fijo solo en Android nativo
              - [x] Probar `@capgo/capacitor-navigation-bar` para ajustar fondo e iconos de la barra de navegación inferior si fuera necesario
              - [x] Probar `@capacitor/status-bar` para ajustar dinámicamente el color de los iconos de la status bar según el tema de la app
                > Depuración de edge-to-edge y android nativo migrado a etapa 10.
  - [x] Al desplegar opciones, el SideMenu crece en altura y se hace scrolleable. Esta bien (fallback pantallas pequeñas y pantalla horizontal), pero intentar limitar scroll elástico, solo scroll necesario.  
    > Solucionado al pasar opciones a un modal independiente.
  - [x] Texto plano compartido: a veces las horas/duracion aparece bajo la descripcion y otras en la misma linea. Revisar y unificar (siempre siguiente linea, posible icono reloj o sin el)
  - [x] Rewording: ¿Cambiar "Registered" por "Logged"?
  - [x] Mini rewording lingüístico en inglés: simplificación de textos redundantes, mejora de naturalidad y consistencia UX (import, export, clipboard, deleteAll, unimplemented, update)


- [x] 📄 Actualizar `README.md` con información final  
  - [x] Añadir descripción del nuevo sistema de notificaciones flotantes (toasts propio)  
  - [x] Añadir mención al campo de notas del turno, editable por shift  
  - [x] Añadir soporte de modo claro/oscuro con detección automática o preferencia de usuario  
  - [x] Eliminar todas las referencias a `vue-sonner`  
  - [x] Confirmar que la lista de tecnologías y estructura de carpetas está actualizada  
  - [x] Revisión de bloques generales del readme (descripción, carácterísticas, etc)
  - [x] Revalidar los resultados de Lighthouse (o eliminarlos si ya no son representativos) - eliminados 
  - [x] Revalidar y ajustar el texto sobre la versión APK (añadir enlace si ya está publicada)  
  - [x] 🖼️ Actualizar capturas de la app (README, manifest y Play Store)
    - [x] Generar nuevas capturas representativas con el diseño actual
          - [x] 19 capturas nuevas - lista en dev-notes
    - [x] Reemplazar imágenes del README por las nuevas capturas
    - [x] Sustituir archivos del directorio `public/screenshots/` usados por el manifest y `public/screenshots-playstore/`
    - [x] Subir las nuevas capturas a la ficha de la Play Store (cuando se publique la APK)

- [x] 📣 Preparación para fase de testing real con usuarios externos 
  - [x] Revisar si la app (actual `.aab` y entorno) está ya en estado adecuado para compartir en prueba cerrada
        ↪ [Checklist en dev-notes.md](dev-notes.md#-revisión-del-aab-antes-de-lanzar-testing-externo)
          - [x] Confirmar si el bug del scroll innecesario en listas cortas ha sido resuelto sin introducir nuevas regresiones
          - [x] Asegurar que el selector de turno es visible en listas largas y no queda fuera de pantalla
          - [x] Finalizar revisión y posible solución del bug visual en PWA iOS (doble tap en área vacía)
          - [x] Implementar soporte para modo oscuro o decidir posponerlo con documentación adecuada
    - [x] Si no lo está, priorizar tareas mínimas necesarias para dejarla lista cuanto antes  
    - [x] Confirmar el canal de publicación para testing: prueba cerrada
    - [x] Revisar ficha de app en Google Play Console:
          - [x] Nombre, descripción, capturas, icono.
          - [x] Política de privacidad: [Privacy Policy](https://jcpaezd.github.io/notifica/privacy-policy.md)
          - [x] Corregir tamaños de capturas en manifest para PWA
          - [x] Asegurar que el idioma por defecto y fallback en el manifest y Play Console es español
  - [x] Enviar para revisión de Google Play Console.
  - [x] Aprovechar el periodo de test activo para seguir refinando el resto de tareas de la Etapa 8
  - [x] Medir respuesta de testers externos y ajustar si es necesario
  - [x] Solicitar acceso a producción en Google Play Console tras completar test cerrado [01/09/2025-0:50]
  - [x] Asegurar que cumple requisitos de Google Play para lanzamiento público (12 testers activos durante 14 días). Solicitud de acceso a producción aceptada [01/09/2025-17:30].
  - [x] Crear utilidad para generar datos mock (script + listas) para capturas y pruebas
  - [x] Actualizar todas las capturas en `/public/screenshots/` (README, manifest, Play Store) antes de la próxima versión estable de Android
  - [x] Actualizar ficha Play Store con nueva(s) feat (rewording, multidioma, capturas, etc) y lanzar actualizacion.
  - [x] Revisar restricciones de orientación/redimensionamiento para compatibilidad con tablets y plegables (Android 16+).
      * Verificado, no crítico. Migrado a etapa 10.

- [x] ✏️ Revisar wording para ampliar público potencial
  - [x] Inventario de textos de la UI
    - [x] Extraer todos los textos visibles (botones, menús, placeholders, labels, toasts, modales, exportación)
    - [x] Documentarlos en `docs/rewording-ES.md`
  - [x] Propuesta de alternativas
    - [x] Detectar términos potencialmente confusos o demasiado específicos (“Aviso”, “Técnicos”)
    - [x] Proponer variantes más genéricas/claras (“Descripción”, “Responsables”)
        - [x] Revisar uso de “Turno / Nuevo Turno”
          - ✅ Sustituir por “Tramo / Nuevo Tramo”
        - [x] Revisar uso de “Técnico(s) / Añadir técnico”
          - ✅ Sustituir por “Asignado a… / Asignar a…”
        - [x] Revisar uso de “Aviso / Nuevo aviso”
          - ✅ Sustituir por “Descripción” (solo en placeholder del campo)
          - ✅ Mantener “Tarea(s)” en el resto de la app
        - [x] Revisar uso de “Notificada / Sin notificar / Notificación anulada”
          - ✅ Sustituir por “Registrada / Sin registrar / Registro anulado”
          - ✅ Mantener “Notifica” como nombre de la aplicación (marca), no ligado estrictamente a este estado
        - [x] Revisar uso de “Finalizar / Reabrir”
          - ✅ Mantener “Finalizar / Reabrir” sin cambios
        - [x] Revisar mensajes de sistema demasiado técnicos (ej. “El archivo no contiene una lista válida de tareas”)
          - ✅ Definir marco común:
             - Tono: Neutro / Semi-técnico
             - Estilo: 
               - 2ª persona para errores que requieren acción del usuario (“Introduce…”, “Revisa…”)
               - Impersonal para mensajes de estado o confirmación (“Archivo generado.”, “Turno comenzado…”)
          - ✅ Mensajes simples y concisos, sin detalles técnicos innecesarios ni explicaciones largas
        - [x] Revisar prefijo de exportación “notifica-tareas”
          - ✅ Sustituir por “notifica-backup-YYYY-MM-DD.json”
          - ✅ Corto, reconocible y usado en apps modernas incluso en español
        - [x] Revisar placeholders y encabezados largos (“Notas del turno”, “[Sin descripción]”)
          - ✅ Sustituir “Notas del turno” por “Notas”
          - ✅ Sustituir “[Sin descripción]” por “(Sin descripción)”
        - [x] Revisar términos de accesibilidad (“Estado de notificación”)
          - ✅ Unificar con las mismas reglas de tono y terminología del rewording general
          - ✅ Usar etiquetas claras y consistentes con la UI visible (ej. “Estado de registro”, “Eliminar tarea”, “Cerrar notificación”)
  - [x] Mantener consistencia con notas, tareas y filtros
  - [x] Wording final documentado y validado en docs/rewording-ES.md
    - [x] Revisar y actualizar docs/rewording-ES.md bloque por bloque con las decisiones del roadmap
    - [x] Validar claridad con criterios internos (¿se entiende sin manual? ¿es neutral para distintos perfiles?)
    - [x] Cerrar lista definitiva en `docs/rewording-ES.md`
  - [x] Implementación de cambios
    - [x] Sustituir textos en componentes (inputs, botones, menús, filtros)
    - [x] Actualizar textos en exportación e importación
    - [x] Revisar documentación (`README.md`, capturas si procede)
  - [x] Validación en entorno real
    - [x] Revisar PWA en móvil (claro/oscuro, offline)
    - [x] Revisar APK Android
    - [x] Confirmar comprensión en contexto (sin necesidad de explicación)

- [x] 🌍 Añadir soporte multidioma (español e inglés)
  - [x] Elegir estrategia de internacionalización
    - [x] Revisar opciones: `vue-i18n`, objeto propio reactivo, solución mínima
    - [x] Documentar ventajas/inconvenientes de cada método
    - [x] Tomar decisión final (aprender el razonamiento aunque ya esté claro usar `vue-i18n`)
  - [x] Configurar infraestructura i18n
    - [x] Instalar y configurar `vue-i18n` en `main.ts`
    - [x] Crear carpeta `locales/` con `es.ts` y `en.ts` iniciales
    - [x] Definir convención única de claves (basada en `rewording-ES.md`)
      - Jerarquía fija por tipo (`btn`, `menu`, `shift`, `task`, `toast`, `dialog`, `filter`, `aria`, `tooltip`, `placeholder`, `header`, `title`, `share`, `export`).
      - Estilo: inglés, camelCase en último nivel, profundidad máx. 3.
      - Parámetros dinámicos con `{nombre}` en minúsculas (`{count}`, `{description}`, …).
      - Plurales usando sintaxis de `vue-i18n`.
      - Branding “Notifica” no se traduce.
  - [x] Integrar textos en sistema de traducción
    - [x] Volcar `ES final` desde `docs/rewording-ES.md` a `es.ts`
      - [x] Bloque 1
      - [x] Bloque 2
      - [x] Bloque 3
        - [x] Parte 1 (líneas 1–20)
        - [x] Parte 2 (líneas 21–40)
        - [x] Parte 3 (líneas 41–60)
        - [x] Parte 4 (líneas 61–80)
        - [x] Parte 5 (resto)
      - [x] Bloque 4
      - [x] Bloque 5
      - [x] Bloque 6
    - [x] Crear `en.ts` con traducción inicial de todos los textos
    - [x] Sustituir textos hardcodeados en componentes por claves i18n
      - [x] i18n: sustituir textos en SideMenu.vue (líneas 92–101 del checklist)
      - [x] i18n: sustituir textos en App.vue (líneas 1–30 del checklist)
      - [x] i18n: sustituir textos en App.vue (líneas 31–60 del checklist)
      - [x] i18n: sustituir textos en App.vue (líneas 61–86 del checklist)
      - [x] i18n: sustituir textos en NewTaskForm.vue (líneas 87–90 del checklist)
      - [x] i18n: sustituir textos en ShiftSelector.vue (línea 91 del checklist)
      - [x] i18n: sustituir textos en TaskItem.vue (líneas 102–110 del checklist)
      - [x] i18n: sustituir textos en TaskList.vue (líneas 111 y 117 del checklist)
      - [x] i18n: sustituir textos en Toast.vue (línea 118 del checklist)
    - [x] Manejar casos con parámetros dinámicos (`{count}`, `{description}`…) y plurales
    - [x] Crear toggle provisional ES/EN para pruebas en móvil
    - [x] Validar sistema i18n completo (desktop, PWA y APK)
      - [x] Apariencia e Idioma en opciones
      - [x] Placeholders de tareas vacias (3) y fallback de titulo (default) en props de TaskList.vue
      - [x] Dias lun->mon etc. En selector de turnos y 'Viendo turno'
      - [x] Mensaje confirmacion de eliminar tarea
      - [x] Sustituir textos hardcodeados de “Turno Actual”, “Turno del {date}” y “Turno del {label}” en App.vue
      - [x] Sustituir textos hardcodeados en exportación/compartir:
        - "Notificado" → usar clave i18n (Registrado / Registered)
        - Conector "a" entre horas → usar clave i18n
      - [x] Unificar formatos de fechas y horas en exportación/compartir según i18n (no navegador)
      - [x] Localizar formato de duración (coma/punto) en exportación/compartir según i18n
      - [x] Revisar y aplicar el mismo criterio de i18n en TaskItem.vue (horas inicio/fin y duración)
    - [x] Añadir selector de idioma
      - [x] Toma de decisiones sobre formato, ubicación y estilo del selector (modal centrado, botones ES/EN/Sistema, cambio de nombre a Ajustes/Settings)
      - [x] Implementar modal reutilizando la base de Nocta (centrado, escalable)
        - [x] Migrar API de props open/onClose a v-model:open con defineEmits
        - [x] Adaptar colores de fondo y texto al sistema de superficies de Notifica (bg-surface, text-*)
        - [x] Revisar estilo de overlay (color, blur) para integrarlo con Notifica
        - [x] Homogeneizar sombras y bordes con el resto de la app
        - [x] Revisar animaciones: mantener o integrar con animations.css
        - [x] Mejorar accesibilidad (atributos role, aria-modal)
      - [x] Refactor: trasladar Apariencia e Idioma del SideMenu al nuevo modal de Ajustes
        - [x] Reemplazar acción de "Opciones" para que abra el modal de Ajustes (y cierre el SideMenu si procede)
        - [x] Corregido bug de hover/active residual migrando Modal a Headless UI (UX móvil)
        - [x] Cambiar wording de Opciones a Ajustes (Options>Settings)
        - [x] Incluir título accesible en el slot del modal mediante <DialogTitle as="h2" id="modal-title">
        - [x] Trasladar bloque de Apariencia desde SideMenu al modal
        - [x] Trasladar bloque de Idioma desde SideMenu al modal
        - [x] Eliminar bloques antiguos de Apariencia e Idioma en SideMenu y limpiar lógica sobrante
        - [x] Revisar estilos internos de Apariencia e Idioma para adaptarlos al nuevo contenedor
            - [x] Ajustar franja superior del título con fondo diferenciado y borde inferior
            - [x] Añadir separador `<hr>` entre Apariencia e Idioma
            - [x] Reordenar Apariencia a Sistema → Claro → Oscuro
            - [x] Pasar Apariencia a `grid grid-cols-3 gap-2` con ajustes responsive px/gap
            - [x] Pasar Idioma a `grid grid-cols-3 gap-2` con botón AUTO deshabilitado como placeholder
            - [x] Ajustar jerarquía de títulos: Ajustes (`text-2xl`, `w-7 h-7`) y secciones (`text-base font-semibold`, `w-5 h-5`)
            - [x] Validar en PWA/iPhone que `text-2xl` no es excesivo en pantallas pequeñas
            - [x] Añadir botón cerrar ("x" en cabecera)
            - [x] Confirmar consistencia visual con TaskList y Notas
            - [x] Confirmar visualización correcta en dark/light mode
            - [x] Confirmar que todas las claves i18n funcionan (excepto AUTO, hardcodeado temporalmente)
        - [x] Validar apertura/cierre correcto del modal desde el SideMenu
        - [x] Validar accesibilidad completa (aria-labelledby apunta al título)
      - [x] Implementar 'sistema' en el selector de idioma con 3 botones (ES, EN, Sistema)
      - [x] Validar persistencia de idioma elegido en localStorage
      - [x] Validar en PWA y APK: funcionamiento correcto del modal, selector y textos en ambos idiomas
  - [x] Validación y pruebas
    - [x] Revisar PWA en móvil en ambos idiomas (claro/oscuro, offline)
    - [x] Revisar APK en Android (y iOS si se compila más adelante)
    - [x] Confirmar que no se rompen diseños con textos largos o diferentes por idioma
  - [x] Documentación y cierre
    - [x] Explicar en `dev-notes.md` cómo añadir/editar traducciones existentes
    - [x] Explicar en `dev-notes.md` cómo introducir textos nuevos en la app usando i18n
    - [x] Actualizar `README.md` con nota sobre multidioma
    - [x] Añadir recordatorio en roadmap para actualizar ficha de Play Store (capturas, descripción) cuando se prepare la versión en inglés
    - [x] Commit de integración i18n básica funcionando

---

## 🚀 Etapa 9: Lanzamiento final

- [x] 🧭 Cerrar el alcance real del lanzamiento
  - [x] Confirmar qué tareas forman parte del lanzamiento cerrado
  - [x] Confirmar qué tareas pasan a post-lanzamiento o backlog
  - [x] Actualizar este roadmap para que refleje solo trabajo vivo y vigente

- [x] 🔎 Revisar regresión del botón "Volver al turno actual"
  - [x] Confirmar si el bug sigue presente en la versión actual
  - [x] Si la corrección es clara y acotada, incluirla en esta fase
  - [x] La revisión confirmó que era un bug general de cancelación táctil en la vista principal, ya resuelto dentro de esta fase sin moverlo a etapa 10

- [x] 📣 Preparar aviso en PWA para migración a app nativa
  - [x] Detectar si es entorno web o PWA
  - [x] Diseñar aviso persistente con enlace a Play Store
  - [x] Definir un fallback razonable para iOS
  - [x] Valorar si conviene ocultar el aviso al instalar la versión nativa
  - [x] Dejar preparado el comportamiento para validarlo con la release real

- [ ] 📱 Publicar app Android en Google Play
  - [ ] Revisar ficha final de Play Store (nombre, descripción, capturas, política de datos, etc.)
  - [ ] Confirmar que versión, textos e imágenes están actualizados
  - [ ] Preparar release pública en producción
  - [ ] Usar `managed publishing` si conviene para controlar el momento exacto de visibilidad
  - [ ] Activar publicación pública cuando se decida
  - [ ] Confirmar que la app está visible y accesible desde la Play Store

- [ ] 📤 Publicar versión PWA como estable
  - [ ] Confirmar que `develop` está lista para merge a `main`
  - [ ] Revisar y actualizar versión visible y metadatos si corresponde
  - [ ] Confirmar que el aviso de migración ya puede apuntar a la ficha real de Play Store
  - [ ] Actualizar también el `README.md` si han cambiado tecnologías, capturas, enlaces o instrucciones
  - [ ] Hacer merge a `main`
  - [ ] Verificar despliegue correcto en Vercel producción
  - [ ] Confirmar correcto funcionamiento como app instalada desde navegador en dispositivos de referencia
  - [ ] Validar comportamiento final del aviso de migración ya con enlace real
  - [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "Descripción del release"
      git push origin v1.X.Y

- [ ] 👥 Comunicación mínima del lanzamiento
  - [ ] Avisar a usuarios actuales de la app
  - [ ] Preparar mensaje breve para el grupo de trabajo

- [ ] ✅ Cerrar la fase de lanzamiento
  - [ ] Confirmar que la PWA estable ya está publicada y validada
  - [ ] Confirmar que la app Android ya está publicada y validada
  - [ ] Confirmar que el aviso de migración en PWA está resuelto
  - [ ] Confirmar que la comunicación mínima está hecha
  - [ ] Actualizar también el `README.md` si se han hecho cambios relevantes

---

## 🔄 Etapa 10: Post-lanzamiento y backlog

Tareas posteriores al lanzamiento público, incluyendo mejoras opcionales, deuda técnica y correcciones no bloqueantes.
  > Revisar el orden; no siguen una prioridad cerrada todavía.

- [ ] 🕛 Corrección automática de fecha en tareas cerca de medianoche
  - [ ] Detectar si al modificar una hora (inicio o fin) la nueva hora pertenece al día anterior o siguiente
      - [ ] Aplicar comprobación al confirmar la edición del campo de hora, no al crear la tarea
      - [ ] Considerar un rango de tolerancia (por defecto entre 00:00 y 05:00)
  - [ ] Ajustar automáticamente la fecha de la hora modificada
      - [ ] Si se introduce una hora anterior a la actual después de medianoche, restar un día al campo afectado
      - [ ] Si ambas horas quedan en días distintos (ej. 23:30–00:30), mantener esa separación para reflejar la duración real
      - [ ] Si ambas caen en el mismo día anterior (ej. 23:30–23:45), restar un día a ambas
      - [ ] Recalcular la duración tras cualquier ajuste
  - [ ] Mostrar toast de confirmación
      - [ ] Mensaje: "La hora introducida parece pertenecer al día anterior. ¿A qué día pertenece realmente?"
      - [ ] Botones: "Ayer" y "Hoy", ambos actualizando la tarea y cerrando el toast
      - [ ] Sin acción automática si no se responde
  - [ ] Validar comportamiento
      - [ ] Caso: crear tarea después de medianoche y cambiar inicio a 23:30 → debe corregir la fecha y reposicionarse
      - [ ] Caso: tarea 23:30–00:30 → debe conservar duración correcta abarcando dos días
      - [ ] Confirmar que exportación, importación y ordenación siguen coherentes

- [ ] (Opcional) Probar app para tablet y hacer capturas para Play Store
- [ ] Revisar bug menor en PWA iOS instalada al editar notas de tramo con teclado abierto y selector nativo de campos visible
- [ ] Añadir selector de formato horario: HH:MM / AM-PM / seguir sistema (opcional)
- [ ] Revisar y adaptar la app al nuevo sistema de vista de extremo a extremo (Android 15 / SDK 35):
      Gestionar correctamente insets y safe-areas cuando el edge-to-edge sea predeterminado.
      Basado en aviso de Play Console: comprobar visualmente y aplicar nuevas APIs si es necesario.
- [ ] Actualizar el plugin `@capacitor/status-bar` y Material 3 cuando implementen soporte total para SDK 35.
      Aviso actual de Play Console: uso interno de `Window.setStatusBarColor` / `setNavigationBarColor` (obsoletas).
- [ ] Evaluar en el futuro si conviene retirar `android:screenOrientation="portrait"` para mejorar compatibilidad con pantallas grandes (Android 16+).
      Aviso informativo: el sistema ignorará esta restricción en tablets/plegables; no crítico para teléfonos.
- [ ] Revisar accesibilidad en toda la app (lectores de pantalla, etc.)
- [ ] Preparar lanzamiento de versión en Play Store en inglés (o países angloparlantes)
- [ ] Compatibilidad visual en Android nativo y edge-to-edge
    - [ ] Hacer script para compilar Android (build, copy, sync, open/run; revisar si `clean project` hace falta)
    - [ ] Investigar por qué en algunos dispositivos antiguos (API 29–30 físicos) las barras adicionales siguen apareciendo tras el fix de status bar
    - [ ] Intentar que el cambio de color de iconos y fondo en Android 10 (API 29) se actualice sin necesidad de reiniciar la app
    - [ ] Evaluar si es posible aplicar un ajuste similar al del color de iconos para forzar la eliminación de insets extra en versiones antiguas
    - [ ] Validar en dispositivos físicos con Android 11 (API 30) si el comportamiento de fondo e iconos de la status bar es estable en condiciones reales
    - [ ] Probar más versiones intermedias (API 31–35) para asegurar que la lógica condicional por versión de API no introduce efectos no deseados
    - [ ] Validar que el layout es coherente en todas las plataformas

- [ ] Depuración Android: empaquetado y herramientas
    - [ ] Verificar que los archivos `favicon.ico` y `manifest.webmanifest` están correctamente empaquetados en la APK
        - Requiere: `npm run build` + `npx cap copy` + generación de APK
        - Renombrar el `.apk` a `.zip` y explorar el contenido en `/assets/public/`
        - Confirmar presencia de los archivos estáticos esperados
        - Si faltan, revisar configuración de `vite.config.ts` (assetsInclude, rutas) o proceso de build
    - [ ] Diagnosticar causa del bloqueo del inspector `chrome://inspect` en emuladores Android
        - Confirmar si se reproduce en dispositivo físico con USB
        - Probar con emulador limpio o reinstalado
        - Evaluar si alguna animación en la app (como apertura del SideMenu) puede estar dejando el DOM en estado inconsistente
        - Si no se encuentra causa clara, documentar el entorno exacto donde falla (emulador, versión de Chrome, tipo de build)

- [ ] Validar coherencia del modo oscuro y tema del sistema en PWA, Android y escritorio (tests cruzados)

- [ ] Añadir bloque "Sobre este proyecto" al final del `README.md`
    - [ ] Redactar una sección breve y profesional sobre el contexto del desarrollo
    - [ ] Usar tono neutro y claro
    - [ ] Confirmar que no interfiere con el resto del README ni repite información innecesaria

- [ ] Implementar selector de formato de duración y precisión
    - [ ] Añadir sistema de persistencia para ajustes de usuario (`localStorage`)
    - [ ] Modificar sistema de renderizado de duración en tarjetas
    - [ ] Crear modal para selector de formato de duración (primer uso)
    - [ ] Añadir selector de salto tras elección de formato en el modal inicial
    - [ ] Integrar ajuste en opciones persistentes de la app (drawer o ajustes)
    - [ ] Ajustes visuales y de UX

- [ ] Añadir soporte dinámico para colores del sistema (status bar y nav bar) según modo claro/oscuro
  - [ ] Detectar `prefers-color-scheme` en `main.ts`
  - [ ] Aplicar color de fondo y color del texto usando `SafeArea.setStatusBar` y `setNavigationBar`
  - [ ] Confirmar que los colores aplicados coinciden con el modo activo de la app
  - [ ] (Opcional) Escuchar cambios en `prefers-color-scheme` si se desea actualización dinámica
  - [ ] Probar en dispositivo Android real y emulador
  - [ ] Documentar comportamiento y consideraciones en `dev-notes.md`

- [ ] ✉️ Formulario de feedback por email
  - [ ] Botón "Enviar feedback" en menú lateral
  - [ ] Formulario con tipo de mensaje, descripción y email opcional
  - [ ] Guardar en Firestore (colección `feedback`)
  - [ ] Trigger en Firebase Functions con envío por email (`nodemailer`, Resend, etc.)
  - [ ] Confirmación visual tras enviar

- [ ] Investigar problema de recorte incorrecto del icono maskable al instalar la PWA en Android
  > Comentario: ver `dev-notes.md` para contexto completo de pruebas previas realizadas
  - [ ] Comparar el manifest de Notifica con PWAs conocidas donde el icono maskable se recorte correctamente
  - [ ] Generar nuevos iconos maskable con padding adecuado usando https://maskable.app/editor y probarlos
  - [ ] Verificar si el recorte incorrecto varía según versión de Android, API o navegador (Chrome, WebView, WebAPK)
  - [ ] Probar cambios en el valor de `purpose` (`maskable` vs `any maskable`) y validar efectos
  - [ ] Analizar si el formato, metadatos o compresión del PNG pueden estar afectando el renderizado
  - [ ] Buscar documentación o bugs conocidos en Chromium o foros relacionados con iconos maskable mal recortados
  - [ ] Decidir si se puede aplicar un workaround eficaz o si debe dejarse documentado como limitación conocida
  - [ ] Validar solución (si se aplica) en múltiples entornos antes de cerrar el bug

- [ ] 📘 Añadir ayuda o tutorial para usuarios nuevos
  - [ ] Definir qué funciones deben explicarse (crear turno, añadir tarea, filtros, exportar, etc.)
  - [ ] Elegir el formato: modal scrollable, vista "Ayuda", o guía paso a paso
  - [ ] Diseñar estructura clara, con texto corto y ejemplos visuales
  - [ ] Añadir acceso desde el menú lateral u otro lugar visible
  - [ ] Asegurar que se puede consultar en cualquier momento
  - [ ] Validar legibilidad en móvil y dispositivos pequeños

- [ ] Comunicación externa opcional
  - [ ] Preparar mensaje de presentación para redes o comunidades
  - [ ] Valorar si tiene sentido compartir la app en plataformas relevantes (`/r/androidapps`, `/r/SideProject`, círculos personales o profesionales, etc.)

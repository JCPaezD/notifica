# ðŸ› ï¸ Roadmap: Notifica (v0.1.0)

App web tipo PWA para registrar tareas laborales de forma Ã¡gil, sin conexiÃ³n y exportables o marcables como notificadas al final del turno.

---

## âœ… Etapa 1: PreparaciÃ³n del entorno

- [x] Crear carpeta de proyecto y abrirla en VS Code
- [x] Iniciar proyecto con `npm init vue@latest`
  - Project name: `notifica`
  - Add TypeScript: Yes
  - Add Vue Router: No
  - Add Pinia: No
  - Add ESLint, testing, etc.: No
- [x] Ejecutar `npm install` y `npm run dev`
- [x] Confirmar que la app Vue bÃ¡sica funciona en el navegador

---

## ðŸŽ¨ Etapa 2: ConfiguraciÃ³n del diseÃ±o

- [x] Instalar y configurar **Tailwind CSS**
  - Seguir guÃ­a oficial: https://tailwindcss.com/docs/guides/vite
  - Crear archivo `style.css` si es necesario
- [x] Aplicar un diseÃ±o limpio y moderno desde el inicio
- [x] Crear estructura de carpetas:
  - `src/components/`
  - `src/composables/`
  - `src/utils/`

---

## ðŸ“‹ Etapa 3: LÃ³gica bÃ¡sica de tareas

- [x] Crear interfaz para aÃ±adir una nueva tarea
  - [x] BotÃ³n â€œIniciar tareaâ€ que registre hora y descripciÃ³n
  - [x] BotÃ³n â€œFinalizar tareaâ€ que aÃ±ada la hora de fin
- [x] Crear componente `TaskList.vue` para mostrar tareas del dÃ­a
- [x] Crear componente `TaskItem.vue` para cada tarea individual
- [x] Definir tipos (interfaces) para Tarea en un archivo separado (e.g., `src/types/Task.ts`)
- [x] Calcular y mostrar duraciÃ³n de tareas finalizadas
- [x] Permitir editar los campos en cualquier momento
- [x] Campo para seleccionar â€œtÃ©cnico(s)â€ o â€œpersonalâ€
- [x] Check de â€œNotificadoâ€ para marcar quÃ© tareas ya han sido introducidas en SAP manualmente
- [x] Filtrar tareas completadas y notificadas (mostrar solo)

---

## ðŸ’¾ Etapa 4: GestiÃ³n de datos y persistencia

- [x] Guardar las tareas en `localStorage`
- [x] BotÃ³n para exportar datos (JSON)
- [x] BotÃ³n para importar datos (JSON)
- [x] BotÃ³n para borrar todos los datos (con confirmaciÃ³n)
- [x] Agrupar por dÃ­a y turno
  - [x] Implementar lÃ³gica de "turnos" (`shiftId`)
  - [x] BotÃ³n "Iniciar Nuevo Turno"
  - [x] Asignar `shiftId` a nuevas tareas
  - [x] Persistir `currentShiftId`
  - [x] Filtrar tareas por turno actual por defecto
- [x] AÃ±adir filtro para ver tareas de dÃ­as anteriores

---

## ðŸ“¤ Etapa 5: ExportaciÃ³n (Completada)

- [x] Crear botÃ³n â€œExportar tareas del dÃ­aâ€
- [x] Formato: texto plano listo para enviar por WhatsApp o email
- [x] Usar `navigator.clipboard` o `navigator.share` si estÃ¡ disponible

---

## ðŸ“± Etapa 6: PWA y Despliegue

- [x] **ConfiguraciÃ³n del Manifest:**
  - [x] Crear `public/manifest.json` con nombre, nombre corto, descripciÃ³n, `start_url`, `display` (e.g., `standalone`), `orientation`. (Gestionado por `vite-plugin-pwa`)
  - [x] AÃ±adir Ã­conos de la aplicaciÃ³n (varios tamaÃ±os, e.g., 192x192, 512x512) en una carpeta como `public/icons/` y referenciarlos en `manifest.json`.
  - [x] Definir `theme_color` y `background_color` en `manifest.json` para la splash screen y la barra de tÃ­tulo.
  - [x] AÃ±adir `screenshots` al `manifest.json` para mejorar la UI de instalaciÃ³n.
  - [x] Enlazar `manifest.json` en `index.html`. (Gestionado por `vite-plugin-pwa`)
  - [x] AÃ±adir meta tags relevantes para PWA en `index.html` (e.g., `theme-color` para Safari, `apple-touch-icon`).
- [x] **Service Worker para Offline y CachÃ©:**
  - [x] Configurar un Service Worker. Podemos usar una herramienta como `vite-plugin-pwa` para simplificar esto con Vite, o crearlo manualmente.
  - [x] Implementar una estrategia de cachÃ© para el App Shell (HTML, CSS, JS principal) y assets estÃ¡ticos.
  - [x] Asegurar que la aplicaciÃ³n cargue y sea funcional (al menos en modo lectura o con datos cacheados) sin conexiÃ³n a internet.
  - [x] Considerar una estrategia para la actualizaciÃ³n del Service Worker cuando despliegues nuevas versiones de la app. (`autoUpdate` configurado)
- [x] **InstalaciÃ³n y Experiencia PWA:**
  - [x] Verificar que los navegadores ofrezcan la opciÃ³n de "AÃ±adir a pantalla de inicio" o "Instalar aplicaciÃ³n".
  - [x] (Opcional) Considerar un aviso o botÃ³n personalizado dentro de la app para promover la instalaciÃ³n.
  - [x] Verificar la apariencia de la splash screen y el comportamiento como app independiente (sin la barra de URL del navegador).
- [x] **Despliegue en ProducciÃ³n:**
  - [x] Elegir una plataforma de hosting estÃ¡tico que soporte HTTPS (fundamental para Service Workers). Opciones populares y gratuitas para empezar: Vercel, Netlify, GitHub Pages. (Elegido: Vercel)
  - [x] Configurar el proceso de build de producciÃ³n de Vite (`npm run build`).
  - [x] Desplegar los archivos generados en la plataforma elegida. (Desplegado en Vercel)
  - [x] Asegurar que la aplicaciÃ³n se sirva obligatoriamente sobre HTTPS. (Gestionado por Vercel)
- [ ] **AuditorÃ­a PWA Inicial (Pre-RediseÃ±o):**
  - [x] Realizar una auditorÃ­a Lighthouse inicial para identificar problemas crÃ­ticos de PWA, Performance o Accesibilidad.
- [ ] **RediseÃ±o y Ajustes Visuales/UX:**
  - [x] **Hallazgos AuditorÃ­a Lighthouse:**
    - [x] Asegurar contraste de color adecuado en toda la aplicaciÃ³n (mÃ­nimo 4.5:1 para texto normal, 3:1 para texto grande). Prestar especial atenciÃ³n a botones y elementos interactivos. (Ajustes iniciales aplicados)
    - [x] AÃ±adir etiqueta `<main>` en `App.vue` para envolver el contenido principal y mejorar la accesibilidad semÃ¡ntica.
  - [x] **UI â€“ Visual y Estilo:**
    - [x] Definir una nueva paleta de colores mÃ¡s armÃ³nica y accesible (Paleta pastel moderna definida: fondo #f5f7fa, texto #334155, acento #93c5fd, Ã©xito #a7f3d0, alerta #fecaca, activo #fef08a).
    - [x] Configurar la nueva paleta de colores en Tailwind CSS (`tailwind.config.js`).
    - [x] Aplicar la nueva paleta de colores y estilos base a `App.vue` (fondo general, texto principal, contenedores principales, inputs, botones de acciÃ³n principales y de gestiÃ³n).
    - [x] Aplicar la nueva paleta de colores y estilos a `TaskList.vue` (tÃ­tulo de la lista).
    - [x] Aplicar la nueva paleta de colores y estilos a `TaskItem.vue` (tarjetas de tarea, textos, botones internos de acciÃ³n, iconos de estado, inputs de ediciÃ³n).
    - [x] Actualizar `theme_color` y `background_color` en `manifest.json` (o `vite.config.ts` si es generado por `vite-plugin-pwa`) para que coincidan con la nueva paleta.
    - [x] Actualizar el meta tag `theme-color` en `index.html` para que coincida con la nueva paleta.
    - [x] Unificar los estilos de bordes (`rounded`) en toda la aplicaciÃ³n para consistencia visual.    
    - [x] Integrar iconos junto al texto en botones clave para mejorar la comprensiÃ³n y el atractivo visual (e.g., â€œReabrir ðŸ”â€, â€œFinalizar âœ…â€, â€œEliminar ðŸ—‘ï¸â€, "Nuevo Turno âœ¨", "Exportar ðŸ“¤", "Importar ðŸ“¥", "Compartir ðŸ”—").
        - [x] Mover iconos a la izquierda del texto en botones globales (`App.vue`).
        - [x] Reemplazar icono `+` en "Iniciar Tarea" por `PencilSquareIcon`.
        - [x] Asegurar consistencia de tamaÃ±o (`w-4 h-4`) y espaciado (`gap-2`) en iconos de botones globales.
        - [x] AÃ±adir iconos a botones "Finalizar" y "Reabrir" en tarjetas de tarea (`TaskItem.vue`) a la izquierda del texto, con tamaÃ±o `w-4 h-4` y `gap-2`.
        - [x] Confirmar y mantener tamaÃ±o `h-6 w-6` para botones-icono ("Notificado", "Eliminar") en `TaskItem.vue` para mejor usabilidad.
    - [x] Mejorar la jerarquÃ­a visual utilizando contenedores diferenciados (mediante fondos, bordes sutiles, o sombras ligeras) para las secciones principales: formulario de nueva tarea, lista de tareas, filtros y acciones.
    - [x] Revisar y aplicar una tipografÃ­a y espaciado consistentes en toda la aplicaciÃ³n (e.g., `text-lg font-semibold tracking-wide` para tÃ­tulos de secciÃ³n, `text-base` o `text-sm` para contenido y controles, segÃºn jerarquÃ­a).
    - [x] RediseÃ±ar el tÃ­tulo principal de la aplicaciÃ³n: considerar eliminar el subtÃ­tulo actual, valorar la inclusiÃ³n de un logo/icono simple y una fuente mÃ¡s distintiva si se desea.
  - [ ] **UX â€“ Comodidad, Fluidez y Usabilidad:**
    - [x] Asegurar que la interfaz se adapta correctamente a pantallas mÃ³viles reales:
      - [x] Ajustar la disposiciÃ³n de los botones de acciÃ³n en la parte inferior para evitar que salten de lÃ­nea o se desordenen en pantallas pequeÃ±as (usar `flex-wrap`, `gap`, `w-[48%]`, etc.).
      - [x] Compactar el formulario â€œIniciar Tareaâ€ en dispositivos mÃ³viles: inputs y botÃ³n en horizontal si es viable, o reducir `padding` y `margin` para que no ocupe tanto alto.
      - [x] Priorizar diseÃ±o "mobile-first", especialmente en botones y controles.
      - [x] Usar `flex-wrap`, `w-full`, `md:w-auto`, etc., para que los botones se comporten bien en dispositivos pequeÃ±os.
      - [x] Probar interacciones y distribuciÃ³n en dispositivos mÃ³viles reales (tamaÃ±o real de botones, espaciado, scroll).
      - [x] Comprobar y depurar la vista mÃ³vil en el navegador usando DevTools (modo dispositivo manualmente si atajo no funciona).    
    - [x] Asegurar que todos los botones y elementos interactivos tengan un tamaÃ±o accesible, cumpliendo con las directrices de zona mÃ­nima pulsable (e.g., `min-w-[44px]` y `min-h-[44px]`, y `py-2 px-4` o similar para el contenido interno).
    - [x] Reorganizar el layout de los `TaskItem.vue` (Ã­tems de tarea):
        - [x] Explorar una disposiciÃ³n mÃ¡s horizontal de los campos (descripciÃ³n, tiempos, tÃ©cnico, acciones) si el espacio en dispositivos de escritorio/tableta lo permite, manteniendo una vista apilada clara para mÃ³viles.
        - [x] Considerar si la descripciÃ³n de la tarea deberÃ­a ser expandible/colapsable si es muy larga.
    - [x] (Opcional) Evaluar la posiciÃ³n del formulario "Iniciar tarea": podrÃ­a integrarse de forma mÃ¡s fluida, quizÃ¡s apareciendo de forma destacada si no hay tareas o como una secciÃ³n siempre visible pero compacta.
    - [x] Agrupar los controles de filtro ("Solo Activas", "Solo Sin Notificar") y el selector de turno en una secciÃ³n cohesiva, posiblemente en una sola lÃ­nea con `flex-wrap` para adaptarse a diferentes anchos de pantalla.
    - [x] Definir y aplicar un esquema de color por estado de tarea que sea claro y consistente (e.g., un color para tareas activas/pendientes, otro para finalizadas).
    - [x] Implementar animaciones y transiciones suaves (`transition-all duration-300` o similar) para interacciones clave como hover en botones, cambio de estado de tareas, apariciÃ³n/desapariciÃ³n de elementos, para mejorar la sensaciÃ³n de fluidez.
    - [x] (Opcional) Evaluar la viabilidad y utilidad de una barra fija (superior o inferior) para acciones muy frecuentes (como "Iniciar Tarea" o "Nuevo Turno") o para el input principal.    
    - [x] (Opcional) Considerar un menÃº lateral desplegable (activado por un botÃ³n "hamburguesa") para opciones menos frecuentes como importaciÃ³n/exportaciÃ³n, borrado total, o futuro historial, para despejar la interfaz principal.
  - [x] **UX Funcional (Mejoras de InteracciÃ³n):**
    - [x] RediseÃ±ar el formato del mensaje de texto plano generado al compartir tareas para mejorar su legibilidad y atractivo visual (considerar emojis consistentes, mejor estructura).
    - [x] Implementar notificaciones visuales no intrusivas (tipo "Toast" o "Snackbar" sutil) para confirmar acciones importantes (e.g., "Tarea guardada", "Tarea notificada", "Turno iniciado").
    - [x] Implementada funcionalidad "Deshacer" con toasts para Eliminar Tarea, Borrar Todo y Crear Turno.
    - [x] (Descartado) BotÃ³n "Marcar todo como notificado". No requerido por no tener ocasiones de uso real.
  - [x] **Recursos y Componentes (Consideraciones TÃ©cnicas):**
    - [x] (Descartado) Uso de Headless UI. Evaluado y no necesario en esta app. La interfaz ya es accesible, no requiere modales ni menÃºs complejos, y los componentes actuales (SideMenu, notificacionesâ€¦) ya estÃ¡n bien resueltos sin esta librerÃ­a.
  - [x] **Actualizar Capturas de Pantalla:**
    - [x] Una vez finalizado el rediseÃ±o, crear/actualizar las capturas de pantalla (`screenshots`) para el `manifest.json` (mejorando la UI de instalaciÃ³n de la PWA) y para el archivo `README.md` de la documentaciÃ³n.
- [x] **Pruebas y AuditorÃ­a PWA Exhaustivas (Post-RediseÃ±o):**
  - [x] Realizar auditorÃ­as completas con Lighthouse para verificar el cumplimiento de todos los criterios PWA, Performance, Accesibilidad, etc., tras el rediseÃ±o.
  - [x] Probar la instalaciÃ³n y el funcionamiento offline en diferentes navegadores de escritorio (Chrome, Edge, Firefox si soporta PWA).
  - [x] Probar en dispositivos mÃ³viles reales o emuladores:
    - [x] **Android (Chrome):** Verificar instalaciÃ³n, splash screen, funcionamiento offline, notificaciones (si las implementamos).
      - [x] Corregido icono cuadrado en Android aÃ±adiendo soporte "maskable" en manifest
    - [x] **iOS (Safari):** Verificar "AÃ±adir a pantalla de inicio", comportamiento, y limitaciones (Safari tiene un soporte de PWA un poco diferente, especialmente para notificaciones push y background sync).

---

## ðŸ““ Etapa 7: DocumentaciÃ³n y presentaciÃ³n

- [x] Crear `README.md` con propÃ³sito, tecnologÃ­as, uso y capturas
- [x] Documentar cÃ³mo se inicializa y ejecuta la app
- [x] Registrar decisiones clave de diseÃ±o o estructura
- [x] Revisar y aÃ±adir comentarios explicativos al cÃ³digo en archivos importantes
- [x] Dejar anotaciones para evoluciÃ³n futura (v1.1, ideas de mejora, etc.)

---

## ðŸ”” Etapa 8: Mejoras y consolidaciÃ³n previa a publicaciÃ³n

- [x] ðŸ¤– Consolidar versiÃ³n Android nativa (Capacitor + Android Studio) y PWA par iOS.

  - [x] ðŸ“¦ Generar y probar APK sin firmar
    - [x] Ejecutar `npx cap add android` y abrir proyecto en Android Studio
    - [x] Hacer build de producciÃ³n (`npm run build`) y copiarlo con `npx cap copy`
    - [x] Generar APK sin firmar desde Android Studio (modo debug)
    - [x] Instalar manualmente en dispositivo de prueba
    - [x] Confirmar funcionamiento completo en dispositivo real:
      - [x] Carga sin conexiÃ³n
      - [x] Inputs, scroll, botones, navegaciÃ³n
      - [x] Splash personalizada con Theme.SplashScreen (Android 12+) y background_legacy (Android 10)
      - [x] TransiciÃ³n fluida a la app
      - [x] Confirmado en emuladores y dispositivo Huawei fÃ­sico
      - [x] Evitado halo oscuro (cambio de icono)
      - [x] Intento de evitar parpadeo blanco descartado y revertido
      - [x] Limpieza de recursos no usados (icon.png)
      - [x] Confirmado funcionamiento tras limpieza
      - [ ] Anotado comportamiento menor: icono genÃ©rico en Pixel 4 al abrir desde homescreen (posible bug del emulador)

  - [x] ðŸª¢ Flujo de ramas y despliegue
    - [x] Rama `main`: producciÃ³n estable
    - [x] Rama `develop`: trabajo diario
    - [x] Merge validado antes de llegar a `main`
    - [x] Previsualizaciones automÃ¡ticas en Vercel desde `develop` (opcional)
    - [x] Documentado en README

  - [x] ðŸ” Firma y preparaciÃ³n para distribuciÃ³n
    - [x] Keystore `.jks` creado y guardado
    - [x] ConfiguraciÃ³n en `build.gradle`
    - [x] GeneraciÃ³n de `.aab` firmada
    - [x] Confirmado que se instala y actualiza correctamente

  - [x] ðŸ§ª VerificaciÃ³n de release firmada
    - [x] Aumento de `versionCode` y `versionName` en `build.gradle`
    - [x] Confirmado que se puede actualizar desde una instalaciÃ³n previa
    - [x] Validado splash, navegaciÃ³n, retroceso, permisos y almacenamiento local

  - [x] ðŸ§¼ PreparaciÃ³n *parcial* para publicaciÃ³n en Play Store
    - [x] `manifest.json` correcto (`standalone`, idioma, nombre, coloresâ€¦)
    - [x] Nombre visible y nombre de paquete (`com.jcpaezd.notifica`)
    - [x] Confirmar que los Ã­conos son adecuados y `maskable` (Android)
    - [x] Eliminar permisos innecesarios
          > La app solo solicita INTERNET, necesario para el WebView de Capacitor. No hay permisos adicionales en PWA ni nativos.
    - [x] Incluir capturas para ficha de Play Store (realistas y variadas)
    - [x] Redactar descripciÃ³n detallada para ficha de Play Store
    - [x] Crear borrador de ficha en Google Play Console  
      - [x] Subido icono principal (512x512)  
      - [x] Subidas 5 capturas desde emulador Pixel 7 (pantallas clave de la app)  
      - [x] Redactada y guardada descripciÃ³n larga en estilo claro y profesional  
      - [x] Definida descripciÃ³n breve para la ficha (PWA-style)  
      - [x] Guardado todo como borrador (sin enviar a revisiÃ³n aÃºn)

  - [x] ðŸ›¡ Cuenta de desarrollador Google Play
    - [x] Registro, verificaciÃ³n y pago completado

  - [x] ðŸš¦ Testing interno en Play Console
    - [x] Subida de `.aab` al canal de pruebas internas
    - [x] Compartido con testers
    - [x] Confirmada instalaciÃ³n desde Play Store y funcionamiento completo

  - [x] âœ… Validar funciones clave en versiÃ³n nativa Android  
    - [x] Compartir tareas (botÃ³n compartir, clipboard, navigator.share y Capacitor Share)
    - [x] Exportar e importar archivos (JSON o texto)  
        - âœ… Exportar archivo `.json` en Android nativo usando `Filesystem` + `Share`.  
        - âœ… En PWA/navegador, se mantiene la descarga directa del archivo.  
        - â„¹ï¸ En Android, el archivo se comparte mediante el diÃ¡logo del sistema.  
        - ðŸ“Œ LimitaciÃ³n aceptada: Android no siempre ofrece una opciÃ³n de "Guardar en Archivos"; dependerÃ¡ de las apps instaladas.  
        - âœ… Importar `.json` desde archivo funciona correctamente en todas las plataformas.
    - [x] Borrar todos los datos (y mostrar toast de confirmaciÃ³n)
    - [x] Comparar con experiencia en PWA
    - [x] Ajustar si es necesario para equiparar comportamiento  
        - No se han detectado diferencias relevantes entre Android nativo y PWA.  
        - Comportamiento validado como equivalente tras pruebas completas en ambas plataformas.

  - [x] ðŸ”ƒ ReorganizaciÃ³n de tareas en etapa 8 y 9  
    - [x] Pospuesto el cambio de visibilidad pÃºblica hasta despuÃ©s del aviso en PWA  
    - [x] Ajustado orden de pasos para que reflejen la secuencia real de publicaciÃ³n  
    - [x] AÃ±adido recordatorio para actualizar README tras publicaciÃ³n

  - [x] Documentar proceso completo de splash screen en Android  
    - [x] Registrar soluciÃ³n bifurcada Android 10 / Android 12+  
    - [x] Incluir causas del bug, pruebas realizadas, fallos y revertidos  
    - [x] Confirmar validez del sistema actual y observaciones secundarias  
    - [x] Marcar como reutilizable en futuros proyectos similares

  - [x] Documentar proceso de publicaciÃ³n PWA y sincronizaciÃ³n de versiones  
    > Incluye actualizaciÃ³n manual de package.json y SideMenu.vue, recomendaciones para Android y opciÃ³n futura de automatizaciÃ³n con Vite.


---

- [x] ðŸ“œ Scroll innecesario en pantallas cortas
  - [x] Revisar layout y paddings
  - [ ] Ajustar para evitar toasts tapados y mejorar adaptaciÃ³n al viewport
    - [x] Revisar sistema de notificaciones usado en Nocta
    - [x] Decidir estructura de archivos y rutas para Notifica
    - [x] Copiar/adaptar componentes y composables necesarios
    - [x] Integrar sistema en App.vue con <Teleport> si aplica
    - [x] AÃ±adir soporte para botÃ³n de acciÃ³n en el sistema de toasts
      - [x] Definir API esperada (label + onClick)
      - [x] Modificar <Toast.vue> para mostrar botÃ³n si hay acciÃ³n
      - [x] Emitir evento o ejecutar funciÃ³n asociada al click
      - [x] Estilizar el botÃ³n para que sea compacto y accesible
      - [x] Probar en mÃ³vil y escritorio con caso "Deshacer"
    - [x] AÃ±adir animaciÃ³n o retroalimentaciÃ³n visual al botÃ³n de acciÃ³n al pulsar
    - [x] AÃ±adir animaciÃ³n sutil al montar el toast (una sola vez)
      - [x] Activar clase como animate-pop o animate-scale tras delay breve
      - [x] Usar onMounted o watch en Toast.vue
      - [x] Retirar clase para evitar loops
      - [x] Comprobar en mÃ³vil y escritorio sin interferir con el cierre
    - [x] AÃ±adir animaciÃ³n de entrada y salida al toast completo
      - [x] Usar <TransitionGroup name="toast"> como en Nocta
      - [x] Definir clases .toast-enter-from, .toast-leave-to... en main.css
      - [x] Validar que funciona con v-for y Teleport
      - [x] Probar fluidez en mÃ³vil y escritorio
    - [x] Reemplazar llamadas a vue-sonner por sistema propio
      - [x] AÃ±adir soporte para onDismiss (ejecutar al cerrarse automÃ¡ticamente)
      - [x] AÃ±adir soporte para tipo visual de toast (success, error, info, warning)
      - [x] Hacer que add(...) devuelva el id del toast
      - [x] Revisar todas las llamadas a toast para adaptar estos nuevos campos si aplica
      - [x] Continuar la sustituciÃ³n de notifySuccess, notifyInfo, notifyError, notifyWarning
    - [x] Eliminar vue-sonner y sus rastros del proyecto
    - [x] El botÃ³n deshacer no cerraba el toast de "Tarea eliminada"
      > Se ajustaron los tiempos de cierre y apariciÃ³n para permitir la animaciÃ³n completa del botÃ³n y una experiencia visual fluida.
    - [x] Ajustar diseÃ±o visual: tamaÃ±o, posiciÃ³n, animaciÃ³n, stacking. 
      > Objetivo general: estÃ©tica profesional y agradable.
      > Objetivo original y principal: compactar y molestar menos al usuatio tapando contenido.
      - [x] Analizar estÃ©tica actual del sistema migrado (fondos blancos, full width, stacking sin animaciÃ³n)
      - [x] Revisar ejemplos anteriores (vue-sonner, Tailwind UI, cute-toast, etc.) y evaluar ideas aplicables
      - [x] Tomar decisiones de estilo:
        - Fondos suaves por tipo (no blancos)
        - Icono a la izquierda, botÃ³n de cerrar a la derecha
        - BotÃ³n de acciÃ³n opcional con icono de deshacer incluido
        - Compactar paddings y espacio entre toasts
        - Limitar ancho y centrar (mÃ¡x. `max-w-xs`)
        - Borde redondeado uniforme (como tareas)
      - [x] Validar tipos de toast e iconografÃ­a adecuada (error, success, info, warning)
      - [x] DiseÃ±ar un mock en HTML con Tailwind Play
      - [x] Iterar con ajustes hasta obtener versiÃ³n final
      - [x] Aplicar diseÃ±o final a `<Toast.vue>` (estructura, estilos, colores, iconos)
      - [x] Ajustes visuales menores en el sistema de toasts
        > Tipos corregidos, margen inferior ajustado y limpieza de toasts de prueba tras validaciÃ³n en iOS.
      - [x] Ajustar layout de `<TransitionGroup>` para respetar ancho, spacing y posiciÃ³n
      - [x] AÃ±adir animaciÃ³n suave a reordenamiento de toasts (apilado dinÃ¡mico)
      - [x] Validar consistencia visual con otros elementos de la app (como tareas, botones, colores)
      - [x] BotÃ³n deshacer en toast "Borrar todo" y "Nuevo turno", al pulsar no se cierra el toast
        > Copiar comportamiento de eliminar tarea 
      - [x] AnimaciÃ³n de pulsado en PWA iPhone
        > Corregido el efecto `scale-95` al pulsar el botÃ³n de acciÃ³n del toast en iOS aÃ±adiendo `@touchstart="() => {}"` para forzar la activaciÃ³n de `:active` sin interferir con `onClick`.
      - [x] No permitir seleccionar textos en toasts
    - [x] Scroll inesperado al hacer doble tap en Ã¡rea vacÃ­a
      > Corregido ajustando el alto del `<main>` con `min-h-[100svh]` y aÃ±adiendo `overflow-hidden`, ademÃ¡s de activar `viewport-fit=cover` en el meta viewport para soporte completo en PWA iOS.
    - [x] Scroll inesperado al hacer doble tap en Ã¡rea vacÃ­a
      > Bug visual de iOS PWA confirmado como fallo de WebKit. Se descarta tras probar soluciones estÃ¡ndar: scrollTo, bloqueo de touchmove, min-h-[100svh], safe areas, etc. No afecta a usabilidad y solo se produce si se fuerza. Se documenta en dev-notes.
    - [x] Scroll innecesario en el menÃº lateral (PWA iOS)
      > Solucionado limitando altura del <DialogPanel> con min-h-[100svh] y overflow-hidden. El scroll extra desaparece y el footer con la versiÃ³n se mantiene visible.
    - [x] Verificar funcionamiento real (mÃ³vil y escritorio)
    - [x] Documentar en dev-notes la decisiÃ³n y estructura

- [x] ðŸ™…â€â™‚ï¸ Desactivar selecciÃ³n de texto innecesaria  
  - [x] Aplicado `select-none` global en `<main>`, `<header>` y contenedor de menÃº lateral  
  - [x] `select-text` se mantiene solo en campos de entrada por defecto (inputs, textareas)  
  - [x] Validado en navegador y dispositivos: no se puede seleccionar texto accidentalmente en ningÃºn elemento de la UI

- [x] â†–ï¸ Fijar header para acceso constante al menÃº  
  > Implementado con `sticky top-0` y fondo blanco en todo el ancho.  
  > Probado en dispositivo real (PWA en iPhone 16 Pro): sin fallos visuales.  
  > En DevTools mÃ³vil (Chrome), puede verse un "temblor al hacer scroll", considerado bug de simulaciÃ³n. No se reproduce en dispositivos fÃ­sicos.

- [x] ðŸŽžï¸ AnimaciÃ³n sutil del icono del header
  - [x] Decidir tipo de animaciÃ³n (escala + sombra sutil)
  - [x] Activarla al hacer hover en escritorio (`md:hover`) sobre logo + tÃ­tulo
  - [x] Activarla al crear nuevo turno con efecto breve y retraso de inicio
  > Se ha implementado una animaciÃ³n suave compartida entre logo y tÃ­tulo (scale-105 + drop-shadow-md), que se activa en escritorio al hacer hover, y tambiÃ©n de forma programada cuando se crea un nuevo turno.
  > El comportamiento es fluido, no invasivo y aporta feedback visual sin distraer.
  > En mÃ³vil, la animaciÃ³n se dispara tras confirmar la creaciÃ³n del turno, con un retardo para asegurar visibilidad.

- [x] ðŸ—“ï¸ Mejora en identificador visual de turnos
  - [x] Corregir visibilidad del desplegable de turnos en Android
    > El menÃº se corta si no hay espacio suficiente hacia abajo. Detectar si debe abrirse hacia arriba o abajo dinÃ¡micamente. AÃ±adir altura mÃ¡xima y scroll interno para evitar cortes visuales.
  - [x] AÃ±adir dÃ­a de la semana al selector
  - [x] Usar emojis o colores sutiles (finalmente svg heroicons con colores) para diferenciar turnos (maÃ±ana/tarde/noche)
  - [x] RevisiÃ³n y ajuste fino del diseÃ±o del selector y del titulo del turno

- [x] ðŸ”§ Refactor: separaciÃ³n de responsabilidades en App.vue
  ðŸ“ Esta tarea puede realizarse de forma aislada en una conversaciÃ³n separada o como bloque independiente del roadmap. No requiere rediseÃ±o ni nuevas funcionalidades.
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
    - [x] Estilizar igual que ahora (no rediseÃ±ar)

  - [x] Verificar que `App.vue` queda reducido y mÃ¡s legible
    - [x] Comprobar que todo funciona igual
    - [x] No cambiar lÃ³gica ni estilos


- [x] ðŸ” Corregir hover persistente en botÃ³n hamburguesa
  - [x] Limitar hover a escritorio (`md:hover:`)
  - [x] Asegurar estilos limpios en mÃ³vil (`focus-visible`, `active`)
  - ðŸ“ Intentado con clases `btn-interactive`, pero generaba efectos inconsistentes. Se pospone.

- [x] ðŸ”§ Refactor: extraer los filtros de tareas como componente  
  ðŸ“ Los toggles de filtros (`Activas` y `Sin Notificar`) pueden aislarse como un componente compacto y reutilizable.  
  - [x] Crear componente `TaskFilters.vue`  
  - [x] Recibir `showOnlyActive` y `showOnlyNotNotified` como props o usar `v-model`  
  - [x] Emitir eventos de cambio o usar `update:modelValue`  
  - [x] Estilizar igual que ahora, sin rediseÃ±ar  
  - [x] Sustituir el bloque de filtros actual por el nuevo componente  
  - [x] Verificar comportamiento en mÃ³viles y navegaciÃ³n rÃ¡pida

- [x] ðŸ”§ Refactor: extraer formulario de nueva tarea como componente  
  ðŸ“ Esta tarea puede realizarse de forma segura tras el refactor de turnos. Mejora la claridad de App.vue y permite aislar la lÃ³gica de inputs y validaciones.  
  - [x] Crear componente `NewTaskForm.vue`  
    - [x] Incluir `textarea` y `input` para tÃ©cnico  
    - [x] BotÃ³n â€œIniciarâ€ con icono  
  - [x] Definir props si fueran necesarias (`currentShiftId`, etc.)  
  - [x] Emitir evento `@create` con la nueva tarea (o solo su descripciÃ³n y tÃ©cnico)  
  - [x] Gestionar foco, limpieza y validaciÃ³n internamente  
  - [x] Reemplazar bloque de formulario en App.vue por el nuevo componente  
  - [x] Verificar que todo funciona igual (mÃ³viles, teclado, toasts)


- [x] ðŸ”§ Refactor: animaciÃ³n del logo en un componente o composable  
  ðŸ“ La lÃ³gica de animaciÃ³n del tÃ­tulo puede separarse para claridad o reutilizaciÃ³n futura.  
  - [x] Crear composable `useLogoAnimation.ts` o componente `LogoBlock.vue`  
  - [x] Mover `ref` y `setTimeout` actuales  
  - [x] Importar y usar en App.vue sin cambiar diseÃ±o  
  - [x] Validar que la animaciÃ³n se aplica como antes (hover y tras nuevo turno)

- [x] ðŸŒ€ Revisar bug crÃ­tico: â€œScroll inesperado al hacer doble tap en Ã¡rea vacÃ­a (iOS PWA)â€
  [Resuelto 20/07/25: la soluciÃ³n fue aplicar touch-action: manipulation y text-size-adjust globalmente. +Info dev-notes.md]
  - [x] Confirmar que:
        - El bug solo aparece en iOS cuando la app estÃ¡ instalada como PWA (standalone)
        - No ocurre en Android (PWA ni APK)
        - No ocurre en la versiÃ³n PWA estable publicada hace ~35 dÃ­as
  - [x] Estudiar en quÃ© momento se reintrodujo:
        - [x] Comparar con commit de la Ãºltima versiÃ³n pÃºblica
        - [x] Identificar los cambios que pueden haberlo activado:
              - ImplementaciÃ³n del header `sticky top-0`
              - EliminaciÃ³n del scroll extra del `<main>`
  - [x] Volver a revisar soluciones previamente descartadas:
        - `min-h-[100svh]` en `<main>`
        - `overflow-hidden` en `html`, `body` o `main`
        - `viewport-fit=cover` en el meta viewport
        - AÃ±adir `scrollTo(0, 0)` tras `blur`
        - Bloqueo de `touchmove` en Ã¡reas vacÃ­as
        - Ajustes con `safe-area-inset-*`
  - [x] Hacer pruebas controladas activando y desactivando los cambios de layout, uno por uno
  - [x] Documentar resultados, incluyendo efectos secundarios no deseados
  - [x] Tomar decisiÃ³n antes de liberar pÃºblicamente la app:
        - [x] âœ… Aplicar soluciÃ³n si funciona sin efectos secundarios
        - [x] ðŸ” Revertir cambio(s) de layout para evitar el bug (aunque se pierda alguna mejora)
        - [x] ðŸ“Œ Aceptar el bug como limitaciÃ³n documentada de iOS PWA, si no hay alternativa razonable

- [x] ðŸŒ“ AÃ±adir soporte para modo oscuro (tema `dark` en Tailwind)

  âœ… Subbloque 1: ActivaciÃ³n y toggle global
  - [x] Activar modo `class` en Tailwind
    - [x] Modificar `tailwind.config.js` para usar `darkMode: 'class'`
  - [x] Preparar toggle global (modo manual)
    - [x] Crear composable `useDarkMode.ts` con:
      - [x] Estado reactivo (`isDark`)
      - [x] Persistencia en `localStorage`
      - [x] Funciones `enableDark()`, `disableDark()`, `toggleDark()`
      - [x] DetecciÃ³n inicial del modo por defecto del sistema (`matchMedia`)
    - [x] Aplicar o remover clase `dark` en `<html>` o `<body>` segÃºn estado
    - [x] AÃ±adir botÃ³n en el menÃº lateral (`SideMenu.vue`) para alternar modo claro/oscuro (con colapsable visual integrado)

  ðŸŸ¡ Subbloque 2: RevisiÃ³n completa de migraciÃ³n a clases personalizadas
  - [x] ðŸ§¼ RevisiÃ³n completa de clases de color en la app
    - [x] Inspeccionar todos los elementos clave (SideMenu, botones, tareas, toasts, inputsâ€¦)
    - [x] Detectar y eliminar clases hardcodeadas (`bg-red-500`, `text-white`, etc.)
    - [x] Sustituirlas por clases personalizadas ya definidas en `tailwind.config.js`
    - [x] Confirmar que todas las clases de color visibles provienen del sistema centralizado

  - [x] ðŸ§© Unificar shiftColors.ts usando clases personalizadas text-shift-*
    - [x] AÃ±adir clases text-shift-* en theme.extend.textColor
    - [x] Sustituir en shiftColors.ts los valores light y dark
    - [x] Confirmar aplicaciÃ³n real en modo claro y oscuro
    - [x] Eliminar definiciones anteriores de extend.colors
    - [x] Documentar el uso obligatorio de extend.textColor para clases text-*

  - [x] ðŸ§© Refactor completo de toastColors.ts con clases personalizadas
    - [x] Definir tokens personalizados en tailwind.config.js
    - [x] Sustituir clases base por personalizadas en toastColors.ts
    - [x] Validar visualmente en ambos modos
    - [x] Confirmar funcionamiento de todos los tipos de toast

  ðŸŸ  Subbloque 3: RevisiÃ³n y cierre de la paleta clara
  - [x] ðŸŽ¨ Revisar y cerrar la paleta de colores clara
    - [x] Unificar criterios de colores para botones (hover, tono pastel)
      - [x] Ajustar colores de botones verde, morado y rojo para suavizarlos
      - [x] Validar visualmente la armonÃ­a con los botones azules
    - [x] Revisar duplicados y claves sospechosas
      - [x] Detectar claves redundantes o sospechosas en `colors`, `textColor`, `backgroundColor`, `borderColor`
      - [x] Comprobar si se usan realmente en la app
      - [x] Decidir si eliminar o mantener
    - [x] RevisiÃ³n estructural del `tailwind.config.js`
      - [x] Reordenar bloques por tipo y propÃ³sito (`surface-*`, `status-*`, `toast-*`, etc.)
      - [x] Unificar estilo de comentarios y limpieza estÃ©tica
    - [x] Eliminar claves no utilizadas
    - [x] Probar armonÃ­a general de la paleta (suavidad, contraste, redundancia)
    - [x] Validar la paleta desde la propia app (no Tailwind Play)
    - [x] Documentar la paleta clara como base oficial antes de crear la versiÃ³n oscura

  ðŸ”µ Subbloque 4: DefiniciÃ³n de la paleta oscura
  - [x] AÃ±adir colores oscuros personalizados en `tailwind.config.js`
  - [x] Mantener estÃ©tica suave y legible (no negros puros)
  - [x] Asegurar contraste suficiente con texto e iconos

  ðŸ§ª Subbloque 5: ValidaciÃ³n visual del modo oscuro

  - [x] Aplicar clases dark:* en todos los puntos relevantes:
    - [x] SideMenu.vue â€“ fondos, botones, texto e icono de acordeÃ³n validados
    - [x] App.vue â€“ header, main, y comportamiento global
    - [x] TaskList.vue â€“ fondo visible real, estructura de lista
    - [x] TaskItem.vue â€“ estructura general, inputs, textos y transiciones
    - [x] NewTaskForm.vue â€“ inputs y comportamiento en cabecera
    - [x] TaskFilters.vue â€“ botones y switches de filtros activos
    - [x] ShiftSelector.vue â€“ controles de turno, estilo y contraste
    - [x] Toast.vue â€“ estilos visuales de notificaciones flotantes
    - [x] menuButtonStyle.ts â€“ colores por tipo de acciÃ³n
    - [x] shiftColors.ts â€“ colores por turno
    - [x] toastColors.ts â€“ colores por tipo de notificaciÃ³n

  - [x] Revisar y refinar detalles visuales:
    - [x] Fondo general de la app no cambia en modo oscuro
    - [x] Borde izquierdo de estado en tareas (TaskItem.vue)
    - [x] Botones en tareas individuales:
        - [x] BotÃ³n "Finalizar" / "Reabrir" no cambia de tema
        - [x] BotÃ³n de notificaciÃ³n no adaptado
        - [x] BotÃ³n de eliminaciÃ³n no adaptado
        - [x] Texto de hora de fin con mal contraste
    - [x] BotÃ³n "Iniciar" del formulario (NewTaskForm.vue)
    - [x] Indicador de turno actual en selector (punto verde -> svg reloj)
    - [x] Borde blanco inferior todas las plataformas
    - [x] AÃ±adir bajo filtros un espacio en blanco, para librar con scroll la barra de ios
    - [x] Fondo aplicaciÃ³n (barra superior PWA iOS â€“ status bar) dinÃ¡mico dark/light â€“ revisado y descartado por limitaciÃ³n de plataforma
    - [x] Logo (header y menÃº lateral):
        - [x] Reemplazado `<img>` por SVG inline
        - [x] Color dinÃ¡mico aplicado con `currentColor` y clases `text-*`
        - [x] SVG limpiado y optimizado para mantener huecos y detalles
  - [x] TransiciÃ³n de modo oscuro:
        - [x] Implementar transiciÃ³n global de colores con CSS (`animations.css`)
        - [x] AÃ±adir regla especÃ­fica para `button`, `input` y `textarea` con `!important` para asegurar aplicaciÃ³n
        - [x] Ajustar duraciÃ³n a 300ms como compromiso entre fluidez de tema y respuesta de interacciÃ³n
        - [x] Validar que la animaciÃ³n es coherente en PWA, Android y escritorio
  - [x] Colores modo oscuro muy vibrantes?
      - [x] Ajustar conjunto de botones del menÃº lateral (modo oscuro):
        - [x] Reducir saturaciÃ³n del verde de "Nuevo Turno" sin perder su semÃ¡ntica positiva
        - [x] Unificar tonos de azules en "Compartir", "Importar", "Exportar" con menor luminosidad
        - [x] Desaturar morado de "Opciones" para integrarlo con el resto
        - [x] Validar visualmente todos los botones juntos en contexto real (contraste, jerarquÃ­a, armonÃ­a)
  - [x] Revisar y unificar paleta de toast en modo oscuro:
        - [x] Aumentado contraste en el toast de advertencia (amarillo), ajustando fondo y asegurando legibilidad sin perder funciÃ³n
        - [x] Aclarado ligeramente el fondo del toast de error para evitar tono marrÃ³n poco agradable
        - [x] Unificada jerarquÃ­a visual entre texto, borde, acciÃ³n e icono en todos los toast
        - [x] Eliminadas clases `text-*` especÃ­ficas de los iconos para heredar automÃ¡ticamente el color del texto principal del toast, logrando coherencia visual total
  - [x] Validar legibilidad de iconos sobre botones en modo oscuro:
        - [x] Comprobar si hay pÃ©rdida de visibilidad en iconos de "Reabrir", "Finalizar", "Eliminar", etc.
        - [x] Aplicar ajustes mÃ­nimos al color o luminosidad solo donde haya confusiÃ³n real
        - [x] Validar todos los botones en conjunto, asegurando consistencia e impacto visual
        - [x] Unificar grosor y color de bordes del formulario con los de tareas y filtros en modo oscuro

  - [x] Validar paleta modo oscuro en plataformas
      - [x] Validar en PWA Android (modo oscuro del sistema activado)
      - [x] Validar en APK Android nativo (nueva versiÃ³n desde bundle)
      - [x] Validar en iOS (Safari y PWA)
      - [x] Validar en navegador de escritorio (modo oscuro forzado)
      - [x] Confirmar legibilidad, contraste y coherencia con el modo claro en todos los casos
      - [ ] Corregir bugs visuales detectados en validaciÃ³n multiplataforma
          - [x] Icono de notificar aparece negro en modo claro (debe ser verde)
          - [x] Borde izquierdo de estado se estrecha en tareas con texto largo
          - [x] Botones de primera lÃ­nea se centran verticalmente con texto largo (deben anclarse abajo)
      - [x] Mejorar alineaciÃ³n vertical de fila 2 en tareas:
          - [x] Alinear botÃ³n principal con botones secundarios (notificar y eliminar)
                â†’ Se unificÃ³ la estructura de ambas filas en un Ãºnico contenedor `grid` con `grid-cols-[1fr_auto_auto]` para garantizar la alineaciÃ³n vertical entre columnas.
          - [x] Alinear el bloque de duraciÃ³n ("0.5h") con el bloque de horas (inicioâ€“fin)
                â†’ Ambas celdas se colocaron en `col-start-2` con `justify-self-end` para forzar el alineamiento en columna, sin dependencia de altura.
          - [x] Mantener consistencia visual en tareas con y sin duraciÃ³n
                â†’ Se eliminÃ³ `grid-rows-2` para permitir altura automÃ¡tica de filas y evitar espacio vacÃ­o innecesario. Funciona correctamente con tareas de una o varias lÃ­neas.
          - [x] Validar en tareas con pocas y muchas lÃ­neas
                â†’ Probado visualmente en tareas con diferentes longitudes de descripciÃ³n y presencia o ausencia de tÃ©cnico y duraciÃ³n.
      - [x] TransiciÃ³n de oscuro â†’ claro muy lenta en textos e iconos en iOS PWA (pantalla queda "en blanco" durante varios segundos)
          - [x] Confirmado que el bug solo ocurre al pasar de dark â†’ light, y solo en PWA iOS (Safari y Chrome standalone)
          - [x] Eliminadas transiciones locales (`transition-all`) en algunos textos sin mejora visible
          - [x] Descubierto que la causa era la regla global `* { transition: color, background-color, ... }` en `animations.css`
          - [x] Eliminada la regla global `*` para transiciÃ³n de colores
          - [x] Validado el resultado: el cambio de tema es ahora inmediato, sin flashes ni retardos, y visualmente fluido
          - [x] Se descarta volver a introducir transiciÃ³n global para el cambio de tema; UX mÃ¡s natural sin retardo forzado


  âš™ï¸ Subbloque 6: IntegraciÃ³n opcional con el sistema operativo
  - [x] AÃ±adir preferencia persistente para modo de tema: 'light' | 'dark' | 'system'
  - [x] Detectar modo del sistema en primera carga si no hay preferencia
  - [x] Observar cambios en 'prefers-color-scheme' solo si estÃ¡ en modo 'system'
  - [x] Aplicar clase 'dark' en <html> segÃºn resultado efectivo (usuario o sistema)
  - [x] Implementar UI clara con selector de 3 opciones (Claro / Oscuro / Sistema)
      - [x] Visualizar selecciÃ³n activa
      - [x] Permitir cambiar entre modos fÃ¡cilmente
      - [x] Integrar en SideMenu de forma coherente con diseÃ±o actual

  ðŸ“„ Subbloque 7: DocumentaciÃ³n del modo oscuro
  - [x] Decidir quÃ© aspectos deben documentarse tÃ©cnicamente y cuÃ¡les pueden omitirse
  - [x] Documentar la inicializaciÃ³n temprana del modo oscuro en `main.ts` para evitar render mixto
  - [x] Registrar el diseÃ±o visual y decisiones UI aplicadas al bloque de apariencia (SideMenu, selector de temaâ€¦)
  - [x] Explicar el patrÃ³n tÃ©cnico usado para animaciÃ³n colapsable sin salto (`scrollHeight`, `max-height`, etc.)
  - [x] Justificar el uso de `darkMode: 'class'` en lugar de `'media'` y su integraciÃ³n con preferencia `system`
  - [x] Confirmar que no quedan decisiones sin documentar y hacer commit de cierre del bloque


- [x] ðŸ›  Mejoras UX/UI
  - [x] Vuelve a aparece bug: boton deshacer no hace animacion al pulsar (mÃ³vil devtools). En escritorio funciona bien.
    > AcciÃ³n sugerida (futura): revisar que todos los botones de acciÃ³n en toasts tengan ese @touchstart.
  - [x] Despues de "Borrar todo" + deshacer, al irse el toast hay recarga de la app. Revisar si es necesaria y quitar si no. No ocurre si no deshaces. [20/07/25]
  - [x] Revisar regresiÃ³n: scroll innecesario en listas cortas (Android y PWA)
  > El bug ha reaparecido tras los cambios de layout para evitar el bug visual en iOS. Revisar `min-h`, `overflow`, estructura del main, etc.
  - [x] Corregir zoom con doble tap en chrome/safari de ios 
  - [x] Actualizar prompt de "Borrar todo" a "Â¿EstÃ¡s seguro de que quieres borrar TODAS las tareas de la aplicaciÃ³n? No podrÃ¡n ser recuperadas."
  - [x] Quitar toast de no compartido.
  - [x] Ajustar texto "Compartir" a este formato:
      ðŸ“ ComprobaciÃ³n de seÃ±ales en PLC 22:46 a 23:02 (0.5 h)
      âœ… Notificado
        ðŸ‘·Â J.Â GonzÃ¡lez
  - [x] BotÃ³n "Volver al turno actual" pasar a encima de bloque filtros.
  - [x] ðŸ§± EvoluciÃ³n del sistema de toasts: control de cierre y mÃºltiples acciones
    - [x] DiseÃ±ar la soluciÃ³n para permitir cierre tras tap fuera, soporte de mÃºltiples botones y toasts persistentes
    - [x] Modificar `useToast.ts` para incluir:
        - [x] Propiedad `delayClose` para activar cierre manual por tap fuera
        - [x] Propiedad `persistent` para toasts que no deben cerrarse automÃ¡ticamente
        - [x] Propiedad `actions[]` para mÃºltiples botones de acciÃ³n
    - [x] Modificar `Toast.vue` para:
        - [x] Detectar y renderizar correctamente un Ãºnico botÃ³n desde `actions[]`
        - [x] Renderizar mÃºltiples botones si `actions.length > 1`
        - [x] Eliminar soporte anterior de `action` (singular)
        - [x] Mantener compatibilidad visual, animaciÃ³n y botÃ³n de cierre `âœ•`
    - [x] Actualizar llamadas a `add(...)` en toasts con botÃ³n "Deshacer"
        > AÃ±adir `delayClose: true` y ajustar duraciÃ³n si es necesario
    - [x] Documentar en `dev-notes.md`:
        - [x] Nuevas propiedades del tipo `Toast` (`delayClose`, `persistent`, `actions[]`)
        - [x] JustificaciÃ³n del comportamiento UX aplicado a toasts con botÃ³n "Deshacer"
        - [x] PreparaciÃ³n para futura implementaciÃ³n del toast con botones "Ayer / Hoy"
        - [x] PreparaciÃ³n para futura implementaciÃ³n del toast persistente tipo banner
    - [x] Verificar el comportamiento en todos los modos y plataformas
        > Asegurar que toasts simples, con acciÃ³n Ãºnica y mÃºltiples siguen funcionando correctamente
    - [x] Hacer commit final del bloque
  - [x] AÃ±adir mensaje placeholder cuando no hay tareas visibles
    - [x] Mostrar mensaje segÃºn contexto: filtros activos / turno anterior vacÃ­o / turno actual vacÃ­o
    - [x] Detectar turno anterior comparando titleId â‰  currentShiftId
    - [x] Mantener visible el tÃ­tulo del turno aunque no tenga tareas
    - [x] Aplicar animaciÃ³n fade+scale al cambiar de mensaje
    - [x] Ajustar estilos para evitar salto visual tras animaciÃ³n
  - [x] Evaluar necesidad del botÃ³n "X" para cerrar el menÃº lateral
        - [x] Confirmado que su presencia mejora la accesibilidad y claridad para todo tipo de usuarios
        - [x] Se mantiene el cierre por tap fuera como opciÃ³n adicional
  - [x] Quitar active de botones al soltar (movil) [opciones y otros se quedan active]
      - [x] DiagnÃ³stico del bug en dispositivos tÃ¡ctiles y anÃ¡lisis de causa
      - [x] CreaciÃ³n de `buttons.css` con clases estÃ¡ticas `@apply` y condicionales `@media (hover: hover)`
      - [x] AdaptaciÃ³n del botÃ³n â€œIniciarâ€ como prueba inicial
      - [x] SustituciÃ³n de todos los botones del menÃº lateral (`SideMenu`)
      - [x] RefactorizaciÃ³n de botones de tipo icono (`notificar`, `eliminar`)
      - [x] AdaptaciÃ³n de botones de acciÃ³n y cierre de toast (feedback completo)
      - [x] AdaptaciÃ³n de botones â€œFinalizar / Reabrirâ€ con efecto de transiciÃ³n sin flash
      - [x] EliminaciÃ³n de `menuButtonStyles.ts` y funciones asociadas
      - [x] Limpieza final y validaciÃ³n en PWA, mÃ³vil y escritorio
  - [x] Campo de notas del turno bajo las tareas
    - [x] ðŸ“Œ PlanificaciÃ³n y anÃ¡lisis inicial
        - [x] Validar diseÃ±o deseado y confirmar encaje visual y funcional con TaskList.vue
        - [x] Confirmar modelo de datos: almacenamiento separado en `notesByShiftId`
        - [x] Confirmar integraciÃ³n con exportaciÃ³n/importaciÃ³n y retrocompatibilidad
        - [x] Registrar decisiÃ³n de diseÃ±o: lista de inputs encadenados sin botÃ³n â€œ+â€
              - Autoguardado al hacer blur
              - Siempre un input vacÃ­o al final
              - Borrar un campo elimina la nota
              - Si se vacÃ­an todas, se elimina completamente el bloque
              - DiseÃ±o limpio, sin botones, con foco mÃ³vil-friendly
    - [x] ðŸ” RevisiÃ³n del sistema actual
        - [x] Revisar cÃ³mo se obtiene y organiza la lista de tareas por turno en `TaskList.vue`
        - [x] Confirmar que `shiftId` actual estÃ¡ disponible en el contexto de la lista
        - [x] Confirmar dÃ³nde insertar el nuevo bloque de notas: debajo de tareas y del mensaje de â€œturno vacÃ­oâ€
    - [x] ðŸ§± ImplementaciÃ³n funcional
        - [x] Crear nuevo composable `useNotes.ts` para gestionar `notesByShiftId` en localStorage
            - [x] Funciones: `getNotesForShift()`, `setNotesForShift()`, `deleteNotesForShift()`
            - [x] Guardar un array de strings `string[]` por `shiftId`
    - [x] AÃ±adir al final de `TaskList.vue` un bloque colapsable â€œðŸ—’ï¸ Notas del turnoâ€
        - [x] Mostrar expandido si existe nota; colapsado si no  â† manejado por usuario
        - [x] Estilo tipo tarjeta, coherente con diseÃ±o de tareas
        - [x] Comportamiento de acordeÃ³n reutilizable del bloque de apariencia
    - [x] Crear componente de lista de inputs encadenados
        - [x] Mostrar cada nota como un campo editable independiente
        - [x] Siempre renderizar un campo vacÃ­o al final
        - [x] Al hacer blur en campo vacÃ­o con texto â†’ guardar y aÃ±adir nuevo campo
        - [x] Al hacer blur en campo existente con texto â†’ actualizar
        - [x] Al hacer blur en campo existente vacÃ­o â†’ eliminar
        - [x] Aplicar feedback visual leve (placeholder, opacidad, bordes)
    - [x] ðŸ”„ IntegraciÃ³n con exportaciÃ³n / importaciÃ³n
        - [x] AÃ±adir `notesByShiftId` como propiedad opcional en el JSON exportado
        - [x] Adaptar sistema de importaciÃ³n para detectar y restaurar notas si existen
        - [x] Mantener compatibilidad con backups antiguos (sin la clave)
        - [x] ðŸž CorrecciÃ³n de bugs en import/export de notas
            - [x] No se exportaban notas correctamente si no se usaba shiftId vÃ¡lido
            - [x] No se limpiaban notas al hacer "Borrar todo"
            - [x] Error al importar JSON nuevo con notas (`.map is not a function`)
            - [x] El turno actual no muestra notas tras importar JSON con notas (hasta recarga o cambio de turno)
            - [x] El listado de turnos ignora turnos con notas pero sin tareas (debe incluirlos)
            - [x] El turno actual tras importar JSON no siempre es el mÃ¡s reciente (no considera turnos con solo notas)
            - [x] Tras "Borrar todo", las notas del turno actual se mantienen en pantalla hasta recarga
            - [x] El estado colapsado/expandido de las notas se mantiene entre turnos (Â¿debe reiniciarse si hay notas o no?)
            - [x] El botÃ³n "Deshacer" de "Borrar todo" restaura tareas pero no notas
    - [x] ðŸ“¤ IntegraciÃ³n con compartir (texto plano)
        - [x] Si existe nota para el turno exportado, aÃ±adir bloque al final:
              "ðŸ—’ï¸ Notas:
                - Avisar a mantenimiento sobre bomba 2
                - Revisar PLC de empaquetadora"
        - [x] Asegurar formato legible, indentado, sin romper la estructura actual
    - [x] ðŸ§± Mejoras visuales y estructurales del bloque de notas del turno
        - [x] Sustituir la animaciÃ³n actual de scale en el botÃ³n de tÃ­tulo por una transiciÃ³n mÃ¡s adecuada (e.g. cambio de fondo o icono giratorio suave)
        - [x] Ajustar tamaÃ±o y peso visual del icono del tÃ­tulo para que coincida con el placeholder ("Notas del turno" cuando no hay tareas)
        - [x] Corregir el margen izquierdo excesivo del botÃ³n de tÃ­tulo (alinearlo con tareas o inputs)
        - [x] AÃ±adir un separador visual en la parte superior del bloque de notas (finalmente cambio de color de fondo)
        - [x] AÃ±adir un indicador visual junto al tÃ­tulo cuando haya notas guardadas (incluso si estÃ¡ colapsado)
        - [x] Revisar contraste y legibilidad del bloque en modo claro y oscuro
    - [x] ðŸ§± RediseÃ±o del bloque de inputs de notas (estÃ©tica y compacidad)
        - [x] Unificar visualmente los campos de nota como una lista editable coherente, no inputs separados (estilo mÃ¡s compacto)
        - [x] Reducir intensidad de bordes individuales de cada nota (usar bordes mÃ¡s sutiles o solo lÃ­neas inferiores)
        - [x] Asegurar que el fondo de los inputs en modo oscuro sea coherente (no blanco)
        - [x] Ajustar paddings, mÃ¡rgenes internos y separaciÃ³n vertical para lograr una presentaciÃ³n mÃ¡s compacta (como en las tareas)
        - [x] Validar que al aÃ±adir muchas notas (4â€“6) el bloque sigue siendo visualmente compacto y funcional
        - [x] Sustituir inputs por textarea de una lÃ­nea para permitir expansiÃ³n de notas largas sin truncado
    - [x] ðŸ§± RevisiÃ³n general de alineaciÃ³n y espaciado
        - [x] Verificar alineaciÃ³n vertical del bloque completo con respecto a las tareas
        - [x] Ajustar mÃ¡rgenes horizontales para que coincida con los elementos contiguos (tareas, filtros)
        - [x] Validar espaciado vertical entre notas, tareas, placeholder y el bloque colapsado
        - [x] Corregir salto visual al colapsar/desplegar el bloque de notas (animaciÃ³n fluida con escalÃ³n mÃ­nimo)
        - [x] Igualar ancho del bloque de inputs al de las tarjetas de tareas (para coherencia visual)
        - [x] AÃ±adir indentaciÃ³n a las notas y una lÃ­nea vertical como las hojas de cuaderno (estÃ©tica final)
    - [x] âœ… Verificaciones finales
        - [x] Validar visualmente en escritorio, PWA Android, APK Android, PWA iOS
        - [x] Validar scroll y comportamiento en tareas largas o turnos vacÃ­os
        - [x] Validar que no afecta a rendimiento ni a otras partes del layout
        - [x] Validar backups antiguos y nuevos, con y sin notas
        - [x] Validar exportaciÃ³n/importaciÃ³n con notas presentes y ausentes
    - [x] ðŸ“š DocumentaciÃ³n tÃ©cnica
        - [x] AÃ±adir secciÃ³n en `dev-notes.md` describiendo el sistema de notas por turno
              - Composable `useNotes.ts`: estructura y persistencia
              - IntegraciÃ³n en `TaskList.vue` con bloque colapsable editable
              - Comportamiento UX: autoguardado, input encadenado, borrado
              - ExportaciÃ³n, importaciÃ³n y compatibilidad con backups antiguos
    - [x] ðŸ§¼ Limpieza y commit
        - [x] Confirmar que todo funciona y estÃ¡ documentado si procede
        - [x] Hacer commit Ãºnico (`feat: aÃ±adir campo de notas del turno como lista editable asociada a shiftId`)
  - [x] Propuesta de iconos rellenos para turnos m/t/n revisada y descartada por romper la coherencia del diseÃ±o (uso exclusivo de iconos outline)
  - [x] Revisar cambio en tamaÃ±os al cambiar en sistema ios/android/desktop.
      - [x] Android: validado hasta tamaÃ±o mÃ¡ximo en emulador. Layout se adapta sin errores ni solapes, aunque se pierde elegancia visual a partir de tamaÃ±o 4/7.
      - [x] iOS: la opciÃ³n de accesibilidad del sistema no se propaga a PWA, pero sÃ­ lo hace el ajuste de texto de Safari, aplicÃ¡ndose tambiÃ©n en la PWA tras recarga.
      - [x] Escritorio: zoom hasta 175% mantiene estructura; scroll en el sidemenu aparece correctamente sin comprometer la funcionalidad.
  - [x] Al importar un archivo se conservaban notas antiguas: solucionado aÃ±adiendo deleteAllNotes() antes de setAllNotes() para limpiar el estado anterior correctamente
  - [x] Icono personalizado estilo heroicons svg inline de sol naciente para turno maÃ±ana. Y sol normal para tarde.
    - [x] Crear e integrar nuevo icono svg tipo heroicons representando el amanecer
    - [x] Normalizar nombres de iconos de turno: usar `morning`, `afternoon`, `night` en `shiftIcons` y `getShiftIcon()`
    - [x] Revisar consistencia de colores entre los iconos de turno maÃ±ana, tarde y noche
    - [x] Revisar bug: al importar un archivo sin notas, no se eliminaban las notas antiguas, lo que mantenÃ­a turnos obsoletos
  - [x] Campos descripcion, tÃ©cnico y horas en tareas en darkmode tienen fondo blanco y texto blanco. Igual a NewTaskForm.vue
  - [x] RediseÃ±o y comportamiento del botÃ³n "Volver al turno actual"
    - [x] Crear clase `btn-shift` en `buttons.css` con estilo coherente con el resto de botones
    - [x] Aplicar clase `btn-shift` al botÃ³n, unificando altura, padding y transiciÃ³n
    - [x] Refactor: desacoplar lÃ³gica de UI creando `handleAction('returnToCurrent')` en App.vue
    - [x] Delegar la acciÃ³n real en `handleMenuAction()` como en `SideMenu`
    - [x] AÃ±adir retardo intencionado (`setTimeout(350ms)`) para permitir feedback visual completo
  - [x] AÃ±adir splash para PWA iOS sin perder la de Android
    - [x] Generar 43 splash screens iOS desde Progressier
    - [x] AÃ±adir rutas absolutas en los 'link rel="apple-touch-startup-image"'
    - [x] AÃ±adir las meta-etiquetas 'apple-mobile-web-app-capable' y 'mobile-web-app-capable'
    - [x] Cambiar background_color del manifest para adaptar fondo del icono en Android
    - [x] Validar comportamiento en iOS (iPhone 16 Pro y X), Huawei Android 10 y emuladores
  - [x] Solucionar error de detecciÃ³n del manifiesto PWA en los previews protegidos de Vercel (ver 'dev-notes.md')
  - [x] Formato horario 12h/24h en Android: se respeta configuraciÃ³n del sistema (sin forzar)
  - [x] Opcion mostrar duracion tiempo decimal - hh:mm. Y decidir tamaÃ±o fraccion. Decidir opcion por defecto. Revisado y bloque nuevo.
  - [x] ðŸ“ Revisar safe areas para notches y barras flotantes
      - [x] ValidaciÃ³n en dispositivos reales (iOS y Android)
          - [x] iPhone 16 Pro / X: perfecto
          - [x] Huawei Android 10 / Pixel 4 y 7: correcto
          - [x] Medium Phone API 36: header pisado, versiÃ³n muy pegada abajo
      - [x] Ajuste en header con safe-area superior
          - [x] AÃ±adir `padding-top: env(safe-area-inset-top)` solo al `<header>`
          - [x] Confirmar que no afecta a iOS ni dispositivos que ya estaban correctos
          - [x] Aplicar `min-height: calc(100svh - var(--safe-area-inset-top) - 68px)` al `<main>`
      - [x] Ajuste en footer del SideMenu
          - [x] Subir visualmente el bloque de versiÃ³n (`Notifica v...`) con `pb-3` fijo
          - [x] Evitar `safe-area-inset-bottom` por ser excesivo en iOS
      - [x] Activar soporte real de safe areas en Android
          - [x] Instalar `@capacitor-community/safe-area`
          - [x] Configurar `capacitor.config.ts`
          - [x] Aplicar `setStatusBar` y `setNavigationBar` en `main.ts`
          - [x] Confirmar comportamiento correcto de barras superior/inferior
          - [x] Evitar scroll fantasma ajustando altura del `<main>`
      - [x] Ajuste del SideMenu tras mover header con safe-area
          - [x] AÃ±adir style dinÃ¡mico `padding-top: var(--safe-area-inset-top)` a `DialogPanel`
          - [x] Usar `ref` y `onMounted` para aplicar el padding solo en Android nativo
          - [x] Confirmar alineaciÃ³n correcta en escritorio/devtools
          - [x] Confirmar comportamiento aceptable en Android (desalineaciÃ³n leve aceptada)
      - [x] â›” Inconsistencias aÃºn presentes (pendientes de revisiÃ³n futura)
          - [x] Al abrir la app por primera vez en Android, no se aplica la safe-area superior  
                â†’ Se mantiene `initialize()` para inyectar variables CSS desde el inicio.  
                â†’ No es posible aplicar `--safe-area-inset-top` en primera carga por limitaciÃ³n del WebView Android con Capacitor.  
                â†’ Tras mÃºltiples intentos controlados (input invisible, visualViewport, reflow forzadoâ€¦), se documenta como bug estructural no solucionable desde JS.  
                â†’ El valor se aplica tras interacciÃ³n del usuario y el layout se corrige automÃ¡ticamente.
          - [x] El `DialogPanel` sigue desalineado verticalmente en Android tras la primera apertura
            > No es posible alinear dinÃ¡micamente el SideMenu en Android WebView usando safe-area-inset-top, ni por CSS ni JS, debido a limitaciones del entorno. Se descarta plugin capacitor-community/safe-area.
          - [x] Solucionar el aspecto de la app en Android nativo
              - [x] Revertir pruebas actuales (useSafeArea.ts, mÃ¡rgenes, etc.)
              - [x] Eliminar el plugin SafeArea del proyecto
              - [x] Eliminar todas las referencias a var(...) o env(...)
              - [x] Test multiplataforma de punto estable
              - [x] Probar StatusBar.overlaysWebView de forma limpia
                > descartado: mismo comportamiento inconsistente que plugin SafeArea, sin mejora real
              - [x] Probar @capawesome/capacitor-android-edge-to-edge-support para solucion en android nativo
                  - [x] Instalar plugin y probar con configuraciÃ³n mÃ­nima
                  - [x] Comprobar recorte correcto en dispositivos edge-to-edge
                  - [x] Detectar recorte incorrecto en API 29 y color blanco/gris en barras
                  - [x] Probar llamadas del plugin StatusBar y descartar incompatibilidades
                  - [x] Probar setBackgroundColor() del plugin edge-to-edge con color rojo para trazabilidad
                  - [x] Comprobar que el color se aplica correctamente desde el plugin
                  - [x] Detectar que fondo por defecto viene del WebView o capa inferior
                  - [x] Aplicar fondo lime en body/html/app para detectar capas internas
                  - [x] Confirmar que el color depende del tema pero no es dinÃ¡mico
                  - [x] Extraer color de fondo de Tailwind en tiempo real y pasarlo como background al plugin
                  - [x] Detectar fallo por uso en entorno web sin check de plataforma
                  - [x] Aplicar fix con Capacitor.getPlatform() === 'android'
                  - [x] AÃ±adir watch en useDarkMode para actualizar background dinÃ¡micamente
                  - [x] Confirmar funcionamiento dinÃ¡mico en tiempo real al cambiar tema
                  - [x] Ajustar clases bg-surface-1 para integrar visualmente con el header
              - [x] Descartado: Si no funciona: decidir si implementar padding fijo solo en Android nativo
              - [x] Probar `@capgo/capacitor-navigation-bar` para ajustar fondo e iconos de la barra de navegaciÃ³n inferior si fuera necesario
              - [x] Probar `@capacitor/status-bar` para ajustar dinÃ¡micamente el color de los iconos de la status bar segÃºn el tema de la app
                > DepuraciÃ³n de edge-to-edge y android nativo migrado a etapa 10.
  - [x] Al desplegar opciones, el SideMenu crece en altura y se hace scrolleable. Esta bien (fallback pantallas pequeÃ±as y pantalla horizontal), pero intentar limitar scroll elÃ¡stico, solo scroll necesario.  
    > Solucionado al pasar opciones a un modal independiente.
  - [x] Texto plano compartido: a veces las horas/duracion aparece bajo la descripcion y otras en la misma linea. Revisar y unificar (siempre siguiente linea, posible icono reloj o sin el)
  - [x] Rewording: Â¿Cambiar "Registered" por "Logged"?
  - [x] Mini rewording lingÃ¼Ã­stico en inglÃ©s: simplificaciÃ³n de textos redundantes, mejora de naturalidad y consistencia UX (import, export, clipboard, deleteAll, unimplemented, update)


- [x] ðŸ“„ Actualizar `README.md` con informaciÃ³n final  
  - [x] AÃ±adir descripciÃ³n del nuevo sistema de notificaciones flotantes (toasts propio)  
  - [x] AÃ±adir menciÃ³n al campo de notas del turno, editable por shift  
  - [x] AÃ±adir soporte de modo claro/oscuro con detecciÃ³n automÃ¡tica o preferencia de usuario  
  - [x] Eliminar todas las referencias a `vue-sonner`  
  - [x] Confirmar que la lista de tecnologÃ­as y estructura de carpetas estÃ¡ actualizada  
  - [x] RevisiÃ³n de bloques generales del readme (descripciÃ³n, carÃ¡cterÃ­sticas, etc)
  - [x] Revalidar los resultados de Lighthouse (o eliminarlos si ya no son representativos) - eliminados 
  - [x] Revalidar y ajustar el texto sobre la versiÃ³n APK (aÃ±adir enlace si ya estÃ¡ publicada)  
  - [x] ðŸ–¼ï¸ Actualizar capturas de la app (README, manifest y Play Store)
    - [x] Generar nuevas capturas representativas con el diseÃ±o actual
          - [x] 19 capturas nuevas - lista en dev-notes
    - [x] Reemplazar imÃ¡genes del README por las nuevas capturas
    - [x] Sustituir archivos del directorio `public/screenshots/` usados por el manifest y `public/screenshots-playstore/`
    - [x] Subir las nuevas capturas a la ficha de la Play Store (cuando se publique la APK)

- [x] ðŸ“£ PreparaciÃ³n para fase de testing real con usuarios externos 
  - [x] Revisar si la app (actual `.aab` y entorno) estÃ¡ ya en estado adecuado para compartir en prueba cerrada
        â†ª [Checklist en dev-notes.md](dev-notes.md#-revisiÃ³n-del-aab-antes-de-lanzar-testing-externo)
          - [x] Confirmar si el bug del scroll innecesario en listas cortas ha sido resuelto sin introducir nuevas regresiones
          - [x] Asegurar que el selector de turno es visible en listas largas y no queda fuera de pantalla
          - [x] Finalizar revisiÃ³n y posible soluciÃ³n del bug visual en PWA iOS (doble tap en Ã¡rea vacÃ­a)
          - [x] Implementar soporte para modo oscuro o decidir posponerlo con documentaciÃ³n adecuada
    - [x] Si no lo estÃ¡, priorizar tareas mÃ­nimas necesarias para dejarla lista cuanto antes  
    - [x] Confirmar el canal de publicaciÃ³n para testing: prueba cerrada
    - [x] Revisar ficha de app en Google Play Console:
          - [x] Nombre, descripciÃ³n, capturas, icono.
          - [x] PolÃ­tica de privacidad: [Privacy Policy](https://jcpaezd.github.io/notifica/privacy-policy.md)
          - [x] Corregir tamaÃ±os de capturas en manifest para PWA
          - [x] Asegurar que el idioma por defecto y fallback en el manifest y Play Console es espaÃ±ol
  - [x] Enviar para revisiÃ³n de Google Play Console.
  - [x] Aprovechar el periodo de test activo para seguir refinando el resto de tareas de la Etapa 8
  - [x] Medir respuesta de testers externos y ajustar si es necesario
  - [x] Solicitar acceso a producciÃ³n en Google Play Console tras completar test cerrado [01/09/2025-0:50]
  - [x] Asegurar que cumple requisitos de Google Play para lanzamiento pÃºblico (12 testers activos durante 14 dÃ­as). Solicitud de acceso a producciÃ³n aceptada [01/09/2025-17:30].
  - [x] Crear utilidad para generar datos mock (script + listas) para capturas y pruebas
  - [x] Actualizar todas las capturas en `/public/screenshots/` (README, manifest, Play Store) antes de la prÃ³xima versiÃ³n estable de Android
  - [x] Actualizar ficha Play Store con nueva(s) feat (rewording, multidioma, capturas, etc) y lanzar actualizacion.
  - [x] Revisar restricciones de orientaciÃ³n/redimensionamiento para compatibilidad con tablets y plegables (Android 16+).
      * Verificado, no crÃ­tico. Migrado a etapa 10.

- [x] âœï¸ Revisar wording para ampliar pÃºblico potencial
  - [x] Inventario de textos de la UI
    - [x] Extraer todos los textos visibles (botones, menÃºs, placeholders, labels, toasts, modales, exportaciÃ³n)
    - [x] Documentarlos en `docs/rewording-ES.md`
  - [x] Propuesta de alternativas
    - [x] Detectar tÃ©rminos potencialmente confusos o demasiado especÃ­ficos (â€œAvisoâ€, â€œTÃ©cnicosâ€)
    - [x] Proponer variantes mÃ¡s genÃ©ricas/claras (â€œDescripciÃ³nâ€, â€œResponsablesâ€)
        - [x] Revisar uso de â€œTurno / Nuevo Turnoâ€
          - âœ… Sustituir por â€œTramo / Nuevo Tramoâ€
        - [x] Revisar uso de â€œTÃ©cnico(s) / AÃ±adir tÃ©cnicoâ€
          - âœ… Sustituir por â€œAsignado aâ€¦ / Asignar aâ€¦â€
        - [x] Revisar uso de â€œAviso / Nuevo avisoâ€
          - âœ… Sustituir por â€œDescripciÃ³nâ€ (solo en placeholder del campo)
          - âœ… Mantener â€œTarea(s)â€ en el resto de la app
        - [x] Revisar uso de â€œNotificada / Sin notificar / NotificaciÃ³n anuladaâ€
          - âœ… Sustituir por â€œRegistrada / Sin registrar / Registro anuladoâ€
          - âœ… Mantener â€œNotificaâ€ como nombre de la aplicaciÃ³n (marca), no ligado estrictamente a este estado
        - [x] Revisar uso de â€œFinalizar / Reabrirâ€
          - âœ… Mantener â€œFinalizar / Reabrirâ€ sin cambios
        - [x] Revisar mensajes de sistema demasiado tÃ©cnicos (ej. â€œEl archivo no contiene una lista vÃ¡lida de tareasâ€)
          - âœ… Definir marco comÃºn:
             - Tono: Neutro / Semi-tÃ©cnico
             - Estilo: 
               - 2Âª persona para errores que requieren acciÃ³n del usuario (â€œIntroduceâ€¦â€, â€œRevisaâ€¦â€)
               - Impersonal para mensajes de estado o confirmaciÃ³n (â€œArchivo generado.â€, â€œTurno comenzadoâ€¦â€)
          - âœ… Mensajes simples y concisos, sin detalles tÃ©cnicos innecesarios ni explicaciones largas
        - [x] Revisar prefijo de exportaciÃ³n â€œnotifica-tareasâ€
          - âœ… Sustituir por â€œnotifica-backup-YYYY-MM-DD.jsonâ€
          - âœ… Corto, reconocible y usado en apps modernas incluso en espaÃ±ol
        - [x] Revisar placeholders y encabezados largos (â€œNotas del turnoâ€, â€œ[Sin descripciÃ³n]â€)
          - âœ… Sustituir â€œNotas del turnoâ€ por â€œNotasâ€
          - âœ… Sustituir â€œ[Sin descripciÃ³n]â€ por â€œ(Sin descripciÃ³n)â€
        - [x] Revisar tÃ©rminos de accesibilidad (â€œEstado de notificaciÃ³nâ€)
          - âœ… Unificar con las mismas reglas de tono y terminologÃ­a del rewording general
          - âœ… Usar etiquetas claras y consistentes con la UI visible (ej. â€œEstado de registroâ€, â€œEliminar tareaâ€, â€œCerrar notificaciÃ³nâ€)
  - [x] Mantener consistencia con notas, tareas y filtros
  - [x] Wording final documentado y validado en docs/rewording-ES.md
    - [x] Revisar y actualizar docs/rewording-ES.md bloque por bloque con las decisiones del roadmap
    - [x] Validar claridad con criterios internos (Â¿se entiende sin manual? Â¿es neutral para distintos perfiles?)
    - [x] Cerrar lista definitiva en `docs/rewording-ES.md`
  - [x] ImplementaciÃ³n de cambios
    - [x] Sustituir textos en componentes (inputs, botones, menÃºs, filtros)
    - [x] Actualizar textos en exportaciÃ³n e importaciÃ³n
    - [x] Revisar documentaciÃ³n (`README.md`, capturas si procede)
  - [x] ValidaciÃ³n en entorno real
    - [x] Revisar PWA en mÃ³vil (claro/oscuro, offline)
    - [x] Revisar APK Android
    - [x] Confirmar comprensiÃ³n en contexto (sin necesidad de explicaciÃ³n)

- [x] ðŸŒ AÃ±adir soporte multidioma (espaÃ±ol e inglÃ©s)
  - [x] Elegir estrategia de internacionalizaciÃ³n
    - [x] Revisar opciones: `vue-i18n`, objeto propio reactivo, soluciÃ³n mÃ­nima
    - [x] Documentar ventajas/inconvenientes de cada mÃ©todo
    - [x] Tomar decisiÃ³n final (aprender el razonamiento aunque ya estÃ© claro usar `vue-i18n`)
  - [x] Configurar infraestructura i18n
    - [x] Instalar y configurar `vue-i18n` en `main.ts`
    - [x] Crear carpeta `locales/` con `es.ts` y `en.ts` iniciales
    - [x] Definir convenciÃ³n Ãºnica de claves (basada en `rewording-ES.md`)
      - JerarquÃ­a fija por tipo (`btn`, `menu`, `shift`, `task`, `toast`, `dialog`, `filter`, `aria`, `tooltip`, `placeholder`, `header`, `title`, `share`, `export`).
      - Estilo: inglÃ©s, camelCase en Ãºltimo nivel, profundidad mÃ¡x. 3.
      - ParÃ¡metros dinÃ¡micos con `{nombre}` en minÃºsculas (`{count}`, `{description}`, â€¦).
      - Plurales usando sintaxis de `vue-i18n`.
      - Branding â€œNotificaâ€ no se traduce.
  - [x] Integrar textos en sistema de traducciÃ³n
    - [x] Volcar `ES final` desde `docs/rewording-ES.md` a `es.ts`
      - [x] Bloque 1
      - [x] Bloque 2
      - [x] Bloque 3
        - [x] Parte 1 (lÃ­neas 1â€“20)
        - [x] Parte 2 (lÃ­neas 21â€“40)
        - [x] Parte 3 (lÃ­neas 41â€“60)
        - [x] Parte 4 (lÃ­neas 61â€“80)
        - [x] Parte 5 (resto)
      - [x] Bloque 4
      - [x] Bloque 5
      - [x] Bloque 6
    - [x] Crear `en.ts` con traducciÃ³n inicial de todos los textos
    - [x] Sustituir textos hardcodeados en componentes por claves i18n
      - [x] i18n: sustituir textos en SideMenu.vue (lÃ­neas 92â€“101 del checklist)
      - [x] i18n: sustituir textos en App.vue (lÃ­neas 1â€“30 del checklist)
      - [x] i18n: sustituir textos en App.vue (lÃ­neas 31â€“60 del checklist)
      - [x] i18n: sustituir textos en App.vue (lÃ­neas 61â€“86 del checklist)
      - [x] i18n: sustituir textos en NewTaskForm.vue (lÃ­neas 87â€“90 del checklist)
      - [x] i18n: sustituir textos en ShiftSelector.vue (lÃ­nea 91 del checklist)
      - [x] i18n: sustituir textos en TaskItem.vue (lÃ­neas 102â€“110 del checklist)
      - [x] i18n: sustituir textos en TaskList.vue (lÃ­neas 111 y 117 del checklist)
      - [x] i18n: sustituir textos en Toast.vue (lÃ­nea 118 del checklist)
    - [x] Manejar casos con parÃ¡metros dinÃ¡micos (`{count}`, `{description}`â€¦) y plurales
    - [x] Crear toggle provisional ES/EN para pruebas en mÃ³vil
    - [x] Validar sistema i18n completo (desktop, PWA y APK)
      - [x] Apariencia e Idioma en opciones
      - [x] Placeholders de tareas vacias (3) y fallback de titulo (default) en props de TaskList.vue
      - [x] Dias lun->mon etc. En selector de turnos y 'Viendo turno'
      - [x] Mensaje confirmacion de eliminar tarea
      - [x] Sustituir textos hardcodeados de â€œTurno Actualâ€, â€œTurno del {date}â€ y â€œTurno del {label}â€ en App.vue
      - [x] Sustituir textos hardcodeados en exportaciÃ³n/compartir:
        - "Notificado" â†’ usar clave i18n (Registrado / Registered)
        - Conector "a" entre horas â†’ usar clave i18n
      - [x] Unificar formatos de fechas y horas en exportaciÃ³n/compartir segÃºn i18n (no navegador)
      - [x] Localizar formato de duraciÃ³n (coma/punto) en exportaciÃ³n/compartir segÃºn i18n
      - [x] Revisar y aplicar el mismo criterio de i18n en TaskItem.vue (horas inicio/fin y duraciÃ³n)
    - [x] AÃ±adir selector de idioma
      - [x] Toma de decisiones sobre formato, ubicaciÃ³n y estilo del selector (modal centrado, botones ES/EN/Sistema, cambio de nombre a Ajustes/Settings)
      - [x] Implementar modal reutilizando la base de Nocta (centrado, escalable)
        - [x] Migrar API de props open/onClose a v-model:open con defineEmits
        - [x] Adaptar colores de fondo y texto al sistema de superficies de Notifica (bg-surface, text-*)
        - [x] Revisar estilo de overlay (color, blur) para integrarlo con Notifica
        - [x] Homogeneizar sombras y bordes con el resto de la app
        - [x] Revisar animaciones: mantener o integrar con animations.css
        - [x] Mejorar accesibilidad (atributos role, aria-modal)
      - [x] Refactor: trasladar Apariencia e Idioma del SideMenu al nuevo modal de Ajustes
        - [x] Reemplazar acciÃ³n de "Opciones" para que abra el modal de Ajustes (y cierre el SideMenu si procede)
        - [x] Corregido bug de hover/active residual migrando Modal a Headless UI (UX mÃ³vil)
        - [x] Cambiar wording de Opciones a Ajustes (Options>Settings)
        - [x] Incluir tÃ­tulo accesible en el slot del modal mediante <DialogTitle as="h2" id="modal-title">
        - [x] Trasladar bloque de Apariencia desde SideMenu al modal
        - [x] Trasladar bloque de Idioma desde SideMenu al modal
        - [x] Eliminar bloques antiguos de Apariencia e Idioma en SideMenu y limpiar lÃ³gica sobrante
        - [x] Revisar estilos internos de Apariencia e Idioma para adaptarlos al nuevo contenedor
            - [x] Ajustar franja superior del tÃ­tulo con fondo diferenciado y borde inferior
            - [x] AÃ±adir separador `<hr>` entre Apariencia e Idioma
            - [x] Reordenar Apariencia a Sistema â†’ Claro â†’ Oscuro
            - [x] Pasar Apariencia a `grid grid-cols-3 gap-2` con ajustes responsive px/gap
            - [x] Pasar Idioma a `grid grid-cols-3 gap-2` con botÃ³n AUTO deshabilitado como placeholder
            - [x] Ajustar jerarquÃ­a de tÃ­tulos: Ajustes (`text-2xl`, `w-7 h-7`) y secciones (`text-base font-semibold`, `w-5 h-5`)
            - [x] Validar en PWA/iPhone que `text-2xl` no es excesivo en pantallas pequeÃ±as
            - [x] AÃ±adir botÃ³n cerrar ("x" en cabecera)
            - [x] Confirmar consistencia visual con TaskList y Notas
            - [x] Confirmar visualizaciÃ³n correcta en dark/light mode
            - [x] Confirmar que todas las claves i18n funcionan (excepto AUTO, hardcodeado temporalmente)
        - [x] Validar apertura/cierre correcto del modal desde el SideMenu
        - [x] Validar accesibilidad completa (aria-labelledby apunta al tÃ­tulo)
      - [x] Implementar 'sistema' en el selector de idioma con 3 botones (ES, EN, Sistema)
      - [x] Validar persistencia de idioma elegido en localStorage
      - [x] Validar en PWA y APK: funcionamiento correcto del modal, selector y textos en ambos idiomas
  - [x] ValidaciÃ³n y pruebas
    - [x] Revisar PWA en mÃ³vil en ambos idiomas (claro/oscuro, offline)
    - [x] Revisar APK en Android (y iOS si se compila mÃ¡s adelante)
    - [x] Confirmar que no se rompen diseÃ±os con textos largos o diferentes por idioma
  - [x] DocumentaciÃ³n y cierre
    - [x] Explicar en `dev-notes.md` cÃ³mo aÃ±adir/editar traducciones existentes
    - [x] Explicar en `dev-notes.md` cÃ³mo introducir textos nuevos en la app usando i18n
    - [x] Actualizar `README.md` con nota sobre multidioma
    - [x] AÃ±adir recordatorio en roadmap para actualizar ficha de Play Store (capturas, descripciÃ³n) cuando se prepare la versiÃ³n en inglÃ©s
    - [x] Commit de integraciÃ³n i18n bÃ¡sica funcionando

---

## ðŸš€ Etapa 9: Lanzamiento final

- [x] ðŸ§­ Cerrar el alcance real del lanzamiento
  - [x] Confirmar quÃ© tareas forman parte del lanzamiento cerrado
  - [x] Confirmar quÃ© tareas pasan a post-lanzamiento o backlog
  - [x] Actualizar este roadmap para que refleje solo trabajo vivo y vigente

- [x] ðŸ”Ž Revisar regresiÃ³n del botÃ³n "Volver al turno actual"
  - [x] Confirmar si el bug sigue presente en la versiÃ³n actual
  - [x] Si la correcciÃ³n es clara y acotada, incluirla en esta fase
  - [x] La revisiÃ³n confirmÃ³ que era un bug general de cancelaciÃ³n tÃ¡ctil en la vista principal, ya resuelto dentro de esta fase sin moverlo a etapa 10

- [x] ðŸ“£ Preparar aviso en PWA para migraciÃ³n a app nativa
  - [x] Detectar si es entorno web o PWA
  - [x] DiseÃ±ar aviso persistente con enlace a Play Store
  - [x] Definir un fallback razonable para iOS
  - [x] Valorar si conviene ocultar el aviso al instalar la versiÃ³n nativa
  - [x] Dejar preparado el comportamiento para validarlo con la release real

- [ ] ðŸ“± Publicar app Android en Google Play
  - [ ] Revisar ficha final de Play Store (nombre, descripciÃ³n, capturas, polÃ­tica de datos, etc.)
  - [ ] Confirmar que versiÃ³n, textos e imÃ¡genes estÃ¡n actualizados
  - [ ] Preparar release pÃºblica en producciÃ³n
  - [ ] Usar `managed publishing` si conviene para controlar el momento exacto de visibilidad
  - [ ] Activar publicaciÃ³n pÃºblica cuando se decida
  - [ ] Confirmar que la app estÃ¡ visible y accesible desde la Play Store

- [ ] ðŸ“¤ Publicar versiÃ³n PWA como estable
  - [ ] Confirmar que `develop` estÃ¡ lista para merge a `main`
  - [ ] Revisar y actualizar versiÃ³n visible y metadatos si corresponde
  - [ ] Confirmar que el aviso de migraciÃ³n ya puede apuntar a la ficha real de Play Store
  - [ ] Actualizar tambiÃ©n el `README.md` si han cambiado tecnologÃ­as, capturas, enlaces o instrucciones
  - [ ] Hacer merge a `main`
  - [ ] Verificar despliegue correcto en Vercel producciÃ³n
  - [ ] Confirmar correcto funcionamiento como app instalada desde navegador en dispositivos de referencia
  - [ ] Validar comportamiento final del aviso de migraciÃ³n ya con enlace real
  - [ ] (Opcional) Crear un tag git:
      git tag v1.X.Y -m "DescripciÃ³n del release"
      git push origin v1.X.Y

- [ ] ðŸ‘¥ ComunicaciÃ³n mÃ­nima del lanzamiento
  - [ ] Avisar a usuarios actuales de la app
  - [ ] Preparar mensaje breve para el grupo de trabajo

- [ ] âœ… Cerrar la fase de lanzamiento
  - [ ] Confirmar que la PWA estable ya estÃ¡ publicada y validada
  - [ ] Confirmar que la app Android ya estÃ¡ publicada y validada
  - [ ] Confirmar que el aviso de migraciÃ³n en PWA estÃ¡ resuelto
  - [ ] Confirmar que la comunicaciÃ³n mÃ­nima estÃ¡ hecha
  - [ ] Actualizar tambiÃ©n el `README.md` si se han hecho cambios relevantes

---

## ðŸ”„ Etapa 10: Post-lanzamiento y backlog

Tareas posteriores al lanzamiento pÃºblico, incluyendo mejoras opcionales, deuda tÃ©cnica y correcciones no bloqueantes.
  > Revisar el orden; no siguen una prioridad cerrada todavÃ­a.

- [ ] ðŸ•› CorrecciÃ³n automÃ¡tica de fecha en tareas cerca de medianoche
  - [ ] Detectar si al modificar una hora (inicio o fin) la nueva hora pertenece al dÃ­a anterior o siguiente
      - [ ] Aplicar comprobaciÃ³n al confirmar la ediciÃ³n del campo de hora, no al crear la tarea
      - [ ] Considerar un rango de tolerancia (por defecto entre 00:00 y 05:00)
  - [ ] Ajustar automÃ¡ticamente la fecha de la hora modificada
      - [ ] Si se introduce una hora anterior a la actual despuÃ©s de medianoche, restar un dÃ­a al campo afectado
      - [ ] Si ambas horas quedan en dÃ­as distintos (ej. 23:30â€“00:30), mantener esa separaciÃ³n para reflejar la duraciÃ³n real
      - [ ] Si ambas caen en el mismo dÃ­a anterior (ej. 23:30â€“23:45), restar un dÃ­a a ambas
      - [ ] Recalcular la duraciÃ³n tras cualquier ajuste
  - [ ] Mostrar toast de confirmaciÃ³n
      - [ ] Mensaje: "La hora introducida parece pertenecer al dÃ­a anterior. Â¿A quÃ© dÃ­a pertenece realmente?"
      - [ ] Botones: "Ayer" y "Hoy", ambos actualizando la tarea y cerrando el toast
      - [ ] Sin acciÃ³n automÃ¡tica si no se responde
  - [ ] Validar comportamiento
      - [ ] Caso: crear tarea despuÃ©s de medianoche y cambiar inicio a 23:30 â†’ debe corregir la fecha y reposicionarse
      - [ ] Caso: tarea 23:30â€“00:30 â†’ debe conservar duraciÃ³n correcta abarcando dos dÃ­as
      - [ ] Confirmar que exportaciÃ³n, importaciÃ³n y ordenaciÃ³n siguen coherentes

- [ ] (Opcional) Probar app para tablet y hacer capturas para Play Store
- [ ] AÃ±adir selector de formato horario: HH:MM / AM-PM / seguir sistema (opcional)
- [ ] Revisar y adaptar la app al nuevo sistema de vista de extremo a extremo (Android 15 / SDK 35):
      Gestionar correctamente insets y safe-areas cuando el edge-to-edge sea predeterminado.
      Basado en aviso de Play Console: comprobar visualmente y aplicar nuevas APIs si es necesario.
- [ ] Actualizar el plugin `@capacitor/status-bar` y Material 3 cuando implementen soporte total para SDK 35.
      Aviso actual de Play Console: uso interno de `Window.setStatusBarColor` / `setNavigationBarColor` (obsoletas).
- [ ] Evaluar en el futuro si conviene retirar `android:screenOrientation="portrait"` para mejorar compatibilidad con pantallas grandes (Android 16+).
      Aviso informativo: el sistema ignorarÃ¡ esta restricciÃ³n en tablets/plegables; no crÃ­tico para telÃ©fonos.
- [ ] Revisar accesibilidad en toda la app (lectores de pantalla, etc.)
- [ ] Preparar lanzamiento de versiÃ³n en Play Store en inglÃ©s (o paÃ­ses angloparlantes)
- [ ] Compatibilidad visual en Android nativo y edge-to-edge
    - [ ] Hacer script para compilar Android (build, copy, sync, open/run; revisar si `clean project` hace falta)
    - [ ] Investigar por quÃ© en algunos dispositivos antiguos (API 29â€“30 fÃ­sicos) las barras adicionales siguen apareciendo tras el fix de status bar
    - [ ] Intentar que el cambio de color de iconos y fondo en Android 10 (API 29) se actualice sin necesidad de reiniciar la app
    - [ ] Evaluar si es posible aplicar un ajuste similar al del color de iconos para forzar la eliminaciÃ³n de insets extra en versiones antiguas
    - [ ] Validar en dispositivos fÃ­sicos con Android 11 (API 30) si el comportamiento de fondo e iconos de la status bar es estable en condiciones reales
    - [ ] Probar mÃ¡s versiones intermedias (API 31â€“35) para asegurar que la lÃ³gica condicional por versiÃ³n de API no introduce efectos no deseados
    - [ ] Validar que el layout es coherente en todas las plataformas

- [ ] DepuraciÃ³n Android: empaquetado y herramientas
    - [ ] Verificar que los archivos `favicon.ico` y `manifest.webmanifest` estÃ¡n correctamente empaquetados en la APK
        - Requiere: `npm run build` + `npx cap copy` + generaciÃ³n de APK
        - Renombrar el `.apk` a `.zip` y explorar el contenido en `/assets/public/`
        - Confirmar presencia de los archivos estÃ¡ticos esperados
        - Si faltan, revisar configuraciÃ³n de `vite.config.ts` (assetsInclude, rutas) o proceso de build
    - [ ] Diagnosticar causa del bloqueo del inspector `chrome://inspect` en emuladores Android
        - Confirmar si se reproduce en dispositivo fÃ­sico con USB
        - Probar con emulador limpio o reinstalado
        - Evaluar si alguna animaciÃ³n en la app (como apertura del SideMenu) puede estar dejando el DOM en estado inconsistente
        - Si no se encuentra causa clara, documentar el entorno exacto donde falla (emulador, versiÃ³n de Chrome, tipo de build)

- [ ] Validar coherencia del modo oscuro y tema del sistema en PWA, Android y escritorio (tests cruzados)

- [ ] AÃ±adir bloque "Sobre este proyecto" al final del `README.md`
    - [ ] Redactar una secciÃ³n breve y profesional sobre el contexto del desarrollo
    - [ ] Usar tono neutro y claro
    - [ ] Confirmar que no interfiere con el resto del README ni repite informaciÃ³n innecesaria

- [ ] Implementar selector de formato de duraciÃ³n y precisiÃ³n
    - [ ] AÃ±adir sistema de persistencia para ajustes de usuario (`localStorage`)
    - [ ] Modificar sistema de renderizado de duraciÃ³n en tarjetas
    - [ ] Crear modal para selector de formato de duraciÃ³n (primer uso)
    - [ ] AÃ±adir selector de salto tras elecciÃ³n de formato en el modal inicial
    - [ ] Integrar ajuste en opciones persistentes de la app (drawer o ajustes)
    - [ ] Ajustes visuales y de UX

- [ ] AÃ±adir soporte dinÃ¡mico para colores del sistema (status bar y nav bar) segÃºn modo claro/oscuro
  - [ ] Detectar `prefers-color-scheme` en `main.ts`
  - [ ] Aplicar color de fondo y color del texto usando `SafeArea.setStatusBar` y `setNavigationBar`
  - [ ] Confirmar que los colores aplicados coinciden con el modo activo de la app
  - [ ] (Opcional) Escuchar cambios en `prefers-color-scheme` si se desea actualizaciÃ³n dinÃ¡mica
  - [ ] Probar en dispositivo Android real y emulador
  - [ ] Documentar comportamiento y consideraciones en `dev-notes.md`

- [ ] âœ‰ï¸ Formulario de feedback por email
  - [ ] BotÃ³n "Enviar feedback" en menÃº lateral
  - [ ] Formulario con tipo de mensaje, descripciÃ³n y email opcional
  - [ ] Guardar en Firestore (colecciÃ³n `feedback`)
  - [ ] Trigger en Firebase Functions con envÃ­o por email (`nodemailer`, Resend, etc.)
  - [ ] ConfirmaciÃ³n visual tras enviar

- [ ] Investigar problema de recorte incorrecto del icono maskable al instalar la PWA en Android
  > Comentario: ver `dev-notes.md` para contexto completo de pruebas previas realizadas
  - [ ] Comparar el manifest de Notifica con PWAs conocidas donde el icono maskable se recorte correctamente
  - [ ] Generar nuevos iconos maskable con padding adecuado usando https://maskable.app/editor y probarlos
  - [ ] Verificar si el recorte incorrecto varÃ­a segÃºn versiÃ³n de Android, API o navegador (Chrome, WebView, WebAPK)
  - [ ] Probar cambios en el valor de `purpose` (`maskable` vs `any maskable`) y validar efectos
  - [ ] Analizar si el formato, metadatos o compresiÃ³n del PNG pueden estar afectando el renderizado
  - [ ] Buscar documentaciÃ³n o bugs conocidos en Chromium o foros relacionados con iconos maskable mal recortados
  - [ ] Decidir si se puede aplicar un workaround eficaz o si debe dejarse documentado como limitaciÃ³n conocida
  - [ ] Validar soluciÃ³n (si se aplica) en mÃºltiples entornos antes de cerrar el bug

- [ ] ðŸ“˜ AÃ±adir ayuda o tutorial para usuarios nuevos
  - [ ] Definir quÃ© funciones deben explicarse (crear turno, aÃ±adir tarea, filtros, exportar, etc.)
  - [ ] Elegir el formato: modal scrollable, vista "Ayuda", o guÃ­a paso a paso
  - [ ] DiseÃ±ar estructura clara, con texto corto y ejemplos visuales
  - [ ] AÃ±adir acceso desde el menÃº lateral u otro lugar visible
  - [ ] Asegurar que se puede consultar en cualquier momento
  - [ ] Validar legibilidad en mÃ³vil y dispositivos pequeÃ±os

- [ ] ComunicaciÃ³n externa opcional
  - [ ] Preparar mensaje de presentaciÃ³n para redes o comunidades
  - [ ] Valorar si tiene sentido compartir la app en plataformas relevantes (`/r/androidapps`, `/r/SideProject`, cÃ­rculos personales o profesionales, etc.)

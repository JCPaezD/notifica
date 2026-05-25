# Mantenimiento

Este documento recoge el flujo de mantenimiento y validacion diaria de Notifica.

## Ramas

- `main`: PWA de produccion.
- `develop`: rama activa de trabajo y pruebas.

No tratar `main` como una rama de integracion rutinaria.

## Comandos Locales

```bash
npm install
npm run dev
npm run build
npm run preview
```

Carencia actual:

- el proyecto aun no tiene script dedicado de tests
- anadir un stack de tests forma parte de la fase de fortificacion

## Validacion Base

Para cambios solo de documentacion:

- revisar enlaces y rutas
- revisar `git diff --stat`
- mantener el material historico accesible

Para cambios de comportamiento web/app:

- ejecutar `npm run build`
- validar el flujo afectado en navegador o app instalada
- confirmar traducciones si cambia texto visible
- confirmar modo claro/oscuro si cambia UI

Para cambios Android:

- tratar Android Studio, instalacion en dispositivo, emuladores y Play Console como checkpoints manuales salvo automatizacion especifica
- no considerar validada una release Android solo con checks web

## Higiene Del Repo

- Mantener inventarios temporales en `docs/dev/working/`.
- Mantener historicos en `docs/dev/archive/`.
- Mantener ignorados outputs de build y logs.
- No commitear keystores, outputs Android, APKs, AABs ni logs transitorios.
- `bundletool.jar` esta ignorado y debe seguir siendo artefacto local salvo decision deliberada de tooling.

## Mantenimiento Documental

Antes de anadir contenido largo a un documento vivo, decidir si es:

- decision o proceso vigente -> documento activo
- traza historica -> `archive/`
- material temporal -> `working/`
- estrategia privada o analisis bruto -> `../notifica_docs/`

## Commits

Preferir commits que cuenten una historia clara:

- refactor documental/workflow
- setup de tests
- extraccion de arquitectura
- fix UX
- preparacion de release

No mezclar codigo, docs y artefactos generados sin una relacion deliberada.

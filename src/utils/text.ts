// src/utils/text.ts

// Función que capitaliza la primera letra de una cadena.
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

import { ref } from 'vue'

/**
 * Composable para animar el bloque del logo y título de la app.
 * Proporciona una ref y una función que lanza una animación visual breve.
 */
export function useLogoAnimation() {
  const logoBlockRef = ref<HTMLElement | null>(null)

  const animateLogo = () => {
    if (logoBlockRef.value) {
      setTimeout(() => {
        logoBlockRef.value?.classList.add('scale-105', 'drop-shadow-md')
        setTimeout(() => {
          logoBlockRef.value?.classList.remove('scale-105', 'drop-shadow-md')
        }, 300)
      }, 400)
    }
  }

  return {
    logoBlockRef,
    animateLogo
  }
}

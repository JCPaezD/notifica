type ThemeMode = 'light' | 'dark'

type ButtonStyleSet = {
  [key in ThemeMode]: string
}

export const menuButtonStyles: {
  newShift: ButtonStyleSet
  share: ButtonStyleSet
  import: ButtonStyleSet
  export: ButtonStyleSet
  delete: ButtonStyleSet
  options: ButtonStyleSet
  toggle: ButtonStyleSet
} = {
  newShift: {
    light: 'bg-status-success text-success-strong hover:bg-status-success-hover',
    dark:  'bg-status-success-dark text-success-strong-dark hover:bg-status-success-dark-hover',
  },
  share: {
    light: 'bg-status-accent text-accent-strong hover:bg-status-accent-hover',
    dark:  'bg-status-accent-dark text-accent-strong-dark hover:bg-status-accent-hover-dark',
  },
  import: {
    light: 'bg-status-accent text-accent-strong hover:bg-status-accent-hover',
    dark:  'bg-status-accent-dark text-accent-strong-dark hover:bg-status-accent-hover-dark',
  },
  export: {
    light: 'bg-status-accent text-accent-strong hover:bg-status-accent-hover',
    dark:  'bg-status-accent-dark text-accent-strong-dark hover:bg-status-accent-hover-dark',
  },
  delete: {
    light: 'bg-status-danger text-danger-strong hover:bg-status-danger-hover',
    dark:  'bg-status-danger-dark text-danger-strong-dark hover:bg-status-danger-dark-hover',
  },
  options: {
    light: 'bg-status-purple text-purple-strong hover:bg-status-purple-hover focus:outline-none',
    dark:  'bg-status-purple-dark text-purple-strong-dark hover:bg-status-purple-dark-hover focus:outline-none',
  },
  toggle: {
    light: 'bg-status-purple text-purple-strong hover:bg-status-purple-hover focus:outline-none',
    dark:  'bg-status-purple-dark text-purple-strong-dark hover:bg-status-purple-dark-hover focus:outline-none',
  },
}

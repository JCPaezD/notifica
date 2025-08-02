import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jcpaezd.notifica',
  appName: 'Notifica',
  webDir: 'dist',
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#f8f9fa', // claro para modo claro
      statusBarContent: 'dark', // texto oscuro
      navigationBarColor: '#00000000',
      navigationBarContent: 'dark',
      offset: 0
    }
  }
};

export default config;

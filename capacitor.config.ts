import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'rw.gov.rssb.healthpay',
  appName: 'RSSB HealthPay',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#3B82F6'
    }
  }
};

export default config;
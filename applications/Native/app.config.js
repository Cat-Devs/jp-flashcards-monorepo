// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  expo: {
    name: 'jpFlashcards',
    slug: 'jp-flashcards',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/logo.png',
    userInterfaceStyle: 'dark',
    scheme: 'acme',
    splash: {
      image: './assets/logo.png',
      resizeMode: 'contain',
      backgroundColor: '#111526',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.andreasonny83.jpFlashcardsNative',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/logo.png',
        backgroundColor: '#111526',
      },
      package: 'com.andreasonny83.jpFlashcardsNative',
    },
    web: {
      favicon: './assets/logo.png',
      bundler: 'metro',
    },
    plugins: ['expo-router', 'expo-font'],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
    },
    owner: 'catdevs',
  },
};

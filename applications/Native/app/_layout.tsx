require('react-native-ui-lib/config').setConfig({ appScheme: 'default' });
import './theme';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Colors } from 'react-native-ui-lib';

import { AppProvider } from '@/utils';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          title: 'JP FlashCards',
          headerTintColor: Colors.$textDefault,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.blue40,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackVisible: true,
        }}
      />
    </AppProvider>
  );
}

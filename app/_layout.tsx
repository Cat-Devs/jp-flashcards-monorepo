import { Stack } from 'expo-router';
import React from 'react';
import { Colors } from 'react-native-ui-lib';

import { AppProvider } from '../utils/AppContext';

export default function HomeLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          title: 'JP FlashCards',
          headerTintColor: Colors.white,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.blue40,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </AppProvider>
  );
}

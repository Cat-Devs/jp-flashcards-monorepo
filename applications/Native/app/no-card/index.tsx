import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native-ui-lib';

import { NoCard } from '../../components/NoCard';

export default function GameOverPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace({ pathname: '/home' });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex centerV marginH-20>
        <NoCard onGoHome={handleGoHome} />
      </View>
    </SafeAreaView>
  );
}

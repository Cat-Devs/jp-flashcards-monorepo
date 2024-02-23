import { useRouter } from 'expo-router';
import React from 'react';

import { GameOver } from '../../components/GameOver';
import { useApp } from '../../utils';
import { SafeAreaView, View } from '@/components/Themed';

export default function GameOverPage() {
  const { state } = useApp();
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex centerV marginH-20>
        <GameOver gameStats={state} onStartOver={handleGoHome} />
      </View>
    </SafeAreaView>
  );
}

import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native-ui-lib';

import { GameOver } from '../../components/GameOver';
import { useApp } from '../../utils/AppContext';

export default function GameOverPage() {
  const { state } = useApp();
  const router = useRouter();

  const handleGoHome = () => {
    router.replace({ pathname: '/home' });
  };

  return (
    <View flex centerV marginH-20>
      <GameOver gameStats={state} onStartOver={handleGoHome} />
    </View>
  );
}

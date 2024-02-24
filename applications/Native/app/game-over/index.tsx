import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native-ui-lib';

import { GameOver } from '../../components/GameOver';
import { useApp } from '../../utils';

export default function GameOverPage() {
  const { state } = useApp();
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/');
  };

  return (
    <View flex bg-screenBG>
      <View flex centerV marginH-20>
        <GameOver gameStats={state} onStartOver={handleGoHome} />
      </View>
    </View>
  );
}

import { router } from 'expo-router';
import React from 'react';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import { useApp } from '../utils/AppContext';

export const GameOver = () => {
  const { state } = useApp();

  console.log('game over');

  const handleStartOver = () => {
    router.replace({ pathname: '/' });
  };

  return (
    <View>
      <Text h1 center text30H marginB-100>
        Game Over
      </Text>
      <Button
        text50BO
        size={Button.sizes.large}
        backgroundColor={Colors.blue40}
        label="Start Over"
        onPress={handleStartOver}
      />
    </View>
  );
};

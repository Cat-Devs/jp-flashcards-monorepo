import React from 'react';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import { AppState } from '../utils/AppContext';

interface Props {
  gameStats: AppState;
  onStartOver: () => void;
}
export const GameOver = ({ onStartOver, gameStats }: Props) => {
  const successRate =
    gameStats?.deck.filter((card) => card?.success).length / gameStats?.deck.length;

  return (
    <View paddingH-10>
      <View marginB-100>
        <Text h1 center text30H marginB-100>
          Game Over
        </Text>
        <Text text60L>Category: {gameStats?.gameMode}</Text>
        <Text text60L>Success rate: {successRate * 100}%</Text>
      </View>

      <Button
        text50BO
        size={Button.sizes.large}
        backgroundColor={Colors.blue40}
        label="Start Over"
        onPress={onStartOver}
      />
    </View>
  );
};

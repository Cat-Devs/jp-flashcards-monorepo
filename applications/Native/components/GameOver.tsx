import React from 'react';
import { Button, Colors, View } from 'react-native-ui-lib';
import { UIText } from '@/components/Themed';
import { AppState } from '../utils';

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
        <UIText h1 center text30H marginB-100>
          Game Over
        </UIText>
        <UIText text60L>
          Category:{' '}
          {gameStats?.gameMode &&
            gameStats.gameMode.charAt(0).toUpperCase() + gameStats.gameMode.slice(1)}
        </UIText>
        <UIText text60L>Success rate: {(successRate * 100).toFixed(2)}%</UIText>
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

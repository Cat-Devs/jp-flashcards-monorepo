import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Colors, Button } from 'react-native-ui-lib';

import { useApp } from '../utils/AppContext';
import { createDeck } from '../utils/create-deck';

export default function Home() {
  const router = useRouter();
  const { startGame } = useApp();

  const handleStart = async () => {
    const gameMode = 'animals';
    const deck = await createDeck(gameMode);
    startGame(deck, gameMode);
    router.push({ pathname: '/play' });
  };

  return (
    <View flex paddingH-20 paddingV-20>
      <Text blue40 text20 center>
        JP Flashcard
      </Text>
      <Text text50L grey30 center marginT-10>
        Press Start to begin
      </Text>

      <View flex centerV>
        <Button
          label="START"
          size={Button.sizes.large}
          text50BO
          backgroundColor={Colors.blue40}
          onPress={handleStart}
        />
      </View>
    </View>
  );
}

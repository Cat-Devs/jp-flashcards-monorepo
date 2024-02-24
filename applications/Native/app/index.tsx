import { useRouter } from 'expo-router';
import React from 'react';
import { View, Colors, Button, Text } from 'react-native-ui-lib';

import { useApp } from '../utils';

export default function HomePage() {
  const router = useRouter();
  const { startGame } = useApp();

  const handleStart = async () => {
    const gameMode = 'animals';
    await startGame(gameMode);
    router.push('/play');
  };

  const handleSignIn = () => {
    router.replace('/auth');
  };

  return (
    <View flex paddingH-20 paddingV-20 bg-screenBG>
      <Text blue40 text20 center>
        JP Flashcard
      </Text>
      <Text text50L center marginT-10>
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
        <Button
          label="Sign In"
          size={Button.sizes.large}
          text50BO
          marginT-20
          blue40
          link
          backgroundColor={Colors.blue40}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
}

import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, Colors, Button } from 'react-native-ui-lib';

import { useApp } from '../utils/app-context';

export default function Home(props: any) {
  const router = useRouter();
  const { startGame } = useApp();

  const handleStart = async () => {
    const gameMode = 'animals';
    await startGame(gameMode);
    router.push({ pathname: '/play' });
  };

  const handleSignIn = () => {
    router.push({ pathname: '/auth' });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
}

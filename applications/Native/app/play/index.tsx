import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter, Redirect } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Colors, Button, Incubator } from 'react-native-ui-lib';

import { Card } from '../../components/Card';
import { useApp } from '../../utils';
import { SafeAreaView, View } from '@/components/Themed';

function PlayPage(): React.JSX.Element {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const { getItem: toastDismissed, setItem: setToastDismissed } = useAsyncStorage('toast');
  const { state, playNextCard } = useApp();
  const { currentCard } = state;

  useEffect(() => {
    (async () => {
      const toast = await toastDismissed();
      setToastVisible(!toast);
    })();
  }, [toastDismissed]);

  const speak = (say: string) => {
    Speech.speak(say, { language: 'ja-JP', rate: 0.5 });
  };

  const handleFlipCard = async () => {
    if (toastVisible) {
      handleDismissToast();
    }
    speak(currentCard?.romaji || '');
    setShowControls(true);
  };

  const handleNextCard = (cardResult: boolean) => {
    const res = playNextCard(cardResult);

    if (res === null) {
      return router.replace('/game-over/');
    }

    router.replace('/play/');
  };

  const handleDismissToast = () => {
    setToastDismissed('true');
    setToastVisible(false);
  };

  if (!currentCard) {
    return <Redirect href="/no-card/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex bottom marginH-20>
        <Incubator.Toast
          backgroundColor={Colors.blue80}
          preset="general"
          visible={toastVisible}
          position="top"
          message="Click the card to flip"
          onDismiss={handleDismissToast}
          iconColor={Colors.blue40}
          centerMessage
          swipeable
          zIndex={1}
        />

        <Card
          id={currentCard.id}
          category={currentCard.category}
          image={currentCard.image}
          en={currentCard.en}
          romaji={currentCard.romaji}
          onFlipCard={handleFlipCard}
        />

        <View height={90}>
          {showControls && (
            <View row marginT-20 right spread>
              <Button
                label="Failed"
                size={Button.sizes.large}
                backgroundColor={Colors.red30}
                onPress={() => handleNextCard(false)}
              />
              <Button
                label="Success"
                size={Button.sizes.large}
                backgroundColor={Colors.green30}
                onPress={() => handleNextCard(true)}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default gestureHandlerRootHOC(PlayPage);

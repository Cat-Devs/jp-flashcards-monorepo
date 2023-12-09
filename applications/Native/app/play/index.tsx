import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Colors, Button, Incubator } from 'react-native-ui-lib';

import { Card } from '../../components/Card';
import { useApp } from '../../utils';

export default function PlayPage() {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const { getItem: toastDismissed, setItem: setToastDismissed } = useAsyncStorage('toast');
  const {
    state: { currentCard },
    playNextCard,
  } = useApp();

  useEffect(() => {
    (async () => {
      const toast = await toastDismissed();
      setToastVisible(!toast);
    })();
  }, [toastDismissed]);

  const handleFlipCard = () => {
    if (toastVisible) {
      handleDismissToast();
    }
    setShowControls(true);
  };

  const handleNextCard = (cardResult: boolean) => {
    const res = playNextCard(cardResult);

    if (res === null) {
      return router.replace({ pathname: '/game-over' });
    }

    router.replace({ pathname: '/play' });
  };

  const handleDismissToast = () => {
    setToastDismissed('true');
    setToastVisible(false);
  };

  if (!currentCard) {
    return router.replace({ pathname: '/no-card' });
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
          cardId={currentCard.cardId}
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

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Colors, Button, Incubator } from 'react-native-ui-lib';

import { Card } from '../../components/Card';
import { NoCard } from '../../components/NoCard';
import { useApp } from '../../utils/app-context';

export default function PlayPage(props: any) {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { getItem: toastDismissed, setItem: setToastDismissed } = useAsyncStorage('toast');
  const {
    state: { currentCard, isGameOver },
    playNextCard,
  } = useApp();

  useEffect(() => {
    if (isGameOver) {
      router.replace({ pathname: '/game-over' });
    }
  }, [isGameOver, router]);

  useEffect(() => {
    (async () => {
      const toast = await toastDismissed();
      setToastVisible(!toast);
    })();
  }, [toastDismissed]);

  const handleFlipCard = () => {
    setToastDismissed('true');
    handleDismissToast();
    setShowControls(true);
  };

  const handleSuccess = () => {
    playNextCard(true);
    router.replace({ pathname: '/play' });
  };

  const handleFailed = () => {
    playNextCard(false);
    router.replace({ pathname: '/play' });
  };

  const handleDismissToast = () => {
    setToastVisible(false);
  };

  if (!currentCard) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View flex centerV marginH-20>
          <NoCard />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex centerV marginH-20>
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
        />

        <Card
          cardId={currentCard.cardId}
          category={currentCard.category}
          image={currentCard.image}
          name={currentCard.name}
          romaji={currentCard.romaji}
          onFlipCard={handleFlipCard}
        />

        <View height={80}>
          {showControls && (
            <View row marginT-20 right spread>
              <Button
                label="Failed"
                size={Button.sizes.large}
                backgroundColor={Colors.red30}
                onPress={handleFailed}
              />
              <Button
                label="Success"
                size={Button.sizes.large}
                backgroundColor={Colors.green30}
                onPress={handleSuccess}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

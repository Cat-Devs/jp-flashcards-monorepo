import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Colors, Button, Incubator } from 'react-native-ui-lib';

import { Card } from '../../components/Card';
import { GameOver } from '../../components/GameOver';
import { NoCard } from '../../components/NoCard';
import { useApp } from '../../utils/AppContext';

export default function Play() {
  useEffect(() => {
    console.log('play mount');
    return () => {
      console.log('play unmount');
    };
  }, []);

  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);
  const [controls, setControls] = useState(false);
  const { getItem: toastStatus, setItem: setToastStatus } = useAsyncStorage('toast');
  const { state, nextCard } = useApp();
  useEffect(() => {
    (async () => {
      const toast = await toastStatus();
      setToastVisible(!toast);
    })();
  }, [toastStatus]);

  const handleFlipCard = () => {
    setToastStatus('true');
    handleDismissToast();
    setControls(true);
  };

  const handleSuccess = () => {
    nextCard(true);
    router.replace({ pathname: '/play' });
  };

  const handleFailed = () => {
    nextCard(false);
    router.replace({ pathname: '/play' });
  };

  const handleDismissToast = () => {
    setToastVisible(false);
  };

  if (state?.isGameOver) {
    return (
      <View flex centerV marginH-20>
        <GameOver />
      </View>
    );
  }

  if (!state?.currentCard) {
    return (
      <View flex centerV marginH-20>
        <NoCard />
      </View>
    );
  }

  return (
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
        cardId={state.currentCard.cardId}
        category={state.currentCard.category}
        image={state.currentCard.image}
        name={state.currentCard.name}
        romaji={state.currentCard.romaji}
        onFlipCard={handleFlipCard}
      />

      <View height={80}>
        {controls && (
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
  );
}

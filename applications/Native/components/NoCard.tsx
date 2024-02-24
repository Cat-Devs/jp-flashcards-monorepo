import React from 'react';
import { Button, Colors, Text } from 'react-native-ui-lib';

interface Props {
  onGoHome: () => void;
}

export const NoCard = ({ onGoHome }: Props) => {
  return (
    <>
      <Text h1 center text30H marginB-80>
        Cannot find a card
      </Text>
      <Button
        text50BO
        size="large"
        backgroundColor={Colors.blue40}
        label="Go Home"
        onPress={onGoHome}
      />
    </>
  );
};

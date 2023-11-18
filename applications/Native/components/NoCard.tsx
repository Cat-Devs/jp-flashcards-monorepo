import React from 'react';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

interface Props {
  onGoHome: () => void;
}

export const NoCard = ({ onGoHome }: Props) => {
  return (
    <View>
      <Text h1 center text30H marginB-100>
        Cannot find a card
      </Text>
      <Button
        text50BO
        size={Button.sizes.large}
        backgroundColor={Colors.blue40}
        label="Go Home"
        onPress={onGoHome}
      />
    </View>
  );
};

import React from 'react';
import { Colors } from 'react-native-ui-lib';
import { UIButton, View, UIText } from '@/components/Themed';

interface Props {
  onGoHome: () => void;
}

export const NoCard = ({ onGoHome }: Props) => {
  return (
    <View>
      <UIText h1 center text30H marginB-100>
        Cannot find a card
      </UIText>
      <UIButton
        text50BO
        size="large"
        backgroundColor={Colors.blue40}
        label="Go Home"
        onPress={onGoHome}
      />
    </View>
  );
};

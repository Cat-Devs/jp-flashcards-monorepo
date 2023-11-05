import { Link } from 'expo-router';
import React from 'react';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

export const NoCard = () => {
  return (
    <View>
      <Text h1 center text30H marginB-100>
        Game Over
      </Text>
      <Link href={{ pathname: '/home' }} asChild>
        <Button
          text50BO
          size={Button.sizes.large}
          backgroundColor={Colors.blue40}
          label="Start Over"
        />
      </Link>
    </View>
  );
};

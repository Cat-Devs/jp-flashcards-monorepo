import 'react-native-polyfill';
import { Link } from 'expo-router';
import React from 'react';
import { View, TextField, Text, Button, Colors } from 'react-native-ui-lib';

export default function App() {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text center blue40 text20>
        JP Flashcard
      </Text>

      <View marginT-100>
        <TextField
          text70
          placeholder="username"
          floatingPlaceholder
          marginB-20
          grey10
          maxLength={40}
        />
        <TextField
          text70
          placeholder="password"
          floatingPlaceholder
          secureTextEntry
          grey10
          maxLength={28}
        />
      </View>

      <View flex marginT-100 center>
        <Link href={{ pathname: '/home' }} asChild>
          <Button
            text50BO
            size={Button.sizes.large}
            backgroundColor={Colors.blue40}
            label="Login"
          />
        </Link>
        <Link href={{ pathname: '/home' }} asChild>
          <Button link text60 blue40 label="Sign Up" marginT-20 />
        </Link>
      </View>
    </View>
  );
}

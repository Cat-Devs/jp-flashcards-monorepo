import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  TextFieldRef,
  Text,
  Colors,
  Incubator,
  View,
  TextField,
  Button,
} from 'react-native-ui-lib';

import { useApp } from '../utils';

interface UserData {
  username: string;
  password: string;
}

function Auth() {
  const router = useRouter();
  const { signIn, signUp } = useApp();
  const usernameRef = React.createRef<TextFieldRef>();
  const passwordRef = React.createRef<TextFieldRef>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [userData, setUserData] = useState<UserData>({
    username: '',
    password: '',
  });

  const handleSignIn = async () => {
    const user = await signIn(userData);

    if (!user) {
      setToastMessage('Failed to sign in');
      setToastVisible(true);
      return;
    }

    router.replace('/');
  };

  const handleSignUp = async () => {
    const user = await signUp(userData);

    // if (!user) {
    //   //   setToastMessage('Failed to sign up');
    //   //   setToastVisible(true);
    //   //   return;
    // }

    router.replace('/');
  };

  const handleDismissToast = () => {
    setToastVisible(false);
  };

  const renderToast = () => {
    return (
      <Incubator.Toast
        key="my-toast"
        preset="failure"
        position="top"
        swipeable
        centerMessage
        enableHapticFeedback
        autoDismiss={3000}
        backgroundColor={Colors.red80}
        visible={toastVisible}
        message={toastMessage}
        onDismiss={handleDismissToast}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View flex paddingH-25 paddingT-120 bg-screenBG>
        <Text center blue40 text20>
          JP Flashcard
        </Text>

        <View marginT-100>
          <TextField
            ref={usernameRef}
            text70
            autoFocus
            marginB-20
            enableErrors
            validateOnChange
            label="Email"
            preset="default"
            maxLength={35}
            validate={['required', 'email', (value: string) => value.length > 6]}
            validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
            value={userData.username}
            onChangeText={(value: string) => {
              setUserData({ ...userData, username: value });
            }}
            onChangeValidity={(isValid: boolean) => {
              setIsFormValid(isValid && Boolean(passwordRef.current?.isValid()));
            }}
          />
          <TextField
            ref={passwordRef}
            text70
            enableErrors
            secureTextEntry
            validateOnChange
            maxLength={28}
            preset="default"
            label="Password"
            validate={['required', (value: string) => value.length > 6]}
            validationMessage={[
              'Field is required',
              'Password is invalid',
              'Password is too short',
            ]}
            value={userData.password}
            onChangeText={(value: string) => setUserData({ ...userData, password: value })}
            onChangeValidity={(isValid: boolean) =>
              setIsFormValid(isValid && Boolean(usernameRef.current?.isValid()))
            }
          />
        </View>

        <View flex marginT-100 center>
          <Button
            text50BO
            size="large"
            backgroundColor={Colors.blue40}
            label="Sign In"
            disabled={!isFormValid}
            onPress={handleSignIn}
          />
          <Button link text60 blue40 label="Sign Up" marginT-20 onPress={handleSignUp} />
        </View>
        {renderToast()}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default gestureHandlerRootHOC(Auth);

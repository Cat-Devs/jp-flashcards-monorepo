import { Stack, useRouter } from 'expo-router';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View flex centerV bg-screenBG>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View marginH-20>
        <Text h1 center text40H marginB-80>
          This screen doesn't exist
        </Text>
        <Button
          text50BO
          size="large"
          label="Go to home screen"
          backgroundColor={Colors.blue40}
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

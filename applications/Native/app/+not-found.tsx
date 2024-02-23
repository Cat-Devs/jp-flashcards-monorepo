import { Stack, useRouter } from 'expo-router';

import { UIText, View, SafeAreaView, UIButton } from '@/components/Themed';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View flex centerV>
        <UIText text50BO center>
          This screen doesn't exist.
        </UIText>
        <UIButton
          link
          margin-30
          paddingV-10
          text50M
          label="Go to home screen"
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}

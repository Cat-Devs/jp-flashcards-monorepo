import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native-ui-lib';

import { NoCard } from '../../components/NoCard';

export default function NoCardPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.navigate('/');
  };

  return (
    <View flex centerV bg-screenBG>
      <View marginH-20>
        <NoCard onGoHome={handleGoHome} />
      </View>
    </View>
  );
}

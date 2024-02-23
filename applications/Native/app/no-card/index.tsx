import { useRouter } from 'expo-router';
import React from 'react';

import { NoCard } from '../../components/NoCard';
import { SafeAreaView, View } from '@/components/Themed';

export default function NoCardPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.navigate('/');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex centerV marginH-20>
        <NoCard onGoHome={handleGoHome} />
      </View>
    </SafeAreaView>
  );
}

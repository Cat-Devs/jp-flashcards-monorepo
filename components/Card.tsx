import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, Text, Card as CardComponent, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { toKana } from 'wanakana';

import images from '../assets/images.json';

interface Props {
  cardId?: string;
  category?: string;
  image?: keyof typeof images;
  name?: string;
  romaji?: string;
  onFlipCard?: () => void;
}

export const Card = ({ cardId, category, image, name, romaji, onFlipCard }: Props) => {
  const spin = useSharedValue<number>(0);

  const frontStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const backStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const flipCard = () => {
    spin.value = spin.value === 0 ? 1 : 0;
    onFlipCard && onFlipCard();
  };

  return (
    <TouchableOpacity onPress={flipCard}>
      <Animated.View style={[Styles.front, frontStyle]}>
        <CardComponent
          paddingV-20
          paddingH-20
          style={{ height: 550, width: '100%', backgroundColor: Colors.white }}>
          <View row spread>
            <Text h4 grey10 text80L>
              {cardId}
            </Text>
            <Text h4 grey10 text80L uppercase>
              {category}
            </Text>
          </View>

          <View marginV-20>
            {image && (
              <CardComponent.Image
                source={{ uri: images[image] }}
                width={300}
                height={300}
                resizeMethod="scale"
              />
            )}
          </View>

          <View marginB-20 center flex>
            <Text blue50 text20>
              {name}
            </Text>
          </View>
        </CardComponent>
      </Animated.View>

      <Animated.View style={[Styles.back, backStyle]}>
        <CardComponent
          paddingV-20
          paddingH-20
          style={{ height: 550, backgroundColor: Colors.white }}>
          <View row spread>
            <Text h4 grey10 text80L>
              {cardId}
            </Text>
            <Text h4 grey10 text80L uppercase>
              {category}
            </Text>
          </View>

          <View marginB-20 center flex>
            <Text grey10 text20>
              {toKana(`${romaji}`)}
            </Text>
            <Text grey20 text20>
              {romaji}
            </Text>
          </View>
        </CardComponent>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  front: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    width: '100%',
  },
  back: {
    width: '100%',
    backfaceVisibility: 'hidden',
  },
});

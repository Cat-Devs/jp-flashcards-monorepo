import { getCards } from '../db';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { API_URL } from '@env';

// export const createDeckFromAPI = async (category: string) => {
// try {
//   return axios.post(`${API_URL}/api/v1/deck`, { category });
// } catch (_err) {
//   console.log('_err', _err);
//   return null;
// }
// };

export const createDeckByCategory = async (category: string) => {
  // Retrieve user cards from local storage
  const userCards = await AsyncStorage.getItem(`cards-${category}`);
  console.log('userCards', userCards);

  const cards = getCards().filter((card) => card.category === category);

  return cards;
};

export const createDeckByLevel = async (level: number) => {
  // Retrieve user cards from local storage
  const userCards = await AsyncStorage.getItem(`cards-${level}`);
  console.log('userCards', userCards);

  const cards = getCards().filter((card) => Number(card.level) === level);
  console.log('cards', cards);

  return cards;
};

export const createDeck = async (gameMode: string) => {
  console.log('gameMode', gameMode);

  const cards = await createDeckByLevel(1);
  return cards.filter((card) => card.category !== 'hiragana');
};

import { createDeckAPI } from '../API';

export const createDeck = async (category: string) => {
  return createDeckAPI(category);
};

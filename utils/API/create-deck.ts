import { CardType } from '../../types/card';

export const createDeck = async (category: string): Promise<CardType[]> => {
  const strawberry: CardType = {
    cardId: '001',
    category: 'fruits',
    image: 'strawberry.jpeg',
    name: 'Strawberry',
    romaji: 'ichigo',
  };
  const cat: CardType = {
    cardId: '002',
    category: 'animals',
    image: 'cat.jpeg',
    name: 'Cat',
    romaji: 'neko',
  };

  return [strawberry, cat];
};

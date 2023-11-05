import images from '../assets/images.json';

export type CardType = {
  cardId: string;
  image: keyof typeof images;
  name: string;
  romaji: string;
  category: string;
};

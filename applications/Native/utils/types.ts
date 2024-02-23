import images from '../assets/images/images.json';

export interface UserState {
  id: string;
  email: string;
  name: string;
}

export interface AppState {
  deck: CardType[];
  currentCard: CardType | null;
  nextCard: CardType | null;
  isGameOver: boolean;
  gameMode: string | null;
  user: UserState | null;
}

export type CardType = {
  id: string;
  image: keyof typeof images;
  en: string;
  romaji: string;
  category: string;
  success?: boolean;
};

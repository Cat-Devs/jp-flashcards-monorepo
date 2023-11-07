import { CardType } from '../../types/card';

export interface AppState {
  deck: CardType[];
  currentCard: CardType | null;
  nextCard: CardType | null;
  isGameOver: boolean;
  gameMode: string;
}

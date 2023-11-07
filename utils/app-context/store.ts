import { AppState } from './types';

export const appReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        ...action.payload,
      };
    case 'NEXT_CARD':
      return {
        ...state,
        currentCard: action.payload.currentCard,
        nextCard: action.payload.nextCard,
        deck: action.payload.deck,
      };
    case 'END_GAME':
      return {
        ...state,
        isGameOver: true,
        currentCard: null,
        nextCard: null,
        deck: action.payload.deck,
      };
    default:
      return state;
  }
};

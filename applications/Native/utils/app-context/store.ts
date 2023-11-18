import { AppState } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UNSET_USER':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

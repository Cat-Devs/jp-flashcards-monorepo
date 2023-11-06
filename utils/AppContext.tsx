import React, { Dispatch, createContext, useContext, useMemo, useReducer } from 'react';

import { CardType } from '../types/card';

export interface AppState {
  deck: CardType[];
  currentCard: CardType | null;
  nextCard: CardType | null;
  isGameOver: boolean;
  gameMode: string;
}

const appReducer = (state: AppState, action: any) => {
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

const initialState: AppState = {
  deck: [],
  currentCard: null,
  nextCard: null,
  isGameOver: false,
  gameMode: 'hiragana',
};

export const AppContext = createContext<{
  state: AppState | null;
  dispatch: Dispatch<any> | null;
}>({
  state: null,
  dispatch: null,
});

export function AppProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value} {...props} />;
}

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`useApp must be used within an AppProvider`);
  }

  const { state, dispatch } = context;

  if (!state || !dispatch) {
    throw new Error(`useApp must be used within an AppProvider`);
  }

  const startGame = (deck: any[], gameMode: string) => {
    dispatch({
      type: 'START_GAME',
      payload: {
        currentCard: deck[0],
        nextCard: deck?.[1] || null,
        isGameOver: false,
        deck,
        gameMode,
      },
    });
  };

  const nextCard = (success?: boolean) => {
    const updateDeck = state.deck.map((card: CardType) => {
      if (card.cardId === state.currentCard?.cardId) {
        return {
          ...card,
          success,
        };
      }
      return card;
    });

    if (!state.nextCard) {
      dispatch({
        type: 'END_GAME',
        payload: {
          deck: updateDeck,
        },
      });
      return;
    }

    dispatch({
      type: 'NEXT_CARD',
      payload: {
        currentCard: state.nextCard,
        nextCard: state.deck[state.deck.indexOf(state.nextCard) + 1] || null,
        deck: updateDeck,
      },
    });
  };

  const endGame = () => {
    dispatch({
      type: 'END_GAME',
    });
  };

  return {
    state,
    nextCard,
    endGame,
    startGame,
  };
};

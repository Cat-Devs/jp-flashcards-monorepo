import { useContext } from 'react';

import { AppContext } from './AppContext';
import { CardType } from '../../types/card';
import { createDeck } from '../API/create-deck';

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`useApp must be used within an AppProvider`);
  }

  const { state, dispatch } = context;

  if (!state || !dispatch) {
    throw new Error(`useApp must be used within an AppProvider`);
  }

  const startGame = async (gameMode: string) => {
    const deck = await createDeck(gameMode);

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

  const playNextCard = (success?: boolean) => {
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
    playNextCard,
    endGame,
    startGame,
  };
};

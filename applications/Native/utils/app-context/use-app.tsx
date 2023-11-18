import { useContext } from 'react';

import { AppContext } from './AppContext';
import { createDeck, auth } from '../controllers';
import { UserState, CardType } from '../types';

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

  const playNextCard = (success?: boolean): CardType | null => {
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
      return null;
    }

    dispatch({
      type: 'NEXT_CARD',
      payload: {
        currentCard: state.nextCard,
        nextCard: state.deck[state.deck.indexOf(state.nextCard) + 1] || null,
        deck: updateDeck,
      },
    });
    return state.nextCard;
  };

  const endGame = () => {
    dispatch({
      type: 'END_GAME',
    });
  };

  const setUser = (userData: UserState) => {
    dispatch({
      type: 'SET_USER',
      payload: userData,
    });
  };

  const unsetUser = () => {
    dispatch({
      type: 'UNSET_USER',
    });
  };

  const signIn = async (userData: { username: string; password: string }) => {
    const user = await auth(userData);

    // if (!user) {
    unsetUser();
    return null;
    // }

    // eslint-disable-next-line no-unreachable
    setUser(user);
    return user;
  };

  const signUp = async (userData: { username: string; password: string }) => {
    const user = await auth(userData);

    if (!user) {
      unsetUser();
      return null;
    }

    setUser(user);
    return user;
  };

  return {
    state,
    playNextCard,
    endGame,
    startGame,
    setUser,
    signIn,
    signUp,
  };
};

import { useContext } from 'react';

import { AppContext } from './AppContext';
import { createDeck, auth } from '../controllers';
import { UserState } from '../types';
import { playNextCard } from './operations/playNextCard';

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

  const playNextCardLocal = (success?: boolean) => {
    return playNextCard(state, dispatch, success);
  };

  return {
    state,
    playNextCard: playNextCardLocal,
    endGame,
    startGame,
    setUser,
    signIn,
    signUp,
  };
};

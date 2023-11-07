import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import { appReducer } from './store';
import { AppState } from './types';

const initialState: AppState = {
  deck: [],
  currentCard: null,
  nextCard: null,
  isGameOver: false,
  gameMode: 'hiragana',
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function AppProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value} {...props} />;
}

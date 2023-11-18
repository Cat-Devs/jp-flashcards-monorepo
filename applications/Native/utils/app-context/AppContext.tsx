import React, { Dispatch, createContext, useMemo, useReducer } from 'react';

import { appReducer } from './store';
import { AppState } from '../types';

const initialState: AppState = {
  deck: [],
  currentCard: null,
  nextCard: null,
  isGameOver: false,
  gameMode: null,
  user: null,
};

export const AppContext = createContext<{
  state: AppState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value} {...props} />;
}

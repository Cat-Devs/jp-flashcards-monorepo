import { AppState, CardType } from '../../types';

export const playNextCard = (
  state: AppState,
  dispatch: (value: any) => void,
  success?: boolean,
): CardType | null => {
  const updateDeck = state.deck.map((card: CardType) => {
    if (card.id && card.id === state.currentCard?.id) {
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

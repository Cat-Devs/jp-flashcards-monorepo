import { AppState, CardType } from '../../types';
import { playNextCard } from './playNextCard';

const testDeck: CardType[] = [
  {
    id: 'hgna24',
    en: 'cat',
    romaji: 'neko',
    category: 'animals',
    image: 'cat.jpeg',
  },
  {
    id: 'hgna2',
    en: 'strawberry',
    romaji: 'i',
    category: 'fruits',
    image: 'strawberry.jpeg',
  },
  {
    id: 'hgna17',
    en: 'map',
    romaji: 'chi',
    category: 'objects',
    image: 'map.jpeg',
  },
];

describe('playNextCard', () => {
  let testState: AppState;
  const testDispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    testState = {
      gameMode: 'test',
      isGameOver: false,
      user: {
        id: '001',
        name: 'test',
        email: '',
      },
      deck: testDeck,
      nextCard: testDeck[1],
      currentCard: testDeck[0],
    };
  });

  it('should play the next card from the deck', () => {
    const testSuccess = true;
    const res = playNextCard(testState, testDispatch, testSuccess);
    expect(res).toEqual(testState.nextCard);
  });

  it('should dispatch the NEXT_CARD event', () => {
    const testSuccess = true;
    playNextCard(testState, testDispatch, testSuccess);
    expect(testDispatch).toHaveBeenCalledWith({
      type: 'NEXT_CARD',
      payload: {
        currentCard: testState.nextCard,
        nextCard: testState.deck[2],
        deck: expect.any(Array),
      },
    });
  });

  it.each([true, false])('should update the card result to "%s"', (testSuccess) => {
    playNextCard(testState, testDispatch, testSuccess);
    expect(testDispatch).toHaveBeenCalledWith({
      type: expect.any(String),
      payload: {
        currentCard: expect.any(Object),
        nextCard: expect.any(Object),
        deck: [
          {
            ...testState.deck[0],
            success: testSuccess,
          },
          ...testState.deck.slice(1),
        ],
      },
    });
  });

  it('should keep playing the next card until they are available in the deck', () => {
    const testSuccess = true;
    playNextCard(testState, testDispatch, testSuccess);
    playNextCard({ ...testState, nextCard: testState.deck[2] }, testDispatch, testSuccess);
    playNextCard({ ...testState, nextCard: null }, testDispatch, testSuccess);

    expect(testDispatch).toHaveBeenCalledTimes(3);
    expect(testDispatch).toHaveBeenNthCalledWith(1, {
      type: 'NEXT_CARD',
      payload: expect.anything(),
    });
    expect(testDispatch).toHaveBeenNthCalledWith(2, {
      type: 'NEXT_CARD',
      payload: expect.anything(),
    });
    expect(testDispatch).toHaveBeenNthCalledWith(3, {
      type: 'END_GAME',
      payload: expect.anything(),
    });
  });

  it('should dispatch END_GAME when reaching the end of the deck', () => {
    const testSuccess = true;
    playNextCard(
      {
        ...testState,
        currentCard: testState.deck[2],
        nextCard: null,
      },
      testDispatch,
      testSuccess,
    );

    expect(testDispatch).toHaveBeenCalledTimes(1);
    expect(testDispatch).toHaveBeenCalledWith({
      type: 'END_GAME',
      payload: {
        deck: expect.any(Array),
      },
    });
  });
});

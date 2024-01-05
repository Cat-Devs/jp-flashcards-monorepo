import cardsSeeds from './cards-seed.json';

export const getCard = (cardId: string) => {
  return cardsSeeds.find((card) => card.id === cardId);
};

export const getCards = () => {
  return cardsSeeds;
};

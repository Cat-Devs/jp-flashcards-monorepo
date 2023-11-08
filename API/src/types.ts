export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CardType {
  cardId: string;
  category: string;
  image: string;
  name: string;
  romaji: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CardType {
  cardId: string;
  category: string;
  level: number;
  image: string;
  en: string;
  romaji: string;
  sample?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

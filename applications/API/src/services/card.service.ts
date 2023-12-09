import { GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';

import { dbClient } from './db.service';
import { TABLE_NAME } from '../config';
import { logHelper } from '../helpers/log';
import { CardItem } from '../models';
import { CardType } from '../types';

export class CardService {
  static async getCard(cardId: string): Promise<CardType> {
    const card = new CardItem(cardId);

    const params: GetCommandInput = {
      TableName: TABLE_NAME,
      Key: card.keys(),
    };

    try {
      const data = await dbClient.send(new GetCommand(params));

      if (!data.Item) {
        logHelper('warn', `Card "${cardId}" not found`);
        return {} as unknown as CardType;
      }

      logHelper('info', `Retrieved card: "${cardId}"`, data.Item['PK'], data.Item['SK']);

      // const image = await getImage(BUCKET_NAME, data.Item.image);
      // logHelper('info', 'image', image && image.substring(0, 10), '...');

      return CardItem.fromItem(data.Item);

      // return CardItem.fromItem({
      //   ...data.Item,
      //   image,
      // });
    } catch (err) {
      console.log('err', err);

      logHelper('error', `Failed to retrieve card: "${cardId}"`);

      throw err;
    }
  }

  static async createDeck(_category: string): Promise<CardType[]> {
    const strawberry: CardType = {
      cardId: '001',
      category: 'fruits',
      image: 'strawberry.jpeg',
      en: 'Strawberry',
      romaji: 'ichigo',
      level: 1,
    };
    const cat: CardType = {
      cardId: '002',
      category: 'animals',
      image: 'cat.jpeg',
      en: 'Cat',
      romaji: 'neko',
      level: 1,
    };

    return [strawberry, cat];
  }

  // export const getCardsByLevelAndCategory = async (
  //   level: number,
  //   category: string,
  // ): Promise<Card[]> => {
  //   const params: QueryCommandInput = {
  //     TableName: TABLE_NAME,
  //     IndexName: 'GSI2',
  //     KeyConditionExpression: '#PK = :pk and #SK = :sk',
  //     ExpressionAttributeNames: {
  //       '#PK': 'GSI2-PK',
  //       '#SK': 'GSI2-SK',
  //     },
  //     ExpressionAttributeValues: {
  //       ':pk': `cc#${category}`,
  //       ':sk': `cl#00${level}`,
  //     },
  //   };

  //   try {
  //     const { client } = DBService;
  //     const data = await client.send(new QueryCommand(params));
  //     if (!data.Items?.length) {
  //       logHelper('warn', 'No items found');
  //       return [];
  //     }

  //     const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
  //     return card;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // export const getCardsByCategory = async (category: string): Promise<Card[]> => {
  //   const params: QueryCommandInput = {
  //     TableName: TABLE_NAME,
  //     IndexName: 'GSI2',
  //     KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
  //     ExpressionAttributeNames: {
  //       '#PK': 'GSI2-PK',
  //       '#SK': 'GSI2-SK',
  //     },
  //     ExpressionAttributeValues: {
  //       ':pk': `cc#${category}`,
  //       ':sk': `cl#`,
  //     },
  //   };

  //   try {
  //     const { client } = DBService;
  //     const data = await client.send(new QueryCommand(params));
  //     if (!data.Items?.length) {
  //       logHelper('warn', 'No items found');
  //       return [];
  //     }

  //     const cards = data.Items.map((dataItem) => CardItem.fromItem(dataItem));

  //     for (const cardItem of cards) {
  //       if (!cardItem.image) {
  //         continue;
  //       }

  //       cardItem.image = await getImage(BUCKET_NAME, cardItem.image);
  //     }

  //     return cards;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // export const getCardsByLevel = async (level: number): Promise<Card[]> => {
  //   const params: QueryCommandInput = {
  //     TableName: TABLE_NAME,
  //     IndexName: 'GSI1',
  //     KeyConditionExpression: '#PK = :pk and begins_with(#SK, :sk)',
  //     ExpressionAttributeNames: {
  //       '#PK': 'GSI1-PK',
  //       '#SK': 'GSI1-SK',
  //     },
  //     ExpressionAttributeValues: {
  //       ':pk': `cl#00${level}`,
  //       ':sk': `cc#`,
  //     },
  //   };

  //   try {
  //     const { client } = DBService;
  //     const data = await client.send(new QueryCommand(params));
  //     if (!data.Items?.length) {
  //       logHelper('warn', 'No items found');
  //       return [];
  //     }

  //     const card = data.Items.map((dataItem) => CardItem.fromItem(dataItem));
  //     return card;
  //   } catch (err) {
  //     throw err;
  //   }
  // };
}

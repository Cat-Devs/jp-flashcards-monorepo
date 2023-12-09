import { Request, Response } from 'express';

import { CardService } from '../services';

export class CardController {
  static async getCard(req: Request, res: Response) {
    const { cardId } = req?.params || {};

    if (!cardId) {
      return res.status(400).send('Missing cardId');
    }

    try {
      const card = await CardService.getCard(cardId);
      return res.status(200).send(card);
    } catch (error) {
      return res.status(404).send('Card not found');
    }
  }

  static async createDeck(req: Request, res: Response) {
    const { category } = req?.body || {};
    if (!category) {
      return res.status(400).send('Missing category');
    }

    try {
      const deck = await CardService.createDeck(category);
      return res.status(200).send(deck);
    } catch (error) {
      return res.status(400).send('Failed to create deck');
    }
  }
}

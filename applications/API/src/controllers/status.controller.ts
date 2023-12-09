import { Request, Response } from 'express';

export class StatusController {
  static async getStatus(req: Request, res: Response) {
    console.log('status');

    return res.status(200).json({
      message: 'OK',
      timestamp: new Date().toISOString(),
      IP: req.ip,
      URL: req.originalUrl,
    });
  }
}

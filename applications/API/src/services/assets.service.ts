import { S3Client } from '@aws-sdk/client-s3';

import { BUCKET_OFFLINE } from '../config';
const isOffline = BUCKET_OFFLINE === 'true';

const createAssetsClient = () =>
  new S3Client({
    forcePathStyle: true,
    ...(isOffline && {
      endpoint: 'http://localhost:4569',
      credentials: {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
    }),
  });

class AssetsService {
  client: S3Client;

  constructor() {
    this.client = createAssetsClient();
  }
}

export const assetsClient = new AssetsService().client;

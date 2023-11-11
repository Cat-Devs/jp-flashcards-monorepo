import { GetObjectCommand } from '@aws-sdk/client-s3';

import { logHelper } from './log';
import { assetsClient } from '../services/assets.service';

export const getImage = async (bucketName: string, objectName: string) => {
  try {
    const getObjectResult = await assetsClient.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      }),
    );

    if (!getObjectResult.Body) {
      throw new Error(`${objectName} empty Body`);
    }

    const bodyStream = getObjectResult.Body;
    const bodyAsString = await bodyStream.transformToString('base64');
    return bodyAsString;
  } catch (error) {
    logHelper(
      'error',
      `'GetObjectCommand' in 'getImage' with 'bucketName': '${bucketName}' and 'objectName': '${objectName}':`,
      (error as Error)?.message || error,
    );
  }
};

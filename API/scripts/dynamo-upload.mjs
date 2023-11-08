import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config';

import data from '../offline/migrations/flashcards-seed.json';

// Create a DynamoDB client
const client = new DynamoDBClient({ region: process.env.AWS_REGION });

// Create a DynamoDBDocumentClient using the DynamoDBClient
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Define your DynamoDB table name
const tableName = process.env.TABLE_NAME;

// Function to insert data into DynamoDB
async function insertData() {
  for (const item of data) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      await ddbDocClient.send(new PutCommand(params));
      console.log(`Inserted item with PK ${item.PK} and SK ${item.SK}`);
    } catch (error) {
      console.error(error.message);
    }
  }
}

// Call the function to insert data
insertData();

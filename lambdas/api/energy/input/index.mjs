import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const tableName = "energy-app-db";
  const userId = event.userId;
  const date =  event.date;
  const getParams = {
    TableName: tableName,
    Key: marshall({
      "userId": userId,
      "date": date,
    }),
  };

  try {
    let itemFromDB = null;
    const getCommand = new GetItemCommand(getParams);
    const getResponse = await client.send(getCommand);

    if (getResponse.Item) {
      const item = unmarshall(getResponse.Item);
      itemFromDB = item;
    }
    const postItem = {
      "userId": userId,
      "date": date,
      ...(itemFromDB || {}),
    };
    // fill in values to be added to  DynamoDB from the POST request where appropriate
    if (event.threshold) {
      postItem.threshold = event.threshold;
    }
    if (event.usage) {
      postItem.usage = event.usage;
    }
    const postParams = {
      TableName: tableName,
      Item: postItem,
    };

    const putCommand = new PutCommand(postParams);
    const putResponse = await docClient.send(putCommand);
    return {
      statusCode: 200,
      body: JSON.stringify(putResponse),
    };
  } catch (error) {
    console.error("Error fetching item:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update item", error: error.message }),
    };
  }
};

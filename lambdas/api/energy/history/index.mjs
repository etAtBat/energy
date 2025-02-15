import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from "@aws-sdk/util-dynamodb";


// Instantiate the DynamoDB Client
const client = new DynamoDBClient({ region: 'us-west-2' });  // Replace with your region

export const handler = async (event) => {
  const queryParams = event.queryStringParameters || {};  // Default to an empty object if no query string

  const userId = queryParams.userId;  // Get userId from query string, or default if not provided
  const startDate = queryParams.startDate || "2000-01-01";  // Default start date if not provided
  const endDate = queryParams.endDate || "2036-12-31"; // Default end date if not provided

  const tableName = "energy-app-db";  // Replace with your table name
  const primaryKeyAttributeName = "userId";  // Partition key attribute name
  const sortKeyAttributeName = "date";      // Sort key attribute name (date)

  let allItems = [];
  let lastEvaluatedKey = null;

  try {
    // Loop to handle pagination in case of large data
    do {
      const params = {
        TableName: tableName,
        KeyConditionExpression: '#userId = :userId AND #date BETWEEN :startDate AND :endDate',
        ExpressionAttributeNames: {
          '#userId': primaryKeyAttributeName,  // Substitute for the partition key name
          '#date': sortKeyAttributeName,       // Substitute for the sort key name
        },
        ExpressionAttributeValues: {
          ':userId': { S: userId },           // Value for the partition key
          ':startDate': { S: startDate },     // Start date value
          ':endDate': { S: endDate },         // End date value
        },
        ExclusiveStartKey: lastEvaluatedKey,  // Used for paginated results
      };

      // Perform the query operation using QueryCommand
      const command = new QueryCommand(params);
      const result = await client.send(command);
      
      // Unmarshall the DynamoDB response items to plain JavaScript objects
      const unmarshalledItems = result.Items.map(item => unmarshall(item))

      // Collect the items
      allItems = allItems.concat(unmarshalledItems);

      // Check if there's more data to retrieve
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey); // Continue if more data is available

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully fetched items by primary key and sort key (date).',
        data: allItems,
      }),
    };

  } catch (error) {
    console.error("Error in query operation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching data',
        error: error.message,
      }),
    };
  }
};

export const handler = async (event) => {
  // TODO implement

  // grab user ID from event
  // grab startDate from event
  // grab endDate from event

  // create DynamoDB client

  // find items for UserId / date range
  const response = {
    statusCode: 200,
    body: JSON.stringify([
      // items from DB
    ]),
  };
  return response;
};

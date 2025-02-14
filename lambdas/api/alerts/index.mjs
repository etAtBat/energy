export const handler = async (event) => {
  // TODO implement

  // grab user ID from event
  // grab date from event
  // grab threshold from event

  // create DynamoDB client

  // update record at UserId / threshold with new threshold value

  const response = {
    statusCode: 200,
    body: JSON.stringify('Energy threshold saved successfully'),
  };
  return response;
};

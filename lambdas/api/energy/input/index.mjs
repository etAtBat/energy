export const handler = async (event) => {
  // TODO implement

  // grab user ID from event
  // grab date from event
  // grab usage from event

  // create DynamoDB client

  // update record at UserId / date with new usage value

  // maybe invoke SNS from here?

 const response = {
    statusCode: 200,
    body: JSON.stringify('Energy data saved successfully'),
  };
  return response;
};

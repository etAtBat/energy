export const handler = async (event) => {
  // TODO implement

  // grab user ID from event
  // grab period from event [daily, weekly, monthly]

  // create DynamoDB client
  // find all items for UserId

  // probably going to require a time library for batching into day/week/month
  // daily -> do nothing
  // weekly -> batch returned items into weeks
  // monthly -> batch returned items into months

  const response = {
    statusCode: 200,
    body: JSON.stringify([
      // items from DB
    ]),
  };
  return response;
};

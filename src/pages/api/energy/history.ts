import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string;
  items?: Array<any>;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  console.log('method');
  console.log(method);
  if (method === 'GET') {
    console.log('yep we in the get')
    const startDate = (req.query?.startDate || '') as string;
    const endDate = (req.query?.endDate || '') as string;
    const accessToken = (req.query?.accessToken || '') as string;
    const userId = (req.query?.userId || '') as string;
    console.log('accessToken');
    console.log(accessToken);

    const url = `${process.env.API_GATEWAY_INVOKE_URL}/energy/history/?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
    // const data = {
    //   date,
    //   userId,
    //   usage,
    // };

    try {
      const result = await fetch(url, {
        method: "GET",
        // body: JSON.stringify(data),
        headers: {
          "Authorization": accessToken
        },
      }) as any;
      // console.log('result');
      // console.log(result);
      const fetchResult = await result.json();
      const userEnergyItems = fetchResult?.data || [];
      console.log('fetchResult');
      console.log(fetchResult);
      console.log('userEnergyItems');
      console.log(userEnergyItems);
      return res.status(200).json({ message: "Energy history fetched successfully", items: fetchResult });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(200).json({ message: 'History from Next.js!'});
  }
}
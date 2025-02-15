import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: Array<any>;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  if (method === 'GET') {
    const startDate = (req.query?.startDate || '') as string;
    const endDate = (req.query?.endDate || '') as string;
    const accessToken = (req.query?.accessToken || '') as string;
    const userId = (req.query?.userId || '') as string;

    const url = `${process.env.API_GATEWAY_INVOKE_URL}/energy/history/?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;

    try {
      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": accessToken
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
      const fetchResult = await result.json();
      const userEnergyItems = fetchResult?.data || [];
      return res.status(200).json({ message: "Energy history fetched successfully", items: fetchResult });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(200).json({ message: 'History from Next.js!'});
  }
}
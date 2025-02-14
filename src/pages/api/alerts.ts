import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  if (method === 'POST') {
    const { threshold } = req.body;
    console.log('threshold');
    console.log(threshold);

    // send the threshold to AWS to be stored in the DB
    return res.status(200).json({ message: 'Hello from the alerts threshold POST!' });
  }
  res.status(200).json({ message: 'alerts.ts!' })
}
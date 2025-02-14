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
    const { date, usage } = req.body;
    console.log('date');
    console.log(date);
    console.log('usage');
    console.log(usage);

    // send input to AWS endpoint
    return res.status(200).json({ message: 'Hello from the energy input POST!' });
  }

  res.status(200).json({ message: 'Hello from energy input!' });
}
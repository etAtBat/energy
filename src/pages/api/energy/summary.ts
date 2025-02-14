import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string;
  period?: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const period = (req.query?.period || '') as string;
  res.status(200).json({ message: 'History from Next.js!', period });
}

// this API endpoint is optional

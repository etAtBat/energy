import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string;
  startDate?: string;
  endDate?: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const startDate = (req.query?.startDate || '') as string;
  const endDate = (req.query?.endDate || '') as string;
  res.status(200).json({ message: 'History from Next.js!', startDate, endDate });
}
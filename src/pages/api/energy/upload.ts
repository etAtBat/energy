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
    const { input } = req.body;
    console.log('input');
    console.log(input);
    // Input: Pre-signed S3 URL for file upload (?)

    return res.status(200).json({ message: 'Hello from the energy upload POST!' });
  }
  res.status(200).json({ message: 'Hello from energy upload' })
}
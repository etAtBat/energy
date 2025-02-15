import type { NextApiRequest, NextApiResponse } from "next";
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  if (method === "POST") {
    const { date, accessToken, userId, threshold } = req.body;

    const url = `${process.env.API_GATEWAY_INVOKE_URL}/alerts`;
    const data = {
      date,
      userId,
      threshold,
    };

    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Authorization": accessToken
        },
      });
      return res.status(200).json({ message: "Threshold data saved successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(200).json({ message: "Hello from threshole update!" });
  }
}

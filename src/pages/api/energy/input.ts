import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  if (method === "POST") {
    const { date, usage, accessToken, userId } = req.body;
    // console.log("date");
    // console.log(date);
    // console.log("usage");
    // console.log(usage);
    // console.log("accessToken");
    // console.log(accessToken);
    // console.log("fetch");
    // console.log(fetch);
    // console.log("userId");
    // console.log(userId);

    const url = `${process.env.API_GATEWAY_INVOKE_URL}/energy/input`;
    const data = {
      date,
      userId,
      usage,
    };

    console.log('accessToken');
    console.log(accessToken);
    console.log("url");
    console.log(url);
    console.log("data");
    console.log(data);
    try {
      console.log("Authorization.....")
      // const result = await fetch(url, {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     // "Authentication": accessToken
      //     "Authentication": 'sfdsljfklsdl-this-wont-work'
      //   },
      // });
      console.log(`${accessToken}`);
      console.log(`${accessToken}`);
      const result = axios({
        method: "POST",
        url,
        headers: {
          "Authorization": `${accessToken}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
        },
        data: JSON.stringify(data),
      })
      .then(function (response) {
        // handle success
        console.log('response success');
        console.log(response);
        return res.status(200).json({ message: "Energy data saved successfully" });
      })
      .catch(function (error) {
        // handle error
        console.log('response error');
        // console.log(error.request);
        return res.status(500).json({ message: "something went awry" });

      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(202).json({ message: "Hello from energy input!" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};

import type { NextApiRequest, NextApiResponse } from "next"
import aws from "aws-sdk";
import crypto from "crypto";

type ResponseData = {
  uploadURL: string;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const clientParams = {
    region: "us-west-2",
    accessKeyId: process.env.S3_ENERGY_APP_UPLOADS_ACCESS_KEY,
    secretAccessKey: process.env.S3_ENERGY_APP_UPLOADS_SECRET_ACCESS_KEY,
    signatureVersion: "v4"
  };

  const s3 = new aws.S3(clientParams);

  const randomBytes = crypto.randomBytes(16);
  const imageName = randomBytes.toString("hex");

  const objectParams = {
    Bucket: "energy-app-uploads",
    Key: imageName,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", objectParams);
  res.status(200).json({ uploadURL })
}
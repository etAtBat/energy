This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Node 18.
There is a `.nvmrc` file in this repo. Running `nvm use` will read it and adjust your local Node version accordingly.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project architecture
![energy-app-architecture](https://github.com/user-attachments/assets/73566da0-429a-429d-b5f6-07bc60f251ba)

## Deploy on Vercel (a Next.js service)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Other deployment options

Dockerize the app, then send the resulting image to ECR where it can be deployed by an AWS service

## TODOs
- SNS alerts if a daily threshold is breached
- CSV upload to s3 -> insert into DynamoDB
- Validation / fail case handling
- Testing
- Dockerizing
- Break out forms into their own pages
- Addressing TypeScript errors that have been thus far ignored
- Use Swagger docs as both a source for API Gateway and as a source for an API visualization documentation page

## Secrets
A `.env` file is used to handle secrets. A stubbed out `dotenv` file is provided in the repo. Please copy the values into a `.env` of your own (it's `.gitignore`'d).
Variables that are used on the client can be seen in dotenv. Contact project maintainers for corresponding secret values.

## API
API swagger file is located in `/pages/api` (`api-swagger.json`). This file can be exported from API Gateway and should be updated when API Gateway changes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

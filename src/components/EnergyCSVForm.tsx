"use client"
import React, { FormEvent } from "react";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
  response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
  scope: process.env.NEXT_PUBLIC_RESPONSE_SCOPE,
};

const sumbitHandler = (e: FormEvent<HTMLFormElement>) => {
  console.log('beep');
  e.preventDefault();
};

export const EnergyCSVForm = () => {
  return (
    <form id="image-form" onSubmit={sumbitHandler}>
      <input id="image-input" type="file" accept=".csv"></input>
      <button type="submit">Upload</button>
    </form>
  );
};

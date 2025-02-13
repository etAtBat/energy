"use client"
import React from "react";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
  response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
  scope: process.env.NEXT_PUBLIC_RESPONSE_SCOPE,
};

export const CognitoWrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      {children}
    </AuthProvider>
  );
};

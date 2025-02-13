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

// // wrap the application with AuthProvider
// root.render(
//   <React.StrictMode>
//     <AuthProvider {...cognitoAuthConfig}>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );

export const CognitoWrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  console.log('cognito wrapper rendering');
  return (
    <AuthProvider {...cognitoAuthConfig}>
      {children}
    </AuthProvider>
  );
};

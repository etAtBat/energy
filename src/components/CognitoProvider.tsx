"use client"
import React from "react";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_3eJ1wts6V",
  client_id: "35r3gb789ct53llv9lualbt1rm",
  redirect_uri: "http://localhost:3000",
  response_type: "code",
  scope: "email openid phone",
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

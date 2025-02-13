
"use client"
import React from "react";
import { useAuth } from "react-oidc-context";

export const CognitoLogin = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  console.log('cognito login rendering')
  const auth = useAuth();
  console.log("auth?.user")
  console.log(auth?.user);
  console.log("children");
  console.log(children);
  console.log("process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID");
  console.log(process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID);
  const signOutRedirect = () => {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const logoutUri = process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI as string;
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      {auth?.user && <button onClick={() => signOutRedirect()}>Sign out</button>}
    </div>
  );
};

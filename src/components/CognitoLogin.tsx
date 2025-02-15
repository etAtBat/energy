
"use client"
import React from "react";
import { useAuth } from "react-oidc-context";

export const CognitoLogin = (): React.ReactElement => {
  const auth = useAuth();
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
        <button id="sign-out" onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button id="sign-in" onClick={() => auth.signinRedirect()}>Sign in</button>
      {auth?.user && <button onClick={() => signOutRedirect()}>Sign out</button>}
    </div>
  );
};

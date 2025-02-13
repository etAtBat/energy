
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
  const signOutRedirect = () => {
    const clientId = "35r3gb789ct53llv9lualbt1rm";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://us-west-23ej1wts6v.auth.us-west-2.amazoncognito.com";
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

import { useQuery, useLocalStorage, AUTH_TOKEN, REFRESH_TOKEN } from "@hooks";
import { useEffect } from "react";

type Query = {
  error?: string;
  provider: string;
  status: string;
  authToken?: string;
  refreshToken?: string;
  user?: string;
};

export const Oauth2 = () => {
  const query: Query = useQuery();
  const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);
  const [, setRefresh] = useLocalStorage(REFRESH_TOKEN);
  useEffect(() => {
    if (query.status === "200") {
      console.log(JSON.parse(query.user ?? "{}"));
      setAuthToken(query.authToken);
      setRefresh(query.refreshToken);
    }
  });

  return <div>Auth</div>;
};

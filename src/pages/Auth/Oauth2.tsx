import { useQuery, useLocalStorage, AUTH_TOKEN, REFRESH_TOKEN } from "@hooks";
type Query = {
  error?: string;
  provider: string;
  status: string;
  authToken?: string;
  refreshToken?: string;
};

export const Oauth2 = () => {
  const query: Query = useQuery();
  const [, setAuthToken] = useLocalStorage(AUTH_TOKEN);
  const [, setRefresh] = useLocalStorage(REFRESH_TOKEN);
  if (query.status === "200") {
    setAuthToken(query.authToken);
    setRefresh(query.refreshToken);
  }

  return <div>Auth</div>;
};

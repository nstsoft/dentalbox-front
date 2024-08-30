import { useQuery, useAuth } from "@hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      query.status === "200" &&
      query.authToken &&
      query.refreshToken &&
      query.user
    ) {
      login({
        refreshToken: query.refreshToken,
        authToken: query.authToken,
        user: JSON.parse(query.user ?? "{}"),
      });
      navigate("/app");
    }
  });

  return <div>Auth</div>;
};

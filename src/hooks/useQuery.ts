import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useQuery = <T extends Record<string, string>>() => {
  const { search } = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(search);
    const queryObject = {} as T;
    params.forEach((value, key) =>
      Object.assign(queryObject, { [key]: value })
    );
    return queryObject;
  }, [search]);
};

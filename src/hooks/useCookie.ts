export const useCookie = () => {
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/`;
  };

  const getCookie = (name: string) => {
    const cookiesList = document.cookie.split("; ");
    const cookie = cookiesList.find((item) => item.startsWith(`${name}=`));
    return cookie?.split("=")[1] ?? "";
  };

  const cleanCookie = () => {
    console.log("test clear");
    document.cookie = `auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `refresh-token=;  expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { setCookie, getCookie, cleanCookie };
};

import Cookies from "js-cookie";

export const AUTH_TOKEN_KEY = "rask-token";

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? "";
};

export const saveToken = (access_token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, access_token);
  let expires = new Date();
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
  Cookies.set("rask_token", access_token, { expires });
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  Cookies.remove("rask_token");
};

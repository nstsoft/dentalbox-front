import axios from "axios";

import { IUser, IWorkspace } from "../interfaces";

/**
 * Authenticates a user by sending a POST request to the login endpoint.
 *
 * @param {string} login - The user's login credentials.
 * @param {string} password - The user's password.
 * @return {Promise<IUser>} The authenticated user data.
 */
export const signIn = async (
  login: string,
  password: string
): Promise<IUser> => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
    { login, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 *
 * @param {IUser} user - The user data to be registered.
 * @param {IWorkspace} workspace - The workspace data associated with the user.
 * @return {Promise<unknown>} The response data from the registration endpoint.
 */
export const signUp = async (
  user: IUser,
  workspace: IWorkspace
): Promise<unknown> => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
    { user, workspace },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

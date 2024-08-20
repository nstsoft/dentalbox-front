import axios from "axios";
import { IUser } from "../interfaces";

/**
 * Retrieves a user's data by sending a GET request to the login endpoint.
 *
 * @param {string} id - The user's ID.
 * @return {Promise<IUser>} The user data.
 */
export const getUser = async (id: string): Promise<IUser> => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/login/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


import axios from "axios";
import { User } from "./type";

export const get = async (queryURL: string): Promise<User[]> => {
  try {
    const response = await axios.get(queryURL);

    return response?.data || [];
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error(err.message, err.status);
    throw err;
  }
};
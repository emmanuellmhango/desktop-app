import axios from "axios";
import { GENERAL_URL } from "../state/url";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/all_users`);
    const { success, users } = response.data;
    if (success) {
      return users;
    }
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";
import { GENERAL_URL } from "../../state/url";

export const fetchSystemUsers = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/system_users`);
    const { success, users } = response.data;
    if (success) {
      return users;
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};

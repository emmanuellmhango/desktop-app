import axios from "axios";
import { GENERAL_URL } from "../../state/url";

export const fetchUserClients = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/user_managements`);
    const { success, userClients } = response.data;
    if (success) {
      return userClients;
    } else {
      console.log("Error fetching claims");
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};

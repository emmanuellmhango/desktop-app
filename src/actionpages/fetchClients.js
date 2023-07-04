import axios from "axios";
import { GENERAL_URL } from "../state/url";

export const fetchClients = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/clients`);
    const { success, clients } = response.data;
    if (success) {
      return clients;
    }
  } catch (error) {
    return 0;
  }
};

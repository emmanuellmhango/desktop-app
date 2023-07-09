import axios from "axios";
import { GENERAL_URL } from "../../state/url";

export const fetchClaims = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/claims`);
    const { success, claims } = response.data;
    if (success) {
      return claims;
    } else {
      console.log("Error fetching claims");
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};

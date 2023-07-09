import axios from "axios";
import { GENERAL_URL } from "../state/url";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${GENERAL_URL}/categories`);
    const { success, categories } = response.data;
    if (success) {
      return categories;
    }
  } catch (error) {
    return 0;
  }
};

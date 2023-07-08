import axios from "axios";
import { GEO_URL } from "../../state/url";

export const reverGeoCode = async (location) => {
  if (location === null) {
    return;
  }
  const params = {
    lat: location.latitude,
    lon: location.longitude,
    apiKey: "741edd1ffa84481eaf80204150c2caa5",
  };
  try {
    const response = await axios.get(
      `${GEO_URL}?lat=${params.lat}&lon=${params.lon}&apiKey=${params.apiKey}`
    );
    const { features } = response.data;
    const data = { ...features[0].properties };
    return data.formatted;
  } catch (error) {
    console.log(error.response.data);
  }
};

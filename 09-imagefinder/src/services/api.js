import axios from "axios";

const api = "23424234231234234242342342"; // replace with your own API key
const url = "https://pixabay.com/api/";

export const getImages = async (text, type, number, currentPage) => {
  number = number < 3 ? 3 : number;
  console.log("getImages", type);

  try {
    const data = await axios.get(
      `${url}?key=${api}&q=${text}&image_type=${type}&page=${currentPage}&per_page=${number}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

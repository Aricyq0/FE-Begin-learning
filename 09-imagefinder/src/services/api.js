import axios from "axios";

const api = "45778741-c6a6af2cdcc5597a4012ed6b5";
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

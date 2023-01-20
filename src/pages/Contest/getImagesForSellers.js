import { googleSearchCx, googleSearchKey } from "../../config";
import axios from "axios";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getImagesForSellers = async (word, sellers) => {
  let start = 0;
  const num = 10;
  let finalImages = [];

  while (finalImages.length < sellers.length) {
    let URL = `https://www.googleapis.com/customsearch/v1?key=${googleSearchKey}&cx=${googleSearchCx}&q=${word}&num=${num}&start=${start}`;
    const response = await axios.get(URL);
    const { items: imagesData } = response.data;
    finalImages = finalImages.concat(
      imagesData.filter((image) => image.pagemap.cse_thumbnail !== undefined)
    );
    start += num + 1;
  }

  finalImages = shuffleArray(finalImages.slice(0, sellers.length));
  return sellers.map((seller, idx) => {
    return {
      ...seller,
      image: finalImages[idx].pagemap.cse_thumbnail[0].src,
    };
  });
};

export default getImagesForSellers;

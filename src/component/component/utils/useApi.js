import axios from "axios";
import { useEffect, useState } from "react";
import { CarouselURL, CardsURL } from "./constant";

const useApi = () => {
  const [productsCarousel, setProductsCarousel] = useState(null);
  const [productsCards, setProductsCards] = useState(null);
  const [category, setCategory] = useState(null);
  const [carouselCategory, setCarouselCategory] = useState(null);

  async function linked() {
    try {
      // Fetch carousel data
      const carouselResponse = await axios.get(CarouselURL);
      const carouselData = carouselResponse.data;

      // Extract unique carousel categories
      const carouselCategories = [...new Set(carouselData.map((elm) => elm.category))];

      // Fetch card data
      const cardsResponse = await axios.get(CardsURL);
      const cardData = cardsResponse.data.products;
      // console.log(cardData)
      // Extract unique card categories
      const cardCategories = [...new Set(cardData.map((elm) => elm.category))];
      cardCategories.push("All");

      // Update state with fetched data
      setProductsCarousel(carouselData);
      setProductsCards(cardData);
      setCategory(cardCategories.sort());
      setCarouselCategory(carouselCategories.map(cat => cat.toUpperCase()));

    //   console.log(carouselData, carouselCategories, cardData, cardCategories);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    linked();
  }, []);

  return [productsCarousel, productsCards, category, carouselCategory];
};

export default useApi;

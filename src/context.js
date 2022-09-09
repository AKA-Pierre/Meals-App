import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

//API urls
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

//local storage
const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = [];
  }
  return favorites;
};

//appprovider
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  //fetch data function / axios ver
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  //modal function
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  //close modal
  const closeModal = () => {
    setShowModal(false);
  };

  //favorite function
  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    //local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  //remove favorite
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    //local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  //fix search bug
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  //useEffect (invokes fetchData/axios)
  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        addToFavorites,
        removeFromFavorites,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

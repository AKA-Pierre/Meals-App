import React, { useState } from "react";
import { useGlobalContext } from "../context";

function Search() {
  const [text, setText] = useState("");

  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
      setText("");
    }
  };
  //fix search bug
  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type favorite meal"
          className="form-input"
          value={text}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          search
        </button>
        <button
          type="button"
          className="btn btn-hipster"
          onClick={handleRandomMeal}
        >
          suprise me!
        </button>
      </form>
    </header>
  );
}

export default Search;

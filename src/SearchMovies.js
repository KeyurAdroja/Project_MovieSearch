import React, { useState } from "react";
import MovieCard from "./MovieCard";

const SearchMovies = () => {
  // we need a state variables for 2 things: (1) movies coming from url and (2) query inserted by user

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const findMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    var url = "https://api.themoviedb.org/3/search/movie?api_key=dd9259ea355e6e6da0f824a6d59dd6a1&language=en-US&query=" + query + "&page=1&include_adult=false";

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={findMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e Jurassic Park"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
};

export default SearchMovies;

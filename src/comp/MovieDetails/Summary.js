import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import Rating from "@mui/material/Rating";
import Genre from "./Genre";
import "../../css/Summary.scss";

export default function Summary(props) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieStatus, setMovieStatus] = useState();
  const [checkHeart, setHeart] = useState(false);

  useEffect(() => {
    setMovieDetails(props.details);
    fetch(`/api/getMovieStatus`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data.data.some((item) => {
          item.movie_id === props.details.id && (
            <>
              {setHeart(true)} {setMovieStatus(item.status)}
            </>
          );
        });
      })
      .catch((err) => console.log("couldnt get movie status"));
  }, [props.details]);

  const addMovie = (movie) => {
    setHeart((prevCheck) => !prevCheck);
    if (checkHeart) {
      deleteMovie(movie.id);
    } else {
      fetch(`/api/addMovies`, {
        body: JSON.stringify({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
          genre_ids: movie.genre_ids,
          popularity: movie.popularity,
          vote_average: movie.vote_average,
          overview: movie.overview,
        }),
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log("couldnt add movie"));
    }
  };

  const deleteMovie = (id) => {
    fetch(`/api/deleteMovies`, {
      body: JSON.stringify({
        id: id,
      }),
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("couldnt delete movie"));
  };

  return (
    <div className="summary">
      {movieDetails.length !== 0 &&
        [movieDetails].map((item, index) => (
          <div
            className="summary-details flex flex-col lg:flex-row mt-40"
            key={index}
          >
            <img
              src={process.env.REACT_APP_IMG_URL + item.poster_path}
              alt=""
            />

            <div className="flex flex-col ml-0 lg:ml-10 mt-10 lg:mt-36">
              <div className="flex flex-row status">
                <p className={checkHeart ? "block text-lg mt-1" : "hidden"}>
                  {movieStatus}
                </p>
                <HeartIcon
                  onClick={() => addMovie(item)}
                  className={
                    checkHeart
                      ? "text-my-red cursor-pointer h-14 w-14 pb-5"
                      : "cursor-pointer h-14 w-14 pb-5"
                  }
                />
              </div>
              <h1 className="text-4xl pb-5 ml-44 sm:ml-96">
                {item.release_date.substring(0, 4)}
              </h1>
              <Genre genres={item.genre_ids} />
              {item.vote_average === 0 ? (
                <p className="py-5">N/A</p>
              ) : (
                <Rating
                  className="py-5"
                  name="read-only"
                  value={item.vote_average}
                  readOnly
                />
              )}
              <p className="w-64 sm:w-100 text-xl">{item.overview}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

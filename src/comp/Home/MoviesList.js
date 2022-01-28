import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/MoviesList.scss";
import { HeartIcon } from "@heroicons/react/solid";

export default function Test({ header, data }) {
  const [fetchedGenre, setNowFetchedGenre] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_GENRE_API_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setNowFetchedGenre(res.data.genres);
      });
  };

  return (
    <>
      {data.length > 0 &&
        data.slice(1, 7).map((item, index) => (
          <Link
            className="movies-list mr-4 2xl:mb-0 mb-4 cursor-pointer"
            to={{ pathname: `/movie/${item["title"]}`, state: item }}
            key={index}
          >
            <img
              className="rounded"
              src={
                item["poster_path"]
                  ? `${process.env.REACT_APP_IMG_URL}${item["poster_path"]}`
                  : "https://i.ibb.co/jkZ6KqH/no-cover.jpg"
              }
              alt="no cover"
            />
            <div className="details">
              <HeartIcon className="heart-icon h-6 w-6 m-2" />
              <h4 className="p-2 pb-8 font-semibold text-lg">
                {item["title"].length > 21
                  ? item["title"].substring(0, 19)
                  : item["title"]}
              </h4>
              <p className="p-2">{item["release_date"].substring(0, 4)}</p>
            </div>
          </Link>
        ))}
    </>
  );
}

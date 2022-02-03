import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HeartIcon } from "@heroicons/react/solid";
import "../../../css/ViewAll.scss";

export default function ViewAll(props) {
  const [header, setHeader] = useState();
  const [moreMovies, setMoreMovies] = useState([]);
  const pageNumbers = [1, 2, 3, 4];

  useEffect(() => {
    // let isMounted = true;
    getHeader();
  }, [props.match.params.number]);

  const getHeader = () => {
    if (props.location.pathname.includes("/category/now_playing")) {
      setHeader("Now playing");
      getMoreMovies();
    } else if (props.location.pathname.includes("/category/upcoming")) {
      setHeader("Upcoming Movies");
      getMoreMovies();
    } else if (props.location.pathname.includes("/category/top_rated")) {
      setHeader("Top Movies");
      getMoreMovies();
    } else {
      setHeader(props.location.pathname.slice(10, -7));
      getSearchedMovies();
    }
  };

  const getMoreMovies = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/${props.match.params.name}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${props.match.params.number}`
      )
      .then((res) => {
        setMoreMovies(res.data.results);
      });
  };

  const getSearchedMovies = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SEARCH_API_URL}api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${props.location.pathname.slice(10, -7)}&page=1`
      )
      .then((res) => {
        setMoreMovies(res.data.results);
      });
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center py-16">{header}</h1>
      <div
        className={
          moreMovies.length > 0 ? `flex flex-row flex-wrap  ml-5 sm:ml-0` : ""
        }
      >
        {moreMovies.length > 0 ? (
          moreMovies.map((item, index) => (
            <Link
              to={{ pathname: `/movie/${item["title"]}`, state: item }}
              key={index}
              className="ml-4 sm:ml-2"
            >
              <div className="flex flex-col mb-10">
                <div className="heart-icon-wrap mx-2 cursor-pointer">
                  <img
                    className="rounded"
                    src={
                      item["poster_path"]
                        ? `${process.env.REACT_APP_IMG_URL}${item["poster_path"]}`
                        : "https://i.ibb.co/jkZ6KqH/no-cover.jpg"
                    }
                    alt="no cover"
                  />
                  <HeartIcon className="heart-icon h-6 w-6 m-2" />
                </div>

                <h4 className="mx-2 font-semibold text-sm sm:text-lg">
                  {item["title"].length > 21
                    ? item["title"].substring(0, 19)
                    : item["title"]}
                </h4>
                <p className="mx-2 text-sm sm:text-md text-gray-500">
                  {item["release_date"].substring(0, 4)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h2 className="text-xl text-center">Nothing found</h2>
        )}
      </div>
      {moreMovies.length > 0 && (
        <>
          {pageNumbers.map((page, index) => (
            <Link
              to={`/category/${props.match.params.name}/page/${page}`}
              key={index}
            >
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                {page}
              </button>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

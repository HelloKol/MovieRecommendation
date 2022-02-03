import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import MoviesList from "./MoviesList";
import "../../css/Home.scss";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    // Now playing movies list
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setNowPlaying(res.data.results);
      });

    // Upcoming movies list
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setUpcoming(res.data.results);
      });

    // Popular movies list
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setTopRated(res.data.results);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-20 ml-10 sm:ml-0">
        {/* Now playing list */}
        <Link
          to={{
            pathname: "/category/now_playing/page/1",
            state: { header: "Now Playing" },
          }}
        >
          <div className="headers flex mt-16 mb-5 flex-row cursor-pointer">
            <h1 className="font-semibold text-2xl">Now Playing</h1>
            <h3 className="font-semibold text-xl text-gray-500 self-center ml-4 mr-1">
              View all
            </h3>
            <ChevronDoubleRightIcon className="cevron-right self-center h-6 w-6 text-gray-500" />
          </div>
        </Link>
        <div className="flex flex-row flex-wrap">
          <MoviesList header="Now Playing" data={nowPlaying} />
        </div>
        {/* Upcoming list */}
        <Link
          to={{
            pathname: "/category/upcoming/page/1",
            state: { header: "Upcoming Movies" },
          }}
        >
          <div className="headers flex mt-16 mb-5 flex-row cursor-pointer">
            <h1 className="font-semibold text-2xl">Upcoming Movies</h1>
            <h3 className="font-semibold text-xl text-gray-500 self-center ml-4 mr-1">
              View all
            </h3>
            <ChevronDoubleRightIcon className="cevron-right self-center h-6 w-6 text-gray-500" />
          </div>
        </Link>
        <div className="flex flex-row flex-wrap">
          <MoviesList header="Upcoming Movies" data={upcoming} />
        </div>
        {/* Ad banner */}
        <div className="banner-box hidden sm:block mt-16 mb-5">
          <img src="https://i.imgur.com/HBgUOJT.png" alt="" />
          <div className="banner-texts">
            <h1 className="text-2xl md:text-4xl font-bold mb-10">
              Explore more and more <br /> exclusive movies here on MovieZen
            </h1>
            <div className="flex flex-row">
              <button className="text-white font-bold py-3 px-8 mr-5 rounded-full">
                Get updated
              </button>{" "}
              <h3 className="self-center">Only for $5 a month!</h3>
            </div>
          </div>
        </div>
        {/* Top list */}
        <Link
          to={{
            pathname: "/category/top_rated/page/1",
            state: { header: "Top Movies" },
          }}
        >
          <div className="headers flex mt-16 mb-5 flex-row cursor-pointer">
            <h1 className="font-semibold text-2xl">Top Movies</h1>
            <h3 className="font-semibold text-xl text-gray-500 self-center ml-4 mr-1">
              View all
            </h3>
            <ChevronDoubleRightIcon className="cevron-right self-center h-6 w-6 text-gray-500" />
          </div>
        </Link>
        <div className="flex flex-row flex-wrap">
          <MoviesList header="Top Movies" data={topRated} />
        </div>
      </div>
    </div>
  );
}

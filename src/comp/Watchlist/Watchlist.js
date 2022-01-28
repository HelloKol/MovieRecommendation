import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    getWatchlist();
  }, []);

  const getWatchlist = async () => {
    await fetch(`/api/viewMovies`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
      .catch((err) => console.log("couldnt view movie watchlist"));
  };

  return (
    <div className="container mx-auto mywatchlist-page pb-20 overflow-x-hidden">
      <h2 className="text-4xl font-semibold mt-20 mb-14 pl-3">My Watchlist</h2>
      <div className="flex flex-row flex-wrap mb-14 pl-3">
        <h3 className="text-lg md:text-xl bg-zinc-800 px-7 py-3 mr-7 rounded-full cursor-pointer">
          All
        </h3>
        <h3 className="text-lg md:text-xl hover:bg-zinc-800 px-7 py-3 mr-7 rounded-full cursor-pointer">
          Currently watching
        </h3>
        <h3 className="text-lg md:text-xl hover:bg-zinc-800 px-7 py-3 mr-7 mt-4 xs:mt-0 rounded-full cursor-pointer">
          Completed
        </h3>
        <h3 className="text-lg md:text-xl hover:bg-zinc-800 px-7 py-3 mt-4 md:mt-0 rounded-full cursor-pointer">
          Plan to watch
        </h3>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="hidden md:table-cell">#</th>
            <th className="float-left ml-4">Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th className="hidden md:table-cell">Popularity</th>
            <th className="hidden md:table-cell">Votes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="w-full text-center">
          {watchlist.length > 0 ? (
            watchlist.map((item, index) => (
              <tr key={index}>
                <td className="hidden md:table-cell">{index + 1}</td>
                <td>
                  <img
                    className="min-h-28 max-h-28 ml-4 my-3"
                    src={process.env.REACT_APP_IMG_URL + item.poster_path}
                    alt=""
                  />
                </td>
                <td className="break-words">
                  <Link
                    to={{ pathname: `/movie/${item.title}`, state: item }}
                    key={index}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.release_date.substring(0, 4)}</td>
                <td className="hidden md:table-cell">
                  {" "}
                  {item.vote_average === 0 ? (
                    <p>N/A</p>
                  ) : (
                    <Rating
                      name="half-rating-read"
                      defaultValue={item.vote_average}
                      precision={0.5}
                      readOnly
                    />
                  )}
                </td>
                <td className="hidden md:table-cell">{item.popularity}</td>
                <td>
                  <Dropdown movie={item} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Nothing found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

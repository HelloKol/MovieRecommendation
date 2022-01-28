import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Genre(props) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_GENRE_API_URL}api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((result) => {
        const filteredGenres = result.data.genres.filter((r) =>
          props.genres.includes(r.id)
        );
        setGenres(filteredGenres);
      });
  };

  return (
    <div className="flex flex-row max-w-max">
      {genres.map((genre,index) => (
        <p className="mr-4 text-zinc-400" key={index}>
          {genre.name}
        </p>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Cast.scss";

export default function CastDetails(props) {
  const [castDetails, setCastDetails] = useState([]);

  useEffect(() => {
    getCasts();
  }, []);

  const getCasts = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setCastDetails(res.data.cast);
      });
  };
  return (
    <div className="cast-details mt-44 pb-10">
      <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl text-center font-bold">
        Cast & creators
      </h1>
      {castDetails.length > 0 ? (
        <div className="flex flex-col md:flex-row mt-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
            Cast
          </h2>
          <div className="flex flex-row mt-5 sm:mt-0 ml-5 sm:ml-0">
            <div className="flex flex-col lg:ml-44 xl:ml-64">
              {castDetails.slice(0, 8).map((cast, index) => (
                <div className="cast-box" key={index}>
                  <p className="text-md sm:text-lg text-zinc-400 py-6">
                    {cast.original_name}
                  </p>
                  <img
                    src={process.env.REACT_APP_IMG_URL + cast.profile_path}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col ml-10 sm:ml-44">
              {castDetails.slice(8, 16).map((cast, index) => (
                <div className="cast-box" key={index}>
                  <p className="text-md sm:text-lg text-zinc-400 py-6">
                    {cast.original_name}
                  </p>
                  <img
                    src={process.env.REACT_APP_IMG_URL + cast.profile_path}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center my-20">No cast found</h3>
      )}
    </div>
  );
}

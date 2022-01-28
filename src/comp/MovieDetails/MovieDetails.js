import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Cast from "./Cast";
import Summary from "./Summary";
import Comment from "./Comment";
import "../../css/MovieDetails.scss";

export default function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState([]);
  const [videoId, setVideoId] = useState();

  useEffect(() => {
    setMovieDetails(props.location.state);
    const getVideo = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/${props.location.state.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((result) => setVideoId(result.data.results[0].key));
    };
    getVideo();
  }, [props.location.state]);

  return (
    <>
      {movieDetails.length !== 0 &&
        [movieDetails].map((item, index) => (
          <div className="movie-details" key={index}>
            <img
              className="movie-backdrop"
              src={process.env.REACT_APP_BACKDROP_URL + item.backdrop_path}
              alt=""
            />
            <div className="details flex flex-col">
              <h1 className="title text-7xl text-center mb-24">{item.title}</h1>
              <a
                className="play-btn h-44 w-44 self-center"
                href={`${process.env.REACT_APP_YOUTUBE_URL}${videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src="https://i.imgur.com/SoXGqqd.png" alt="play btn" />
              </a>
            </div>
          </div>
        ))}
      <Summary details={props.location.state} />
      <Cast id={props.location.state.id} />
      {/* TABS WITH COMMENTS AND TICKETS */}
      <div className="container mx-auto mt-20">
        <Tab.Group>
          <Tab.List>
            <Tab className="text-2xl sm:text-3xl outline-none text-zinc-500">
              {({ selected }) => (
                <button
                  className={
                    selected ? "border-b-2 border-b-my-red p-3 " : " p-3 "
                  }
                >
                  Comments
                </button>
              )}
            </Tab>
            <Tab className="text-2xl sm:text-3xl p-2 ml-10 outline-none text-zinc-500">
              {({ selected }) => (
                <button
                  className={
                    selected ? "border-b-2 border-b-my-red p-3 " : " p-3 "
                  }
                >
                  Tickets
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <p>Under development</p>
              {/* <Comment /> */}
            </Tab.Panel>
            <Tab.Panel className="mt-10">
              <p>Under development</p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

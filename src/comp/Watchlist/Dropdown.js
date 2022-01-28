import React, { useState } from "react";

const testDropdown = ["Edit", "Watching", "Completed", "Planning"];
export default function Dropdown(props) {
  const updateStaus = async (e) => {
    await fetch(`/api/updateMovieStatus`, {
      body: JSON.stringify({
        id: props.movie.id,
        status: e.target.value,
      }),
      method: "PUT",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("couldnt update movie status"));
  };

  return (
    <select
      onChange={updateStaus}
      className="ml-4 w-30 sm:w-36 text-gray-900 text-sm text-center rounded-lg p-2.5"
    >
      {testDropdown.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}

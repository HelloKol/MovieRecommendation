import React from "react";

export default function Request() {
  return (
    <div className="mt-20 container mx-auto">
      <h1 className="text-5xl px-6">Request movie</h1>
      <form>
        <div className="pt-6">
          <div className="px-6 py-10 max-w-2xl">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-lx font-serif">
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Superman"
                  id="title"
                  className="ml-2 outline-none py-4 px-4 text-md rounded bg-zinc-700"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-lg font-serif"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="Add a description..."
                  className="w-full font-serif p-4 outline-none rounded bg-zinc-700 resize-none"
                ></textarea>
              </div>

              <button className=" px-6 py-2 block rounded-md text-lg font-semibold bg-my-red">
                ADD MOVIE
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

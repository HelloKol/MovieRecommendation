import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContext";

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(LoginContext);
  const [email, setEmail] = useState(),
    [first_name, setFirstName] = useState(),
    [last_name, setLastName] = useState(),
    [username, setUserName] = useState();

  const handleSubmit = (event) => {
    // setEmail(currentUser.email);
    // setFirstName(currentUser.first_name);
    // setLastName(currentUser.last_name);
    // setUserName(currentUser.username);
    // event.preventDefault();
  };

  if (currentUser) {
    return (
      <form onSubmit={handleSubmit} className=" container mx-auto">
        <div className="px-4">
          <div className="rounded relative h-48">
            <img
              src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg"
              alt=""
              className="w-full h-full object-cover rounded absolute"
            />
            {/* <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" /> */}
            <div className="w-36 h-36 rounded-full absolute bottom-0 -mb-16 left-1/2 transform -translate-x-1/2 lg:ml-24 lg:left-24">
              <img
                src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg"
                alt=""
                className="absolute z-0 h-full w-full object-cover rounded-full top-0 left-0 bottom-0 right-0"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full lg:ml-96">
            <label htmlFor="username" className="pb-2 text-sm font-bold ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={currentUser.username}
              className="bg-zinc-900 px-3 py-5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500"
              placeholder="@example"
            />
          </div>
          <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full lg:ml-96">
            <label htmlFor="about" className="pb-2 text-sm font-bold ">
              About
            </label>
            <textarea
              id="about"
              name="about"
              required
              className="bg-zinc-900 px-3 py-5  shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 "
              placeholder="Let the world know who you are"
              rows={5}
              defaultValue={""}
            />
            <p className="w-full text-right text-xs pt-1 text-gray-500">
              Character Limit: 200
            </p>
          </div>
        </div>

        <div className="mt-10 px-4 lg:ml-96">
          <div className="xl:w-full border-b py-5">
            <div className="flex items-center">
              <p className="text-lg  font-bold">Personal Information</p>
              <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                >
                  <path
                    className="heroicon-ui"
                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div className="container mx-auto">
              <div className="xl:w-2/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="FirstName" className="pb-2 text-sm font-bold ">
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  required
                  className="bg-zinc-900 px-3 py-5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700  placeholder-gray-500"
                  placeholder="John"
                />
              </div>
              <div className="xl:w-2/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="LastName" className="pb-2 text-sm font-bold ">
                  Last Name
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="lastName"
                  className=" bg-zinc-900 px-3 py-5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700  placeholder-gray-500"
                  placeholder="Doe"
                />
              </div>
              <div className="xl:w-2/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="Email" className="pb-2 text-sm font-bold ">
                  Email
                </label>
                <div className="rounded flex">
                  <input
                    type="text"
                    id="Email"
                    name="email"
                    required
                    className="bg-zinc-900 px-3 py-5 w-full text-sm focus:outline-none placeholder-gray-500 rounded"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className="xl:w-2/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="Country" className="pb-2 text-sm font-bold ">
                  Country
                </label>
                <input
                  type="text"
                  id="Country"
                  name="country"
                  required
                  className="bg-zinc-900 px-3 py-5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700  placeholder-gray-500"
                  placeholder="United Kingdom"
                />
              </div>
              <div className="xl:w-2/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="Country" className="pb-2 text-sm font-bold ">
                  City
                </label>
                <input
                  type="text"
                  id="Country"
                  name="country"
                  required
                  className="bg-zinc-900 px-3 py-5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700  placeholder-gray-500"
                  placeholder="London"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-4 px-4 flex justify-end">
          <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">
            Cancel
          </button>
          <button
            className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <>
        <p>Not logged in</p>
      </>
    );
  }
}

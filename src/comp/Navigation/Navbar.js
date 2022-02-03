import { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import "../../css/Navbar.scss";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(LoginContext);
  const [search, setSearch] = useState();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    fetch(`/api/getCurrentUser`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedin) {
          setCurrentUser(data.data);
        }
      })
      .catch((err) => console.log("couldnt fetch current user"));
  }, []);

  const logout = () => {
    fetch(`/api/logout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data.status === "success" && window.location.reload())
      .catch((err) => console.log("couldnt logout current user"));
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const submitForm = (event) => {
    window.location.href = `/category/${search}/page/1`;
    event.preventDefault();
  };

  return (
    <nav className="hidden md:block container mx-auto desktop-navigation py-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p
            className="text-2xl lg:text-3xl cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <span>Movie</span>Zen
          </p>
          <div className="flex flex-row ml-36 self-center">
            <p
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </p>
            {currentUser.email !== undefined && (
              <p
                className="ml-10 cursor-pointer"
                onClick={() => {
                  window.location.href = "/mywatchlist";
                }}
              >
                Watchlist
              </p>
            )}

            <p
              className="ml-10 cursor-pointer"
              onClick={() => {
                window.location.href = "/request";
              }}
            >
              Request
            </p>
          </div>
        </div>

        <div className="flex flex-row mr-16">
          <form onSubmit={submitForm}>
            <input
              type="text"
              className="outline-none border-none px-6 py-3 rounded"
              placeholder="Search"
              onChange={handleSearch}
              required
            />
          </form>

          {currentUser.email !== undefined ? (
            <Menu as="div" className="mx-3 relative self-center z-10">
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full outline-none">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.imgur.com/PIBMdb1.png"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {currentUser.username !== undefined ? (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                  ) : (
                    ""
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={logout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        )}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button
              onClick={() => {
                window.location.href = "/auth";
              }}
              className="login-btn text-white font-bold py-2 px-6 rounded ml-4"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import "../../css/Comment.scss";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Comment() {
  return (
    <div className="comment-comp mt-20">
      <div className="flex flex-row">
        <img
          height={60}
          width={60}
          src="https://i.imgur.com/PIBMdb1.png"
          alt=""
        />
        <input
          type="text"
          className="border-0 outline-none bg-transparent border-b w-full ml-6"
          placeholder="Add a comment"
          required
        />
      </div>

      <div className="flex flex-row justify-end p-2">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Comment
        </button>
      </div>

      <div className="flex flex-row my-8">
        <img src="https://i.imgur.com/PIBMdb1.png" alt="" />

        <div className="flex flex-col px-6">
          <div className="flex flex-row">
            <p className="font-semibold">John doe</p>
            <span className="w-2 h-2 bg-zinc-600 self-center rounded-full mx-2"></span>
            <p className="text-zinc-400">johny132</p>
          </div>
          <div className="flex flex-row justify-between comment">
            <p className="mt-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            </p>
            <Menu as="div" className="comment-menu relative">
              <div className="menu">
                <Menu.Button className="flex text-sm rounded-full focus:outline-none ">
                  <span className="sr-only">Open menu</span>
                  <div className="flex flex-col p-3">
                    <span className="bg-zinc-200 mb-1 rounded-full"></span>
                    <span className="bg-zinc-200 mb-1 rounded-full"></span>
                    <span className="bg-zinc-200 rounded-full"></span>
                  </div>
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-zinc-800" : "",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-zinc-800" : "",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

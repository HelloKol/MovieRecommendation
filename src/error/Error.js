import React from "react";

export default function Error() {
  return (
    <div class="flex items-center justify-center h-screen mt-44 mb-10 lg:mt-10 xl:mt-0 xl:mb-0">
      <div class="px-4 lg:py-12">
        <div class="lg:gap-4 lg:flex">
          <div class="flex flex-col items-center justify-center md:py-10 lg:py-32">
            <h1 class="font-bold text-9xl">404</h1>
            <p class="mb-2 text-2xl font-bold text-center md:text-3xl">
              <span class="text-my-red">Oops!</span> Page not found
            </p>
            <p class="mb-8 text-center text-gray-400 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <a
              onClick={() => (window.location.href = `/`)}
              class="px-6 py-2 text-sm font-semibold bg-my-red cursor-pointer"
            >
              Go home
            </a>
          </div>
          <div class="mt-4">
            <img
              src="https://i.imgur.com/E1K95z1.jpg"
              alt="img"
              style={{ height: "500px" }}
              class="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

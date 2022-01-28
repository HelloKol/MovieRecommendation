import React, { useState } from "react";
import "../../css/Authentication.scss";
import CustomSnackbar from "../../snackbar/CustomSnackbar";

export default function Signup(props) {
  const [checkClick, setCheckClick] = useState(false);
  const [signupError, setSignupError] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const changeComp = () => {
    props.checkLoginComp("login");
  };

  const submitSignup = (event) => {
    setCheckClick(true);
    fetch(`/api/signup`, {
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) =>
        data.signedUp ? (
          <>
            {setSignupError(false)}
            {setTimeout(function () {
              window.location.href = "/auth";
            }, 1000)}
          </>
        ) : (
          setSignupError(true)
        )
      );
    event.preventDefault();
  };
  return (
    <>
      <form
        onSubmit={submitSignup}
        class="signup-form space-y-6 text-gray-700 w-10/12 lg:w-8/12 m-auto"
      >
        {checkClick ? (
          signupError ? (
            <CustomSnackbar
              status="error"
              message="Email already exists, try again"
            />
          ) : (
            <CustomSnackbar status="success" message="Signup was successful" />
          )
        ) : (
          ""
        )}
        <h1 className="text-4xl md:text-5xl font-semibold pt-10 lg:pt-5 mb-14 text-center text-white">
          Welcome to MovieZen
        </h1>
        <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
          <div class="w-full px-2 md:w-1/2">
            <label class="block mb-1 text-white" for="formGridCode_name">
              First name
            </label>
            <input
              class="w-full h-10 px-3 py-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_name"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div class="w-full px-2 md:w-1/2">
            <label class="block mb-1 text-white" for="formGridCode_last">
              Last name
            </label>
            <input
              class="w-full h-10 px-3 py-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_last"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full">
            <label class="block mb-1 text-white" for="formGridCode_card">
              Username
            </label>
            <input
              class="w-full h-10 px-3 py-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_card"
              placeholder="john234"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full">
            <label class="block mb-1 text-white" for="formGridCode_card">
              Email
            </label>
            <div class="relative text-gray-700">
              <input
                class="w-full h-10 pl-3 pr-10 py-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="email"
                placeholder="example@something.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full">
            <label
              class="block mb-1 text-white"
              for="forms-validationInputCode_success"
            >
              Password
            </label>

            <div class="text-gray-700">
              <div class="relative text-gray-700">
                <input
                  class="w-full h-10 pl-3 pr-10 py-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="password"
                  placeholder="5+ string characters"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
              {/* <span class="text-xs text-green-700" id="passwordHelp">
                  Your password is strong.
                </span> */}
            </div>
          </div>
        </div>
        <br />
        <label class="text-white">
          <input type="checkbox" value="" required />
          <span class="ml-1">
            By signing up, I agree to MovieZens
            <b className="underline cursor-pointer ml-2">terms & conditions</b>
          </span>
        </label>
        <button
          type="submit"
          class="
                w-full
                px-6
                py-4
                bg-blue-600
                text-white
                rounded"
        >
          Submit
        </button>
        <p className="text-white">
          Already have an account?
          <b className="underline cursor-pointer ml-2" onClick={changeComp}>
            Log in
          </b>
        </p>
      </form>
    </>
  );
}

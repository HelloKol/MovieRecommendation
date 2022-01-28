import React, { useState } from "react";
import CustomSnackbar from "../../snackbar/CustomSnackbar";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [checkClick, setCheckClick] = useState(false);
  const [loginError, setLoginError] = useState();

  const changeComp = () => {
    props.checkLoginComp("signup");
  };
  const submitLogin = (event) => {
    setCheckClick(true);
    fetch(`/api/login`, {
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedin ? (
          <>
            {setLoginError(false)}{" "}
            {setTimeout(function () {
              window.location.href = "/";
            }, 1000)}
          </>
        ) : (
          setLoginError(true)
        )
      )
      .catch((err) => console.log("login error"));
    event.preventDefault();
  };
  return (
    <>
      <form
        onSubmit={submitLogin}
        class="signup-form space-y-6 text-gray-700 w-10/12 lg:w-8/12 m-auto"
      >
        <div>
          {checkClick ? (
            loginError ? (
              <CustomSnackbar
                status="error"
                message="Email or password is incorrect"
              />
            ) : (
              <CustomSnackbar status="success" message="Login was successful" />
            )
          ) : (
            ""
          )}
          <h1 className="text-4xl md:text-5xl font-semibold pt-14 lg:pt-5 text-center text-white">
            Hi there!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-14 text-center text-white">
            Have we met before?
          </h2>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full">
            <label
              class="block mb-1 text-white"
              for="forms-validationInputCode_success"
            >
              Email
            </label>

            <div class="text-gray-700">
              <div class="relative text-gray-700">
                <input
                  class="w-full h-10 pl-3 pr-10 py-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="email"
                  placeholder="example@something.com"
                  onChange={(e) => setEmail(e.target.value)}
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
              {/* <span class="text-xs text-green-700" id="passwordHelp">
                Your password is strong.
              </span> */}
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
        <p className="text-white underline font-semibold cursor-pointer text-my-red float-right">
          Forgot my password?
        </p>
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
          Don't have an account?
          <b className="underline cursor-pointer ml-2" onClick={changeComp}>
            sign up
          </b>
        </p>
      </form>
    </>
  );
}

import { useNavigate, useNavigation } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function AuthPage() {
  const redirect = useNavigate();
  const [formData, setFormData] = useState(initialState);
  // const [isSignedUp, setisSignedUp] = useState(second)
  // const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  // const handleShowPassword = () =>setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
  };
  // console.log(isSignedUp)

  const dataOfLogIn = async () => {
    let result = await fetch("/user/login", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(result)
    result = await result.json();
    console.log(result);
    // console.log(email,password)

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result.token));
      redirect("/home");
    } else if(result.response.status === 400) {
      console.log('sdkudbviusdvb');
      alert("Please Enter Correct Credentials");
      
    }
  };

  const dataOfSignup = async () => {
    let result = await fetch("/user/signup", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result)
    if (result) {
      setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignedUp) {
      dataOfLogIn();
    } else {
      dataOfSignup();
    }
    // console.log(formData);
    // console.log( formData.email,formData.password)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setFormData(decodedInfo.name);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      redirect("/home");
    }
  }, [user]);
  return (
    <div className=" flex flex-col bg-fuchsia-800 h-screen  sm:py-12">
      <div className="relative  sm:max-w-xl sm:mx-auto">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
        <div className="relative px-4 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="w-[330px] mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-white">
                {isSignedUp ? "Log In" : "Sign Up"}
              </h1>
            </div>

            {isSignedUp ? (
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative flex space-x-16">
                    <p className="text-white">Email</p>
                    <input
                      id="email"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      className="border font-light rounded"
                      // placeholder="Email address"
                    />
                  </div>
                  <div className="relative flex space-x-8 ">
                    <p className="text-white">Password</p>

                    <input
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="border font-light rounded"
                      // placeholder="Password"
                    />
                  </div>
                  <div className="relative flex">
                    <button
                      className="bg-white text-black rounded-md px-4 py-2"
                      onClick={handleSubmit}
                    >
                      LOGIN
                    </button>
                  </div>
                  <div className="cursor-pointer">
                    <span className=" text-white text-base font-mono -ml-3 rounded-md px-4 py-2">
                      Don't Have an Account?{" "}
                      <button
                        onClick={switchMode}
                        className="inline-block underline decoration-violet-600 "
                      >
                        {" "}
                        SIGN UP
                      </button>
                    </span>

                    <div className="mt-3">
                      <GoogleLogin
                        theme="filled_blue"
                        onSuccess={(credentialResponse) => {
                          // console.log(credentialResponse.credential);
                          var decodedInfo = jwt_decode(
                            credentialResponse.credential
                          );
                          // console.log(decodedInfo);
                          localStorage.setItem(
                            "user",
                            JSON.stringify(decodedInfo)
                          );
                          // const user  = localStorage.getItem('user');
                          if (credentialResponse) {
                            redirect("/home");
                          }

                          // console.log(decodedInfo);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                      {/* <FacebookLogin
                        appId="1857076151336932"
                        autoLoad
                        callback={responseFacebook}
                        render={(renderProps) => (
                          <button className="text-white" onClick={renderProps.onClick}>
                            Login With FaceBook
                          </button>
                        )}
                      /> */}
                      {/* ,<button onClick={googleLogout()}>LogOut</button> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative space-x-[51px] flex flex-row">
                  <p className="text-white">Name</p>

                  <input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="border rounded"
                  />
                </div>

                <div className="relative space-x-14 flex flex-row">
                  <p className="text-white">Email</p>
                  <input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="border font-light rounded"
                    // placeholder="Email Address"
                  />
                </div>
                <div className="relative space-x-6 flex flex-row">
                  <p className="text-white">Password</p>

                  <input
                    id="password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="border font-light rounded"
                    // placeholder="Password"
                  />
                </div>
                {/* <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Repeat Password"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Repeat Password
                  </label>
                </div> */}
                <div className="relative">
                  <button
                    className="bg-white text-black font-normal rounded-md px-4 py-2"
                    onClick={handleSubmit}
                  >
                    Register Now
                  </button>
                </div>
                <div>
                  <span className=" text-white text-base pt-3 font-mono -ml-3 rounded-md px-4 py-2">
                    Already Have an Account?{" "}
                    <button
                      onClick={switchMode}
                      className="inline-block underline decoration-violet-600 "
                    >
                      {" "}
                      LOGIN
                    </button>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

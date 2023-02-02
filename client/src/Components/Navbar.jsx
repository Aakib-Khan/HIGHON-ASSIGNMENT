// import Link from 'react-router-dom'
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const redirect = useNavigate();

  const handleClear = () => {
    localStorage.removeItem('user');
    redirect('/')
  };
  const user = localStorage.getItem("user");
  const location = useLocation();

  return (
    <div className="flex justify-around items-center">
      {location.pathname == "/profile" && (
            <div className=" ">
              <button
              onClick={handleClear}
              className="py-2 bg-blue-400 px-4 rounded font-mono text-white ">
                Sign Out
              </button>
            </div>
          )}
      <div className="  rounded-lg mx-[90px]   drop-shadow-md py-1">
        <div className="flex justify-center space-x-4">
          <h2 className="font-semibold text-purple-700 tracking-[5px] uppercase text-[40px]  ">
            testapp
          </h2>
          {/* <img src={memories} height={60} width={60} alt="" /> */}
        </div>
      </div>

      {location.pathname !== "/" && (
        <div className="flex space-x-5" >
          {user && location.pathname !== "/home" && (
            <div className=" ">
              <button className="py-2 bg-blue-400 px-4 rounded font-mono text-white ">
                <Link to="/home">Home Page</Link>
              </button>
            </div>
          )}
          {location.pathname !== "/profile" && (
            <div className=" ">
              <button className="py-2 bg-blue-400 px-4 rounded font-mono text-white ">
                <Link to="/profile">Profile Page</Link>
              </button>
            </div>
          )}
          
        </div>
      )}

      {/* {location.pathname !== "/home" && <button>Go to another page</button>} */}
      {/* {location.pathname !== "/profile" && <button>Go to profile page</button>} */}
    </div>
  );
}

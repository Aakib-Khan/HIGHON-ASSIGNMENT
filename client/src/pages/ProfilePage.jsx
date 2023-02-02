import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import QRCode from "qrcode.react";

export const ProfilePage = () => {
  const redirect = useNavigate();
  const user = localStorage.getItem("user");
  const decodedInfo = jwt_decode(user);

  // console.log("user" + user);
  // console.log(decodedInfo);
  if (!user) {
    redirect("/");
  }

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     redirect("/");
  //   }
  // }, );
  // generateReferralCode()
  return (
    <div className="flex justify-center ">
      <div className="flex relative flex-col  items-center mt-10">
        <div className="w-[100px] h-[100px] z-0 rounded-full overflow-hidden">
          <img src="/man.png" alt="Profile Photo" />
        </div>

        <div className="w-[350px] -mt-5 flex  items-center flex-col bg-yellow-400 rounded-3xl   h-[350px]">
          <p className="text-xl text-white font-medium mt-5">{decodedInfo.name} </p>

          <div className="bg-white px-5 mt-4 rounded-3xl py-5 ">
            <QRCode
              value={decodedInfo.userCode}
              className="w-32 h-32"
              renderAs="canvas"
            />
            
          </div>

          <div className="mt-4">
            <p className="text-xl mb-3 text-center text-white font-medium">
              User Code
            </p>
            <p className="text-gray-600 bg-white px-4 rounded-md py-1 font-medium tracking-[3px]">
              {decodedInfo.userCode}
            </p>
          </div>
        </div>

        {/* <div className="mt-6">
        <div className="relative">
        <p className="absolute bottom-0 right-0 text-xs text-gray-600 font-medium">
        QR Code
        </p>
        </div>
      </div> */}
      </div>
    </div>
  );
};

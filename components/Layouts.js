import Image from "next/image";
import { useState } from "react";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import { useRouter } from "next/router";
const Layouts = ({ children }) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const handleRoute = (url) => {
    router.push(url, undefined, { shallow: true });
  };

  const active =
    "text-white text-xl bg-blue-500 p-2 rounded-full font-bold shadow-xl flex space-x-2 cursor-pointer";

  return (
    <div className="flex w-screen">
      <header className="sticky top-0 flex flex-col items-center md:px-3 px-2 py-3 space-y-10 font-bold bg-blue-900 h-[100vh]">
        <div className="flex items-center space-x-4">
          <Image src={"/logo.png"} width={40} height={40} alt={"Logo"} />
          {toggle && <h2 className="text-xl text-white">CryptoRite</h2>}
        </div>
        <nav>
          <div
            onClick={() => handleRoute("/")}
            className={router.pathname === "/" ? active : " nav "}
          >
            <AiOutlineHome />
            {toggle && <p className="text-sm ">Home</p>}
          </div>

          <div
            onClick={() => handleRoute("/cryptocurrencies")}
            className={
              router.pathname === "/cryptocurrencies" ? active : " nav"
            }
          >
            <AiOutlineLineChart />
            {toggle && <p className="text-sm "> Cryptocurrencies</p>}
          </div>

          <div
            onClick={() => handleRoute("/news")}
            className={router.pathname === "/news" ? active : "nav"}
          >
            <BiNews />
            {toggle && <p className="text-sm ">News</p>}
          </div>
        </nav>
        <div
          className="text-2xl text-gray-300 cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          {toggle ? <BsArrowLeft /> : <BsArrowRight />}
        </div>
      </header>
      <div className="w-full ">
        <main className="min-h-[84vh] h-fit md:m-5 m-1">{children}</main>
        <footer className="flex h-fit w-[100%] p-1 items-center flex-col md:flex-row text-white bg-blue-900 lg:justify-between justify-center bottom-0">
          <div className="flex items-center m-3 space-x-4">
            <Image src={"/logo.png"} width={40} height={40} alt={"Logo"} />
            <h2 className="text-xl font-bold text-gray-300">CryptoRite</h2>
          </div>
          <p>All Rights Reserved</p>
          <div className="flex flex-col items-center m-4 font-bold md:flex-row md:space-x-4">
            <a onClick={() => handleRoute("/")} className="cursor-pointer">
              Home
            </a>
            <a
              onClick={() => handleRoute("/cryptocurrencies")}
              className="cursor-pointer"
            >
              Cryptocurrencies
            </a>

            <a onClick={() => handleRoute("/news")} className="cursor-pointer">
              News
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layouts;

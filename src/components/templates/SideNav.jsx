import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-300 p-8">
      <h1 className="text-2xl text-white font-bold">
        <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
        <span className="text-2xl">RSAS.</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="xl text-white font-semibold mt-9 mb-5">New Feeds</h1>

        <Link to={'/trending'} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
        <i className="mr-1 ri-fire-fill"></i>Trending
        </Link>
        <Link to={'/popular'} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
        <i className="mr-1 ri-bard-fill"></i> Popular
        </Link>
        <Link to={'/movie'} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
        <i className="mr-1 ri-movie-2-fill"></i> Movies
        </Link>
        <Link to={'/tv'} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
        <i className="mr-1 ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link to={'/person'} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-4">
        <i className="mr-1 ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="mt-2"/>
      <nav className="flex flex-col text-zinc-400 text-xl mt-5 gap-2">
        <h1 className="xl text-white font-semibold ">Website Information</h1>

        <Link to={'/aboutus'} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2">
        <i className="mr-1 ri-information-fill"></i>About AR
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-2">
        <i className="ri-phone-fill"></i> Contact Us
        </Link>
      
      </nav>
    </div>
  );
};

export default SideNav;

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  //   console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className=" w-full h-[52vh] flex flex-col justify-end items-start p-[8%] "
    >
      <h1 className="w-[70%] text-5xl font-black mb-2 text-white">
        {data.titl || data.original_name || data.name || data.original_title}
      </h1>
      <p className="mt-1 mb-3 w-[70%] text-white text-sm ">
        {data.overview.slice(0, 200)}....
        <Link to={`/${data.media_type}/details/${data.id} `} className="text-blue-400">more</Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill px-1"></i>
        {data.release_date || "No information"}
        <i className="text-yellow-500 ml-3   ri-movie-2-fill px-1"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-3 mt-4 text-white bg-[#6556CD] rounded">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;

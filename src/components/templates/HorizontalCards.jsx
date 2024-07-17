import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] h-[40%] flex overflow-y-hidden mb-5 p-5">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="min-w-[16%] bg-zinc-900 mr-5 p-1 mb-3 "
        >
          <img
            className="w-full h-[40%] object-cover mb-2"
            src=
            {
              d.backdrop_path || data.profile_path || d.poster_path ?
              `https://image.tmdb.org/t/p/original/${
              d.backdrop_path || data.profile_path || d.poster_path
            }`: noimage}
            alt=""
          />
          <div className="w-fit h-[50%] text-white overflow-y-auto">
            {/* ye sahi se fit nahi ho pa raha aur mera dimag pak gaya hai ekdum */}
            
            <h1 className="text-xl font-bold ">
              {d.title || d.original_name || d.name || d.original_title}
            </h1>
            <p className=" mt-2 text-white text-sm ">
              {d.overview.slice(0, 90)}....
              <span className="text-zinc-500">more</span>
            </p>
            
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;

import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title, }) => {
  // console.log(data);
  console.log(title);
  return (
    <div className=" flex flex-wrap w-full px-[4%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className="relative w-[26vh] mr-[3%] mb-[3%] mt-[2%] " key={i}>
          <img
            className="h-[45vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 font-semibold mt-1">
            {c.title || c.original_name || c.name || c.original_title}
          </h1>

          {c.vote_average && (
            <div className="absolute right-[-11%] bottom-[31%] rounded-full text-white h-[6vh] w-[6vh] bg-yellow-600 flex items-center justify-center">
              {(c.vote_average * 10).toFixed()}
              <sup className="mt-3">%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;

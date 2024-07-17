import axios from "../../utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage  from "/noimage.jpg";

const TopNav = () => {
  const [query, setquery] = useState("");
  //   console.log(query);

  const [searches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(d)
      setsearches(data.results);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] flex mx-auto relative items-center gap-1">
      <i className="text-white text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-300 p-4 outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything "
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-white text-3xl ri-close-line"
        ></i>
      )}

      <div className="z-[100] absolute bg-zinc-200 w-[50%] max-h-[50vh] top-[100%] left-[3%] overflow-auto">
        {searches.map((s, index) => (
          <Link to={`/${s.media_type}/details/${s.id}`}
            key={index}
            className="p-10 text-zinc-500 font-semibold hover:text-black hover:bg-zinc-300 w-[100%] flex justify-start items-center border-b-2 border-zinc-100 "
          >
            <img
              className="h-[10vh] w-[10vh] object-cover rounded mr-5"
              src={
                s.backdrop_path ||
                s.profile_path ? `https://image.tmdb.org/t/p/original/${
                  s.backdrop_path || s.profile_path
                }`: noimage
              }
              alt=""
            />
            <span>
              {s.title || s.original_name || s.name || s.original_title}{" "}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;

import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "./Notfound";
import Loading from "../Loading";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  // console.log(ytvideo);

  // console.log("ytvideo:", ytvideo);

  // const videoKey =
  //   ytvideo && Array.isArray(ytvideo.results) && ytvideo.results.length > 0
  //     ? ytvideo.results[0].key
  //     : null;
  return(
    <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,.9)] ">
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-[5%] right-[5%] text-3xl text-white hover:text-[#6556CD] ri-close-circle-line"
      ></Link>

     {ytvideo ? (
       <ReactPlayer
       controls
       height={500}
       width={1000}
       url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
     ) :(
      <Notfound/>
    )}
    </div>
  );
};

export default Trailer;

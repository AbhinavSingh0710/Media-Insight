import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const Persondetails = () => {
  const { info } = useSelector((state) => state.people);
  // console.log(info);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson(id));
    };
  }, [id]);

  return info ? (
    <div className="px-[8%] w-screen h-[150vh] bg-[#1F1E24] overflow-auto relative">
      <nav className="w-full h-[10vh] text-zinc-200 flex items-center gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        <div className="w-[20%] ">
          <img
            className="h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-8 w-[77%]" />
          <div className="ml-3 text-white text-2xl mt-3 flex gap-x-5 ">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          <h1 className="text-zinc-200 text-2xl mt-1">Personal Info</h1>
          <h1 className="text-zinc-200 mt-3">Known For</h1>
          <h1 className="text-zinc-200">{info.detail.known_for_department}</h1>
          <h1 className="text-zinc-200 mt-3">Gender</h1>
          <h1 className="text-zinc-200">
            {info.detail.gender === 2 ? "male" : "femle"}
          </h1>
          <h1 className="text-zinc-200 mt-3">Birthday</h1>
          <h1 className="text-zinc-200">{info.detail.birthday}</h1>
          <h1 className="text-zinc-200 mt-3">Death Day</h1>
          <h1 className="text-zinc-200">
            {info.detail.deathday ? info.detail.deathday : "Abhi Hum zinda hai"}
          </h1>
          <h1 className="text-zinc-200 mt-3">Place of Birth</h1>
          <h1 className="text-zinc-200">{info.detail.place_of_birth}</h1>
          <h1 className="text-zinc-200 mt-3 text-lg">Also Known as</h1>
          <h1 className="text-zinc-200 text-xs">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>
        <div className="w-[80%] ml-[3%]">
          <h1 className="text-zinc-200 text-6xl font-black">
            {info.detail.name}
          </h1>
          <h1 className="text-zinc-200 mt-3">Biography</h1>
          <h1 className="text-zinc-200">
            {info.detail.biography.slice(0, 1000)}
          </h1>
          <h1 className="text-zinc-200 mt-5">Known for</h1>
          <HorizontalCards data={info.combinedcredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="text-zinc-200 mt-5">Acting</h1>

            <Dropdown
              title={category}
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className=" list-disc text-zinc-400 mt-5 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-white p-5">
            {info[category + "credits"].cast.map((s, i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer ml-5 p-5">
                <Link to={`/${category}/details/${s.id}`}>
                  <span >{s.title || s.original_name || s.name || s.original_title}</span>
                  <span className="block mt-1 mb-1">{s.character && `Character Name: ${s.character}`}</span>
                </Link>
              </li>
              // scroll sahi se nahi ho raha hai aur height ka bhi dikat hai abhi tak acche se
              // solve hue nahi hai dono 
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;

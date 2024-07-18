import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv,removetv } from "../store/actions/tvAction";
import Loading from "../components/Loading";
import HorizontalCards from "./templates/HorizontalCards";

const Tvdetails = () => {
  const { info } = useSelector((state) => state.tv);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return()=>{
      dispatch(removetv(id));
    }
  }, [id]);


  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className=" relative w-screen h-screen px-[5%] overflow-y-auto"
    >
      <nav className="w-full h-[10vh] text-zinc-200 flex items-center gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      <div className="w-full flex">
        <img
          className="h-[55vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white relative">
          <h1 className="text-5xl font-black ">
            {info.detail.title ||
              info.detail.original_name ||
              info.detail.name ||
              info.detail.original_title}

            <small className="ml-1 text-xl text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex text-zinc-100 items-center gap-x-5 mt-4 mb-5">
            <span className=" rounded-full  h-[6vh] w-[6vh] bg-yellow-600 flex items-center justify-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup className="mt-3">%</sup>
            </span>
            <h1 className="w-[55px] text-2xl font-semibold leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-xl font-semibold text-zinc-200 italic">
            {info.detail.tagline}
          </h1>
          <h1 className="mt-3 mb-2 text-2xl">Overview</h1>
          <p className="">{info.detail.overview}</p>
          <h1 className="mt-3 mb-2 text-2xl">Movie Translations</h1>
          <p className="mb-5">{info.translations.join(", ")}.</p>
          <Link
            to={`${pathname}/trailer`}
            className=" p-4 text-sm font-semibold bg-[#6556CD] rounded-lg"
          >
            <i className="ri-play-fill"></i> Play Trailer
          </Link>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-y-8 mt-7 text-white">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center">
            <h1 className="">Available on Platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center mb-3">
            <h1>Available on Rent</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      <hr className="mt-5 mb-2" />
      <h1 className="text-3xl font-semibold text-white">Seasons</h1>
      <div className="w-[100%] h-[46%] flex overflow-y-hidden mb-5 p-5">

        {info.detail.seasons.map((s,i)=>(
          <Link to={`${pathname}/trailer`} key={i} className="w-[15vh] mr-[6%]">
               <img 
           className="h-[35vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[11vw] object-cover"
           src={`https://image.tmdb.org/t/p/original/${
             s.poster_path
           }`}
           alt=""
         />
         <h1 className="text-2xl text-zinc-400 font-semibold mt-1">
           {s.title || s.original_name || s.name || s.original_title}
         </h1>
          </Link>
        ))}
       
      </div>

      <hr className="mt-5 mb-2" />
      <h1 className="text-3xl font-semibold text-white">
        Recommadations & Similar Items
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;

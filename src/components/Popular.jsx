import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Loading from "./Loading";

const Popular = () => {
     document.title = "RSAS | Popular "
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  // const [duration, setduration] = useState("day");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // console.log(d)

      //   console.log(randomData.results)
      //   settrending(data.results);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
        // console.log(data);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //   console.log(popular);

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);




  return popular.length > 0 ? (
    <div className=" h-full w-full  ">
      <div className="flex items-center justify-between m-[1%]">
        <h1 className=" text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Popular
        </h1>
        <div className="flex items-center w-[75%] mt-2">
          <TopNav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[3%]"></div>
          {/* <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          /> */}
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasmore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;

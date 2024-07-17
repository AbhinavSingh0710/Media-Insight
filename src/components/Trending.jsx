import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  document.title = "RSAS | Trending ";

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      // console.log(d)

      //   console.log(randomData.results)
      //   settrending(data.results);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
        // console.log(data)
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //   console.log(trending);

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      // sethasmore(true);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  // const handleCategoryChange = (e) => {
  //   setcategory(e.target.value);
  //   console.log("Category changed to:", e.target.value);
  // };

  // const handleDurationChange = (e) => {
  //   setduration(e.target.value);
  //   console.log("Duration changed to:", e.target.value);
  // };

  return trending.length > 0 ? (
    <div className=" h-full w-full  ">
      <div className="flex items-center justify-between m-[1%]">
        <h1 className=" text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[75%] mt-2">
          <TopNav />
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}

            // func={handleCategoryChange}
          />
          <div className="w-[3%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
            // func={handleCategoryChange}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasmore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;

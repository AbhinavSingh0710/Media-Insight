import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "AR | Homepage";
  const [walpaper, setwalpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const getWalpaperHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log(d)
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      //   console.log(randomData.results)
      setwalpaper(randomData);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  //   console.log(walpaper);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // console.log(d)

      //   console.log(randomData.results)
      settrending(data.results);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    getTrending();
    !walpaper && getWalpaperHeader();
  }, [category]);

  return walpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={walpaper} />
        <div className="flex justify-between p-8">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e)=>setcategory(e.target.value)}
          />
          {/* isme mera sahi se ho nahi raha hai */}
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;

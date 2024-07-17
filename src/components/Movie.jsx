import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import TopNav from './templates/TopNav';
import axios from '../utils/Axios';
import Dropdown from './templates/Dropdown';
import Cards from './templates/Cards';

const Movie = () => {
    document.title = "RSAS | Movies "
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    // const [duration, setduration] = useState("day");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasmore, sethasmore] = useState(true);


    const getMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
          // console.log(d)
    
          //   console.log(randomData.results)
          //   settrending(data.results);
          if (data.results.length > 0) {
            setmovie((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
            // console.log(data);
          } else {
            sethasmore(false);
          }
        } catch (error) {
          console.error("Error ", error);
        }
      };
    
      //   console.log(movie);
    
      const refreshHandler = () => {
        if (movie.length === 0) {
          getMovie();
        } else {
          setpage(1);
          setmovie([]);
          getMovie();
        }
      };
    
      useEffect(() => {
        refreshHandler();
      }, [category]);
    

      return movie.length > 0 ? (
        <div className=" h-full w-full  ">
          <div className="flex items-center justify-between m-[1%]">
            <h1 className=" text-3xl text-zinc-400 font-semibold">
              <i
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] ri-arrow-left-line"
              ></i>{" "}
              Movies<small className='text-sm text-zinc-600 ml-2'>({category})</small>
            </h1>
            <div className="flex items-center w-[75%] mt-2">
              <TopNav />
              <Dropdown
                title="Category"
                options={["popular", "top_rated","upcoming","now_playing"]}
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
            dataLength={movie.length}
            next={getMovie}
            hasMore={hasmore}
            loader={<h1>Loading...</h1>}
          >
            <Cards data={movie} title='movie' />
          </InfiniteScroll>
        </div>
      ) : (
        <Loading />
      );


  
}

export default Movie
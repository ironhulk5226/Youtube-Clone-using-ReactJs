import React, { useEffect, useState } from "react";
import "./Feed.css";

import { API_KEY, value_Converter } from "../../data";

import {Link} from 'react-router-dom';

import moment from 'moment'

const Feed = ({category}) => {
  const[data,setData] = useState([]);

  const fetchData = async()=>{
    const videoList_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
    await fetch(videoList_url).then(res=>res.json()).then(data=>setData(data.items));

  }

  useEffect(()=>{
    fetchData();
  },[category])


  return (
    <div className="feed">
      {data.map((item,index)=>{
        return(

      <Link key = {item.id} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">   {/* 'video/categoryId/videoId' */}
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        {/* to get a dot in between we use &bull; which provides the o/p like -> 15k views • 2 days ago */}
        <p>{value_Converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
      </Link>
        )
      })}

      
    </div>
  );
};

export default Feed;

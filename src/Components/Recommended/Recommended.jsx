import React, { useEffect, useState } from 'react'
import './Recommended.css'
import Thumbnail1 from "../../assets/thumbnail1.png";
import Thumbnail2 from "../../assets/thumbnail2.png";
import Thumbnail3 from "../../assets/thumbnail3.png";
import Thumbnail4 from "../../assets/thumbnail4.png";
import Thumbnail5 from "../../assets/thumbnail5.png";
import Thumbnail6 from "../../assets/thumbnail6.png";
import Thumbnail7 from "../../assets/thumbnail7.png";
import Thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY, value_Converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) => {
    const[relatedVideoData , setRelatedVideoData] = useState([])

    const fetchRelatedVideoData = async()=>{
        const relatedVideo_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideo_url)
           .then(res=>res.json())
           .then(data=>setRelatedVideoData(data.items))

    }

    useEffect(()=>{
        fetchRelatedVideoData()

    },[])



  return (
    <div className='recommended'>
        {relatedVideoData.map((item,index)=>{
            return(

        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_Converter(item.statistics.viewCount)} views</p>
            </div>
        </Link>
            )
        })}
        
    </div>
  )
}

export default Recommended
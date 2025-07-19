import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
// import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
// import jack from '../../assets/jack.png';
import UserProfile from '../../assets/user_profile.jpg';

import { API_KEY, value_Converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';


const PlayVideo = () => {
    const {videoId} = useParams();
    const[apiData,setApiData] = useState(null);
    const[channelData , setChannelData] = useState(null);
    const[commentData,setCommentData] = useState([])

    const fetchVideoData = async()=>{
        // Fetching each individual video data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0])) // getting the first object for the video details and we want it individually so we are fetching the object directly
    }

    const fetchOtherChannelData = async()=>{
    if (!apiData || !apiData.snippet) return;
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
        .then(res=>res.json())
        .then(data=>setChannelData(data.items[0]))

    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    await fetch(commentData_url)
        .then(res=>res.json())
        .then(data=>setCommentData(data.items))
}

    useEffect(()=>{
        fetchVideoData()
    },[videoId])

    useEffect(()=>{
        fetchOtherChannelData();

    },[apiData]) // fetch channel data only when apiData updates



  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title=""
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        >
        </iframe>

        <h3>{apiData?.snippet.title}</h3>
        <div className="play-video-info">
            <p>{value_Converter(apiData?.statistics.viewCount)} views &bull; {apiData?moment(apiData?.snippet.publishedAt).fromNow():""}</p>
            <div>
                <span><img src={like} alt="" />{apiData?value_Converter(apiData?.statistics.likeCount):"Likes"}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:"channel_logo"} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"Channel_Name"}</p>
                <span>{value_Converter(channelData?.statistics.subscriberCount)} subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="video-description">
            <p>{apiData?apiData.snippet.description:"Description"}</p>
            
            <hr />
            <h4>{value_Converter(apiData?.statistics.commentCount)} comments</h4>

            {commentData.map((item,index)=>{
                return(

            <div key={index}  className='comment'>
                <img src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item?.snippet?.topLevelComment?.snippet?.authorDisplayName} <span>1 day ago</span></h3>
                    <p>{value_Converter(item?.snippet?.topLevelComment?.snippet?.textOriginal)}</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{item?.snippet?.topLevelComment?.snippet?.likeCount}</span>
                        <img id='dislike_img' src={dislike} alt="" />
                    </div>
                </div>

            </div>
                )

            })}


            
        </div>
    </div>
  )
}

export default PlayVideo
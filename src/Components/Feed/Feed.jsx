import React, { useEffect, useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { API_KEY} from '../../data.js'

const Feed = ({category}) => {

    const [data,setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}` 
        await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
    }

    useEffect(()=>{
        fetchData();
    },[category])
    return (
        <div className="feed">
            {data.map(()=>{
                return (
                    <Link to={`video/20/4521`} className='card'>
                    <img src={thumbnail1} alt="" />
                    <h2>Vsfsdfsf</h2>
                    <h3>gretsack</h3>
                    <p>15k view &bull; 2 day ago</p>
                </Link>    
                )
            })}
           
        </div>

    )
}

export default Feed
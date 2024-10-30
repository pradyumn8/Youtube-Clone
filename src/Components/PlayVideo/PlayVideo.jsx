import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url)
            .then(res => res.json())
            .then(data => setApiData(data.items ? data.items[0] : null));
    };

    const fetchOtherData = async () => {
        if (!apiData || !apiData.snippet || !apiData.snippet.channelId) return;

        const ChannelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(ChannelData_url)
            .then(res => res.json())
            .then(data => setChannelData(data.items ? data.items[0] : null));

        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url)
            .then(res => res.json())
            .then(data => setCommentData(data.items || []));
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData]);

    return (
        <div className='play-video'>
            {/* <video controls autoPlay muted src={video1}></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Video"></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16k"} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
                <div>
                    <span><img src={like} alt="like" />{apiData ? value_converter(apiData.statistics.likeCount) : 112}</span>
                    <span><img src={dislike} alt="dislike" />2</span>
                    <span><img src={share} alt="share" />Share</span>
                    <span><img src={save} alt="save" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="channel" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>1M Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description here"}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 146} Comments</h4>

                {commentData.map((item, index) => (
                    <div key={index} className='comment'>
                        <img
                            src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile}
                            alt="profile"
                            onError={(e) => e.target.src = user_profile} // Fallback if image fails to load
                        />
                        <div>
                            <h3>
                                {item.snippet.topLevelComment.snippet.authorDisplayName}
                                <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                            </h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className='comment-action'>
                                <img src={like} alt="like" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="dislike" />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default PlayVideo;
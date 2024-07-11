'use client';
import './videos.style.scss';
import React, {useEffect, useRef, useState} from 'react';
import {getAllNews} from "@/api/fetchData";
import Pagination from "../pagination/Pagination.jsx";
import WatchClip from "../homepage/watch/watchclip/WatchClip.jsx";
import Link from "next/link";

function Videos(props) {
    const [videos,setVideos] = useState([]);
    const [contentBeginning,setContentBegining] = useState(0);
    const containerRef = useRef(null);

    useEffect(()=>{
        (async () => {
            const data = await getAllNews();
            setVideos(data.filter((data) => !data?.newsContent?.file?.isImage));
            setContentBegining(0);
        })()
    },[])

    useEffect(()=>{
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    },[contentBeginning])

    return (
        <div className='videos'>
            <div>
                <h2>Տեսադարան</h2>
                <hr/>
            </div>
            <div className='videos_feed' ref={containerRef}>
                {videos.slice(contentBeginning, contentBeginning + 8).map((video, index) =>
                    <Link key={index} href={`/news/${video?.id}`}><WatchClip data={video}/></Link>
                )}
            </div>
            <div className="pagination_container">
                <Pagination totalElements={videos?.length} contentBeginning={contentBeginning}
                            setContentBeginning={setContentBegining} elementsPerPage={8}/>
            </div>
        </div>
    );
}

export default Videos;
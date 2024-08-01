'use client';
import { getAllNews } from "@/api/fetchData";
import { useEffect, useState,useRef} from "react";
import "../../calendar/calendarNewsFeed/calendarNewsFeed.style.scss"
import Pagination from "../../pagination/Pagination.jsx";
import SingleNewsCard from "../../singleNewsCard/SingleNewsCard.jsx";



function NewsFeed(){
    const [contentBeginning,setContentBegining] = useState(0);
    const containerRef = useRef(null);
    const [allNews, setAllNews] = useState()
    useEffect(() => {
    getAllNews().then(res => {
        setAllNews(res)
        setContentBegining(0)
    })
    }, [])

    useEffect(() => {
        console.log(allNews, 'log in news feed')
    }, [allNews])
    useEffect(()=>{
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    },[contentBeginning])
    
    return (
        <div ref={containerRef} className='calendar_feed container'>
            <div className='newsfeed_top'>
                <div>
                     <h2 className="newFeedTitle">Լրահոս</h2>
                <hr></hr>
                </div>
               
            </div>
            <div className='news_feed_main'>
        {allNews?.length
        ?
                <div  className='calendar_feed__news'>
        {allNews.slice(contentBeginning, contentBeginning+6).map((news, index) =>
                              <SingleNewsCard key={index} news={news} index={index} path={`/news/${news?.id}`}/>
                          )}
                          <Pagination totalElements={allNews?.length} contentBeginning={contentBeginning}
                                      setContentBeginning={setContentBegining} elementsPerPage={6}/>
        </div>
        :
        <p className='calendar_feed__no-result'>Լուրերը բեռնվում են․․․</p>
        }
         
          
        </div>
        </div>
        
      );
}

export default NewsFeed;
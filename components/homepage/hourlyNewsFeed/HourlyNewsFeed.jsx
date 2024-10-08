'use client';
import './hourlyNewsFeed.style.scss';
import {useEffect, useState} from 'react';
import {getAllNews} from "@/api/fetchData";
import Link from "next/link";


function HourlyNewsFeed(props) {
    const [allNews, setAllNews] = useState([]);
    const [newsToShow, setNewsToShow] = useState([]);
    const [quantity, setQuantity] = useState(10);

    useEffect(()=>{
        (async () => {
            try {
                const allNews = await getAllNews();
                setAllNews(allNews);
                setNewsToShow(allNews);
            } catch (error) {
                console.log(error)
            }
        })()
    },[])


    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 768){
                setNewsToShow(allNews.slice(0,10))
            } else {
                setNewsToShow(allNews)
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[allNews]);


    useEffect(() => {
        setNewsToShow(allNews.slice(0, quantity));
    }, [quantity]);
    const handleViewMore = () => {
        setQuantity(+quantity+5)
    }

    return (
        <div className='hourly_news_feed_container'>
            <div>
            <Link href="/newsFeed">
                    <h3 className='clickable-heading'>Լրահոս</h3>
                </Link>
                <hr/>
            </div>
            <div className='hourly_news_feed'>
                {newsToShow?.length ?
                    <>
                        {newsToShow.map(singleNews => {
                            const date = new Date(singleNews?.createdAt);
                            const localTime = date.toTimeString();
                            return (<Link key={singleNews.id} href={`/news/${singleNews?.id}`}>
                                <div className='hourly_newsCard'>
                                    <div  className='hourly_newsCard_createdAt'>
                                        <div></div>
                                        <span>{localTime.slice(0, 5)}</span>
                                    </div>
                                    <div className='hourly_newsCard_title'>
                                        {singleNews.title}
                                    </div>
                                </div>
                            </Link>)
                        }
                       )}
                    </>
                    :
                    ''
                }
            </div>
            <button className='view-more-btn' onClick={handleViewMore}>Տեսնել ավելին</button>
        </div>
    );
}

export default HourlyNewsFeed;
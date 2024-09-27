// 'use client';
// import './selectMainNews.style.scss';
// import React, {useEffect, useState} from 'react';
// import {address, handleDate} from "@/repetitiveVariables/variables";
// import {getAllNews} from "@/api/fetchData";
// import axios from "../interceptor.js";
// import Alert from "../../alert/Alert.jsx";

// function SelectMainNews(props) {
    
//     const [allNews, setAllNews] = useState([]);
//     const [selectedNews, setSelectedNews] = useState([]);
//     const [alert, setAlert] = useState('');

//     useEffect(()=>{
//         (async () => {
//             try {
//                 const allNews = await getAllNews();
//                 setAllNews(allNews);
//                 const {data} = await axios.get(`${address}/news/getToday`);
//                 setSelectedNews(data.map(news => news.id));
//             } catch (error) {
//                 console.log(error)
//             }
//         })()
//     },[]);

//     useEffect(() => {
//         console.log(allNews, selectedNews)
//     }, [allNews, selectedNews]);

//     const handleCardClick = (newsId) => {
//         if(selectedNews.includes(newsId)) {
//             setSelectedNews(selectedNews.filter(id => +id !== +newsId))
//         } else {
//             if(selectedNews.length < 4) {
//                 setSelectedNews([...selectedNews, newsId])
//             } else {
//                 setAlert('Գլխավոր լուրերի առավելագույն քանակը լրացել է: Չեղարկեք ընտրություններից մեկը, նոր լուր ավելացնելու համար:');
//             }
//         }
//     }

//     const handleSubmit = async () => {
//         try {
//             await axios.put(`${address}/news/slider?id1=${selectedNews[0]}&id2=${selectedNews[1]}&id3=${selectedNews[2]}&id4=${selectedNews[3]}`);
//             console.log('main news updated')
//             setAlert('Գլխավոր լուրերի ցանկը թարմացվել է:')
//         } catch (error) {
//             console.log(error)
//         }

//     }

//     const closeAlert = (e) => {
//         e.stopPropagation()
//         if(e.target.id === 'alert_container' || e.target.id === 'close_btn') {
//             setAlert('');
//         }
//     }
    
//     return (
//         <div className='select-main-news-container'>
//             <div className='select-news-all'>
//                 <p>Բոլոր լուրերը</p>
//                 <div className='select-all-newsList'>
//                     {allNews.map(news => 
//                         <div key={news.id} className={`select-main-news_card ${selectedNews.includes(news.id) ? 'selected-card' : ''}`} onClick={() => handleCardClick(news.id)}>
//                             <span>{handleDate(news?.createdAt)}</span>
//                             <div>{news?.title}</div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className='select-news-selected'>
                // <p>Ընտրված լուրերը {selectedNews.length}/4</p>
//                 <div className='selected-newsList'>
//                     <div>
//                         {allNews.filter(news => selectedNews.includes(news.id)).map(news =>
//                             <div key={news.id}
//                                 className={`select-main-news_card ${selectedNews.includes(news.id) ? 'selected-card' : ''}`} onClick={() => handleCardClick(news.id)}>
//                                 <span>{handleDate(news?.createdAt)}</span>
//                                 <div>{news?.title}</div>
//                             </div>
//                        )}
//                     </div>
//                     <button onClick={handleSubmit}>Հաստատել</button>
//                 </div>
//             </div>
//             {alert ? <Alert onClose={closeAlert} alert={alert}/> : ''}
//         </div>
//     );
// }

// export default SelectMainNews;


'use client';
import './selectMainNews.style.scss';
import React, {useEffect, useState} from 'react';
import {address, handleDate} from "@/repetitiveVariables/variables";
import {getAllNews} from "@/api/fetchData";
import axios from "../interceptor.js";
import Alert from "../../alert/Alert.jsx";

function SelectMainNews(props) {
    const [allNews, setAllNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState([]);
    const [alert, setAlert] = useState('');
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false); 
    const [hasMore, setHasMore] = useState(true); 
    
  
    const loadNews = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const { data } = await axios.get(`${address}/news/getAll?page=${page}&limit=20`);
            setAllNews(prevNews => [...prevNews, ...data]);
            if (data.length === 0) setHasMore(false);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const allNewsData = await getAllNews();
                setAllNews(allNewsData);

                const { data: selectedNewsData } = await axios.get(`${address}/news/getToday`);
                setSelectedNews(selectedNewsData);

                loadNews(); 
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleScroll = () => {
        const container = document.querySelector('.select-all-newsList');
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            loadNews();
        }
    };

    useEffect(() => {
        const container = document.querySelector('.select-all-newsList');
        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, [allNews, page]);

    useEffect(() => {
        console.log(allNews, selectedNews);
    }, [allNews, selectedNews]);

   
    const handleCardClick = (newsId) => {
        if (selectedNews.some(news => news.id === newsId)) {
            setSelectedNews(prevSelected => prevSelected.filter(news => news.id !== newsId));
        } else {
            if (selectedNews.length < 4) {
                const newsItem = allNews.find(news => news.id === newsId);
                setSelectedNews(prevSelected => [...prevSelected, newsItem]);
            } else {
                setAlert('Գլխավոր լուրերի առավելագույն քանակը լրացել է: Չեղարկեք ընտրություններից մեկը, նոր լուր ավելացնելու համար:');
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const selectedIds = selectedNews.map(news => news.id);
            await axios.put(`${address}/news/slider?id1=${selectedIds[0]}&id2=${selectedIds[1]}&id3=${selectedIds[2]}&id4=${selectedIds[3]}`);
            setAlert('Գլխավոր լուրերի ցանկը թարմացվել է:');
        } catch (error) {
            console.log(error);
        }
    };

    const closeAlert = (e) => {
        e.stopPropagation();
        if (e.target.id === 'alert_container' || e.target.id === 'close_btn') {
            setAlert('');
        }
    };

    return (
        <div className='select-main-news-container'>
            <div className='select-news-all'>
                <p>Բոլոր լուրերը</p>
                <div className='select-all-newsList'>
                    {allNews.map(news => 
                        <div key={news.id} 
                             className={`select-main-news_card ${selectedNews.some(sel => sel.id === news.id) ? 'selected-card' : ''}`} 
                             onClick={() => handleCardClick(news.id)}>
                            <span>{handleDate(news?.createdAt)}</span>
                            <div>{news?.title}</div>
                        </div>
                    )}
                    {loading && <div className="loading">Loading more news...</div>}
                </div>
            </div>
            <div className='select-news-selected'>
                <p>Ընտրված լուրերը {selectedNews.length}/4</p>
                <div className='selected-newsList'>
                    <div>
                        {selectedNews.map(news =>
                            <div key={news.id}
                                className={`select-main-news_card selected-card`} onClick={() => handleCardClick(news.id)}>
                                <span>{handleDate(news?.createdAt)}</span>
                                <div>{news?.title}</div>
                            </div>
                        )}
                    </div>
                    <button onClick={handleSubmit}>Հաստատել</button>
                </div>
            </div>
            {alert ? <Alert onClose={closeAlert} alert={alert} /> : ''}
        </div>
    );
}

export default SelectMainNews;

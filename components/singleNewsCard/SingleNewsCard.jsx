'use client';
import './singleNewsCard.style.scss';
import {address, handleDate} from "@/repetitiveVariables/variables";
import Link from "next/link";

function SingleNewsCard({news, index, path}) {
    return (
        <Link href={path}>
            <div key={index} className='single_news-card'>
                {<img src={news?.img ? `${address}/${news?.img}` : '/img/Hetaxuyz%20LOGO.svg'} className={news?.img ? '' : 'logo-as-img'} alt="Լրատվական նկար"/>}
                <div className='single_news-card__text'>
                    {news?.createdAt ? <p className='single_news-card__date'>
                        {handleDate(news?.createdAt)}
                    </p> : ''}
                    {news?.title ? <p className='single_news-card__title'>
                        {news?.title}
                    </p> : ''}
                    {/*{news?.description ? <p className='single_news-card__description'>*/}
                    {/*    {news?.description}*/}
                    {/*</p> : ''}*/}
                </div>
            </div>
        </Link>
    );
}

export default SingleNewsCard;
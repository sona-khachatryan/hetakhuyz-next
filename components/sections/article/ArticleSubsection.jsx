'use client';
import "./article.style.scss"
import AsideSlice from "../asideslice/AsideSlice"
import { useRef,useEffect } from "react"
import {usePathname} from "next/navigation";
import Link from "next/link";

const ArticleSubsection = ({title,data,to=""}) => {
    const advisRef = useRef(null);
    const pathname = usePathname();

  useEffect(() => {
      if (window.location.hash.includes(to) ) {
        advisRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [])

  
  function handleAfterColor(){
    return pathname.includes("armenia")?"subsection_armenia":"subsection_region"
  }

  return (
      <div id={to} ref={advisRef} className="aside_container">
          <h2 className={handleAfterColor()}>{title}</h2>
          <div className="aside_newscards_container">
              {Array.isArray(data) && data.map((data, key) => {
                  if (key > 2) return
                  return <Link key={key} href={"/news/" + data.id}>
                      <AsideSlice data={data}/>
                  </Link>
              })}
              {data.length ? <div className="aside_button">
                  <button><Link href={pathname.includes('armenia') ? `/armenia/${to}` : `/region/${to}`}>Տեսնել բոլորը</Link></button>
              </div> : ''}
          </div>
      </div>
  )
}

export default ArticleSubsection
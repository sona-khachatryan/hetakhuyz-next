'use client';

import "./watch.style.scss"
import WatchClip from "./watchclip/WatchClip"
import axios from "axios"
import { useEffect , useState} from "react"
import { address } from "@/repetitiveVariables/variables"
import Link from "next/link";
const Watch = () => {
    const [dataWatch,setDataWatch] = useState([])
  
    useEffect(()=>{
      (async () => {
        try {
          const {data}= await axios.get(`${address}/news/getAll`)
          Array.isArray(data) && setDataWatch(data.filter((data)=>!data.newsContent.file.isImage && data))
        } catch (error) {
          console.log(error)
        }
      })()
    },[])
    
  return (
      <section className="watch_container">
          <div>
              <h2>Տեսադարան</h2>
              <hr/>
          </div>
          <div className="watch_clip">
              {Array.isArray(dataWatch) && dataWatch.map((data, key) => {
                  if (key >= 2) return
                  return <Link key={key} href={`/news/${data?.id}`}><WatchClip data={data && data}/></Link>
              })}
          </div>
      </section>
  )
}

export default Watch
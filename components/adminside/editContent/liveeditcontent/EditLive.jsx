'use client';
import {useState, useEffect} from 'react'
import './liveeditcontent.style.scss'
import { address } from '@/repetitiveVariables/variables'
import axios from '../../interceptor'
import {useParams, useRouter} from "next/navigation";

const EditLive = () => {
    const [dataId,setDataId] = useState([]);
    const {id} = useParams();
    const router = useRouter();

  useEffect(()=>{
    (async () => {
      try {
        const {data} = await axios.get(`${address}/live/getAll`)
        Array.isArray(data) && setDataId(data.find((data)=> data.id === +id))
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  function handleDelete(){
    (async () => {
      try {
        const {data} = await axios.delete(`${address}/live/delete/${id}`);
          console.log('deleted live');
          router.push('/admin/edit');
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleEdit = () => {
      router.push(`/admin/edit/${id}/edit-content`);
  }

  return (
      <div className='live_edit_content_container'>
          <button onClick={handleEdit}>Խմբագրել</button>
          <iframe src={dataId?.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

          <h2>{dataId && dataId.title}</h2>
          <button onClick={handleDelete}>Ջնջել եթերը</button>
      </div>
  )
}

export default EditLive
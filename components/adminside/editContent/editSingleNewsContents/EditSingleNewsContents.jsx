'use client';
import './editSingleNewsContents.style.scss';
import {useContext, useEffect, useState} from 'react';
import AdminSideDropdowns from "../../adminSideDropdowns/AdminSideDropdowns.jsx";
import {getSingleNewsToEdit} from "@/api/fetchData";
import ContentForm from "../../contentForm/ContentForm.jsx";
import {useParams, usePathname} from "next/navigation";
import {SelectedValueContext} from "@/components/adminside/adminClientLayout/AdminClientLayout";

function EditSingleNewsContents(props) {

    const {id} = useParams();
    const pathname = usePathname();
    const [currentNews, setCurrentNews] = useState({});
    const selectedStates = useContext(SelectedValueContext);
    const [selectedSection, setSelectedSection] = selectedStates.section;
    const [selectedSubsection, setSelectedSubsection] = selectedStates.subsection;
    const [selectedNewsType, setSelectedNewsType] = selectedStates.newsType;

    useEffect(() => {
      getSingleNewsToEdit(setCurrentNews, setSelectedSection, setSelectedSubsection, setSelectedNewsType, id, pathname)
    },[])

    return (
        <div className='edit_single_news_contents'>
            <AdminSideDropdowns/>
            <ContentForm currentNews={currentNews}/>
        </div>
    );
}

export default EditSingleNewsContents;
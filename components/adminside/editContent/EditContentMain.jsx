'use client';
import './editContent.style.scss';
import {useContext, useEffect, useState} from 'react';
import AdminSideDropdowns from "../adminSideDropdowns/AdminSideDropdowns.jsx";
import {getDataToEdit} from "@/api/fetchData";
import EditContentList from "./EditContentList.jsx";
import {usePathname} from "next/navigation";
import {SelectedValueContext} from "@/components/adminside/adminClientLayout/AdminClientLayout";

function EditContentMain({children}) {
    const selectedStates = useContext(SelectedValueContext);
    const [selectedSection] = selectedStates.section;
    const [selectedSubsection] = selectedStates.subsection;
    const [selectedNewsType] = selectedStates.newsType;
    const [newsToEdit, setNewsToEdit] = useState([]);

    const pathname = usePathname();

    useEffect(() => {
        setNewsToEdit([]);
    }, [pathname]);

    useEffect( () => {
       getDataToEdit(selectedSection, selectedSubsection, selectedNewsType).then(res => setNewsToEdit(res));
    }, [selectedSection.title, selectedSubsection.title, selectedNewsType.title]);

    return (
        <div>
            {pathname.endsWith('edit') 
                ?
                    <>
                        <AdminSideDropdowns/>
                        <EditContentList newsList={newsToEdit}/>
                    </>
                :
                {children}
            }
        </div>
    );
}

export default EditContentMain;
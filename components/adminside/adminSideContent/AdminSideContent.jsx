'use client';
import './adminSideContent.style.scss';
import {createContext, useEffect, useState} from "react";
// import {useLocation, Outlet} from "react-router-dom";
import Link from "next/link";
import {usePathname} from "next/navigation";

function AdminSideContent({children}) {
    const [activeHeading, setActiveHeading] = useState();

    const selectedSectionState = useState({});
    const selectedSubsectionState = useState({});
    const selectedNewsTypeState = useState({});
    const pathname = usePathname();

    useEffect(() => {
        if(pathname.includes('add')) {
            setActiveHeading('add');
        } else if (pathname.includes('edit')) {
            setActiveHeading('edit');
        } else if (pathname.includes('select')) {
            setActiveHeading('select');
        }
    }, [pathname]);
    

    return (
            <div className='adminSideContent container'>
                <div className='asc_menu'>
                    <Link href={'/admin/edit'}>
                        <p className={activeHeading === 'edit' ? 'asc_activeHeading' : ''}>
                            Խմբագրել
                        </p>
                    </Link>
                    <Link href={'/admin/add'}>
                        <p className={activeHeading === 'add' ? 'asc_activeHeading' : ''}>
                            Ավելացնել
                        </p>
                    </Link>
                    <Link href={'/admin/select'}>
                        <p className={activeHeading === 'select' ? 'asc_activeHeading' : ''}>
                            Օրվա լուրեր
                        </p>
                    </Link>
                </div>
                <div className='asc-content'>
                    {pathname.includes('add') || pathname.includes('edit') || pathname.includes('select') ?
                        <div className='asc_long-heading'>
                            {pathname.includes('add')
                            ?
                            'Ավելացնել նոր նյութ'
                            :
                                pathname.includes('edit')
                                    ?
                                    'Խմբագրել նյութը'
                                    :
                                    'Ընտրել գլխավոր լուրերը'
                        }
                        </div> 
                        : ''}
                        {children}
                </div>
            </div>
    );
}

export default AdminSideContent;
'use client';
import React, {createContext, useEffect, useState} from 'react';
import AdminSideHeader from "@/components/adminside/adminSideHeader/AdminSideHeader";
import {usePathname, useRouter} from "next/navigation";
import axios from "@/components/adminside/interceptor";
import AdminSideContent from "@/components/adminside/adminSideContent/AdminSideContent";
import AdminSignIn from "@/components/adminside/adminSignIn/AdminSignIn";
import '../adminSide.style.scss';

export const SelectedValueContext = createContext({});
export const authContext = createContext([]);
function AdminClientLayout({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState();
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
    const router = useRouter();

    const [activeHeading, setActiveHeading] = useState();

    const selectedSectionState = useState({});
    const selectedSubsectionState = useState({});
    const selectedNewsTypeState = useState({});
    const pathname = usePathname();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if(accessToken !== undefined || refreshToken !== undefined){
            try {
                axios.get('/admin/authMe').then(({data}) => {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    setIsAuthenticated(true);
                });
            } catch (err) {
                console.log(err)
            }
        }
    }, []);

    useEffect(() => {
        if(pathname.includes('add')) {
            setActiveHeading('add');
        } else if (pathname.includes('edit')) {
            setActiveHeading('edit');
        } else if (pathname.includes('select')) {
            setActiveHeading('select');
        }
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768)
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeLogoutModal = (e) => {
        e.stopPropagation()
        if(e.target.id === 'logout_container' || e.target.id === 'close_btn') {
            setLogoutModalIsOpen(false);
        }
    }

    const handleLogout = () => {
        setLogoutModalIsOpen(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        router.push('/admin');
        console.log('logged out')
    };

    return (
       <>
           <authContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
               <SelectedValueContext.Provider value={{
                   section: selectedSectionState,
                   subsection: selectedSubsectionState,
                   newsType: selectedNewsTypeState
               }}>
                   <AdminSideHeader isAuthenticated={isAuthenticated}
                                    closeLogoutModal={closeLogoutModal}
                                    logoutModalIsOpen={logoutModalIsOpen}
                                    setLogoutModalIsOpen={setLogoutModalIsOpen}
                                    handleLogout={handleLogout}
                                    isSmallScreen={isSmallScreen}
                   />
                   <div className='adminSide container'>
                       <main>
                           {isAuthenticated ?
                               <AdminSideContent>
                                   {children}
                               </AdminSideContent>
                               :
                               <AdminSignIn setIsAuthenticated={setIsAuthenticated}/>
                           }
                       </main>
                   </div>
               </SelectedValueContext.Provider>
           </authContext.Provider>
       </>
);
}

export default AdminClientLayout;
'use client';
import './adminSide.style.scss';
import {useContext} from 'react';
import AdminSignIn from "./adminSignIn/AdminSignIn.jsx";
import {authContext} from "@/components/adminside/adminClientLayout/AdminClientLayout";

function AdminSide({children}) {
    const [isAuthenticated, setIsAuthenticated] = useContext(authContext);

    return (
        <div className='adminSide container'>
            <main>
                {isAuthenticated ?
                   ''
                    :
                    <AdminSignIn setIsAuthenticated={setIsAuthenticated}/>
                }
            </main>
        </div>
    );
}

export default AdminSide;
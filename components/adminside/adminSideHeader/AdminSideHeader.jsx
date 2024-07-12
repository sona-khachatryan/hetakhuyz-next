'use client';
import Link from "next/link";
import LogOutModal from "@/components/adminside/logOutModal/LogOutModal";
import '../adminSide.style.scss'

function AdminSideHeader({isAuthenticated, setLogoutModalIsOpen, isSmallScreen, logoutModalIsOpen, closeLogoutModal, handleLogout}) {
    return (
        <header className='adminSide_header'>
            <Link className='adminSide_logo' href="/">
                <img className='adminSide_logo' src="/img/Hetaxuyz%20LOGO.svg" alt="Հետախույզ լրատվական լոգո"/>
            </Link>

            {isAuthenticated ?
                <>
                    <div className='adminSide_logout-btn' onClick={() => setLogoutModalIsOpen(true)}>
                        {isSmallScreen ?
                            <img src='/img/Logout.svg' alt='Դուրս գալ'/>
                            :
                            'Դուրս գալ'
                        }
                    </div>
                    {logoutModalIsOpen ? <LogOutModal onClose={closeLogoutModal} handleLogout={handleLogout}/> : ''}
                </>
                :
                ''
            }
        </header>
    );
}

export default AdminSideHeader;
'use client';
import './navBarDropdowns.style.scss';
import React, {useEffect, useRef} from 'react';
import {categoriesHashMatcher} from "@/repetitiveVariables/variables";
import Link from "next/link";

function NavBarDropdowns({isOpen, handleTop, options, pathname, onClose}) {

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, onClose]);

    return (
        <>
            {isOpen && <div className="dropdown_menu" onMouseLeave={onClose}>
                <div className='navbar-dropdown-wrapper' ref={dropdownRef}>
                    <ul className='navbar-dropdown-content'>
                        {options.map(option => <li key={option.id}>
                            <Link onClick={() => handleTop(categoriesHashMatcher[option.title])} href={{
                            pathname: pathname,
                            hash: `#${categoriesHashMatcher[option.title]}`
                        }}>{option.title}</Link></li>)}
                    </ul>
                </div>
            </div>
        }
        </>
    );
}

export default NavBarDropdowns;
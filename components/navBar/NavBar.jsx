'use client';
import {useEffect, useState} from 'react'
import ExchangeRates from '../header/exchangeRates/ExchangeRates'
import Calendar from "../calendar/Calendar.jsx";
import NavBarDropdowns from "./navBarDropdowns/NavBarDropdowns.jsx";
import {getSections, getSubsections} from "@/api/fetchData";
import "./navbar.style.scss"
import {usePathname} from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  
    const [dropdownArmenia, setDropdownArmenia] = useState(false)
    const [dropdownRegion, setDropdownRegion] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const pathname = usePathname();

    const [subsections, setSubsections] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      getSections().then(res => setCountries(res.countries));
      getSubsections().then(res => setSubsections(res));
    }, []);

    useEffect(() => {
        console.log(countries, subsections)
    }, [countries, subsections]);
  
    useEffect(()=> {
        setIsOpen(false);
        setDropdownArmenia(false);
        setDropdownRegion(false);
    },[pathname]);

    useEffect(() => {
        if (calendarIsOpen) {
            const handleScroll = () => {
                closeCalendar();
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [calendarIsOpen]);

    const handleTop = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    const openCalendar = (e) => {
        e.stopPropagation();
        setCalendarIsOpen(true);
    }

    const closeCalendar = () => {
        setCalendarIsOpen(false);
    };

    return (
        <>
            <nav>
                <div>
                    <Link href={"/"}><img className='logo' src="/img/Hetaxuyz%20LOGO.svg" alt="Հետախույզ լրատվական լոգո" /></Link>
                </div>

                <ul>
                    <li onMouseEnter={() => { setDropdownArmenia(true); setDropdownRegion(false)}}>
                        <Link href={'/armenia'}>Հայաստան</Link>
                        <NavBarDropdowns isOpen={dropdownArmenia} handleTop={handleTop} options={subsections} pathname='/armenia' onClose={() => setDropdownArmenia(false)}/>
                    </li>

                    <li onMouseEnter={() => {setDropdownRegion(true); setDropdownArmenia(false)}}>
                        <Link href={"/region"}>Տարածաշրջան</Link>
                        <NavBarDropdowns isOpen={dropdownRegion} handleTop={handleTop} options={countries} pathname='/region' onClose={() => setDropdownRegion(false)}/>
                    </li>

                    <li><Link href={"/international"}>Միջազգային</Link></li>
                    <li><Link href={"/videos"}>Տեսադարան</Link></li>
                    <li><Link href={"/live"}>Ուղիղ եթեր</Link></li>
                    <li className='burger_menu'>
                        {isOpen ?
                            <img onClick={() => setIsOpen(false)} src="/img/menu-hamburger-active.svg" alt="Մենյու"/> :
                            <img onClick={() => setIsOpen(true)} src="/img/menu-hamburger.svg" alt="Մենյու"/>}
                    </li>
                    <li><Link href={"search"}><img className={pathname === "/search" ? 'search_icon_active' : ''} src='/img/search.svg'
                                                  alt='Որոնել'/></Link></li>
                    <li onMouseEnter={openCalendar}>
                        <img src='/img/calendar.svg' alt='Օրացույց'/>
                        {calendarIsOpen && <Calendar closeModal={closeCalendar}/>}
                    </li>
                </ul>
            </nav>
            <div className={'burger_menu_open ' + (isOpen ? "burger_menu_active" : "burger_menu_disable")}>
                <ul>
                    <li><Link href={'/armenia'}>Հայաստան</Link></li>
                    <li><Link href={"/region"}>Տարածաշրջան</Link></li>
                    <li><Link href={"/international"}>Միջազգային</Link></li>
                    <li><Link href={"/videos"}>Տեսադարան</Link></li>
                    <li><Link href={"/live"}>Ուղիղ եթեր</Link></li>
                </ul>
                <ExchangeRates/>
            </div>
        </>  
    )
}

export default NavBar
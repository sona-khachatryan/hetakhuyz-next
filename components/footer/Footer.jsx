'use client';
import './footer.style.scss'
import { scrollTop } from '@/repetitiveVariables/variables'
import Link from "next/link";
import {usePathname} from "next/navigation";

const Footer = () => {
    const pathname = usePathname();

    return (
     <>
         {pathname.includes('admin') ? '' :
             <footer>
                 <hr/>
                 <div className='footer_container'>
                     <div className='footer_logo'>
                         <Link onClick={scrollTop} href="/"><img className='logo' src="/img/Hetaxuyz%20LOGO.svg"
                                                                 alt="Հետախույզ լրատվական լոգո"/></Link>
                     </div>

                     <ul>
                         <li><Link onClick={scrollTop} href={'/armenia'}>Հայաստան</Link></li>
                         <li><Link onClick={scrollTop} href={"/region"}>Տարածաշրջան</Link></li>

                         <ul className='footer_mobile'>
                             <li><Link onClick={scrollTop} href={"/international"}>Միջազգային</Link></li>
                             <li><Link onClick={scrollTop} href={"/live"}>Ուղիղ եթեր</Link></li>
                         </ul>

                         <ul className='icons'>
                             <li>
                                 <a href='https://www.facebook.com/hetaxuyzlratvakan' target="_blank"
                                    rel="noopener noreferrer">
                                     <img src="/img/facebook.svg" alt="Facebook"/>
                                 </a>
                             </li>
                             <li>
                                 <a href='https://t.me/hetakhuyz' target="_blank" rel="noopener noreferrer">
                                     <img src="/img/telegram.svg" alt="Telegram"/>
                                 </a>
                             </li>
                             <li>
                                 <a href='https://youtube.com/@hetakhuyz?si=Bpru_1CMqdyeDDth' target="_blank"
                                    rel="noopener noreferrer">
                                     <img src="/img/youtube.svg" alt="YouTube"/>
                                 </a>
                             </li>
                         </ul>
                     </ul>

                 </div>
                 <hr/>
             </footer>
         }
     </>
    )
}

export default Footer
'use client';
import './header.style.scss'
import NavBar from '../navBar/NavBar'
import ExchangeRates from './exchangeRates/ExchangeRates'
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname();

  return (
      <>
          {
              pathname.includes('admin') ? '' :
                  <header>
                      <NavBar/>
                      <hr/>
                      <div className='header_exchange_rates'>
                          <ExchangeRates/>
                      </div>
                  </header>
          }
      </>
  )
}

export default Header
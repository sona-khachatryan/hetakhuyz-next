import "./errorpage.style.scss"
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="error_page_container">
        <div>
            <h2><span>404</span> Էջը չի գտնվել</h2>
            <img className="error_img_mobile" src="/img/error404mobile.png" alt="Էջը չի գտնվել" />
            <img src="/img/error404.png" alt="Էջը չի գտնվել" />
            <button><Link href="/">Գլխավոր էջ</Link></button>
        </div>
        
    </div>
  )
}

export default ErrorPage
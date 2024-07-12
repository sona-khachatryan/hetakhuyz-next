import LiveStream from "@/components/livestream/LiveStream";
import axios from "axios";
import {address} from "@/repetitiveVariables/variables";

export async function generateMetadata({ params }) {
       const {data} = await axios.get(`${address}/live/getAll`)
       if(data.length) {
           return {
               title: 'Հետախույզ լրատվական',
               description: data[0].title,
               openGraph: {
                   title: 'Հետախույզ լրատվական',
                   description: data[0].title,
                   url: `https://hetakhuyz.am/live`,
               },
               twitter: {
                   card: 'summary_large_image',
                   title: 'Հետախույզ լրատվական',
                   description: data[0].title,
               },
           }
       } else {
           return {
               title: 'Հետախույզ լրատվական',
               description: 'Ուղիղ եթեր',
               openGraph: {
                   title: 'Հետախույզ լրատվական',
                   description: 'Ուղիղ եթեր',
                   url: `https://hetakhuyz.am/live`,
               },
               twitter: {
                   card: 'summary_large_image',
                   title: 'Հետախույզ լրատվական',
                   description: 'Ուղիղ եթեր',
               },
           }
       }
}
function Page(props) {
    return (
       <LiveStream/>
    );
}

export default Page;
import LiveStream from "@/components/livestream/LiveStream";
import axios from "axios";
import {address} from "@/repetitiveVariables/variables";

export async function generateMetadata({ params }) {
       const id = params.id;
       const {data} = await axios.get(`${address}/live/getAll`);
       const currentLive = data.find(live => +live.id === +id);
       if(currentLive) {
           return {
               title: currentLive.title,
               description: 'Հետախույզ լրատվական',
               openGraph: {
                   title: currentLive.title,
                   description: 'Հետախույզ լրատվական',
                   url: `https://hetakhuyz.am/live/${id}`,
               },
               twitter: {
                   card: 'summary_large_image',
                   title: currentLive.title,
                   description: 'Հետախույզ լրատվական',
               },
           }
       } else {
           return  {
               title: 'Ուղիղ եթեր' ,
               description: 'Հետախույզ լրատվական',
               openGraph: {
                   title: 'Ուղիղ եթեր' ,
                   description:'Հետախույզ լրատվական',
                   url: `https://hetakhuyz.am/live`,
               },
               twitter: {
                   card: 'summary_large_image',
                   title: 'Ուղիղ եթեր' ,
                   description: 'Հետախույզ լրատվական',
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
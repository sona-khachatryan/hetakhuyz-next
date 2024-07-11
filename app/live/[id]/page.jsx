import LiveStream from "@/components/livestream/LiveStream";
import axios from "axios";
import {address} from "@/repetitiveVariables/variables";

export async function generateMetadata({ params }) {
   try {
       const id = params.id;
       const {data} = await axios.get(`${address}/live/getAll`);
       const currentLive = data.find(live => +live.id === +id);
       if(currentLive) {
           return {
               title: 'Հետախույզ լրատվական',
               description: currentLive.title,
               openGraph: {
                   title: 'Հետախույզ լրատվական',
                   description: currentLive.title,
                   url: `https://hetakhuyz.am/live/${id}`,
               },
               twitter: {
                   card: 'summary_large_image',
                   title: 'Հետախույզ լրատվական',
                   description: currentLive.title,
               },
           }
       } else {
           return  {
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
   } catch (err) {
       console.log(err);
   }
}
function Page(props) {
    return (
        <LiveStream/>
    );
}

export default Page;
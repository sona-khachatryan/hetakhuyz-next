import SinglePage from "@/components/blogsinglepage/SinglePage";
import axios from "axios";
import {address} from "@/repetitiveVariables/variables";

export async function generateMetadata({ params }) {
    const id = params.id;
    const {data} = await axios.get(`${address}/news/getOne/${id}`);
    return {
        title: data.title,
        description: 'Հետախույզ լրատվական',
        openGraph: {
            title: data.title,
            description: 'Հետախույզ լրատվական',
            url: `https://hetakhuyz.am/news/${id}`,
            images: `${address}/${data.img}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: 'Հետախույզ լրատվական',
            images: [`${address}/${data.img}`],
        },
    }
}
function Page(props) {
    return (
        <SinglePage/>
    );
}

export default Page;
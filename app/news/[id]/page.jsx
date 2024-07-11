import SinglePage from "@/components/blogsinglepage/SinglePage";
import axios from "axios";
import {address} from "@/repetitiveVariables/variables";

export async function generateMetadata({ params }) {
    const id = params.id;
    const {data} = await axios.get(`${address}/news/getOne/${id}`);
    return {
        title: 'Հետախույզ լրատվական',
        description: data.title,
        openGraph: {
            title: 'Հետախույզ լրատվական',
            description: data.title,
            url: `https://hetakhuyz.am/news/${id}`,
            images: `${address}/${data.img}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Հետախույզ լրատվական',
            description: data.title,
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
import SinglePage from "@/components/blogsinglepage/SinglePage";
import axios from "axios";
import { address } from "@/repetitiveVariables/variables";

export async function generateMetadata({ params }) {
    const id = params.id;

    try {
        const { data } = await axios.get(`${address}/news/getOne/${id}`);
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
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: 'Հետախույզ լրատվական',
            description: 'Հետախույզ լրատվական',
        };
    }
}

function Page(props) {
    return (
        <SinglePage/>
    );
}

export default Page;

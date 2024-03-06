import Form from "./Form"
import { notFound } from "next/navigation";
import SmallCard from "../../components/cards/SmallCard";

import Loading from "../../components/Loading"
import Skeleton from "../../components/Skeleton"

export async function generateMetadata( {params}) {
    try { 

        if(!params) return {
            title: `#${params.tag.replaceAll("%20", " ")} Articles - SoCal Politics`,
            description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics!`,
            twitter: {
                card: 'summary_large_image',
                title: `${params.tag.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics! `,
            },
            openGraph: {
                type: "website",
                siteName: 'SoCal Politics',
                title: `${params.tag.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics!`,
                url: `https://socalpolitics.com/tag/${params.tag.replaceAll("%20", " ")}`,
            },
        };
        return {
            title: `#${params.tag.replaceAll("%20", " ")} Articles - SoCal Politics"`, 
            description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics!`,
            keywords: ["SoCal Politics", params.tag.replaceAll("%20", " "), "breaking news", "Southern California"],
            twitter: {
                card: 'summary_large_image',
                title: `${params.tag.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics! `,
            },
            openGraph: {
                type: "website",
                siteName: 'SoCal Politics',
                title: `${params.tag.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics!`,
                url: `https://socalpolitics.com/tag/${params.tag.replaceAll("%20", " ")}`,
            },
        }

    } catch (error) {
        console.log(error)
        return {
            title: `#${params.tag.replaceAll("%20", " ")} Articles`,
            description: `Read the latest #${params.tag.replaceAll("%20", " ") || "Politics"} on SoCal Politics!`
        }
    }
}

async function getArticles(tag) {
    const res = await fetch('https://api.socalpolitics.com/tag/'+tag, {
        next: {
            revalidate: 60 * 3 * 0
        },
        headers: {
            'Cache-Control': 'no-store'
        }
    })
    if (!res.ok) {
        notFound()
    } 

    const data = await res.json();
    if (data.success == 0) {
        return []
    } else { return data.data }
}

const Search = async ( {params} ) => {

    let tag = params.tag.toLowerCase();
    const data = await getArticles(tag);

    return ( 
        <div id='search' className='page wrapper'>

            <main className="container">
                <h2 className='text-center'>Articles With <br/> 
                <span className='query text-center'>#{tag.toLowerCase().replaceAll('%20', ' ') || "null"}</span></h2>

                <Form currentQuery={tag}/>
                <br />

                {data.length > 0 ? (<article>
                    
                    <div className="grid-small">
                    {data.map(a=>{
                        return <SmallCard key={a.id}
                        data={
                        {
                        tag: a.tag, location: a.location, author: a.author,
                        img: a.img, imgDesc: a.imgDesc,
                        id: a.id, title: a.title, 
                        body: a.body
                        }} 
                        variant={{
                            badge:{show: true, text: 'featured', color: 'yellow'}
                        }}
                    />
                    })}
                    </div>

                    </article>) : (
                    <>
                        <p className="text-center"> Keep this space saved. New articles are on their way... </p>
                    </>
                )} 


                <br />

            </main>

        </div>
    );
}
 
export default Search;
import Form from "./Form"
import { notFound } from "next/navigation";
import SmallCard from "../../components/cards/SmallCard";

export async function generateMetadata( {params}) {
    try { 

        if(!params) return {
            title: `${params.location.replaceAll("%20", " ")} - SoCal Politics`,
            description: `Showing articles based in ${params.location.replaceAll("%20", " ")}`,
            twitter: {
                card: 'summary_large_image',
                title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing query results for "${params.query.replaceAll("%20", " ")}" `,
            },
            openGraph: {
                type: "website",
                siteName: 'SoCal Politics',
                title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing query results for "${params.query.replaceAll("%20", " ")}"`,
                url: `https://socalpolitics.com/search/${params.query.replaceAll("%20", " ")}`,
            },
        };
        return {
            title: `Showing articles based in ${params.location.replaceAll("%20", " ")}`, 
            description: `Showing query results for "${params.location.replaceAll("%20", " ")}"`,
            keywords: ["SoCal Politics", params.location.replaceAll("%20", " "), "breaking news", "Southern California"],
            twitter: {
                card: 'summary_large_image',
                title: `${params.location.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing articles based in ${params.location.replaceAll("%20", " ")}`,
            },
            openGraph: {
                type: "website",
                siteName: 'SoCal Politics',
                title: `${params.location.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing articles based in ${params.location.replaceAll("%20", " ")}`,
                url: `https://socalpolitics.com/location/${params.location.replaceAll("%20", " ")}`,
            },
        }

    } catch (error) {
        console.log(error)
        return {
            title: `${params.location.replaceAll("%20", " ")} - SoCal Politics`,
            description: `Showing articles based in ${params.location.replaceAll("%20", " ")}`
        }
    }
}

async function getArticles(location) {
    const res = await fetch('https://api.socalpolitics.com/location/'+location, {
        next: {
            revalidate: 60 * 3
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
    } else {
        return data.data;
    }

}

const Search = async ( {params} ) => {

    let location = params.location.toLowerCase();
    const data = await getArticles(location);

    return ( 
        <div id='search' className='page wrapper'>
            <main className="container">
                <h2 className='text-center'>Articles Located In <br/> 
                <span className='query text-center capitalize'>{location.replaceAll('%20', ' ') || "null"}</span></h2>

                <Form currentQuery={location}/>
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
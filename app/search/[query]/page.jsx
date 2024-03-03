import Form from "./Form"
import { notFound } from "next/navigation";
import SmallCard from "../../components/cards/SmallCard";

export async function generateMetadata( {params}) {
    try { 

        if(!params) return {
            title: `Search Results for "${params.query.replaceAll("%20", " ")}" - SoCal Politics`,
            description: `Showing query results for "${params.query.replaceAll("%20", " ")}"`,
            twitter: {
                card: 'summary_large_image',
                title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing query results for "${params.query.replaceAll("%20", " ")}" `,
            },
            openGraph: {
                siteName: 'SoCal Politics',
                title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing query results for "${params.query.replaceAll("%20", " ")}"`,
                url: `https://socalpolitics.com/search/${params.query.replaceAll("%20", " ")}`,
            },
        };
        return {
            title: `#${params.query.replaceAll("%20", " ")} Articles - SoCal Politics"`, 
            description: `Showing query results for "${params.query.replaceAll("%20", " ")}"`,
            keywords: ["SoCal Politics", params.query.replaceAll("%20", " "), "breaking news", "Southern California"],
            twitter: {
                card: 'summary_large_image',
                title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing query results for "${params.query.replaceAll("%20", " ")}" `,
            },
            openGraph: {
                siteName: 'SoCal Politics',
                title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
                description: `Showing query results for "${params.query.replaceAll("%20", " ")}"`,
                url: `https://socalpolitics.com/search/${params.query.replaceAll("%20", " ")}`,
            },
        }

    } catch (error) {
        console.log(error)
        return {
            title: `${params.query.replaceAll("%20", " ")} - SoCal Politics`,
            description: `Showing query results for "${params.query.replaceAll("%20", " ")}"`
        }
    }
}

async function getArticles(id) {
    const res = await fetch('https://api.socalpolitics.com/search/'+id, {
        next: {
            revalidate: 60 * 3
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

    let query = params.query.toLowerCase();
    const data = await getArticles(query);

    return ( 
        <div id='search' className='page wrapper'>
            <main className="container">
                <h2 className='text-center'>Your Search Results for <br/> 
                <span className='query text-center'>&#8220;{query.replaceAll('%20', ' ') || "null"}&#8221;</span></h2>

                <Form currentQuery={query}/>
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
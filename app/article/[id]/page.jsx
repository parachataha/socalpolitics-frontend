import MainNav from "../../components/MainNav";
import { notFound } from "next/navigation";

import './article.min.css'
import SmallCard from "../../components/cards/SmallCard";
import Tag from "../../components/labels/Tag";

import SlateBody from './SlateBody';
import ShareButtons from './ShareButtons';

import Image from './Image';


async function getArticle(id) {
    const res = await fetch('https://api.socalpolitics.com/article/'+id, {
        next: {
            revalidate: 0
        }
    })
    if (!res.ok) {
        notFound()
    } 

    const data = await res.json();
    if (data.success === false) {
        // notFound()
    }

    return data.data;
}

async function getSameTag(tag, articleId) {
    const res = await fetch('https://api.socalpolitics.com/tag/'+tag, {
        next: {
            revalidate: 60 * 3 * 0
        }
    })

    const data = await res.json();
    if (data.success == 0) {
        console.log('Error fetching same tag data: ', data)
    }

    const filteredData = data.data.filter(d => d.id !== articleId)

    return filteredData;   
}

async function getAllArticles() {
    const res = await fetch('https://api.socalpolitics.com/articles/', {
        next: {
            revalidate: 0
        }
    })
    if (!res.ok) {
        console.log('Unexpected error occurred while fetching all articles : "res" is NOT "ok"')
    } 

    const data = await res.json();
    if (data.success == 0) {
        console.log('Error occurred while fetching all articles')
    }

    return data.data;   
}

function convertSlateDataToText(slateBody) {
    let description = '';

    const body = JSON.parse(slateBody)

    for (const block of body) {
        if (block.children) {
            for (const child of block.children) {
                if (child.text) {
                    description += child.text.trim();
                }
                if (child.bold) {
                    description += '**';
                }
                if (child.italic) {
                    description += '*';
                }
                if (child.underline) {
                    description += '<u>';
                }
                if (child.code) {
                    description += '`';
                }
                if (block.type === 'link') {
                    description += `[${child.text}](${block.url})`;
                }
            }
        }
    }

    console.log(description)

    return description;
}



export async function generateMetadata( {params}) {
    
    try { 
        
        const data = await getArticle(params.id)
        let convertedBody = convertSlateDataToText(data.body)

        if(!data) return {
            title: "Not Found - SoCal Politics",
            description: "The page you were looking for does not exist"
        };
        return {
            title: `${data.title} - SoCal Politics"`, 
            description: convertedBody,
            keywords: ["SoCal Politics", data?.tag || "politics", data?.label || "breaking news", data?.author, "Southern California"],
            twitter: {
                card: 'summary_large_image',
                title: `${data?.title} - SoCal Politics`,
                description: `Read the latest on SoCal Politics! #${data?.tag || "Politics"}`,
                creator: '@_socalpolitics',
                images: [data?.img || "https://socalpolitics.com/cdn/images/defaultthumb.png"],
            },
            openGraph: {
                title: `${data?.title} - SoCal Politics`,
                description: `Read the latest on SoCal Politics! #${data?.tag || "Politics"}`,
                url: `https://socalpolitics.com/article/${data?.id}`,
                images: [
                {
                    url: data?.img || "https://socalpolitics.com/cdn/images/defaultthumb.png", 
                    secureUrl: 'https://socalpolitics.com/cdn/images/defaultthumb.png',
                    width: 1200,
                    height: 630,
                    alt: 'SoCal Politics Banner',
                  },
                ],
            },
        }

    } catch (error) {
        console.log(error)
        return {
            title: "Not Found - SoCal Politics",
            description: "The page you were looking for does not exist"
        }
    }
}

export async function generateStaticParams() {
    const articles = await getAllArticles()

    return articles.map((a) => ({
        id: a.id,
      }))
}

const Article = async ( {params} ) => {

    const data = await getArticle(params.id)
    const sameTag = await getSameTag(data?.tag, params.id)

    let date = data.date.slice(0, 10) || "01-01-2024"
    let year = '2024';
    let month = '01'
    let day = '01'

    if (date == false || date == '') {
        year = '2024';
        month = '01'
        day = '01'
    } else {
        year = date?.slice(0, 4)
        month = date?.slice(5, 7)
        day = date?.slice(8, 10)?.replaceAll('0', '');
    }

    switch (month) {
        case '01': month = 'January'; break;
        case '02': month = 'February'; break;
        case '03': month = 'March'; break;
        case '04': month = 'April'; break;
        case '05': month = 'May'; break;
        case '06': month = 'June'; break;
        case '07': month = 'July'; break;
        case '08': month = 'August'; break;
        case '09': month = 'September'; break;
        case '10': month = 'October'; break;
        case '11': month = 'November'; break;
        case '12': month = 'December'; break;
        default: break; // Handle unexpected values, if needed
    }

    return ( 
        <article id='article' className="page">
            <MainNav />

            <div className="wrapper">
                <div className="article-wrapper">

                    <header className="container">
                        <h1> {data.title} </h1>

                        <div className="flex mb-2">
                            {(data?.tag?.trim() != '' || data.tag?.trim() != ' ' || data.tag?.trim() != false || data.tag?.trim() != null || data.tag?.trim() != undefined)  && <Tag contents={{text:data?.tag, type:'tag', link:true}} /> }
                            {(data.label?.trim() != '' || data.label?.trim() != ' ' || data.label?.trim() != false || data.label?.trim() != null || data.label?.trim() != undefined)  && <Tag contents={{text:data.label, type:'label', link:false}} /> }
                        </div>
                        
                        <Image data={data}/>
                        <div className="pt-2">
                            <p className='img-desc'> {data.imgDesc} </p>
                            <div className="flex">
                                <div className="data capitalize">By <span className='data-author'>{data.author}</span> </div> 
                                <div className="data ml-1">On <span className="data"> {month} {day}, {year} </span></div>
                            </div>
                            {(data.location?.trim() != '' || data.location?.trim() != ' ' || data.location?.trim() != false || data.location?.trim() != null || data.location?.trim() != undefined) && <div className="data capitalize"> In {data.location} </div> }
                        </div>

                        <ShareButtons className='pb-2' data={data} />
                        
                    </header>

                    <article className="my-4 body container">
                        <SlateBody data={data} />
                    </article>

                </div>

                <div className="container">

                {sameTag.length > 0 ? (<div className="pb-3">
                    <h2 className="text-center">Read More</h2>
                    <div className="grid-small">
                        {sameTag.map((a, index)=>{
                            if (index < 6 && a.id != data.id) {
                                return <SmallCard key={a.id} data={a}/>
                            } else return;
                        })}
                        
                    </div>

                </div>) : ('')}

                </div>

            </div>

        </article>
    );
}
 
export default Article;
import Badge from "../labels/Badge";
import Link from "next/link";
import Tag from "../labels/Tag";
import CardImage from "./CardImage";
import dynamic from "next/dynamic";

const SlateBody = dynamic(() => import('./SlateBody'))

const LargeCard = ( {data, variant} ) => {
    return ( 
        <article className={`card large-card ${variant?.classes || ''}`}>

            <Link href={`/article/${data.id}`}> <div className='badge-wrapper'>
                {variant?.badge.show && <Badge text={variant.badge.text} color={variant.badge.color || false}/>}
            </div> </Link>

            <div className="main flex gap-4">
                <CardImage data={data}/>
                <span className="content block">
                    <Link href={`/article/${data.id}`}> <h3> {data.title} </h3> </Link>
                    <span className="flex my-1">
                        {data.tag && <Tag variant={{classes:'text-white'}} contents={{text:data.tag, type:'tag', link:`/tag/${data.tag}`}}/>}
                        {data.location && <Tag variant={{classes:'text-white'}} contents={{text:data.location, type:'location', link:`/location/${data.location}`}}/>}
                        {data.author && <Tag variant={{classes:'text-white'}} contents={{text:data.author, type:'author', link:false}}/>}
                    </span>
                    {/* <Link suppressHydrationWarning={true} href={`/article/${data.id}`} className="body"> </Link> */}
                    <SlateBody data={data} trimEnd={'100px'} />
                </span>
            </div>

        </article>
    );
}
 
export default LargeCard;
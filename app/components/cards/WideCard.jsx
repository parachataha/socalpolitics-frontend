import Image from "next/image";
import Link from "next/link"
import defaultThumb from "../../images/defaultthumb.png"
import FeaturedBadge from "../labels/Badge";
import Badge from "../labels/Badge";
import Tag from "../labels/Tag";

import dynamic from 'next/dynamic'

import CardImage from './CardImage';
const SlateBody = dynamic(() => import('./SlateBody'))

const WideCard = ( {data, variant} ) => {
    return ( 
        <>
            {variant.image || data.img ? (
                <article className={`${variant.classes || ''} card wide-card my-5`} id={data.id}>
                    <div className='badge-wrapper'>
                        {variant?.badge.show && <Badge text={variant.badge.text} color={variant.badge.color || false}/>}
                    </div>
                    <div className="gap-3 flex main">
                        <CardImage data={data}/>
                        <span className="content block">
                            <Link href={`/article/${data.id}`}> <h3> {data.title} </h3> </Link>
                            <span className="flex my-1">
                                {data.tag && <Tag variant={{classes: variant?.tagClasses || ''}} contents={{text:data.tag, type:'tag', link:`/tag/${data.tag}`}}/>}
                                {data.location && <Tag variant={{classes: variant?.tagClasses || ''}} contents={{text:data.location, type:'location', link:`/location/${data.location}`}}/>}
                                {data.author && <Tag variant={{classes: variant?.tagClasses || ''}} contents={{text:data.author, type:'author', link:false}}/>}
                            </span>
                            <SlateBody data={data} trimEnd={'50px'}/>
                        </span>
                    </div>
                </article>    
            ) : (
                <article className={`${variant.classes || ''} card wide-card my-5`} id={data.id}>
                    <div>
                        <div className='badge-wrapper'>
                            {variant?.badge.show && <Badge text={variant.badge.text} color={variant.badge.color || false}/>}
                        </div>
                        <div className="content main">
                            <Link href={`/article/${data.id}`}> <h3> {data.title} </h3> </Link>
                            <div className="flex my-1">
                                {data.tag && <Tag variant={{classes: variant?.tagClasses || ''}} contents={{text:data.tag, type:'tag', link:`/tag/${data.tag}`}}/>}
                                {data.location && <Tag variant={{classes: variant?.tagClasses || ''}} contents={{text:data.location, type:'location', link:`/location/${data.location}`}}/>}
                                {data.author && <Tag variant={{classes: variant?.tagClasses || ''}} contents={{text:data.author, type:'author', link:false}}/>}
                            </div>
                            <SlateBody data={data} trimEnd={300}/>
                        </div>
                    </div>
                </article>    
            )}
        
        </>
    );
}
 
export default WideCard;
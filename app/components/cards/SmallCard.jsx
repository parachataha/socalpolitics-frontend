import Link from "next/link";
import Tag from "../labels/Tag";
import CardImage from "./CardImage"

const SmallCard = ( {data, variant} ) => {

    return ( 
        <div href={`/article/${data.id}`} className="small-card cursor-pointer flex gap-3 flex-col">
            <CardImage data={data}/>
            <div>
                <div className="flex tags">
                    {data.tag && <Tag variant={{classes: variant?.tagClasses || '', styles: variant?.tagStyles || '' }} contents={{text:data.tag, type:'tag', link:`/tag/${data.tag}`}}/>}
                    {data.location && <Tag variant={{classes: variant?.tagClasses || '', styles: variant?.tagStyles || '' }} contents={{text:data.location, type:'location', link:`/location/${data.location}`}}/>}
                    {data.featured == true && <Tag contents={{text: "✨"}} />}
                </div>
                <Link href={`/article/${data.id}`} className="content">
                    <h3 className="pt-1"> {data.title} </h3>
                    <p className="subtitle"> {data.author} </p>
                </Link>
            </div>    
        </div>
    );
}
 
export default SmallCard;
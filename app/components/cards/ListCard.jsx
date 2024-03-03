import Link from "next/link";
import SlateBody from "./SlateBody";

const ListCard = ( props ) => {

    let data = props?.data

    return ( 
        <div href={`/article/${data.id}`} className="list-card">
            <Link href={`/article/${data.id}`}> <h3> {data.title} </h3> </Link>
            <SlateBody data={data} trimEnd={50} /> 
        </div>
    );
}
 
export default ListCard;
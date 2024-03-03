"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const CardImage = ( {data} ) => {

    const [img, setImg] = useState(data.img)

    const handleImageError = () => {
        try {
            new URL(data.img);
        } catch (error) {
            setImg("https://socalpolitics.com/cdn/images/defaultthumb.png");
        }
    };

    useEffect(()=>{
        handleImageError()
    },[])
    

    return ( 
        <Link href={`/article/${data.id}`}>
            <img
            src={img}
            alt={data.title}
            width={200}
            height={150}
            placeholder='blur'
            quality={70}
            />
        </Link>
    );
}
 
export default CardImage;
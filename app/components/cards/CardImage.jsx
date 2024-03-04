"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CardImage = ( {data} ) => {

    const [img, setImg] = useState("https://socalpolitics.com/cdn/images/defaultthumb.png")

    const handleImageError = async () => {
        setImg(data.img)
        try {
            if (!img.includes("https://socalpolitics.com/cdn/images/")) {
                throw new Error("Not in CDN")
            }
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
            <Image
            src={img}
            alt={data.title}
            width={200}
            height={150}
            loading='lazy'
            quality={70}
            />
        </Link>
    );
}
 
export default CardImage;
"use client"

import { useEffect, useState } from "react";

const Image = ( {data} ) => {

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
        <img src={img} alt={`${data.imgDesc}`} />
     );
}
 
export default Image;
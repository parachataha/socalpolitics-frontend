"use client"

import { IoMenu } from 'react-icons/io5'
import { useState } from "react";
import Sidebar from "./Sidebar"

const SidebarWrapper = () => {

    const [showSidebar, setShowSidebar] = useState()
    
    return ( 
        <>
            <IoMenu onClick={()=> setShowSidebar(true) } className='menu cursor-pointer'/>
            {showSidebar && <Sidebar closeSidebar={()=>setShowSidebar(false)}/> }
        </>
     );
}
 
export default SidebarWrapper;
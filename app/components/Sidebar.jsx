"use client"

import Link from "next/link"

import {AiOutlineClose, AiOutlineUser} from 'react-icons/ai'

import logo from '../images/textlogo.png'
import Image from "next/image";
import UserStore from '../stores/UserStore';

import { observer } from 'mobx-react'
import { useEffect } from "react";

const Sidebar = ({closeSidebar}) => {

    useEffect(()=>{
        const componentDidMount = async () => {
            try {
                UserStore.loading = true;
          
                let res = await fetch('https://api.socalpolitics.com/isLoggedIn', {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                let result = await res.json();
          
                if (result && result.success) {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = true;
                    UserStore.username = result.username;
                    UserStore.isAdmin = result.isAdmin;
                } else {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = false;
                    UserStore.isAdmin = 0
                }
            } catch (e) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.isAdmin = 0
            }
        };
        componentDidMount();
    }, [])
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeSidebar()
        }
    });

    return ( 
        <div className="sidebar">
            <div onClick={() => closeSidebar()} className="overlay"></div>

            <div className="content">
                <div className="top">
                    <AiOutlineClose style={{fill: '#FFF',color: '#FFF'}} onClick={() => closeSidebar(false)} className='modal-close white'></AiOutlineClose>
                    {UserStore.isLoggedIn == true && <Link href='/profile' onClick={() => closeSidebar(false)} className="ml-1 profile flex">
                        <AiOutlineUser />
                        <span className="ml-2 capitalize text-white"> <span className="text-white capitalize"> {UserStore.username || 'Loading'} </span> </span>
                    </Link>}
                    <Link href='/' className="logo font red"> <Image placeholder='blur' width={100} height={50} src={logo} alt="logo" /> </Link>
                </div>

                <div className="links">
                    <ul>
                        <li> <Link onClick={() => closeSidebar(false)} className='text-left' href='/'>Home</Link> </li>
                        <li> <Link onClick={() => closeSidebar(false)} className='text-left' href='/about'>About Us</Link> </li>
                        <li> <Link onClick={() => closeSidebar(false)} className='text-left' href='/'>Articles</Link> </li>
                        <li> <Link onClick={() => closeSidebar(false)} className='text-left' href='/tag/interview'>Interviews</Link> </li>
                        <li> <Link onClick={() => closeSidebar(false)} className='text-left' href='/tag/election'>Election Ratings</Link> </li>
                        {UserStore.isAdmin == 1 ? (<li> <Link onClick={() => closeSidebar(false)} className='text-left' to='/admin'>Admin Panel</Link> </li>) : ("")}
                    </ul>

                    {/* <input type="text" ref={searchRef} /> */}
                </div>
            </div>

        </div>
     );
}
 
export default observer(Sidebar);
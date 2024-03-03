"use client"

import Link from "next/link"
import "./admin.min.css"
import UserStore from "../stores/UserStore"
import {observer} from 'mobx-react'

import Side from './side'
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

const AdminLayout = ( {children} ) => {

    const [isAdmin, setIsAdmin] = useState(false)

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
                    setIsAdmin(result.isAdmin)
                } else {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = false;
                    UserStore.isAdmin = 0
                    setIsAdmin(0)
                    notFound()
                }
            } catch (e) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.isAdmin = 0
                setIsAdmin(0)
            }
        };
        componentDidMount();
    }, [])

    return ( 
    <main id='admin'>
        {isAdmin === 1 ? (<div className="admin-wrapper">
           <Side/>
           <div>
                {children}
           </div>
        </div>) : (
          <div id='not-found' className="mt-[-10%] page text-center flex flex-col justify-center items-center">

            <h1>This is Awkward</h1>
            <p>Seems like you tried to go somewhere that {"doesn't"} exist...</p>
            <div className="flex">
                <Link className='my-[.7em] go-home' href='/'>Go home</Link>
            </div>

        </div>)}
    </main>)
  }

export default observer(AdminLayout)
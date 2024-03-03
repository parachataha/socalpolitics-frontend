"use client"

import { useEffect, useState } from "react";
import UserStore from "../stores/UserStore";

import {observer} from 'mobx-react'
import { useRouter } from "next/navigation";

import Link from 'next/link'
import Chip from '../components/labels/Chip'
import Loading from '../components/Loading';

const Main = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const [error, setError] = useState({isError: false, header: 'An Error Occurred', msg: 'Something unexpected happened'})

    const handleLogout = async () => {
        try{ 
            UserStore.loading = false;
            setLoading(true)
            let res = await fetch('https://api.socalpolitics.com/logout', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.username = '';
                setLoading(false)
                router.push('/login')
            } else {
                setError({isError: true, header: 'Failed to Logout', msg: 'Please try again later'})
            }
        }
        catch (e) {
            setError({isError: true, header: 'An Error Occurred', msg: 'Please try again later or contact support'})
            console.log(e)
        }
    }

    useEffect(()=> {
        const componentDidMount = async () => {
            try {
                UserStore.loading = true;
                setLoading(true)
          
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
                    setLoading(false)
                } else {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = false;
                    UserStore.isAdmin = 0;
                    setIsAdmin(false)
                    router.push('/login')
                    setLoading(false)
                }
            } catch (e) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.isAdmin = 0;
                setIsAdmin(false)
                router.push('/login')
                setLoading(false)
            }
        };
        componentDidMount()
    })

    return ( 
        <>
            {loading ? ( <Loading/> ) : ('')}

            {error.isError && <div className='error text-left'> 
                <h3 className='text-left'> {error.header || 'An Error Occurred'}  </h3>
                <p className='text-left'> {error.msg || 'Something unexpected happened'} </p>
            </div>}

            <h3 className="capitalize">Welcome {UserStore.username}</h3>
            {!UserStore.isAdmin ? (<p>Welcome to SoCal Politics! Your number 1 news agency</p>) : ('')}
            {!UserStore.isAdmin ? (<i>This page is currently in beta and is not intended for commercial use</i>) : ('')}
            {!UserStore.isAdmin ? (<Link href='/about'>Learn more</Link>) : ('')}

            {isAdmin ? (<div className="mb-2">
                <div className="flex text-center justify-center">
                    <Chip variant={{classes: 'red admin'}}>Admin</Chip>
                </div>
                <Link href='/admin'>Go to admin page</Link>
            </div>) : ('')}

            {UserStore.isLoggedIn == 1 && <div className="flex text-center justify-center">
                <button onClick={handleLogout}> Log out </button>
            </div>}
                
        </>
     );
}
 
export default observer(Main);
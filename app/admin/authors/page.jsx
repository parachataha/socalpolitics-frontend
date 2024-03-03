"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FaRegTrashAlt } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import UserStore from '../../stores/UserStore';

import { observer } from 'mobx-react'

const Authors = () => {

    const [authors, setAuthors] = useState([])
    const [error, setError] = useState({isError: false, msg: 'Error!'})
    const [success, setSuccess] = useState({isSuccess: false, title: 'Success', msg: 'Click the overlay to hide this message'})

    const getAuthors = async () => {
        try {
            const res = await fetch('https://api.socalpolitics.com/admin/admins/', {
                credentials: 'include',
                next: {
                    revalidate: 0
                }
            })
            if (!res.ok) {
                return {success: false, msg: 'An unexpected error occurred'}
            } else {
                const data = await res.json();
                if (data.success === false) {
                    return {success: false, msg: 'Data not successful'}
                } else {
                    setAuthors(data.data) 
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(()=>{
        getAuthors()
    }, [])

    const deleteAdmin = async (username) => {
        try {
            let res = await fetch('https://api.socalpolitics.com/admin/delete', { 
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    msg: `Admin revoked by ${UserStore.username} at ${new Date().toISOString().slice(0, 10)}`,
                })
            })
            if (!res.ok) { throw new Error('an error occurred') }

            let result = await res.json()
            if (result && result.success) {
                getAuthors()
            } else {
                setError({isError: true, title: 'Admin Not Deleted', msg: result?.msg || "This was unexpected... Please contact the developer." })
                setTimeout(()=>{
                    setError({isError: false})

                }, 4000)
            }
        } catch (e) {
            setError({isError: true, title: 'Admin Not Deleted', msg: "Please check the console and contact the developer."})
            setTimeout(()=>{
                setError({isError: false})

            }, 4000)
        }
    }

    const [addAdminUsername, setAddAdminUsername] = useState('')
    const addAdmin = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch('https://api.socalpolitics.com/admin/add', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: addAdminUsername,
                    msg: `Admin given by ${UserStore.username} at ${new Date().toISOString().slice(0, 10)}`,
                    addedAt: new Date().toISOString().slice(0, 10)
                })
            })

            if (!res.ok) {
                throw new Error('Something went wrong...');
            }
            let result = await res.json();

            if (result && result.success) {
                setSuccess({isSuccess: true})
                getAuthors()
                setTimeout(()=>{
                    setSuccess({isSuccess: false})
                }, 4000)
            } else {
                console.log('Admin not given')
                setError({isError: true, title: 'Admin Not Added', msg: result.msg})
                setTimeout(()=>{
                    setError({isError: false})
                }, 4000)
            }
        } catch (e) {
            console.log(e)
            setError({isError: true, title: 'An Error Occurred', msg:  "Please check the console and contact the developer." })
        } 
    } 

    return ( 
        <>
            {error.isError && <div className='modal'>
                <div className="overlay cursor-pointer" onClick={()=>setError({isError: false})}></div>
                <div className="content">
                    <h2> {error.title || 'Error'} </h2>
                    <p> {error.msg || 'Something unexpected occurred'} </p>
                </div>    
            </div>}
            {success.isSuccess && <div className='modal'>
                <div className="overlay cursor-pointer" onClick={()=>setSuccess({isSuccess: false})}> </div>    
                <div className="content">
                    <h2> {success.title || 'Success!'} </h2>
                    <p> {success.msg || 'Click the overlay to hide this modal'} </p>
                </div>
            </div>}
        
            <div className="main">

                <header>
                    <h1> Authors </h1>
                    <p> Authors can see all admins pages and can access all admin actions </p>
                </header>
                <main>
                    <div className='flex mt-2' style={{justifyContent: 'space-between'}}>
                        <h2> All Authors </h2>
                        <MdRefresh className='cursor-pointer' onClick={getAuthors}/>
                    </div>
                    {authors.map(a=>{
                        return (
                        <div className='article' key={a.id}>
                            <span className='flex' style={{justifyContent: 'space-between'}}>
                                <p>{a.username}</p>
                                <FaRegTrashAlt style={{float: 'right'}} onClick={deleteAdmin.bind(null, a?.username)} className='trash cursor-pointer'/>
                            </span>
                        </div>
                        )
                    })}
                </main>
            </div>

            <div className="main">
                <main>
                    <h2> Add Admin </h2>
                    <form onSubmit={addAdmin}>
                        <input required placeholder='Insert Username' className='block bg mt-1' type="text" value={addAdminUsername} onChange={(e)=>setAddAdminUsername(e.target.value)}/>
                        <button type='submit' className='button block mt-[10px]'>Add Admin</button>
                    </form>

                </main>
            </div>
        
        </>
     );
}
 
export default observer(Authors);
"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FaRegTrashAlt } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import UserStore from '../../stores/UserStore';

import { observer } from 'mobx-react'
import Tag from '../../components/labels/Tag';
import { FaLink } from 'react-icons/fa';

const EditorsChoice = () => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({isError: false, msg: 'Error!'})
    const [success, setSuccess] = useState({isSuccess: false, title: 'Success', msg: 'Click the overlay to hide this message'})

    const getArticles = async () => {
        try {
            setLoading(true)
            const res = await fetch('https://api.socalpolitics.com/admin/editors-choice/', {
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
                    setLoading(false)
                } else {
                    setArticles(data.data) 
                    setLoading(false)
                }
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getArticles()
    }, [])

    const deleteArticle = async (id) => {
        try {
            setLoading(true)
            let res = await fetch('https://api.socalpolitics.com/admin/editors-choice/delete', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    deletedAt: new Date().toISOString().slice(0, 10)
                })
            })

            if (!res.ok) {
                throw new Error('Something went wrong...');
            }
            let result = await res.json();

            if (result && result.success) {
                setSuccess({isSuccess:true})
                getArticles()
                setLoading(false);
            } else {
                console.log('Article Not Removed editors choice')
                setLoading(false);
                setError({isError: true, title: 'Editors Choice Not Updated', msg: result.msg})
            }
        } catch (e) {
            console.log(e)
            setLoading(false);
            setError({isError: true, title: 'An Error Occurred', msg:  "Please check the console and contact the developer." })
        } 
    }

    const [addEditorsChoice, setAddEditorsChoice] = useState('')
    const addArticle = async (e) => { 
        e.preventDefault()
        try {
            setLoading(true)
            let res = await fetch('https://api.socalpolitics.com/admin/editors-choice/add', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: addEditorsChoice,
                    addedAt: new Date().toISOString().slice(0, 10)
                })
            })

            if (!res.ok) {
                throw new Error('Something went wrong...');
            }
            let result = await res.json();

            if (result && result.success) {
                setSuccess({isSuccess: true})
                getArticles()
                setLoading(false)
            } else {
                console.log('Article Not Given editors choice')
                setLoading(false)
                setError({isError: true, title: 'Editors Choice Not Updated', msg: result.msg})
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
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
            {loading && <div className='loading'> </div>}
        
            <div className="main">

                <header>
                    <div className='flex' style={{justifyContent: 'space-between'}}>
                        <h1> Editors Choice </h1>
                        <MdRefresh className='cursor-pointer' onClick={getArticles}/>
                    </div>
                    <p> Mark Articles as Editors Choice. The latest 2 will be displayed on the home page. </p>
                </header>
                <main>

                    {articles.length > 0 ? (
                        <>

                            {articles.map((a, index)=>{
                                return (
                                <div className={`justify-between flex items-center py-2 ${(index === 0 || index === 1) && 'green'}`} style={{justifyContent: 'space-between'}} href={`/article/${a.id}`} key={a.id}>
                                    <span>
                                        <h3>{a.title}</h3>
                                        <p className='id'> {a.id} </p>
                                        {/* <span className="flex">
                                            {a.tag && <Tag contents={{text: a.tag, type: 'tag'}}/>}
                                            {a.author && <Tag contents={{text: a.author, type: 'author'}}/>}
                                        </span> */}
                                    </span>

                                    <div className="actions flex items-center">
                                        <Link href={`/article/${a.id}`}> <FaLink className='public'/> </Link>
                                        <FaRegTrashAlt className='trash-red' onClick={deleteArticle.bind(null, a?.id)} /> 
                                    </div>
                                </div>
                                )
                            })}

                        </>) : ( 'No Editors Choice Articles Yet...' )
                    }
                </main>
            </div>

            <div className="main">
                <main>
                    <h2> Add Editors Choice </h2>
                    <form onSubmit={addArticle}>
                        <input required placeholder='Insert Article ID' className='block bg mt-1' type="text" value={addEditorsChoice} onChange={(e)=>setAddEditorsChoice(e.target.value)}/>
                        <button type='submit' className='button block mt-[10px]'>Add Editors Choice</button>
                    </form>

                </main>
            </div>
        
        </>
     );
}
 
export default observer(EditorsChoice);
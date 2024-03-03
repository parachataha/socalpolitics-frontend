"use client"
import {observer} from 'mobx-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Tag from '../../components/labels/Tag'
import { FaEdit, FaEye, FaEyeSlash, FaLink } from "react-icons/fa";
import { MdRefresh } from 'react-icons/md'

const Admin = () => {

    const [articles, setArticles] = useState([])
    const [error, setError] = useState({isError: false, msg: ''})
    const [loading, setLoading] = useState(false);

    const getArticles = async () => {
        try {
            setLoading(true)
            const res = await fetch('https://api.socalpolitics.com/admin/drafts/', {
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
                    setLoading(false)
                    setError({isError: true, title: 'Error occurred whilst fetching drafts', msg: 'Data was not successfully sent'})
                    return {success: false, msg: 'Data not successful'}
                } else {
                    setArticles(data.data)
                    setLoading(false)
                }
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError({isError: true, title: 'Error occurred whilst fetching drafts'})
        }
    }

    useEffect(()=>{
        getArticles()
    }, [])

    const publicArticle = async (id) => {
        try {
            setLoading(true)
            let res = await fetch('https://api.socalpolitics.com/admin/public', { 
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
            if (!res.ok) { throw new Error('an error occurred') }

            let result = await res.json()
            if (result && result.success) {
                getArticles()
                setLoading(false)
            } else {
                console.log('Article not made public')
                setLoading(false)
                setError({isError: true, title: 'Article Not Made Public', msg: "This was unexpected... Please contact the developer."})
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError({isError: true, title: 'An Error Occurred', msg: "Please check the console and contact the developer."})
        }
    }

    return ( 
        <div className='main'>
            {error.isError && <div className='modal'>
                <div className="overlay" onClick={()=>setError({isError: false})}></div>
                <div className="content">
                    <h3> {error.title || 'Error!'} </h3>
                    <p> {error.msg || 'Something unexpected happened'} </p>
                </div>     
            </div>}
            {loading && <div className='loading'> </div>}
            <header>
                <div className="flex justify-between">
                    <h1>All Drafts</h1>
                    <MdRefresh className='cursor-pointer' onClick={getArticles}/>
                </div>
                <p>Continue editing your drafts here!</p>
            </header>
            <main>

                {articles.map((a,index)=> {
                    return <div className={`flex justify-between items-center article py-2 ${index == 0 ? 'top' : ''}`} key={a.id}> 
                        <span>
                            <h3>{a.title}</h3>
                            <p> {a.id} </p>
                            <span className="flex">
                                {a.tag && <Tag contents={{text: a.tag, type: 'tag'}}/>}
                                {a.author && <Tag contents={{text: a.author, type: 'author'}}/>}
                            </span>
                        </span>

                        <div className="actions flex">
                            <Link href={`/update/${a.id}`}> <FaEdit className='edit'/> </Link>
                            <Link href={`/article/${a.id}`}> <FaLink /> </Link>
                            {a.public === 0 ? (<FaEye className='public' onClick={publicArticle.bind(null, a?.id)}/>) : (<FaEyeSlash className='public'/>)}
                        </div>
                    </div>
                })}

            </main>
        </div>
     );
}
 
export default observer(Admin);
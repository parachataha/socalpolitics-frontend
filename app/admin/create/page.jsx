"use client"

import UserStore from "../../stores/UserStore";
import { FaLocationDot } from "react-icons/fa6";
import { FaHashtag, FaUser, FaInfo } from 'react-icons/fa'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import RichTextEditor from './RichTextEditor'
import { useState } from "react";
import { observer } from 'mobx-react';

const Create = () => {

    const [loading, setLoading] = useState(false)

    const [id, setId] = useState('')
    const [body, setBody] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [img, setImg] = useState('')
    const [imgDesc, setImgDesc] = useState('')
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [location, setLocation] = useState('');
    const [tag, setTag] = useState('');
    const [label, setLabel] = useState('');

    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState({isError: false, msg: ''})

    const handleBodyChange = (value) => {
        setBody(value);
      };
    

    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault()
        UserStore.loading = true;

        let id = `${title
            ?.toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('?', '')
            .replaceAll('!', '')
            .replaceAll('.', '')
            .replaceAll(',', '')
            .replaceAll(';', '').trim()
            .replaceAll(':', '')}-${Math.floor(Math.random()*100)}`
        setId(id)

        const bodyJSON = JSON.stringify(body);

        let article = {
            id: id,
            title: title.trim(),
            tag: tag, 
            label: label,
            location: location,
            author: author,
            date: date,
            img: img,
            imgDesc: imgDesc,
            body: bodyJSON,
            visibility: isPublic,
            // creator: UserStore.username,
            // creatorIsAdmin: UserStore.isAdmin, 
            // createdAt: new Date().toISOString().slice(0, 10)
        }

        let res = await fetch('https://api.socalpolitics.com/article', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( article )
        });

        let result = await res.json();

        if (result && result.success) {
            UserStore.loading = false;
            setShowSuccess(true)
            setLoading(false)

        } else {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            UserStore.isAdmin = false;
            setError({isError: true, msg: result.msg})
            setLoading(false)
        }
    }


    return ( 
        <div className='main'>
            {loading && <div className='loading'> </div>}
            {showSuccess && <div className='modal'> 
                <div className="overlay"></div>
                <div className="content">
                    <h2>Success!</h2>
                    <p> {isPublic ? 'Your article has been shared to the world' : 'Your article has been saved as a draft. You can come back later to finish it.'} </p>
                    <Link className='button mt-2' href={`/article/${id}`}>Show me</Link>
                </div>
            </div>}
            {error.isError && <div className='modal'> 
                <div className="overlay"></div>
                <div className="content">
                    <h2>An Error Occurred!</h2>
                    <p> {error.msg || 'Something unexpected happened, please contact support'} </p>
                </div>
            </div>}
            <header>
                <h1>Create Article</h1>
                <p>You can publish a new article or save it as a draft</p>
            </header>
            <form onSubmit={handleSubmit} id="create" className='my-3'>
                <input required className="underline" type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input required type="date" className="underline mt-3 mb-3" value={date} onChange={(e) => setDate(e.target.value)} />
                <div className="tag flex" style={{maxWidth: '300px'}}>
                    <FaUser/> <input style={{width: '100%'}} required className='ml-1' type="text" id="author" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="my-3" style={{width: '100%', display: 'grid', gridTemplateColumns: '33% 33% 33%', maxWidth: '700px'}}>
                    <div className="tag flex">
                        <FaLocationDot /> <input style={{width: '100%'}} className='ml-1' type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="tag flex">
                        <FaHashtag/> <input style={{width: '100%'}} required className='ml-1' type="text" id="tag" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                    </div>
                    <div className="tag flex">
                        <FaInfo/> <input style={{width: '100%'}} required className='ml-1' type="text" id="label" placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
                    </div>
                </div>
                <input id="upload" type="file" multiple/>

                <br /> <br />
                <input value={img} onChange={(e)=>setImg(e.target.value)} type="text" className="underline" id='img' placeholder="Image link"/>
                <br />
                <input value={imgDesc} onChange={(e)=>setImgDesc(e.target.value)} type="text" className="underline mt-2" id='imgDesc' placeholder="Image Description"/>

                <div className="body">
                    <RichTextEditor value={body} onChange={handleBodyChange} />
                </div>

                <div className="visibility">
                    <h2 className="text-left">Visibility</h2>
                    <div onClick={()=>setIsPublic(false)} className={`widget ${isPublic === false ? 'selected' : ''} tertiary-bg medium-border-radius`}>
                        <div className="top">
                            <h3> Save as Draft </h3>
                            <div className="chip green"> admin-only </div>
                        </div>
                        <p> Viewable by admins only and can be viewed by the private admin-only link </p>
                        <p className='edit-info'> Able to continue editing in drafts panel by any admin </p>
                    </div>
                    <div onClick={()=>setIsPublic(true)} className={`widget ${isPublic === true ? 'selected' : ''} tertiary-bg mt-3 medium-border-radius`}>
                        <div className="top">
                            <h3> Publish to The World </h3>
                            <div className="chip green"> public </div>
                        </div>
                        <p> Displayed publicly on all pages and can be shared by anyone </p>
                        <p className='edit-info'> Can be updated & made a draft later by any admin </p>
                    </div>
                </div>

                <i style={{display: 'block', color: 'var(--translucent-text)', paddingBottom: '11px'}}>Make sure to check everything before publishing. You may edit articles even after {"they're"} posted. </i>
                <button type='submit' className="text-white"> {isPublic === true ? (<span>Publish to The World <FaEye/></span>) : (<span>Save as Draft <FaEyeSlash/></span>)} </button>
            </form>
        </div>
     );
}
 
export default observer(Create);
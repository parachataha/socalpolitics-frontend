"use client"
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import UserStore from "../stores/UserStore";

import { observer } from 'mobx-react';
import { MdDashboard, MdGroups, MdOutlineWallpaper, MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';

const Side = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState('');

    // const handleRouteChange = () => {
    //     setPage(window.location.pathname);
    // };
    // useEffect(() => {
    //     handleRouteChange()
    // }, []);

    useEffect(() => {
        const componentDidMount = async () => {
            try {
                UserStore.loading = true;
                setLoading(true);

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
                    setIsAdmin(result.isAdmin);
                    setLoading(false);
                } else {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = false;
                    UserStore.isAdmin = 0;
                    setLoading(false);
                    notFound();
                }
            } catch (e) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.isAdmin = 0;
                setLoading(false);
            }
        };

        componentDidMount();
    }, []);

    return (
        <div className="side">
            {loading && <div className='loading'></div>}

            <header className="flex">
                <Link className="capitalize" href='/profile'>👋 Welcome {UserStore.username || 'Loading'}</Link>
            </header>

            <ul>
                <li> <Link className={page=='/admin/' ? 'active' : ''} href='/admin' onClick={() => setPage('/admin/')}> <MdDashboard /> Dashboard </Link> </li>
                <li> <Link className={page=='/admin/drafts' ? 'active' : ''} href='/admin/drafts' onClick={() => setPage('/admin/drafts')}> <MdOutlineWallpaper /> Drafts </Link> </li>
                <li> <Link className={page=='/admin/authors' ? 'active' : ''} href='/admin/authors' onClick={() => setPage('/admin/authors')}> <MdGroups /> Authors </Link> </li>
                <p>LABEL</p>
                <li> <Link className={page=='/admin/editors-choice' ? 'active' : ''} href='/admin/editors-choice' onClick={() => setPage('/admin/editors-choice')}> <MdOutlineFeaturedPlayList /> Editors Choice </Link> </li>
                <li> <Link className={page=='/admin/featured' ? 'active' : ''} href='/admin/featured' onClick={() => setPage('/admin/featured')}> <MdOutlineFeaturedPlayList /> Featured </Link> </li>
                <p>EDIT</p>
                <li> <Link className={page=='/admin/create' ? 'active' : ''} href='/admin/create' onClick={() => setPage('/admin/create')}> <IoMdAdd /> Create </Link> </li>
                <li> <Link className={page=='/admin/update' ? 'active' : ''} href='/admin/update' onClick={() => setPage('/admin/update')}> <FaEdit /> Update </Link> </li>
            </ul>
        </div>
    );
}

export default observer(Side);

"use client"

import { observer } from 'mobx-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import UserStore from '../stores/UserStore'

const Form = () => {

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({isError: false, msg: ''})

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
                    }
                });
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                let result = await res.json();
                console.log(res)
          
                if (result && result.success) {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = true;
                    UserStore.username = result.username;
                    UserStore.isAdmin = result.isAdmin;
                    router.push('/profile')
                } else {
                    UserStore.loading = false;
                    UserStore.isLoggedIn = false;
                    UserStore.isAdmin = 0
                    setError({isError: true, header: "We couldn't create your account" ,msg: "Please check your username and password meets our requirements"})
                    setTimeout(()=>{
                        setError({isError:false})
                    }, 5000)
                }
            } catch (e) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.isAdmin = 0
                setError({isError: true, header: "An error occurred" ,msg: "Please contact support"})
                setTimeout(()=>{
                    setError({isError:false})
                }, 5000)
            }
          };
          componentDidMount();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        if(!username || !password) {
            return;
        } 
        UserStore.loading = true;

        try {
            let res = await fetch('https://api.socalpolitics.com/signup', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            let result = await res.json()
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.username = result.username
                router.push('/profile')
            } else if (result && !result.success) {
                resetForm()
                setError({isError: true, msg: result.msg})
            }
            UserStore.loading = false;
        } 
        catch(e) {
            console.log(e)
            setError({isError: true, msg: 'an error occurred'})
        }
    }

    const resetForm = () => {
        setUsername('')
        setPassword('')
    }

    return ( 
        <form id='login' onSubmit={handleSubmit}>

            {error.isError && <div className='error text-left'> 
                <h3 className='text-left'> {error.header || 'An Error Occurred'}  </h3>
                <p className='text-left'> {error.msg || 'Something unexpected happened'} </p>
            </div>}

            <label htmlFor="username">Username</label>
            <input required value={username} onChange={(e)=>setUsername(e.target.value)}type="text" name='username' placeholder="Enter Username"/>

            <label htmlFor="password">Password</label>
            <input required value={password} onChange={(e)=>setPassword(e.target.value)}type="password" name='password' placeholder="Enter Password"/>

            <Link href='/login'>Already have an account? Login</Link>
            <button type='submit'>Signup</button>

        </form>
    );
}
 
export default observer(Form);
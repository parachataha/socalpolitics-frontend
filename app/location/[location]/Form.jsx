"use client"

import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation'

import Link from "next/link";
import { useState } from "react";

const Form = ( {currentQuery} ) => {

    const router = useRouter()
    const [query, setQuery] = useState(currentQuery || '');

    const handleSearch = (e) => {
        e.preventDefault()
        if (query?.length > 0 && query != currentQuery) {
            router.push('/location/'+query)
        }
    }

    return ( 
        <form onSubmit={handleSearch} className='mt-3 mb-5 pb-6 search-form text-center'>
            <div className="flex mb-3">
                <input value={query?.replaceAll('%20', ' ')} onChange={(e)=>setQuery(e.target.value?.replaceAll('%20', ' '))} type="text" placeholder='Search'/>
                <button type='submit'>
                    <FaSearch />
                </button>
            </div>
            <div className='pt-3 text-center'>
                <Link className='mr-1 button button-red' href={`/search/${query}`}>Search Normally</Link>
                <Link className='button button-red' href={`/tag/${query}`}>Search By Tag</Link>
            </div>
            <br />
        </form>
     );
}
 
export default Form;
"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react";

const SearchArticles = () => {

    let router = useRouter()

    const [query, setQuery] = useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        router.push('/search/'+query)
        setQuery('')
    }

    return ( 
        <form onSubmit={handleSearch} className='flex search-articles'>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" placeholder="Search SoCal Politics"/>
            <button type='submit' className="text-white">search</button>
        </form>
     );
}
 
export default SearchArticles;
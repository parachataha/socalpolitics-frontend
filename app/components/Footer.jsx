import Image from "next/image";
import textLogo from "../images/textlogo.png"
import SearchArticles from "./SearchArticles";
import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return ( 
        <footer className='wrapper text-center'>

            <div className="container">
                <Image src={textLogo} width={200} height={150} alt='SoCal Politics Logo'/>

                <SearchArticles />

                <div className="text-white flex mt-5">
                    <ul className='px-3'>
                        <li> <Link className='text-white' href='/tag/politics'>Politics</Link> </li>
                        <li> <Link className='text-white' href='/tag/election'>Elections</Link> </li>
                        <li> <Link className='text-white' href='/tag/interview'>Interview</Link> </li>
                    </ul>
                    <ul className='px-3'>
                        <li> <Link className='text-white' href='/location/orange county'>Orange County</Link> </li>
                        <li> <Link className='text-white' href='/location/san diego'>San Diego</Link> </li>
                        <li> <Link className='text-white' href='/location/los angeles'>Los Angeles</Link> </li>
                    </ul>
                </div>
                <Link href='/about'className='mt-3 text-white text-center'>About SoCal Politics</Link>

            </div>

            <div className="socials flex mt-4 mb-1">
                <a className='text-white twitterx' target="_blank" href="https://twitter.com/_socalpolitics"><FaXTwitter /></a>
                <a className='text-white instagram' target="_blank" href="https://www.instagram.com/socalpolitics/"><FaInstagram /></a>
            </div>

        </footer>
    );
}
 
export default Footer;
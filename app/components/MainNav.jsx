import Link from 'next/link'
import Image from 'next/image'
import fullLogo from '../images/fulllogo.png'
import mobileLogo from '../images/logo.png'
import SidebarWrapper from './SidebarWrapper'

const MainNav = ( props ) => {

    return ( 
        <nav className='main-nav' style={props?.variant?.styles || {}}>
            <SidebarWrapper />
            
            <ul>
                <li> <Link className='blue' href="/tag/politics">Politics</Link> </li>
                <li> <Link className='blue' href="/tag/election">Elections</Link> </li>
                <li> <Link className='blue' href="/tag/interview">Interviews</Link> </li>
                <li className='main-img'> <Link href='/'> <Image placeholder='blur' width={200} height={100} quality={60} className='main-logo' src={fullLogo} alt="logo"  /> </Link> </li>
                <li className='mobile-img'> <Link href='/'> <Image placeholder='blur' width={200} height={100} quality={60} className='mobile-logo' src={mobileLogo} alt="logo"  /> </Link> </li>
                <li> <Link className='red' href="/location/San Diego">San Diego</Link> </li>
                <li> <Link className='red' href="/location/Orange County">Orange County</Link> </li>
                <li> <Link className='red' href="/location/Los Angeles">Los Angeles</Link> </li>
            </ul>
        </nav>
    );
}
 
export default MainNav;
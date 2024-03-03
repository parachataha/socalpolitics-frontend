import Link from "next/link";
import { FaHashtag, FaUser, FaInfo } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const Tag = ({contents, link, variant}) => {

    let isHashtag = false
    if (contents.type == 'tag') {
        isHashtag = 'hashtag'
    } 

    if (contents?.type == 'tag') {
        return (
            <Link style={variant?.styles || {}} className={`capitalize cursor-pointer flex tag ${isHashtag || ''} ${variant?.classes || ''}`} href={'/tag/'+contents.text}>
                {contents?.type == 'tag' && <FaHashtag />}
                {contents?.type == 'location' && <FaLocationDot />}
                {contents?.type == 'author' && <FaUser />}
                {contents?.type == 'label' && <FaInfo />}
                {contents.text}
            </Link> )
    } else if (contents?.type == 'location') {
        return ( <Link style={variant?.styles || {}} className={`capitalize cursor-pointer flex tag ${isHashtag || ''} ${variant?.classes || ''}`} href={'/location/'+contents.text}>
                {contents?.type == 'tag' && <FaHashtag />}
                {contents?.type == 'location' && <FaLocationDot />}
                {contents?.type == 'author' && <FaUser />}
                {contents?.type == 'label' && <FaInfo />}
                {contents.text}
            </Link> )
    } else {
        return ( 
        <>

            {link == true ? (
                <Link style={variant?.styles || {}} className={`capitalize cursor-pointer flex tag ${isHashtag || ''} ${variant?.classes || ''}`} href={link}>
                    {contents?.type == 'tag' && <FaHashtag />}
                    {contents?.type == 'location' && <FaLocationDot />}
                    {contents?.type == 'author' && <FaUser />}
                    {contents?.type == 'label' && <FaInfo />}
                    {contents.text}</Link>
            ) : (
                <p style={variant?.styles || {}} className={`capitalize flex tag ${contents?.type || ''} ${variant?.classes || ''}`}>
                    {contents?.type == 'tag' && <FaHashtag />}
                    {contents?.type == 'location' && <FaLocationDot />}
                    {contents?.type == 'author' && <FaUser />}
                    {contents?.type == 'label' && <FaInfo />}
                    {contents.text}</p>
            )}
        </> );
    }
}
 
export default Tag;
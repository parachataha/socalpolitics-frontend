"use client"
import { FacebookShareButton, TwitterShareButton } from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLink, FaCheck } from "react-icons/fa";
import { useState } from "react";

const ShareButtons = ( {data} ) => {

    const [copied, setCopied] = useState(false)

    function copiedToClipboard() {
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 1500)
    }

    return ( 
        <div className="share flex">
            <FacebookShareButton
                className="facebook share-button"
                quote={data.title}
                hashtag="#news"
                url={`https://socalpolitics.com/article/${data.id}`}
            >
                <FaFacebookF/>
            </FacebookShareButton>

            <TwitterShareButton
                className="twitter share-button"
                title={data.title}
                hashtags={["news", "SoCalPolitics", data.tag?.replaceAll(' ', '') || 'politics']}
                url={`https://socalpolitics.com/article/${data.id}`}
                related={["_socalpolitics"]}
            >
                <FaXTwitter />
            </TwitterShareButton>

            <div className="copy share-button" onClick={copiedToClipboard}>
                <CopyToClipboard text={`https://socalpolitics.com/article/${data.id}`}>
                    {copied ? ( <FaCheck /> ) : ( <FaLink /> )}
                </CopyToClipboard>
            </div>
        </div>
     );
}
 
export default ShareButtons;  
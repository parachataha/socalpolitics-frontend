import Link from 'next/link'

export const metadata = {
    title: 'Home - SoCal Politics',
    description: "Hmm, the page your were looking for does not exist... Let's take your home",
    metadataBase: new URL('https://socalpolitics.com'),
    openGraph: {
      title: 'Home - SoCal Politics',
      description: "Hmm, the page your were looking for does not exist... Let's take your home",
      url: 'https://socalpolitics.com',
      siteName: 'SoCal Politics',
      images: [
        {
          url: 'https://socalpolitics.com/cdn/images/notfound.png', 
          secureUrl: 'https://socalpolitics.com/cdn/images/notfound.png',
          width: 1200,
          height: 630,
          alt: 'SoCal Politics Not Found Banner',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Not Found - SoCal Politics',
      description: 'Hmm, the page your were looking for does not exist...',
      images: ['https://socalpolitics.com/cdn/images/notfound.png'], // Must be an absolute URL
    },
  }

const NotFound = () => {
    return ( 
        <div id='not-found' className="page text-center flex flex-col justify-center items-center">

            <h1>This is Awkward</h1>
            <p>Seems like you tried to go somewhere that {"doesn't"} exist...</p>
            <div className="flex">
                <Link className='my-[.7em] go-home text-white' href='/'>Go home</Link>
            </div>
            

        </div>
    );
}
 
export default NotFound;
import Main from './Main'

export const metadata = {
    title: 'Your Profile - SoCal Politics',
    keywords: ['Next.js', 'React', 'JavaScript','Login', 'Politics', 'SoCal Politics', 'News', 'San Diego', 'Orange County', 'Los Angeles', 'Interviews', 'Elections', 'Politics', 'Jose Toscano', 'Taha Paracha'],
    authors: [{ name: 'SoCal Politics' }, { name: 'SoCal Politics', url: 'https://socalpolitics.com' }],
    description: 'Login to SoCal Politics to unlock countless new features!',
    metadataBase: new URL('https://socalpolitics.com/profile'),
    openGraph: {
      type: "website",
      title: 'Your Profile - SoCal Politics',
      description: 'Login to SoCal Politics to unlock countless new features!',
      url: 'https://socalpolitics.com/profile',
      siteName: 'SoCal Politics',
    },
    twitter: {
      title: 'Your Profile - SoCal Politics',
      description: 'Login to SoCal Politics to unlock countless new features!',
    },
}

const Profile = () => {

    return ( 
        <div className="page flex flex-col justify-center text-center" id="profile">

        <Main/>                
                
        </div>
    );
}
 
export default Profile;
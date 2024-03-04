import Main from "./Main"

export const metadata = {
    title: 'Admin - SoCal Politics',
    keywords: ['Next.js', 'React', 'JavaScript','Login', 'Politics', 'SoCal Politics', 'News', 'San Diego', 'Orange County', 'Los Angeles', 'Interviews', 'Elections', 'Politics', 'Jose Toscano', 'Taha Paracha'],
    authors: [{ name: 'SoCal Politics' }, { name: 'SoCal Politics', url: 'https://socalpolitics.com' }],
    description: 'Welcome to the admin page to SoCal Politics!',
    metadataBase: new URL('https://socalpolitics.com/admin'),
    openGraph: {
      type: "website",
      title: 'Admin - SoCal Politics',
      description: 'Login to SoCal Politics to unlock countless new features!',
      url: 'https://socalpolitics.com/admin',
      siteName: 'SoCal Politics',
    },
    twitter: {
      title: 'Admin - SoCal Politics',
      description: 'Login to SoCal Politics to unlock countless new features!',
    },
}


const AdminLayout = ( {children} ) => {

    return ( 
        <Main children={children}/>
    )
  }

export default AdminLayout
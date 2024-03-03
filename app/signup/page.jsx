import Form from './Form'
import './login.min.css'

export const metadata = {
    title: 'Sign up - SoCal Politics',
    keywords: ['Next.js', 'React', 'JavaScript','Login', 'Politics', 'SoCal Politics', 'News', 'San Diego', 'Orange County', 'Los Angeles', 'Interviews', 'Elections', 'Politics', 'Jose Toscano', 'Taha Paracha'],
    authors: [{ name: 'SoCal Politics' }, { name: 'SoCal Politics', url: 'https://socalpolitics.com' }],
    description: 'Create an account with SoCal Politics to unlock countless new features!',
    metadataBase: new URL('https://socalpolitics.com/signup'),
    openGraph: {
      title: 'Sign up - SoCal Politics',
      description: 'Create an account with SoCal Politics to unlock countless new features!',
      url: 'https://socalpolitics.com/signup',
      siteName: 'SoCal Politics',
    },
    twitter: {
      title: 'Sign up - SoCal Politics',
      description: 'Create an account with SoCal Politics to unlock countless new features!',
    },
}

const Login = () => {
    return ( 
        <main className='page login'>
            <div className="main">
                <article>
                    <div className="emoji">
                        🚪
                    </div>
                    <h1>Signup</h1>
                    <h2>Create an Account</h2>
                    <Form />
                </article>
            </div>


        </main>
    );
}
 
export default Login;
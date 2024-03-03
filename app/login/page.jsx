import Form from './Form'
import './login.min.css'

export const metadata = {
    title: 'Login - SoCal Politics',
    keywords: ['Next.js', 'React', 'JavaScript','Login', 'Politics', 'SoCal Politics', 'News', 'San Diego', 'Orange County', 'Los Angeles', 'Interviews', 'Elections', 'Politics', 'Jose Toscano', 'Taha Paracha'],
    authors: [{ name: 'SoCal Politics' }, { name: 'SoCal Politics', url: 'https://socalpolitics.com' }],
    description: 'Login to SoCal Politics to unlock countless new features!',
    metadataBase: new URL('https://socalpolitics.com/login'),
    openGraph: {
      title: 'Login - SoCal Politics',
      description: 'Login to SoCal Politics to unlock countless new features!',
      url: 'https://socalpolitics.com/login',
      siteName: 'SoCal Politics',
    },
    twitter: {
      title: 'Login - SoCal Politics',
      description: 'Login to SoCal Politics to unlock countless new features!',
    },
}

const Login = () => {
    return ( 
        <main className='page login'>
            <div className="main">
                <article>
                    <div className="emoji">
                        👋
                    </div>
                    <h1>Login</h1>
                    <h2>Welcome Back</h2>
                    <Form />
                </article>
            </div>


        </main>
    );
}
 
export default Login;
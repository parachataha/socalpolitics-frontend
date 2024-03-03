import Link from 'next/link'

const NotFound = () => {
    return (  
        <div className="main">
            <div id='not-found' className="page text-center flex flex-col justify-center items-center">

                <h1>This is Awkward</h1>
                <p>Seems like you tried to go somewhere that {"doesn't"} exist...</p>
                <div className="flex">
                    <Link className='my-[.7em] go-home text-white' href='/'>Go home</Link>
                </div>

            </div>
        </div>
    );
}
 
export default NotFound;
import Skeleton from "../../components/Skeleton";
import MainNav from "../../components/MainNav";

const Loading = () => {
    return ( 
        <article id='article' className="page">
            <div className="loading">
                
            </div>
            <MainNav />

            <div className="wrapper" style={{width: '100%'}}>
                <div className="article-wrapper" style={{width: '100%', maxWidth: '650px'}}>

                    <header className="container">
                        <h1> <Skeleton style={{width: '100%', height: '55px'}}/> </h1>

                        <div className="flex mb-2">
                            <Skeleton style={{width: '25%', height: '30px'}}/>
                            <Skeleton style={{width: '25%', height: '30px'}}/>
                        </div>
                        
                        <Skeleton style={{width: '100%', height: '400px'}}/>
                        <div className="py-2">
                            <Skeleton style={{width: '43%', height: '30px'}}/>
                            <Skeleton style={{width: '50%', height: '30px'}}/>
                        </div>
                        
                    </header>

                    <article className='my-4 body container'>
                    <Skeleton style={{ height: '500px', width: '100%' }} />
                    </article>

                </div>

                <div className="container">
                
                <br/> 
                <div className="grid-small">
                    <div>
                        <Skeleton style={{height: '180px'}}/>
                        <Skeleton style={{height: '30px', width: '80%'}}/>
                    </div>
                    <div>
                        <Skeleton style={{height: '180px'}}/>
                        <Skeleton style={{height: '30px', width: '80%'}}/>
                    </div>
                    <div>
                        <Skeleton style={{height: '180px'}}/>
                        <Skeleton style={{height: '30px', width: '80%'}}/>
                    </div>
                </div>
                <br/>

                </div>

            </div>

        </article>
    );
}
 
export default Loading;
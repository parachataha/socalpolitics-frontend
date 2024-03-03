import Skeleton from "../../components/Skeleton"

const Loading = () => {

    return ( 
        <div id='search' className='page wrapper'>

            <div className="loading"></div>

            <main className="container flex items-center justify-center">
                <div style={{width: '100%'}} className="flex flex-col items-center justify-center">
                    <Skeleton style={{height: '60px', width: '50%'}}/>
                    <Skeleton style={{height: '45px', width: '30%'}}/>
                    <br />

                    <Skeleton style={{height: '40px', width:'70%', borderRadius:'40px'}}/>
                    <div className="flex" style={{width: '40%'}}>
                        <Skeleton style={{height: '30px', width: '50%', borderRadius:'40px'}}/>
                        <Skeleton style={{height: '30px', width: '50%', borderRadius:'40px'}}/>
                    </div>
                    <br />

                    <div style={{width: '100%'}} className="grid-small">
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
                </div>
                <br />

            </main>

        </div>
    );
}
 
export default Loading;
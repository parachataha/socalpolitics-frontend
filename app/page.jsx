import Link from 'next/link'

import Image from 'next/image'
import logoLines from './images/logolines.png'

import Loading from './components/Loading'
import WideCard from './components/cards/WideCard'
import LargeCard from './components/cards/LargeCard'
import SmallCard from './components/cards/SmallCard'
import Widget from './components/widgets/Widget'
import ListCard from './components/cards/ListCard'
import UserStore from './stores/UserStore'

async function getFeatured() {
  try {
      const res = await fetch('https://api.socalpolitics.com/featured', {
          next: {
              revalidate: 0
          },
          headers: {
            'Cache-Control': 'no-store'
          }
      })
      if (!res.ok) throw new Error('error fetching featured articles!')

      const data = await res.json();

      if (data.success) {
        return data.data;
      } else {
        return []
        // console.log('An error occurred while fetching featured articles')
      }
  } catch (e) {
      console.log(e)
  }
}
async function getArticles() {
  try {
    const res = await fetch('https://api.socalpolitics.com/home/main', {
        next: {
            revalidate: 0
        },
        headers: {
          'Cache-Control': 'no-store'
        }
    })
    if (!res.ok) throw new Error('error fetching articles!')

    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      return []
      // console.log('An error occurred while fetching home page main articles')
    }
} catch (e) {
    console.log(e)
}
}
async function getEditorsChoice() {
  try {
    const res = await fetch('https://api.socalpolitics.com/editors-choice', {
        next: {
            revalidate: 0
        },
        headers: {
          'Cache-Control': 'no-store'
        }
    })
    if (!res.ok) throw new Error('error fetching editors-choice!')

    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      return []
      // console.log('An error occurred while fetching home page main articles')
    }
} catch (e) {
    console.log(e)
}
}

async function getPolitics() {
  try {
    const res = await fetch('https://api.socalpolitics.com/tag/politics', {
        next: {
            revalidate: 60 * 30
        }
    })
    if (!res.ok) throw new Error('error!')

    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      // console.log('An error occurred while fetching #politics articles')
    }
} catch (e) {
  console.log(e)
  return []
}
}
async function getElection() {
  try {
    const res = await fetch('https://api.socalpolitics.com/tag/election', {
        next: {
            revalidate: 60 * 30 * 0
        }
    })
    if (!res.ok) throw new Error('error!')

    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      // console.log('An error occurred while fetching #election articles')
      return []
    }
} catch (e) {
    console.log(e)
}
}
async function getInterview() {
  try {
    const res = await fetch('https://api.socalpolitics.com/tag/interview', {
        next: {
            revalidate: 60 * 30 * 0
        }
    })
    if (!res.ok) throw new Error('error!')

    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      // console.log('An error occurred while fetching #interview articles')
      return []
    }
} catch (e) {
    console.log(e)
}
}

const Home = async e => {

  const featured = await getFeatured();
  const editorsChoice = await getEditorsChoice();
  const articles = await getArticles();
  
  const politicsArticles = await getPolitics();
  const electionArticles = await getElection();
  const interviewArticles = await getInterview();

  const componentDidMount = async () => {
    try {
        UserStore.loading = true;
  
        let res = await fetch('https://api.socalpolitics.com/isLoggedIn', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        let result = await res.json();
        console.log(result)
  
        if (result && result.success) {
            UserStore.loading = false;
            UserStore.isLoggedIn = true;
            UserStore.username = result.username;
            UserStore.isAdmin = result.isAdmin;
        } else {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            UserStore.isAdmin = 0
        }
    } catch (e) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
        UserStore.isAdmin = 0
    }
  };
  componentDidMount()

  return (
    <main id='home'>
      <header className='home-header'>
        <div className="content">
            <div className="container">
              <div className="text-container">
                <h1 style={{
                    animation: 
                    'typing 10s steps(20, end) forwards, blinking 2.5s forwards'
                }}> 
                <span className="socal-wrapper">
                  <span className='red'>S<span className='small' style={{marginRight: '5px'}}>O</span>
                  C<span className='small'>A</span><span className="L">L</span></span><span> 
                    <Image className='mobile-hide' src={logoLines} alt="logo asset" placeholder="blur" /></span> <br /> 
                </span>
                <span className='white'>POLITICS</span>  </h1>
            </div>
            <br />
          </div>
        </div>
      </header> 
  
      <section className="wrapper" id='main'>

        <div className="container">

          {featured.length > 0 && <>
          
            {featured.map((a, index)=>{
              if (index > 0) return
              else return (
                <WideCard key={a.id} data={
                  {
                  tag: a?.tag, location: a?.location, author: a?.author,
                  img: a?.img, imgDesc: a?.imgDesc,
                  id: a?.id, 
                  title: a?.title, 
                  body: a?.body
                  }} 
                  variant={{
                    image: true, 
                    badge:{show: true, text:'Featured', color: 'yellow'}
                  }}/>
              )
            })}
          
          </>}

          {articles.length > 0 && <>
            
            {articles.map((a, index)=>{
              if (index == 0 && a.id!=featured[0].id) return (
                <WideCard key={a.id} data={
                {
                tag: a?.tag, location: a?.location, author: a?.author,
                img: a?.img, imgDesc: a?.imgDesc,
                id: a.id, title: a.title, 
                body: a.body
                }} 
                variant={{
                  image: true, 
                  badge:{show: true, text: 'Latest', color: 'red'}
                }}/>
              )
            })}
          
          </>}

          <div className="grid-column pt-5 gap-3">

            <div className='main-column'>

              <div className="trending-topics">
                <Widget variant={{classes: 'red small-border-radius'}}>
                  <h2 className='text-lg text-white text-left'>Trending Topics</h2>
                </Widget>

                <Widget variant={{classes: 'main mt-3 mb-5 red-light small-border-radius'}}>
                  <div>
                    <span>
                      <Link href='/tag/interview'>Interviews</Link>
                    </span>
                    <hr />
                  </div>
                  <div>
                    <span>
                      <Link href='/tag/politics'>Politics</Link>
                    </span>
                    <hr />
                  </div>
                  <div>
                    <span>
                      <Link href='/tag/election'>Elections</Link>
                    </span>
                    <hr />
                  </div>
                  <div>
                    <span>
                      <Link href='/location/orange county'>Orange County</Link>
                    </span>
                    <hr />
                  </div>
                  <div>
                    <span>
                      <Link href='/location/los angeles'>Los Angeles</Link>
                    </span>
                    <hr />
                  </div>
                  <div>
                    <span>
                      <Link href='/location/san diego'>San Diego</Link>
                    </span>
                    <hr />
                  </div>

                </Widget>


              </div>

              {editorsChoice?.length >= 1 && <div className="editors-choice">
                <Widget variant={{classes: 'blue small-border-radius'}}>
                  <h2 className='text-lg text-white text-left'>Editors Choice</h2>
                </Widget>

                <Widget variant={{classes: 'main mt-3 blue-light small-border-radius'}}>
                  <SmallCard key={editorsChoice[1]?.id}
                    data={
                      {
                      tag: editorsChoice[1]?.tag, location: editorsChoice[1]?.location, author: editorsChoice[1]?.author,
                      img: editorsChoice[1]?.img, imgDesc: editorsChoice[1]?.imgDesc,
                      id: editorsChoice[1]?.id, title: editorsChoice[1]?.title, 
                      body: editorsChoice[1]?.body
                      }} 
                      variant={{
                        tagStyles: {display: 'none'},
                        badge:{show: false, text: editorsChoice[1]?.label, color: 'yellow'}
                    }}
                  /> 
                </Widget>


              </div>}
            </div>

            <div>
              <div className="grid-medium">

                {articles.length > 0 && <>

                  {articles.map((a, index)=>{
                    if (index > 0 && index < 5) { return <SmallCard key={a?.id}
                    data={
                      {
                      tag: a?.tag, location: a?.location, author: a?.author,
                      img: a?.img, imgDesc: a?.imgDesc,
                      id: a?.id, title: a?.title, 
                      body: a?.body
                      }} 
                      variant={{
                        badge:{show: false, text: a?.label, color: 'yellow'}
                    }}
                  /> } else return;
                  })}
                
                </>}

              </div>
            </div>

          </div>

          
        </div>

      </section>

      {editorsChoice?.length > 0 && <section className="wrapper" id="editorsChoice">
          <h2 className='text-white'>What We Loved</h2>
          <br /> <br />
          <div className="container">
            
            {editorsChoice.map((a,index)=>{
              if (index == 0) return (
                <LargeCard key={a?.id}
                  data={
                    {
                    tag: a?.tag, location: a?.location, author: a?.author,
                    img: a?.img, imgDesc: a?.imgDesc, 
                    id: a?.id, title: a?.title, 
                    body: a?.body
                  }} 
                    variant={{
                      badge:{show: false},
                      classes:'text-white'
                    }}
                />
              ) 
              else return;
            })}
            
          </div>
      </section>} 

      {articles.length > 2 && <section className="wrapper mb-2" id="latest">
          <h2>Recent Articles</h2>
          <br />
          <div className="container grid-small">

          {articles.map((a, index)=>{
            if (index < 6 || index == 0) { return <SmallCard key={a?.id}
            data={
              {
              tag: a?.tag, location: a?.location, author: a?.author,
              img: a?.img, imgDesc: a?.imgDesc,
              id: a?.id, title: a.title, 
              body: a?.body
              }} 
              variant={{
                badge:{show: true, text: 'featured', color: 'yellow'}
            }}
          /> } else return;
          })}

          </div>
          <div className="container">
            {articles.map((a,index)=> {
              if (index == 7 || index ==8) {
                let color = 'yellow'
                let showBadge = true

                if (a.label?.toLowerCase() == 'warning' || a.label?.toLowerCase() == 'alert' || a.label?.toLowerCase() == 'danger') {color = 'red'; showBadge = true}
                else if (a.label?.toLowerCase().includes('socal') || a.label?.toLowerCase().includes('welcome') || a.label?.toLowerCase().includes('news') || a.label?.toLowerCase().includes('trending') ) { color = 'blue'; showBadge = true }
                return <WideCard className='mr-2 mb-2' key={a?.id}
                data={
                  {
                  tag: a?.tag, location: a?.location, author: a?.author,
                  img: a?.img, imgDesc: a?.imgDesc,
                  id: a?.id, title: a?.title, 
                  body: a?.body
                  }} 
                  variant={{
                    badge:{show: showBadge, text: a?.label, color: color}
                }}
              /> 
              } else return;
            })}
          </div>
      </section>}

      <section className='wrapper small-padding' id='byTag'>

        <>
      

          {(politicsArticles.length >= 1 && electionArticles?.length >= 1 && interviewArticles?.length >= 1) && 
            <div className="container grid-triple">  
              {politicsArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Politics</h2>
                <ul>
                  {politicsArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}

              {electionArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Elections</h2>
                <ul>
                  {electionArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}

              {interviewArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Interviews</h2>
                <ul>
                  {interviewArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}
              <br />
            </div>
          }
          
          {(
            (politicsArticles.length >= 1 && electionArticles?.length >= 1 && interviewArticles?.length === 0) ||
            (politicsArticles.length >= 1 && electionArticles?.length === 0 && interviewArticles?.length >= 1) ||
            (politicsArticles.length === 0 && electionArticles?.length >= 1 && interviewArticles?.length >= 1)
          ) && 
            <div className="container grid-medium">  
              {politicsArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Politics</h2>
                <ul>
                  {politicsArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}

              {electionArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Elections</h2>
                <ul>
                  {electionArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}

              {interviewArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Interviews</h2>
                <ul>
                  {interviewArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}
              <br />
            </div>
          }

          {(
            (politicsArticles.length >= 1 && electionArticles?.length === 0 && interviewArticles?.length === 0) ||
            (politicsArticles.length === 0 && electionArticles?.length >= 1 && interviewArticles?.length === 0) ||
            (politicsArticles.length === 0 && electionArticles?.length === 0 && interviewArticles?.length >= 1)
          ) && 
            <div className="container">  
              {politicsArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Politics</h2>
                <ul>
                  {politicsArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}

              {electionArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Elections</h2>
                <ul>
                  {electionArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}

              {interviewArticles?.length >= 1 && <div className='articles-list'>
                <h2 className='text-left'>Interviews</h2>
                <ul>
                  {interviewArticles.map((a, index)=> {
                    if (index < 4) { return (
                      <li key={a.id}>
                        <ListCard data={a}/>
                      </li>
                    ) } else return;
                  })}
                </ul>
              </div>}
              <br />
            </div>
          }   

        </>
      
      </section>

    </main>
  )
}

export default Home
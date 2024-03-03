import Image from "next/image";

export const metadata = {
    title: 'About Us - SoCal Politics',
    keywords: ['Next.js', 'React', 'JavaScript','Login', 'Politics', 'SoCal Politics', 'News', 'San Diego', 'Orange County', 'Los Angeles', 'Interviews', 'Elections', 'Politics', 'Jose Toscano', 'Taha Paracha'],
    authors: [{ name: 'SoCal Politics' }, { name: 'SoCal Politics', url: 'https://socalpolitics.com/about' }],
    description: 'SoCal Politics is an independent publication to represent Southern California',
    metadataBase: new URL('https://socalpolitics.com/about'),
    openGraph: {
      title: 'About Us - SoCal Politics',
      description: 'SoCal Politics is an independent publication to represent Southern California',
      url: 'https://socalpolitics.com/about',
      siteName: 'SoCal Politics',
      images: [
        {
          url: 'https://socalpolitics.com/cdn/images/banner.png', 
          secureUrl: 'https://socalpolitics.com/cdn/images/banner.png',
          width: 1200,
          height: 630,
          alt: 'SoCal Politics Banner',
        },
      ],
    },
    twitter: {
      title: 'About Us - SoCal Politics',
      description: 'SoCal Politics is an independent publication to represent Southern California',
      images: ['https://socalpolitics.com/cdn/images/banner.png']
    },
}

const About = () => {
    return (
        <section className='page wrapper' id="about">
        <div style={{width: "100%", backgroundColor: 'black', height: "250px", position: "relative"}}>

            <Image className='banner' src="https://socalpolitics.com/cdn/images/aboutbg.jpg" width={100} height={100} alt="About page banner background" style={{
                height: "100%",
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0)",
                objectFit: "cover"
            }} />
            <div className='black-gradients' style={{
                height: "100%",
                position: "absolute",
                width: "50vw",
                backgroundSize: 'cover',
                backgroundImage: "linear-gradient(to right, rgb(0 0 0 / 0%), rgb(0 0 0 / 100%) 55%)",
                right: 0,
            }}></div>
            <div className='black-gradients' style={{
                height: "100%",
                position: "absolute",
                width: "50vw",
                backgroundSize: 'cover',
                backgroundImage: "linear-gradient(to left, rgb(0 0 0 / 0%), rgb(0 0 0 / 100%) 50%)",
                left: 0,
            }}></div>
            <div style={{
                position: "absolute",
                bottom: "0",
                paddingBottom: "3vh",
                left: "25%"
            }}>
                <span className='headers' style={{
                    color: "white",
                    fontSize: "2.3em",
                }}>About Us</span>
                <br />
                <span className='headers' style={{
                    color: "white",
                    fontSize: "1.1em",
                }}>Learn more about how we operate</span>
            </div>
        </div>
        <div className="container">
            <div className='content'>
                <br />
                <b style={{
                    fontSize: "2.5vh"
                }}>SoCal Politics is an independent publication to represent Southern California</b>
                <br />
                <br />
                <span>We are a nonpartisan news outlet dedicated to providing the best coverage on elections and politics at the local, statewide, and federal levels that have an impact on Southern California. {"We'll"} be covering the counties of:</span>
                <br />
                <br />
                <span>Imperial, Kern, Los Angeles, Orange, Riverside, San Bernardino, San Diego, San Luis Obispo, Santa Barbera, and Ventura.</span>
                <br />
                <br />
                <span>Over the past few years, local news in Southern California has experienced a decline, leaving readers with limited alternatives to rely on. California is a vast and diverse state, leading to differing issues between the Bay Area and Northern California compared to those in the southern region. This is why we are here to provide civic awareness and the latest news in SoCal Politics.</span>
                <br />
                <br />
                <b style={{
                    fontSize: "3vh",
                    color: "#a02a28",
                }}>Our Founder</b>
                <div id='author' className='about-flex flex' style={{
                    width: '100%',
                    paddingTop: "2vh",
                    alignItems: "center"
                }}>
                    <Image width={200} height={600} src="https://socalpolitics.com/cdn/images/about.jpg" alt="A picture of SoCal Politics Founder, Jose" style={{
                        height: "40vh",
                        objectFit: 'contain'
                    }} />
                    <div style={{
                        paddingLeft: "1vw"
                    }}>
                        <span>We were founded in August 2023 by Jose Toscano, an 19-year-old college student. {"Jose's"} passion for politics began at 12 during the 2016 presidential election. He discovered journalism in high school while interviewing a congressman and state legislators for his high school newspaper, aiming to promote civic engagement amongst his classmates.</span>
                        <br />
                        <br />
                        <span>Jose currently serves as the Editor-In-Chief for SoCal Politics.</span>
                    </div>
                </div>
                <br />
                <br />
                <b style={{
                    fontSize: "3vh",
                    color: "#a02a28",   
                    
                }}>Contact</b>
                <br />
                <span>For inquiries, article submissions, comments, notes to the editor, or opportunities, please email <a href="mailto:contact@socalpolitics.com">contact@socalpolitics.com</a>.</span>
                <br /> <br />
            </div>
        </div>
    </section>
    );
}

export default About;

import Link from "next/link";
import {
    FiTwitter,
    FiLinkedin,
    FiYoutube,
    FiFacebook,
    FiInstagram
  } from "react-icons/fi";
const Footer = () => {
    const socialMedias=[
        {
            link:"https://www.facebook.com",
            icon: <FiFacebook />,
            label:"Facebook"
        },
        {
            link:"https://www.google.com/",
            icon: <FiTwitter />,
            label:"Twitter"
        },
        {
            link:"https://web.facebook.com/",
            icon: <FiLinkedin />,
            label:"Linkedin"
        },
        {
            link:"https://www.instagram.com/",
            icon: <FiInstagram />,
            label:"Instagram"
        },
        {
            link:"https://www.youtube.com/",
            icon: <FiYoutube />,
            label:"Youtube"
        },
    ]
    return ( 
        <footer className="flex flex-col justify-center space-y-7 h-40 bg-green-500 text-white">
            <div className="flex justify-center items-center">
                <p >Our Contacts:</p>
            </div>
            <div className="flex justify-center items-center">
            <ul className="flex space-x-10">
                {
                    socialMedias.map((media)=>
                        <div key={media.link}>
                            <p> {media.icon}</p>
                            <Link href={media.link}>
                            {media.label}
                            </Link>
                        </div>
                        
                    )
                }
            </ul>
            </div>
            <div className="flex justify-center items-center">
                <p>© 2025 Gomore PLC</p>
            </div>
            
        </footer>
     );
}
 
export default Footer;
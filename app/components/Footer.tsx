import Link from "next/link";
import {
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiPhoneIncoming
} from "react-icons/fi";

const Footer = () => {
  const socialMedias = [
    { link: "#", icon: <FiPhoneIncoming />, label: "+251912131415" },
    { link: "https://www.instagram.com/", icon: <FiInstagram />, label: "Instagram" },
    { link: "https://www.linkedin.com/", icon: <FiLinkedin />, label: "LinkedIn" },
    { link: "https://www.facebook.com", icon: <FiFacebook />, label: "Facebook" },
    { link: "https://www.google.com/", icon: <FiTwitter />, label: "Twitter" },
  ];

  return (
    <footer className="bg-slate-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-20 space-y-6 md:space-y-0">
          
           {/* Nav Links */}
           <div className="flex flex-col gap-3 items-center md:items-start">
            <Link href="/about" className="text-lg font-semibold hover:underline">About</Link>
            <Link href="/people" className="text-lg font-semibold hover:underline">People</Link>
            <Link href="/Career" className="text-lg font-semibold hover:underline">Career</Link>
          </div>

          {/* Social Media */}
          <ul className="flex flex-col items-center gap-3 md:items-start">
            <p className="text-lg font-semibold">Contacts</p>
            {socialMedias.map((media) => (
              <li key={media.link} className="flex items-center gap-2">
                <Link
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-yellow-400 transition-colors"
                >
                  {media.icon}
                </Link>
                <Link
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {media.label}
                </Link>
              </li>
            ))}
          </ul>

         
        </div>

        {/* Copyright */}
        <div className="text-center mt-6">
          <p className="text-sm">© 2025 Gomor PLC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

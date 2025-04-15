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
    <footer className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-slate-200 py-6">
          
          {/* Info */}
          <div className="flex flex-col gap-2 text-center sm:text-left pl-3 md:pl-6">
            <h2 className="text-lg font-semibold">Gomor Architects</h2>
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit
              reiciendis adipisci placeat dolore dolorem!
            </p>
          </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <Link href="/about" className="text-lg font-semibold hover:underline">About</Link>
          <Link href="/people" className="text-lg font-semibold hover:underline">People</Link>
          <Link href="/Career" className="text-lg font-semibold hover:underline">Career</Link>
        </div>
        {/* Social Media */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
            <p className="text-lg font-semibold">Contacts</p>
            {socialMedias.map((media) => (
              <li key={media.link} className="flex items-center gap-2 justify-center sm:justify-start">
                <Link href={media.link} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-yellow-400 transition-colors">
                  {media.icon}
                </Link>
                <Link href={media.link} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  {media.label}
                </Link>
              </li>
            ))}
          </div>


    </div>


        {/* Copyright */}
        <div className="text-center mt-6">
          <p className="text-sm">© 2025 Gomor PLC</p>
        </div>
  </footer>
  );
};

export default Footer;

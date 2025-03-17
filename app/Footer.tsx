import Link from "next/link";
import {
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiFacebook,
  FiInstagram
} from "react-icons/fi";

const Footer = () => {
  const socialMedias = [
    { link: "https://www.facebook.com", icon: <FiFacebook />, label: "Facebook" },
    { link: "https://www.google.com/", icon: <FiTwitter />, label: "Twitter" },
    { link: "https://web.facebook.com/", icon: <FiLinkedin />, label: "LinkedIn" },
    { link: "https://www.instagram.com/", icon: <FiInstagram />, label: "Instagram" },
    { link: "https://www.youtube.com/", icon: <FiYoutube />, label: "YouTube" }
  ];

  return (
    <footer className="bg-green-800 text-white py-6">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Our Contacts:</p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center">
        <ul className="flex flex-wrap gap-6 md:gap-10">
          {socialMedias.map((media) => (
            <li key={media.link} className="flex flex-col items-center text-center">
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
        <p className="text-sm">© 2025 Gomore PLC</p>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { Menu, X, Home } from "lucide-react";

const NavBar = () => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const links = [
    { href: "/", label: "Home", icon: <Home size={18} /> },
    { href: "/architecture", label: "Architecture" },
    { href: "/interior-design", label: "Interior Design" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  return (
    <header className="relative z-50 bg-white border-b px-4 py-4 md:px-8 lg:px-12 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {links.map((link) => (
            <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
              <Link
                href={link.href}
                className={classNames(
                  "flex items-center gap-1 transition-colors text-lg",
                  link.href === currentPath
                    ? "text-stone-800 font-semibold"
                    : "text-gray-600 hover:text-red-600"
                )}
              >
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <Button onPress={handleLogout} color="warning">
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/signup"
                className="border-2 rounded-full px-4 py-2 bg-blue-700"
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="border-2 rounded-full px-4 py-2 bg-green-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white shadow-md rounded-b-lg mt-2"
          >
            <ul className="flex flex-col items-center gap-4 px-4 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "text-lg flex items-center gap-2",
                    link.href === currentPath
                      ? "text-stone-800 font-semibold"
                      : "text-gray-700 hover:text-red-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </Link>
              ))}

              {token ? (
                <Button onPress={handleLogout} color="warning">
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="text-lg border px-4 py-2 rounded-full bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                  <Link
                    href="/login"
                    className="text-lg border px-4 py-2 rounded-full bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;

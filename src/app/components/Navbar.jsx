"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logoBlack from "../../app/assets/fitnation-black-logo.png";
import logo from "../../app/assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/fitnation-events", label: "Fitnation Events" },
  { href: "/news", label: "News" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20"
          : "bg-[#00000050]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20 px-4 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Link href="/" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                <Image
                  src={isScrolled ? logoBlack : logo}
                  alt="fitnation Logo"
                  width={150}
                  height={50}
                  className="w-auto object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10 backdrop-blur-sm"
                    >
                      <span
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "text-purple-600 font-semibold"
                            : isScrolled
                            ? "text-gray-700 group-hover:text-purple-600"
                            : "text-white/90 group-hover:text-white"
                        }`}
                      >
                        {link.label}
                      </span>

                      {/* Hover / Active Indicator */}
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-red-600 transition-all duration-300 ${
                          isActive ? "w-8" : "group-hover:w-8"
                        }`}
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/events"
                className="relative group px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="relative flex items-center gap-2">
                  Register Now
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            } backdrop-blur-sm`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-lg border-t border-white/20 shadow-2xl">
              <div className="max-w-7xl mx-auto px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "text-purple-600 bg-purple-50"
                              : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="font-medium">{link.label}</span>
                          <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 -rotate-90 transition-all duration-300" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <Link
                    href="/fitnation-events"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Register Now
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

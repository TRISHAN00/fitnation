"use client";

import HTMLReactParser from "html-react-parser";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import logo from '/src/app/assets/logo.png';
import bkash from '/src/app/assets/payment/Bkash-Logo.png';
import surjo from '/src/app/assets/payment/shurjopay-logo.png';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/get-req-data/settings-data`;

 

export default function Footer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch footer data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" }); // avoid caching
        const json = await res.json();
        if (json.status === 200) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-slate-900 text-gray-400 text-center py-8">
        <p>Loading footer...</p>
      </footer>
    );
  }

  if (!data) return null;

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Events", href: "/events" },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: data.facebook,
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: FaLinkedin,
      href: data.linkedin,
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
    {
      icon: FaYoutube,
      href: data.youtube,
      label: "YouTube",
      color: "hover:bg-red-600",
    },
    {
      icon: FaInstagram,
      href: data.instagram,
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: FaTwitter,
      href: data.twitter,
      label: "Twitter",
      color: "hover:bg-sky-500",
    },

  ].filter((s) => s.href);

  return (
    <footer className="bg-slate-900 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <Link href="/">
                <Image
                  src={logo}
                  alt={data.site_title || "Fitnation"}
                  width={150}
                  height={50}
                  className="w-auto object-contain"
                />
              </Link>
            </div>

            {/* Description */}
            <div className="text-center lg:text-left">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {HTMLReactParser(data.slogan || "")}
              </p>
            </div>

            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center lg:justify-start">
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-purple-600 ${social.color} p-3 rounded-full transition-all duration-300 hover:scale-110`}
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-500"></div>
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300 py-1"
                >
                  <ChevronRight className="h-4 w-4 text-purple-500 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="ml-2">{link.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Get in Touch
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-500"></div>
            </h3>
            <div className="space-y-4">
              {/* Address */}
              {data.office_location && (
                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors duration-300">
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {data.office_location}
                  </p>
                </div>
              )}

              {/* Email */}
              {data.contact_email && (
                <a
                  href={`mailto:${data.contact_email}`}
                  className="group flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors duration-300"
                >
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {data.contact_email}
                  </p>
                </a>
              )}

              {/* Phone */}
              {data.office_phone && (
                <a
                  href={`tel:${data.office_phone}`}
                  className="group flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors duration-300"
                >
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {data.office_phone}
                  </p>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Payment Methods + Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center bg-white p-2 rounded-lg gap-2">
              <Image
                width={120}
                height={40}
                src={bkash}
                alt="bkash"
              />
              <span className="text-gray-400">|</span>
              <Image
                width={120}
                height={40}
                src={surjo}
                alt="surjo"
              />
            </div>

           
          </div>
        </div>
      </div>
    </footer>
  );
}

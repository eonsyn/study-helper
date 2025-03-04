"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full bg-red-200/50 backdrop-blur-md text-red-900 py-4 px-6 shadow-md fixed top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-800">
          Image to Solution
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link href="#feature" className="hover:text-red-600 transition">
              Features
            </Link>
          </li>
          <li>
            <Link href="#faq" className="hover:text-red-600 transition">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-red-600 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-red-800 focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col bg-red-300 text-red-900 text-lg py-4 px-6 absolute top-16 left-0 w-full shadow-md">
          <li className="py-2">
            <Link
              href="#feature"
              className="hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="#faq"
              className="hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              FAQs
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/pricing"
              className="hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/contact"
              className="hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

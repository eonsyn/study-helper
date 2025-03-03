import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 text-black py-10 border-t-1 border-gradient">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-red-400 pb-6">
          <h2 className="text-3xl font-bold text-red-800">Image to Solution</h2>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left py-8">
          <FooterColumn
            title="Quick Links"
            links={["Features", "FAQs", "Pricing"]}
          />
          <FooterColumn
            title="Resources"
            links={["Blog", "Documentation", "Support"]}
          />
          <FooterColumn
            title="Company"
            links={["About Us", "Contact", "Privacy Policy"]}
          />
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm mt-6 text-red-700">
          © {new Date().getFullYear()} Image to Solution. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-red-700">{title}</h3>
      <ul className="mt-2 space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="hover:text-red-600 transition duration-300">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;

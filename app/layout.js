import "./globals.css";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
// import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
export const metadata = {
  title: "Image to Solution | AI-Powered Document & Image Analysis",
  description:
    "Convert images to text, analyze documents, and get instant AI-powered answers. Perfect for research, study, and productivity. Try it now!",
  keywords:
    "AI document analysis, image to answer,image to text, OCR, AI-powered search, document processing, instant results, AI research tool",
  author: "Your Website Name",
  robots: "index, follow",
  other: {
    "google-site-verification": "l447jfQ4xxcrmN2Q_Cq8q3aeuLvLAJo6cVNv35IA96Y",
  },
  openGraph: {
    title: "Image to Solution | AI-Powered Document & Image Analysis",
    description:
      "Transform images into text and analyze documents with AI. Get instant answers for research and productivity.",
    url: "https://yourwebsite.com",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image to Solution - AI Document Analysis",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@yourTwitterHandle",
  //   title: "Image to Solution | AI-Powered Document & Image Analysis",
  //   description:
  //     "Convert images to text and analyze documents instantly with AI. Get quick, accurate results for research and productivity.",
  //   // image: "https://yourwebsite.com/og-image.jpg",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html theme="dark" lang="en">
      <body className="bg-slate-600 font-serif ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import React from "react";
import Link from "next/link";
const faqData = [
  {
    question: "How does the image and text analysis work?",
    answer:
      "Our AI uses advanced computer vision and natural language processing (NLP) to analyze both images and text. It can recognize objects, extract text, and provide detailed insights with high accuracy.",
  },
  {
    question: "What types of images can I analyze?",
    answer:
      "You can analyze photos, screenshots, documents, charts, and diagrams. We support JPG, PNG, and WebP formats with a maximum file size of 5MB.",
  },
  {
    question: "How accurate are the results?",
    answer:
      "Our AI model is trained on millions of images and provides highly accurate results. However, accuracy may vary depending on image clarity and complexity.",
  },

  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We prioritize your privacy and security. All images are processed securely and automatically deleted after 24 hours.",
  },
  {
    question: "What are the image requirements?",
    answer:
      "For best results, use clear, well-lit images under 5MB. We support resolutions up to 2048×2048 pixels in JPG, PNG, or WebP format.",
  },
];

const FAQ = () => {
  return (
    <section className=" p-6">
      <div className="text text-center">
        <Link href="#ai-chat">
          <span className="text-gray-700 p-2 bg-red-200 rounded-full">
            Ask a Question?
          </span>
        </Link>
      </div>
      <h1 className="text-center py-6 text-6xl font-bold pt-6  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h1>
      <p className="w-full pb-10 tracking-wide mt-2 text-xl text-center">
        Everything you need to know about our Upload Image And Get Answer Ai
        Free
      </p>

      <div className="space-y-6 mt-6">
        {faqData.map((faq, index) => (
          <details
            key={index}
            className="bg-white hover:shadow-xl transition-all ease-in p-4 rounded-lg shadow-md"
          >
            <summary className="cursor-pointer text-lg font-semibold">
              {faq.question}
            </summary>
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </details>
        ))}
      </div>
      <div className="text-center text-red-500 text-lg"></div>
    </section>
  );
};

export default FAQ;

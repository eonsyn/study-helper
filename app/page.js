import FAQ from "@/component/FAQ";
import FeatureCards from "@/component/FeatureCards";
import UserInteraction from "@/component/UserInteraction";
import Link from "next/link";
import { FaChevronDown, FaRegImage } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { RiRobot2Fill } from "react-icons/ri";
export default function Home() {
  return (
    <div className="min-h-screen  bg-white text-softMint w-screen  md:pt-16 font-serif text-black  ">
      <div className="Herosection h-screen w-screen flex flex-col justify-center md:items-center  -mt-10 ">
        {/* AI Icon Section */}
        <div className="iconofAi flex items-center justify-center w-full py-4">
          <div className="bg-red-300 rounded-3xl flex items-center px-4 py-1 gap-2 text-sm sm:text-lg  ">
            <RiRobot2Fill /> AI-Powered Document Analysis{" "}
            <Link href="http://192.168.56.1:3000">click me</Link>
          </div>
        </div>

        {/* Heading & Description */}
        <div className="textcenter w-full flex items-center justify-center   md:text-center">
          <div className=" max-w-[90%] md:max-w-[70%]">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[3rem] sm:leading-[4rem] md:leading-[5rem] tracking-tight font-extrabold">
              Ask AI Anything – Type or Upload & Get
              <span className="text-red-500"> Answers</span>
            </h1>

            <p className="text-lg sm:text-xl pt-2 leading-6 text-gray-800">
              Use AI to instantly analyze documents and images. Get accurate
              answers to any questions about your scanned content. Perfect for
              research and study.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center pt-4 gap-3">
          <div className="bg-red-100 rounded-3xl flex items-center px-4 py-2 gap-2 text-sm sm:text-lg">
            <FaRegImage /> Image to Text
          </div>
          <div className="bg-red-100 rounded-3xl flex items-center px-4 py-2 gap-2 text-sm sm:text-lg">
            <ImPower /> Instant Results
          </div>
        </div>

        {/* Scroll Down Button */}
        <div className="flex items-center justify-center pt-4">
          <Link href="#ai-chat" passHref>
            <div className="group flex items-center justify-center p-4 bg-red-400 rounded-full transition-all duration-300 hover:scale-110">
              <FaChevronDown className="transition-all duration-300 group-hover:scale-125" />
            </div>
          </Link>
        </div>
      </div>

      <hr />
      <section id="ai-chat" className=" pt-16">
        <UserInteraction />
      </section>
      <section id="feature" className="min-h-screen  w-full">
        <h1 className="text-center text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Powerful Features
        </h1>

        <p className="w-full text-center">
          Transform your photos with state-of-the-art AI technology
        </p>
        <div className="cardiv pt-14 px-6">
          <FeatureCards />
        </div>
      </section>
      <section id="faq" className="min-h-screen pt-14">
        <FAQ></FAQ>
      </section>
    </div>
  );
}
// https://photor.io/upload-image-and-get-answer-ai-free

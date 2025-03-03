import { MdSmartScreen } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { BiCrop } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const features = [
  {
    title: "Smart Image & Text Analysis",
    description:
      "Utilize advanced OCR technology to analyze both images and text with high precision, ensuring accurate results for any query.",
    icon: MdSmartScreen,
  },
  {
    title: "Instant AI Responses",
    description:
      "Get immediate and detailed answers by analyzing text within images or extracted content using our AI-powered system.",
    icon: AiOutlineThunderbolt,
  },
  {
    title: "Multi-Purpose Analysis",
    description:
      "Perform text extraction, object detection, and more with our versatile AI, handling various types of image-based tasks effortlessly.",
    icon: FiLayers,
  },
  {
    title: "Smart Cropping & Detection",
    description:
      "Crop images to focus on specific areas, and let AI detect and analyze key details for accurate insights.",
    icon: BiCrop,
  },
  {
    title: "Research & Learning Assistant",
    description:
      "Perfect for academic and research work, offering intelligent text recognition and image understanding.",
    icon: FaBookReader,
  },
  {
    title: "High Accuracy & Reliability",
    description:
      "Powered by state-of-the-art AI models, ensuring precise, reliable, and efficient image and text analysis.",
    icon: RiVerifiedBadgeFill,
  },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative p-6   rounded-3xl transition-all ease-in  shadow-md hover:shadow-2xl flex items-center overflow-hidden bg-white text-center"
        >
          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 rounded-t-3xl"></div>

          <div className="icon h-full flex items-start justify-items-start w-[20%]">
            {" "}
            <feature.icon className="text-4xl text-blue-600 mb-4" />
          </div>
          <div className="featureInfo h-full w-[70%]">
            <h3 className="text-lg text-start font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-6 tracking-wide text-start">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;

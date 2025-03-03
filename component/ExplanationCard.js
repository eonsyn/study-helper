const dummyData = {
  explanation: [
    "This is a general explanation. **Important concepts** are highlighted here.",
    "Another point to consider is the **relationship between variables**.",
    "Remember that **data validation** is crucial for accurate results.",
    "The final step involves **optimization algorithms** to improve performance.",
  ],
  keyPoints: [
    "Understanding the core principles.",
    "Analyzing the data thoroughly.",
    "Implementing efficient algorithms.",
    "Testing and validating the results.",
    "Documenting the process for future reference.",
  ],
};
import Link from "next/link";
// { data,loading }
export default function ExplanationCard({ data, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:w-[80%] text-gray-800 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>

        {/* Explanation Section Skeleton */}
        <div className="space-y-3 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        </div>

        {/* Key Points Title Skeleton */}
        <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>

        {/* Key Points Skeleton */}
        <ul className="space-y-2">
          <li className="h-4 w-3/4 bg-gray-300 rounded"></li>
          <li className="h-4 w-2/3 bg-gray-300 rounded"></li>
          <li className="h-4 w-5/6 bg-gray-300 rounded"></li>
        </ul>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mt-6 px-3 py-1  rounded-full bg-red-100">
        Drop the image to know the answer ..
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full md:w-[80%] text-gray-800">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 text-blue-600">Explanation</h2>

      {/* Explanation Section */}
      <div className="text-start space-y-2 mb-4">
        {data.explanation.map((e, index) => (
          <p key={index}>
            {e.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-blue-900">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        ))}
      </div>

      {/* Key Points Section */}
      <h3 className="text-lg font-semibold text-blue-600">Key Points:</h3>
      <ul className="list-disc text-start list-inside mt-2">
        {data.keyPoints.map((point, index) => (
          <li key={index} className="mb-1 text-green-600">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

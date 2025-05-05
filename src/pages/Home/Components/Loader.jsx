import { useState, useEffect } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds of loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Main spinning ring */}
        <div className="absolute w-20 h-20 border-4 border-amber-600 border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite]"></div>
        {/* Secondary spinning ring (counter-rotation) */}
        <div className="absolute w-24 h-24 border-4 border-blue-500 border-b-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
        {/* Pulsing center dot */}
        <div className="w-8 h-8 bg-amber-600 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
        {/* Orbiting particles */}
        <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-[orbit_3s_linear_infinite]"></div>
        <div className="absolute w-4 h-4 bg-amber-600 rounded-full animate-[orbit_3s_linear_infinite_0.5s]"></div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;

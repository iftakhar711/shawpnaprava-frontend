import React from "react";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg";
import img5 from "../../../assets/img5.jpg";
import img6 from "../../../assets/img6.jpg";
import img7 from "../../../assets/img7.jpg";
import img8 from "../../../assets/img12.jpg";
import img9 from "../../../assets/img9.jpg";

import {
  Bs1Circle,
  Bs2Circle,
  Bs3Circle,
  Bs4Circle,
  Bs5Circle,
  Bs6Circle,
} from "react-icons/bs";

const testimonials = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const works = [
  {
    icon: <Bs1Circle size={25} className=" text-green-700" />,
    text: "Organized 6 free medical camps providing healthcare services to around 2500 people, including free prescriptions, blood group diagnosis, blood pressure checks, diabetes tests, and medicines.",
  },
  {
    icon: <Bs2Circle size={25} className=" text-green-700" />,
    text: "Providing medical care and medicine to indigent patients from the foundation's own funds.",
  },
  {
    icon: <Bs3Circle size={25} className=" text-green-700" />,
    text: "Assisting poor and meritorious students to continue their studies.",
  },
  {
    icon: <Bs4Circle size={25} className=" text-green-700" />,
    text: "Supporting the marriage of girls from disadvantaged families.",
  },
  {
    icon: <Bs5Circle size={25} className=" text-green-700" />,
    text: "Distributing Ramadan Iftar materials and Eid gifts to rickshaw puller brothers.",
  },
  {
    icon: <Bs6Circle size={25} className=" text-green-700" />,
    text: "Providing relief materials, educational supplies, and clothing during the 2024 flood season.",
  },
];

const ActionSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 ">
      <div className="px-8 py-6  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0">
        <div className="flex flex-col items-center  pb-2 lg:pb-8 mx-auto relative">
          {/* Animated Heading */}
          <h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F89D9] to-[#020668] 
               font-extrabold text-center relative z-10 
               lg:text-5xl md:text-4xl text-3xl"
          >
            Our Achievements
          </h2>

          {/* Large Transparent Background Text */}
          <h2
            className="absolute text-gray-400 lg:font-bold md:font-bold font-extrabold opacity-40 
                 text-4xl md:text-5xl lg:text-7xl z-0"
          >
            Our Achievements
          </h2>
          <p className=" text-[#050960] mt-3 md:mt-4 lg:mt-8 font-bold text-[10px]  md:text-[13px] lg:text-xl  inline leading-snug">
            Every act of kindness creates a ripple effect of positive change.
          </p>
        </div>

        {/* Images on the left and text on the right */}

        <div className="flex flex-col lg:flex-row gap-8 h-full mt-6 ">
          {/* Images on the left */}
          <div className="lg:w-1/2 grid grid-cols-3 gap-2 h-full ">
            {testimonials.map((imgSrc, index) => (
              <div
                key={index}
                className="animate-float h-full"
                style={{
                  animationDelay: `${index * 0.5}s`, // Staggered delay for each image
                }}
              >
                <img
                  src={imgSrc}
                  alt={`Testimonial ${index + 1}`}
                  className="w-36 h-30 object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>

          {/* Text on the right with icons and animations */}
          <div className="lg:w-1/2 space-y-5 h-full">
            {works.map((work, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 animate-slideIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0">{work.icon}</div>
                <p className="text-gray-700 font-mono text-md font-bold">
                  {work.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(-5px, -5px);
            }
            50% {
              transform: translate(5px, 5px);
            }
            75% {
              transform: translate(-5px, 5px);
            }
          }

          @keyframes slideIn {
            from {
              transform: translateX(20px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-slideIn {
            animation: slideIn 0.5s ease-in-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ActionSection;

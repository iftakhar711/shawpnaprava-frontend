"use client";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import nature1 from "../../../assets/img15.png"; // Import first image
import nature2 from "../../../assets/img16.jpg"; // Import second image
import nature3 from "../../../assets/img17.jpg"; // Import third image

const Ouraim = () => {
  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "12px 12px 0 #ff69b4",
      transition: { duration: 0.3 },
    },
  };

  // const headerVariants = {
  //   hidden: { opacity: 0, y: -50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
  // };

  // const textVariants = {
  //   hidden: { opacity: 0, x: -50 },
  //   visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5 } },
  // };

  const aims = [
    {
      title: "Our Aim",
      points: [
        "Establish maternal and child healthcare centers.",
        "Provide medical care during pregnancy and childbirth.",
        "Reduce maternal and newborn mortality rates.",
        "Promote better health for mothers and children.",
      ],
      image: nature1, // Assign first image
    },
    {
      title: "Our Purpose",
      points: [
        "Reduce childbirth-related deaths.",
        "Lower unnecessary C-section rates.",
        "Ensure healthcare for newborns up to 2 years.",
        "Encourage healthy lifestyles to prevent drug dependency.",
      ],
      image: nature2, // Assign second image
    },
    {
      title: "Our Activities",
      points: [
        "Provide free healthcare to underprivileged patients.",
        "Support students in completing their education.",
        "Work towards overall societal welfare.",
      ],
      image: nature3, // Assign third image
    },
  ];

  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-6 px-4">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0">
        {/* Styled "OUR MISSION" Text with New Animation */}
        <div className="flex flex-col items-center  pb-2 lg:pb-8 mx-auto relative">
          {/* Animated Heading */}
          <h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F89D9] to-[#020668] 
               font-extrabold text-center relative z-10 
               lg:text-5xl md:text-4xl text-3xl"
          >
            Our Mission & Vision
          </h2>

          {/* Large Transparent Background Text */}
          <h2
            className="absolute text-gray-400 lg:font-bold md:font-bold font-extrabold opacity-40 
                 text-4xl md:text-5xl lg:text-7xl z-0"
          >
            Our Mission & Vision
          </h2>
          <p className=" text-[#050960] mt-3 md:mt-4 lg:mt-8 font-bold text-[10px]  md:text-[13px] lg:text-xl  inline leading-snug">
            We are dedicated to improving the health and well-being of mothers
            and children.
          </p>
        </div>

        {/* Card Grid with Different Images and Full Opacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
          {aims.map((aim, index) => (
            <motion.div
              key={index}
              className="group p-8 bg-white border-4 border-pink-500 rounded-lg shadow-[8px_8px_0_#ff69b4] transition-all duration-300 relative overflow-hidden"
              whileHover="hover"
              variants={cardVariants}
            >
              {/* Background Image with Full Opacity */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url(${aim.image})`, // Use the assigned image
                }}
              ></div>

              {/* Overlay to Make Text More Visible */}
              <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 relative inline-block">
                  {aim.title}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-pink-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </h3>

                <div className="space-y-3">
                  {aim.points.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-lg font-mono text-white leading-tight"
                    >
                      <FiCheckCircle className="text-white text-xl" />{" "}
                      {/* Standardized icon size */}
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ouraim;

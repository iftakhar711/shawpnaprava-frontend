import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import nature2 from "../../../assets/img1.jpg";
import nature3 from "../../../assets/img16.png";
import nature4 from "../../../assets/img18.jpg";
import nature5 from "../../../assets/img19.jpg";

const Hero = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      image: nature5,
      textKey: "hero.title",
      subtextKey: "hero.subtitle",
      color: "from-blue-900/60",
      overlay: "bg-blue-900/30",
    },
    {
      id: 2,
      image: nature2,
      textKey: "hero.slide2.title",
      subtextKey: "hero.slide2.subtitle",
      color: "from-purple-900/60",
      overlay: "bg-purple-900/30",
    },
    {
      id: 3,
      image: nature3,
      textKey: "hero.slide3.title",
      subtextKey: "hero.slide3.subtitle",
      color: "from-green-900/60",
      overlay: "bg-green-900/30",
    },
    {
      id: 4,
      image: nature4,
      textKey: "hero.slide4.title",
      subtextKey: "hero.slide4.subtitle",
      color: "from-green-900/60",
      overlay: "bg-green-900/30",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setDirection(1);
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 1.2,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.5,
      },
    },
  };

  const subtextVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  const gradientVariants = {
    hidden: {
      backgroundPosition: "0% 50%",
    },
    visible: {
      backgroundPosition: "100% 50%",
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div
      className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[650px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence custom={direction} initial={false}>
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 10,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className={`absolute inset-0 ${slide.overlay}`}
                  variants={overlayVariants}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"
                  variants={overlayVariants}
                />

                <motion.div
                  className="absolute inset-0"
                  variants={gradientVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)",
                    backgroundSize: "300% 300%",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-8 sm:py-12 backdrop-blur-sm rounded-xl">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={textContainerVariants}
                      className="mb-4 sm:mb-6"
                    >
                      <h1
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-6 leading-snug sm:leading-tight bangla-text"
                        lang="bn"
                        style={{
                          fontFamily:
                            "'Noto Sans Bengali', 'Kalpurush', sans-serif",
                        }}
                      >
                        {t(slide.textKey)
                          .split("")
                          .map((char, i) => (
                            <motion.span
                              key={i}
                              className="inline-block"
                              variants={letterVariants}
                              custom={i}
                            >
                              {char === " " ? "\u00A0" : char}
                            </motion.span>
                          ))}
                      </h1>
                    </motion.div>

                    <motion.div
                      className="relative inline-block mb-4 sm:mb-8"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{
                        delay: 0.6,
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                      <div className="absolute inset-0 bg-white/30 blur-sm" />
                    </motion.div>

                    <motion.p
                      className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white/90 max-w-2xl mx-auto tracking-wide bangla-text"
                      variants={subtextVariants}
                      initial="hidden"
                      animate="visible"
                      lang="bn"
                      style={{
                        fontFamily:
                          "'Noto Sans Bengali', 'Kalpurush', sans-serif",
                      }}
                    >
                      {t(slide.subtextKey)}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;

// src/components/Hero.js or similar
// import { useTranslation } from "react-i18next";

// export default function Hero() {
//   const { t } = useTranslation();

//   return (
//     <div className="bengali-text" lang="bn">
//       <h1>{t("hero.title")}</h1>
//       <p>{t("hero.subtitle")}</p>

//       {/* For slides */}
//       {[1, 2, 3, 4].map((slide) => (
//         <div key={slide} className="bengali-text" lang="bn">
//           <h2>{t(`hero.slide${slide}.title`)}</h2>
//           <p>{t(`hero.slide${slide}.subtitle`)}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

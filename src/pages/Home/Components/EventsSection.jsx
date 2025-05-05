import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import nature1 from "../../../assets/img15.png";
import nature2 from "../../../assets/img16.jpg";

const slides = [
  {
    title: "Venice: The Floating City",
    image: nature1,
    description:
      "Experience the romantic canals and historic architecture of Venice in this exclusive tour.",
    tags: ["Travel", "Culture", "Italy"],
    date: "March 25, 2025",
    cta: "Join Tour",
  },
  {
    title: "Secluded Beach Getaway",
    image: nature1,
    description:
      "Discover secluded beaches with crystal-clear waters and breathtaking views. Perfect for a peaceful getaway.",
    tags: ["Beach", "Relaxation", "Nature"],
    date: "April 10, 2025",
    cta: "Book Now",
  },
  {
    title: "Interactive Art Museums",
    image: nature2,
    description:
      "Immerse yourself in cutting-edge interactive art installations from around the world.",
    tags: ["Art", "Technology", "Exhibition"],
    date: "May 5, 2025",
    cta: "Get Tickets",
  },
  {
    title: "Mountain Hiking Adventure",
    image: nature1,
    description:
      "Challenge yourself with breathtaking alpine trails and stunning summit views.",
    tags: ["Adventure", "Hiking", "Nature"],
    date: "June 15, 2025",
    cta: "Register",
  },
  {
    title: "Culinary Masterclass",
    image: nature2,
    description:
      "Learn from Michelin-star chefs in this exclusive hands-on cooking experience.",
    tags: ["Food", "Cooking", "Workshop"],
    date: "July 8, 2025",
    cta: "Reserve Spot",
  },
];

// const textVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// };

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.5,
    },
  },
};

export default function EventsSection() {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-6 px-4 overflow-hidden">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-0">
        {/* Styled "OUR MISSION" Text with New Animation */}
        <div className="flex flex-col items-center  pb-2 lg:pb-8 mx-auto relative">
          {/* Animated Heading */}
          <h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F89D9] to-[#020668] 
               font-extrabold text-center relative z-10 
               lg:text-5xl md:text-4xl text-3xl"
          >
            Upcoming Events
          </h2>

          {/* Large Transparent Background Text */}
          <h2
            className="absolute text-gray-400 lg:font-bold md:font-bold font-extrabold opacity-40 
                 text-4xl md:text-5xl lg:text-7xl z-0"
          >
            Upcoming Events
          </h2>
          <p className=" text-[#050960] mt-3 md:mt-4 lg:mt-8 font-bold text-[10px]  md:text-[13px] lg:text-xl  inline leading-snug">
            We are dedicated to improving the health and well-being of mothers
            and children.
          </p>
        </div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <Swiper
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className} bg-gradient-to-r from-[#2F89D9] to-[#020668]"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3 },
            }}
            className="w-full relative"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <motion.div
                    className={`relative rounded-2xl overflow-hidden mt-6 transition-all duration-500 ${
                      isActive ? "scale-100" : "scale-90"
                    }`}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative h-[450px] group">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />

                      <div className="absolute top-4 left-4">
                        <motion.span
                          className="bg-gradient-to-r from-[#2F89D9] to-[#020668] text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {slide.date}
                        </motion.span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mb-4 flex flex-wrap gap-2"
                        >
                          {slide.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>

                        <motion.h3
                          className="text-xl md:text-2xl font-bold mb-2"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {slide.title}
                        </motion.h3>

                        <motion.p
                          className="text-sm md:text-base mb-4"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {slide.description}
                        </motion.p>

                        <motion.button
                          className="bg-gradient-to-r from-[#2F89D9] to-[#020668] text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {slide.cta}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center mt-8 gap-4">
            <div className="swiper-button-prev bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
              <svg
                className="w-6 h-6 text-[#020668]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>

            <div className="swiper-pagination flex gap-2"></div>

            <div className="swiper-button-next bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
              <svg
                className="w-6 h-6 text-[#020668]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const BlogCard = ({ title, date, description, imageUrl, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const titleWords = title.split(" ");

  return (
    <motion.article
      className="relative flex flex-col bg-white/90 backdrop-blur-sm transition-all duration-500 hover:shadow-xl h-auto w-full mb-8 overflow-hidden rounded-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image - top of card */}
      <div className="h-48 w-full overflow-hidden group relative">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "100%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        <img
          alt={title}
          src={imageUrl}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Date - vertical layout */}
      <div className="absolute top-4 left-4 p-2 [writing-mode:vertical-lr] rotate-180 bg-white/90 rounded z-10 shadow-sm">
        <time
          dateTime={date}
          className="flex items-center justify-between gap-4 text-xs font-bold text-purple-900 uppercase"
        >
          <span className="hover:text-pink-500 transition-colors">
            {date.split("-")[0]}
          </span>
          <span className="w-px flex-1 bg-purple-900/20"></span>
          <span className="hover:text-pink-500 transition-colors">
            {new Date(date).toLocaleString("default", { month: "short" })}{" "}
            {date.split("-")[2]}
          </span>
        </time>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title with word-by-word animation */}
        <a href="#" className="group">
          <h3 className="font-bold text-purple-900 uppercase mb-4  overflow-hidden">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.05,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </h3>
        </a>

        {/* Description */}
        <div className="text-sm text-purple-800 mb-6">
          {description.slice(0, 2).map((line, i) => (
            <p key={i} className="mb-2 line-clamp-2">
              {line}
            </p>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <motion.a
            href="#"
            className="inline-block bg-gradient-to-r from-pink-400 to-purple-500 px-5 py-3 text-xs font-bold text-white uppercase rounded hover:opacity-90 transition-opacity relative overflow-hidden"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Read Blog</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

const Blogpage = () => {
  const headingRef = useRef(null);
  const controls = useAnimation();
  const [visibleCards, setVisibleCards] = useState(4); // Changed to show 4 cards initially
  const [isLoading, setIsLoading] = useState(false);

  // Animation for the heading letters
  useEffect(() => {
    const animateHeading = async () => {
      await controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,
          type: "spring",
          stiffness: 100,
          damping: 10,
        },
      }));
    };

    animateHeading();
  }, [controls]);

  const blogData = [
    {
      title: "Finding the right guitar for your style - 5 tips",
      date: "2022-10-10",
      description: [
        "Choosing the perfect guitar can be a daunting task with so many options available.",
        "This guide will help you navigate through the different types and find your perfect match.",
        "From acoustic to electric, we cover all the essentials for beginners and pros alike.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      title: "Mastering chord transitions - smooth playing techniques",
      date: "2022-09-15",
      description: [
        "Struggling with moving between chords smoothly? You're not alone.",
        "Learn the secret techniques that professional guitarists use to make transitions seamless.",
        "Practice routines that will have you playing like a pro in no time.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      title: "The history of rock - iconic guitars through the decades",
      date: "2022-08-22",
      description: [
        "From the 1950s to today, guitars have shaped the sound of rock music.",
        "Explore the legendary instruments that defined generations of musicians.",
        "See how technology and player preferences evolved over time.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      title: "Home recording setup - getting studio quality on a budget",
      date: "2022-07-05",
      description: [
        "You don't need expensive equipment to record great guitar tracks at home.",
        "We'll show you how to maximize your sound with affordable gear.",
        "Tips on room treatment, microphone placement, and software choices.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      title: "Fingerstyle vs pick - when to use each technique",
      date: "2022-06-18",
      description: [
        "Both fingerstyle and pick playing have their place in a guitarist's toolkit.",
        "Learn which technique works best for different musical styles and situations.",
        "Exercises to improve your skills with both approaches.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      title: "Guitar maintenance 101 - keep your instrument in top shape",
      date: "2022-05-30",
      description: [
        "Regular maintenance can extend your guitar's life and improve its playability.",
        "Step-by-step guide to cleaning, string changing, and basic adjustments.",
        "When to DIY and when to take it to a professional.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1550985616-1081020a975c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
  ];

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCards((prev) => Math.min(prev + 4, blogData.length));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 pb-12">
      <div className="px-4 py-12 mx-auto max-w-7xl">
        {/* Animated Heading Section */}
        <div className="flex justify-center overflow-hidden pt-16 pb-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Decorative background element */}
            <motion.div
              className="absolute inset-0 bg-white/50 rounded-xl -z-10"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />

            {/* Main heading with letters */}
            <motion.h1
              ref={headingRef}
              className="text-2xl md:text-4xl font-bold text-center py-4 px-8 relative text-[#1F2937]"
            >
              {"Latest from the Blog".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  animate={controls}
                  initial={{ opacity: 0, y: 20 }}
                  className="inline-block"
                  style={{ display: "inline-block" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              />
            </motion.h1>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-pink-400"
              animate={{
                y: [0, -5, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-purple-400"
              animate={{
                y: [0, 5, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>

        {/* Blog Cards Grid - Now showing 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {blogData.slice(0, visibleCards).map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                date={blog.date}
                description={blog.description}
                imageUrl={blog.imageUrl}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleCards < blogData.length && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-white/90 hover:bg-white px-8 py-3 font-bold text-purple-800 rounded-full shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? "Loading..." : "Load More"}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogpage;

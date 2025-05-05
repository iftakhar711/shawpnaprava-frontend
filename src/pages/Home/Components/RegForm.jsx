import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export const RegForm = () => {
  const navigate = useNavigate();

  const handleRegistrationClick = (e) => {
    e.preventDefault();
    // Show loading state immediately
    e.target.classList.add("active");

    // Navigate after 1 second
    setTimeout(() => {
      navigate("/regForm");
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-100 pt-10 pb-6 ">
      <div className="flex flex-col justify-center items-center">
        <FlipLink href="#">Become a Volunteer</FlipLink>
        <h1 className="mt-3 font-mono font-bold text-sm md:text-md  lg:text-xl text-center px-4 ">
          Become a volunteer if you are motivated & ready to support people and
          the community
        </h1>

        {/* Registration Button with 1-second delay */}
        <Link
          to="/regForm"
          onClick={handleRegistrationClick}
          className="relative bottom-0 flex justify-center mt-10 mb-4 items-center gap-2 border border-[#000] rounded-xl text-[#FFF] font-black bg-[#000] uppercase px-8 py-4 z-10 overflow-hidden ease-in-out duration-700 group hover:text-[#000] hover:bg-[#FFF] active:scale-95 focus:bg-[#FFF] focus:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150"
        >
          <span className="truncate ease-in-out duration-300 group-active:-translate-x-96 group-focus:translate-x-96">
            Registration Here
          </span>
          <div className="absolute flex flex-row justify-center items-center gap-2 -translate-x-96 ease-in-out duration-300 group-active:translate-x-0 group-focus:translate-x-0">
            <div className="animate-spin size-4 border-2 border-[#000] border-t-transparent rounded-full"></div>
            Processing...
          </div>
          <svg
            className="fill-[#FFF] group-hover:fill-[#000] group-hover:-translate-x-0 group-active:translate-x-96 group-focus:translate-x-96 group-focus:fill-[#000] ease-in-out duration-700"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;
const DELAY_BETWEEN_ANIMATIONS = 2; // seconds

const FlipLink = ({ children, href }) => {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start("hovered");
        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_BETWEEN_ANIMATIONS * 1000)
        );
        await controls.start("initial");
        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_BETWEEN_ANIMATIONS * 1000)
        );
      }
    };

    animate();

    return () => {
      // Cleanup if needed
    };
  }, [controls]);

  return (
    <motion.a
      initial="initial"
      animate={controls}
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase md:text-5xl lg:text-7xl"
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {children.split("").map((letter, index) => (
          <motion.span
            key={`top-${index}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * index,
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((letter, index) => (
          <motion.span
            key={`bottom-${index}`}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * index,
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default RegForm;

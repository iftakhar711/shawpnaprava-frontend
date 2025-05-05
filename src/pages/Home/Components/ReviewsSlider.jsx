import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    quote:
      "The support we received from this charity was life-changing. Their volunteers went above and beyond to help our community during difficult times.",
    highlight: "life-changing",
  },
  {
    id: 2,
    name: "Michael Chen",
    quote:
      "I've never seen an organization so dedicated to making a real difference. Every dollar donated goes directly to those who need it most.",
    highlight: "real difference",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    quote:
      "As a long-time donor, I've watched this charity grow and impact thousands of lives. Their transparency and commitment are unmatched.",
    highlight: "impact thousands of lives",
  },
  {
    id: 4,
    name: "David Kim",
    quote:
      "The educational programs they provide have transformed our local schools. Children now have opportunities we never dreamed possible.",
    highlight: "transformed our local schools",
  },
  {
    id: 5,
    name: "Olivia Smith",
    quote:
      "During the crisis, they were the first to respond and the last to leave. Our community will forever be grateful for their compassion.",
    highlight: "first to respond",
  },
  {
    id: 6,
    name: "James Wilson",
    quote:
      "Their sustainable approach to charity work creates lasting change rather than temporary solutions. This is how philanthropy should work.",
    highlight: "lasting change",
  },
];

const ReviewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= testimonials.length - slidesToShow ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, isAutoPlaying, slidesToShow]);

  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 overflow-hidden mx-auto py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pb-2 lg:pb-8 mx-auto relative">
          {/* Animated Heading */}
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F89D9] to-[#020668] font-extrabold text-center relative z-10 text-3xl sm:text-4xl lg:text-5xl">
            Stories of Hope
          </h2>

          {/* Large Transparent Background Text */}
          <h2 className="absolute text-gray-400 font-extrabold opacity-40 text-4xl sm:text-5xl lg:text-7xl z-0 hidden sm:block">
            Stories of Hope
          </h2>
          <p className="text-[#050960] mt-3 md:mt-4 lg:mt-8 font-bold text-sm sm:text-base lg:text-xl text-center max-w-2xl mx-auto">
            Hear how our work is transforming lives and communities every day.
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          ref={sliderRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out mt-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2 sm:px-4"
              >
                <div className="h-full p-6 sm:p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                  <blockquote className="mb-4 sm:mb-6 relative">
                    <svg
                      className="absolute -top-2 -left-2 text-blue-100 w-6 h-6 sm:w-8 sm:h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 text-base sm:text-lg pl-6">
                      {testimonial.quote
                        .split(testimonial.highlight)
                        .map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i <
                              testimonial.quote.split(testimonial.highlight)
                                .length -
                                1 && (
                              <span className="font-semibold text-blue-600">
                                {testimonial.highlight}
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                    </p>
                  </blockquote>
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                    <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                      {testimonial.name}
                    </h3>
                    {/* <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Impact achieved
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-6 sm:mt-8">
          {Array.from({ length: testimonials.length - slidesToShow + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-4 sm:w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider;

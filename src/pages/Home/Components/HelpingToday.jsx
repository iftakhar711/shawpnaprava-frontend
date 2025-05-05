import { useEffect, useRef } from "react";

const HelpingToday = () => {
  const counterRef = useRef(null);
  const sectionRef = useRef(null);
  const globeRef = useRef(null);
  const hasAnimated = useRef(false);

  // Floating animation for globe elements
  const floatElements = () => {
    const elements = document.querySelectorAll(".float-element");
    elements.forEach((el) => {
      const duration = 8 + Math.random() * 4;
      const delay = Math.random() * 5;
      const yDistance = 10 + Math.random() * 20;

      el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      el.style.setProperty("--y-distance", `${yDistance}px`);
    });
  };

  // Counter animation
  const animateCounter = () => {
    const target = 86700;
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);

    let current = start;
    const counterElement = document.getElementById("campaign-counter");

    const animate = () => {
      current += increment;
      if (current < target) {
        counterElement.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(animate);
      } else {
        counterElement.textContent = target.toLocaleString();
      }
    };

    animate();
  };

  // Checkmark animation
  const animateCheckmarks = () => {
    const checkmarks = document.querySelectorAll(".checkmark-animate");
    checkmarks.forEach((check, index) => {
      check.style.animation = `checkmarkWiggle 2s ease-in-out ${
        index * 0.3
      }s infinite`;
    });
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounter();
            floatElements();
            animateCheckmarks();

            // Animate cards
            const cards = document.querySelectorAll(".animate-card");
            cards.forEach((card, index) => {
              card.style.animation = `cardEntrance 0.6s ease-out ${
                index * 0.2
              }s forwards`;
              card.style.opacity = "0";
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionElement);

    return () => {
      observer.unobserve(sectionElement);
    };
  }, []);

  // Globe animation
  useEffect(() => {
    let angle = 0;
    const globe = globeRef.current;
    let animationFrameId;

    const rotateGlobe = () => {
      if (globe) {
        angle = (angle + 0.2) % 360;
        globe.style.transform = `rotate(${angle}deg)`;
        animationFrameId = requestAnimationFrame(rotateGlobe);
      }
    };

    rotateGlobe();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-r from-pink-100 to-purple-100"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 30%),
          linear-gradient(to bottom, rgba(251, 207, 232, 0.2), rgba(216, 180, 254, 0.3))
        `,
      }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full float-element bg-pink-400/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              "--y-distance": "15px",
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-grid-pink-400/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center  pb-2 lg:pb-8 mx-auto relative">
          {/* Animated Heading */}
          <h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F89D9] to-[#020668] 
               font-extrabold text-center relative z-10 
               lg:text-5xl md:text-4xl text-3xl"
          >
            Helping Today
          </h2>

          {/* Large Transparent Background Text */}
          <h2
            className="absolute text-gray-400 lg:font-bold md:font-bold font-extrabold opacity-40 
                 text-4xl md:text-5xl lg:text-7xl z-0"
          >
            Helping Today
          </h2>
          <p className=" text-[#050960] mt-3 md:mt-4 lg:mt-8 font-bold text-[10px]  md:text-[13px] lg:text-xl  inline leading-snug">
            We're transforming lives by fighting poverty through sustainable
            solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-6">
          <div className="space-y-10">
            <div
              className="bg-white/80 p-8 rounded-3xl border border-white backdrop-blur-md shadow-2xl animate-card"
              style={{
                opacity: 0,
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Today's Achievement
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We've empowered{" "}
                <span className="font-bold text-pink-600">5,000 children</span>{" "}
                across{" "}
                <span className="font-bold text-purple-600">
                  12 developing nations
                </span>{" "}
                with access to quality education and learning resources.
              </p>
            </div>

            <div
              className="bg-white/80 p-8 rounded-3xl border border-white backdrop-blur-md shadow-2xl animate-card"
              style={{
                opacity: 0,
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Our Visionary Goals
                </h3>
              </div>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <div className="checkmark-animate flex-shrink-0 mt-1 mr-3">
                    <svg
                      className="w-5 h-5 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>
                    Eradicate hunger through sustainable food programs
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="checkmark-animate flex-shrink-0 mt-1 mr-3">
                    <svg
                      className="w-5 h-5 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>Ensure every child has access to education</span>
                </li>
                <li className="flex items-start">
                  <div className="checkmark-animate flex-shrink-0 mt-1 mr-3">
                    <svg
                      className="w-5 h-5 text-pink-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span>
                    Create economic opportunities through job training
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div
              ref={counterRef}
              className="bg-gradient-to-br from-pink-500 to-purple-600 p-10 rounded-3xl shadow-2xl text-center relative overflow-hidden"
              style={{
                transform: "scale(1)",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
            >
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 pulse-ring"></div>
              <div
                className="absolute inset-4 rounded-full border-2 border-white/20 pulse-ring"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="relative z-10">
                <div
                  id="campaign-counter"
                  className="text-6xl md:text-7xl font-bold text-white mb-4"
                >
                  0
                </div>
                <h3 className="text-2xl font-semibold text-pink-100 mb-6">
                  Successful Campaigns
                </h3>
                <p className="text-pink-100 mb-8 max-w-md mx-auto">
                  Together we've impacted millions of lives across the globe
                </p>

                {/* <button
                  className="px-10 py-4 bg-white text-pink-600 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg relative overflow-hidden group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                  }}
                >
                  <span className="relative z-10">Join Our Movement</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1"></span>
                </button> */}
              </div>
            </div>

            {/* Animated globe */}
            <div
              ref={globeRef}
              className="absolute -bottom-20 -right-20 z-0 opacity-20 w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 rounded-full border-2 border-pink-300/30"></div>
              <div className="absolute inset-4 rounded-full border-2 border-purple-300/30"></div>
              <div className="absolute inset-8 rounded-full border-2 border-pink-400/30"></div>

              {/* Countries markers */}
              {[...Array(12)].map((_, i) => {
                const angle = i * 30 * (Math.PI / 180);
                const x = 50 + 40 * Math.cos(angle);
                const y = 50 + 40 * Math.sin(angle);

                return (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg float-element"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      "--y-distance": "5px",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(var(--y-distance));
          }
        }

        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkmarkWiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-5deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }

        .pulse-ring {
          animation: pulse 4s ease-out infinite;
        }

        .bg-grid-pink-400\/20 {
          background-image: linear-gradient(
              to right,
              rgba(244, 114, 182, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(244, 114, 182, 0.2) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default HelpingToday;

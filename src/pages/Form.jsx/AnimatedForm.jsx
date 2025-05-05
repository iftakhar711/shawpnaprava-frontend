import { useState, useRef, useEffect } from "react";
import video from "../../assets/VolunteerRegistration.mp4";
import { motion, useAnimation, stagger, animate } from "framer-motion";

export default function AnimatedForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    availability: "weekends",
    motivation: "",
    dob: "",
    occupation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState("");
  const descriptionRef = useRef(null);
  const modalRef = useRef(null);
  const headingControls = useAnimation();
  const headingRef = useRef(null);
  const containerControls = useAnimation();

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    address: useRef(null),
    skills: useRef(null),
    motivation: useRef(null),
    dob: useRef(null),
    occupation: useRef(null),
  };

  // Animate heading on mount
  useEffect(() => {
    const sequence = async () => {
      // 1. Make container visible immediately
      await containerControls.start({ opacity: 1, y: 0 });

      // 2. Animate background gradient
      await headingControls.start({
        scaleX: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });

      // 3. Animate letters one by one
      const letters = Array.from(
        headingRef.current.querySelectorAll(".letter")
      );
      await animate(
        letters,
        {
          opacity: 1,
          y: 0,
          color: ["#9CA3AF", "#3B82F6", "#1F2937"],
        },
        {
          duration: 0.3,
          delay: stagger(0.05),
          ease: "circOut",
        }
      );

      // 4. Animate underline
      await headingControls.start({
        underlineWidth: "100%",
        transition: { duration: 0.8 },
      });

      // 5. Start floating orbs
      headingControls.start({
        orbs: "visible",
        transition: { staggerChildren: 0.1 },
      });
    };

    sequence();
  }, [headingControls, containerControls]);

  // Animate description into view when it becomes visible
  useEffect(() => {
    if (showDescription && descriptionRef.current) {
      animate(descriptionRef.current, {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [showDescription]);

  // Animate modal when it appears
  useEffect(() => {
    if (showModal && modalRef.current) {
      animate(modalRef.current, {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 },
      });
    }
  }, [showModal]);

  // Label animation
  const animateLabel = (field, action) => {
    const input = inputRefs[field]?.current;
    if (!input) return;

    const label = input.parentElement.querySelector("span");
    if (action === "focus") {
      label.classList.add("!-translate-y-5", "!text-xs", "!text-blue-500");
      input.parentElement.classList.add("!border-blue-500");
    } else if (!input.value && action === "blur") {
      label.classList.remove("!-translate-y-5", "!text-xs", "!text-blue-500");
      input.parentElement.classList.remove("!border-blue-500");
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler with Web3Forms integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", "a0248573-d08d-4446-9e24-92b25506e1dd"); // Replace with your actual access key
    formData.append("subject", "New Volunteer Registration");
    formData.append("from_name", "Volunteer Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setShowModal(true);
        e.target.reset();
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          skills: "",
          availability: "weekends",
          motivation: "",
          dob: "",
          occupation: "",
        });
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal
  const closeModal = () => {
    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.3 },
      }).then(() => setShowModal(false));
    }
  };

  // Toggle description visibility
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  // const orbVariants = {
  //   hidden: { y: 0, opacity: 0 },
  //   visible: {
  //     y: [0, -10, 0],
  //     opacity: [0.7, 1, 0.7],
  //     transition: {
  //       duration: 3,
  //       repeat: Infinity,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-pink-100 to-purple-100">
      {/* Video Background - Shows on sm and md */}
      <div className="lg:hidden absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-25"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
          >
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mt-4">
                Thank You!
              </h3>
              <p className="text-gray-600 mt-2">
                Your volunteer application has been submitted successfully.
                We'll contact you soon.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={containerControls}>
        {/* Animated Heading Section */}
        <div className="flex justify-center overflow-hidden pt-26 pb-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Decorative background element */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl -z-10"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />

            {/* Main heading with letters */}
            <motion.h1
              ref={headingRef}
              className="text-2xl md:text-4xl font-bold text-center py-4 px-8 relative"
            >
              {"Volunteer Registration Form".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="letter inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  style={{ display: "inline-block" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              />
            </motion.h1>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-400"
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

        {/* Form Section */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="mt-6 mb-10 w-full max-w-2xl lg:max-w-screen-xl backdrop-blur-sm bg-white/80 md:bg-white/90 rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row px-4 py-2 mx-4 sm:mx-6 md:mx-8 lg:mx-0">
            {/* Left Column - Form */}
            <div className="w-full lg:w-1/2 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Web3Forms hidden fields */}
                <input
                  type="hidden"
                  name="access_key"
                  value="YOUR_ACCESS_KEY_HERE"
                />
                <input
                  type="hidden"
                  name="subject"
                  value="New Volunteer Registration"
                />
                <input type="hidden" name="from_name" value="Volunteer Form" />
                <input type="checkbox" name="botcheck" className="hidden" />
                {/* Name Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Full Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    ref={inputRefs.name}
                    onFocus={() => animateLabel("name", "focus")}
                    onBlur={() => animateLabel("name", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                      {errors.name}
                    </p>
                  )}
                </div>
                {/* Email Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    ref={inputRefs.email}
                    onFocus={() => animateLabel("email", "focus")}
                    onBlur={() => animateLabel("email", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                      {errors.email}
                    </p>
                  )}
                </div>
                {/* Phone Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    ref={inputRefs.phone}
                    onFocus={() => animateLabel("phone", "focus")}
                    onBlur={() => animateLabel("phone", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                      {errors.phone}
                    </p>
                  )}
                </div>
                {/* Address Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Address
                  </span>
                  <input
                    type="text"
                    name="address"
                    ref={inputRefs.address}
                    onFocus={() => animateLabel("address", "focus")}
                    onBlur={() => animateLabel("address", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                      {errors.address}
                    </p>
                  )}
                </div>
                {/* Date of Birth Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Date of Birth
                  </span>
                  <input
                    type="date"
                    name="dob"
                    ref={inputRefs.dob}
                    onFocus={() => animateLabel("dob", "focus")}
                    onBlur={() => animateLabel("dob", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                      {errors.dob}
                    </p>
                  )}
                </div>
                {/* Occupation Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Occupation
                  </span>
                  <input
                    type="text"
                    name="occupation"
                    ref={inputRefs.occupation}
                    onFocus={() => animateLabel("occupation", "focus")}
                    onBlur={() => animateLabel("occupation", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                  {errors.occupation && (
                    <p className="text-red-500 text-xs mt-1 animate-fadeIn">
                      {errors.occupation}
                    </p>
                  )}
                </div>

                {/* <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Skills (optional)
                  </span>
                  <input
                    type="text"
                    name="skills"
                    ref={inputRefs.skills}
                    onFocus={() => animateLabel("skills", "focus")}
                    onBlur={() => animateLabel("skills", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent"
                  />
                </div>
            
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Availability
                  </span>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value })
                    }
                    className="w-full p-3 pt-8 outline-none bg-transparent appearance-none"
                  >
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="both">Both</option>
                  </select>
                </div> */}
                {/* Motivation Field */}
                <div className="relative group border-2 border-gray-200 rounded-lg p-1 transition-all duration-300 hover:border-blue-400">
                  <span className="absolute left-3 top-3 text-gray-500 transition-all duration-300 pointer-events-none group-hover:text-blue-500">
                    Why volunteer with us?
                  </span>
                  <textarea
                    name="motivation"
                    ref={inputRefs.motivation}
                    onFocus={() => animateLabel("motivation", "focus")}
                    onBlur={() => animateLabel("motivation", "blur")}
                    onChange={(e) =>
                      setFormData({ ...formData, motivation: e.target.value })
                    }
                    className="w-full p-3 pt-10 outline-none bg-transparent min-h-[100px] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Join Our Team"
                  )}
                </button>
                {/* Submission status message */}
                {result && !showModal && (
                  <p
                    className={`text-center mt-4 ${
                      result.includes("Successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {result}
                  </p>
                )}
              </form>

              {/* Volunteer Details Dropdown - Shows on sm and md */}
              <div className="lg:hidden mt-8 scroll-auto">
                <button
                  onClick={toggleDescription}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  {showDescription ? "Hide Details" : "Show Volunteer Details"}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      showDescription ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <motion.div
                  ref={descriptionRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={showDescription ? { opacity: 1, y: 0 } : {}}
                  className={`bg-white bg-opacity-90 rounded-lg p-6 mt-4 shadow-lg ${
                    showDescription ? "block" : "hidden"
                  }`}
                >
                  {/* Description Section */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Description
                    </h3>
                    <p className="text-black">
                      We are looking for enthusiastic volunteers interested in
                      bringing positive change to society. Join our team to
                      support the local community through various meaningful
                      activities.
                    </p>
                  </div>

                  {/* Requirements Section */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-4">
                    <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Requirements
                    </h3>
                    <ul className="space-y-3 text-black">
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Enthusiasm for social service
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Strong communication skills
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Teamwork mindset
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Minimum age: 18 years
                      </li>
                    </ul>
                  </div>

                  {/* Benefits Section */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-4">
                    <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v13m-8-4v5m16-5v5M12 6a4 4 0 100-8 4 4 0 000 8z"
                        ></path>
                      </svg>
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-[10px] text-blue-700">
                          Social Impact
                        </h4>
                        <p className="text-[10px] text-black">
                          Transform local lives
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-[10px] text-blue-700">
                          Skill Development
                        </h4>
                        <p className="text-[10px] text-black">
                          Gain valuable experience
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-[10px] text-blue-700">
                          Networking
                        </h4>
                        <p className="text-[10px] text-black">
                          Expand your connections
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-[10px] text-blue-700">
                          Activities
                        </h4>
                        <p className="text-[10px] text-black">
                          Cultural experiences
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Shows only on lg+ */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover max-h-[950px]"
              >
                <source src={video} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

              <div className="absolute inset-0 pt-8 pb-8 px-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Description Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Description
                    </h3>
                    <p className="text-gray-200">
                      We are looking for enthusiastic volunteers interested in
                      bringing positive change to society. Join our team to
                      support the local community through various meaningful
                      activities.
                    </p>
                  </motion.div>

                  {/* Requirements Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Requirements
                    </h3>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Enthusiasm for social service
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Strong communication skills
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Teamwork mindset
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block bg-blue-500 rounded-full w-2 h-2 mt-2 mr-2"></span>
                        Minimum age: 18 years
                      </li>
                    </ul>
                  </motion.div>

                  {/* Benefits Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v13m-8-4v5m16-5v5M12 6a4 4 0 100-8 4 4 0 000 8z"
                        ></path>
                      </svg>
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-blue-100">
                          Social Impact
                        </h4>
                        <p className="text-sm text-blue-50">
                          Transform local lives
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-blue-100">
                          Skill Development
                        </h4>
                        <p className="text-sm text-blue-50">
                          Gain valuable experience
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-blue-100">
                          Networking
                        </h4>
                        <p className="text-sm text-blue-50">
                          Expand your connections
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
                        <h4 className="font-medium text-blue-100">
                          Activities
                        </h4>
                        <p className="text-sm text-blue-50">
                          Cultural experiences
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  return (
    <motion.footer
      className="bg-gradient-to-r from-pink-100 to-purple-100 text-black font-mono py-10 px-4 sm:px-8 md:px-12"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            when: "beforeChildren",
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Contact Form */}

        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <motion.div
            className="flex items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              className="h-20 w-auto object-contain"
              src={logo}
              alt="Company Logo"
            />
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <motion.p
              className="flex items-start gap-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <span className="text-gray-600 mt-1">📍</span>
              <span>15 no ward, Modhupur, Feni, Bangladesh</span>
            </motion.p>
            <motion.p
              className="flex items-center gap-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <span className="text-gray-600">📞</span>
              <span>Contact no: 01843933083</span>
            </motion.p>
            <motion.p
              className="flex items-center gap-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <span className="text-gray-600">📧</span>
              <span>support@rareblocks.xyz</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.hr
          className="border-gray-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Bottom Footer Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.4 },
            },
          }}
        >
          {/* Navigation (desktop) */}
          <motion.nav
            className="hidden md:flex space-x-6"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <a href="#" className="hover:text-purple-600 transition-colors">
              About
            </a>
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="hover:text-purple-600 transition-colors">
                Our Team
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute bg-white text-black bottom-full mb-2 py-2 w-40 rounded-lg shadow-lg z-10 border border-gray-200"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, y: 10, scaleY: 0.9 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        transition: { duration: 0.3 },
                      },
                      exit: {
                        opacity: 0,
                        y: 10,
                        scaleY: 0.9,
                        transition: { duration: 0.2 },
                      },
                    }}
                  >
                    <a href="#" className="block px-4 py-2 hover:bg-purple-50">
                      Leaders
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-purple-50">
                      Members
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Works
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Support
            </a>
          </motion.nav>

          {/* Navigation (mobile) */}
          <motion.nav
            className="md:hidden w-full space-y-2"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <a href="#" className="block py-2 hover:text-purple-600">
              About
            </a>
            <div>
              <button
                onClick={toggleMobileDropdown}
                className="flex justify-between w-full py-2 hover:text-purple-600"
              >
                <span>Our Team</span>
                <span>{mobileDropdownOpen ? "▲" : "▼"}</span>
              </button>
              <AnimatePresence>
                {mobileDropdownOpen && (
                  <motion.div
                    className="pl-4 space-y-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, height: 0 },
                      visible: {
                        opacity: 1,
                        height: "auto",
                        transition: { duration: 0.3 },
                      },
                      exit: {
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.2 },
                      },
                    }}
                  >
                    <a href="#" className="block py-1 hover:text-purple-600">
                      Leaders
                    </a>
                    <a href="#" className="block py-1 hover:text-purple-600">
                      Members
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="#" className="block py-2 hover:text-purple-600">
              Works
            </a>
            <a href="#" className="block py-2 hover:text-purple-600">
              Support
            </a>
          </motion.nav>

          {/* Social icons */}
          <motion.div
            className="flex space-x-4"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <motion.a
              href="#"
              className="text-gray-700 hover:text-purple-600"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebookF size={20} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-700 hover:text-purple-600"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter size={20} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-700 hover:text-purple-600"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram size={20} />
            </motion.a>
          </motion.div>

          <motion.p
            className="text-gray-600 text-center md:text-left"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            © Copyright {new Date().getFullYear()}, All Rights Reserved
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

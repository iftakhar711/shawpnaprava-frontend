import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 pb-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-black space-y-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-purple-700">
          Contact Us
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Phone</label>
            <input
              type="tel"
              placeholder="Your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            ></textarea>
          </div>
          <div className="col-span-1 md:col-span-2 text-center">
            <button className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-purple-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute inset-0 w-full h-full rounded-full opacity-90 filter blur group-hover:opacity-100 duration-200 transition-all ease-out bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-700/20 rounded-full opacity-20 filter blur-md group-hover:opacity-50 group-hover:blur-xs duration-200 transition-all ease-out"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-700/20 rounded-full opacity-20 filter blur-md group-hover:opacity-30 group-hover:blur-sm duration-100 transition-all ease-out"></span>
              <span className="absolute inset-0 w-full h-full rounded-full opacity-60 filter blur-sm bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>

              <div className="relative z-50 flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span className="relative text-lg font-semibold text-white">
                  Send Message
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

import React from "react";
import { Bot, Moon, Sparkles, Sun } from "lucide-react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <div
      className={`${darkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg py-4 px-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* left side content */}
        <div className="flex items-center space-x-3">
          <div className="p-1 sm:p-2 bg-gradient-to-r from bg-blue-500 to-indigo-500 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <h1 className="md:text-xl font-bold">AI Bot</h1>
        </div>
        {/* Right side content */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium">
            <Sparkles
              className={`${darkMode ? "text-indigo-400" : "text-indigo-600"} h-4 w-4`}
            />
            <span
              className={`${darkMode ? "text-indigo-300" : "text-indigo-700"} text-xs sm:text-sm font-medium`}
            >
              Ai Powered
            </span>
          </div>
          <button
            className={`p-1 sm:p-2 rounded-full cursor-pointer ${darkMode ? "bg-indigo-700  text-yellow-300" : "bg-indigo-100 text-indigo-700"}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

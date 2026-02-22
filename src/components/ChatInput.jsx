import { Send } from "lucide-react";
import React from "react";

const ChatInput = ({
  darkMode,
  input,
  setInput,
  loading,
  handleSendMessage,
}) => {
  return (
    <div
      className={`${darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"} p-4`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type Your Message"
            className={`flex-1 border ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-gray-100 border-gray-300 text-gray-900"} rounded-full px-5 py-3 focus:outline-none`}
          />
          <button
            className="cursor-pointer"
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

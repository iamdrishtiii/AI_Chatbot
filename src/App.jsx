import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatMessage from "./components/ChatMessage";
import {
  formatTime,
  //  getRandomResponse
} from "../utils/chatUtils";
import LoadingIndicator from "./components/LoadingIndicator";
import ChatInput from "./components/ChatInput";
import { generateContent } from "./services/geminiapi";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return; // Guard clause: Don't send empty or double-tap

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    // Capture the current input before clearing it
    const currentInput = input;

    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear UI immediately for better UX
    setIsLoading(true);

    try {
      // Await the actual API call
      const responseText = await generateContent(currentInput);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText, // Now this is the actual string, not a Promise
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to get Gemini response:", error);
      // Add an error message to the chat so the user knows what happened
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}
    >
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.length == 0 ? (
            <div className="text-center pt-10 h-full text-gray-400 font-bold  md:text-xl">
              {" "}
              Let's Start a Conversation!
            </div>
          ) : (
            messages.map((message) => {
              return (
                <ChatMessage
                  key={message.id}
                  darkMode={darkMode}
                  messages={message}
                  formatTime={formatTime}
                />
              );
            })
          )}
          {isLoading && <LoadingIndicator darkMode={darkMode} />}
        </div>
      </div>
      <ChatInput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;

"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  // Loading state to display the loading
  const [loading,setLoading]=useState(false);

// Scrool view

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const currentInput = input;

    const userMsg: Message = { role: "user", text: currentInput };
    setMessages((prev) => [...prev, userMsg]);

    setInput(""); // clear immediately
    setLoading(true);  // This will set the loading state to true.

    // "http://127.0.0.1:8000/chat" this is for local one

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: currentInput }),
    });

    const data = await res.json();

    setLoading(false);

    const botMsg: Message = { role: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Chat 💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[350px] bg-black border border-white/10 rounded-2xl shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-3 bg-purple-600 text-white rounded-t-2xl font-semibold">
            AI Assistant 🚀
          </div>

          {/* Messages */}
          <div className="h-[300px] overflow-y-auto p-3 space-y-2 flex flex-col">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-purple-500 text-white self-end"
                    : "bg-white/10 text-white self-start"
                }`}
              >
                <div className="prose prose-invert text-sm">

                  

       <ReactMarkdown>
    {msg.text}
    
  </ReactMarkdown>
</div>


              </div>
            ))}

            {/* For bottom text and here we can show the typing animation */}

            <div ref={bottomRef} />

            {loading &&(
                    <div className="bg-white/10 text-white text-sm p-2 rounded-lg w-fit">
                      Typing....
                    </div>
                  )}

          </div>

          

          {/* Input */}
          <div className="flex p-2 border-t border-white/10">
            <input
              className="flex-1 bg-black text-white p-2 outline-none"
              placeholder="Ask anything about tech..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 px-4 rounded-lg text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
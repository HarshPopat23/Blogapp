// import { useState } from "react";

// export default function AiChat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage = input;
//     setInput("");


//     setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: data.reply || "No response from AI" },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: "❌ Failed to connect to AI server" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const newChat = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="flex h-[calc(100vh-80px)] bg-gray-100">
     
//       <aside className="w-64 bg-white border-r p-4 hidden md:block">
//         <h2 className="text-xl font-bold mb-4">🧠 QEconsePta</h2>

//         <button
//           onClick={newChat}
//           className="w-full bg-black text-white py-2 rounded mb-4"
//         >
//           + New Chat
//         </button>

//         <div className="text-sm text-gray-600">
//           {messages.length ? "Current Chat" : "No active chat"}
//         </div>
//       </aside>

   
//       <main className="flex-1 flex flex-col">
//         <header className="bg-white border-b p-4 font-semibold">
//           AI Chatbot
//         </header>

//         <section className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`max-w-xl p-3 rounded ${
//                 msg.role === "user"
//                   ? "ml-auto bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}

//           {loading && (
//             <div className="bg-white border p-3 rounded max-w-xl">
//               🤖 Thinking...
//             </div>
//           )}
//         </section>

//         <footer className="p-4 bg-white border-t flex gap-2">
//           <input
//             className="flex-1 border rounded px-3 py-2"
//             placeholder="Ask something..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             disabled={loading}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="bg-black text-white px-4 rounded disabled:opacity-60"
//           >
//             Send
//           </button>
//         </footer>
//       </main>
//     </div>
//   );
// }


import { useState } from "react";

export default function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.reply },
        ]);

        // --- INCREMENT QUERY COUNT FOR DASHBOARD ---
        const currentCount = parseInt(localStorage.getItem("ai_query_count") || "0");
        localStorage.setItem("ai_query_count", currentCount + 1);
        // -------------------------------------------
      } else {
        throw new Error("No response");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Failed to connect to AI server. Please check if your backend is running." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4 text-orange-500">🧠 QEconsePta</h2>

        <button
          onClick={newChat}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mb-4 transition-colors font-medium"
        >
          + New Chat
        </button>

        <div className="text-sm text-gray-600">
          {messages.length ? "Current Chat Active" : "No active chat"}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4 font-semibold text-gray-700">
          AI Assistant
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              How can I help you today?
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xl p-3 rounded-lg shadow-sm ${
                msg.role === "user"
                  ? "ml-auto bg-orange-500 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-white border p-3 rounded-lg max-w-xl animate-pulse text-gray-500">
              🤖 Thinking...
            </div>
          )}
        </section>

        <footer className="p-4 bg-white border-t flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-orange-500 text-white px-6 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-60 transition-colors"
          >
            Send
          </button>
        </footer>
      </main>
    </div>
  );
}
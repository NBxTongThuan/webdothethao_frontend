import { useEffect, useState } from "react";
import useChatSocket from "../../hook/ChatBoxContext";

interface ChatMessage {
  sender: string;
  content: string;
  createdAt: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMsg, setNewMsg] = useState("");

  const { sendMessage } = useChatSocket((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/chat/history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          setMessages([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
        setMessages([]);
      });
  }, []);

  const handleSend = () => {
    if (newMsg.trim()) {
      sendMessage(newMsg);
      setNewMsg("");
    }
  };

  return (
    <div className="p-4 border rounded w-[400px] bg-white shadow-xl space-y-2">
      <h2 className="text-lg font-semibold">Chat với Admin</h2>
      <div className="h-64 overflow-y-auto border p-2 space-y-1 text-sm bg-gray-50">
        {messages && messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

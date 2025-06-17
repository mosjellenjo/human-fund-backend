"use client";
import { useState, useRef, useEffect, FormEvent } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hi, I'm KrugerGPT! Ask me anything about The Human Fund, Festivus, or how people can help people.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content:
          data?.answer || "Sorry, I had trouble answering that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      style={{
        background: "#0b1f19",
        padding: "2rem 0",
        color: "#8CFFDA",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            color: "#fff",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          Ask KrugerGPT Anything
        </h2>
      </div>

      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#0b1f19",
          border: "2px solid #8CFFDA",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div
          ref={chatAreaRef}
          style={{
            maxHeight: 320,
            overflowY: "auto",
            paddingRight: 8,
            marginBottom: 16,
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                margin: "12px 0",
              }}
            >
              <div
                style={{
                  background: msg.role === "user" ? "#8CFFDA" : "#262626",
                  color: msg.role === "user" ? "#181028" : "#8CFFDA",
                  borderRadius: 16,
                  padding: "10px 16px",
                  maxWidth: "80%",
                  textAlign: "left",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ marginTop: 12, color: "#8CFFDA" }}>
              KrugerGPT is typing...
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: 8, marginTop: 8 }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #8CFFDA",
              background: "#fff",
              color: "#181028",
              fontSize: 16,
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: "#8CFFDA",
              color: "#181028",
              border: "none",
              borderRadius: 8,
              padding: "0 24px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

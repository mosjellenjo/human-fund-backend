"use client";
import { useState, useRef, useEffect, FormEvent } from "react";

export default function Chatbot() {
  const defaultGreetings: { [key: string]: string } = {
    jerry: "Hi, I'm a representative from The Human Fund. Ask me anything about what we do, Festivus, or how people help people.",
    george: "Hi, I'm a representative from The Human Fund. Ask me about what we do... unless it's about accounting. Or our boss. Or forms. Please don't ask about forms.",
    kramer: "Hi there! I'm a representative from The Human Fund. What do you need? Let’s get weird and fix the world!",
    kruger: "Hey. I'm from The Human Fund, apparently. Ask whatever, it's all good. Or not. No pressure.",
  };

  const typingStatus: { [key: string]: string } = {
    jerry: "JerryAI is observationally mulling it over...",
    george: "George is anxiously cooking up a lie about your question...",
    kramer: "KramericAI is enthusiastically winging a response...",
    kruger: "KrugerAI is slowly getting around to maybe answering that...",
  };

  const [representative, setRepresentative] = useState("jerry");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content: defaultGreetings["jerry"],
    },
  ]);

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
        body: JSON.stringify({
          question: userMessage.content,
          persona: representative,
        }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data?.answer || "Sorry, I had trouble answering that.",
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

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRep = e.target.value;
    setRepresentative(newRep);
    setMessages([
      {
        role: "assistant",
        content: defaultGreetings[newRep],
      },
    ]);
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
          Ask a Human Fund Representative
        </h2>
        <label htmlFor="rep" style={{ marginRight: 8 }}>
          Choose your representative:
        </label>
        <select
          id="rep"
          value={representative}
          onChange={handlePersonaChange}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #8CFFDA",
            background: "#fff",
            color: "#181028",
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          <option value="jerry">JerryAI</option>
          <option value="george">VandelAI</option>
          <option value="kramer">KramericAI</option>
          <option value="kruger">KrugerAI</option>
        </select>
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
            height: 320,
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: 8,
            paddingTop: 4,
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
                  background: msg.role === "user" ? "#8CFFDA" : "#ffffff",
                  color: msg.role === "user" ? "#181028" : "#000000",
                  borderRadius: 16,
                  padding: "10px 16px",
                  maxWidth: "80%",
                  textAlign: "left",
                  fontSize: 13,
                  lineHeight: 1.3,
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div
              style={{
                marginTop: 12,
                color: "#8CFFDA",
                fontSize: 13,
                lineHeight: 1.3,
              }}
            >
              {typingStatus[representative]}
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
              fontSize: 13,
              lineHeight: 1.3,
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

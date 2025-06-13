"use client";
import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hi, I'm KrugerGPT! Ask me anything about The Human Fund, Festivus, or how people can help people." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      data = { reply: "Sorry, there was a problem with the server response." };
    }
    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: data.reply },
    ]);
    setInput("");
    setLoading(false);
  };

  // Scroll chat area to bottom when new messages are added
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Function to format text with markdown-style formatting
  const formatText = (text: string) => {
    // Handle bold text (** or __)
    text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    // Handle italic text (* or _)
    text = text.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
    // Handle code blocks (`)
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    return text;
  };

  // Function to format message content with line breaks and bullet points
  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Handle bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <div key={i} style={{ marginLeft: '20px' }}>
            • <span dangerouslySetInnerHTML={{ __html: formatText(line.substring(2)) }} />
          </div>
        );
      }
      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={i} style={{ marginLeft: '20px' }}>
            <span dangerouslySetInnerHTML={{ __html: formatText(line) }} />
          </div>
        );
      }
      // Regular line
      return (
        <div key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        </div>
      );
    });
  };

  return (
    <section style={{ background: "hsl(var(--dark-green), 1)", padding: "2rem 0" }}>
      <div style={{
        maxWidth: 600,
        margin: "0 auto 1.5rem auto",
        textAlign: "center",
      }}>
        <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Ask KrugerGPT Anything
        </h2>
      </div>
      <div
        style={{
          maxWidth: 600,
          margin: "2rem auto 1rem auto",
          border: "2px solid #8CFFDA",
          borderRadius: 16,
          padding: 28,
          background: "hsl(var(--dark-green), 1)",
          color: "#8CFFDA",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div
          ref={chatAreaRef}
          style={{ minHeight: 200, maxHeight: 320, overflowY: "auto", paddingRight: 8 }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                margin: "12px 0",
              }}
            >
              <div
                style={{
                  background: "#8CFFDA",
                  color: "#181028",
                  borderRadius: 18,
                  padding: "10px 18px",
                  maxWidth: "80%",
                  fontWeight: 500,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  borderTopRightRadius: msg.role === "user" ? 4 : 18,
                  borderTopLeftRadius: msg.role === "user" ? 18 : 4,
                  textAlign: "left",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {formatMessage(msg.content)}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ color: "#8CFFDA", margin: "8px 0" }}>
              KrugerGPT is typing...
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: 12,
              background: "#fff",
              color: "#181028",
              border: "1px solid #8CFFDA",
              borderRadius: 8,
              fontSize: 16,
            }}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              background: "#8CFFDA",
              color: "#181028",
              border: "none",
              borderRadius: 8,
              padding: "0 24px",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
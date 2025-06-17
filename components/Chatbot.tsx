"use client";
import { useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      { id: "initial-greeting", role: "assistant", content: "Hi, I'm KrugerGPT! Ask me anything about The Human Fund, Festivus, or how people can help people." }
    ]
  });
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Scroll chat area to bottom when new messages are added
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]); // Only depend on messages, isLoading is handled by the hook's internal state.

  // Function to format text with markdown-style formatting
  const formatText = (text: string) => {
    console.log("Original text for formatting:", text);

    // Handle bold text (** or __)
    text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    // Handle italic text (* or _)
    text = text.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
    // Handle code blocks (`)
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');

    // Handle headings (##, ###, etc.) - up to h6 (Order matters: longest match first)
    text = text.replace(/^###### (.*)$/gm, '<h6>$1</h6>');
    text = text.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
    text = text.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
    text = text.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.*)$/gm, '<h1>$1</h1>');

    // Handle unordered lists (*, -, +)
    text = text.replace(/^[\*\-\+]\s+(.*)/gm, '<li>$1</li>');
    if (text.includes('<li>')) {
      text = '<ul>' + text + '</ul>';
    }

    // Handle ordered lists (1., 2., etc.)
    text = text.replace(/^\d+\.\s+(.*)/gm, '<li>$1</li>');
    if (text.includes('<li>') && !text.includes('<ul>')) { // Ensure it's not already an unordered list
      text = '<ol>' + text + '</ol>';
    }

    // Finally, replace newlines with <br/> for proper line breaks (after other block-level parsing)
    text = text.replace(/\n/g, '<br/>');

    console.log("Formatted HTML output:", text);
    return text;
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
        {messages.map((msg) => (
            <div
              key={msg.id}
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
                {/* messages from useChat have their content as a string directly for simple text responses */}
                <span dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} />
              </div>
          </div>
        ))}
          {isLoading && (
            <div style={{ color: "#8CFFDA", margin: "8px 0" }}>
              KrugerGPT is typing...
            </div>
          )}
      </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          value={input}
            onChange={handleInputChange}
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
            type="submit"
            disabled={isLoading || !input.trim()}
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
        </form>
      </div>
    </section>
  );
}
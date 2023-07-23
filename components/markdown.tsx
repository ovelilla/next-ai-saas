import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ChatCompletionRequestMessage } from "openai";

export const Markdown = ({ message }: { message: ChatCompletionRequestMessage }) => {
  return (
    <ReactMarkdown
      components={{
        pre: ({ node, ...props }) => <pre {...props} />,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: "0.5rem 0",
                padding: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.375",
                borderRadius: "0.5rem",
                backgroundColor: "rgb(17 24 39)",
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-black/10 rounded-lg p-1" {...props}>
              {children}
            </code>
          );
        },
      }}
      className="text-sm overflow-hidden leading-7"
    >
      {message.content || ""}
    </ReactMarkdown>
  );
};

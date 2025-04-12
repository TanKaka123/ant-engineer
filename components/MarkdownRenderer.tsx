import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prism-themes/themes/prism-dracula.css"; 
import "prismjs/components/prism-jsx";          // JSX Syntax
import "prismjs/components/prism-typescript";   // TypeScript Syntax
import "prismjs/components/prism-tsx";   

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <pre className={className}>
      <code className={className}>{children}</code>
    </pre>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

type Props = {
  children?: string;
};

export default function MarkdownRenderer({ children }: Props) {
  return (
    <div className="prose dark:prose-invert sm:prose-lg">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{ code: CodeBlock }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

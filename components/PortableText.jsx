import { PortableText as SanityPortableText } from '@portabletext/react';

// Custom components for rendering different block types
const components = {
  block: {
    // Normal paragraph
    normal: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    
    // Headings
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4">{children}</h4>
    ),
    
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-600 bg-blue-50">
        {children}
      </blockquote>
    ),
  },
  
  // Lists
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  
  // List items
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  
  // Text formatting
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
        target={value.href.startsWith('http') ? '_blank' : '_self'}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
};

// Compact version for shorter descriptions (like property cards)
const compactComponents = {
  block: {
    normal: ({ children }) => (
      <span className="text-gray-600">{children}</span>
    ),
    h1: ({ children }) => <span className="font-semibold">{children}</span>,
    h2: ({ children }) => <span className="font-semibold">{children}</span>,
    h3: ({ children }) => <span className="font-semibold">{children}</span>,
    h4: ({ children }) => <span className="font-semibold">{children}</span>,
    blockquote: ({ children }) => <span className="italic">{children}</span>,
  },
  list: {
    bullet: ({ children }) => <span>{children}</span>,
    number: ({ children }) => <span>{children}</span>,
  },
  listItem: {
    bullet: ({ children }) => <span>• {children} </span>,
    number: ({ children }) => <span>{children} </span>,
  },
  marks: {
    strong: ({ children }) => <span className="font-semibold">{children}</span>,
    em: ({ children }) => <span className="italic">{children}</span>,
    link: ({ children }) => <span className="text-blue-600">{children}</span>,
  },
};

// Main PortableText component
export default function PortableText({ value, compact = false, className = '' }) {
  // Handle empty or invalid content
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  // Use compact components for inline rendering
  const selectedComponents = compact ? compactComponents : components;

  return (
    <div className={className}>
      <SanityPortableText 
        value={value} 
        components={selectedComponents}
      />
    </div>
  );
}

// Helper function to extract plain text from portable text (for meta descriptions, etc.)
export function portableTextToPlainText(blocks = []) {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (!block.children) return '';
      return block.children
        .filter(child => child._type === 'span')
        .map(span => span.text || '')
        .join('');
    })
    .join(' ')
    .trim();
}

// Helper function to get excerpt from portable text
export function getPortableTextExcerpt(blocks = [], maxLength = 160) {
  const plainText = portableTextToPlainText(blocks);
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

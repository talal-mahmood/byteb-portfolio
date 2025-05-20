'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownText({ children }: { children: string }) {
  return (
    <div className='prose dark:prose-invert'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          strong: ({ ...props }) => <strong className='font-bold' {...props} />,
          em: ({ ...props }) => <em className='italic' {...props} />,
          ul: ({ ...props }) => (
            <ul className='list-disc pl-6 space-y-2' {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

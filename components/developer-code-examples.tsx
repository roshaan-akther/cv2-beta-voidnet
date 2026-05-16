'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const codeExamples = {
  python: {
    code: `import requests

url = "https://api.voidnet.com/v1-beta/mcp/username/app"
headers = {"Authorization": "Bearer vnb-sk-xxx"}

response = requests.post(url, headers=headers)
print(response.json())`,
    language: 'python'
  },
  typescript: {
    code: `import axios from 'axios';

const url = 'https://api.voidnet.com/v1-beta/mcp/username/app';
const headers = {
  'Authorization': 'Bearer vnb-sk-xxx'
};

const response = await axios.post(url, {}, { headers });
console.log(response.data);`,
    language: 'typescript'
  },
  go: {
    code: `package main

import (
  "bytes"
  "net/http"
)

func main() {
  url := "https://api.voidnet.com/v1-beta/mcp/username/app"
  req, _ := http.NewRequest("POST", url, bytes.NewBuffer(nil))
  req.Header.Set("Authorization", "Bearer vnb-sk-xxx")
  client.Do(req)
}`,
    language: 'go'
  },
  curl: {
    code: `curl -X POST \\
  -H "Authorization: Bearer vnb-sk-xxx" \\
  -H "Content-Type: application/json" \\
  https://api.voidnet.com/v1-beta/mcp/username/app`,
    language: 'bash'
  }
};

const highlightCode = (code: string, language: string): string => {
  // First highlight the raw code, then escape HTML
  let highlighted = code;

  // Keywords
  const keywords = {
    python: ['import', 'from', 'def', 'return', 'if', 'else', 'for', 'while', 'print'],
    typescript: ['import', 'from', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'async', 'await'],
    go: ['package', 'import', 'func', 'return', 'if', 'else', 'for', 'var', 'const'],
    bash: ['curl', 'wget', 'echo', 'if', 'then', 'else', 'fi']
  };

  const langKeywords = keywords[language as keyof typeof keywords] || [];

  // Highlight keywords
  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, '__KW_START__$1__KW_END__');
  });

  // Highlight strings
  highlighted = highlighted.replace(/(".*?"|'.*?')/g, '__STR_START__$1__STR_END__');

  // Highlight numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, '__NUM_START__$1__NUM_END__');

  // Highlight comments (simple)
  if (language === 'python') {
    highlighted = highlighted.replace(/(#.*)$/gm, '__COMMENT_START__$1__COMMENT_END__');
  } else if (language === 'typescript' || language === 'go') {
    highlighted = highlighted.replace(/(\/\/.*)$/gm, '__COMMENT_START__$1__COMMENT_END__');
  } else if (language === 'bash') {
    highlighted = highlighted.replace(/(#.*)$/gm, '__COMMENT_START__$1__COMMENT_END__');
  }

  // Now escape HTML
  highlighted = highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Replace markers with actual HTML
  highlighted = highlighted
    .replace(/__KW_START__/g, '<span class="text-purple-600 dark:text-purple-400">')
    .replace(/__KW_END__/g, '</span>')
    .replace(/__STR_START__/g, '<span class="text-green-600 dark:text-green-400">')
    .replace(/__STR_END__/g, '</span>')
    .replace(/__NUM_START__/g, '<span class="text-blue-600 dark:text-blue-400">')
    .replace(/__NUM_END__/g, '</span>')
    .replace(/__COMMENT_START__/g, '<span class="text-gray-500 italic">')
    .replace(/__COMMENT_END__/g, '</span>');

  return highlighted;
};

export function DeveloperCodeExamples() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string, key: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
      <Tabs defaultValue="python" className="w-full">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background/50">
          <TabsList className="h-8 bg-transparent border-0">
            <TabsTrigger value="python" className="text-xs h-7 px-3 data-[state=active]:bg-muted">Python</TabsTrigger>
            <TabsTrigger value="typescript" className="text-xs h-7 px-3 data-[state=active]:bg-muted">TypeScript</TabsTrigger>
            <TabsTrigger value="go" className="text-xs h-7 px-3 data-[state=active]:bg-muted">Go</TabsTrigger>
            <TabsTrigger value="curl" className="text-xs h-7 px-3 data-[state=active]:bg-muted">cURL</TabsTrigger>
          </TabsList>
        </div>
        <div className="relative">
          <div className="p-4 overflow-x-auto">
            {Object.entries(codeExamples).map(([key, example]) => (
              <TabsContent key={key} value={key} className="m-0">
                <pre 
                  className="text-xs leading-relaxed bg-transparent"
                >
                  <code dangerouslySetInnerHTML={{ __html: highlightCode(example.code, example.language) }} />
                </pre>
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

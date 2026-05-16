import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * Read markdown file from the filesystem
 */
export async function readMarkdownFile(markdownPath: string): Promise<string> {
  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), markdownPath);
  return await fs.readFile(fullPath, 'utf-8');
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(remarkHtml, { sanitize: false }) // Convert to HTML
    .process(markdown);

  return result.toString();
}

/**
 * Read and parse markdown file to HTML
 */
export async function getArticleHtml(markdownPath: string): Promise<string> {
  const markdown = await readMarkdownFile(markdownPath);
  return await markdownToHtml(markdown);
}

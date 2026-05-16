import newsData from '@/data/news.json';

export interface NewsItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  isHero: boolean;
  image?: string;
  cta?: {
    text: string;
    href: string;
  };
  markdownPath: string;
}

export interface NewsData {
  articles: NewsItem[];
}

/**
 * Get all news items
 */
export function getAllNews(): NewsItem[] {
  return (newsData as NewsData).articles;
}

/**
 * Get news item by slug
 */
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getAllNews().find((news) => news.slug === slug);
}

/**
 * Get hero news item (first item with isHero: true)
 */
export function getHeroNews(): NewsItem | undefined {
  return getAllNews().find((news) => news.isHero);
}

/**
 * Get news items by category
 */
export function getNewsByCategory(category: string): NewsItem[] {
  return getAllNews().filter(
    (news) => news.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const categories = getAllNews().map((news) => news.category);
  return Array.from(new Set(categories));
}

/**
 * Get recent news items sorted by date (descending)
 */
export function getRecentNews(limit: number = 6): NewsItem[] {
  return getAllNews()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

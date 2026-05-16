import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { verifyToken, BrowserSessionPayload } from '@/lib/jwt';
import { NewsLayout } from '@/components/news/news-layout';
import { getNewsBySlug } from '@/app/lib/news';
import fs from 'fs';
import path from 'path';

interface NewsItemPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Pre-build all article pages at build time
  const { getAllNews } = await import('@/app/lib/news');
  const news = getAllNews();
  
  return news.map((newsItem) => ({
    slug: newsItem.slug,
  }));
}

export async function generateMetadata({ params }: NewsItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    return {
      title: 'News Not Found | Voidnet',
    };
  }

  return {
    title: `${newsItem.title} | Voidnet`,
    description: newsItem.description,
  };
}

export default async function NewsItemPage({ params }: NewsItemPageProps) {
  const { slug } = await params;
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  // Check authentication
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  let isAuthenticated = false;

  if (token) {
    const payload = verifyToken<BrowserSessionPayload>(token);
    if (payload && payload.typ === 'browser') {
      isAuthenticated = true;
    }
  }

  // Load markdown content as string for Streamdown
  const markdownPath = path.join(process.cwd(), newsItem.markdownPath);
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

  return (
    <NewsLayout
      isAuthenticated={isAuthenticated}
      title={newsItem.title}
      description={newsItem.description}
      date={newsItem.date}
      category={newsItem.category}
      ctaText={newsItem.cta?.text}
      ctaHref={newsItem.cta?.href}
      heroMedia={
        newsItem.image ? (
          <div
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"
            style={{ aspectRatio: '16 / 9' }}
          >
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover object-center opacity-90 mix-blend-multiply"
            />
          </div>
        ) : undefined
      }
    >
      {markdownContent}
    </NewsLayout>
  );
}

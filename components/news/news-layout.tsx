"use client"

import { Header } from '@/components/nonauth/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Streamdown, TableCopyDropdown, TableDownloadDropdown, type IconMap } from 'streamdown';
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { math } from '@streamdown/math';
import { cjk } from '@streamdown/cjk';
import { Copy, Check, Download, ZoomIn } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { helveticaNeue } from '@/lib/fonts';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export interface NewsLayoutProps {
  /** Page title (H1) */
  title: string;
  /** Short description/subtitle */
  description?: string;
  /** Publication date */
  date?: string;
  /** Category label */
  category?: string;
  /** Optional CTA button text */
  ctaText?: string;
  /** Optional CTA button href */
  ctaHref?: string;
  /** News body content */
  children: ReactNode;
  /** Optional hero media (video, image, etc.) */
  heroMedia?: ReactNode;
  /** Authentication state */
  isAuthenticated?: boolean;
}

export function NewsLayout({
  title,
  description,
  date,
  category,
  ctaText,
  ctaHref,
  children,
  heroMedia,
  isAuthenticated = false,
}: NewsLayoutProps) {
  const customIcons: Partial<IconMap> = {
    CopyIcon: Copy,
    DownloadIcon: Download,
    ZoomInIcon: ZoomIn,
    CheckIcon: Check,
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <PhotoProvider bannerVisible={false} photoClassName="rounded-2xl">
          <article className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto mb-12">
            {(date || category) && (
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-6">
                {category && <span className="font-medium text-foreground">{category}</span>}
                {date && <time dateTime={date} className="text-foreground/80">{date}</time>}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.15] mb-4 text-center text-foreground">
              {title}
            </h1>

            {description && (
              <p className="text-sm sm:text-base text-muted-foreground mb-8 text-center leading-relaxed">
                {description}
              </p>
            )}

            {ctaText && ctaHref && (
              <div className="text-center">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                >
                  {ctaText}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Hero Media */}
          {heroMedia && (
            <div className="mb-12 max-w-3xl mx-auto">
              {heroMedia}
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-3xl mx-auto" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
            <Streamdown
              icons={customIcons}
              plugins={{ code: code, mermaid: mermaid, math: math, cjk: cjk }}
              animated={true}
              components={{
                h1: ({ children, className }) => (
                  <h1 className={`mt-6 mb-4 font-heading text-[34px] ${className ?? ''}`}>{children}</h1>
                ),
                h2: ({ children, className }) => (
                  <h2 className={`mt-6 mb-3 font-heading text-[28px] ${className ?? ''}`}>{children}</h2>
                ),
                h3: ({ children, className }) => (
                  <h3 className={`mt-5 mb-2 font-heading text-[22px] ${className ?? ''}`}>{children}</h3>
                ),
                h4: ({ children, className }) => (
                  <h4 className={`mt-4 mb-2 font-heading text-lg ${className ?? ''}`}>{children}</h4>
                ),
                h5: ({ children, className }) => (
                  <h5 className={`mt-4 mb-2 font-heading text-base ${className ?? ''}`}>{children}</h5>
                ),
                h6: ({ children, className }) => (
                  <h6 className={`mt-3 mb-2 font-heading text-sm ${className ?? ''}`}>{children}</h6>
                ),
                p: ({ children, className }) => (
                  <p className={`mb-4 text-foreground/92 ${className ?? ''}`}>{children}</p>
                ),
                ul: ({ children, className }) => (
                  <ul className={`mb-4 ml-6 list-disc text-foreground/92 ${className ?? ''}`}>{children}</ul>
                ),
                ol: ({ children, className }) => (
                  <ol className={`mb-4 ml-6 list-decimal text-foreground/92 ${className ?? ''}`}>{children}</ol>
                ),
                li: ({ children, className }) => (
                  <li className={`mb-1 ${className ?? ''}`}>{children}</li>
                ),
                table: ({ children, className }) => (
                  <div data-streamdown="table-wrapper">
                    <div className="flex items-center justify-end gap-1">
                      <TableCopyDropdown />
                      <TableDownloadDropdown />
                    </div>
                    <Table className={className}>{children}</Table>
                  </div>
                ),
                thead: ({ children, className }) => (
                  <TableHeader className={className}>{children}</TableHeader>
                ),
                tbody: ({ children, className }) => (
                  <TableBody className={className}>{children}</TableBody>
                ),
                tr: ({ children, className }) => (
                  <TableRow className={className}>{children}</TableRow>
                ),
                th: ({ children, className }) => (
                  <TableHead className={className}>{children}</TableHead>
                ),
                td: ({ children, className }) => (
                  <TableCell className={className}>{children}</TableCell>
                ),
                img: ({ src, alt, className }) => (
                  <PhotoView src={typeof src === 'string' ? src : ''}>
                    <img
                      src={typeof src === 'string' ? src : ''}
                      alt={alt}
                      className={`${className} rounded-2xl`}
                      style={{ cursor: 'pointer' }}
                    />
                  </PhotoView>
                ),
              }}
            >
              {children as string}
            </Streamdown>
          </div>
        </article>
        </PhotoProvider>
      </main>
      <Footer />
    </>
  );
}

import { Boundary } from '#/ui/boundary';
import { type Metadata } from 'next';
import Link from 'next/link';

// Prerender a few known slugs at build time.
export function generateStaticParams() {
  return [
    { slug: 'hello-world' },
    { slug: 'next-js-rocks' },
    { slug: 'dynamic-title' },
  ];
}

function titleize(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Metadata built from the route param.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = titleize(slug);
  return {
    title,
    description: `A page whose metadata was generated for "${slug}".`,
    openGraph: {
      title,
      images: [`/api/og?title=${encodeURIComponent(title)}`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titleize(slug);

  return (
    <Boundary label="generate/[slug]/page.tsx (Server Environment)" color="violet">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-400">
            slug = &quot;{slug}&quot;
          </span>
          <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        </div>

        <div className="rounded-lg border border-violet-900/50 bg-violet-950/20 p-4">
          <p className="text-sm text-gray-300">
            The <strong className="text-gray-100">browser tab</strong> now reads{' '}
            <code className="font-mono text-violet-300">
              {title} | Next.js Playground
            </code>{' '}
            — <code className="font-mono text-gray-400">generateMetadata</code>{' '}
            derived the title from the{' '}
            <code className="font-mono text-gray-400">slug</code> param. Its
            Open Graph image URL was also built from the same value.
          </p>
        </div>

        <Link
          href="/metadata/generate"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back to samples
        </Link>
      </div>
    </Boundary>
  );
}

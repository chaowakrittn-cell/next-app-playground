import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Revalidating',
  openGraph: {
    title: 'Revalidating',
    images: ['/api/og?title=Revalidating'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Boundary
      label="layout.tsx (Server Environment)"
      kind="solid"
      animateRerendering={false}
      className="flex flex-col gap-9"
    >
      <Tabs
        basePath="/revalidating"
        items={[
          { text: 'Home' },
          { text: 'cacheLife (time-based)', slug: 'cache-life' },
          { text: 'Tags (on-demand)', slug: 'tags' },
        ]}
      />
      {children}
    </Boundary>
  );
}

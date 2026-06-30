import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Prefetching',
  openGraph: {
    title: 'Prefetching',
    images: ['/api/og?title=Prefetching'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Boundary
      label="layout.tsx"
      kind="solid"
      animateRerendering={false}
      className="flex flex-col gap-9"
    >
      <Tabs
        basePath="/prefetching"
        items={[
          { text: 'Home' },
          { text: 'Link vs Anchor', slug: 'link-vs-anchor' },
          { text: 'Static', slug: 'static' },
          { text: 'Dynamic', slug: 'dynamic' },
          { text: 'Dynamic + Loading', slug: 'dynamic-with-loading' },
          { text: 'Viewport', slug: 'viewport' },
        ]}
      />
      {children}
    </Boundary>
  );
}

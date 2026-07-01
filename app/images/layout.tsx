import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Image Optimization',
  openGraph: {
    title: 'Image Optimization',
    images: ['/api/og?title=Image Optimization'],
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
        basePath="/images"
        items={[
          { text: 'Home' },
          { text: 'Optimization', slug: 'optimization' },
          { text: 'Local', slug: 'local' },
          { text: 'fill & sizes', slug: 'fill' },
          { text: 'Remote', slug: 'remote' },
          { text: 'Loaders & Trade-offs', slug: 'loaders' },
        ]}
      />
      {children}
    </Boundary>
  );
}

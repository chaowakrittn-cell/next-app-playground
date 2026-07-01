import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  // A title template applies only to the *immediate* child segment. Because
  // this layout's pages are grandchildren of the root, we re-declare the
  // template here so pages like /metadata/static get the suffix too.
  title: {
    default: 'Metadata & OG Images',
    template: '%s | Next.js Playground',
  },
  openGraph: {
    title: 'Metadata & OG Images',
    images: ['/api/og?title=Metadata and OG Images'],
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
        basePath="/metadata"
        items={[
          { text: 'Home' },
          { text: 'Static', slug: 'static' },
          { text: 'generateMetadata', slug: 'generate' },
          { text: 'OG Image', slug: 'og' },
        ]}
      />
      {children}
    </Boundary>
  );
}

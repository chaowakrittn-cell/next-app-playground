import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Route Handlers',
    template: '%s | Next.js Playground',
  },
  openGraph: {
    title: 'Route Handlers',
    images: ['/api/og?title=Route Handlers'],
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
        basePath="/route-handlers"
        items={[
          { text: 'Home' },
          { text: 'Methods & Params', slug: 'methods' },
          { text: 'Dynamic Segment', slug: 'dynamic' },
          { text: 'Caching', slug: 'caching' },
        ]}
      />
      {children}
    </Boundary>
  );
}

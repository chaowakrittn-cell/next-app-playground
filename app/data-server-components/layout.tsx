import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Fetching Data: Server Components',
  openGraph: {
    title: 'Fetching Data: Server Components',
    images: ['/api/og?title=Fetching with Server Components'],
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
        basePath="/data-server-components"
        items={[
          { text: 'Home' },
          { text: 'Sequential vs Parallel', slug: 'sequential-vs-parallel' },
          { text: 'Memoization', slug: 'memoization' },
        ]}
      />
      {children}
    </Boundary>
  );
}

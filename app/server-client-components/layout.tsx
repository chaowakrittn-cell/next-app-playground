import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Server and Client Components',
  openGraph: {
    title: 'Server and Client Components',
    images: ['/api/og?title=Server and Client Components'],
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
        basePath="/server-client-components"
        items={[
          { text: 'Home' },
          { text: "'use client'", slug: 'use-client' },
          { text: 'Passing Data', slug: 'passing-data' },
          { text: 'Interleaving', slug: 'interleaving' },
          { text: 'Context', slug: 'context' },
          { text: 'Env Poisoning', slug: 'environment-poisoning' },
        ]}
      />
      {children}
    </Boundary>
  );
}

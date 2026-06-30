import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Fetching Data: Streaming',
  openGraph: {
    title: 'Fetching Data: Streaming',
    images: ['/api/og?title=Streaming Data'],
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
        basePath="/data-streaming"
        items={[
          { text: 'Home' },
          { text: 'With loading.js', slug: 'with-loading' },
          { text: 'With Suspense', slug: 'with-suspense' },
        ]}
      />
      {children}
    </Boundary>
  );
}

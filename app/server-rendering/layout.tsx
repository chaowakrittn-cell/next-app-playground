import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Server Rendering',
  openGraph: {
    title: 'Server Rendering',
    images: ['/api/og?title=Server Rendering'],
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
        basePath="/server-rendering"
        items={[
          { text: 'Home' },
          { text: 'Prerendered', slug: 'prerendered' },
          { text: 'Dynamic', slug: 'dynamic' },
          { text: 'generateStaticParams', slug: 'static-params' },
        ]}
      />
      {children}
    </Boundary>
  );
}

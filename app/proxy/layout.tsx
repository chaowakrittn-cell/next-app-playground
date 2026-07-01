import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Proxy (Middleware)',
    template: '%s | Next.js Playground',
  },
  openGraph: {
    title: 'Proxy (Middleware)',
    images: ['/api/og?title=Proxy'],
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
        basePath="/proxy"
        items={[
          { text: 'Home' },
          { text: 'Modify Headers', slug: 'headers' },
          { text: 'Redirect', slug: 'redirect' },
          { text: 'Rewrite', slug: 'rewrite' },
        ]}
      />
      {children}
    </Boundary>
  );
}

import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Font Optimization',
  openGraph: {
    title: 'Font Optimization',
    images: ['/api/og?title=Font Optimization'],
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
        basePath="/fonts"
        items={[
          { text: 'Home' },
          { text: 'What it does', slug: 'optimization' },
          { text: 'Google Fonts', slug: 'google' },
          { text: 'CSS Variables', slug: 'variables' },
          { text: 'Local Fonts', slug: 'local' },
        ]}
      />
      {children}
    </Boundary>
  );
}

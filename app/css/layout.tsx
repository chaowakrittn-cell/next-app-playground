import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CSS',
  openGraph: {
    title: 'CSS',
    images: ['/api/og?title=CSS'],
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
        basePath="/css"
        items={[
          { text: 'Home' },
          { text: 'CSS Modules', slug: 'css-modules' },
          { text: 'Tailwind', slug: 'tailwind' },
          { text: 'Ordering & Global', slug: 'ordering' },
        ]}
      />
      {children}
    </Boundary>
  );
}

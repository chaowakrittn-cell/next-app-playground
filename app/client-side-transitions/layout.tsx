import { Boundary } from '#/ui/boundary';
import { ClickCounter } from '#/ui/click-counter';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Client-side Transitions',
  openGraph: {
    title: 'Client-side Transitions',
    images: ['/api/og?title=Client-side Transitions'],
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
      <div className="flex items-start justify-between gap-4">
        <Tabs
          basePath="/client-side-transitions"
          items={[
            { text: 'Home' },
            { text: 'Compare', slug: 'compare' },
            { text: 'Scroll to Top', slug: 'scroll-to-top' },
            { text: 'Scroll Restore', slug: 'scroll-restore' },
          ]}
        />
        <div className="shrink-0">
          <ClickCounter />
        </div>
      </div>

      {children}
    </Boundary>
  );
}

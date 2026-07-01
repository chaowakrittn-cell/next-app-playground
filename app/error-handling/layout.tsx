import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Error Handling',
  openGraph: {
    title: 'Error Handling',
    images: ['/api/og?title=Error Handling'],
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
        basePath="/error-handling"
        items={[
          { text: 'Home' },
          { text: 'Expected (Server Action)', slug: 'expected' },
          { text: 'Uncaught (error.tsx)', slug: 'uncaught' },
          { text: 'Event Handler', slug: 'event-handler' },
        ]}
      />
      {children}
    </Boundary>
  );
}

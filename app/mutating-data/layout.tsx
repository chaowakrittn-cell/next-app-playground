import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mutating Data',
  openGraph: {
    title: 'Mutating Data',
    images: ['/api/og?title=Mutating Data'],
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
        basePath="/mutating-data"
        items={[
          { text: 'Home' },
          { text: 'Form', slug: 'form' },
          { text: 'Event Handler', slug: 'event-handler' },
          { text: 'Pending State', slug: 'pending' },
          { text: 'revalidatePath', slug: 'revalidate' },
        ]}
      />
      {children}
    </Boundary>
  );
}

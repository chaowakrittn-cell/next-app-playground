import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Streaming',
  openGraph: {
    title: 'Streaming',
    images: ['/api/og?title=Streaming'],
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
        basePath="/streaming"
        items={[
          { text: 'Home' },
          { text: 'Without Streaming', slug: 'without-streaming' },
          { text: 'With loading.tsx', slug: 'with-loading' },
          { text: 'With Suspense', slug: 'with-suspense' },
        ]}
      />
      {children}
    </Boundary>
  );
}

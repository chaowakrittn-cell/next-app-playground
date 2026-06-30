import { Boundary } from '#/ui/boundary';
import { Tabs } from '#/ui/tabs';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Fetching Data: Client Components',
  openGraph: {
    title: 'Fetching Data: Client Components',
    images: ['/api/og?title=Fetching with Client Components'],
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
        basePath="/data-client-components"
        items={[
          { text: 'Home' },
          { text: 'use API', slug: 'use-api' },
          { text: 'useEffect', slug: 'use-effect' },
          { text: 'useSWR', slug: 'use-swr' },
        ]}
      />
      {children}
    </Boundary>
  );
}

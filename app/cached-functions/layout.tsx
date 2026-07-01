import { Metadata } from 'next';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { Mdx } from '#/ui/codehike';
import { Tabs } from '#/ui/tabs';
import React from 'react';
import readme from './readme.mdx';

export async function generateMetadata(): Promise<Metadata> {
  const demo = db.demo.find({ where: { slug: 'cached-functions' } });

  return {
    title: demo.name,
    openGraph: { title: demo.name, images: [`/api/og?title=${demo.name}`] },
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Boundary label="Demo" kind="solid" animateRerendering={false}>
        <Mdx source={readme} collapsed={true} />
      </Boundary>

      <Boundary
        label="layout.tsx (statically inferred)"
        kind="solid"
        animateRerendering={false}
        className="flex flex-col gap-9"
      >
        <Tabs
          basePath="/cached-functions"
          items={[
            { text: 'Cached Function' },
            { text: 'Cached vs Not', slug: 'compare' },
          ]}
        />
        {children}
      </Boundary>
    </>
  );
}

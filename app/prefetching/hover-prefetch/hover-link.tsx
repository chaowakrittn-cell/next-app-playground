'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function HoverPrefetchLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={() => router.prefetch(href)}
      className={className}
    >
      {children}
    </Link>
  );
}

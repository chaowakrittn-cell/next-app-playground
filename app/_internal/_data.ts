// This is a mock database used to simplify parts of the app not
// relevant to the demo. In a real app, this data would live in
// a relational database like PostgreSQL or MySQL, accessed through
// a database client or ORM.

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
};

export type Section = {
  id: string;
  name: string;
  slug: string;
  categories: string[];
};

export type Category = {
  id: string;
  name: string;
  section: string;
  slug: string;
  products: string[];
};

export type Demo = {
  slug: string;
  name: string;
  nav_title?: string;
  description: string;
};

export type DemoCategory = { name: string; items: Demo[] };

const sections: Section[] = [
  { id: '1', name: 'Clothing', slug: 'clothing', categories: ['1', '2', '3'] },
  {
    id: '2',
    name: 'Electronics',
    slug: 'electronics',
    categories: ['4', '5', '6'],
  },
  { id: '3', name: 'Sports', slug: 'sports', categories: ['7', '8', '9'] },
];

const categories: Category[] = [
  { id: '1', name: 'Tops', slug: 'tops', section: '1', products: ['1'] },
  { id: '2', name: 'Shorts', slug: 'shorts', section: '1', products: ['2'] },
  { id: '3', name: 'Shoes', slug: 'shoes', section: '1', products: ['3'] },
  { id: '4', name: 'Phones', slug: 'phones', section: '2', products: ['4'] },
  { id: '5', name: 'Laptops', slug: 'laptops', section: '2', products: ['5'] },
  { id: '6', name: 'Tablets', slug: 'tablets', section: '2', products: ['6'] },
  { id: '7', name: 'Balls', slug: 'balls', section: '3', products: ['7'] },
  {
    id: '8',
    name: 'Equipment',
    slug: 'equipment',
    section: '3',
    products: ['8'],
  },
  {
    id: '9',
    name: 'Accessories',
    slug: 'accessories',
    section: '3',
    products: ['9'],
  },
];

const products: Product[] = [
  { id: '1', name: 'Top', image: 'top.png', category: '1', price: 29.99 },
  { id: '2', name: 'Shorts', image: 'shorts.png', category: '2', price: 39.99 },
  { id: '3', name: 'Shoes', image: 'shoes.png', category: '3', price: 89.99 },

  { id: '4', name: 'Phone', image: 'phone.png', category: '4', price: 699.99 },
  {
    id: '5',
    name: 'Laptop',
    image: 'laptop.png',
    category: '5',
    price: 1299.99,
  },
  {
    id: '6',
    name: 'Tablet',
    image: 'tablet.png',
    category: '6',
    price: 499.99,
  },
  {
    id: '7',
    name: 'Basketball',
    image: 'balls.png',
    category: '7',
    price: 24.99,
  },
  {
    id: '8',
    name: 'Weights',
    image: 'weights.png',
    category: '8',
    price: 149.99,
  },
  { id: '9', name: 'Gloves', image: 'gloves.png', category: '9', price: 19.99 },
];

const demos = [
  {
    name: 'Layouts',
    items: [
      {
        slug: 'layouts',
        name: 'Nested Layouts',
        description: 'Create UI that is shared across routes',
      },
      {
        slug: 'route-groups',
        name: 'Route Groups',
        description: 'Organize routes without affecting URL paths',
      },
      {
        slug: 'parallel-routes',
        name: 'Parallel Routes',
        description: 'Render multiple pages in the same layout',
      },
    ],
  },
  {
    name: 'Linking and Navigating',
    items: [
      {
        slug: 'server-rendering',
        name: 'Server Rendering',
        description: 'Render pages on the server for fast initial loads',
      },
      {
        slug: 'prefetching',
        name: 'Prefetching',
        description: 'Prefetch routes in the background before they are visited',
      },
      {
        slug: 'streaming',
        name: 'Streaming',
        description: 'Stream UI from the server to the client progressively',
      },
      {
        slug: 'client-side-transitions',
        name: 'Client-side Transitions',
        description: 'Navigate between routes without a full page reload',
      },
    ],
  },
  {
    name: 'Server and Client Components',
    items: [
      {
        slug: 'server-client-components',
        name: 'Server and Client Components',
        nav_title: 'Server & Client',
        description:
          'Render on the server by default, then layer in interactivity with Client Components',
      },
    ],
  },
  {
    name: 'Fetching Data',
    items: [
      {
        slug: 'data-server-components',
        name: 'Server Components',
        nav_title: 'Fetch: Server',
        description: 'Fetch data on the server with the fetch API or an ORM',
      },
      {
        slug: 'data-streaming',
        name: 'Streaming',
        nav_title: 'Fetch: Streaming',
        description:
          'Progressively stream data-dependent UI with loading.js and Suspense',
      },
      {
        slug: 'data-client-components',
        name: 'Client Components',
        nav_title: 'Fetch: Client',
        description: 'Fetch data in the browser with the use API or useEffect',
      },
    ],
  },
  {
    name: 'Mutating Data',
    items: [
      {
        slug: 'mutating-data',
        name: 'Server Functions',
        nav_title: 'Mutations',
        description:
          'Mutate data with Server Functions invoked from forms, event handlers, and useEffect',
      },
    ],
  },
  {
    name: 'File Conventions',
    items: [
      {
        slug: 'loading',
        name: 'Loading',
        description:
          'Create meaningful Loading UI for specific parts of an app',
      },
      {
        slug: 'error',
        name: 'Error',
        description: 'Create Error UI for specific parts of an app',
      },
      {
        slug: 'not-found',
        name: 'Not Found',
        description: 'Create Not Found UI for specific parts of an app',
      },
    ],
  },
  {
    name: 'Error Handling',
    items: [
      {
        slug: 'error-handling',
        name: 'Error Handling',
        nav_title: 'Error Handling',
        description:
          'Handle expected errors as return values and uncaught exceptions with error boundaries',
      },
    ],
  },
  {
    name: 'Caching',
    items: [
      {
        slug: 'cached-routes',
        name: 'Cached Route Segments',
        nav_title: 'Cached Routes',
        description: 'Cache the rendered output of a route segment',
      },
      {
        slug: 'cached-components',
        name: 'Cached React Server Components',
        nav_title: 'Cached Components',
        description:
          'Cache the rendered output of an individual React Server Component',
      },
      {
        slug: 'cached-functions',
        name: 'Cached Functions',
        description: 'Cache the computed result of a regular function',
      },
      {
        slug: 'remote-cache',
        name: 'Remote Cache',
        description:
          'Cache data at runtime with use cache: remote in dynamic contexts',
      },
      {
        slug: 'app-shell-upgrading',
        name: 'App Shell Upgrading',
        description:
          'Navigate instantly to pages that have never been rendered before, then self-upgrade to fully static after the first visit',
      },
      {
        slug: 'partial-prerendering',
        name: 'Partial Prerendering',
        nav_title: 'PPR',
        description:
          'Compose static, cached, and streamed UI into one partially prerendered page',
      },
      {
        slug: 'non-deterministic',
        name: 'Non-deterministic Values',
        nav_title: 'Non-deterministic',
        description:
          'Handle Math.random, Date, and crypto with connection() or use cache',
      },
    ],
  },
  {
    name: 'Revalidating',
    items: [
      {
        slug: 'revalidating',
        name: 'Revalidating',
        nav_title: 'Revalidating',
        description:
          'Keep cached data fresh with time-based cacheLife and on-demand tags',
      },
    ],
  },
  {
    name: 'APIs',
    items: [
      {
        slug: 'use-link-status',
        name: 'useLinkStatus',
        description: 'Create inline visual feedback for link interactions',
      },
    ],
  },
  {
    name: 'CSS',
    items: [
      {
        slug: 'css',
        name: 'CSS',
        nav_title: 'CSS',
        description:
          'Style with Tailwind, CSS Modules, and global CSS — and how import order affects them',
      },
    ],
  },
  {
    name: 'Images',
    items: [
      {
        slug: 'images',
        name: 'Image Optimization',
        nav_title: 'Images',
        description:
          'Optimize images with next/image — local, static import with blur, fill, and remote',
      },
    ],
  },
  {
    name: 'Fonts',
    items: [
      {
        slug: 'fonts',
        name: 'Font Optimization',
        nav_title: 'Fonts',
        description:
          'Self-host and optimize Google and local fonts with next/font — no layout shift',
      },
    ],
  },
  {
    name: 'Metadata',
    items: [
      {
        slug: 'metadata',
        name: 'Metadata & OG Images',
        nav_title: 'Metadata',
        description:
          'Static metadata, generateMetadata, and dynamic OG images with ImageResponse',
      },
    ],
  },
  {
    name: 'Route Handlers',
    items: [
      {
        slug: 'route-handlers',
        name: 'Route Handlers',
        nav_title: 'Route Handlers',
        description:
          'Build API endpoints with route.ts — methods, params, dynamic segments, and caching',
      },
    ],
  },
  {
    name: 'Proxy',
    items: [
      {
        slug: 'proxy',
        name: 'Proxy (Middleware)',
        nav_title: 'Proxy',
        description:
          'Run code before a request with proxy.ts — redirect, rewrite, and modify headers',
      },
    ],
  },
  {
    name: 'Misc',
    items: [
      {
        slug: 'view-transitions',
        name: 'View Transitions',
        description:
          'Use animations to help users understand the relationship between the two views',
      },
      {
        slug: 'context',
        name: 'Client Context',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
      },
    ],
  },
] as const satisfies DemoCategory[];

export type DemoSlug = (typeof demos)[number]['items'][number]['slug'];

export const data = { sections, categories, products, demos };

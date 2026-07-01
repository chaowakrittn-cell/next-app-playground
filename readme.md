# Next.js Playground

This playground is used by the DX team to explore, test, and demo new Next.js features. It serves as a starting point for writing documentation and helps us understand features, identify bugs, and provide feedback to the Next.js team.

## Running Locally

1. Install dependencies:

```sh
pnpm install
```

2. Start the dev server:

```sh
pnpm dev
```

## Production Build

Some demos — especially caching, revalidating, and Partial Prerendering
(`use cache`, `cacheLife`, `generateStaticParams`, App Shell Upgrading) — only
behave correctly in a production build. In `pnpm dev`, prerendering is skipped
and every request re-renders, so cached values won't stay frozen and build-time
logs won't fire.

To see the real behavior, build and start the app:

```sh
pnpm build
pnpm start
```

`pnpm build` also prints how each route is rendered — `○` (Static),
`◐` (Partial Prerender), or `ƒ` (Dynamic) — which is useful for verifying the
caching demos.

## Documentation

https://nextjs.org/docs

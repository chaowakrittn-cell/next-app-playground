import { Boundary } from '#/ui/boundary';

export default function Loading() {
  return (
    <Boundary label="loading.tsx" color="violet">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-48 animate-pulse rounded bg-violet-900/50" />
          <div className="flex flex-col gap-2">
            <div className="h-2.5 w-full animate-pulse rounded bg-gray-800" />
            <div className="h-2.5 w-4/5 animate-pulse rounded bg-gray-800" />
            <div className="h-2.5 w-3/5 animate-pulse rounded bg-gray-800" />
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4">
          <div className="h-2.5 w-24 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-56 animate-pulse rounded bg-violet-900/50" />
          <div className="h-2.5 w-4/5 animate-pulse rounded bg-gray-800" />
        </div>
      </div>
    </Boundary>
  );
}

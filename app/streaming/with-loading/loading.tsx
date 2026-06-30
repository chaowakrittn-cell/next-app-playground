import { Boundary } from '#/ui/boundary';

export default function Loading() {
  return (
    <Boundary label="loading.tsx" color="blue">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="h-3 w-32 animate-pulse rounded bg-blue-900/50" />
          <div className="h-2.5 w-full animate-pulse rounded bg-gray-800" />
          <div className="h-2.5 w-4/5 animate-pulse rounded bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {[500, 1000, 1500].map((delay) => (
            <div
              key={delay}
              className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-12 animate-pulse rounded bg-gray-700" />
                <div className="h-3 w-10 animate-pulse rounded bg-gray-800" />
              </div>
              <div className="h-2.5 w-full animate-pulse rounded bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}

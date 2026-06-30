import { Boundary } from '#/ui/boundary';

export default function Loading() {
  return (
    <Boundary label="loading.tsx (Server Environment)" color="blue">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="h-3 w-48 animate-pulse rounded bg-blue-900/50" />
          <div className="h-2.5 w-72 animate-pulse rounded bg-gray-800" />
        </div>
        <ul className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3"
            >
              <div className="h-3 w-40 animate-pulse rounded bg-gray-800" />
              <div className="h-2.5 w-56 animate-pulse rounded bg-gray-800" />
            </li>
          ))}
        </ul>
      </div>
    </Boundary>
  );
}

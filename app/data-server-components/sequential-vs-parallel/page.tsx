import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

// Forced dynamic so the timings are measured fresh on every request.
export const instant = false;

async function getArtist() {
  await new Promise((r) => setTimeout(r, 500));
  return { id: 'a1', name: 'Aphex Twin' };
}

async function getAlbums() {
  await new Promise((r) => setTimeout(r, 700));
  return ['Selected Ambient Works', 'Drukqs', 'Syro'];
}

export default async function Page() {
  await connection();

  // Sequential: getAlbums only starts after getArtist resolves → ~1200ms.
  const seqStart = performance.now();
  const artistSeq = await getArtist();
  const albumsSeq = await getAlbums();
  const seqMs = Math.round(performance.now() - seqStart);

  // Parallel: both requests start immediately, await together → ~700ms.
  const parStart = performance.now();
  const artistData = getArtist();
  const albumsData = getAlbums();
  const [artistPar, albumsPar] = await Promise.all([artistData, albumsData]);
  const parMs = Math.round(performance.now() - parStart);

  return (
    <Boundary label="sequential-vs-parallel/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Within a component, multiple{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            await
          </code>
          s run one after another. If the requests don&apos;t depend on each
          other, start them together and await with{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            Promise.all
          </code>{' '}
          to avoid a waterfall.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-pink-900/50 bg-pink-950/20 p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-pink-400">
                Sequential
              </span>
              <span className="font-mono text-sm tabular-nums text-pink-300">
                {seqMs}ms
              </span>
            </div>
            <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-xs leading-6 text-gray-400">
{`const artist = await getArtist()  // 500ms
const albums = await getAlbums()  // +700ms`}
            </pre>
            <p className="text-xs text-gray-500">
              {artistSeq.name} · {albumsSeq.length} albums. The two waits stack:
              500 + 700 ≈ 1200ms.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-green-900/50 bg-green-950/20 p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-green-400">
                Parallel
              </span>
              <span className="font-mono text-sm tabular-nums text-green-300">
                {parMs}ms
              </span>
            </div>
            <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-xs leading-6 text-gray-400">
{`const a = getArtist()   // starts now
const b = getAlbums()   // starts now
await Promise.all([a, b])`}
            </pre>
            <p className="text-xs text-gray-500">
              {artistPar.name} · {albumsPar.length} albums. Both run at once:
              max(500, 700) ≈ 700ms.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Note:</span> use the
            sequential pattern only when one request genuinely{' '}
            <em>depends</em> on the result of another. With{' '}
            <code className="font-mono text-gray-400">Promise.all</code>, if one
            request fails the whole call rejects — use{' '}
            <code className="font-mono text-gray-400">Promise.allSettled</code>{' '}
            if you need partial results.
          </p>
        </div>
      </div>
    </Boundary>
  );
}

import 'server-only';

export type Post = { id: string; title: string; excerpt: string };

const POSTS: Post[] = [
  { id: '1', title: 'Rendering on the server', excerpt: 'Why the server is a great default.' },
  { id: '2', title: 'Streaming, explained', excerpt: 'Send UI in chunks as it is ready.' },
  { id: '3', title: 'Suspense boundaries', excerpt: 'Granular control over loading UI.' },
];

const COMMENTS = ['Great read!', 'Very helpful, thanks.', 'Bookmarked.'];

export async function getPosts(delayMs = 1200): Promise<Post[]> {
  await new Promise((r) => setTimeout(r, delayMs));
  return POSTS;
}

export async function getComments(delayMs = 2200): Promise<string[]> {
  await new Promise((r) => setTimeout(r, delayMs));
  return COMMENTS;
}

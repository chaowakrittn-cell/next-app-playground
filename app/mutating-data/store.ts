import 'server-only';

// A tiny in-memory store standing in for a database, so the mutation demos
// have something real to change. State lives in the server process — it resets
// when the dev server restarts and isn't shared across serverless instances.
export type Message = { id: string; text: string };

let messages: Message[] = [
  { id: '1', text: 'Server Functions run on the server.' },
  { id: '2', text: 'Invoke them from forms or event handlers.' },
];
let nextId = 3;
let likes = 0;

export function getMessages(): Message[] {
  return messages;
}

export function addMessage(text: string) {
  messages = [...messages, { id: String(nextId++), text }];
}

export function removeMessage(id: string) {
  messages = messages.filter((m) => m.id !== id);
}

export function getLikes(): number {
  return likes;
}

export function incrementLikes(): number {
  likes += 1;
  return likes;
}

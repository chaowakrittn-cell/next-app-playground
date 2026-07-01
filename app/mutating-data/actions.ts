'use server';

import { revalidatePath } from 'next/cache';
import {
  addMessage,
  incrementLikes,
  removeMessage as removeFromStore,
} from './store';

// A file with 'use server' at the top marks every export as a Server Function.
// These run only on the server and are callable from Client Components.

// Invoked by a <form action={...}> — receives FormData automatically.
export async function createMessage(formData: FormData) {
  const text = String(formData.get('text') ?? '').trim();
  if (!text) return;

  // Simulate server work so the pending state is visible.
  await new Promise((r) => setTimeout(r, 700));
  addMessage(text);

  // Revalidate so the list re-renders with the new data.
  revalidatePath('/mutating-data/form');
}

export async function removeMessage(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  removeFromStore(id);
  revalidatePath('/mutating-data/form');
}

// Invoked from an onClick handler — returns the new value to the client.
export async function likePost(): Promise<number> {
  await new Promise((r) => setTimeout(r, 400));
  return incrementLikes();
}

// Used with useActionState — receives (prevState, formData) and returns state.
export type SubscribeState = { status: 'idle' | 'success' | 'error'; message: string };

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get('email') ?? '').trim();
  await new Promise((r) => setTimeout(r, 1000));

  if (!email.includes('@')) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }
  return { status: 'success', message: `Subscribed ${email}!` };
}

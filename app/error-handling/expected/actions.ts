'use server';

export type FormState = { message: string; ok?: boolean };

// Expected errors are modeled as RETURN VALUES — no try/catch, no throw.
export async function createPost(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = String(formData.get('title') ?? '').trim();

  await new Promise((r) => setTimeout(r, 600));

  if (title.length < 3) {
    return { message: 'Title must be at least 3 characters.' };
  }
  if (title.toLowerCase() === 'error') {
    return { message: 'That title is reserved — pick another.' };
  }

  return { message: `Created "${title}"!`, ok: true };
}

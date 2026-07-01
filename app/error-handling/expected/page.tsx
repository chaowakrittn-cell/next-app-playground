import { Boundary } from '#/ui/boundary';
import { Form } from './form';

export default function Page() {
  return (
    <Boundary label="expected/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          For expected errors like form validation,{' '}
          <strong className="text-gray-100">don&apos;t throw</strong>. Return
          the error from the Server Action as a value, and read it with{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            useActionState
          </code>{' '}
          to show a message. Throwing would trip the error boundary — wrong tool
          for a routine, recoverable problem.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// actions.ts — return the error, don't throw
export async function createPost(prev, formData) {
  'use server'
  if (!valid) return { message: 'Failed to create post' }
}

// form.tsx
const [state, formAction, pending] = useActionState(createPost, { message: '' })
{state.message && <p aria-live="polite">{state.message}</p>}`}
        </pre>

        <Boundary
          label="form.tsx (Client Environment)"
          color="blue"
          animateRerendering={false}
        >
          <Form />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Try it:</span> submit
            with fewer than 3 characters or the word{' '}
            <code className="font-mono text-gray-400">error</code> to see a
            returned error message; submit a valid title for the success state.
            No exception is ever thrown.
          </p>
        </div>
      </div>
    </Boundary>
  );
}

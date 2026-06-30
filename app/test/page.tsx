import { TestInput } from './test-input';

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-200">Test</h1>
        <p className="mt-1 text-sm text-gray-500">Free text input playground</p>
      </div>
      <TestInput />
    </div>
  );
}

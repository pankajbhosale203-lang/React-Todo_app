import { useState } from 'react';

export function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setErrorMessage('Please enter a task description before adding.');
      return;
    }

    const success = onAddTodo(trimmed);
    if (success) {
      setTitle('');
      setErrorMessage('');
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <label htmlFor="todo-input" className="sr-only">
            Add a new task
          </label>
          <input
            id="todo-input"
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            aria-invalid={errorMessage ? 'true' : 'false'}
            aria-describedby={errorMessage ? 'todo-error' : undefined}
            className={`w-full px-4 py-3 rounded-xl border text-slate-900 bg-white shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errorMessage
                ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-indigo-100 focus:border-indigo-500'
            }`}
          />
        </div>

        <button
          type="submit"
          aria-label="Add task"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      {errorMessage && (
        <p
          id="todo-error"
          role="alert"
          className="mt-2 text-sm text-rose-600 flex items-center gap-1.5 font-medium animate-fadeIn"
        >
          <svg
            className="w-4 h-4 shrink-0 text-rose-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMessage}
        </p>
      )}
    </form>
  );
}

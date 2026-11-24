import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos.js';
import { TodoForm } from './components/TodoForm.jsx';
import { TodoList } from './components/TodoList.jsx';
import { TodoStats } from './components/TodoStats.jsx';

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo, clearCompleted, stats } = useTodos();
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-indigo-50/30 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* App Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-200">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Task Tracker
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Manage your daily goals, track progress, and stay organized.
          </p>
        </header>

        {/* Main Card Container */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-5 sm:p-7">
          {/* Add Todo Form */}
          <TodoForm onAddTodo={addTodo} />

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            currentFilter={filter}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />

          {/* Stats, Filters & Clear Completed */}
          <TodoStats
            stats={stats}
            currentFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Footer tips */}
        <footer className="mt-8 text-center text-xs text-slate-400 space-y-1">
          <p>
            Tip: Double-click a task title or click the edit icon to make quick inline edits.
          </p>
          <p>
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">Enter</kbd> to save or <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">Esc</kbd> to cancel.
          </p>
        </footer>
      </div>
    </main>
  );
}

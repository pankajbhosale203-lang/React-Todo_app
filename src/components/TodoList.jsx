import { TodoItem } from './TodoItem.jsx';

export function TodoList({ todos, currentFilter, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-700">
          {currentFilter === 'all'
            ? 'No tasks yet'
            : currentFilter === 'active'
            ? 'No active tasks'
            : 'No completed tasks'}
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">
          {currentFilter === 'all'
            ? 'Add a new task above to organize your day and stay productive.'
            : currentFilter === 'active'
            ? 'All tasks have been completed! Great job!'
            : 'Tasks marked as completed will appear here.'}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5 my-4" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

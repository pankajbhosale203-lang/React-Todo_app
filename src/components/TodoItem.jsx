import { useState, useRef, useEffect } from 'react';

export function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const editInputRef = useRef(null);

  // Focus and select the text when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditText(todo.title);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.title) {
      onUpdate(todo.id, trimmed);
    } else {
      // Revert if empty or unchanged
      setEditText(todo.title);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  return (
    <li
      className={`group flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 ${
        todo.completed
          ? 'bg-slate-50/70 border-slate-200/70 text-slate-400'
          : 'bg-white border-slate-200 shadow-xs hover:border-indigo-200 hover:shadow-sm text-slate-800'
      }`}
    >
      {/* Checkbox & Title or Inline Edit Input */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <label className="relative flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            className="peer sr-only"
          />
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-300 bg-white hover:border-indigo-400 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400'
            }`}
          >
            {todo.completed && (
              <svg
                className="w-3.5 h-3.5 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </label>

        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
            className="w-full px-2.5 py-1 text-slate-900 bg-white border border-indigo-400 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm sm:text-base"
          />
        ) : (
          <span
            onDoubleClick={handleStartEdit}
            title="Double-click to edit"
            className={`truncate cursor-pointer select-none text-sm sm:text-base transition-colors ${
              todo.completed
                ? 'line-through text-slate-400'
                : 'text-slate-800 font-medium'
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            aria-label={`Edit "${todo.title}"`}
            title="Edit task (or double click title)"
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.title}"`}
          title="Delete task"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </li>
  );
}

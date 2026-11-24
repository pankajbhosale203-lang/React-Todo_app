import { useState, useEffect } from 'react';

const STORAGE_KEY = 'react_todos_app_v1';

/**
 * Safely retrieve todos from localStorage.
 * Falls back to an empty array if JSON is corrupted, unavailable, or non-existent.
 */
function getStoredTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(item => 
        item &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.completed === 'boolean'
      );
    }
    return [];
  } catch (error) {
    console.warn('Failed to load todos from localStorage; resetting to empty state:', error);
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(getStoredTodos);

  // Sync todos state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todos]);

  /**
   * Adds a new todo item.
   * Creates the object with id: crypto.randomUUID(), title, completed: false, createdAt: Date.now().
   */
  const addTodo = (rawTitle) => {
    const trimmed = rawTitle ? rawTitle.trim() : '';
    if (!trimmed) {
      return false;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos(prev => [newTodo, ...prev]);
    return true;
  };

  /**
   * Toggles the completion status of a todo.
   */
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Updates the title of an existing todo.
   */
  const updateTodo = (id, newTitle) => {
    const trimmed = newTitle ? newTitle.trim() : '';
    if (!trimmed) {
      return false;
    }

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title: trimmed } : todo
      )
    );
    return true;
  };

  /**
   * Deletes a todo by its id.
   */
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  /**
   * Clears all completed todos.
   */
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const totalCount = todos.length;
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = totalCount - activeCount;

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    stats: {
      total: totalCount,
      active: activeCount,
      completed: completedCount,
    },
  };
}

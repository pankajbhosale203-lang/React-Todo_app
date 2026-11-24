export function TodoStats({ stats, currentFilter, onFilterChange, onClearCompleted }) {
  const { total, active, completed } = stats;

  if (total === 0) return null;

  const filters = [
    { id: 'all', label: 'All', count: total },
    { id: 'active', label: 'Active', count: active },
    { id: 'completed', label: 'Completed', count: completed },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 pb-1 border-t border-slate-200 text-sm text-slate-500">
      {/* Counts Summary */}
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-slate-800 font-semibold">{active}</span>
        <span>{active === 1 ? 'task remaining' : 'tasks remaining'}</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500">{total} total</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center p-1 bg-slate-100 rounded-lg">
        {filters.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onFilterChange(tab.id)}
            className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              currentFilter === tab.id
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Clear Completed */}
      <div>
        {completed > 0 ? (
          <button
            type="button"
            onClick={onClearCompleted}
            className="text-xs sm:text-sm text-slate-400 hover:text-rose-600 transition-colors cursor-pointer font-medium"
          >
            Clear completed
          </button>
        ) : (
          <span className="text-xs text-slate-400 hidden sm:inline">&nbsp;</span>
        )}
      </div>
    </div>
  );
}

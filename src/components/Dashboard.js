import React, { useState, useMemo, useEffect } from 'react';
import EntryCard from './EntryCard';
import { api } from '../services/api';

const Dashboard = () => {
  const [modalEntry, setModalEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'oldest'
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  // Fetch entries from the backend
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const data = await api.getEntries();
        setEntries(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError('Failed to load entries. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Get unique tags from all entries
  const allTags = useMemo(() => {
    const tags = new Set();
    entries.forEach(entry => {
      if (entry.tags) {
        entry.tags.split(',').forEach(tag => {
          const trimmedTag = tag.trim();
          if (trimmedTag) tags.add(trimmedTag);
        });
      }
    });
    return Array.from(tags).sort();
  }, [entries]);

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    let filtered = entries.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (entry.summary && entry.summary.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = !selectedTag || 
        (entry.tags && entry.tags.split(',').map(t => t.trim()).includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });

    // Sort entries
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [entries, searchTerm, selectedTag, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Developer Journal</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-600"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${!selectedTag 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                  ${selectedTag === tag 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map(entry => (
              <div
                key={entry.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <EntryCard entry={entry} onClick={() => setModalEntry(entry)} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">No entries found matching your criteria.</p>
              <p className="mt-2 text-gray-500 dark:text-gray-500 text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </>
      )}
    {/* Modal Popout */}
    {modalEntry && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setModalEntry(null)}>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold" onClick={() => setModalEntry(null)}>&times;</button>
          <EntryCard entry={modalEntry} isModal={true} onClose={() => setModalEntry(null)} />
        </div>
      </div>
    )}
  </div>
  );
};

export default Dashboard; 
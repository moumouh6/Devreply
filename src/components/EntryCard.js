import React, { useState, useEffect } from 'react';

const EntryCard = ({ entry, isModal = false, onClose, onClick }) => {
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModal) {
      setLoading(true);
      // Simulate AI call
      setTimeout(() => {
        setGeneratedAnswer('This is an AI-generated answer for: ' + (entry.question || entry.content || entry.title));
        setLoading(false);
      }, 1200);
    } else {
      setGeneratedAnswer('');
      setLoading(false);
    }
  }, [isModal, entry]);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(dateString);
  };

  // Parse tags from comma-separated string
  const tags = entry.tags ? entry.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${onClick && !isModal ? 'cursor-pointer' : ''}`}
      onClick={onClick && !isModal ? onClick : undefined}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{entry.title}</h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={entry.created_at}>{formatTimeAgo(entry.created_at)}</time>
            <span className="mx-2">•</span>
            <span>{tags.length} tags</span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <svg
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {isExpanded ? entry.content : entry.summary}
        </p>
        {!isExpanded && entry.content.length > entry.summary.length && (
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm font-medium"
          >
            Read more
          </button>
        )}
      </div>

      {/* Tip Section */}
      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <span className="text-indigo-600 dark:text-indigo-300 mr-2">💡</span>
          <div>
            <h4 className="text-sm font-medium text-indigo-600 dark:text-indigo-300 mb-1">Developer Tip</h4>
            {isModal && (
              loading ? (
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 text-sm">
                  Generating answer...
                </div>
              ) : (
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded text-green-800 dark:text-green-200 text-sm">
                  <strong>Answer:</strong> {generatedAnswer}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
          >
            <span className="mr-1">#</span>
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default EntryCard; 
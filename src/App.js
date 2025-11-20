import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NewEntryForm from './components/NewEntryForm';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { api } from './services/api';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              DevReplay
            </Link>
          </div>

          {/* Navigation Links and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive('/') 
                  ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Dashboard
            </Link>
            <Link
              to="/new"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive('/new') 
                  ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              New Entry
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App component
const App = () => {
  const handleNewEntry = async (entryData) => {
    try {
      // Convert tags array to comma-separated string for the API
      const entryToSubmit = {
        ...entryData,
        tags: entryData.tags.join(', '),
        tip: entryData.content.slice(0, 100) // Using first 100 chars as tip
      };
      
      await api.createEntry(entryToSubmit);
      return true; // Return true to indicate success
    } catch (error) {
      console.error('Error creating entry:', error);
      throw error; // Let the form component handle the error
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navigation />
        
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route 
              path="/new" 
              element={<NewEntryForm onSubmit={handleNewEntry} />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              DevReplay - Your Developer Journal
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;

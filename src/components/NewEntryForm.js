import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Tag mapping for suggestions
const tagMapping = {
  'react': ['React', 'JavaScript', 'Frontend', 'Web Development'],
  'javascript': ['JavaScript', 'Web Development', 'Frontend'],
  'typescript': ['TypeScript', 'JavaScript', 'Web Development'],
  'node': ['Node.js', 'Backend', 'JavaScript'],
  'python': ['Python', 'Backend', 'Programming'],
  'java': ['Java', 'Backend', 'Programming'],
  'debug': ['Debugging', 'Troubleshooting', 'Development'],
  'error': ['Error Handling', 'Debugging', 'Troubleshooting'],
  'api': ['API', 'Backend', 'Integration'],
  'database': ['Database', 'SQL', 'Backend'],
  'sql': ['SQL', 'Database', 'Backend'],
  'mongodb': ['MongoDB', 'Database', 'NoSQL'],
  'testing': ['Testing', 'QA', 'Development'],
  'deploy': ['Deployment', 'DevOps', 'CI/CD'],
  'git': ['Git', 'Version Control', 'Development'],
  'docker': ['Docker', 'DevOps', 'Containerization'],
  'aws': ['AWS', 'Cloud', 'DevOps'],
  'security': ['Security', 'Authentication', 'Authorization'],
  'performance': ['Performance', 'Optimization', 'Development'],
  'mobile': ['Mobile', 'React Native', 'Development'],
  'ui': ['UI', 'Design', 'Frontend'],
  'ux': ['UX', 'Design', 'Frontend'],
  'css': ['CSS', 'Styling', 'Frontend'],
  'html': ['HTML', 'Frontend', 'Web Development'],
  'responsive': ['Responsive Design', 'CSS', 'Frontend'],
  'accessibility': ['Accessibility', 'A11y', 'Frontend'],
  'seo': ['SEO', 'Marketing', 'Web Development'],
  'analytics': ['Analytics', 'Data', 'Tracking'],
  'authentication': ['Authentication', 'Security', 'Backend'],
  'authorization': ['Authorization', 'Security', 'Backend'],
  'caching': ['Caching', 'Performance', 'Backend'],
  'optimization': ['Optimization', 'Performance', 'Development'],
  'refactoring': ['Refactoring', 'Code Quality', 'Development'],
  'architecture': ['Architecture', 'Design Patterns', 'Development'],
  'design': ['Design Patterns', 'Architecture', 'Development'],
  'microservices': ['Microservices', 'Architecture', 'Backend'],
  'rest': ['REST', 'API', 'Backend'],
  'graphql': ['GraphQL', 'API', 'Backend'],
  'websocket': ['WebSocket', 'Real-time', 'Backend'],
  'state': ['State Management', 'Frontend', 'Development'],
  'redux': ['Redux', 'State Management', 'Frontend'],
  'context': ['Context API', 'State Management', 'React'],
  'hooks': ['React Hooks', 'React', 'Frontend'],
  'component': ['Components', 'React', 'Frontend'],
  'routing': ['Routing', 'Frontend', 'Navigation'],
  'form': ['Forms', 'Validation', 'Frontend'],
  'validation': ['Validation', 'Forms', 'Development'],
  'testing': ['Testing', 'Jest', 'Development'],
  'jest': ['Jest', 'Testing', 'Development'],
  'ci': ['CI/CD', 'DevOps', 'Automation'],
  'cd': ['CI/CD', 'DevOps', 'Automation'],
  'deployment': ['Deployment', 'DevOps', 'CI/CD'],
  'monitoring': ['Monitoring', 'DevOps', 'Observability'],
  'logging': ['Logging', 'Debugging', 'Development'],
  'error': ['Error Handling', 'Debugging', 'Development'],
  'security': ['Security', 'Authentication', 'Authorization'],
  'performance': ['Performance', 'Optimization', 'Development'],
  'scalability': ['Scalability', 'Architecture', 'Backend'],
  'maintenance': ['Maintenance', 'Code Quality', 'Development'],
  'documentation': ['Documentation', 'Development', 'Best Practices'],
  'code review': ['Code Review', 'Development', 'Best Practices'],
  'pair programming': ['Pair Programming', 'Development', 'Collaboration'],
  'agile': ['Agile', 'Methodology', 'Development'],
  'scrum': ['Scrum', 'Agile', 'Methodology'],
  'kanban': ['Kanban', 'Agile', 'Methodology'],
  'sprint': ['Sprint', 'Agile', 'Methodology'],
  'planning': ['Planning', 'Agile', 'Methodology'],
  'estimation': ['Estimation', 'Planning', 'Development'],
  'deadline': ['Deadline', 'Planning', 'Development'],
  'priority': ['Priority', 'Planning', 'Development'],
  'bug': ['Bug', 'Debugging', 'Development'],
  'feature': ['Feature', 'Development', 'Planning'],
  'enhancement': ['Enhancement', 'Development', 'Planning'],
  'refactor': ['Refactoring', 'Code Quality', 'Development'],
  'optimize': ['Optimization', 'Performance', 'Development']
};

const NewEntryForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState([]);

  // Function to get suggested tags based on title
  const getSuggestedTags = (title) => {
    const words = title.toLowerCase().split(' ');
    const suggestions = new Set();
    
    words.forEach(word => {
      if (tagMapping[word]) {
        tagMapping[word].forEach(tag => suggestions.add(tag));
      }
    });
    
    return Array.from(suggestions);
  };

  // Update suggested tags when title changes
  useEffect(() => {
    if (formData.title) {
      const suggestions = getSuggestedTags(formData.title);
      setSuggestedTags(suggestions);
    } else {
      setSuggestedTags([]);
    }
  }, [formData.title]);

  // Function to add a suggested tag
  const addSuggestedTag = (tag) => {
    const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
    if (!currentTags.includes(tag)) {
      const newTags = [...currentTags, tag].join(', ');
      setFormData(prev => ({ ...prev, tags: newTags }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }
    
    if (formData.tags.trim()) {
      const tags = formData.tags.split(',').map(tag => tag.trim());
      if (tags.some(tag => tag.length < 2)) {
        newErrors.tags = 'Each tag must be at least 2 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSuccess(false);
    
    try {
      // Convert comma-separated tags to array
      const tagsArray = formData.tags.split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      
      await onSubmit({
        ...formData,
        tags: tagsArray,
        createdAt: new Date().toISOString(),
        summary: formData.content.slice(0, 100) + '...' // Simple summary
      });
      
      setSuccess(true);
      setFormData({ title: '', content: '', tags: '' });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting entry:', error);
      setErrors({ submit: 'Failed to save entry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Journal Entry</h2>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-500 rounded-lg">
            <p className="text-green-600 dark:text-green-400">Entry saved successfully! Redirecting to dashboard...</p>
          </div>
        )}
        
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{errors.submit}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors
                ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="What's on your mind?"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className={`w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors
                ${errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="Write your thoughts here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors
                ${errors.tags ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="e.g., React, JavaScript, Debugging"
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags}</p>
            )}
          </div>

          {/* Suggested Tags */}
          {suggestedTags.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addSuggestedTag(tag)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEntryForm; 
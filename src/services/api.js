const API_URL = 'http://127.0.0.1:8000';

export const api = {
  // Get all entries
  async getEntries() {
    const response = await fetch(`${API_URL}/entries/`);
    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }
    return response.json();
  },

  // Get a single entry
  async getEntry(id) {
    const response = await fetch(`${API_URL}/entries/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entry');
    }
    return response.json();
  },

  // Create a new entry
  async createEntry(entryData) {
    const response = await fetch(`${API_URL}/entries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: entryData.title,
        content: entryData.content,
        tags: entryData.tags,
        summary: entryData.content.slice(0, 100) + '...',
        tip: entryData.content.slice(0, 100)
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create entry');
    }

    return response.json();
  },
}; 
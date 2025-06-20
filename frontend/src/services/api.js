const API_BASE_URL = 'http://localhost:3001/api';

const api = {
  async getAllNotes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/notes?${queryString}`);
    return response.json();
  },

  async createNote(noteData) {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData)
    });
    return response.json();
  },

  async updateNote(id, noteData) {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData)
    });
    return response.json();
  },

  async deleteNote(id) {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/notes/stats`);
    return response.json();
  }
};

export default api;

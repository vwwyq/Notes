import React, { useState, useEffect } from 'react';
import { Plus, Search, PieChart, BookOpen } from 'lucide-react';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import StatsDashboard from 'frontend\src\components\StatsDashboard';
import api from './services/api';

const colors = [
  '#FFE4E1', '#E6F3FF', '#F0F8E6', '#FFF0E6', '#F0E6FF',
  '#E6FFF0', '#FFE6F0', '#FFFACD', '#F5F5DC', '#E0E6FF'
];

const categories = ['personal', 'work', 'ideas', 'todo', 'important', 'general'];

export default function CuteNotesApp() {
  const [notes, setNotes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const fetchNotes = async (filters = {}) => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      const response = await api.getAllNotes({ ...params, ...filters });
      if (response.success) {
        setNotes(response.data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      let response;
      if (editingNote) {
        response = await api.updateNote(editingNote._id, noteData);
      } else {
        response = await api.createNote(noteData);
      }

      if (response.success) {
        fetchNotes();
        fetchStats();
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await api.deleteNote(noteId);
        if (response.success) {
          fetchNotes();
          fetchStats();
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchStats();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchNotes();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ✨ Notes App ✨ 
          </h1>
          <p className="text-gray-600">
            Your personal space for beautiful notes and ideas.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              New Note
            </button>

            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <PieChart size={20} />
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        {showStats && <StatsDashboard stats={stats} />}

        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No notes found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first note to get started!'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={(note) => {
                  setEditingNote(note);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}

        {/* Note Modal */}
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
          note={editingNote}
          onSave={handleSaveNote}
          colors={colors}
          categories={categories}
        />
      </div>
    </div>
  );
}

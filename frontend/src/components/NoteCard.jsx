import React from 'react';
import { Edit3, Trash2, Tag, Calendar } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
      style={{ backgroundColor: note.color }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-lg leading-tight">{note.title}</h3>
        <div className="flex gap-1 ml-2">
          <button onClick={() => onEdit(note)} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(note._id)} className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-3 line-clamp-3">{note.content}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {note.tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-white bg-opacity-60 text-xs rounded-full text-gray-700">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-600">
        <span className="capitalize font-medium">{note.category}</span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;

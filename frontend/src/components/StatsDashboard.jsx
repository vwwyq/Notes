import React from 'react';
import { PieChart, BookOpen, Star, Heart } from 'lucide-react';

const StatsDashboard = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <PieChart size={24} />
        Your Notes Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-blue-600" size={20} />
            <span className="font-medium text-gray-700">Total Notes</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.totalNotes}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-green-600" size={20} />
            <span className="font-medium text-gray-700">Categories</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {Object.keys(stats.categoryCounts || {}).length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-purple-600" size={20} />
            <span className="font-medium text-gray-700">Tags</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {Object.keys(stats.tagCounts || {}).length}
          </p>
        </div>
      </div>

      {stats.categoryCounts && Object.keys(stats.categoryCounts).length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.categoryCounts).map(([category, count]) => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {category}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;

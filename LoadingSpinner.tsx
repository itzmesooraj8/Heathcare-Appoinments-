import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Heart className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-lg text-gray-600">Loading your healthcare dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
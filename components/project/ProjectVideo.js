import React from 'react';

export default function ProjectVideo({ videoId }) {
  if (!videoId) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md my-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Discover the Project</h2>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

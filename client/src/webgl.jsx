import React from 'react';

const WebGL = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">WebGL Viewer</h2>

      {/* Responsive iframe container */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="http://localhost:5000/webgl/index.html"
          title="WebGL Demo"
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border"
        />
      </div>
    </div>
  );
};

export default WebGL;

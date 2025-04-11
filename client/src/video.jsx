import React from 'react';

const Video = ({ filename }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Now Playing</h2>
      
      <video width="1000" height="480" controls className="rounded-lg shadow-lg">
        <source
          src={`http://localhost:5000/api/video/stream/${filename}`}
          type="video/mp4"
        />
        <p>Your browser does not support the video tag.</p>
      </video>
    </div>
  );
};

export default Video;

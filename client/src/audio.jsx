import React, { useEffect, useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

const Audio = () => {
  const [record, setRecord] = useState(false);
  const [blob, setBlob] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);

  const startRecording = () => setRecord(true);
  const stopRecording = () => setRecord(false);

  const onStop = (recordedBlob) => {
    setBlob(recordedBlob.blob);
  };

  const uploadAudio = async () => {
    if (!blob) return;
    const formData = new FormData();
    formData.append('audio', blob, 'recording.mp3');

    try {
      await axios.post('http://localhost:5000/api/audio/upload', formData);
      alert('Uploaded!');
      fetchAudioFiles(); // Refresh list after upload
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const fetchAudioFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/audio/all');
      setAudioFiles(res.data);
    } catch (err) {
      console.error('Failed to fetch audio files:', err);
    }
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Audio Recorder</h2>

      <ReactMic
        record={record}
        className="w-full mb-4"
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />

      <div className="space-x-2 mb-6">
        <button onClick={startRecording} className="bg-green-500 text-white px-4 py-2 rounded">Start</button>
        <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">Stop</button>
        <button
          onClick={uploadAudio}
          disabled={!blob}
          className={`px-4 py-2 rounded ${blob ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        >
          Upload
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-3">Saved Audio Recordings</h3>
      <div className="space-y-4">
        {audioFiles.length > 0 ? (
          audioFiles.map((file) => (
            <div key={file._id} className="bg-white shadow p-3 rounded">
              <p className="font-medium">{file.filename}</p>
              <audio controls className="w-full mt-2">
                <source src={`http://localhost:5000/api/audio/stream/${file.filename}`} type="audio/mpeg" />
              </audio>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No audio files available.</p>
        )}
      </div>
    </div>
  );
};

export default Audio;

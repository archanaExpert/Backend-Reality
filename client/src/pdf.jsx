import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import axios from 'axios';  // To handle the upload

const Pdf = ({ filename }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Success state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window size
  const [pdfUrl, setPdfUrl] = useState(`http://localhost:5000/api/pdf/stream/${filename}`); // Default PDF URL
  const [file, setFile] = useState(null); // For storing the uploaded file

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setSuccess(true); // Set success to true when PDF loads
  };

  const handleError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF.');
    setLoading(false);
    setSuccess(false); // Reset success on error
  };

  // Handle PDF file upload
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('pdf', uploadedFile);

      try {
        // Assuming the server accepts and returns the PDF file URL
        const response = await axios.post('http://localhost:5000/api/pdf/upload', formData);
        setPdfUrl(response.data.pdfUrl); // Set the new PDF URL returned by the server
        setFile(uploadedFile);
        setLoading(true); // Start loading the new PDF
        setError(null);
        setSuccess(false);
      } catch (err) {
        console.error('Error uploading PDF:', err);
        setError('Failed to upload PDF.');
      }
    }
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h2>

      {/* File Upload Section */}
      <div className="mb-4 text-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="mb-4"
        />
        {file && <p className="text-gray-600">Uploaded: {file.name}</p>}
      </div>

      {/* Success message */}
      {success && !loading && !error && (
        <p className="text-green-500 text-center mb-4">PDF loaded successfully!</p>
      )}

      {loading && <p className="text-center text-gray-500">Loading PDF...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex-grow bg-white shadow-md rounded-lg overflow-auto mb-6 border">
        <Document
          file={pdfUrl}
          onLoadSuccess={handleLoadSuccess}
          onLoadError={handleError}
          className="flex flex-col items-center"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={Math.min(windowWidth - 32, 800)} // Make PDF responsive
              className="my-4"
            />
          ))}
        </Document>
      </div>

      <hr className="my-6" />

      <h4 className="text-lg font-semibold mb-2">Download/View PDF</h4>
      <div className="flex justify-center gap-3 mb-4">
        <button
          onClick={() => window.open(pdfUrl, '_blank')} // Opens the PDF in a new tab
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-all"
        >
          View PDF
        </button>
        <button
          onClick={() => window.location.href = pdfUrl} // Downloads the PDF
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-all"
        >
          Download PDF
        </button>
      </div>

      <h4 className="text-lg font-semibold mb-2">Download Individual Pages</h4>
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from(new Array(numPages), (_, i) => (
          <button
            key={i}
            onClick={() =>
              window.open(`http://localhost:5000/api/pdf/download-page/${i + 1}`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-all"
          >
            Download Page {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pdf;

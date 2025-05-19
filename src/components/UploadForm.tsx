import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, FilePlus, X, Loader2 } from 'lucide-react';
import { useResumeContext } from '../context/ResumeContext';
import { extractSkills } from '../services/resumeService';

const UploadForm: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setResumeData } = useResumeContext();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      validateAndSetFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    setError(null);
    const fileType = uploadedFile.type;
    const validTypes = ['application/pdf', 'text/plain'];
    
    if (!validTypes.includes(fileType)) {
      setError('Please upload a PDF or text file');
      return;
    }
    
    setFile(uploadedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a resume');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the API to process the file
      // For this demo, we'll simulate the backend processing
      const skills = await extractSkills(file);
      
      setResumeData({
        fileName: file.name,
        skills: skills
      });
      
      navigate('/results');
    } catch (err) {
      setError('Failed to extract skills. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : file 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <Upload className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Your Resume</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Drag & drop your resume file here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Supports PDF and text files
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
            >
              <FilePlus className="h-4 w-4 mr-2" />
              Browse Files
            </button>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 truncate" style={{maxWidth: '200px'}}>
                    {file.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm flex items-center"
              >
                Change
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Extract Skills'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-3 text-sm text-red-600 flex items-center justify-center">
          <span>{error}</span>
        </div>
      )}
      
      <input 
        ref={fileInputRef}
        type="file" 
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
    </form>
  );
};

export default UploadForm;
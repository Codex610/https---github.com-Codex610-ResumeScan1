import React from 'react';
import UploadForm from '../components/UploadForm';
import { FileText, Zap, Shield, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Extract Skills from Your Resume
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Instantly analyze your resume and extract key skills to help you 
          optimize your job applications and highlight your strengths.
        </p>
      </div>
      
      <div className="mb-16">
        <UploadForm />
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Easy Upload</h3>
          <p className="text-gray-600 text-sm">
            Simply drag and drop your resume file or browse to upload PDF and text formats.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-purple-100 p-3 rounded-full mb-4">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Instant Analysis</h3>
          <p className="text-gray-600 text-sm">
            Advanced algorithms extract and categorize your skills in seconds.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-teal-100 p-3 rounded-full mb-4">
            <Shield className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy First</h3>
          <p className="text-gray-600 text-sm">
            Your data stays private. We process files securely and never store your resume.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Time Saving</h3>
          <p className="text-gray-600 text-sm">
            Save hours manually identifying skills and focus on what matters - landing your dream job.
          </p>
        </div>
      </div>
      
      <div id="about" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Upload Your Resume
                </h3>
                <p className="text-gray-600">
                  Begin by uploading your resume in PDF or text format. Our system accepts most common document types.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Automated Skill Extraction
                </h3>
                <p className="text-gray-600">
                  Our advanced algorithms analyze your resume text, identifying key skills and categorizing them by type.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Review and Use Results
                </h3>
                <p className="text-gray-600">
                  View your categorized skills, download the results, or copy them directly to use in job applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useResumeContext } from '../context/ResumeContext';
import SkillsDisplay from '../components/SkillsDisplay';

const ResultsPage: React.FC = () => {
  const { resumeData } = useResumeContext();
  const navigate = useNavigate();

  useEffect(() => {
    // If no resume data exists, redirect to home page
    if (!resumeData) {
      navigate('/');
    }
  }, [resumeData, navigate]);

  if (!resumeData) {
    return null; // Will redirect due to the useEffect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </button>
      </div>
      
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <FileText className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {resumeData.fileName}
            </h2>
            <p className="text-sm text-gray-500">
              {resumeData.skills.length} skills extracted
            </p>
          </div>
        </div>
      </div>
      
      <SkillsDisplay 
        skills={resumeData.skills}
        fileName={resumeData.fileName}
      />
      
      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Tips to Optimize Your Resume
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="inline-block h-5 w-5 rounded-full bg-blue-600 text-white items-center justify-center text-xs mr-2 mt-0.5">
              ✓
            </span>
            <span>Include the most relevant skills for the job you're applying for at the top of your resume.</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block h-5 w-5 rounded-full bg-blue-600 text-white items-center justify-center text-xs mr-2 mt-0.5">
              ✓
            </span>
            <span>Use similar keywords from the job description to pass through Applicant Tracking Systems (ATS).</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block h-5 w-5 rounded-full bg-blue-600 text-white items-center justify-center text-xs mr-2 mt-0.5">
              ✓
            </span>
            <span>Balance technical skills with soft skills to show you're a well-rounded candidate.</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block h-5 w-5 rounded-full bg-blue-600 text-white items-center justify-center text-xs mr-2 mt-0.5">
              ✓
            </span>
            <span>Quantify your skills with achievements and metrics when possible.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsPage;
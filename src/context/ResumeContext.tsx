import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Skill } from '../types';

interface ResumeData {
  fileName: string;
  skills: Skill[];
}

interface ResumeContextType {
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData) => void;
  clearResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const clearResumeData = () => {
    setResumeData(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        clearResumeData
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
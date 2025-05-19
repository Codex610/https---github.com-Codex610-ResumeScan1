import React from 'react';

interface SkillTagProps {
  skill: string;
  category?: string;
  confidence?: number;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const getCategoryColor = (category?: string): string => {
  switch (category?.toLowerCase()) {
    case 'tech':
    case 'technical':
    case 'programming':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'soft':
    case 'soft skill':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'language':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'tool':
    case 'software':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'certification':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const SkillTag: React.FC<SkillTagProps> = ({ 
  skill, 
  category, 
  confidence = 1,
  size = 'md',
  onClick 
}) => {
  // Scale size based on confidence if no explicit size is given
  const getSize = () => {
    if (size !== 'md') return size;
    if (confidence > 0.8) return 'lg';
    if (confidence < 0.4) return 'sm';
    return 'md';
  };

  const computedSize = getSize();
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <div 
      className={`${getCategoryColor(category)} ${sizeClasses[computedSize]} rounded-full inline-flex items-center border cursor-pointer m-1 transition-all hover:shadow-sm`}
      onClick={onClick}
      style={{
        opacity: Math.max(0.7, confidence),
        transform: `scale(${0.95 + (confidence * 0.05)})`,
      }}
    >
      {skill}
    </div>
  );
};

export default SkillTag;
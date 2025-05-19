import React, { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';
import SkillTag from './SkillTag';
import { Skill } from '../types';

interface SkillsDisplayProps {
  skills: Skill[];
  fileName: string;
}

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ skills, fileName }) => {
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const skillCategories = [...new Set(skills.map(skill => skill.category))];
  
  const filteredSkills = filter 
    ? skills.filter(skill => skill.category === filter)
    : skills;

  const handleCopyToClipboard = () => {
    const skillsText = skills.map(s => s.name).join(', ');
    navigator.clipboard.writeText(skillsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const categorizedSkills = skillCategories.map(category => {
      const categorySkills = skills
        .filter(s => s.category === category)
        .map(s => s.name)
        .join(', ');
      
      return `${category}: ${categorySkills}`;
    }).join('\n\n');
    
    const content = `Skills extracted from ${fileName}:\n\n${categorizedSkills}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.split('.')[0]}-skills.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
          Extracted Skills
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyToClipboard}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50 transition-colors flex items-center"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5 text-green-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" />
                Copy Skills
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === null 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {skillCategories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="flex flex-wrap">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <SkillTag 
                key={index}
                skill={skill.name}
                category={skill.category}
                confidence={skill.confidence}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm w-full text-center py-4">
              No skills found in this category
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsDisplay;
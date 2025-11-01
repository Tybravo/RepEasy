import React, { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RepEasyProps {
  selectedProjectId?: string;
}

interface Project {
  id: string;
  name: string;
  icon: string;
  color: string;
  category?: string;
  tgeStatus?: string;
}

const RepEasy: React.FC<RepEasyProps> = ({ selectedProjectId }) => {
  const navigate = useNavigate();
  const [numberOfTweets, setNumberOfTweets] = useState<number>(1);
  const [tweetLength, setTweetLength] = useState<'short' | 'long' | 'thread'>('long');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Try to get project data from sessionStorage first
    const storedProject = sessionStorage.getItem('selectedProject');
    
    if (storedProject) {
      try {
        const projectData = JSON.parse(storedProject);
        // Determine TGE status based on project ID
        const preTGEIds = ['bluwhale', 'momentum', 'liquidlink', 'pumpking', 'claynosaurz', 'pawtato', 'walrus', 'talus', 'pyth', 'overtake', 'creek', 'lineup'];
        const tgeStatus = preTGEIds.includes(projectData.id) ? 'Pre-TGE' : 'Post-TGE';
        
        setSelectedProject({
          ...projectData,
          category: 'GiveRep',
          tgeStatus: tgeStatus
        });
      } catch (error) {
        console.error('Error parsing stored project:', error);
      }
    } else {
      // Fallback: try to get project ID from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = selectedProjectId || urlParams.get('project');
      
      if (projectId) {
        // Fallback project data
        const fallbackProjects: Project[] = [
          { id: "bluwhale", name: 'BluWhale AI', icon: '⚡', color: 'bg-yellow-400', category: 'Kaito', tgeStatus: 'Pre-TGE' },
          { id: "momentum", name: 'Momentum', icon: '🌸', color: 'bg-pink-400', category: 'Kaito', tgeStatus: 'Pre-TGE' },
          { id: "liquidlink", name: 'LiquidLink', icon: '🌈', color: 'bg-blue-500', category: 'Kaito', tgeStatus: 'Pre-TGE' },
          { id: 'ika', name: 'IKA Chan', icon: '🚀', color: 'bg-red-400', category: 'Kaito', tgeStatus: 'Post-TGE' },
        ];
        
        const project = fallbackProjects.find(p => p.id === projectId);
        if (project) {
          setSelectedProject(project);
        }
      }
    }
  }, [selectedProjectId]);

  const handleBackToSelection = (): void => {
    
     navigate(-1);
  };

  const incrementTweets = (): void => {
    setNumberOfTweets(prev => Math.min(prev + 1, 10)); // Max 10 tweets
  };

  const decrementTweets = (): void => {
    setNumberOfTweets(prev => Math.max(prev - 1, 1)); // Min 1 tweet
  };

  const handleGenerateTweets = (): void => {
    console.log('Generating tweets:', {
      project: selectedProject?.name,
      numberOfTweets,
      tweetLength
    });
    // Add your tweet generation logic here
  };

  if (!selectedProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
              <span className="text-2xl transform -rotate-12">💧</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900">RepEasy</h1>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackToSelection}
            className="flex items-center gap-2 px-6 py-3 bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors shadow-md"
          >
            <ArrowLeft size={20} />
            Back to Selection
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-300 mb-2">Your Selected Projects</h2>
          <p className="text-gray-400">You've selected 1 project</p>
        </div>

        {/* Project Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-gray-200">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${selectedProject.color} rounded-2xl flex items-center justify-center text-3xl`}>
                {selectedProject.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="text-lg font-bold text-gray-900 mb-2">{selectedProject.category || 'GiveRep'}</p>
              <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                {selectedProject.tgeStatus || 'Pre-TGE'}
              </span>
            </div>
          </div>

          {/* Number of Tweets */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Number of Tweets <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={decrementTweets}
                className="w-16 h-16 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
                disabled={numberOfTweets <= 1}
              >
                <Minus size={20} className="text-black" />
              </button>
              <span className="text-2xl font-bold text-gray-900 min-w-[40px] text-center">
                {numberOfTweets}
              </span>
              <button
                onClick={incrementTweets}
                className="w-16 h-16 bg-teal-700 hover:bg-teal-800 rounded-full flex items-center justify-center transition-colors"
                disabled={numberOfTweets >= 10}
              >
                <Plus size={20} className="text-black" />
              </button>
            </div>
          </div>

          {/* Tweet Length */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Tweet Length
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tweetLength === 'short'}
                  onChange={() => setTweetLength('short')}
                  className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-gray-700">Short</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tweetLength === 'long'}
                  onChange={() => setTweetLength('long')}
                  className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-gray-700">Long</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tweetLength === 'thread'}
                  onChange={() => setTweetLength('thread')}
                  className="w-5 h-5 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-gray-700">Thread</span>
              </label>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerateTweets}
            className="px-12 py-4 bg-teal-700 hover:bg-teal-800  rounded-full text-xl font-bold transition-all shadow-xl hover:scale-105"
          >
            Generate Tweets
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepEasy;
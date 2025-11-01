import React, { useRef, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import './Dashboard.css'
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const preTGEScrollRef = useRef<HTMLDivElement>(null);
  const postTGEScrollRef = useRef<HTMLDivElement>(null);

  const preTGEProjects: Project[] = [
    { id: "bluwhale", name: 'BluWhale AI', icon: '⚡', color: 'bg-yellow-400' },
    { id: "momentum", name: 'Momentum', icon: '🌸', color: 'bg-pink-400' },
    { id: "liquidlink", name: 'LiquidLink', icon: '🌈', color: 'bg-blue-500' },
    { id: "pumpking", name: 'PumpKing', icon: '💠', color: 'bg-blue-400' },
    { id: "claynosaurz", name: 'Claynosaurz', icon: '🔺', color: 'bg-green-400' },
    { id: "pawtato", name: 'Pawtato Finance', icon: '⭕', color: 'bg-gradient-to-br from-pink-400 to-purple-400' },
    { id: "walrus", name: 'Walrus', icon: '🎯', color: 'bg-teal-400' },
    { id: "talus", name: 'TalusNetwork', icon: '🛡️', color: 'bg-green-500' },
    { id: "pyth", name: 'Pyth Network', icon: '📷', color: 'bg-gray-800' },
    { id: "overtake", name: 'Overtake', icon: '🔮', color: 'bg-indigo-900' },
    { id: "creek", name: 'Creek', icon: '⚫', color: 'bg-gray-900' },
    { id: "lineup", name: 'LineUp Games', icon: '🪁', color: 'bg-stone-300' }
  ];

  const postTGEProjects: Project[] = [
    { id: 'ika', name: 'IKA Chan', icon: '🚀', color: 'bg-red-400' },
    { id: 'delorean', name: 'DeLorean Labs', icon: '🌟', color: 'bg-yellow-300' },
  ];

  const allProjects = [...preTGEProjects, ...postTGEProjects];
  
  const filteredProjects = preTGEProjects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPostTGEProjects = postTGEProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 min-w-[195px] flex-shrink-0 ${isSelected
          ? 'bg-teal-700 text-black shadow-lg scale-105 ring-2 ring-teal-500'
          : 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-md'
        }`}
    >
      <div className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
        {project.icon}
      </div>
      <span className="font-semibold whitespace-nowrap">{project.name}</span>
      {isSelected && (
        <div className="ml-auto">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );


  const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-16 h-16 bg-blue-400 text-black rounded-full flex items-center justify-center hover:bg-red-800 transition-colors shadow-lg flex-shrink-0 ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-teal-800'
      }`}
    >
      {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );


  const handleNextClick = (): void => {
    if (selectedProject) {
      const project = allProjects.find(p => p.id === selectedProject);
      if (project) {
        // Store project data in sessionStorage for Yapdrop page
        sessionStorage.setItem('selectedProject', JSON.stringify({
          id: project.id,
          name: project.name,
          icon: project.icon,
          color: project.color
        }));
        
        // Navigate to Generate page
      
        
        navigate(`/generate?project=${selectedProject}`);
      }
    }
  };

  const handleScrollLeft = (section: 'preTGE' | 'postTGE'): void => {
    const scrollRef = section === 'preTGE' ? preTGEScrollRef : postTGEScrollRef;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Scroll by approximately 2 card widths
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = (section: 'preTGE' | 'postTGE'): void => {
    const scrollRef = section === 'preTGE' ? preTGEScrollRef : postTGEScrollRef;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Scroll by approximately 2 card widths
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
              <span className="text-2xl transform -rotate-12">💧</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900">RepEasy</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <div className="relative flex items-center bg-white rounded-full shadow-lg border-2 border-teal-700 overflow-hidden">
            <Search className="absolute left-6 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-4 pl-14 pr-4 text-gray-700 text-lg focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-3 px-6 py-2 bg-teal-700 hover:bg-teal-800 text-black font-semibold rounded-full transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* GiveRep Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-3xl">📦</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">GiveRep</h2>
        </div>

        <div className="rounded-3xl shadow-xl p-8 mb-8">
          {/* Pre-TGE Projects */}
          <div className="relative mb-12">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">Pre-TGE Projects</h3>

            <div className="relative">
              <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10'>
                <ScrollButton direction='left' onClick={() => handleScrollLeft('preTGE')} />
              </div>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10'>
                <ScrollButton direction='right' onClick={() => handleScrollRight('preTGE')} />
              </div>

              {/* Scrollable Container */}
              <div 
                ref={preTGEScrollRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-5 pb-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isSelected={selectedProject === project.id}
                      onClick={() => setSelectedProject(project.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Post-TGE Projects */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">Post-TGE Projects</h3>
            
            <div className="relative">
              <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10'>
                <ScrollButton direction='left' onClick={() => handleScrollLeft('postTGE')} />
              </div>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10'>
                <ScrollButton direction='right' onClick={() => handleScrollRight('postTGE')} />
              </div>

              {/* Scrollable Container */}
              <div 
                ref={postTGEScrollRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-5 pb-4">
                  {filteredPostTGEProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isSelected={selectedProject === project.id}
                      onClick={() => setSelectedProject(project.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button - Appears when project is selected */}
        {selectedProject && (
          <div className="  fixed bottom-8 right-8 z-50">
            <button
              onClick={handleNextClick}
              className="bg-teal-700 text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-teal-600 transition-all shadow-2xl hover:scale-105"
            >
              Next
              <ArrowRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard
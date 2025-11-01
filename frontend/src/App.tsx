import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

import './App.css'

function App() {
const [searchQuery, setSearchQuery] = useState('');


 const preTGEProjects = [
    { name: 'Kloutgg', icon: '⚡', color: 'bg-yellow-400' },
    { name: 'Sentient', icon: '🌸', color: 'bg-pink-400' },
    { name: 'Rainbow', icon: '🌈', color: 'bg-blue-500' },
    { name: 'Billions', icon: '💠', color: 'bg-blue-400' },
    { name: 'Abstract', icon: '🔺', color: 'bg-green-400' },
    { name: 'OpenMind', icon: '⭕', color: 'bg-gradient-to-br from-pink-400 to-purple-400' },
    { name: 'Irvs', icon: '🎯', color: 'bg-teal-400' },
    { name: 'Warden', icon: '🛡️', color: 'bg-green-500' },
    { name: 'Bravis', icon: '📷', color: 'bg-gray-800' },
    { name: 'NOYA ai', icon: '🔮', color: 'bg-indigo-900' },
    { name: 'Cysic', icon: '⚫', color: 'bg-gray-900' },
    { name: 'Kite AI', icon: '🪁', color: 'bg-stone-300' }
  ];

  const filteredProjects = preTGEProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                className="mr-3 px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full transition-colors"
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

       
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          {/* Pre-TGE Projects */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">Pre-TGE Projects</h3>
            
            <div className="relative">
              {/* Navigation Buttons */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronRight size={24} />
              </button>

              {/* Projects Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  >
                    <div className={`w-14 h-14 ${project.color} rounded-xl flex items-center justify-center text-2xl shadow-md`}>
                      {project.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-center text-sm">
                      {project.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
           <div className="relative">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">Post-TGE Projects</h3>
            
            <div className="relative">
              {/* Navigation Buttons */}
              

              {/* Projects Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
               
              </div>
            </div>
          </div>
        </div>

         {/* Cookies Section */}
         <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-3xl">📦</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Cookies</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          {/* Pre-TGE Projects */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">Pre-TGE Projects</h3>
            
            <div className="relative">
              {/* Navigation Buttons */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-black rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-black rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronRight size={24} />
              </button>

              {/* Projects Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  >
                    <div className={`w-14 h-14 ${project.color} rounded-xl flex items-center justify-center text-2xl shadow-md`}>
                      {project.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-center text-sm">
                      {project.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">Post-TGE Projects</h3>
            
            <div className="relative">
              {/* Navigation Buttons */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-black rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-black rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronRight size={24} />
              </button>

              {/* Projects Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
               
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        {/* <button className="fixed bottom-8 right-8 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-colors">
          <span className="text-2xl">⚡</span>
        </button> */}
      </div>
    </div>
  );
 
}
         


export default App

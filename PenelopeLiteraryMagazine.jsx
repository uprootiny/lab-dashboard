import React, { useState, useEffect } from 'react';
import { Smile, Book, Edit, Clock, PenTool, RefreshCw, Send, Menu, X } from 'lucide-react';

const PenelopeLiteraryMagazine = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const featuredArticles = [
    {
      title: "Constantly Smiling",
      excerpt: "I'm smiling constantly and people constantly step on me. This phenomenon of forced positivity has become part of our social fabric, but at what cost?",
      author: "Marin Elliott",
      status: "Published",
      aiContribution: 30,
      humanContribution: 70,
      tags: ["Society", "Psychology"]
    },
    {
      title: "The Pattern of Footsteps",
      excerpt: "We leave impressions everywhere we go. Some visible, some invisible. This exploration tracks the metaphorical footprints we make in others' lives.",
      author: "Julian West",
      status: "Published",
      aiContribution: 45,
      humanContribution: 55,
      tags: ["Relationships", "Philosophy"]
    },
    {
      title: "Unraveling the Day",
      excerpt: "Like Penelope of myth, we weave our experiences into tapestries of memory, only to unravel them in dreams. A meditation on how we process daily life.",
      author: "Sophia Chen",
      status: "Published",
      aiContribution: 25,
      humanContribution: 75,
      tags: ["Mindfulness", "Mythology"]
    }
  ];

  const inProgressArticles = [
    {
      title: "Circular Thoughts",
      status: "Draft",
      completionPercentage: 65,
      lastEdited: "2 hours ago",
      contributors: ["You", "AI Assistant"]
    },
    {
      title: "Walking Through Memories",
      status: "Outline",
      completionPercentage: 30,
      lastEdited: "Yesterday",
      contributors: ["You", "AI Assistant", "Guest Editor"]
    },
    {
      title: "The Spaces Between Steps",
      status: "Revision",
      completionPercentage: 85,
      lastEdited: "4 days ago",
      contributors: ["You", "AI Assistant"]
    }
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            setIsGenerating(false);
            return 0;
          }
          return prev + 5;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex(prev =>
        prev === featuredArticles.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const startNewGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'} flex items-center justify-center mr-3`}>
              <PenTool size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Penelope</h1>
            <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Literary Magazine</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#featured" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Featured</a>
            <a href="#process" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Our Process</a>
            <a href="#contribute" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Contribute</a>
            <a href="#about" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>About</a>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-200' : 'bg-gray-100 text-gray-700'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </nav>

          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className={`md:hidden p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col space-y-4">
              <a href="#featured" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Featured</a>
              <a href="#process" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Our Process</a>
              <a href="#contribute" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Contribute</a>
              <a href="#about" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>About</a>
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-200' : 'bg-gray-100 text-gray-700'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </nav>
        )}
      </header>

      <section className={`py-16 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-indigo-900'}`}>
                Where AI and Human Creativity Intertwine
              </h1>
              <p className={`text-xl mb-8 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
                Like Penelope's tapestry, we weave and unweave stories together. 
                Our literary magazine blends AI-generated frameworks with human creativity 
                to create something truly unique.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#featured" 
                  className={`py-3 px-6 rounded-md font-medium text-center ${
                    darkMode 
                      ? 'bg-indigo-500 hover:bg-indigo-400 text-white' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  Read Latest Issue
                </a>
                <a 
                  href="#contribute" 
                  className={`py-3 px-6 rounded-md font-medium text-center ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white border border-indigo-500' 
                      : 'bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600'
                  }`}
                >
                  Start Writing
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className={`relative w-64 h-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-lg overflow-hidden`}>
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex-grow p-6 flex justify-center">
                    <div className="w-32 h-full flex flex-col items-center">
                      <div className={`w-24 h-40 ${darkMode ? 'bg-indigo-800' : 'bg-indigo-100'} mb-4 relative`}>
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 w-20 h-1 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-1 h-10 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                      </div>
                      <div className={`w-20 h-10 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-200'}`}></div>
                      <div className="mt-4 w-16 h-16 rounded-full bg-indigo-400 flex items-center justify-center">
                        <Smile size={30} className={darkMode ? 'text-indigo-900' : 'text-indigo-800'} />
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 text-sm ${darkMode ? 'bg-gray-700 text-indigo-300' : 'bg-indigo-50 text-indigo-800'}`}>
                    <p className="italic text-center">
                      "I'm smiling constantly<br />
                      and people constantly<br />
                      step on me"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Featured Pieces
          </h2>

          <div className="max-w-4xl mx-auto">
            {featuredArticles.map((article, idx) => (
              <div 
                key={idx} 
                className={`transition-opacity duration-1000 mb-12 ${
                  idx === currentArticleIndex ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <div className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {article.title}
                    </h3>
                    <div className="flex space-x-2">
                      {article.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className={`text-xs px-2 py-1 rounded ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                        By {article.author}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Collaboration Ratio
                        </div>
                        <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: `${article.humanContribution}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className={darkMode ? 'text-indigo-300' : 'text-indigo-600'}>Human {article.humanContribution}%</span>
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>AI {article.aiContribution}%</span>
                        </div>
                      </div>
                      <a 
                        href="#" 
                        className={`py-2 px-4 rounded-md text-sm font-medium ${
                          darkMode 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                        }`}
                      >
                        Read Full
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6 space-x-2">
              {featuredArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentArticleIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentArticleIndex
                      ? (darkMode ? 'bg-indigo-400' : 'bg-indigo-600')
                      : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            The Weaving Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="mb-4 flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <PenTool size={30} />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                AI Framework Generation
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our AI system analyzes literary trends and creates structural frameworks, 
                suggesting themes, narrative arcs, and stylistic elements.
              </p>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="mb-4 flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <Edit size={30} />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Human Creative Refinement
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Human writers respond to these frameworks, adding personal insights, 
                emotional depth, and creative nuance that makes each piece unique.
              </p>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="mb-4 flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <RefreshCw size={30} />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Iterative Collaboration
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Through cycles of weaving and unweaving, AI and human contributors 
                collaborate to refine the work until it achieves its full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Writing Dashboard
          </h2>
          <p className={`mb-12 max-w-3xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Begin with an AI-generated framework and transform it into your unique creation. 
            Track your progress and see how your contributions shape the final piece.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className={`p-6 rounded-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                In Progress
              </h3>

              <div className="space-y-4">
                {inProgressArticles.map((article, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-md ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
                    } transition cursor-pointer`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {article.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        article.status === 'Draft' 
                          ? (darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                          : article.status === 'Outline'
                            ? (darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800')
                            : (darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                      }`}>
                        {article.status}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          Progress
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {article.completionPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            article.completionPercentage < 40
                              ? 'bg-yellow-500'
                              : article.completionPercentage < 70
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${article.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-xs ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Last edited {article.lastEdited}
                        </span>
                      </div>
                      <div className="flex">
                        {article.contributors.map((contributor, cIdx) => (
                          <div 
                            key={cIdx}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              contributor === 'You'
                                ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white')
                                : contributor === 'AI Assistant'
                                  ? (darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700')
                                  : (darkMode ? 'bg-green-700 text-green-200' : 'bg-green-200 text-green-800')
                            } -ml-1 first:ml-0 border-2 ${darkMode ? 'border-gray-800' : 'border-white'}`}
                            title={contributor}
                          >
                            {contributor[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Start Something New
              </h3>

              {isGenerating ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <RefreshCw size={40} className={`mx-auto animate-spin ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Weaving new ideas... AI is generating a framework for you.
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-300" 
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {generationProgress}% complete
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <p className={`text-center mb-6 max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Let our AI generate a fresh framework based on your interests, 
                    then add your unique perspective and creative touch.
                  </p>
                  <button
                    onClick={startNewGeneration}
                    className={`py-3 px-6 rounded-md font-medium flex items-center ${
                      darkMode 
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    <PenTool size={18} className="mr-2" />
                    Generate New Framework
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="contribute" className={`py-16 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-indigo-900'}`}>
              Add Your Thread to Our Tapestry
            </h2>
            <p className={`text-lg mb-8 ${darkMode ? 'text-indigo-100' : 'text-indigo-700'}`}>
              Join our community of writers who collaborate with AI to create 
              meaningful, thought-provoking content that pushes creative boundaries.
            </p>
            <div className="mb-8">
              <a 
                href="#" 
                className={`inline-block py-3 px-8 rounded-md font-medium ${
                  darkMode 
                    ? 'bg-white hover:bg-gray-100 text-indigo-900' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                Create Account
              </a>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-indigo-800 bg-opacity-50' : 'bg-white'}`}>
              <h3 className={`text-xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Join our Newsletter
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-indigo-200' : 'text-gray-600'}`}>
                Stay updated with our latest publications and insights into the 
                collaborative writing process.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={`flex-grow px-4 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-indigo-700 border-indigo-600 text-white placeholder-indigo-300' 
                      : 'bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500'
                  } border`}
                />
                <button 
                  className={`px-6 py-2 rounded-md font-medium ${
                    darkMode 
                      ? 'bg-indigo-500 hover:bg-indigo-400 text-white' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <Send size={16} className="mr-2" />
                    <span>Subscribe</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-12 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto px-4">
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-3xl h-16">
              <div className={`absolute left-0 right-0 top-4 h-1 ${darkMode ? 'bg-indigo-700' : 'bg-indigo-200'}`}></div>
              <div className={`absolute left-0 right-0 top-8 h-1 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`}></div>
              <div className={`absolute left-0 right-0 top-12 h-1 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute w-1 h-16 ${
                    i % 2 === 0 
                      ? (darkMode ? 'bg-purple-600' : 'bg-purple-300') 
                      : (darkMode ? 'bg-indigo-400' : 'bg-indigo-500')
                  }`}
                  style={{ left: `${(i * 4.35) + 1}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'} flex items-center justify-center mr-3`}>
                  <PenTool size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Penelope</h3>
              </div>
              <p className="leading-relaxed">
                A literary magazine where AI frameworks and human creativity 
                intertwine to create meaningful, thought-provoking content.
              </p>
              <div className="flex space-x-4">
                <a href="#" className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.687 4.112 10.354 9.477 11.623V15.617H7.118V12h2.359V9.784c0-2.342 1.42-3.657 3.53-3.657 1.022 0 1.892.076 2.187.11v2.42h-1.475c-1.032 0-1.316.488-1.316 1.19v1.786h2.807l-.435 3.253h-2.372v6.026c5.365-1.269 9.477-5.936 9.477-11.623z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1.5-11.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm3 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm5 0c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <a href="#featured" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Featured</a>
              <a href="#process" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Our Process</a>
              <a href="#contribute" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>Contribute</a>
              <a href="#about" className={`${darkMode ? 'hover:text-indigo-300' : 'hover:text-indigo-600'}`}>About</a>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Contact Us</h3>
              <p>Email: info@penelopemag.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Penelope Literary Magazine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PenelopeLiteraryMagazine;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Mic, MicOff, VideoOff, Video, MonitorUp, MessageSquare, Users, Sun, Moon, ChevronRight, ChevronLeft } from 'lucide-react';

function MeetingRoom() {
  const { id } = useParams();
  const [notes, setNotes] = useState(`Interview Notes for Sarah Chen\n\nFirst Impressions:\n- Professional appearance\n- Arrived 5 minutes early\n- Confident communication style\n\nKey Points to Discuss:\n- Experience with React development\n- Team collaboration examples\n- Project management approach`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNotesExpanded, setIsNotesExpanded] = useState(true);
  const [isNotesWidthExpanded, setIsNotesWidthExpanded] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const questions = [
    {
      question: "Tell me about yourself and your background.",
      notes: "Focus on professional journey and key achievements"
    },
    {
      question: "What interests you about this position?",
      notes: "Listen for alignment with company values"
    },
    {
      question: "Can you describe a challenging project you've worked on?",
      notes: "Look for problem-solving approach and technical depth"
    },
    {
      question: "How do you handle tight deadlines and pressure?",
      notes: "Assess stress management and prioritization skills"
    },
    {
      question: "Where do you see yourself in 5 years?",
      notes: "Evaluate career goals and ambition"
    }
  ];

  const participants = {
    interviewer: {
      name: "Michael Rodriguez",
      role: "Senior Technical Interviewer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1200"
    },
    interviewee: {
      name: "Sarah Chen",
      role: "Full Stack Developer Candidate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1200"
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleNotes = () => setIsNotesExpanded(!isNotesExpanded);
  const toggleNotesWidth = () => setIsNotesWidthExpanded(!isNotesWidthExpanded);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleRecording = () => setIsRecording(!isRecording);

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Main Content Area */}
      <div className={`flex flex-col ${isNotesExpanded ? (isNotesWidthExpanded ? 'w-1/2' : 'flex-grow') : 'flex-grow'}`}>
        {/* Video Conference Area */}
        <div className={`flex-grow ${isDarkMode ? 'bg-[#202124]' : 'bg-gray-200'} p-4 relative`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`absolute top-4 left-4 p-2 rounded-full ${
              isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-white text-gray-800'
            } hover:opacity-80 transition-opacity`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Video Grid */}
          <div className="h-full flex items-center justify-center gap-4">
            {/* Interviewer Video */}
            <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={participants.interviewer.image}
                alt="Interviewer video feed"
                className={`w-full h-full object-cover ${!isVideoOn && 'hidden'}`}
              />
              {!isVideoOn && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-20 h-20 text-gray-500" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <p className={`text-white font-medium`}>{participants.interviewer.name}</p>
                <p className="text-gray-300 text-sm">{participants.interviewer.role}</p>
              </div>
            </div>

            {/* Interviewee Video */}
            <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={participants.interviewee.image}
                alt="Interviewee video feed"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <p className={`text-white font-medium`}>{participants.interviewee.name}</p>
                <p className="text-gray-300 text-sm">{participants.interviewee.role}</p>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-[#3c4043] px-6 py-3 rounded-full shadow-lg">
            <button 
              onClick={toggleMic}
              className={`p-3 rounded-full transition-colors ${
                isMicOn ? 'text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoOn ? 'text-white hover:bg-gray-700' : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            <button 
              onClick={toggleScreenShare}
              className={`p-3 rounded-full transition-colors ${
                isScreenSharing ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-white hover:bg-gray-700'
              }`}
            >
              <MonitorUp className="w-6 h-6" />
            </button>
            <button 
              onClick={toggleRecording}
              className={`p-3 rounded-full transition-colors ${
                isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'text-white hover:bg-gray-700'
              }`}
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>

          {/* Participant Count */}
          <div className="absolute top-4 right-4 bg-[#3c4043] px-4 py-2 rounded-full flex items-center gap-2 text-white">
            <Users className="w-4 h-4" />
            <span>2</span>
          </div>
        </div>

        {/* Questions Panel */}
        <div className={`h-1/5 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-t p-4 overflow-y-auto`}>
          <div className="max-w-4xl mx-auto">
            <h3 className={`text-lg font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Interview Questions</h3>
            <div className="space-y-2">
              {questions.map((item, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    currentQuestion === index 
                      ? isDarkMode 
                        ? 'bg-blue-900 border-l-4 border-blue-500' 
                        : 'bg-blue-100 border-l-4 border-blue-500'
                      : isDarkMode
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {`${index + 1}. ${item.question}`}
                  </p>
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {isNotesExpanded && (
        <div 
          className={`${isNotesWidthExpanded ? 'w-1/2' : 'w-1/4'} ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border-l p-4 flex flex-col relative transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Interview Notes</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleNotesWidth}
                className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {isNotesWidthExpanded ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <MessageSquare className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>
          <textarea
            className={`flex-grow w-full p-3 text-sm rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                : 'bg-white text-gray-800 border-gray-200 placeholder-gray-500'
            }`}
            placeholder="Take notes during the interview..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      )}

      {/* Notes Toggle Button */}
      <button
        onClick={toggleNotes}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
        } p-2 rounded-l-lg shadow-lg hover:bg-opacity-90 transition-colors`}
      >
        {isNotesExpanded ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default MeetingRoom;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, Copy, VideoOff, Check, X } from 'lucide-react';

function LandingPage() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [meetingCode, setMeetingCode] = useState('');
  const [showMeetingCode, setShowMeetingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [joinError, setJoinError] = useState('');
  const navigate = useNavigate();
  
  const generateMeetingId = () => {
    return 'meet-' + Math.random().toString(36).substring(2, 7) + 
           '-' + Math.random().toString(36).substring(2, 7) + 
           '-' + Math.random().toString(36).substring(2, 7);
  };

  const createNewMeeting = () => {
    const newCode = generateMeetingId();
    setGeneratedCode(newCode);
    setShowMeetingCode(true);
  };

  const joinMeeting = (meetingId: string) => {
    // Simple validation for meeting code format
    const meetingCodeRegex = /^meet-[a-z0-9]{5}-[a-z0-9]{5}-[a-z0-9]{5}$/;
    if (!meetingCodeRegex.test(meetingId)) {
      setJoinError('Invalid meeting code format');
      return;
    }
    setJoinError('');
    navigate(`/meeting/${meetingId}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-semibold text-gray-900">Interview Meet</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Professional Video Interviews Made Easy
              </h1>
              <p className="text-lg text-gray-600">
                Secure, high-quality video interviews with built-in tools for better candidate evaluation.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              {!showMeetingCode ? (
                <button
                  onClick={createNewMeeting}
                  className="flex items-center justify-center w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Start New Interview
                </button>
              ) : (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this code with participants</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      value={generatedCode}
                      readOnly
                      className="flex-1 bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                      title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`/meeting/${generatedCode}`)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Join Interview Now
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full border ${
                    isVideoOn ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="w-6 h-6 text-blue-600" />
                  ) : (
                    <VideoOff className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <button
                  className="p-3 rounded-full border border-gray-200 bg-gray-50"
                >
                  <Calendar className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Join an Interview</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="meetingId" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter meeting code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="meetingId"
                    value={meetingCode}
                    onChange={(e) => {
                      setMeetingCode(e.target.value);
                      setJoinError('');
                    }}
                    placeholder="meet-xxx-xxx-xxx"
                    className={`flex-1 rounded-lg border ${
                      joinError ? 'border-red-300' : 'border-gray-300'
                    } px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                {joinError && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    {joinError}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => joinMeeting(meetingCode)}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Interview
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use a quiet, well-lit space for best results</li>
                <li>• Test your camera and microphone before joining</li>
                <li>• Have your questions prepared in advance</li>
                <li>• Keep the meeting link private and secure</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
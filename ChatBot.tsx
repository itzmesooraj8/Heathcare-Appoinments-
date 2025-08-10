import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User, Bot, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'doctor';
  timestamp: Date;
  type?: 'text' | 'appointment' | 'prescription';
}

interface ChatBotProps {
  doctorId?: string;
  patientId?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ doctorId, patientId }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your healthcare assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('appointment') || input.includes('booking')) {
      return 'I can help you book an appointment. What type of consultation do you need? Please specify the department or doctor\'s specialization.';
    }
    
    if (input.includes('prescription') || input.includes('medication')) {
      return 'For prescription requests, I recommend consulting with your doctor directly. You can message Dr. Johnson through the chat or book an appointment for a proper consultation.';
    }
    
    if (input.includes('symptoms') || input.includes('pain') || input.includes('fever')) {
      return 'I understand you\'re experiencing symptoms. While I can provide general information, it\'s important to consult with a healthcare professional for proper diagnosis and treatment. Would you like me to help you book an urgent appointment?';
    }
    
    if (input.includes('test results') || input.includes('reports')) {
      return 'Your test results are available in the Medical Records section of your dashboard. If you need help interpreting them, I recommend discussing with your doctor.';
    }
    
    if (input.includes('emergency')) {
      return '🚨 For medical emergencies, please call 911 immediately or visit your nearest emergency room. This chat is not for emergency situations.';
    }
    
    return 'I\'m here to help with general healthcare questions, appointment booking, and navigating your patient portal. Could you please provide more details about what you need assistance with?';
  };

  const quickActions = [
    'Book an appointment',
    'View my prescriptions',
    'Check test results',
    'Contact my doctor',
    'Update my profile'
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500 rounded-full">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Healthcare Assistant</h3>
            <p className="text-sm text-blue-100">Online</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-blue-100 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`p-2 rounded-full ${
                message.sender === 'user' 
                  ? 'bg-blue-600' 
                  : message.sender === 'doctor'
                  ? 'bg-green-600'
                  : 'bg-gray-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : message.sender === 'doctor' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-600 rounded-full">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 py-2">
          <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-1">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(action)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
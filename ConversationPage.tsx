
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Message } from '../types';
import { conversations, messagesByConversationId } from '../data/messages';
import { users, ME_USER_ID } from '../data/users';

const ConversationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const conversation = conversations.find(c => c.id === id);
  const participant = conversation?.participant;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && messagesByConversationId[id]) {
      setMessages(messagesByConversationId[id]);
    } else {
        // Handle case where conversation doesn't exist, maybe redirect
    }
  }, [id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      senderId: ME_USER_ID,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };
  
  if (!participant) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background-dark">
            <p className="text-white">Conversation not found.</p>
            <button onClick={() => navigate('/messages')} className="mt-4 text-primary">Go back</button>
        </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background-dark">
      <header className="flex items-center bg-[#1C1C1C] p-4 pb-3 shadow-md z-20 shrink-0">
        <button onClick={() => navigate('/messages')} className="flex items-center justify-center rounded-full h-10 w-10 text-slate-300 hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="relative size-10 shrink-0 ml-2">
            <img className="aspect-square rounded-full size-9 object-cover" alt={participant.name} src={participant.avatar}/>
        </div>
        <h1 className="text-white text-lg font-bold flex-1 ml-3">{participant.name}</h1>
        <button className="flex items-center justify-center rounded-full h-10 w-10 text-slate-300 hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-2xl">more_vert</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map(msg => {
            const isUser = msg.senderId === ME_USER_ID;
            const sender = isUser ? users[ME_USER_ID] : participant;
            return (
                <div key={msg.id} className={`flex items-end gap-3 ${isUser ? 'justify-end' : ''}`}>
                    {!isUser && <img className="w-10 h-10 rounded-full shrink-0" src={sender.avatar} alt={sender.name}/>}
                    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
                        <div className={`flex max-w-[80%] rounded-xl p-3 ${isUser ? 'bg-primary text-white rounded-br-sm' : 'bg-[#2A2A2A] text-slate-200 rounded-bl-sm'}`}>
                        <p>{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-1">
                            <p className="text-xs text-slate-500">{msg.timestamp}</p>
                            {isUser && msg.read && <span className="material-symbols-outlined !text-base text-blue-400">done_all</span>}
                        </div>
                    </div>
                    {isUser && <img className="w-10 h-10 rounded-full shrink-0" src={sender.avatar} alt={sender.name}/>}
                </div>
            )
        })}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-background-dark p-4 pt-2 border-t border-slate-800 z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-1 bg-[#2A2A2A] rounded-full px-2">
            <input
              className="flex-1 w-full bg-transparent border-0 py-3 px-3 text-slate-200 placeholder-slate-400 focus:ring-0"
              placeholder="Type your message..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button onClick={handleSend} className="flex items-center justify-center rounded-full h-12 w-12 bg-primary text-white shrink-0">
            <span className="material-symbols-outlined text-2xl">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ConversationPage;
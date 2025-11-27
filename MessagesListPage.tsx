
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { conversations } from '../data/messages';
import { Conversation } from '../types';

const ConversationListItem: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const isUnread = conversation.unreadCount > 0;
    return (
        <Link 
            to={`/messages/${conversation.id}`} 
            className="flex cursor-pointer items-center gap-4 rounded-lg px-2 py-3 min-h-[72px] justify-between hover:bg-white/10"
            aria-label={`Conversation with ${conversation.participant.name}. Last message: ${conversation.lastMessage.text}. ${isUnread ? `${conversation.unreadCount} unread messages.` : ''}`}
        >
            <div className="flex items-center gap-4 flex-1">
                <div className="relative shrink-0">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14" style={{ backgroundImage: `url("${conversation.participant.avatar}")` }}></div>
                    {isUnread && <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary border-2 border-background-dark"></div>}
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                    <p className={`text-base truncate ${isUnread ? 'font-bold text-white' : 'font-medium text-white/80'}`}>{conversation.participant.name}</p>
                    <p className={`text-sm truncate ${isUnread ? 'font-semibold text-primary' : 'font-normal text-slate-400'}`}>{conversation.lastMessage.text}</p>
                </div>
            </div>
            <div className="shrink-0 text-right flex flex-col items-end gap-1.5">
                <p className="text-xs font-normal text-slate-400">{conversation.lastMessage.timestamp}</p>
                {isUnread && <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">{conversation.unreadCount}</div>}
            </div>
        </Link>
    );
};


const MessagesListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery) {
      return conversations;
    }
    const query = searchQuery.toLowerCase();
    return conversations.filter(convo => 
      convo.participant.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-surface-dark">
        <header className="sticky top-0 z-10 flex flex-col bg-surface-dark pt-4">
            <div className="flex items-center p-4 pb-2">
                <h1 className="text-white text-2xl font-bold flex-1">Messages</h1>
            </div>
            <div className="px-4 pb-4">
                <div className="relative">
                    <label htmlFor="search-conversations" className="sr-only">Search conversations</label>
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                    </div>
                    <input 
                      id="search-conversations"
                      className="block w-full rounded-lg border-0 bg-white/10 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary" 
                      placeholder="Search conversations" 
                      type="search"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto px-4">
            <div className="flex flex-col gap-1">
                {filteredConversations.length > 0 ? (
                    filteredConversations.map(convo => (
                        <ConversationListItem key={convo.id} conversation={convo} />
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-400">
                        <p>No conversations found.</p>
                    </div>
                )}
            </div>
        </main>
        
        <div className="fixed bottom-24 right-6">
            <button aria-label="Start new message" className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 500"}}>edit</span>
            </button>
        </div>
    </div>
  );
};

export default MessagesListPage;


import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Post } from '../types';
import { users, ME_USER_ID } from '../data/users';

const mockPosts: Post[] = [
  { id: 1, author: users['5'], timestamp: "2 hours ago", title: "How to price my first freelance project?", content: "I just finished the graphic design course and landed my first client, but I'm not sure how much to charge for a logo design. Any advice would be appreciated!", likes: 25, commentsCount: 15 },
  { id: 2, author: users['6'], timestamp: "5 hours ago", title: "Success Story: My First Freelancing Gig!", content: "Wanted to share that after completing the Digital Marketing module, I've successfully landed my first client for social media management. This community has been a huge help!", likes: 88, commentsCount: 32 },
  { id: 3, author: users[ME_USER_ID], timestamp: "1 day ago", title: "Ask for Help: Best tools for a beginner graphic designer?", content: "Hi everyone! I'm just starting out and feeling a bit overwhelmed by all the software options. What are some must-have (and budget-friendly) tools for a beginner?", likes: 12, commentsCount: 8 },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="bg-card-dark rounded-xl p-4 shadow-sm">
        <div className="flex flex-col items-start gap-3">
            <div className="flex w-full items-center gap-3">
                <div className="size-10 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${post.author.avatar}")` }}></div>
                <div className="flex flex-col">
                    <p className="font-bold text-base text-text-dark-primary">{post.author.name}</p>
                    <p className="text-sm text-text-dark-secondary">{post.timestamp}</p>
                </div>
            </div>
            <h2 className="text-lg font-bold text-text-dark-primary">{post.title}</h2>
            <p className="text-base font-normal leading-relaxed text-text-dark-secondary">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-text-dark-secondary">
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">thumb_up</span><span>{post.likes}</span></div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">chat_bubble</span><span>{post.commentsCount}</span></div>
            </div>
        </div>
    </div>
);

const FilterChip: React.FC<{ label: string; isSelected: boolean; onClick: () => void; }> = ({ label, isSelected, onClick }) => (
    <button onClick={onClick} className={`h-9 shrink-0 px-4 rounded-lg text-sm font-medium ${isSelected ? 'bg-primary text-white' : 'bg-card-dark text-text-dark-secondary'}`}>
        {label}
    </button>
);


const CommunityPage: React.FC = () => {
    const filters = ["All", "My Posts", "Trending"];
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        let posts = [...mockPosts];
        const query = searchQuery.toLowerCase();

        if (activeFilter === "My Posts") {
            posts = posts.filter(p => p.author.id === ME_USER_ID);
        }
        
        if (activeFilter === "Trending") {
            posts.sort((a, b) => (b.likes + b.commentsCount) - (a.likes + a.commentsCount));
        } else {
            // Default sort by time, assuming mockPosts is already sorted newest first
        }

        if (query) {
             posts = posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.author.name.toLowerCase().includes(query)
            );
        }

        return posts;
    }, [searchQuery, activeFilter]);

    return (
        <>
            <Header title="Community" />
            <div className="p-4 sticky top-16 z-10 bg-background-dark/80 backdrop-blur-sm">
                <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dark-secondary">search</span>
                    <input 
                        className="form-input h-12 w-full rounded-lg border-none bg-card-dark pl-10 text-base placeholder:text-text-dark-secondary" 
                        placeholder="Search posts, people, or topics..." 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto whitespace-nowrap [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filters.map(filter => (
                    <FilterChip key={filter} label={filter} isSelected={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
                ))}
            </div>
            <div className="flex flex-col gap-4 p-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <div className="text-center py-10 text-text-dark-secondary">
                        <p>No posts found.</p>
                    </div>
                )}
            </div>
            <div className="fixed bottom-24 right-6 z-20">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg"><span className="material-symbols-outlined text-3xl">add</span></button>
            </div>
        </>
    );
};

export default CommunityPage;
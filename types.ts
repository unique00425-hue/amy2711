
export interface User {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  bio?: string;
  expertise?: string[];
}

export interface Post {
  id: number;
  author: User;
  timestamp: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
}

export interface Product {
  id: number;
  name: string;
  creator: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: 'UI Kits' | 'Templates' | 'E-books' | 'Icons';
}

export interface Course {
    id: number;
    title: string;
    mainCategory: 'Marketing' | 'Design' | 'Coding' | 'Business';
    subCategory: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    icon: string;
    image: string;
    progress: number;
    instructorId: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    tags: string[];
}

export interface Message {
    id: number;
    text: string;
    senderId: string; // 'me' or participant's ID
    timestamp: string;
    read?: boolean;
}

export interface Conversation {
    id: string;
    participant: User;
    lastMessage: {
        text: string;
        timestamp: string;
    };
    unreadCount: number;
}
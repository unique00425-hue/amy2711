
import { Conversation, Message } from '../types';
import { users, ME_USER_ID } from './users';

export const conversations: Conversation[] = [
    { id: '1', participant: users['1'], lastMessage: { text: "That sounds like a great plan! Let's...", timestamp: "5m ago" }, unreadCount: 1 },
    { id: '2', participant: users['2'], lastMessage: { text: "I've sent over the documents you requested.", timestamp: "Yesterday" }, unreadCount: 0 },
    { id: '3', participant: users['3'], lastMessage: { text: "Can we reschedule our meeting for Friday?", timestamp: "10/28/24" }, unreadCount: 0 },
    { id: '4', participant: users['4'], lastMessage: { text: "Perfect, thanks for the update!", timestamp: "10/27/24" }, unreadCount: 1 },
];

export const messagesByConversationId: Record<string, Message[]> = {
    '1': [
        { id: 1, senderId: '1', text: "Hey! Just wanted to follow up on the project proposal. Did you have a chance to look at it?", timestamp: "9:30 AM" },
        { id: 2, senderId: ME_USER_ID, text: "Hi Eleanor, yes I did! It looks great. I have a couple of minor questions, but overall I'm ready to move forward.", timestamp: "9:32 AM", read: true },
        { id: 3, senderId: '1', text: "That sounds like a great plan! Let's schedule a quick call for tomorrow to finalize everything.", timestamp: "9:35 AM" },
    ],
    '2': [
        { id: 1, senderId: ME_USER_ID, text: "Hey Cameron, could you send me the latest design mockups?", timestamp: "Yesterday", read: true },
        { id: 2, senderId: '2', text: "I've sent over the documents you requested.", timestamp: "Yesterday" },
    ],
    '3': [
         { id: 1, senderId: '3', text: "Can we reschedule our meeting for Friday?", timestamp: "10/28/24" },
    ],
    '4': [
        { id: 1, senderId: ME_USER_ID, text: "Just pushed the latest updates to the main branch.", timestamp: "10/27/24", read: true },
        { id: 2, senderId: '4', text: "Perfect, thanks for the update!", timestamp: "10/27/24" },
    ]
};
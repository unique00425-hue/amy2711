
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase';
import { Session } from '@supabase/supabase-js';

import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import CommunityPage from './pages/CommunityPage';
import MessagesListPage from './pages/MessagesListPage';
import ConversationPage from './pages/ConversationPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import ImageEditorPage from './pages/ImageEditorPage';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-background-dark text-white">Loading...</div>; // Or a proper splash screen
  }

  return (
    <HashRouter>
      <div className="h-full min-h-screen bg-background-dark font-display text-text-dark-primary">
        <Routes>
          <Route path="/onboarding" element={!session ? <OnboardingPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!session ? <SignUpPage /> : <Navigate to="/" />} />
          
          <Route 
            path="/*"
            element={
              session ? (
                <MainApp />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

const MainApp: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <main className="flex-1 pb-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/instructors/:id" element={<InstructorProfilePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/messages" element={<MessagesListPage />} />
          <Route path="/messages/:id" element={<ConversationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/image-editor" element={<ImageEditorPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default App;

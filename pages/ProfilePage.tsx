import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { supabase } from '../services/supabase';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    // Hardcoded conversation ID for Eleanor Vance for demonstration
    const eleanorVanceConversationId = "1";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate(ROUTES.LOGIN);
    }

    return (
        <div className="bg-off-black text-off-white min-h-screen">
            <header className="flex items-center p-4 justify-between sticky top-0 z-10 bg-off-black">
                <span className="material-symbols-outlined">arrow_back</span>
                <h1 className="text-lg font-bold">Profile</h1>
                <span className="material-symbols-outlined">more_vert</span>
            </header>

            <main className="flex flex-col gap-4 p-4">
                <div className="flex w-full flex-col gap-6 items-center bg-dark-gray p-6 rounded-xl">
                    <img className="rounded-full w-32 h-32 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARIEXvaGz_gkG_p50ebWdNZQPVdf0FAggk8sR0n7PuLR6jhGKv9v-H4BO_ABtNqHVbZiji97v8pRbD7OjR-cI3N1RcxckeHPuRSq7nUZGRaXVVbe6N9mMrtmjlMeB1jX9-Sii-Hkjlkmhqt0VXaDRUOzD0U4vniFHGULoojbD8zXOuxKfIMMtu0Dxz0j4n2KDolt1MMIYL1ipBFVJehN9WOva-Lh5VFxDvQOfQHcOxNSnS-7f_tXYMyB_QcLZ5qlhOyJ5z-WRqR1uT" alt="Eleanor Vance"/>
                    <div className="text-center">
                        <p className="text-2xl font-bold">Eleanor Vance</p>
                        <p className="text-light-gray">@eleanorv</p>
                    </div>
                    <div className="flex w-full justify-around">
                        <div className="text-center"><p className="text-2xl font-bold">1.2K</p><p className="text-sm text-light-gray">Followers</p></div>
                        <div className="text-center"><p className="text-2xl font-bold">480</p><p className="text-sm text-light-gray">Following</p></div>
                    </div>
                    <div className="flex w-full gap-3">
                        <button className="flex-1 py-2 rounded-lg border border-light-gray/50 text-sm font-bold">Follow</button>
                        <Link to={`/messages/${eleanorVanceConversationId}`} className="flex-1">
                            <button className="w-full py-2.5 rounded-lg bg-primary text-off-black text-sm font-bold">Message</button>
                        </Link>
                    </div>
                </div>

                <div className="bg-dark-gray p-6 rounded-xl">
                    <h2 className="text-lg font-bold">About Me</h2>
                    <p className="text-light-gray mt-2 leading-relaxed">Empowering single mothers through digital skills. Passionate about UI/UX design, front-end development, and creating accessible learning resources for all.</p>
                </div>
                 <div className="flex flex-col gap-4 bg-dark-gray p-6 rounded-xl">
                    <h2 className="text-off-white text-lg font-bold">Forum Activity</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <StatCard icon="edit_note" value="82" label="Posts Created" />
                        <StatCard icon="check_circle" value="45" label="Solutions Provided" />
                        <StatCard icon="forum" value="12" label="Topics Joined" />
                    </div>
                </div>

                <div className="mt-4">
                    <button onClick={handleLogout} className="w-full py-3 rounded-lg bg-red-600/20 text-red-400 text-sm font-bold border border-red-600/30">
                        Logout
                    </button>
                </div>
            </main>
        </div>
    );
};

const StatCard: React.FC<{icon: string, value: string, label: string}> = ({ icon, value, label }) => (
    <div className="flex flex-col gap-2 rounded-lg bg-off-black p-4 items-start text-left">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
        <p className="text-off-white tracking-light text-2xl font-bold leading-tight">{value}</p>
        <p className="text-light-gray text-sm font-normal leading-normal">{label}</p>
    </div>
);


export default ProfilePage;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex flex-col items-center justify-center px-5 gap-1 ${
          isActive ? 'text-primary' : 'text-gray-500 dark:text-white/60'
        } hover:text-primary dark:hover:text-primary`
      }
    >
      <span className="material-symbols-outlined text-2xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface-dark/80 backdrop-blur-lg border-t border-white/10 z-20">
      <div className="grid grid-cols-5 h-full max-w-lg mx-auto">
        <NavItem to={ROUTES.HOME} icon="home" label="Home" />
        <NavItem to={ROUTES.COURSES} icon="school" label="My Courses" />
        <NavItem to={ROUTES.MARKETPLACE} icon="store" label="Market" />
        <NavItem to={ROUTES.MESSAGES} icon="mail" label="Messages" />
        <NavItem to={ROUTES.PROFILE} icon="person" label="Profile" />
      </div>
    </div>
  );
};

export default BottomNav;

import React from 'react';

interface HeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  leftAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, rightAction, leftAction }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center bg-background-dark/80 p-4 justify-between backdrop-blur-sm">
      <div className="flex size-12 shrink-0 items-center justify-start">
        {leftAction}
      </div>
      <h1 className="text-text-dark-primary text-xl font-bold leading-tight tracking-tight flex-1 text-center">
        {title}
      </h1>
      <div className="flex w-12 items-center justify-end">
        {rightAction}
      </div>
    </header>
  );
};

export default Header;

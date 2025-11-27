import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-dark">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
          school
        </span>
      </div>
      <h1 className="text-3xl font-bold text-text-dark-primary">EdSkill Hub</h1>
      <p className="text-text-dark-secondary mt-1">Learn. Lead. Earn. Empower.</p>
    </div>
  );
};

export default Logo;
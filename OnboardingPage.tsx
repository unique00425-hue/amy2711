
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const slides = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Sdh-ojN_OZko_iFOI2Gygk-KYblzea9BAjtKdGWCIPTfzEoZ4cua1ae13aD6P4UCIYicWMBFjkpZPenE9wm4Qh9zQM3ZGOPI8FTImSZSrp-SSbweY5jwex7V_-3-QBy2WftyEBXv2vTyz44aegnnSTXJ9u9sPPLO0y5_S8dXPY_7vKeH_l9LnloIck783dkKNv5EpBd0x4QNd0tdNhsxfDjZewcrtTybx37nbQ42qKh0sxLnadClKozKUZVgLbjXPpjac09otutJ",
      title: "Unlock Your Digital Potential",
      description: "Access high-demand digital skill courses anytime, anywhere."
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPO0YMxthXRewnKV1oQpp9oNEHSULlL8OfwsrEh-i7z641Dwi0w8g7nUlG7sbafD3mIjoPzMMndrtgUTh4P3EBBlhAV3CHAYlE2G8cux3ghbjo05f8Red5PDWOVYaCnkXIPPxa3WKRatn7e5GTTeiHVhGm6TE6yJylSfa2jEe3GA-4y-L1fnxzoXjU6tvQP1X_l6wWo5P6uCpyg20puXxfCPIN9hTiqwQPTF7_4LUozrwbPbysyITT448qRQDLDjth7_nzBV524uSY",
      title: "Turn Skills into Opportunities",
      description: "Connect with freelance projects and entrepreneurial resources to start earning."
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF5aVXMIwfLxNNV3RIbHpOxvhGoFos3NSZwhGUBiLB9f3y78nvcbk1OPnHO5SmBPrR9_GYFap3vz_uEhrarOld6ElXTVubItbVZLIYfU1VJLiikOxqX5P2Lt9RULB-DULIN_joBUFKJTqS2WGQG8LiC89_FcApyL_CfOJWPCJoGtZUDXHBAYsGIkbGSf5EINsmIAsqw6ThXcMWErOF3K5MbnOhmuIrf0zfWZvelyFYNOhQ7iOORTeTpZHmwTdNKQGl5p3XMIQVCSfo",
      title: "Join a Supportive Community",
      description: "Get guidance from mentors and build connections with a network of peers."
    },
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-surface-dark">
      <header className="flex items-center p-4 justify-between">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>
              school
            </span>
            <h2 className="text-xl font-bold text-white">EdSkill Hub</h2>
        </div>
        <button onClick={() => navigate(ROUTES.LOGIN)} className="text-zinc-400 text-base font-bold">Skip</button>
      </header>
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <div className="w-full aspect-square bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: `url("${slides[step].image}")` }}></div>
        <div className="text-center">
          <h1 className="text-white text-2xl font-medium">{slides[step].title}</h1>
          <p className="text-zinc-400 text-sm mt-2">{slides[step].description}</p>
        </div>
      </div>
      <footer className="p-6 flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-primary' : 'w-2 bg-zinc-700'}`}></div>
          ))}
        </div>
        <button onClick={handleNext} className="w-full max-w-md bg-primary text-white font-bold h-12 rounded-lg">
          {step === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </footer>
    </div>
  );
};

export default OnboardingPage;
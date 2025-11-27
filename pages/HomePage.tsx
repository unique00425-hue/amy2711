import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className="bg-surface-dark text-white">
      <div className="sticky top-0 z-10 flex flex-col gap-2 bg-surface-dark p-4 pb-2">
        <div className="flex items-center h-12 justify-between">
          <div className="flex size-12 shrink-0 items-center">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAz6I1jYC-Dji0mbzNlyrC7SowbxMypeS5-0MC1ZWMFGfnTTWWF1118FwOUQOVoInacFzxZPXustpW72uwfPltKBwNpMIqQM-iG_iPZw8a78Pcjpa_Zate7vQ7ZnLfdgtU3jyBe8b8Ivbi87ITIka2z1qCxDKo1SPe64u13ONlqotFMn1nFymdlP0u8WzwTFh3PfLB9wO_5gmq01jXzyAPG3mklZiDLPFh2mN2vZ_p54qscPn6I372xKjkHpq-sxO73x6T7ET2sbRTU")`}}></div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="relative flex items-center justify-center rounded-full h-12 w-12 text-white">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <div className="absolute top-2.5 right-2.5 size-2.5 rounded-full bg-primary ring-2 ring-surface-dark"></div>
            </button>
          </div>
        </div>
        <p className="text-white tracking-light text-[28px] font-bold leading-tight">Welcome back, Maria!</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <Link to={ROUTES.MARKETPLACE} className="flex flex-1 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 flex-col">
          <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
          <div>
            <h2 className="text-white text-base font-bold">Public Marketplace</h2>
            <p className="text-white/60 text-sm">Explore services & products</p>
          </div>
        </Link>
        <Link to={ROUTES.IMAGE_EDITOR} className="flex flex-1 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 flex-col">
          <span className="material-symbols-outlined text-primary text-3xl">image_edit</span>
          <div>
            <h2 className="text-white text-base font-bold">AI Image Editor</h2>
            <p className="text-white/60 text-sm">Edit images with text prompts</p>
          </div>
        </Link>
        <div className="flex flex-1 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 flex-col col-span-2 sm:col-span-1">
          <span className="material-symbols-outlined text-primary text-3xl">settings</span>
          <div>
            <h2 className="text-white text-base font-bold">Settings</h2>
            <p className="text-white/60 text-sm">Adjust your profile</p>
          </div>
        </div>
      </div>

      <h3 className="text-white text-lg font-bold px-4 pb-2 pt-4">Advice & Inspiration</h3>
      <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-4">
          <InspirationCard
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuA8g63MQ2-C5ZDtFp5ercvAe3qvz_0-b62Q6s_NVzZpF6Nu0y4Jc7by1VWvWlO5le7yAC3J7_YwdrWq7MEu-cUL81a04GSixSvCMVc66eREscsqT_-AfwZIEbGUmLWHcbXeByrV7Bsg9EEGBeqfUuQTMfKPD4-fCtlbPudxDzJOhyA0lSEls59IR9R3qG0tfgPabHGp-ip2HIi09EBylA_Tg4pn4qZeH7KcaFJGu1sA5slzbn_22Uc6-zvdYol8WgYpr4KaE8psfSfE"
            title="Tip: Boost Your Social Media Presence"
            subtitle="Quick tips"
          />
          <InspirationCard
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCQRwxtMctabL6HN2Y5hVGvFhsNCZe6qgq_KGZ3gC4Kx1v_89Yj7JEQe4sRESLq4U6w00vQ-iPGKUiXNKBPCTLVS7VZ_EKt51lRs5UyZk-Wstm1zPWoIkT8fXXi7hMR9UuOhYficPoiQ56ArCVVYwA812G0JeNITZtGzqGL_G1vm6flakOU5XzV0JHxzdgSfIxtqEVpra4VObrnxd4XKv9LGJIFIdrjDZvzirBr8AvMXZSh4UzyFogewUirp8RFn0Swx-p06LS3tALn"
            title="Success Story: How Jane Launched Her Business"
            subtitle="Inspiration"
          />
        </div>
      </div>
    </div>
  );
};

const InspirationCard: React.FC<{imageUrl: string; title: string; subtitle: string}> = ({imageUrl, title, subtitle}) => (
    <div className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-64">
        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{backgroundImage: `url("${imageUrl}")`}}></div>
        <div>
            <p className="text-white text-base font-medium">{title}</p>
            <p className="text-white/60 text-sm">{subtitle}</p>
        </div>
    </div>
)

export default HomePage;

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Product } from '../types';

const mockProducts: Product[] = [
  { id: 1, name: "Modern UI Kit", creator: "Jane Doe", price: 49.99, rating: 4.9, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrosA5_WEh8T27ZC4osOsvzBnojuwJ5OamhRtv4YeHZ3NBq2kdp45gYXT46R_okFsSKFAPpRV4gSU2bC7UT3hi7c4UtovgwKbmMKP6Wmmc4-LaqklrjWRx-PR8R2ayXEusSITd6METtu0Sx9eZqnQRGp1nAahF11Gb4TXTNrukCa-rBh0yNgDYNusz2aR8CzpyBBMDZhNrFeoUk9XYdTj-jUtr-2AP68w538Lzo7i1HUmQk7R0qxrGMLQcvb_9xBNv7haaS1p3Lt8b", category: 'UI Kits' },
  { id: 2, name: "Photography Essentials", creator: "John Smith", price: 25.00, rating: 4.8, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpw1vyNf0SJ0VMYFopmhVR1ZPhduLFxazSrQashirl7mqtKo--SR1iRPx9uvJgdEpZoJVjkbZGPJcy7UwW22G7K_IFrPGG7oF1ix38902wa8TQI3qOHzXmTC37X6opYEIGwfnLOm0-8G_hkJS_QbgQjgEsVRnjg1LcSnR7AcZi-VYnI7q53nGObfEIgc_84Mg3CV3hrbxxFMxGW_6MAxuhCe6dwJc0JSB2T7e6XFLDDBfW5d7P3424ib-zuuXAN9wfic4Etj_-yWyb", category: 'E-books' },
  { id: 3, name: "Business Plan Template", creator: "Emily White", price: 19.99, rating: 5.0, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwArQCHBARIi5afqE8H2YWHQJdWMpgDLP2XyCZqyRacKbG717s_LFmokgBVD6qkKIlAmM5rqFUiwWf_0_gl_x6TM2B-NiGNZEDCTCIr8ikaplEOJgi8QKU-GKH1snhx7b8tHqlTc9fSc2ogu_-ODuSk4HgnoTqLNrvk4QhZRPQ3KoNb15faORKU8cbaQZ1m69sJi2ynQYLjPyJuju9TWo45sk8a17oI6XJ6oN-wU57xpccfplnHB3OEr4res0ARkEvQAeOnd-c4whd", category: 'Templates' },
  { id: 4, name: "Social Media Pack", creator: "Chris Green", price: 35.00, rating: 4.7, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdoSpkXgW-xh6F21MUQURE6wTYnBJKSGNVdRJUSb2cZV7EGDU1B1xTbYyVb3bbzRhuzNvkBsnt2PhnAgfU4JEmHdwvbSvi-GlEure4lTBZen145OhWMkE-E4migyIB8UEByl7thxNRnvGnPrUqmqvBwrJsFfbt6VQedsPfXy5Av08OHdFZUhfcEwqN335-InDlv4hvaqgB67MDsJgDvreXxnNeeBOq2iZ9p3KhWe5l1BDli6FzazhXBW6EIDI24hKp6o2c7GB-EkLB", category: 'Templates' },
  { id: 5, name: "E-commerce Icon Set", creator: "Alex Blue", price: 15.00, rating: 4.9, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ5A8sS-ZEICooiJXnSe78Q0rbFA-CeRjO_s8pOQGyvltOPFys9Wyb4CC23ipjfd8P1XBdVV6N6zUHYkOfX5tCJqSbfII4agVOGofOjjp9uTYQBOEfKrrHTXSafRbuSfofR7r7JmFP6875Qu98GVaOV6gFn3yD-APLT_UCp7gvIdcFpp7rBS9pfhsft40CwGp-D0r_T28cNZ4eupftbOpGtPOO-NgwmhlFyWLrfBkdt2UBtK4gZuKhK9RUtTpeB2k-kRK2dJKTAcXk", category: 'Icons' },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="flex flex-col gap-2 rounded-xl bg-card-dark p-2">
    <div className="relative w-full overflow-hidden rounded-lg bg-cover bg-center pt-[125%]" style={{ backgroundImage: `url("${product.imageUrl}")` }}>
      <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
        <span className="material-symbols-outlined text-lg text-white">favorite</span>
      </button>
    </div>
    <div className="flex flex-col p-1">
      <p className="truncate text-base font-semibold">{product.name}</p>
      <p className="text-sm text-text-dark-secondary">{product.creator}</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-base font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-0.5">
          <span className="material-symbols-outlined text-base text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <p className="text-sm font-medium text-text-dark-secondary">{product.rating}</p>
        </div>
      </div>
    </div>
  </div>
);

const FilterChip: React.FC<{ label: string; isSelected: boolean; onClick: () => void; }> = ({ label, isSelected, onClick }) => (
    <button onClick={onClick} className={`h-10 shrink-0 items-center justify-center rounded-lg px-4 text-sm font-medium ${isSelected ? 'bg-primary text-white' : 'bg-card-dark text-text-dark-secondary'}`}>
        {label}
    </button>
);


const MarketplacePage: React.FC = () => {
    const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return mockProducts.filter(product => {
            const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
            const searchMatch = query === '' || 
                product.name.toLowerCase().includes(query) ||
                product.creator.toLowerCase().includes(query);
            return categoryMatch && searchMatch;
        });
    }, [searchQuery, selectedCategory]);

  return (
    <>
      <Header
        title="Marketplace"
        leftAction={<></>}
        rightAction={
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full"><span className="material-symbols-outlined text-2xl">shopping_cart</span></button>
          </div>
        }
      />
       <div className="sticky top-16 z-10 bg-background-dark/80 px-4 pb-3 pt-2 backdrop-blur-sm">
            <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-dark-secondary">search</span>
                <input 
                    className="form-input h-12 w-full rounded-lg border-none bg-card-dark pl-10 text-base placeholder:text-text-dark-secondary" 
                    placeholder="Search products or creators..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(cat => (
                <FilterChip key={cat} label={cat} isSelected={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />
            ))}
        </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 px-4">
        {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="fixed bottom-24 right-4 z-20 sm:bottom-6">
        <button className="flex h-14 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-primary pl-5 pr-6 text-base font-bold text-white shadow-lg">
          <span className="material-symbols-outlined">upload</span>
          <span className="truncate">Upload</span>
        </button>
      </div>
    </>
  );
};

export default MarketplacePage;
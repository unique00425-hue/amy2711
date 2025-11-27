import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allCourses } from '../data/courses';
import { Course } from '../types';
import { users } from '../data/users';


const FilterChip: React.FC<{ label: string; isSelected: boolean; onClick: () => void; }> = ({ label, isSelected, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-full shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-zinc-800 text-zinc-300'}`}>
        {label}
    </button>
);

const ContinueLearningCard: React.FC<{ course: Course }> = ({ course }) => (
    <Link to={`/courses/${course.id}`} className="flex h-full w-72 flex-1 flex-col gap-3 rounded-xl bg-zinc-800 p-3">
        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex items-center justify-center relative" style={{ backgroundImage: `url("${course.image}")`}}>
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            <span className="material-symbols-outlined text-white text-5xl z-10">play_circle</span>
        </div>
        <div>
            <p className="text-white text-base font-medium leading-normal">{course.title}</p>
            <p className="text-zinc-400 text-sm font-normal leading-normal">{course.mainCategory}</p>
            <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-3">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
             <p className="text-xs text-zinc-500 mt-1">{course.progress}% Complete</p>
        </div>
    </Link>
);

const ExploreCourseCard: React.FC<{ course: Course }> = ({ course }) => (
     <Link to={`/courses/${course.id}`} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors">
        <img className="h-20 w-20 rounded-lg object-cover" alt={course.title} src={course.image} />
        <div className="flex-1">
            <p className="font-medium text-white">{course.title}</p>
            <p className="text-sm text-zinc-400">{course.mainCategory} • {course.difficulty}</p>
            {course.progress > 0 && (
                 <div className="mt-2">
                    <div className="w-full bg-zinc-700 rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{course.progress}% Complete</p>
                </div>
            )}
        </div>
        <span className="material-symbols-outlined text-zinc-400">{course.icon}</span>
    </Link>
);


const CoursesPage: React.FC = () => {
    const mainCategories = ["All", "Marketing", "Design", "Coding", "Business"];
    const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [showAllCourses, setShowAllCourses] = useState(false);

    const inProgressCourses = useMemo(() => allCourses.filter(c => c.progress > 0), []);

    const subCategories = useMemo(() => {
        if (selectedCategory === 'All') return [];
        const subs = allCourses
            .filter(c => c.mainCategory === selectedCategory)
            .map(c => c.subCategory);
        return ['All', ...Array.from(new Set(subs))];
    }, [selectedCategory]);

    useEffect(() => {
        setSelectedSubCategory('All');
    }, [selectedCategory]);
    
    const filteredCourses = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return allCourses.filter(course => {
            const instructor = users[course.instructorId];
            const categoryMatch = selectedCategory === 'All' || course.mainCategory === selectedCategory;
            const difficultyMatch = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
            const subCategoryMatch = selectedCategory === 'All' || selectedSubCategory === 'All' || course.subCategory === selectedSubCategory;
            const searchMatch = query === '' || 
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.tags.some(tag => tag.toLowerCase().includes(query)) ||
                (instructor && instructor.name.toLowerCase().includes(query));

            return categoryMatch && difficultyMatch && subCategoryMatch && searchMatch;
        });
    }, [searchQuery, selectedCategory, selectedDifficulty, selectedSubCategory]);


  return (
    <div className="bg-surface-dark text-white">
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-surface-dark/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white">My Courses</h2>
        </header>

        <main className="flex-1 pb-4">
            
            {inProgressCourses.length > 0 ? (
                <>
                    <h3 className="text-lg font-bold px-4 pb-2 pt-4 text-white">Continue where you left off</h3>
                     <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex items-stretch p-4 gap-4 flex-shrink-0">
                            {inProgressCourses.map(course => <ContinueLearningCard key={course.id} course={course} />)}
                        </div>
                    </div>
                </>
            ) : (
                !showAllCourses && (
                    <div className="text-center py-16 px-4">
                        <span className="material-symbols-outlined text-6xl text-zinc-500">school</span>
                        <h3 className="text-xl font-bold mt-4">Start Your Learning Journey</h3>
                        <p className="text-zinc-400 mt-2">You haven't enrolled in any courses yet. Explore our catalog to find your next skill!</p>
                        <button onClick={() => setShowAllCourses(true)} className="mt-6 bg-primary text-white font-bold py-3 px-6 rounded-lg">
                            Explore Courses
                        </button>
                    </div>
                )
            )}

            {(showAllCourses || inProgressCourses.length > 0) && (
                <>
                    <div className="flex justify-between items-center px-4 pt-4">
                         <h3 className="text-lg font-bold text-white">Explore Courses</h3>
                         {inProgressCourses.length > 0 && (
                            <button onClick={() => setShowAllCourses(prev => !prev)} className="text-primary font-semibold text-sm">
                                {showAllCourses ? 'Hide' : 'Show All'}
                            </button>
                         )}
                    </div>
                    
                    {showAllCourses && (
                    <>
                        <div className="px-4 pt-4">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-slate-400">search</span>
                                </div>
                                <input 
                                    className="block w-full rounded-lg border-0 bg-white/10 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary" 
                                    placeholder="Search courses, skills, or instructors..." 
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <h4 className="text-md font-semibold px-4 pb-2 pt-4 text-zinc-300">Category</h4>
                        <div className="flex overflow-x-auto px-4 gap-3 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {mainCategories.map((cat) => (
                                <FilterChip key={cat} label={cat} isSelected={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />
                            ))}
                        </div>

                        {subCategories.length > 0 && (
                            <>
                                <h4 className="text-md font-semibold px-4 pb-2 pt-4 text-zinc-300">Sub-Category</h4>
                                <div className="flex overflow-x-auto px-4 gap-3 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {subCategories.map((subCat) => (
                                        <FilterChip key={subCat} label={subCat} isSelected={selectedSubCategory === subCat} onClick={() => setSelectedSubCategory(subCat)} />
                                    ))}
                                </div>
                            </>
                        )}

                        <h4 className="text-md font-semibold px-4 pb-2 pt-4 text-zinc-300">Difficulty</h4>
                        <div className="flex overflow-x-auto px-4 gap-3 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {difficulties.map((level) => (
                                <FilterChip key={level} label={level} isSelected={selectedDifficulty === level} onClick={() => setSelectedDifficulty(level)} />
                            ))}
                        </div>

                        <div className="px-4 pt-6 flex flex-col gap-4">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map(course => (
                                <ExploreCourseCard key={course.id} course={course} />
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-zinc-400">No courses found with these filters.</p>
                                </div>
                            )}
                        </div>
                    </>
                    )}
                </>
            )}
        </main>
    </div>
  );
};

export default CoursesPage;
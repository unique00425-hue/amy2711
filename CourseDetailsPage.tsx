
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allCourses } from '../data/courses';
import { users } from '../data/users';

const CourseDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = allCourses.find(c => c.id.toString() === id);
    const [activeTab, setActiveTab] = useState('About');
    
    if (!course) {
        return <div className="p-4 text-white">Course not found.</div>;
    }

    const instructor = users[course.instructorId];

    const tabs = ['About', 'Curriculum', 'Reviews'];

    const mockCurriculum = [
        { title: 'Module 1: Introduction to UI/UX', lessons: ['What is UI/UX?', 'History of Design', 'Key Principles'] },
        { title: 'Module 2: User Research', lessons: ['Creating Personas', 'Conducting Interviews', 'Journey Mapping'] },
        { title: 'Module 3: Prototyping in Figma', lessons: ['Basics of Figma', 'Creating Wireframes', 'Interactive Prototypes'] },
    ];
    
    const mockReviews = [
        { name: 'Ben Carter', avatar: users['6'].avatar, rating: 5, comment: 'This course was a game-changer for me. Highly recommend!' },
        { name: 'Amelia Harper', avatar: users['5'].avatar, rating: 4, comment: 'Great content and the instructor is very knowledgeable.' },
    ];


    return (
        <div className="bg-background-dark min-h-screen text-white">
            <header className="sticky top-0 z-10 flex items-center bg-background-dark/80 p-4 backdrop-blur-sm">
                <button onClick={() => navigate(-1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="flex-1 text-center text-lg font-bold">Course Details</h2>
                <div className="flex w-10 items-center justify-end gap-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full"><span className="material-symbols-outlined text-2xl">bookmark_border</span></button>
                </div>
            </header>

            <main className="pb-32">
                <div className="px-4">
                    <img src={course.image} alt={course.title} className="w-full h-60 object-cover rounded-xl" />
                </div>
                
                <div className="p-4">
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    
                    {instructor && (
                        <Link to={`/instructors/${instructor.id}`} className="flex items-center gap-3 mt-4">
                            <img src={instructor.avatar} alt={instructor.name} className="h-10 w-10 rounded-full object-cover" />
                            <p className="font-medium text-zinc-300">{instructor.name}</p>
                        </Link>
                    )}
                </div>
                
                 <div className="flex items-center justify-between gap-4 px-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                             {[...Array(5)].map((_, i) => <span key={i} className={`material-symbols-outlined !text-xl ${i < Math.floor(course.rating) ? 'text-amber-400' : 'text-zinc-600'}`} style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                        </div>
                        <p className="text-sm font-medium text-zinc-400">{course.rating} ({course.reviews} Reviews)</p>
                    </div>
                    <p className="text-2xl font-bold">${course.price.toFixed(2)}</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-zinc-800 mt-4">
                    <nav className="flex space-x-4 px-4">
                        {tabs.map(tab => (
                             <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-zinc-400'}`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    {activeTab === 'About' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold mb-2">About this course</h3>
                                <p className="text-zinc-400 leading-relaxed">{course.description}</p>
                            </div>
                             <div>
                                <h3 className="text-lg font-bold mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {course.tags.map(tag => <span key={tag} className="rounded-full bg-surface-dark px-4 py-2 text-sm font-medium text-zinc-300">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Curriculum' && (
                         <div>
                            <h3 className="text-lg font-bold mb-4">Course Curriculum</h3>
                            <div className="space-y-4">
                                {mockCurriculum.map((module, index) => (
                                    <div key={index}>
                                        <h4 className="font-semibold text-white mb-2">{module.title}</h4>
                                        <ul className="space-y-2 pl-2">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <li key={lessonIndex} className="flex items-center gap-3 text-zinc-400">
                                                    <span className="material-symbols-outlined text-primary !text-xl">play_circle</span>
                                                    <span>{lesson}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Reviews' && (
                         <div>
                            <h3 className="text-lg font-bold mb-4">Student Reviews</h3>
                            <div className="space-y-6">
                                {mockReviews.map((review, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover" />
                                        <div>
                                            <p className="font-semibold">{review.name}</p>
                                            <div className="flex items-center my-1">
                                                {[...Array(5)].map((_, i) => <span key={i} className={`material-symbols-outlined !text-base ${i < review.rating ? 'text-amber-400' : 'text-zinc-600'}`} style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                                            </div>
                                            <p className="text-zinc-400 text-sm">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </main>

            <footer className="fixed bottom-0 left-0 right-0 w-full bg-background-dark/80 p-4 backdrop-blur-sm border-t border-zinc-800">
                <div className="flex w-full items-center gap-4">
                    <button className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-dark text-primary font-bold">Add to Cart</button>
                    <button className="flex h-14 flex-1 items-center justify-center rounded-full bg-primary text-white font-bold">Buy Now</button>
                </div>
            </footer>
        </div>
    );
};

export default CourseDetailsPage;

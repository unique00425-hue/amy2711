import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import { allCourses } from '../data/courses';

const InstructorProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const instructor = Object.values(users).find(u => u.id === id);
    const instructorCourses = allCourses.filter(c => c.instructorId === id);

    if (!instructor) {
        return <div className="p-4 text-white">Instructor not found.</div>;
    }

    return (
        <div className="bg-off-black text-off-white min-h-screen">
            <header className="flex items-center p-4 justify-between sticky top-0 z-10 bg-off-black">
                <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-center flex-1">Profile</h1>
                <div className="w-12"></div>
            </header>

            <main className="flex flex-col gap-4 p-4">
                <div className="flex w-full flex-col gap-6 items-center bg-dark-gray p-6 rounded-xl">
                    <img className="rounded-full w-32 h-32 object-cover" src={instructor.avatar} alt={instructor.name}/>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{instructor.name}</p>
                        <p className="text-light-gray">{instructor.handle}</p>
                    </div>
                    <div className="flex w-full gap-3">
                         <Link to={`/messages/${instructor.id}`} className="flex-1">
                            <button className="w-full py-2.5 rounded-lg bg-primary text-off-black text-sm font-bold">Message</button>
                        </Link>
                    </div>
                </div>

                {instructor.bio && (
                     <div className="bg-dark-gray p-6 rounded-xl">
                        <h2 className="text-lg font-bold">About Me</h2>
                        <p className="text-light-gray mt-2 leading-relaxed">{instructor.bio}</p>
                        {instructor.expertise && instructor.expertise.length > 0 && (
                             <div className="mt-4">
                                <h3 className="text-base font-bold mb-3">Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {instructor.expertise.map(skill => <span key={skill} className="bg-off-black text-primary text-xs font-semibold px-3 py-1.5 rounded-full">{skill}</span>)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                <div>
                    <h2 className="text-lg font-bold text-off-white px-2 py-4">Courses by {instructor.name}</h2>
                    <div className="flex flex-col gap-4">
                        {instructorCourses.map(course => (
                            <Link to={`/courses/${course.id}`} key={course.id} className="flex items-center gap-4 p-3 rounded-xl bg-dark-gray">
                                <img className="h-20 w-20 rounded-lg object-cover" alt={course.title} src={course.image} />
                                <div className="flex-1">
                                    <p className="font-medium text-white">{course.title}</p>
                                    <p className="text-sm text-zinc-400">{course.mainCategory} • {course.difficulty}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InstructorProfilePage;
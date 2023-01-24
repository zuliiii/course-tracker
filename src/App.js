import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  
  const loadCourses = async () => {
    try {
      const res = await fetch('https://course-tracker.zuleyxasuleymanova.workers.dev/');
      const courses = await res.json();
      setCourses(courses);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);
  
  return (
    <div className="container mt-5">
          <h1 className="mb-5 text-center">Course Tracker</h1>
          <CourseForm courseAdded={loadCourses} />
          <CourseList courses={courses} refreshCourses={loadCourses} />
    </div>
  );
}

export default App;

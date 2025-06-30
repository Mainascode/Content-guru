import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './calendarTailwind.css';

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [courseDates, setCourseDates] = useState([]);
  const [enrollmentDates, setEnrollmentDates] = useState([]);

  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await fetch("https://content-guru.onrender.com/api/calendar-dates");
        const data = await res.json();
        setCourseDates(data.courses.map(date => new Date(date)));
        setEnrollmentDates(data.enrollments.map(date => new Date(date)));
      } catch (error) {
        console.error("Using fallback dates");
        setCourseDates([new Date(2025, 6, 10), new Date(2025, 6, 20)]);
        setEnrollmentDates([new Date(2025, 6, 5), new Date(2025, 6, 18)]);
      }
    }
    fetchDates();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isCourse = courseDates.some(d => d.toDateString() === date.toDateString());
      const isEnroll = enrollmentDates.some(d => d.toDateString() === date.toDateString());

      if (isCourse && isEnroll) return 'tw-highlight-both';
      if (isCourse) return 'tw-highlight-course';
      if (isEnroll) return 'tw-highlight-enroll';
    }
    return null;
  };
 return (
  <section className="bg-yellow-50 px-4 sm:px-6 md:px-8 py-10 min-h-screen flex flex-col items-center">
  <h2 className="text-3xl font-bold text-yellow-800 text-center mb-6">
    📆 Upcoming Courses & Enrollment Days
  </h2>

  <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
    <div className="w-full overflow-x-auto">
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        className="w-full"
      />
    </div>
  </div>
</section>
 );
}
export default CalendarPage;

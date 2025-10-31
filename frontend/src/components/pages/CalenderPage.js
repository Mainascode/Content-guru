// src/pages/CalendarPage.jsx
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './calendarTailwind.css';

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [courseDates, setCourseDates] = useState([]);
  const [enrollmentDatesFromApi, setEnrollmentDatesFromApi] = useState([]);

  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await fetch("https://content-guru-e25z.onrender.com/api/calendar-dates");
        const data = await res.json();
        setCourseDates((data.courses || []).map(d => new Date(d)));
        setEnrollmentDatesFromApi((data.enrollments || []).map(d => new Date(d)));
      } catch (error) {
        console.error("Using fallback dates");
        setCourseDates([new Date(2025, 6, 10), new Date(2025, 6, 20)]);
        setEnrollmentDatesFromApi([new Date(2025, 6, 5), new Date(2025, 6, 18)]);
      }
    }
    fetchDates();
  }, []);

  // Returns true if date is Mon-Fri
  const isWeekday = (date) => {
    const day = date.getDay(); // 0 Sunday, 1 Monday ... 6 Saturday
    return day >= 1 && day <= 5;
  };

  // Check if a date exists in an array (comparing date string to ignore time)
  const dateInArray = (date, arr) => arr.some(d => d.toDateString() === date.toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isCourse = dateInArray(date, courseDates);
      // enrollment if weekday OR explicitly present in API enrollments
      const isEnroll = isWeekday(date) || dateInArray(date, enrollmentDatesFromApi);

      if (isCourse && isEnroll) return 'tw-highlight-both';
      if (isCourse) return 'tw-highlight-course';
      if (isEnroll) return 'tw-highlight-enroll';
    }
    return null;
  };

  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 py-10 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-[#8B4513] text-center mb-6">
        Upcoming Courses & Enrollment Days
      </h2>

      <div className="w-full max-w-md bg-white rounded-xl shadow p-4 overflow-x-auto">
        <div className="min-w-[320px]">
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#8B4513]">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded"></span> Course Date
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span> Enrollment Day (Mon–Fri)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-purple-600 rounded"></span> Both
        </div>
      </div>
    </section>
  );
};

export default CalendarPage;

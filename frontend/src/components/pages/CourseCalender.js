import { useState } from "react";
import AdminCalendar from "./AdminCalendar";
import PublicCalendar from "./PublicCalendar";

export default function CourseCalendarPage({ isAdmin }) {
  const [date, setDate] = useState(new Date());

  const tileClassName = ({ date }) => {
    return isEnrollmentDay(date) ? "bg-green-400" : null;
  };

  const onSaveEnrollmentDate = async (selectedDate) => {
    await fetch("/api/enrollment-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate }),
    });
  };

  return isAdmin ? (
    <AdminCalendar
      date={date}
      setDate={setDate}
      tileClassName={tileClassName}
      onSaveEnrollmentDate={onSaveEnrollmentDate}
    />
  ) : (
    <PublicCalendar
      date={date}
      tileClassName={tileClassName}
    />
  );
}


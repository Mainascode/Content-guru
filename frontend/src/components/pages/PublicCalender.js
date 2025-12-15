import CourseCalendar from "./CourseCalendar";

export default function PublicCalendar({ date, tileClassName }) {
  return (
    <section className="bg-yellow-50 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Course Calendar</h2>

        <p className="mb-6 text-gray-700">
          Highlighted dates show open enrollment periods.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <CourseCalendar
            date={date}
            tileClassName={tileClassName}
            readOnly
          />
        </div>
      </div>
    </section>
  );
}

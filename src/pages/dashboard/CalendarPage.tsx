import MeetingCalendar from '../../components/calendar/MeetingCalendar';

const CalendarPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Meeting Schedule
      </h1>

      <MeetingCalendar />
    </div>
  );
};

export default CalendarPage;

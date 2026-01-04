import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
}

const MeetingCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleDateSelect = (selectInfo: any) => {
    const newEvent: CalendarEvent = {
      id: String(events.length + 1),
      title: 'Available',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      backgroundColor: '#22c55e',
    };

    setEvents([...events, newEvent]);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleDateSelect}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        height="auto"
      />
    </div>
  );
};

export default MeetingCalendar;

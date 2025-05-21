import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {
  return (
    <div id='main-part'>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
        />
    </div>
  )
}

export default Calendar
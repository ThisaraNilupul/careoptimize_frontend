import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '../../../components/BaseButton-component/Button';
import Card from '../../../components/BaseCard-component/Card';
import './PatientCalendar.css';

const localizer = momentLocalizer(moment);

const PatientCalendar = () => {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([
    { start: new Date('2024-09-10'), end: new Date('2024-09-10'), title: 'Appointment with Dr. Smith' },
    { start: new Date('2024-09-10'), end: new Date('2024-09-10'), title: 'Appointment with Dr. Smith' },
    { start: new Date('2024-09-15'), end: new Date('2024-09-15'), title: 'Lab Test' },
  ]);

  return (
    <div className="patient-calendar-container">
        <Button text="Add Event" height="40px" width="300px" className="add-event-button" />
        <Card width="100%" height="100%">
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={view}
                views={['month', 'week']}
                style={{ height: 510, margin: '5px' }}
                eventPropGetter={(event) => ({
                    style: {
                    backgroundColor: '#ff8a65',
                    borderRadius: '5px',
                    color: 'white',
                    border: 'none',
                    display: 'block',
                    },
                })}
                components={{
                    event: ({ event }) => (
                      <span data-tooltip-id={`tooltip-${event.start}`} data-tooltip-content={event.title}>
                        {event.title}
                      </span>
                    ),
                  }}
                />
                {events.map((event, index) => (
                <Tooltip
                    key={index}
                    id={`tooltip-${event.start}`}
                    content={event.title}
                />
            ))}
        </Card>
    </div>
  );
};

export default PatientCalendar;

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ButtonMain from '../../../components/BaseButton-component/Button';
import SubButton from '../../../components/BaseButton-component/SubButton';
import Card from '../../../components/BaseCard-component/Card';
import AddIcon from '@mui/icons-material/Add';
import { LuX } from "react-icons/lu";
import './PatientCalendar.css';
import { green} from '@mui/material/colors';

const greenMain = green.A400;
const greenHover = green.A700;

const localizer = momentLocalizer(moment);

const PatientCalendar = () => {
  const [isOpenAddEvent, setIsOpenAddEvent] = useState(false);
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([
    { start: new Date('2024-09-10'), end: new Date('2024-09-10'), title: 'Appointment with Dr. Smith' },
    { start: new Date('2024-09-10'), end: new Date('2024-09-10'), title: 'Appointment with Dr. Smith' },
    { start: new Date('2024-09-15'), end: new Date('2024-09-15'), title: 'Lab Test' },
  ]);

  const handleOpenAddEvent = () => {
    setIsOpenAddEvent(true);
  }

  const handleCloseAddEvent = () => {
    setIsOpenAddEvent(false);
  }

  return (
    <div className="patient-calendar-container">
        <ButtonMain text="Add Note" height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} onClick={handleOpenAddEvent} icon={<AddIcon/>}/>
        <Card width="100%" height="78vh">
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView={view}
                views={['month', 'week']}
                style={{ height: 508, margin: '5px' }}
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
        {isOpenAddEvent && (
          <div className="popup">
            <Card width="50%" height="60vh">
              <div className="popup-title">Add New Note
                <SubButton icon={<LuX />} height="30px" width="30px" onClick={handleCloseAddEvent} />
              </div>
            </Card>
          </div>
        )}
    </div>
  );
};

export default PatientCalendar;

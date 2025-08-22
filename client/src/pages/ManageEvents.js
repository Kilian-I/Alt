import React from 'react';
import '../styles/ManageEvents.css';

const ManageEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Team Building Workshop',
      date: '2024-12-15',
      time: '14:00 - 17:00',
      location: 'Conference Room A',
      description: 'Annual team building event',
      participants: '22/30 participants',
      resources: ['Workshop Materials.pdf', 'Schedule.docx'],
    },
    {
      id: 2,
      title: 'Project Review Meeting',
      date: '2024-12-10',
      time: '10:00 - 11:30',
      location: 'https://meet.company.com/review',
      description: 'Q4 project review',
      participants: '8/15 participants',
      resources: ['Project Report.pdf'],
    },
  ];

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>Events</h2>
        <button className="create-event-btn">Create Event</button>
      </div>
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-info">
              <h3>{event.title}</h3>
              <div className="event-details">
                <p>📅 {event.date}</p>
                <p>🕒 {event.time}</p>
                <p>📍 {event.location}</p>
                <p>👥 {event.participants}</p>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-resources">
                <h4>Resources</h4>
                <div className="resources-list">
                  {event.resources.map((resource, index) => (
                    <span key={index} className="resource-tag">📄 {resource}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="event-actions">
              <button className="rsvp-btn">RSVP</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
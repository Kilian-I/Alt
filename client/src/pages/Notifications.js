import React from 'react';
import '../styles/Notifications.css';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'event_invitation',
      title: 'New Event Invitation',
      content: 'You have been invited to "Team Building Workshop"',
      priority: 'medium',
      time: '10 minutes ago',
      isNew: true,
    },
    {
      id: 2,
      type: 'resource_update',
      title: 'Shared Resource Update',
      content: 'John Doe updated "Project Proposal.docx"',
      priority: 'high',
      time: '1 hour ago',
      isNew: false,
    },
    {
      id: 3,
      type: 'system_alert',
      title: 'System Alert',
      content: 'Your storage space is almost full',
      priority: 'high',
      time: '2 hours ago',
      isNew: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'event_invitation':
        return '📅';
      case 'resource_update':
        return '📄';
      case 'system_alert':
        return '🚨';
      default:
        return '🔔';
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button>Mark all as read</button>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification-item ${notification.priority}`}>
            <div className="notification-icon">{getIcon(notification.type)}</div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.content}</p>
              <div className="notification-meta">
                <span className="priority-label">{notification.priority} priority</span>
                {notification.isNew && <span className="new-badge">New</span>}
              </div>
            </div>
            <div className="notification-time">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
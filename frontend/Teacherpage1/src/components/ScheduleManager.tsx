import React, { useState } from 'react';
import { Calendar, Clock, Edit2, Trash2 } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

const ScheduleManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Basketball Practice', date: '2025-04-15', time: '15:00', location: 'Main Court', type: 'practice' },
    { id: 2, title: 'Swimming Competition', date: '2025-04-17', time: '10:00', location: 'Swimming Pool', type: 'competition' },
    { id: 3, title: 'Football Match', date: '2025-04-20', time: '16:30', location: 'Football Field', type: 'match' },
    { id: 4, title: 'Athletics Training', date: '2025-04-22', time: '14:00', location: 'Track Field', type: 'practice' },
  ]);

  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'practice'
  });

  const handleEditClick = (event: Event) => {
    setEditEvent(event);
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type
    });
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditEvent(null);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'practice'
    });
    setShowModal(true);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editEvent) {
      // Update existing event
      setEvents(events.map(event => event.id === editEvent.id ? { ...event, ...newEvent } : event));
    } else {
      // Add new event
      const maxId = events.length > 0 ? Math.max(...events.map(event => event.id)) : 0;
      setEvents([...events, { id: maxId + 1, ...newEvent }]);
    }
    setShowModal(false);
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'practice': return 'bg-blue-100 text-blue-800';
      case 'match': return 'bg-green-100 text-green-800';
      case 'competition': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-aos="fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Schedule Management</h2>
        <button 
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
        >
          <Calendar className="mr-2" size={18} />
          Add Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 rounded-tl-lg">Title</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Time</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Location</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-700 dark:text-gray-300 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map(event => (
              <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{event.title}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{event.date}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{event.time}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{event.location}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    onClick={() => handleEditClick(event)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    aria-label="Edit event"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    aria-label="Delete event"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              {editEvent ? 'Edit Event' : 'Add New Event'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="title">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="time">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="type">
                  Event Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="practice">Practice</option>
                  <option value="match">Match</option>
                  <option value="competition">Competition</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  {editEvent ? 'Update' : 'Add'} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
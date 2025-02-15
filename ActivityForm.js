'use client';

import { useState, useEffect } from 'react';

export default function ActivityForm() {
  const [formData, setFormData] = useState({
    activity: '',
    price: '',
    type: 'education',
    bookingRequired: false,
    accessibility: 0.5,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivities([...activities, formData]);
    setFormData({ activity: '', price: '', type: 'education', bookingRequired: false, accessibility: 0.5 });
  };

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10 text-black">
      <h2 className="text-xl font-bold mb-4">To-do List Activity Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Activity:</label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="bookingRequired"
            checked={formData.bookingRequired}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Booking Required</label>
        </div>

        <div>
          <label className="block font-medium">Accessibility: {formData.accessibility}</label>
          <input
            type="range"
            name="accessibility"
            min="0.0"
            max="1.0"
            step="0.1"
            value={formData.accessibility}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      {/* Activity List */}
      <h2 className="text-xl font-bold mt-6">Activity List ({activities.length})</h2>
      <ul className="mt-4">
        {activities.map((activity, index) => (
          <li key={index} className="p-4 border rounded mb-2 bg-white">
            <p><strong>Activity:</strong> {activity.activity}</p>
            <p><strong>Type:</strong> {activity.type}</p>
            <p><strong>Price:</strong> RM{activity.price}</p>
            <p><strong>Booking Required:</strong> {activity.bookingRequired ? "Yes" : "No"}</p>
            <p><strong>Accessibility:</strong> {activity.accessibility}</p>
            <button onClick={() => handleDelete(index)} className="bg-red-500 text-white p-1 rounded mt-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

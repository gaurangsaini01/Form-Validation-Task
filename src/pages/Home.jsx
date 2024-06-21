// src/Level1.js
import React, { useState, useEffect } from 'react';

const Level1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showGuestName, setShowGuestName] = useState(false);

  useEffect(() => {
    setShowGuestName(formData.attendingWithGuest === 'Yes');
  }, [formData.attendingWithGuest]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
    if (!formData.age || formData.age <= 0) tempErrors.age = "Age is required and must be greater than 0.";
    if (showGuestName && !formData.guestName) tempErrors.guestName = "Guest Name is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className='text-center font-bold text-3xl my-6'>Event Registration Form</h1>
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Are you attending with a guest?</label>
          <select
            name="attendingWithGuest"
            value={formData.attendingWithGuest}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {showGuestName && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.guestName && <p className="text-red-500 text-xs">{errors.guestName}</p>}
          </div>
        )}

        <div>
          <button type="submit" className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md">
            Submit
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
          <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Level1;


import React, { useState, useEffect } from 'react';

const Level2 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showRelevantExperience, setShowRelevantExperience] = useState(false);
  const [showPortfolioURL, setShowPortfolioURL] = useState(false);
  const [showManagementExperience, setShowManagementExperience] = useState(false);

  useEffect(() => {
    setShowRelevantExperience(formData.position === 'Developer' || formData.position === 'Designer');
    setShowPortfolioURL(formData.position === 'Designer');
    setShowManagementExperience(formData.position === 'Manager');
  }, [formData.position]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
    if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone Number is required.";
    if (showRelevantExperience && (!formData.relevantExperience || formData.relevantExperience <= 0)) tempErrors.relevantExperience = "Relevant Experience is required and must be greater than 0.";
    if (showPortfolioURL && (!formData.portfolioURL || !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolioURL))) tempErrors.portfolioURL = "A valid Portfolio URL is required.";
    if (showManagementExperience && !formData.managementExperience) tempErrors.managementExperience = "Management Experience is required.";
    if (formData.additionalSkills.length === 0) tempErrors.additionalSkills = "At least one skill must be selected.";
    if (!formData.interviewTime) tempErrors.interviewTime = "Preferred Interview Time is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let updatedSkills = [...formData.additionalSkills];
      if (checked) {
        updatedSkills.push(value);
      } else {
        updatedSkills = updatedSkills.filter(skill => skill !== value);
      }
      setFormData({
        ...formData,
        additionalSkills: updatedSkills
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className='text-center font-bold text-3xl my-6'>Job Application Form</h1>
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
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
          <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Applying for Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {showRelevantExperience && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Relevant Experience (Years):</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.relevantExperience && <p className="text-red-500 text-xs">{errors.relevantExperience}</p>}
          </div>
        )}

        {showPortfolioURL && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Portfolio URL:</label>
            <input
              type="text"
              name="portfolioURL"
              value={formData.portfolioURL}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.portfolioURL && <p className="text-red-500 text-xs">{errors.portfolioURL}</p>}
          </div>
        )}

        {showManagementExperience && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.managementExperience && <p className="text-red-500 text-xs">{errors.managementExperience}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Additional Skills:</label>
          <div className="mt-1 space-y-2">
            {['JavaScript', 'CSS', 'Python'].map(skill => (
              <label key={skill} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value={skill}
                  checked={formData.additionalSkills.includes(skill)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{skill}</span>
              </label>
            ))}
          </div>
          {errors.additionalSkills && <p className="text-red-500 text-xs">{errors.additionalSkills}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.interviewTime && <p className="text-red-500 text-xs">{errors.interviewTime}</p>}
        </div>

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

export default Level2;

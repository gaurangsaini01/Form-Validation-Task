import React, { useState } from "react";
import axios from "axios";

const Level3 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is not valid.";
    if (!formData.surveyTopic)
      tempErrors.surveyTopic = "Survey Topic is required.";
    if (formData.surveyTopic === "Technology") {
      if (!formData.favoriteProgrammingLanguage)
        tempErrors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required.";
      if (!formData.yearsOfExperience || formData.yearsOfExperience <= 0)
        tempErrors.yearsOfExperience =
          "Years of Experience is required and must be greater than 0.";
    }
    if (formData.surveyTopic === "Health") {
      if (!formData.exerciseFrequency)
        tempErrors.exerciseFrequency = "Exercise Frequency is required.";
      if (!formData.dietPreference)
        tempErrors.dietPreference = "Diet Preference is required.";
    }
    if (formData.surveyTopic === "Education") {
      if (!formData.highestQualification)
        tempErrors.highestQualification = "Highest Qualification is required.";
      if (!formData.fieldOfStudy)
        tempErrors.fieldOfStudy = "Field of Study is required.";
    }
    if (!formData.feedback || formData.feedback.length < 50)
      tempErrors.feedback =
        "Feedback is required and must be at least 50 characters.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let type ;
        if (formData.surveyTopic === "Technology"){
          type=18;
        }else if(formData.surveyTopic === "Education"){
          type=19;
        }
        else{
          type =17
        }
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=5&category=${type}&difficulty=easy&type=multiple`
        );
        setAdditionalQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching additional questions", error);
      }
      setSubmittedData(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-center font-bold text-3xl my-6">
        Survey Form with Dependent Questions and Dynamic Sections
      </h1>

      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Survey Topic:
          </label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && (
            <p className="text-red-500 text-xs">{errors.surveyTopic}</p>
          )}
        </div>

        {formData.surveyTopic === "Technology" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Favorite Programming Language:
              </label>
              <select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && (
                <p className="text-red-500 text-xs">
                  {errors.favoriteProgrammingLanguage}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience:
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-xs">
                  {errors.yearsOfExperience}
                </p>
              )}
            </div>
          </div>
        )}

        {formData.surveyTopic === "Health" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Exercise Frequency:
              </label>
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && (
                <p className="text-red-500 text-xs">
                  {errors.exerciseFrequency}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Diet Preference:
              </label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && (
                <p className="text-red-500 text-xs">{errors.dietPreference}</p>
              )}
            </div>
          </div>
        )}

        {formData.surveyTopic === "Education" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Highest Qualification:
              </label>
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && (
                <p className="text-red-500 text-xs">
                  {errors.highestQualification}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Field of Study:
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.fieldOfStudy && (
                <p className="text-red-500 text-xs">{errors.fieldOfStudy}</p>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Feedback:
          </label>
          <textarea 
          spellCheck="false"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.feedback && (
            <p className="text-red-500 text-xs">{errors.feedback}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
      {submittedData && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-md overflow-x-auto break-words">
          <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
          <pre className="bg-gray-100 w-fit p-4 rounded-md">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          {additionalQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">
                Additional Questions :- 
              </h3>
              <ul className="list-disc list-inside">
                {additionalQuestions.map((question, index) => (
                  <li key={index}>{question.question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Level3;

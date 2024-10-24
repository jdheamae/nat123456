import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import './natAdd.css'; // Custom CSS for styling

const AddNatData = () => {
  const [formData, setFormData] = useState({
    respondent: "",
    age: "",
    sex: "",
    ethnic: "",
    academic_performance: "",
    academic_description: "",
    iq: "",
    type_school: "",
    socio_economic_status: "",
    study_habit: "",
    nat_results: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error

    try {
      await addDoc(collection(db, "natData"), {
        ...formData,
        age: Number(formData.age),
        iq: Number(formData.iq),
        academic_performance: Number(formData.academic_performance),
        nat_results: Number(formData.nat_results),
      });
      setFormData({
        respondent: "",
        age: "",
        sex: "",
        ethnic: "",
        academic_performance: "",
        academic_description: "",
        iq: "",
        type_school: "",
        socio_economic_status: "",
        study_habit: "",
        nat_results: "",
      });
      alert("NAT Data added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to add data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="data-form1" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="respondent"
          placeholder="Respondent Name"
          value={formData.respondent}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sex"
          placeholder="Sex"
          value={formData.sex}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ethnic"
          placeholder="Ethnic"
          value={formData.ethnic}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="academic_performance"
          placeholder="Academic Performance"
          value={formData.academic_performance}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="academic_description"
          placeholder="Academic Description"
          value={formData.academic_description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="iq"
          placeholder="IQ"
          value={formData.iq}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type_school"
          placeholder="Type of School"
          value={formData.type_school}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="socio_economic_status"
          placeholder="Socio-Economic Status"
          value={formData.socio_economic_status}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="study_habit"
          placeholder="Study Habit"
          value={formData.study_habit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="nat_results"
          placeholder="NAT Results"
          value={formData.nat_results}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Data"}
        </button>
      </form>
    </div>
  );
};

export default AddNatData;

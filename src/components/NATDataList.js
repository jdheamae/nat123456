import React, { useState, useEffect, useCallback, useMemo } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import CsvUploader from './CsvUploader';
import './NatData.css';

const NATDataList = () => {
  const [natData, setNATData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    respondent: "",
    age: "",
    sex: "",
    ethic: "",
    academic_performance: "",
    academic_description: "", 
    iq: "", 
    type_school: "",
    socio_economic_status: "",
    study_habit: "",
    nat_result: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const natCollection = collection(db, "natData");
      const natSnapshot = await getDocs(natCollection);
      const dataList = natSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNATData(dataList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (id) => {
    const natDocRef = doc(db, "natData", id);
    try {
      await deleteDoc(natDocRef);
      setNATData((prevData) => prevData.filter((data) => data.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete data. Please try again.");
    }
  }, []);

  const handleEdit = useCallback((data) => {
    setEditingId(data.id);
    setEditForm({
      respondent: data.respondent,
      age: data.age,
      sex: data.sex,
      ethic: data.ethic,
      academic_performance: data.academic_performance,
      academic_description: data.academic_description, 
      iq: data.iq, 
      type_school: data.type_school,
      socio_economic_status: data.socio_economic_status,
      study_habit: data.study_habit,
      nat_result: data.nat_result,
    });
  }, []);

  const handleUpdate = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    const natDocRef = doc(db, "natData", editingId);
    try {
      await updateDoc(natDocRef, editForm);
      setNATData((prevData) =>
        prevData.map((data) =>
          data.id === editingId ? { id: editingId, ...editForm } : data
        )
      );
      setEditingId(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [editForm, editingId]);

  const filteredData = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return natData.filter((data) => {
      const respondent = data.respondent?.toLowerCase() ?? '';
      const ethic = data.ethic?.toLowerCase() ?? '';
      return respondent.includes(search) || ethic.includes(search);
    });
  }, [natData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = useMemo(() => filteredData.slice(startIndex, startIndex + itemsPerPage), [filteredData, startIndex, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleUploadSuccess = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="data-list">
      <CsvUploader onUploadSuccess={handleUploadSuccess} />
      <h2>NAT Data List</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by respondent or ethic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {editingId ? (
            <form className="data-form" onSubmit={handleUpdate}>
              {/* Input fields for edit form */}
              {/* ... (unchanged code for input fields and buttons) ... */}
            </form>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Respondent</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Ethic</th>
                  <th>Academic Performance</th>
                  <th>Academic Description</th> 
                  <th>IQ</th> 
                  <th>Type of School</th>
                  <th>Socio-Economic Status</th>
                  <th>Study Habit</th>
                  <th>NAT Result</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.length > 0 ? (
                  currentPageData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.respondent}</td>
                      <td>{data.age}</td>
                      <td>{data.sex}</td>
                      <td>{data.ethic}</td>
                      <td>{data.academic_performance}</td>
                      <td>{data.academic_description}</td>
                      <td>{data.iq ?? "N/A"}</td>
                      <td>{data.type_school}</td>
                      <td>{data.socio_economic_status}</td>
                      <td>{data.study_habit}</td>
                      <td>{data.nat_result}</td>
                      <td className="actions">
                        <button onClick={() => handleEdit(data)}>Edit</button>
                        <button onClick={() => handleDelete(data.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NATDataList;

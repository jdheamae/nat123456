import React from "react";
import AddNatData from "./components/AddNatData";
import NATDataList from "./components/NATDataList";
import CsvUploader from "./components/CsvUploader"; // Fixed the import name

import './App.css'; // Assuming custom CSS for styling

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">NAT Data Management</h1>
      <div className="form-container">
        <AddNatData />
      </div>
      <NATDataList />
    </div>
  );
}

export default App;

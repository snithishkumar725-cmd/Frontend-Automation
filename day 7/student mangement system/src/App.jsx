import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [section, setSection] = useState("A");
  const [attendance, setAttendance] = useState("Present");
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");

  const addStudent = () => {
    if (name === "") {
      alert("Enter Student Name");
      return;
    }

    if (attendance === "Present") {
      setStudents([
        ...students,
        {
          name,
          department,
          section,
          attendance,
        },
      ]);
    }

    setName("");
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((s) => s.section === filter);

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <select
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button onClick={addStudent}>Add Student</button>

      </div>

      <div className="filter">
        <label>Filter Section : </label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Section</th>
            <th>Attendance</th>
          </tr>
        </thead>

        <tbody>

          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="4">No Data</td>
            </tr>
          ) : (
            filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.section}</td>
                <td>{student.attendance}</td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;
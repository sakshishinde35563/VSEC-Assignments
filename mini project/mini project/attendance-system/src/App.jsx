
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  // Load students
  function getStudents() {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }

  // Load attendance for selected date
  function getAttendance(selectedDate) {
    fetch("http://localhost:5000/attendance?date=" + selectedDate)
      .then(res => res.json())
      .then(data => setRecords(data));
  }

  useEffect(() => {
    getStudents();
  }, []);

  // Add student
  function addStudent(e) {
    e.preventDefault();

    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, rollNo })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setRollNo("");
        getStudents();
      });
  }

  // Save attendance
  function markAttendance(studentId, status) {
    fetch("http://localhost:5000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId,
        date,
        status
      })
    })
      .then(res => res.json())
      .then(() => getAttendance(date));
  }

  return (
    <div className="container">
      <h1>Attendance Management System</h1>

      <form onSubmit={addStudent}>
        <input
          placeholder="Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          placeholder="Roll Number"
          value={rollNo}
          onChange={e => setRollNo(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Select Attendance Date</h2>

      <input
        type="date"
        value={date}
        onChange={e => {
          setDate(e.target.value);
          setRecords([]);
          if (e.target.value) {
            getAttendance(e.target.value);
          }
        }}
      />

      <h2>Student Attendance</h2>

      {!date && <p>Please select a date first.</p>}

      <table>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => {
            const record = records.find(
              item => item.studentId === student._id
            );

            return (
              <tr key={student._id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>

                <td>
                  {!date
                    ? "—"
                    : record
                    ? record.status
                    : "Not Marked"}
                </td>

                <td>
                  {date && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          markAttendance(student._id, "Present")
                        }
                      >
                        Present
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          markAttendance(student._id, "Absent")
                        }
                      >
                        Absent
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}

          {students.length === 0 && (
            <tr>
              <td colSpan="4">No students added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

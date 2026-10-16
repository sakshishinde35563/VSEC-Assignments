
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/attendance")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// Student details
const Student = mongoose.model("Student", {
  name: String,
  rollNo: String
});

// Attendance details
const Attendance = mongoose.model("Attendance", {
  studentId: String,
  date: String,
  status: String
});

// Get all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a student
app.post("/students", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    rollNo: req.body.rollNo
  });

  await student.save();
  res.json(student);
});

// Get attendance for a date
app.get("/attendance", async (req, res) => {
  const records = await Attendance.find({
    date: req.query.date
  });

  res.json(records);
});

// Mark attendance
app.post("/attendance", async (req, res) => {
  const { studentId, date, status } = req.body;

  let record = await Attendance.findOne({
    studentId: studentId,
    date: date
  });

  if (record) {
    record.status = status;
  } else {
    record = new Attendance({
      studentId: studentId,
      date: date,
      status: status
    });
  }

  await record.save();
  res.json(record);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

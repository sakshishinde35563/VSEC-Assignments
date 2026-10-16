
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [student, setStudent] = useState(null);

  function register() {
    setStudent({ name, age, contact });
    setName('');
    setAge('');
    setContact('');
  }

  return (
    <div>
      <h1>Student Registration Form</h1>

      <label>Name: </label>
      <input type="text" size="20" value={name}
        onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <label>Age: </label>
      <input type="number" size="20" value={age}
        onChange={(e) => setAge(e.target.value)} />
      <br /><br />

      <label>Contact No: </label>
      <input type="tel" size="20" value={contact}
        onChange={(e) => setContact(e.target.value)} />
      <br /><br />

      <button onClick={register}>Register</button>

      {student && (
        <div>
          <h2>Student Details</h2>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Contact No: {student.contact}</p>
        </div>
      )}
    </div>
  );
}

export default App;

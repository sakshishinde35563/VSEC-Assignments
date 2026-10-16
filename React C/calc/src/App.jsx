
import { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  function add() {
    setResult(Number(num1) + Number(num2));
  }

  function subtract() {
    setResult(Number(num1) - Number(num2));
  }

  function multiply() {
    setResult(Number(num1) * Number(num2));
  }

  return (
    <div>
      <h1>Calculator</h1>

      <label>First Number:</label>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <br /><br />

      <label>Second Number:</label>
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <br /><br />

      <button onClick={add}>Add</button>{' '}
      <button onClick={subtract}>Subtract</button>{' '}
      <button onClick={multiply}>Multiply</button>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;

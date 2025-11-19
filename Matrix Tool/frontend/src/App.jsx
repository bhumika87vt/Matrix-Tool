import React, { useState } from 'react';
import MatrixInput from './MatrixInput';
import OutputPanel from './OutputPanel';
import MatrixButton from './MatrixButton';
import './App.css';

function App() {
  const [matrixA, setMatrixA] = useState('1 2\n3 4');
  const [matrixB, setMatrixB] = useState('5 6\n7 8');
  const [output, setOutput] = useState(null);
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');

  const handleOperation = async (operation) => {
    setError('');
    setOutput(null);
    let body = { operation, matrixA, matrixB };

    if (
      ["add", "subtract", "multiply"].includes(operation) &&
      (
        matrixA.trim() === '' ||
        matrixB.trim() === ''
      )
    ) {
      setError('Both matrices are required for Add, Subtract and Multiply operations.');
      return;
    }
    if (
      (operation === "transpose" || operation === "determinant") &&
      matrixA.trim() === '' && matrixB.trim() === ''
    ) {
      setError('Enter at least one matrix for Transpose or Determinant.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/operate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        setOutput(data.result);
        setSteps(data.steps);
      }
    } catch {
      setError('Server error');
    }
  };

  const fillRandom = (setter) => {
    const r = 2, c = 2;
    let arr = [];
    for (let i = 0; i < r; ++i) {
      arr.push(
        Array.from({ length: c }, () => Math.floor(Math.random() * 10)).join(' ')
      );
    }
    setter(arr.join('\n'));
  };

  return (
    <div className="container">
      <h1>Matrix Operations Tool</h1>
      <div className="input-section">
        <MatrixInput label="Matrix A" value={matrixA} onChange={setMatrixA} fillRandom={() => fillRandom(setMatrixA)} />
        <MatrixInput label="Matrix B" value={matrixB} onChange={setMatrixB} fillRandom={() => fillRandom(setMatrixB)} />
      </div>
      <div className="buttons">
        <MatrixButton label="Add" onClick={() => handleOperation('add')} />
        <MatrixButton label="Subtract" onClick={() => handleOperation('subtract')} />
        <MatrixButton label="Multiply" onClick={() => handleOperation('multiply')} />
        <MatrixButton label="Transpose" onClick={() => handleOperation('transpose')} />
        <MatrixButton label="Determinant" onClick={() => handleOperation('determinant')} />
      </div>
      <OutputPanel output={output} steps={steps} error={error} />
    </div>
  );
}

export default App;

import React from 'react';

function parseInput(input) {
  return input.split('\n')
    .map(row => row.trim().split(/\s+/).filter(cell => cell.length));
}

const MatrixInput = ({ label, value, onChange, fillRandom }) => {
  const parsed = parseInput(value);

  return (
    <div className="matrix-input">
      <div className="input-header">
        <span>{label} (e.g. 1 2; 3 4):</span>
        <button className="random-btn" onClick={fillRandom}>Random</button>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows="2"
        cols="18"
        spellCheck="false"
      />
      {parsed.length > 0 && parsed[0].length > 0 && (
        <div className="matrix-preview">
          {parsed.map((row, i) => (
            <div key={i} className="matrix-row">
              {row.map((cell, j) => (
                <span key={j} className="cell">{cell}</span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatrixInput;

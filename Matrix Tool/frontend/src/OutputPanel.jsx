import React from 'react';

const renderMatrix = (matrix) => (
  <div className="matrix-output">
    {matrix.map((row, i) => (
      <div key={i} className="matrix-row">
        {row.map((val, j) => (
          <span key={j} className="cell">{val}</span>
        ))}
      </div>
    ))}
  </div>
);

const OutputPanel = ({ output, steps, error }) => {
  if (!output) return (
    <div className="output-panel">
      <h2>Output</h2>
      {error && <div className="error">{error}</div>}
    </div>
  );

  if (typeof output === 'object' && !Array.isArray(output)) {
    return (
      <div className="output-panel">
        <h2>Output</h2>
        {error && <div className="error">{error}</div>}
        {output.matrixA && (
          <div>
            <h3>Matrix A Result:</h3>
            {Array.isArray(output.matrixA)
              ? renderMatrix(output.matrixA)
              : <div className="scalar-output">{output.matrixA}</div>
            }
          </div>
        )}
        {output.matrixB && (
          <div>
            <h3>Matrix B Result:</h3>
            {Array.isArray(output.matrixB)
              ? renderMatrix(output.matrixB)
              : <div className="scalar-output">{output.matrixB}</div>
            }
          </div>
        )}
        {steps && <div className="steps"><strong>Steps:</strong> {Array.isArray(steps) ? steps.join(' ') : steps}</div>}
      </div>
    );
  }

  return (
    <div className="output-panel">
      <h2>Output</h2>
      {error && <div className="error">{error}</div>}
      {Array.isArray(output)
        ? renderMatrix(output)
        : <div className="scalar-output">{output}</div>
      }
      {steps && <div className="steps"><strong>Steps:</strong> {steps}</div>}
    </div>
  );
};

export default OutputPanel;

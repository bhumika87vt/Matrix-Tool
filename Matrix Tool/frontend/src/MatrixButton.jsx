import React from 'react';

const MatrixButton = ({ label, onClick }) => (
  <button className="matrix-btn" onClick={onClick}>{label}</button>
);

export default MatrixButton;

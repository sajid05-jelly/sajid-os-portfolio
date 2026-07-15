import React from 'react';

const CRTContainer = ({ children }) => {
  return (
    <div className="crt-container">
      <div className="crt-screen">
        <div className="scanlines"></div>
        {children}
      </div>
    </div>
  );
};

export default CRTContainer;

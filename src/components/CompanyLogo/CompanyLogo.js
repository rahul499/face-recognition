import React from 'react';
import Tilt from 'react-tilt';
import './CompanyLogo.css';

const CompanyLogo = () => {
    return(
      <div className = "logo">
        <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 130, width: 130 }} >
          <div className="Tilt-inner"><img src="/images/logo.jpg" alt="logo"></img></div>
        </Tilt>
      </div>
    );
}

export default CompanyLogo;
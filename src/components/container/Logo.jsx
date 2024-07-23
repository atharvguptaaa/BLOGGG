import React from 'react';
import logoImage from '../../assets/title.png';
 // Adjust the path as necessary

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src={logoImage} alt="Logo" style={{ width }} />
    </div>
  )
}

export default Logo;

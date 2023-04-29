import React from 'react';
import Logo from '../../assets/logo.svg';
import './styles.scss';

function Initial () {
  return (
    <div className='container'>
      <button className='logo' onClick={() => window.location.replace(`${window.location.origin}/`)}>
        <img src={Logo} alt='logo'/>
      </button>
    </div>
  )
}

export default Initial; 
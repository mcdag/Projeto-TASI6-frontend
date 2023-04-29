import React from 'react';
import Woman from '../../assets/woman-figure.svg';
import LogoText from '../../assets/logo-text.svg';
import Button from '../../components/Button';
import './styles.scss';

function Initial () {

  const handleClickLogin = (async () => {
    window.location.replace(`${window.location.origin}/auth/login`)
  })


  const handleClickRegister = (async () => {
    window.location.replace(`${window.location.origin}/auth/register`)
  })

  return (
    <div className='container'>
      <div className='logo'>
        <img src={LogoText} alt='Logo em texto'/>
      </div>
      <div>
        <img src={Woman} alt='Mulher em desenho'/>
      </div>
      <div className='welcome-text'>
        <div className='texts'>
          <h1> Colabore junto! </h1>
          <p>
            O SecurityMob é um aplicativo no qual você pode ver os locais mais seguros, 
            mais moviementados e com mais iluminação de onde você mora! E junto disso, 
            você também pode fazer relatos para ajudar o banco de dados a deixar os filtros 
            cada vez mais assertivos!
          </p>
        </div>
      </div>
      <div className='buttons'>
        <button type='submit' onClick={handleClickLogin} className='login'>
          Entrar
        </button>
        <Button type='submit' onClick={handleClickRegister} text='Registrar'/>
      </div>
    </div>
  )
}

export default Initial; 
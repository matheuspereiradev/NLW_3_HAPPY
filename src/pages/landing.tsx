import React from 'react'
import logoImg from '../images/logo.svg';
import {FiArrowRight} from 'react-icons/fi'
import '../styles/pages/landing.css'
import {Link} from 'react-router-dom'
function landing(){

    return(
        <div id='page-landing'>
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo"/>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de crianças</p>
        </main>

        <div className="location">
          <strong>Juazeiro do Norte</strong>
          <span>Ceará</span>
        </div>

        <Link to="/orfanatos" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
        </Link>
      </div>
    </div>
    );
}


export default landing;
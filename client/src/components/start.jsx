import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/start.css'
import play from '../assets/start/play.png'


function Start() {
  return (
    <div className='start'>
      <div className="startPage">
        <h1 className="start-text">BABY DRIVER</h1>
        <Link to="/levelselection1" className='start-game'>
          <button className="start-button"><img alt='play' src={play} width='350px' /></button>
        </Link>
      </div>
      
    </div>
  )
}

export default Start;
import React from 'react'
import { Placeholder, Spinner } from 'react-bootstrap';
import '../../styles/Memes.scss'
import user from '../../static/user.png'

export default function Loader() {
  return (
    <div className='Memes'>
        <div className='Memes__cont'>
        
          <Placeholder style={{textAlign:'center'}} as="p" animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        
        <div className='Memes__g'><Spinner animation='border' /></div>
        <div className='Memes__comms'>
          <Placeholder className='Memes__comms__user' style={{textAlign:'center'}} as="div" animation="glow">
            <img src={user} /><Placeholder xs={12} />
          </Placeholder>
        </div>
        </div>
    </div>
  )
}

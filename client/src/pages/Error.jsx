import React from 'react'
import '../styles/Error.scss'
import { NavLink } from 'react-router-dom';
import error404 from '../static/error404.png'
import arrowRight from '../static/arrowRight.png'

export default function Error() {
  return (
    <div className='Error'>
        <div className='Error__cont'>
            <div style={{display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
                <div className='Error__title'>
                    404!
                </div>
                <div className='Error__txt'>
                    This page was not found, but you can stay and pet our dog
                    
                </div>
                <NavLink to="/" className='Error__btn'>
                    <div>GO HOME</div>
                    <img style={{filter: 'brightness(4.5)', transition:' all 0.3s ease-in-out'}} src={arrowRight} />
                </NavLink>
            </div>
            <img src={error404} className='Error__doge' />
        </div>
    </div>
  )
}

import React from 'react'
import '../../styles/LoadingPage.scss'
import { Spinner } from 'react-bootstrap';

export default function LoadingPage() {
  return (
    <div className='load'>
        <div>Loading...</div>
        <Spinner animation='border' />
    </div>
  )
}

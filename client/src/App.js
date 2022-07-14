import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './styles/App.scss'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {observer} from 'mobx-react-lite'
import { Spinner } from 'react-bootstrap';
import { check } from './http/userAPI';
import { Context } from './index';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      // console.log(data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation="border" />
  }
  

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
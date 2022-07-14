import React from 'react'
import { Navigate, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './../routes';
import { Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from './../index';
import { getUsers } from '../http/userAPI';
import { useState } from 'react';
import Profile from './../pages/Profile';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const {user} = useContext(Context)

  return user.isAuth ? (
    <Routes>
        {privateRoutes.map((route) => {
            return <Route key={route.path} path={route.path} exact={route.exact} element={route.element} />
        })}
        <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <Routes>
        {publicRoutes.map((route) => {
            return <Route key={route.path} path={route.path} exact={route.exact} element={route.element} />
        })}
        <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
})

export default AppRouter

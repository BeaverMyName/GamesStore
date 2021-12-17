import React from 'react'
import { useInjection } from '../ioc/ioc.react'
import '../locales/config';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import BrowserRouter  from '../utils/router/BrowserRouter';
import ownTypes from '../ioc/ownTypes';

const App = () => {

  return (
    <BrowserRouter>
    </BrowserRouter>
  )
}

export default App

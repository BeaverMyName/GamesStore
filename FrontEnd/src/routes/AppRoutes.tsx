import React from 'react';
import Header from '../components/Header'
import '../locales/config';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import StorePage from '../pages/Store';
import { SignupPage, LoginPage } from '../pages/Authorization';
import GamePage from '../pages/Game';
import { ProfilePage, OwnProfilePage, UserProfilePage } from '../pages/profile';
import { useInjection } from '../ioc/ioc.react';
import AuthorizationStore from '../stores/AuthorizationStore';
import ownTypes from '../ioc/ownTypes';
import CartPage from '../pages/Cart';
import PrivateOutlet from './PrivateOutlet';

const AppRoutes = () => {
  const store = useInjection<AuthorizationStore>(ownTypes.authorizationStore);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path='/accounts'>
            <Route path='login' element={store.isAuthorized ? <Navigate replace to='/' /> : <LoginPage />} />
            <Route path='signup' element={store.isAuthorized ? <Navigate replace to='/' /> : <SignupPage />} />
        </Route>
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/users" element={<ProfilePage />}>
            <Route path='me' element={<PrivateOutlet />}>
                <Route index element={<OwnProfilePage />} />
            </Route>
            <Route path=":username" element={<UserProfilePage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
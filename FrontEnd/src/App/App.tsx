import React from 'react';
import Header from '../components/Header'
import '../locales/config';
import { Routes, Route, Navigate } from 'react-router-dom';
import BrowserRouter  from '../utils/router/BrowserRouter';
import StorePage from '../pages/Store';
import { SignupPage, LoginPage } from '../pages/Authorization';
import GamePage from '../pages/Game';
import { ProfilePage, OwnProfilePage, UserProfilePage } from '../pages/profile';
import { useInjection } from '../ioc/ioc.react';
import AuthorizationStore from '../stores/AuthorizationStore';
import ownTypes from '../ioc/ownTypes';
import CartPage from '../pages/Cart';

const App = () => {
  const store = useInjection<AuthorizationStore>(ownTypes.authorizationStore);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/accounts/signup" element={<SignupPage />} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/users" element={<ProfilePage />}>
          <Route path="me" element={store.isAuthorized
          ? <OwnProfilePage />
          : <Navigate replace to="/" />} />
          <Route path=":username" element={<UserProfilePage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { observer } from 'mobx-react';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useInjection } from '../ioc/ioc.react';
import ownTypes from '../ioc/ownTypes';
import AuthorizationStore from '../stores/AuthorizationStore';

const PrivateOutlet = observer(() => {
    const authStore = useInjection<AuthorizationStore>(ownTypes.authorizationStore);
    return authStore.isAuthorized ? <Outlet /> : <Navigate to='/accounts/login' />
});

export default PrivateOutlet;
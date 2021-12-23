import { observer } from 'mobx-react';
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import AuthorizationStore from '../../stores/AuthorizationStore';
import { CartPageStore } from '../../stores/pages';
import { IconButton, Badge, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';

const Header = observer(() => {
    const { t } = useTranslation(['header'])
    const navigate = useNavigate();
    const authStore = useInjection<AuthorizationStore>(ownTypes.authorizationStore);
    const cartStore = useInjection<CartPageStore>(ownTypes.cartPageStore);

    return (
    <Container>
        <Navbar variant='dark' bg='dark' expand={true}>\
            <Navbar.Brand>
                <img
                    onClick={() => navigate('/')}
                    src='https://cdn-icons-png.flaticon.com/64/2946/2946177.png'
                />
            </Navbar.Brand>
            <Container>
                <Nav variant='pills'>
                    <Nav.Item className='p-2'>
                        <Nav.Link onClick={() => navigate('/')}><h5>{t('store')}</h5></Nav.Link>
                    </Nav.Item>
                    {authStore.isAuthorized &&
                    <Nav.Item className='p-2'>
                         <Nav.Link onClick={() => navigate('/users/me')}><h5>{t('profile')}</h5></Nav.Link>
                    </Nav.Item>}
                </Nav>
            </Container>
            <Container className='d-flex flex-row-reverse'>
                <Nav>
                    <Nav.Item className='p-2'>
                        <IconButton color='info'>
                            <Badge badgeContent={cartStore.gameIds.length} color='info' onClick={() => navigate('/cart')}>
                                <ShoppingCartCheckoutIcon onClick={() => navigate('/cart')} />
                            </Badge>
                        </IconButton>
                    </Nav.Item>
                    {!authStore.isAuthorized &&
                    <Nav.Item className='p-2'>
                        <Button
                            startIcon={<CreateIcon />}
                            color='secondary'
                            variant='outlined'
                            onClick={() => {
                            navigate('/accounts/signup');
                        }}
                        >
                            {t('signup')}
                        </Button>
                    </Nav.Item>}
                    {!authStore.isAuthorized &&
                    <Nav.Item className='p-2'>
                        <Button
                            startIcon={<LoginIcon />}
                            color='info'
                            variant='outlined'
                            onClick={() => {
                            navigate('/accounts/login');
                        }}
                        >
                            {t('login')}
                        </Button>
                    </Nav.Item>}
                    {authStore.isAuthorized &&
                    <Nav.Item className='p-2'>
                        <Button
                            startIcon={<LogoutIcon />}
                            color='info'
                            variant='outlined'
                            onClick={() => {
                            authStore.logout();
                            navigate('/');
                        }}
                        >
                            {t('logout')}
                        </Button>
                    </Nav.Item>}
                </Nav>
            </Container>
        </Navbar>
    </Container>
    );
});

export default Header;
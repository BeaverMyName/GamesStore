import { observer } from 'mobx-react';
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import AuthorizationStore from '../../stores/AuthorizationStore';
import { LoginPageStore } from '../../stores/pages';
import './Header.css'

const Header = observer(() => {
    const { t } = useTranslation(['header'])
    const navigate = useNavigate();
    const authStore = useInjection<AuthorizationStore>(ownTypes.authorizationStore);
    const loginStore = useInjection<LoginPageStore>(ownTypes.loginPageStore);

    return (
    <Container>
        <Navbar variant="dark" bg="dark">
            <Container>
                <Nav variant='pills'>
                    <Nav.Item className='header-item'>
                        <Nav.Link className='header-link' onClick={() => navigate('/')}>{t('store')}</Nav.Link>
                    </Nav.Item>
                    {authStore.isAuthorized &&
                    <Nav.Item className='header-item'>
                         <Nav.Link className='header-link' onClick={() => navigate('/users/me')}>{t('profile')}</Nav.Link>
                    </Nav.Item>}
                    <Nav.Item className='header-item'>
                        <Nav.Link className='header-link' onClick={() => navigate('/cart')}>{t('cart')}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Container className='d-flex flex-row-reverse'>
                <Nav>
                    {!authStore.isAuthorized &&
                    <Nav.Item className='header-item'>
                        <Nav.Link className='header-link' onClick={() => navigate('/accounts/signup')}>{t('signup')}</Nav.Link>
                    </Nav.Item>}
                    {!authStore.isAuthorized &&
                    <Nav.Item className='header-item'>
                        <Nav.Link className='header-link' onClick={() => navigate('/accounts/login')}>{t('login')}</Nav.Link>
                    </Nav.Item>}
                    {authStore.isAuthorized &&
                    <Nav.Item>
                        <Nav.Link className='header-link' onClick={() => {
                            authStore.logout();
                            navigate('/');
                            }}>{t('logout')}</Nav.Link>
                    </Nav.Item>}
                </Nav>
            </Container>
        </Navbar>
    </Container>
    );
});

export default Header;
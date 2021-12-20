import { observer } from 'mobx-react';
import React from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import AuthorizationStore from '../../stores/AuthorizationStore';
import { LoginPageStore } from '../../stores/pages';
import { OwnProfilePageStore } from '../../stores/pages/profile';
import './AuthorizationPage.css'

const LoginPage = observer(() => {
    const { t } = useTranslation(['authorization'])
    const loginStore = useInjection<LoginPageStore>(ownTypes.loginPageStore);
    const profileStore = useInjection<OwnProfilePageStore>(ownTypes.ownProfilePageStore);
    const navigate = useNavigate();

    return (
        <Container>
            <Row className='justify-content-center'>
                <Form 
                className='auth-form p-2 d-grid gap-4 border'
                onSubmit={
                    async (ev) => {
                        ev.preventDefault();
                        await loginStore.login();

                        !!loginStore.token && (() => {
                            profileStore.init(loginStore.username);
                            navigate('/users/me');
                        })()
                    }
                }
                >
                    <Form.Control 
                    type='text'
                    placeholder={t('username')}
                    value={loginStore.username}
                    required
                    onChange={(ev) => loginStore.changeUsername(ev.target.value)}
                    />
                    <Form.Control
                    type='password'
                    placeholder={t('password')}
                    value={loginStore.password}
                    required
                    onChange={(ev) => loginStore.changePassword(ev.target.value)}
                    />
                    <Button variant='primary' type='submit'>
                        {t('login')}
                    </Button>
                </Form>
            </Row>
        </Container>
    );
});

export default LoginPage;
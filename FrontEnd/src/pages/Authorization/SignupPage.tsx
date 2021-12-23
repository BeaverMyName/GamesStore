import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { SignupPageStore } from '../../stores/pages';
import './AuthorizationPage.css'

const SignupPage = observer(() => {
    const { t } = useTranslation(['authorization'])
    const store = useInjection<SignupPageStore>(ownTypes.signupPageStore);
    const navigate = useNavigate();

    return (
        <Container className='pt-5'>
            <Row className='justify-content-center'>
                <Form 
                className='auth-form p-2 d-grid gap-4 border'
                onSubmit={
                    async (ev) => {
                        ev.preventDefault();
                        await store.signup();
                        !!store.token && navigate('/accounts/login')
                    }
                }
                >
                    <Typography align='center' variant="h4">
                        {t('signup')}
                    </Typography>
                    <Form.Control
                    type='text'
                    placeholder={t('username')}
                    value={store.username}
                    required
                    onChange={(ev) => store.changeUsername(ev.target.value)}
                    />
                    <Form.Control 
                    type='email'
                    placeholder={t('email')}
                    value={store.email}
                    required
                    onChange={(ev) => store.changeEmail(ev.target.value)}
                    />
                    <Form.Control
                    type='password'
                    placeholder={t('password')}
                    value={store.password}
                    required
                    onChange={(ev) => store.changePassword(ev.target.value)}
                    />
                    <Button variant='primary' type='submit'>
                        {t('signupNow')}
                    </Button>
                </Form>
                <Typography align='center' variant="h6">
                    <Button 
                    onClick={() => {navigate('/accounts/login')}}
                    variant='text'
                    >
                        {t('loginToYourAccount')}
                    </Button>
                </Typography>
            </Row>
        </Container>
    );
});

export default SignupPage;
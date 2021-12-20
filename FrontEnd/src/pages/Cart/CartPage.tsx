import React from 'react';
import { observer } from "mobx-react-lite";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useInjection } from "../../ioc/ioc.react";
import ownTypes from "../../ioc/ownTypes";
import { CartPageStore } from "../../stores/pages";
import CartGameCard from '../../components/CartGameCard';
import { useTranslation } from 'react-i18next';
import AuthorizationStore from '../../stores/AuthorizationStore';
import { useNavigate } from 'react-router-dom';
import { PaymentService } from '../../services/PaymentService';

const CartPage = observer(() => {
    const cartStore = useInjection<CartPageStore>(ownTypes.cartPageStore);
    const authStore = useInjection<AuthorizationStore>(ownTypes.authorizationStore);
    const { t } = useTranslation(['cart'])
    const navigate = useNavigate();

    return (
        <Container className='p-2'>
            <Row className='justify-content-center'>
                {t('cart')}
            </Row>
            <Row md='2'>
                <Col>
                    {cartStore.games.map((game, key) => (
                        <Col key={key}>
                            <CartGameCard game={game} />
                        </Col>
                    ))}
                </Col>
                <Col>
                    <Row>
                        {t('payment')}
                    </Row>
                    <Row md={2}>
                        <Col>
                            {cartStore.price}
                        </Col>
                        <Col>
                            <Button
                            onClick={() => {
                                authStore.isAuthorized ? 
                                cartStore.doPayment() :
                                navigate('/accounts/login');
                            }}
                            >
                                {t('payButton')}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default CartPage;
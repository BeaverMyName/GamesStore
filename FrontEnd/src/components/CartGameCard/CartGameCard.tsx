import React from 'react';
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import GameCardDto from "../../dtos/GameCardDto";
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { CartPageStore } from '../../stores/pages';
import './CartGameCard.css';

interface Props {
    game: GameCardDto;
}

const CartGameCard = (props: Props) => {
    const { t } = useTranslation(['cart']);
    const store = useInjection<CartPageStore>(ownTypes.cartPageStore);

    return (
        <Container className='p-2 border'>
            <Row md={2}>
                <Col>
                    <Image className='game-cart-image' src={props.game.image} />
                </Col>
                <Col>
                    <h4>{props.game.name}</h4>
                    <p>{props.game.price}$</p>
                    <Button onClick={() => store.removeGame(props.game)}>{t('remove')}</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CartGameCard;
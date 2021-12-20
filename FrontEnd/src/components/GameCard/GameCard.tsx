import { observer } from 'mobx-react';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GameCardDto from '../../dtos/GameCardDto';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import { GameCardStore } from '../../stores/components';
import { CartPageStore } from '../../stores/pages';
import './GameCard.css';

interface Props {
    game: GameCardDto;
}

const GameCard = observer((props: Props) => {
    const gameStore = useInjection<GameCardStore>(ownTypes.gameCardStore);
    const cartStore = useInjection<CartPageStore>(ownTypes.cartPageStore);
    const { t } = useTranslation(['cart'])
    const navigate = useNavigate();
    
    return (
        <Card 
        key={props.game.id} 
        className="game-card" bg="light" 
        onClick={() => navigate(`/game/${props.game.id}`)} 
        onMouseEnter={() => gameStore.isMouseEnter = true}
        onMouseLeave={() => gameStore.isMouseEnter = false}
        >
            <Card.Img className='game-card-img' variant='top' src={props.game.image}/>
            <Card.Body className='game-card-body'>
                <Row className='game-card-name'>
                    <p>{props.game.name}</p>
                </Row>
                <Row md={3}>
                    <Col>
                        {props.game.price}$
                    </Col>
                    <Col>
                        {gameStore.isMouseEnter && 
                        <Button 
                        className='cart-button'
                        onClick={(ev) => {
                            cartStore.addGame(props.game);
                            ev.stopPropagation();
                        }}
                        >
                            {t('cart')}
                        </Button>}
                    </Col>
                    {/* <Col>
                        {props.game.gameDetails.systems.toString()}
                    </Col> */}
                </Row>
            </Card.Body>
        </Card>
    );
});

export default GameCard;